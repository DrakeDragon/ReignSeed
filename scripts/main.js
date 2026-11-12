import { BUILDINGS, BUILDING_ORDER, RESEARCH, RESEARCH_BY_ID, RESOURCE_KEYS, RESOURCE_META, WORK_ORDERS, VERSION } from './content.js';
import { newGame, yearWeek, weeklyForecast, availableEvent, availableLabor, employed, workforce, housing, safety, canBuild, costLabel, buildingYield, capacity, offlineReward, advancePrediction, foundingMilestones, councilChoiceBlock, reduceState } from './core.js';
import { regionalStoryAvailable } from './regional.js';
import { frontierStoryAvailable } from './frontier.js';
import { act3Available } from './act3.js';
import { act3StoryView } from './act3_ui.js';
import { act4Available } from './act4.js';
import { act4StoryView } from './act4_ui.js';
import { act5Available, ACT5_ENDINGS } from './act5.js';
import { act5StoryView } from './act5_ui.js';
import { frontierStoryView, frontierBlockedView } from './frontier_ui.js';
import { regionalStoryView, diplomacyView } from './regional_ui.js';
import { openDB, listSlots, loadSlot, writeNewSlot, overwriteSlot, deleteSlot, commitCommand, exportState, exportAllReigns, recoveryInfo, restorePreviousSnapshot, parseImportedSave, loadSetting, saveSetting } from './persistence.js';
import { campaignSteps, currentCampaign, stewardAlerts, filterChronicle } from './polish27.js';
import { mountTown } from './scene.js';
import { mountBattleFX } from './battle_fx.js';
import { mountMilitaryFX } from './military_fx.js';
import { COUNCIL_BY_ID } from './council.js';
import { worldView } from './adventure_ui.js';
import { MISSIONS_BY_ID, CLASS_SKILLS } from './adventure.js';
const ROOT = document.getElementById('app');
let state = null;
let slots = [];
let hub = 'kingdom';
let modal = null;
let selectedParcel;
let selectedBuilding;
let importSlot = 1;
let storageError = '';
let errorToast = '';
let successToast = '';
let working = false;
let town = null;
let battleFX = null;
let militaryFX = null;
let lastBattleCue;
let pendingLegacy = null;
let currentWorldDetail = '';
let researchFilter = 'available';
let chronicleQuery = '';
let chronicleLimit = 45;
let sourceSlot = 1;
let updateReady = false;
let activateUpdate = false;
let legacyRecords = [];
let recoveryStatus = null;
let worldUI = { tab: 'expeditions', selectedMission: '', party: [], selectedHero: '', selectedEnemy: '', selectedAlly: '', showMoves: false };
let townViewMode = 'scenic';
let settings = { reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches, largeText: false, particles: true, highContrast: false };
const escaped = (text) => String(text ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch] ?? ch));
const fmt = (num) => Math.round(num).toLocaleString('en-US');
const signed = (num) => num > 0 ? `+${num}` : String(num);
const button = (name, action, variant = 'primary', props = '') => `<button type="button" class="btn btn-${variant}" data-action="${action}" ${props}>${name}</button>`;
const requireState = () => { if (!state)
    throw Error('No active reign.'); return state; };
const yearLabel = (s) => { const w = yearWeek(s.turn); return `${w.season} · W${w.seasonWeek} · ${w.year} AS`; };
const resourceChip = (s, k) => { const f = weeklyForecast(s).changes[k]; return `<button type="button" class="res-chip" data-action="ledger" aria-label="Open ${RESOURCE_META[k].name} ledger"><span class="res-ico">${RESOURCE_META[k].icon}</span><span>${fmt(s.resources[k])}</span><small class="${f < 0 ? 'negative' : 'positive'}">${signed(f)}</small></button>`; };
const titleSymbol = `<span class="brand-seed" aria-hidden="true">❧</span>`;
function renderTitle() {
    const bySlot = new Map(slots.map(s => [s.slot, s]));
    const existing = slots.length;
    return `<div class="title-page ${settings.reducedMotion ? 'reduce-motion' : ''} ${settings.highContrast ? 'high-contrast' : ''}">
 <div class="title-horizon"><div class="title-light"></div><div class="title-mountains"></div><div class="title-ornament">✦ &nbsp; AN UNWRITTEN KINGDOM &nbsp; ✦</div><h1>${titleSymbol}<span>REIGNSEED</span></h1><p>THE LIVING KINGDOM</p><div class="title-town"><canvas id="title-town" aria-label="Illustrated mountain valley with the first settlement"></canvas></div><div class="title-quote">Twelve settlers. One forgotten tower.<br>A civilization waiting to be written.</div></div>
 <div class="title-actions">${existing ? button('✦ &nbsp; Continue Last Reign', 'continue-last') : ''}${button('Begin a New Reign', 'open-new')}${button('Import a Saved Reign', 'title-import', 'outline')}
 <div class="title-divider"><span>YOUR REIGNS</span></div><div class="slots">${[1, 2, 3].map(i => { const meta = bySlot.get(i); return `<div class="slot-row"><div class="slot-number">0${i}</div><div class="slot-info">${meta ? `<strong>${escaped(meta.name)}</strong><small>${escaped(yearLabel({ turn: meta.turn }))} · Turn ${meta.turn} · Save ${meta.revision}</small>` : `<strong>Empty Slot</strong><small>A new story can begin here</small>`}</div><div class="slot-options">${meta ? `<button class="tiny-btn" data-action="load-slot" data-id="${i}" aria-label="Open slot ${i}">Play</button><button class="tiny-btn muted" data-action="confirm-delete" data-id="${i}" aria-label="Delete slot ${i}">⋯</button>` : `<button class="tiny-btn" data-action="new-slot" data-id="${i}">New</button>`}</div></div>`; }).join('')}</div>
 <div class="archive-actions"><button class="archive-link" data-action="legacy-gallery">✦ Endings Library</button><button class="archive-link" data-action="export-all" ${existing ? '' : 'disabled'}>↓ Back Up All Reigns</button></div><p class="edition">PASS 28 · THE ENCHANTED EDITION</p>${storageError ? `<p class="storage-error" role="alert">${escaped(storageError)}</p>` : ''}</div></div>`;
}
function renderHeader(s) { return `<header class="game-header"><div class="header-line"><button class="header-back" data-action="title" aria-label="Return to title">${titleSymbol}</button><div class="kingdom-heading"><strong>${escaped(s.name)}</strong><span>${escaped(yearLabel(s))}</span></div><button class="icon-btn" data-action="settings" aria-label="Settings and save tools">⚙</button></div><div class="resource-strip">${['gold', 'food', 'timber', 'stone'].map(k => resourceChip(s, k)).join('')}<button class="res-more" data-action="ledger" aria-label="All resources">＋</button></div></header>`; }
const tabs = [['kingdom', '⌂', 'Kingdom'], ['council', '♛', 'Council'], ['world', '♧', 'World'], ['progress', '✧', 'Progress'], ['chronicle', '▤', 'Chronicle']];
function renderNav() { return `<nav class="bottom-nav" aria-label="Main navigation">${tabs.map(([key, icon, label]) => `<button class="nav-item ${hub === key ? 'active' : ''}" data-action="nav" data-id="${key}" ${hub === key ? 'aria-current="page"' : ''}><span aria-hidden="true">${icon}</span><small>${label}</small></button>`).join('')}</nav>`; }
function renderGame() { const s = requireState(); return `<div class="game-shell ${settings.reducedMotion ? 'reduce-motion' : ''} ${settings.largeText ? 'large-text' : ''} ${settings.highContrast ? 'high-contrast' : ''}">${renderHeader(s)}<main class="scroll-content" id="main-scroll"><div class="screen-head">${screenHeading(s)}</div>${hub === 'kingdom' ? renderKingdom(s) : hub === 'council' ? renderCouncil(s) : hub === 'world' ? renderWorld(s) : hub === 'progress' ? renderProgress(s) : renderChronicle(s)}<div class="bottom-breath"></div></main>${renderNav()}</div>`; }
function screenHeading(s) { const names = { kingdom: ['YOUR LIVING SETTLEMENT', 'A home worth growing'], council: ['THE ROYAL COUNCIL', 'Every decision leaves its mark'], world: ['THE WORLD OF TAVERCALE', 'Beyond the old watchtower'], progress: ['PATHS OF PROGRESS', 'A civilization is built by choices'], chronicle: ['THE ROYAL CHRONICLE', 'The story your reign is writing'] }; return `<div class="eyebrow">${names[hub][0]}</div><h2>${names[hub][1]}</h2>`; }
function townPanel(s) { return `<div class="town-card"><div class="scene-topline"><span><span class="scene-dot"></span> ${escaped(yearWeek(s.turn).season)} in Hearthmere Valley</span><span class="town-controls"><button data-action="town-view-mode" aria-label="Toggle parcel plan" aria-pressed="${townViewMode === 'strategy'}" class="scene-btn scene-mode">${townViewMode === 'strategy' ? '✦ Scenic' : '▦ Plan'}</button><button data-action="town-reset" aria-label="Recenter settlement" class="scene-btn">⌖</button><button data-action="town-zoom-out" aria-label="Zoom out" class="scene-btn">−</button><button data-action="town-zoom-in" aria-label="Zoom in" class="scene-btn">＋</button></span></div><canvas id="town-canvas" class="town-canvas" aria-label="Isometric settlement. Tap a building to inspect it, or an empty green parcel to build. An accessible building list appears below."></canvas><div class="scene-caption"><span>✦ Tap to inspect · Drag to pan · +/− to zoom</span><button data-action="build" class="inline-link">＋ Build</button></div>${townViewMode === 'strategy' ? `<details class="p28-parcel-index"><summary>Accessible parcel list · ${s.buildings.length} developed</summary><div class="p28-parcel-grid">${Array.from({ length: 30 }, (_, i) => { const b = s.buildings.find(x => x.parcel === i); return `<button data-action="town-pick" data-id="${i}" aria-label="Parcel ${i + 1}, ${escaped(b ? BUILDINGS[b.kind].name : 'empty, select to build')}" class="p28-parcel ${b ? 'built' : ''}"><b>${i + 1}</b><span>${escaped(b ? BUILDINGS[b.kind].name : 'Empty')}</span></button>`; }).join('')}</div></details>` : ''}</div>`; }
function actionRecommendation(s) { if (!s.completedEvents.includes('FH-001'))
    return { label: 'Choose your first investment', desc: 'Bera is waiting at the Common Hall to guide your first decision.', action: 'goto-council' }; if (!s.completedEvents.includes('FH-002'))
    return { label: 'Meet the arriving travelers', desc: 'Two travelers have reached the valley. Their arrival needs your decision.', action: 'goto-council' }; if (s.adventure.active)
    return { label: 'Continue the active expedition', desc: 'Your party is waiting in Hearthmere. Resume your last saved scene or tactical battle.', action: 'goto-world' }; if (s.turn === 0)
    return { label: 'Advance your first Council Week', desc: 'See what your buildings produce and discover the first opportunities.', action: 'advance-modal' }; if (!s.completedEvents.includes('FH-003'))
    return { label: 'Survey the Old Quarry', desc: 'Rook has located a source of Stone. His report awaits at the Council.', action: 'goto-council' }; if (!s.buildings.some(b => b.kind === 'lumber'))
    return { label: 'Create a Timber supply', desc: 'A Lumber Camp will keep your early construction from stalling.', action: 'build' }; if (s.turn < 2)
    return { label: 'Grow your village', desc: 'Improve a building, complete research, or advance the Council Week.', action: 'goto-progress' }; if (!s.flags.cellar)
    return { label: 'Investigate the watchtower', desc: 'Tovin found unusual stonework beneath the old foundation.', action: 'goto-council' }; if (!s.expeditionDone)
    return { label: 'Explore beneath the tower', desc: 'Dain is ready to investigate the forgotten passage.', action: 'goto-world' }; if (!s.flags.evidence)
    return { label: 'Discuss the old inscription', desc: 'The recovered record may tell you more about the First Charter.', action: 'goto-council' }; if (availableEvent(s))
    return { label: 'A council decision is ready', desc: 'Your people have a new request, an important promise, or a founding milestone to discuss.', action: 'goto-council' }; if (!s.flags['act1.complete'])
    return { label: 'Work toward the Hearthmere Charter', desc: 'Grow to 20 residents, stabilize Food, build six structures and complete three research discoveries. Review progress at Council.', action: 'goto-council' }; if (s.flags['act4.complete']) {
    if (s.act5.ending)
        return { label: 'Your reign has earned its ending', desc: 'Visit the Endings Library, review your epilogue, or begin a cosmetic New Game+.', action: 'goto-finale' };
    if (s.act5.completed.length >= 24)
        return { label: 'Choose your earned future', desc: 'Your decisions have opened the final routes. Review their requirements.', action: 'goto-finale' };
    if (act5Available(s))
        return { label: 'Continue Act V — The Kingdoms Choose', desc: 'A Royal Council chapter is waiting. Your charter and civilization mandate shape its outcome.', action: 'goto-council' };
    return { label: 'Grow your civilization', desc: 'Review regional compacts, mandates and expeditions to unlock the next chapter.', action: 'goto-regions' };
} if (s.flags['act3.complete'])
    return { label: act4Available(s) ? 'Continue Act IV in Veymark' : 'Explore the Veymark investigation', desc: 'Follow the evidence and return to Council for the next historical finding.', action: act4Available(s) ? 'goto-council' : 'goto-regions' }; if (s.flags['act2.complete'])
    return { label: act3Available(s) ? 'Continue Act III — The Banner and the Wheel' : 'Settle the crossing and gather evidence', desc: 'Return to Council or review the wider realm.', action: act3Available(s) ? 'goto-council' : 'goto-regions' }; return { label: (regionalStoryAvailable(s) || frontierStoryAvailable(s)) ? 'Act II — The Roads Remember' : 'Connect your growing region', desc: (regionalStoryAvailable(s) || frontierStoryAvailable(s)) ? 'A regional delegation awaits your decision at the Council.' : 'Open the Regional Network to develop trade gateways, sign independent charters, and dispatch caravans.', action: (regionalStoryAvailable(s) || frontierStoryAvailable(s)) ? 'goto-council' : 'goto-regions' }; }
function campaignCompass(s) { const all = campaignSteps(s), current = currentCampaign(s), done = all.filter(x => x.complete).length; return `<section class="p27-campaign" aria-label="Five act campaign progress"><div class="p27-card-head"><div><span class="eyebrow">THE LIVING CAMPAIGN</span><h3>${escaped(current.title)}</h3><p>Act ${current.act} · ${current.done} / ${current.total} Council chapters · ${done} of 5 arcs concluded</p></div><button class="p27-circle" data-action="campaign-details" aria-label="View all five acts">↗</button></div><div class="p27-acts">${all.map(x => `<div title="Act ${x.act}: ${escaped(x.title)}" class="p27-act ${x.complete ? 'complete' : x.act === current.act ? 'current' : ''}" aria-label="Act ${x.act} ${x.complete ? 'complete' : x.done + ' of ' + x.total}"><span>${x.act}</span></div>`).join('')}</div><div class="p27-meter" role="progressbar" aria-label="Act ${current.act} Council chapter progress" aria-valuemin="0" aria-valuemax="${current.total}" aria-valuenow="${current.done}"><span style="width:${Math.min(100, 100 * current.done / current.total)}%"></span></div><p class="p27-caption">${escaped(current.description)}</p></section>`; }
function weeklyIntelligence(s) { const alerts = stewardAlerts(s); return `<section class="p27-steward" aria-label="Steward's briefing"><div class="p27-card-head"><div><span class="eyebrow">BEFORE THE NEXT WEEK</span><h3>Steward’s Briefing</h3></div><button class="p27-mini" data-action="advance-modal">Review week →</button></div><div class="p27-alerts">${alerts.map(a => `<button class="p27-alert ${a.severity}" data-action="briefing-jump" data-id="${a.destination}"><span class="p27-alert-symbol" aria-hidden="true">${a.severity === 'warn' ? '!' : a.severity === 'good' ? '✓' : 'i'}</span><span><strong>${escaped(a.title)}</strong><small>${escaped(a.detail)}</small></span><span aria-hidden="true">›</span></button>`).join('')}</div><div class="p27-footnote">Forecasts are estimates, not new resources. Only Advance Week changes the calendar.</div></section>`; }
function renderKingdom(s) {
    const f = weeklyForecast(s), rec = actionRecommendation(s);
    const free = availableLabor(s);
    return `<section class="screen-section">${townPanel(s)}
 <div class="metric-row"><button class="metric metric-tap" data-action="population"><span>POPULATION ↗</span><strong>${s.population} <small>/ ${housing(s)}</small></strong></button><div class="metric"><span>FREE LABOR</span><strong>${free}<small> / ${workforce(s)}</small></strong></div><div class="metric"><span>SAFETY</span><strong>${safety(s)}</strong></div></div>
 <div class="civic-ribbon"><span>♥ Trust <b>${s.civic.publicTrust}</b></span><span>❀ Land <b>${s.civic.landHealth}</b></span><span>⚑ Trade <b>${s.civic.tradeStanding}</b></span><span>♜ Safety <b>${safety(s)}</b></span></div>
 ${campaignCompass(s)}${weeklyIntelligence(s)}${offlineReward(s, Date.now()) > 0 ? `<article class="passive-card"><div><strong>🌲 Your woodland crew has returned</strong><small>${offlineReward(s, Date.now())} Timber ready (six-hour passive cap)</small></div><button data-action="offline-claim">Claim</button></article>` : ''}<article class="focus-card"><div class="eyebrow">✦ YOUR NEXT OPPORTUNITY</div><h3>${escaped(rec.label)}</h3><p>${escaped(rec.desc)}</p>${button('Explore this opportunity  ↗', rec.action, 'gold')}</article>
 <div class="section-heading"><h3>Steward's Actions</h3><span>Build a stronger home</span></div><div class="quick-grid"><button class="quick-card" data-action="build"><span>⌂</span><strong>Construct</strong><small>New buildings & land</small></button><button class="quick-card" data-action="ledger"><span>✦</span><strong>Resources</strong><small>Supplies & Work Orders</small></button><button class="quick-card" data-action="goto-progress"><span>✧</span><strong>Research</strong><small>${s.resources.knowledge} Knowledge ready</small></button><button class="quick-card" data-action="goto-world"><span>♧</span><strong>Explore</strong><small>New paths & discoveries</small></button></div>
 <div class="mil-kingdom-shortcut"><span aria-hidden="true">🛤</span><div><strong>Regional Trade & Settlements</strong><small>${s.regional.towns.filter(t => t.status === 'chartered').length} charters · ${s.regional.caravans.filter(c => c.status === 'traveling').length} traveling caravans · ${s.regional.storyCompleted.length}/3 Act II opening chapters</small></div><button type="button" data-action="goto-regions">Open Regions</button></div>
 <div class="mil-kingdom-shortcut"><span aria-hidden="true">⚑</span><div><strong>The Border Watch</strong><small>${s.military.squads.length} military squads · ${s.military.resolved.length} / 7 border matters resolved · ${s.military.battle ? 'Battle awaiting orders' : 'Keep the roads safe'}</small></div><button type="button" data-action="goto-military">Open Army</button></div>
 <div class="section-heading"><h3>Buildings of Fallowbank</h3><span>${s.buildings.length} structures</span></div><div class="building-list">${s.buildings.map(b => { const d = BUILDINGS[b.kind]; return `<button class="building-row" data-action="inspect" data-id="${escaped(b.id)}"><span class="building-avatar" style="--tone:${d.tone}">${d.icon}</span><span class="building-info"><strong>${escaped(d.name)}</strong><small>${b.level === 0 ? 'Ancient ruins · Restoration available' : `Level ${b.level} · ${d.workers ? `${b.workers}/${d.workers} workers` : 'Civic structure'}`}</small></span><span class="chev">›</span></button>`; }).join('')}</div>
 <article class="weekly-card"><div class="weekly-heading"><span>☼ &nbsp; NEXT COUNCIL WEEK</span><span>${s.turn + 1} of your reign</span></div><div class="forecast-strip"><div><small>Gold</small><strong class="${f.changes.gold < 0 ? 'negative' : 'positive'}">${signed(f.changes.gold)}</strong></div><div><small>Food</small><strong class="${f.changes.food < 0 ? 'negative' : 'positive'}">${signed(f.changes.food)}</strong></div><div><small>Knowledge</small><strong>${signed(f.changes.knowledge)}</strong></div></div>${button('Review & Advance Week  →', 'advance-modal', 'gold')}</article>
 </section>`;
}
function renderEvent(s, event) {
    if (event === 'FH-001')
        return { tag: 'FOUNDING COUNCIL · FH-001', title: 'Twelve Beneath the Watchtower', p: ['Bera spreads the settlement ledger across the Common Hall table. Twelve people have chosen this valley as their home.', '“We have enough for one serious improvement,” she says. “But not all three. What should come first?”'], choices: [{ label: 'Strengthen the Farm', sub: '20 Gold · 8 Timber · 2 Stone. Upgrade the Farm to Level 2 for stronger harvests.', action: 'found', param: 'farm' }, { label: 'Restore the Watchtower', sub: '45 Gold · 18 Timber · 12 Stone. Restore the ruin and gain +8 Safety.', action: 'found', param: 'watchtower' }, { label: 'Establish a Lumber Camp', sub: '30 Gold · 12 Timber. Begin steady Timber production with available workers.', action: 'found', param: 'lumber' }] };
    if (event === 'FH-002')
        return { tag: 'A NEW ARRIVAL · FH-002', title: 'The Hungry Road', p: ['Two weary travelers arrive along the river road, carrying little more than a weathered pack and a few trade goods.', 'Bera looks toward the food stores. “We can help,” she says, “but every kindness has a cost.”'], choices: [{ label: 'Welcome them to Fallowbank', sub: 'Spend 6 Food. Gain 2 population and additional available labor.', action: 'event', param: 'welcome' }, { label: 'Exchange provisions for coin', sub: 'Trade 4 Food for 12 Gold. The travelers continue their journey.', action: 'event', param: 'trade' }, { label: 'Keep supplies for the settlement', sub: 'No resource cost. The travelers depart peacefully.', action: 'event', param: 'decline' }] };
    if (event === 'FH-003')
        return { tag: 'SURVEY REPORT · FH-003', title: 'The First Site Survey', p: ['Rook returns from the eastern ridge with a rough map and a grin.', '“There’s workable stone in the old quarry. Enough to make a difference if we can open a proper site.”'], choices: [{ label: 'Mark the Old Quarry', sub: 'Unlocks the Stone Quarry building. No purchase or construction occurs yet.', action: 'event', param: 'survey' }] };
    if (event === 'FH-005')
        return { tag: 'ANCIENT DISCOVERY · FH-005', title: 'The Tower’s Foundation', p: ['Tovin has found a seam of much older masonry beneath the watchtower. A narrow stair disappears below the foundation.', '“This was here long before anyone built the tower,” he says. “We should find out why.”'], choices: [{ label: 'Open a careful expedition', sub: 'Unlock Beneath the Watchtower on the World map. Dain Ashford can lead.', action: 'event', param: 'investigate' }, { label: 'Study the exposed markings first', sub: 'Gain 2 Knowledge and unlock the expedition.', action: 'event', param: 'study' }] };
    if (event === 'FH-008')
        return { tag: 'A RECORD REMEMBERED · FH-008', title: 'The First Remembering', p: ['The party has brought a damaged inscription out of the old passage. Its markings record a grain-and-water agreement beneath an ancient Witnessgrove.', 'Iven studies its date. “This was recorded after the network was supposed to have fallen silent.”'], choices: [{ label: 'Enter the findings in the Chronicle', sub: 'Preserve the first evidence and gain 3 Knowledge.', action: 'event', param: 'record' }, { label: 'Protect the inscription for further study', sub: 'Preserve the evidence and gain 2 Knowledge.', action: 'event', param: 'preserve' }] };
    const definition = COUNCIL_BY_ID[event];
    if (!definition)
        throw Error('Council event not found: ' + event);
    return { tag: definition.tag + ' · ' + event, title: definition.title, p: definition.intro, choices: definition.choices.map(c => ({ label: c.label, sub: c.detail, action: 'event', param: c.id, blocked: councilChoiceBlock(s, c) })) };
}
function renderCouncil(s) {
    const regionalStory = regionalStoryAvailable(s);
    const frontierStory = !regionalStory ? frontierStoryAvailable(s) : null;
    const act3Story = !regionalStory && !frontierStory ? act3Available(s) : null;
    const act4Story = !regionalStory && !frontierStory && !act3Story ? act4Available(s) : null;
    const act5Story = !regionalStory && !frontierStory && !act3Story && !act4Story ? act5Available(s) : null;
    const id = regionalStory || frontierStory || act3Story || act4Story || act5Story ? null : availableEvent(s);
    return `<section class="screen-section"><div class="council-art"><div class="council-hall"><div class="council-window"></div><div class="council-banner">✦</div><div class="council-table"><span>▤</span><span>✧</span><span>⌁</span></div></div><div class="council-art-label">THE COMMON HALL · YOUR LIVING GOVERNMENT</div></div>${regionalStory ? regionalStoryView(s) : frontierStory ? frontierStoryView(s) : s.flags['act4.complete'] ? act5StoryView(s) : s.flags['act3.complete'] ? act4StoryView(s) : s.flags['act2.complete'] ? act3StoryView(s) : frontierBlockedView(s) || (id ? (() => { const event = renderEvent(s, id); return `<div class="eyebrow brass">${event.tag}</div><h3 class="story-title">${event.title}</h3><div class="narrative">${event.p.map(t => `<p>${escaped(t)}</p>`).join('')}</div><div class="section-heading"><h3>Your Decision</h3><span>Choose carefully</span></div><div class="choices">${event.choices.map(c => `<button class="choice-card" data-action="${c.action}" data-event="${id}" data-id="${c.param}" ${'blocked' in c && c.blocked ? 'disabled' : ''}><span class="choice-arrow">↗</span><strong>${escaped(c.label)}</strong><small>${escaped(c.sub)}</small>${'blocked' in c && c.blocked ? `<small class="req">${escaped(c.blocked)}</small>` : ''}</button>`).join('')}</div>`; })() : `<article class="empty-story"><span>♛</span><h3>The Council is at peace</h3><p>Your current decisions have been settled. Build your kingdom or advance the Council Week to discover new opportunities.</p>${button('Review the Next Week', 'advance-modal', 'gold')}</article>`)}
 ${diplomacyView(s)}
 <div class="section-heading"><h3>Your Seven Advisers</h3><span>Founding council</span></div><div class="advisor-grid">${[['BT', 'Bera Tallow', 'Steward'], ['TB', 'Tovin Brask', 'Engineer'], ['MK', 'Mara Kest', 'Captain'], ['IS', 'Iven Sorel', 'Historian'], ['NQ', 'Nella Quill', 'Trade'], ['RF', 'Rook Fenner', 'Scout'], ['SF', 'Sella Fen', 'Grove']].map((a, i) => `<div class="advisor"><span class="advisor-avatar tone-${i % 4}">${a[0]}</span><div><strong>${a[1]}</strong><small>${a[2]} · Trust ${s.adviserTrust[['bera', 'tovin', 'mara', 'iven', 'nella', 'rook', 'sella'][i]]}/100</small></div></div>`).join('')}</div>
 <div class="section-heading"><h3>Founding Charter</h3><span>${foundingMilestones(s).filter(x => x.done).length} / ${foundingMilestones(s).length} ready</span></div>
 <div class="milestone-list">${foundingMilestones(s).map(m => `<div class="milestone ${m.done ? 'complete' : ''}"><span>${m.done ? '✓' : '○'}</span><div><strong>${escaped(m.label)}</strong><small>${escaped(m.detail)}</small></div></div>`).join('')}</div>
 <div class="info-card compact"><strong>${s.flags['act1.complete'] ? 'The Hearthmere Charter is signed' : 'Your first charter lies ahead'}</strong><p>${s.flags['act1.complete'] ? 'Your founding milestone is complete. The Act II chapter spine is available in the Council.' : 'The formal founding ceremony appears after the River Charter, and final ratification requires all five milestones and at least 30 council turns.'}</p></div>
 <div class="section-heading"><h3>The Promise Book</h3><span>${s.pledges.filter(p => p.status === 'active').length} active</span></div>
 ${s.pledges.length ? s.pledges.slice().reverse().map(p => `<article class="pledge-card ${p.status}"><div class="pledge-top"><strong>${escaped(p.title)}</strong><span>${p.status === 'active' ? `Due in ${Math.max(0, p.dueTurn - s.turn)} turns` : p.status === 'fulfilled' ? '✓ Fulfilled' : '✕ Broken'}</span></div><p>Deliver ${escaped(costLabel(p.cost))}${p.status === 'active' ? ` before Turn ${p.dueTurn}. Reward: ${escaped(costLabel(p.reward))}.` : '.'}</p>${p.status === 'active' ? button('Deliver Supplies & Fulfill', 'fulfill-pledge', 'gold', `data-id="${p.id}" ${!Object.entries(p.cost).every(([k, v]) => s.resources[k] >= (v ?? 0)) ? 'disabled' : ''}`) : ''}</article>`).join('') : '<div class="info-card compact"><strong>No active promises</strong><p>Some Council decisions create timed promises. Their deadlines and fulfillment are tracked here.</p></div>'}
 <div class="info-card compact"><strong>Council Record</strong><p>${s.completedEvents.length} of 35 founding Council events resolved. ${s.flags['act1.complete'] ? 'The first formal charter has been ratified.' : 'The next available event depends on the current council week, story evidence and regional conditions.'}</p></div></section>`;
}
function renderWorld(s) { if (s.activeExpedition)
    return renderExpedition(s); return worldView(s, worldUI); }
function renderExpedition(s) { const x = s.activeExpedition; const title = ['The Broken Stair', 'The Silent Regulator', 'The First Record'][x.node]; const story = [['Below the ruined watchtower, a narrow stair descends into darkness. Fallen stones cover part of the passage. A faint old carving runs along the wall.', 'Dain checks his shield. “We can clear the rubble or see what the markings tell us.”'], ['The passage opens into a chamber containing an ancient water regulator. Its brass controls are silent, but several inscriptions remain clear.', 'Dain gestures toward the machine. “That thing looks older than the kingdom we came from.”'], ['The inscription describes a grain-and-water agreement made beneath a Witnessgrove. Its date does not match the history taught across Tavercale.', 'Dain wraps the stone fragment carefully. “I think Iven will want to see this.”']][x.node]; return `<section class="screen-section"><div class="eyebrow brass">ACTIVE EXPEDITION · HEARTHMERE</div><h3 class="story-title">${title}</h3><div class="expedition-illustration"><div class="cave-arch"><div class="cave-inscription">✧ ✦ ✧</div><div class="cave-pillar left"></div><div class="cave-pillar right"></div><div class="cave-water"></div></div></div><div class="expedition-bar"><span>🛡 Dain Ashford · Guardian</span><span>Room ${x.node + 1} / 3</span></div><div class="narrative">${story.map(t => `<p>${escaped(t)}</p>`).join('')}</div><div class="choices">${(x.node === 0 ? [['Study the ancient markings', 'marks', 'Gain 2 Knowledge as you investigate the wall.'], ['Clear the fallen masonry', 'stones', 'Secure 4 Stone as you open the passage.']] : x.node === 1 ? [['Inspect the regulator', 'panel', 'Recover a technical clue and 1 Knowledge.'], ['Read the old inscription', 'inscription', 'Recover two Knowledge from the recorded agreement.']] : [['Secure the record and return to Fallowbank', 'finish', 'Claim 6 Gold and secured discoveries. The Council will be informed.']]).map(c => `<button class="choice-card" data-action="${c[1] === 'finish' ? 'expedition-finish' : 'expedition-choice'}" data-id="${c[1]}"><span class="choice-arrow">↗</span><strong>${c[0]}</strong><small>${c[2]}</small></button>`).join('')}</div><div class="info-card"><strong>Saved at every choice</strong><p>You can close your browser and return to the same chamber. This expedition does not advance the Council Calendar.</p></div></section>`; }
function researchGroup(id) {
    if (['irrigation', 'harvest_store', 'seed_selection', 'crop_rotation', 'communal_kitchens', 'herbal', 'healing'].includes(id))
        return 'Agriculture';
    if (['forest', 'timber_frames', 'sawmill', 'plank_joint', 'conservation', 'clay_working', 'brickmaking', 'kiln_safety', 'living_cultivation', 'root_tending', 'glass_firing', 'clear_lenses'].includes(id))
        return 'Industry';
    if (['masonry', 'bridgeworks', 'masonry_paths', 'ore_survey', 'smelting', 'forge_efficiency', 'workshop', 'mechanical_assembly', 'precision_gearing'].includes(id))
        return 'Engineering';
    return 'Civic & History';
}
function renderProgress(s) {
    const categories = ['available', 'Agriculture', 'Industry', 'Engineering', 'Civic & History', 'all'];
    const shown = RESEARCH.filter(r => researchFilter === 'all' || (researchFilter === 'available' ? !s.research.includes(r.id) && r.prereq.every(id => s.research.includes(id)) : researchGroup(r.id) === researchFilter));
    return `<section class="screen-section"><div class="knowledge-banner"><div><span class="eyebrow">YOUR SCHOLARS HAVE</span><strong>${fmt(s.resources.knowledge)} <small>Knowledge</small></strong><p>Seventy-six working research discoveries across agriculture, industry, engineering, and civic history.</p></div><span class="knowledge-glyph">✧</span></div>
 <div class="section-heading"><h3>Founding Research</h3><span>${s.research.length} / ${RESEARCH.length} discovered</span></div>
 <div class="research-filters" aria-label="Research categories">${categories.map(c => `<button class="filter-pill ${researchFilter === c ? 'active' : ''}" data-action="research-filter" data-id="${c}" aria-pressed="${researchFilter === c}">${c === 'available' ? 'Available Now' : c === 'all' ? `All ${RESEARCH.length}` : c}</button>`).join('')}</div>
 <div class="research-list">${shown.map(r => { const complete = s.research.includes(r.id), prereq = r.prereq.filter(id => !s.research.includes(id)), afford = s.resources.knowledge >= r.cost; return `<div class="research-card ${complete ? 'researched' : ''}"><div class="research-symbol">${r.icon}</div><div class="research-body"><div class="research-top"><strong>${escaped(r.name)}</strong><span class="${complete ? 'tag-done' : 'tag-knowledge'}">${complete ? '✓ Learned' : r.cost + ' ✧'}</span></div><p>${escaped(r.desc)}</p><div class="research-effect">✦ ${escaped(r.effects)}</div>${complete ? '' : prereq.length ? `<small class="req">Requires ${prereq.map(id => RESEARCH_BY_ID[id]?.name).join(', ')}</small>` : `<button class="research-purchase" data-action="research" data-id="${r.id}" ${!afford ? 'disabled title="Not enough Knowledge"' : ''}>${afford ? 'Research Now' : 'Need ' + (r.cost - s.resources.knowledge) + ' more Knowledge'} →</button>`}</div></div>`; }).join('') || '<div class="info-card"><strong>No research in this view.</strong><p>Switch to another domain or advance development to unlock more options.</p></div>'}</div>
 <div class="info-card"><strong>Real production chains</strong><p>Develop the Sawmill (Timber → Planks), Brick Kiln (Clay and Timber → Bricks), Smelter (Ore and Timber → Iron) and Apothecary (Herbs → Medicine). Buildings need workers and inputs; the Resource Ledger reports shortages.</p></div>
 <div class="info-card"><strong>Further development</strong><p>This release includes 76 playable research nodes. The full 360-node tree, later eras, and Legendary Projects remain planned for subsequent releases.</p></div></section>`;
}
function renderChronicle(s) { const known = s.flags.inscription; return `<section class="screen-section"><div class="chronicle-cover"><div class="chronicle-ornament">❦</div><span>THE HISTORY OF</span><strong>${escaped(s.name)}</strong><small>Year ${yearWeek(s.turn).year} After Sundering · ${s.turn} Council Weeks completed</small>${s.act5.legacy ? `<small class="legacy-label">✧ Legacy of ${escaped(ACT5_ENDINGS.find(x => x.id === s.act5.legacy?.ending)?.name)} · ${escaped(s.act5.legacy.name)} (Week ${s.act5.legacy.week})</small>` : ''}${s.act5.ending ? `<small class="legacy-label">✦ Earned ending: ${escaped(ACT5_ENDINGS.find(x => x.id === s.act5.ending)?.name)}</small>` : ''}</div><div class="chronicle-stats"><div><strong>${s.chronicle.length}</strong><small>Recorded moments</small></div><div><strong>${s.buildings.length}</strong><small>Structures</small></div><div><strong>${s.research.length}</strong><small>Discoveries</small></div></div><div class="section-heading"><h3>The First Charter</h3><span>Evidence journal</span></div><div class="evidence-card"><span class="evidence-icon">✧</span><div><strong>${known ? 'The Harvest Inscription' : 'An Unanswered Mystery'}</strong><p>${known ? 'A damaged Charter inscription was recovered under the Watchtower. Its date suggests the ancient network worked later than accepted history claims.' : 'Old roots and stonework lie beneath the watchtower. Investigate the chamber to uncover a piece of Tavercale’s forgotten history.'}</p><small>${known ? 'EVIDENCE RECOVERED · EV-01' : 'UNDISCOVERED · EV-01'}</small></div></div><div class="section-heading"><h3>The Hearthmere Company</h3><span>${s.adventure.completed.length} story adventures completed</span></div><div class="adv-chronicle"><strong>${s.adventure.heroes.length} recruited companions · ${s.adventure.gear.length} equipment pieces</strong><p>${s.adventure.completed.length ? s.adventure.completed.map(id => escaped(id)).join(' · ') : 'Begin Beneath the Watchtower to establish your first adventuring party.'}</p>${s.flags['root_chamber.discovered'] ? '<p>✧ The First Root Chamber revealed a surviving network stretching far beyond Hearthmere Valley.</p>' : ''}</div><div class="section-heading"><h3>The Roads Remember</h3><span>${s.regional.storyCompleted.length + s.frontier.storiesCompleted.length} / 17 chapters</span></div><div class="info-card compact"><strong>${s.regional.storyCompleted.length ? 'Copperwash trade negotiations have begun' : 'A wider realm waits beyond the charter'}</strong><p>${s.regional.towns.filter(t => t.status === 'chartered').length} independent regional charters · ${s.regional.towns.filter(t => t.status === 'founded').length} player-founded satellite settlements · ${s.regional.roads.filter(r => s.military.resolved.includes(r.requires)).length} safe road links.</p></div><div class="section-heading"><h3>Moments of Your Reign</h3><span>Newest first</span></div><label for="chronicle-search" class="p27-search-label">Search the Chronicle by name, event or description</label><div class="p27-search-row"><input id="chronicle-search" class="text-input" value="${escaped(chronicleQuery)}" placeholder="Search recorded moments"/><button type="button" class="p27-mini" data-action="chronicle-search">Find</button><button type="button" class="p27-mini" data-action="chronicle-clear">Clear</button></div><p class="p27-footnote">Showing ${filterChronicle(s, chronicleQuery, chronicleLimit).shown} of ${filterChronicle(s, chronicleQuery, chronicleLimit).total} matching records.</p>${filterChronicle(s, chronicleQuery, chronicleLimit).total ? `<div class="chronicle-timeline">${filterChronicle(s, chronicleQuery, chronicleLimit).events.map(e => `<article class="chronicle-entry"><div class="timeline-dot"></div><small>${yearWeek(e.turn).season} · Week ${yearWeek(e.turn).seasonWeek} · ${yearWeek(e.turn).year} AS</small><h4>${escaped(e.title)}</h4><p>${escaped(e.body)}</p></article>`).join('')}</div>${filterChronicle(s, chronicleQuery, chronicleLimit).total > chronicleLimit ? button('Show more records', 'chronicle-more', 'outline') : ''}` : `<div class="info-card"><strong>No matching records yet.</strong><p>Major decisions, construction, discoveries and research will appear here as the kingdom grows.</p></div>`}<div class="info-card"><strong>The first charter, and the road beyond. Five acts playable.</strong><p>Your choices persist in the Chronicle. Pass 26 completes all twenty-four Act V chapters and the five-act story, with eight gated ending routes, civil safeguards and a cosmetic New Game+ legacy. Pass 27 adds a campaign compass, risk-aware weekly briefings, a searchable Chronicle, high-contrast reading, an endings gallery and multi-reign backups. The larger continental sandbox remains a separate development goal.</p></div></section>`; }
function renderModal(s) {
    if (!modal)
        return '';
    let body = '';
    let heading = '';
    if (modal === 'new') {
        heading = 'Begin a New Reign';
        const empties = [1, 2, 3].filter(x => !slots.some(s => s.slot === x));
        body = `<p class="modal-lead">Choose a free save slot and name your settlement. Every kingdom begins with twelve founders and the same supplies. A New Game+ carries only the title of your previously earned ending, never prior knowledge or power.</p><label class="form-label" for="kingdom-name">Kingdom name</label><input id="kingdom-name" class="text-input" maxlength="28" placeholder="Fallowbank" value="Fallowbank"/><label class="form-label" for="new-slot-select">Save slot</label><select class="text-input" id="new-slot-select">${empties.map(i => `<option value="${i}">Slot ${i}</option>`).join('')}</select>${empties.length ? button('Create Reign  ✦', 'create-reign', 'gold') : '<p>All three slots are occupied. Delete a save from the title screen first.</p>'}`;
    }
    else if (modal === 'delete') {
        heading = 'Delete This Reign?';
        body = `<p class="modal-lead">This removes Slot ${selectedParcel}. The current save and its local recovery generation will be deleted.</p><p>This cannot be undone unless you have an exported backup.</p>${button('Delete Slot ' + selectedParcel, 'delete-confirm', 'danger')}`;
    }
    else if (modal === 'population' && s) {
        heading = 'The People of Fallowbank';
        const ready = s.completedEvents.includes('FH-002') && s.turn >= 2 && s.turn - s.lastInviteTurn >= 2 && s.population + 2 <= housing(s);
        body = `<p class="modal-lead">Your people make the kingdom possible. Housing allows more residents; three-quarters of the population provides available labor.</p><div class="inspector-stats"><div><small>Residents / Housing</small><strong>${s.population} / ${housing(s)}</strong></div><div><small>Employed / Available labor</small><strong>${employed(s)} / ${workforce(s)}</strong></div></div><div class="info-card"><strong>Invite Two Settlers</strong><p>Offer homes, supplies, and a fresh start to two new residents. Cost: 18 Gold and 10 Food. One invitation every two Council Weeks, starting on Turn 2.</p>${button('Invite Two New Residents', 'invite-settlers', 'gold', ready ? '' : 'disabled')}</div><p class="note">${s.population + 2 > housing(s) ? 'Build or upgrade Cottages to provide more housing.' : s.turn < 2 ? 'This service opens after the second Council Week.' : s.turn - s.lastInviteTurn < 2 ? 'You recently invited settlers. Advance two Council Weeks before the next invitation.' : 'Inviting settlers increases both your workforce and future Food needs.'}</p>`;
    }
    else if (modal === 'ledger' && s) {
        const f = weeklyForecast(s);
        heading = 'The Resource Ledger';
        body = `<p class="modal-lead">Supplies held by ${escaped(s.name)}. Weekly changes come from buildings, workforce and your residents’ needs.</p><div class="ledger-list">${RESOURCE_KEYS.map(k => `<div class="ledger-row"><span>${RESOURCE_META[k].icon}</span><div><strong>${RESOURCE_META[k].name}</strong><small>Capacity ${fmt(capacity(s, k))}</small></div><div><strong>${fmt(s.resources[k])}</strong><small class="${f.changes[k] < 0 ? 'negative' : 'positive'}">${signed(f.changes[k])} / week</small></div></div>`).join('')}</div><div class="section-heading"><h3>Work Orders</h3><span>${2 - s.workOrdersUsed} remaining this week</span></div><p class="modal-lead">Spend a little Gold to gather supplies with unassigned workers. Maximum two orders per Council Week.</p>${WORK_ORDERS.map(o => `<div class="work-card"><span>${o.icon}</span><div><strong>${o.name}</strong><small>${o.desc}${'research' in o && o.research && !s.research.includes(o.research) ? '<br>Requires ' + RESEARCH_BY_ID[o.research]?.name : ''}<br>Costs ${costLabel(o.cost)} · Gains ${costLabel(o.gain)}</small></div><button data-action="workorder" data-id="${o.id}" class="tiny-btn" ${s.workOrdersUsed >= 2 || availableLabor(s) < 1 || ('research' in o && !!o.research && !s.research.includes(o.research)) ? 'disabled' : ''}>Do it</button></div>`).join('')}`;
    }
    else if (modal === 'build' && s) {
        heading = selectedParcel === undefined ? 'Construction Planner' : `Parcel ${selectedParcel + 1} · Construct`;
        body = `<p class="modal-lead">Select a structure. Its cost is paid only when construction succeeds. Open a free green parcel on the map to build at a specific location.</p><div class="construction-list">${BUILDING_ORDER.filter(k => k !== 'common_hall').map(kind => { const d = BUILDINGS[kind]; const reason = canBuild(s, kind); return `<div class="construction-card"><div class="construction-icon" style="--tone:${d.tone}">${d.icon}</div><div class="construction-info"><strong>${d.name}</strong><small>${escaped(d.desc)}</small><div class="cost-text">${costLabel(d.cost)}</div>${reason ? `<div class="locked-inline">${escaped(reason)}</div>` : ''}</div><button class="tiny-btn" data-action="build-item" data-id="${kind}" ${reason ? 'disabled' : ''}>Build</button></div>`; }).join('')}</div>`;
    }
    else if (modal === 'inspect' && s) {
        const b = s.buildings.find(b => b.id === selectedBuilding);
        if (b) {
            const d = BUILDINGS[b.kind], y = buildingYield(s, b);
            heading = d.name;
            body = `<div class="inspector-hero" style="--tone:${d.tone}"><span>${d.icon}</span><strong>${b.level === 0 ? 'Ruined landmark' : 'Level ' + b.level}</strong></div><p class="modal-lead">${escaped(d.desc)}</p>${d.inputs ? `<div class="recipe-note"><strong>Weekly recipe</strong><span>Consumes ${costLabel(d.inputs)} · Produces ${costLabel(y)} while staffed and supplied</span></div>` : ''}<div class="inspector-stats"><div><small>Weekly output</small><strong>${Object.entries(y).length ? costLabel(y) : '—'}</strong></div><div><small>Workers</small><strong>${b.workers} / ${d.workers}</strong></div></div>${d.workers ? `<div class="staffing-row"><div><strong>Assign workers</strong><small>${availableLabor(s)} free labor available</small></div><div class="stepper"><button data-action="worker" data-id="${b.id}" data-delta="-1" ${b.workers === 0 ? 'disabled' : ''} aria-label="Remove worker">−</button><strong>${b.workers}</strong><button data-action="worker" data-id="${b.id}" data-delta="1" ${b.workers >= d.workers || availableLabor(s) < 1 ? 'disabled' : ''} aria-label="Add worker">＋</button></div></div>` : ''}<div class="section-heading"><h3>${b.level === 0 ? 'Restore the ruins' : 'Upgrade the structure'}</h3><span>Maximum level ${d.maxLevel}</span></div>${b.level < d.maxLevel ? (() => { const cost = b.level === 0 ? d.cost : { gold: Math.ceil((d.cost.gold ?? 20) * (1 + b.level * .7)), timber: Math.ceil((d.cost.timber ?? 5) * (1 + b.level * .6)), stone: Math.ceil((d.cost.stone ?? 0) * (1 + b.level * .5)) }; return `<div class="info-card"><strong>Level ${b.level + 1}</strong><p>Cost: ${costLabel(cost)}</p>${button('Upgrade Building  ↑', 'upgrade', 'gold', `data-id="${b.id}"`)}</div>`; })() : '<div class="info-card"><strong>Maximum level reached</strong><p>This building cannot be upgraded further in the founding release.</p></div>'}`;
        }
    }
    else if (modal === 'advance' && s) {
        const f = weeklyForecast(s);
        heading = 'Review the Coming Week';
        body = `<p class="modal-lead">Time advances only when you choose. The following is a deterministic forecast based on your current workforce and buildings.</p><div class="advance-grid">${['gold', 'food', 'timber', 'stone', 'knowledge'].map(k => `<div class="advance-stat"><span>${RESOURCE_META[k].icon} ${RESOURCE_META[k].name}</span><strong class="${f.changes[k] < 0 ? 'negative' : 'positive'}">${signed(f.changes[k])}</strong><small>${fmt(s.resources[k])} → ${fmt(advancePrediction(s).find(x => x.key === k)?.next ?? 0)}</small></div>`).join('')}</div><div class="info-card"><strong>Before you advance</strong><p>${s.military.battle ? 'Resolve or withdraw from the border battle before advancing.' : s.activeExpedition || s.adventure.active ? 'Finish or retreat from your current expedition before advancing.' : s.turn === 0 ? 'Rook’s first survey report will become available after the week.' : s.turn === 1 ? 'The old watchtower foundation may reveal a new mystery.' : 'Your buildings and research continue to grow.'}</p>${s.pledges.filter(p => p.status === 'active' && p.dueTurn <= s.turn + 1).map(p => `<p class="deadline-warning">⚠ Promise expires on this advance: ${escaped(p.title)}. Deliver now or suffer a Trust penalty.</p>`).join('')}${s.regional.caravans.some(c => c.status === 'traveling' && c.arriveTurn <= s.turn + 1) ? '<p class="note">A regional caravan is scheduled to arrive next week. Its goods must be claimed in World → Regions.</p>' : ''}${f.breakdown.filter(x => x.includes('waiting for recipe inputs') || x.includes('Defenders:') || x.includes('Military wages') || x.includes('Field army:') || x.includes('Satellite settlements:') || x.includes('Satellite operating')).map(x => `<p class="note">${escaped(x)}</p>`).join('')}</div>${button('Confirm · Advance One Week', 'advance-confirm', 'gold', s.military.battle ? 'disabled title="Resolve the active border battle first"' : '')}`;
    }
    else if (modal === 'settings') {
        heading = 'Settings & Saves';
        body = `<div class="setting-row"><div><strong>Reduced motion</strong><small>Minimize ambient animation and camera movement</small></div><button class="toggle ${settings.reducedMotion ? 'on' : ''}" data-action="toggle-motion" aria-pressed="${settings.reducedMotion}">${settings.reducedMotion ? 'On' : 'Off'}</button></div><div class="setting-row"><div><strong>Larger text</strong><small>Increase story and interface reading size</small></div><button class="toggle ${settings.largeText ? 'on' : ''}" data-action="toggle-text" aria-pressed="${settings.largeText}">${settings.largeText ? 'On' : 'Off'}</button></div><div class="setting-row"><div><strong>High contrast</strong><small>Strengthen text and interactive borders throughout the interface</small></div><button class="toggle ${settings.highContrast ? 'on' : ''}" data-action="toggle-contrast" aria-pressed="${settings.highContrast}">${settings.highContrast ? 'On' : 'Off'}</button></div><div class="setting-row"><div><strong>Audio</strong><small>Off by default. Audio will be added with future production artwork.</small></div><span class="muted-label">Off</span></div>${s ? `<div class="section-heading"><h3>Save Tools</h3><span>Slot ${s.slot}</span></div><p class="modal-lead">Your game autosaves after successful choices. Export a backup to protect your reign if browser storage is cleared.</p><p class="p27-footnote">Autosaved at revision ${s.revision} · Slot ${s.slot}. Recovery preserves a prior snapshot of successful actions.</p>${button('Export This Reign', 'export', 'outline')}${button('Export All Saved Reigns', 'export-all', 'outline')}${button('Inspect Recovery Snapshot', 'save-recovery', 'secondary')}${button('Import Save Into Slot ' + s.slot, 'import', 'secondary')}${updateReady ? button('Apply Downloaded Update (Reload)', 'apply-update', 'gold') : ''}` : ''}`;
    }
    else if (modal === 'import') {
        heading = 'Import a Save';
        body = `<p class="modal-lead">Import a Reignseed Pass 10–26 save or a Pass 27 all-reigns archive. Older saves are migrated safely. It will replace Slot ${importSlot} only after validation and confirmation.</p>${!s ? `<label class="form-label" for="import-slot-select">Destination slot</label><select id="import-slot-select" class="text-input">${[1, 2, 3].map(i => `<option value="${i}" ${importSlot === i ? 'selected' : ''}>Slot ${i}</option>`).join('')}</select>` : ''}<label class="form-label" for="import-source-slot">Source slot (for an all-reigns archive)</label><select id="import-source-slot" class="text-input">${[1, 2, 3].map(i => `<option value="${i}" ${sourceSlot === i ? 'selected' : ''}>Source slot ${i}</option>`).join('')}</select><input id="import-file" type="file" accept=".json,.reignseed-save.json,application/json" class="file-input"/><p class="note">The import file stays on your device.</p>`;
    }
    else if (modal === 'campaign' && s) {
        heading = 'The Five Acts';
        body = `<p class="modal-lead">Your recorded chapters and earned ending are read from the current save. The next destination is always chosen by you.</p><div class="p27-full-campaign">${campaignSteps(s).map(a => `<div class="p27-act-card"><div class="p27-act-num">${a.act}</div><div><strong>${escaped(a.title)}</strong><small>${a.done} / ${a.total} chapters · ${a.complete ? 'Concluded' : 'In progress'}</small><p>${escaped(a.description)}</p></div></div>`).join('')}</div>${button('Continue Your Story', 'campaign-continue', 'gold')}`;
    }
    else if (modal === 'recovery' && s) {
        heading = 'Save Recovery Center';
        body = `<p class="modal-lead">Your current reign is autosaved after every successful choice. The previous valid snapshot may let you recover from a damaged or unwanted recent action.</p><div class="info-card"><strong>Current save — revision ${s.revision}</strong><p>Slot ${s.slot} · Council Week ${s.turn}. This save remains untouched unless you confirm a rollback.</p></div>${recoveryStatus?.available ? `<div class="info-card"><strong>Recovery available — revision ${recoveryStatus.revision}</strong><p>Previous Council Week ${recoveryStatus.turn}. Restoring swaps the current and previous valid snapshots where possible. You can export your current reign first.</p>${button('Restore Previous Snapshot', 'restore-previous', 'gold')}</div>` : '<p class="note">No valid previous snapshot was found for this slot.</p>'}${button('Export Current Reign First', 'export', 'outline')}`;
    }
    else if (modal === 'legacy') {
        heading = 'The Endings Library';
        const completed = new Set(legacyRecords.map(r => r.ending));
        body = `<p class="modal-lead">An enduring record of endings earned in this browser. No free equipment, resources or power carries into another reign. Export your saves to protect your achievements from browser storage resets.</p><div class="p27-legacy-count"><strong>${completed.size} / 8</strong><small>Distinct conclusions witnessed</small></div><div class="p27-legacy-grid">${ACT5_ENDINGS.map(e => { const seen = legacyRecords.filter(r => r.ending === e.id); return `<article class="p27-legacy-item ${seen.length ? 'unlocked' : 'locked'}"><span aria-hidden="true">${seen.length ? '✦' : '◇'}</span><div><strong>${seen.length ? escaped(e.name) : 'An undiscovered future'}</strong><small>${seen.length ? `${seen.length} recorded reign${seen.length !== 1 ? 's' : ''} · Last earned by ${escaped(seen[seen.length - 1].name)}` : 'Complete the five-act campaign to reveal this ending.'}</small></div></article>`; }).join('')}</div><p class="note">Only completed conclusions are recorded. Earlier completed saves are indexed when opened.</p>${legacyRecords.length ? button('Clear Endings Library Record', 'legacy-clear', 'outline') : ''}`;
    }
    else if (modal === 'about') {
        heading = 'About This Release';
        body = `<p class="modal-lead">Reignseed — The Living Kingdom<br>Pass 27 · The Living Edition · Version ${VERSION}</p><p>Includes 35 founding Council events, 76 research discoveries, 41 unique story expeditions plus two repeatable contracts, four playable heroes, four military families, six Hearthmere sectors, three outer regions, sixteen resources, thirty-four building families, all seventeen Act II chapters, nineteen Act III chapters, twenty-four Act IV chapters, and all twenty-four Act V chapters. Six funded civilization mandates, six potential faction partners, two reconstruction milestones, three final Act V expeditions, eight earned endings, cosmetic New Game+ and three local save slots are available.</p><p>Acts I–IV are playable. Act V has twenty-four Council chapters, six civilization mandates, and eight earned ending routes. A full continental map, final artwork, live storage checks and physical device QA remain future scope. The full continental sector map, final artwork, live browser-storage testing and release QA remain future targets.</p>`;
    }
    else
        return '';
    return `<div class="overlay ${settings.highContrast ? 'high-contrast' : ''}" data-action="modal-backdrop"><section class="modal-window" role="dialog" aria-modal="true" aria-label="${escaped(heading)}"><div class="modal-heading"><div><span class="eyebrow">REIGNSEED</span><h2>${escaped(heading)}</h2></div><button class="modal-close" data-action="close-modal" aria-label="Close dialog">✕</button></div><div class="modal-body">${body}</div></section></div>`;
}
function render() { const previousScroll = document.getElementById('main-scroll')?.scrollTop ?? 0; town?.dispose(); town = null; battleFX?.dispose(); battleFX = null; militaryFX?.dispose(); militaryFX = null; ROOT.innerHTML = (state ? renderGame() : renderTitle()) + renderModal(state) + (errorToast ? `<div class="toast toast-error" role="alert">${escaped(errorToast)}</div>` : successToast ? `<div class="toast" role="status">✦ ${escaped(successToast)}</div>` : ''); if (state) {
    const scroll = document.getElementById('main-scroll');
    if (scroll)
        scroll.scrollTop = previousScroll;
} const c = document.getElementById(state ? 'town-canvas' : 'title-town'); if (c) {
    town = mountTown(c, state ?? newGame(1), p => { if (!state)
        return; const building = state.buildings.find(b => b.parcel === p); if (building) {
        selectedBuilding = building.id;
        modal = 'inspect';
    }
    else {
        selectedParcel = p;
        modal = 'build';
    } render(); }, settings.reducedMotion, !!state && townViewMode === 'strategy');
} const battlefield = document.getElementById('adv-battle-canvas'); if (battlefield && state?.adventure.active?.battle)
    battleFX = mountBattleFX(battlefield, state, settings.reducedMotion, lastBattleCue); const militaryCanvas = document.getElementById('mil-battle-canvas'); if (militaryCanvas && state?.military.battle)
    militaryFX = mountMilitaryFX(militaryCanvas, state, settings.reducedMotion); if (modal) {
    const close = ROOT.querySelector('.modal-close');
    close?.focus({ preventScroll: true });
} }
function switchHub(next) { hub = next; modal = null; selectedParcel = undefined; const scroll = document.getElementById('main-scroll'); if (scroll)
    scroll.scrollTop = 0; render(); document.getElementById('main-scroll')?.scrollTo({ top: 0 }); }
let toastTimer;
function notify(message, error = false) { if (error) {
    errorToast = message;
    successToast = '';
}
else {
    successToast = message;
    errorToast = '';
} render(); if (toastTimer)
    window.clearTimeout(toastTimer); toastTimer = window.setTimeout(() => { errorToast = ''; successToast = ''; const toasts = ROOT.querySelectorAll('.toast'); toasts.forEach(t => t.remove()); }, 2400); }
async function issue(cmd) { if (working)
    return; const before = requireState(); try {
    working = true;
    const output = reduceState(before, cmd);
    output.state.revision = before.revision + 1;
    output.state.lastSavedAt = Date.now();
    const commandId = crypto.randomUUID?.() ?? String(Date.now()) + Math.random();
    await commitCommand(before, output.state, commandId);
    state = output.state;
    if (cmd.type === 'act5_ending')
        await indexLegacy(output.state);
    if (cmd.type.startsWith('battle_'))
        lastBattleCue = { kind: cmd.type, hero: 'hero' in cmd && typeof cmd.hero === 'string' ? cmd.hero : undefined, enemy: 'enemy' in cmd && typeof cmd.enemy === 'string' ? cmd.enemy : undefined, at: performance.now() };
    else
        lastBattleCue = undefined;
    modal = null;
    selectedParcel = undefined;
    notify(output.note);
    if (cmd.type.startsWith('mission_') || cmd.type.startsWith('battle_') || cmd.type.startsWith('military_start') || cmd.type.startsWith('military_resolve_round')) {
        const content = document.getElementById('main-scroll');
        if (content)
            content.scrollTop = 0;
    }
}
catch (err) {
    notify(err.message, true);
}
finally {
    working = false;
} }
async function refreshSlots() { slots = await listSlots(); }
async function refreshLegacy() { const value = await loadSetting('legacy-records-v1', []); legacyRecords = Array.isArray(value) ? value.filter(r => typeof r.key === 'string' && typeof r.ending === 'string').slice(-100) : []; }
async function indexLegacy(s) { if (!s.act5.ending)
    return; const mark = s.act5.ending; const key = [s.slot, s.name, s.act5.endingTurn ?? s.turn, mark].join(':'); if (legacyRecords.some(r => r.key === key))
    return; legacyRecords.push({ key, ending: mark, name: s.name, week: s.act5.endingTurn ?? s.turn, at: new Date().toISOString() }); legacyRecords = legacyRecords.slice(-100); try {
    await saveSetting('legacy-records-v1', legacyRecords);
}
catch { /* Never block a successful game command due to gallery bookkeeping. */ } }
async function openSlot(slot) { try {
    const result = await loadSlot(slot);
    if (!result) {
        notify('This save slot is empty.', true);
        return;
    }
    state = result.state;
    await indexLegacy(state);
    hub = 'kingdom';
    modal = null;
    render();
    if (result.migrated)
        notify('Your earlier Reignseed save was upgraded for Pass 27. Export a fresh backup.');
    else if (result.recovered)
        notify('Loaded the previous valid recovery snapshot. Consider exporting a backup.');
}
catch (err) {
    notify(err.message, true);
} }
async function createSlot() { const input = document.getElementById('kingdom-name'); const sel = document.getElementById('new-slot-select'); const index = Number(sel?.value); if (!index || slots.some(s => s.slot === index)) {
    notify('Choose an empty save slot.', true);
    return;
} const name = (input?.value ?? 'Fallowbank').trim().slice(0, 28) || 'Fallowbank'; const fresh = newGame(index, name); if (pendingLegacy) {
    fresh.act5.legacy = { ...pendingLegacy };
} try {
    await writeNewSlot(fresh);
    await refreshSlots();
    state = fresh;
    worldUI = { tab: 'expeditions', selectedMission: '', party: [], selectedHero: '', selectedEnemy: '', selectedAlly: '', showMoves: false };
    hub = 'council';
    modal = null;
    pendingLegacy = null;
    notify('The first twelve founders await your decision.');
}
catch (err) {
    notify(err.message, true);
} }
async function doImport(file) { try {
    if (file.size > 12_000_000)
        throw Error('This file exceeds the save import size limit.');
    const text = await file.text();
    const imp = parseImportedSave(text, importSlot, sourceSlot);
    if (!window.confirm(`Replace Slot ${importSlot} with the imported reign “${imp.name}”? This cannot be undone unless you have an exported backup.`))
        return;
    await overwriteSlot(imp);
    await refreshSlots();
    state = imp;
    await indexLegacy(imp);
    hub = 'kingdom';
    modal = null;
    notify('Save imported and validated successfully.');
}
catch (err) {
    notify(err.message, true);
} }
function selectedBattleHero() { const s = requireState(), b = s.adventure.active?.battle; if (!b)
    throw Error('No current tactical encounter'); const id = b.heroes.some(a => a.heroId === worldUI.selectedHero && a.ap > 0 && s.adventure.heroes.find(h => h.id === a.heroId)?.hp) ? worldUI.selectedHero : b.heroes.find(a => a.ap > 0 && s.adventure.heroes.find(h => h.id === a.heroId)?.hp)?.heroId; const h = s.adventure.heroes.find(h => h.id === id); if (!h)
    throw Error('No hero actions remain. Resolve the enemy phase.'); return h; }
function selectedBattleEnemy() { const b = requireState().adventure.active?.battle; const en = b?.enemies.find(e => e.id === worldUI.selectedEnemy && e.hp > 0) ?? b?.enemies.find(e => e.hp > 0); if (!en)
    throw Error('No active enemy'); return en.id; }
ROOT.addEventListener('change', async (ev) => { const target = ev.target; if (target.id === 'import-slot-select')
    importSlot = Number(target.value); if (target.id === 'import-source-slot')
    sourceSlot = Number(target.value); if (target.id === 'import-file' && target.files?.[0])
    await doImport(target.files[0]); });
ROOT.addEventListener('click', async (ev) => {
    const node = ev.target.closest('[data-action]');
    if (!node)
        return;
    const action = node.dataset.action ?? '', id = node.dataset.id ?? '';
    if (action === 'modal-backdrop' && ev.target !== node)
        return;
    if (working)
        return;
    try {
        switch (action) {
            case 'nav':
                switchHub(id);
                break;
            case 'goto-council':
                switchHub('council');
                break;
            case 'goto-world':
                switchHub('world');
                break;
            case 'goto-progress':
                switchHub('progress');
                break;
            case 'goto-military':
                worldUI.tab = 'military';
                switchHub('world');
                break;
            case 'goto-regions':
                worldUI.tab = 'regions';
                switchHub('world');
                break;
            case 'goto-finale':
                worldUI.tab = 'regions';
                switchHub('world');
                document.getElementById('earned-endings')?.scrollIntoView({ block: 'start' });
                break;
            case 'jump-endings':
                document.getElementById('earned-endings')?.scrollIntoView({ block: 'start' });
                break;
            case 'title':
                pendingLegacy = null;
                state = null;
                hub = 'kingdom';
                modal = null;
                await refreshSlots();
                render();
                break;
            case 'continue-last': {
                if (!slots.length)
                    break;
                await openSlot([...slots].sort((a, b) => b.updated - a.updated)[0].slot);
                break;
            }
            case 'load-slot':
                await openSlot(Number(id));
                break;
            case 'open-new':
                pendingLegacy = null;
                modal = 'new';
                render();
                break;
            case 'new-game-plus': {
                const prior = requireState();
                if (!prior.act5.ending)
                    throw Error('Earn an ending before beginning New Game+.');
                pendingLegacy = { ending: prior.act5.ending, name: prior.name, week: prior.turn };
                modal = 'new';
                render();
                break;
            }
            case 'new-slot':
                pendingLegacy = null;
                modal = 'new';
                render();
                const sel = document.getElementById('new-slot-select');
                if (sel)
                    sel.value = id;
                break;
            case 'create-reign':
                await createSlot();
                break;
            case 'confirm-delete':
                selectedParcel = Number(id);
                modal = 'delete';
                render();
                break;
            case 'delete-confirm':
                await deleteSlot(Number(selectedParcel));
                selectedParcel = undefined;
                modal = null;
                await refreshSlots();
                render();
                break;
            case 'close-modal':
            case 'modal-backdrop':
                modal = null;
                selectedParcel = undefined;
                render();
                break;
            case 'build':
                selectedParcel = undefined;
                modal = 'build';
                render();
                break;
            case 'ledger':
                modal = 'ledger';
                render();
                break;
            case 'population':
                modal = 'population';
                render();
                break;
            case 'invite-settlers':
                await issue({ type: 'invite_settlers' });
                break;
            case 'settings':
                modal = 'settings';
                render();
                break;
            case 'campaign-details':
                modal = 'campaign';
                render();
                break;
            case 'campaign-continue':
                modal = null;
                {
                    const c = currentCampaign(requireState());
                    if (c.destination === 'council')
                        switchHub('council');
                    else {
                        worldUI.tab = 'regions';
                        switchHub('world');
                    }
                }
                break;
            case 'briefing-jump':
                if (id === 'ledger') {
                    modal = 'ledger';
                    render();
                }
                else if (id === 'advance') {
                    modal = 'advance';
                    render();
                }
                else if (id === 'council')
                    switchHub('council');
                else if (id === 'progress')
                    switchHub('progress');
                else if (id === 'world') {
                    worldUI.tab = requireState().military.battle ? 'military' : requireState().adventure.active ? 'expeditions' : 'regions';
                    switchHub('world');
                }
                break;
            case 'chronicle-search':
                chronicleQuery = document.getElementById('chronicle-search')?.value ?? '';
                chronicleLimit = 45;
                render();
                break;
            case 'chronicle-clear':
                chronicleQuery = '';
                chronicleLimit = 45;
                render();
                break;
            case 'chronicle-more':
                chronicleLimit += 45;
                render();
                break;
            case 'legacy-gallery': {
                for (const meta of slots) {
                    try {
                        const x = await loadSlot(meta.slot);
                        if (x)
                            await indexLegacy(x.state);
                    }
                    catch { /* Missing or invalid saves remain in their slots. */ }
                }
                modal = 'legacy';
                render();
                break;
            }
            case 'legacy-clear':
                if (window.confirm('Clear only the Endings Library record? Existing reigns and exports will NOT be deleted.')) {
                    legacyRecords = [];
                    await saveSetting('legacy-records-v1', legacyRecords);
                    notify('Endings Library record cleared. Saved reigns are unchanged.');
                }
                break;
            case 'export-all': {
                const count = await exportAllReigns();
                notify(`Downloaded a backup containing ${count} reign${count !== 1 ? 's' : ''}.`);
                break;
            }
            case 'save-recovery':
                recoveryStatus = await recoveryInfo(requireState().slot);
                modal = 'recovery';
                render();
                break;
            case 'restore-previous':
                if (window.confirm('Restore the previous saved snapshot? This rolls back the current reign. Export your current save first if you want to keep it.')) {
                    const restored = await restorePreviousSnapshot(requireState().slot);
                    state = restored;
                    await refreshSlots();
                    modal = null;
                    notify('Previous valid snapshot restored. Your current saved reign has been updated.');
                }
                break;
            case 'apply-update': {
                const registration = await navigator.serviceWorker?.getRegistration();
                if (!registration?.waiting)
                    throw Error('No downloaded update is waiting.');
                if (window.confirm('Reload into the new version? Export your save first if you have not yet backed it up.')) {
                    activateUpdate = true;
                    registration.waiting.postMessage({ type: 'ACTIVATE_WHEN_SAFE' });
                }
                break;
            }
            case 'about':
                modal = 'about';
                render();
                break;
            case 'inspect':
                selectedBuilding = id;
                modal = 'inspect';
                render();
                break;
            case 'advance-modal':
                modal = 'advance';
                render();
                break;
            case 'advance-confirm':
                await issue({ type: 'advance' });
                break;
            case 'found':
                await issue({ type: 'found', path: id });
                break;
            case 'event':
                await issue({ type: 'event', id: node.dataset.event, choice: id });
                break;
            case 'research':
                await issue({ type: 'research', id });
                break;
            case 'research-filter':
                researchFilter = id;
                render();
                break;
            case 'fulfill-pledge':
                await issue({ type: 'fulfill_pledge', id });
                break;
            case 'workorder':
                await issue({ type: 'workorder', id });
                break;
            case 'build-item':
                await issue({ type: 'build', kind: id, parcel: selectedParcel });
                break;
            case 'quarry-build':
                selectedParcel = undefined;
                modal = 'build';
                render();
                break;
            case 'upgrade':
                await issue({ type: 'upgrade', buildingId: id });
                break;
            case 'worker':
                await issue({ type: 'workers', buildingId: id, delta: Number(node.dataset.delta) });
                break;
            case 'world-tab':
                worldUI.tab = id;
                worldUI.selectedMission = '';
                worldUI.selectedHero = '';
                render();
                break;
            case 'mission-preview': {
                const m = MISSIONS_BY_ID[id];
                if (!m)
                    break;
                worldUI.tab = 'expeditions';
                worldUI.selectedMission = id;
                worldUI.party = m.id === 'H01' && !requireState().adventure.heroes.some(h => h.id === 'dain') ? ['dain'] : requireState().adventure.heroes.filter(h => !h.injuryWeeks && h.hp > 0).slice(0, 4).map(h => h.id);
                render();
                const scroll = document.getElementById('main-scroll');
                if (scroll)
                    scroll.scrollTop = 0;
                break;
            }
            case 'mission-close':
                worldUI.selectedMission = '';
                render();
                break;
            case 'party-toggle': {
                if (worldUI.party.includes(id))
                    worldUI.party = worldUI.party.filter(x => x !== id);
                else if (worldUI.party.length < 4)
                    worldUI.party.push(id);
                render();
                break;
            }
            case 'mission-start': {
                const m = worldUI.selectedMission;
                await issue({ type: 'mission_start', mission: m, party: [...worldUI.party] });
                worldUI.selectedHero = '';
                worldUI.selectedEnemy = '';
                worldUI.showMoves = false;
                break;
            }
            case 'mission-choice':
                await issue({ type: 'mission_choice', choice: id });
                break;
            case 'mission-retreat': {
                if (window.confirm('Return to Fallowbank? The main mission reward will be lost, but secured optional finds will be kept.'))
                    await issue({ type: 'mission_retreat' });
                break;
            }
            case 'hero-preview':
                worldUI.selectedHero = id;
                worldUI.tab = 'heroes';
                render();
                {
                    const scroll = document.getElementById('main-scroll');
                    if (scroll)
                        scroll.scrollTop = 0;
                }
                break;
            case 'hero-craft':
                await issue({ type: 'hero_craft', recipe: id });
                break;
            case 'hero-enhance':
                await issue({ type: 'hero_enhance', item: id });
                break;
            case 'hero-equip':
                await issue({ type: 'hero_equip', hero: node.dataset.hero ?? '', item: id });
                break;
            case 'hero-unequip':
                await issue({ type: 'hero_unequip', hero: id, slot: node.dataset.slot });
                break;
            case 'hero-attribute':
                await issue({ type: 'hero_attribute', hero: id, attribute: node.dataset.attribute });
                break;
            case 'hero-skill':
                await issue({ type: 'hero_skill', hero: node.dataset.hero ?? '', skill: id });
                break;
            case 'claim-adventure':
                await issue({ type: 'claim_adventure_reward', id });
                break;
            case 'battle-select-hero':
                worldUI.selectedHero = id;
                worldUI.showMoves = false;
                render();
                break;
            case 'battle-select-enemy':
                worldUI.selectedEnemy = id;
                render();
                break;
            case 'battle-select-ally':
                worldUI.selectedAlly = id;
                render();
                break;
            case 'battle-toggle-move':
                worldUI.showMoves = !worldUI.showMoves;
                render();
                break;
            case 'battle-move': {
                const h = selectedBattleHero();
                worldUI.showMoves = false;
                await issue({ type: 'battle_move', hero: h.id, position: Number(id) });
                break;
            }
            case 'battle-jump-orders':
                document.querySelector('.adv-combat-actions,.adv-end-round')?.scrollIntoView({ behavior: settings.reducedMotion ? 'auto' : 'smooth', block: 'center' });
                break;
            case 'battle-attack': {
                const h = selectedBattleHero(), enemyId = selectedBattleEnemy();
                await issue({ type: 'battle_attack', hero: h.id, enemy: enemyId });
                break;
            }
            case 'battle-guard': {
                const h = selectedBattleHero();
                await issue({ type: 'battle_guard', hero: h.id });
                break;
            }
            case 'battle-skill': {
                const h = selectedBattleHero(), target = h.classId === 'warden' ? (worldUI.selectedAlly || h.id) : selectedBattleEnemy();
                await issue({ type: 'battle_skill', hero: h.id, target });
                break;
            }
            case 'battle-technique': {
                const h = selectedBattleHero();
                const def = CLASS_SKILLS[id];
                const target = def?.target === 'ally' ? (worldUI.selectedAlly || h.id) : def?.target === 'enemy' ? selectedBattleEnemy() : '';
                await issue({ type: 'battle_technique', hero: h.id, technique: id, target });
                break;
            }
            case 'battle-medicine': {
                const h = selectedBattleHero();
                await issue({ type: 'battle_medicine', hero: h.id, target: worldUI.selectedAlly || h.id });
                break;
            }
            case 'battle-end-round':
                await issue({ type: 'battle_end_round' });
                worldUI.selectedHero = '';
                worldUI.selectedEnemy = '';
                worldUI.showMoves = false;
                break;
            case 'battle-retreat':
                if (window.confirm('Withdraw from this battle? Your party returns to Fallowbank without the mission completion reward and requires one Council Week to recover.'))
                    await issue({ type: 'battle_retreat' });
                break;
            case 'expedition-start':
                await issue({ type: 'expedition_start' });
                break;
            case 'expedition-choice':
                await issue({ type: 'expedition_choice', choice: id });
                break;
            case 'expedition-finish':
                await issue({ type: 'expedition_finish' });
                break;
            case 'rg-road':
                await issue({ type: 'region_upgrade_road', roadId: id });
                break;
            case 'rg-charter':
                await issue({ type: 'region_charter', sector: id });
                break;
            case 'rg-found':
                await issue({ type: 'region_found', sector: id });
                break;
            case 'rg-trade':
                await issue({ type: 'region_trade', offerId: id });
                break;
            case 'rg-ship':
                await issue({ type: 'region_ship', sector: id, resource: node.dataset.resource, amount: Number(node.dataset.amount) });
                break;
            case 'rg-claim':
                await issue({ type: 'region_claim', caravanId: id });
                break;
            case 'rg-envoy':
                await issue({ type: 'region_envoy', faction: id });
                break;
            case 'rg-restitution':
                await issue({ type: 'region_restitution', faction: id });
                break;
            case 'rg-story':
                await issue({ type: 'region_story', id, choiceId: node.dataset.choice ?? '' });
                break;
            case 'fx-story':
                await issue({ type: 'frontier_story', id, choiceId: node.dataset.choice ?? '' });
                break;
            case 'fx-road':
                await issue({ type: 'frontier_road', gateway: id });
                break;
            case 'fx-trade':
                await issue({ type: 'frontier_trade', offerId: id });
                break;
            case 'fx-claim':
                await issue({ type: 'frontier_claim', caravanId: id });
                break;
            case 'fx-upgrade':
                await issue({ type: 'frontier_settlement_upgrade', sector: id });
                break;
            case 'act5-story':
                await issue({ type: 'act5_story', id, choiceId: node.dataset.choice ?? '' });
                break;
            case 'act5-path':
                await issue({ type: 'act5_path', id: id });
                break;
            case 'act5-pact':
                await issue({ type: 'act5_pact', faction: id });
                break;
            case 'act5-rebuild':
                await issue({ type: 'act5_rebuild' });
                break;
            case 'act5-specialize':
                await issue({ type: 'act5_specialize', id });
                break;
            case 'act5-safeguard':
                await issue({ type: 'act5_safeguard', policy: id });
                break;
            case 'act5-ending': {
                const title = ACT5_ENDINGS.find(e => e.id === id)?.name ?? id;
                if (!window.confirm(`Ratify ${title} as this reign’s permanent ending? You may continue managing the kingdom, but cannot choose another ending on this save.`))
                    break;
                await issue({ type: 'act5_ending', id: id });
                break;
            }
            case 'act5-dispute':
                await issue({ type: 'act5_dispute', faction: id, approach: (node.dataset.approach ?? 'hearing') });
                break;
            case 'act4-story':
                await issue({ type: 'act4_story', id, choiceId: node.dataset.choice ?? '' });
                break;
            case 'act4-access':
                await issue({ type: 'act4_access', policy: id });
                break;
            case 'act4-review':
                await issue({ type: 'act4_review', policy: id });
                break;
            case 'act4-puzzle':
                await issue({ type: 'act4_puzzle', id, answer: node.dataset.answer ?? '' });
                break;
            case 'act3-story':
                await issue({ type: 'act3_story', id, choiceId: node.dataset.choice ?? '' });
                break;
            case 'act3-border':
                await issue({ type: 'act3_border', approach: id });
                break;
            case 'act3-audit':
                await issue({ type: 'act3_audit', approach: id });
                break;
            case 'act3-regency':
                await issue({ type: 'act3_regency', approach: id });
                break;
            case 'act3-restitution':
                await issue({ type: 'act3_restitution', approach: id });
                break;
            case 'act3-summit':
                await issue({ type: 'act3_summit', approach: id });
                break;
            case 'act3-route':
                await issue({ type: 'act3_route', approach: id });
                break;
            case 'depth-commission':
                await issue({ type: 'depth_commission', id, choice: node.dataset.choice ?? '' });
                break;
            case 'depth-specialize':
                await issue({ type: 'depth_specialize', sector: id, specialty: node.dataset.specialty });
                break;
            case 'depth-claim':
                await issue({ type: 'depth_claim', id });
                break;
            case 'military-expand':
                await issue({ type: 'military_expand_command' });
                break;
            case 'military-drill':
                await issue({ type: 'military_drill', squadId: id });
                break;
            case 'military-doctrine':
                await issue({ type: 'military_doctrine', squadId: id, doctrine: node.dataset.doctrine });
                break;
            case 'military-patrol':
                await issue({ type: 'military_patrol', squadId: node.dataset.squad ?? '', sectorId: id });
                break;
            case 'military-fortify':
                await issue({ type: 'military_fortify', sectorId: id });
                break;
            case 'military-provision':
                await issue({ type: 'military_provision', amount: Number(id) });
                break;
            case 'military-recall':
                await issue({ type: 'military_recall_supplies', amount: Number(id) });
                break;
            case 'military-recruit':
                await issue({ type: 'military_recruit', kind: id });
                break;
            case 'military-assign':
                await issue({ type: 'military_assign', squadId: id, role: node.dataset.role });
                break;
            case 'military-demobilize':
                if (window.confirm('Demobilize this squad? Its citizens will return to civilian labor, with no material refund.'))
                    await issue({ type: 'military_demobilize', squadId: id });
                break;
            case 'military-start':
                await issue({ type: 'military_start_battle', scenario: id });
                break;
            case 'military-peace':
                await issue({ type: 'military_resolve_peacefully', scenario: id, approach: node.dataset.approach ?? '' });
                break;
            case 'military-order':
                await issue({ type: 'military_order', squadId: id, order: node.dataset.order });
                break;
            case 'military-round':
                await issue({ type: 'military_resolve_round' });
                break;
            case 'military-retreat':
                if (window.confirm('Withdraw from this border battle? All participating squads will need a Council Week to recover.'))
                    await issue({ type: 'military_retreat' });
                break;
            case 'offline-claim':
                await issue({ type: 'offline_claim' });
                break;
            case 'town-zoom-in':
                town?.zoom(.16);
                break;
            case 'town-reset':
                town?.reset();
                break;
            case 'town-pick': {
                const s = requireState(), p = Number(id), b = s.buildings.find(b => b.parcel === p);
                if (!Number.isInteger(p) || p < 0 || p >= 30)
                    throw Error('Invalid parcel');
                if (b) {
                    selectedBuilding = b.id;
                    modal = 'inspect';
                }
                else {
                    selectedParcel = p;
                    modal = 'build';
                }
                render();
                break;
            }
            case 'town-view-mode':
                townViewMode = townViewMode === 'scenic' ? 'strategy' : 'scenic';
                render();
                break;
            case 'town-zoom-out':
                town?.zoom(-.16);
                break;
            case 'toggle-motion':
                settings.reducedMotion = !settings.reducedMotion;
                await saveSetting('settings', settings);
                render();
                break;
            case 'toggle-text':
                settings.largeText = !settings.largeText;
                await saveSetting('settings', settings);
                render();
                break;
            case 'toggle-contrast':
                settings.highContrast = !settings.highContrast;
                await saveSetting('settings', settings);
                render();
                break;
            case 'export':
                if (state)
                    exportState(state);
                break;
            case 'import':
                importSlot = state?.slot ?? 1;
                sourceSlot = importSlot;
                modal = 'import';
                render();
                break;
            case 'title-import':
                importSlot = 1;
                sourceSlot = 1;
                modal = 'import';
                render();
                break;
            default: break;
        }
    }
    catch (err) {
        notify(err.message, true);
    }
});
window.addEventListener('keydown', ev => {
    if (!modal && state && !ev.altKey && !ev.ctrlKey && !ev.metaKey && !ev.shiftKey && !ev.repeat &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes((document.activeElement?.tagName ?? '')) &&
        ['1', '2', '3', '4', '5'].includes(ev.key)) {
        ev.preventDefault();
        switchHub(['kingdom', 'council', 'world', 'progress', 'chronicle'][Number(ev.key) - 1]);
        return;
    }
    if (ev.key === 'Escape' && modal) {
        modal = null;
        render();
        return;
    }
    if (ev.key === 'Tab' && modal) {
        const dialog = document.querySelector('.modal-window');
        if (!dialog)
            return;
        const focusable = Array.from(dialog.querySelectorAll('button:not(:disabled),input:not(:disabled),select:not(:disabled),[tabindex]:not([tabindex="-1"])'));
        if (!focusable.length)
            return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (ev.shiftKey && document.activeElement === first) {
            ev.preventDefault();
            last.focus();
        }
        else if (!ev.shiftKey && document.activeElement === last) {
            ev.preventDefault();
            first.focus();
        }
    }
});
async function startup() { try {
    await openDB();
    settings = { ...settings, ...(await loadSetting('settings', settings)) };
    await refreshLegacy();
    await refreshSlots();
    render();
    if ('serviceWorker' in navigator && location.protocol !== 'file:') {
        navigator.serviceWorker.addEventListener('controllerchange', () => { if (activateUpdate)
            location.reload(); });
        navigator.serviceWorker.register('./service-worker.js').then(reg => { const check = () => { if (reg.waiting && navigator.serviceWorker.controller) {
            updateReady = true;
        } }; check(); reg.addEventListener('updatefound', () => { reg.installing?.addEventListener('statechange', () => { if (reg.installing?.state === 'installed')
            check(); }); }); }).catch(() => { });
    }
    if (navigator.storage?.persist)
        navigator.storage.persist().catch(() => { });
}
catch (err) {
    storageError = 'Local browser storage is unavailable: ' + err.message + '. Run the site over HTTP(S) and enable browser storage.';
    render();
} }
startup();

import { ACT3_CHAPTERS, act3Available, act3Block } from './act3.js';
const e = (value) => String(value ?? '').replace(/[&<>"']/g, k => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[k] ?? k));
const cost = (o) => Object.entries(o).map(([k, v]) => `${v} ${k.replaceAll('_', ' ')}`).join(' · ');
const can = (s, o) => Object.entries(o).every(([k, v]) => s.resources[k] >= (v ?? 0));
const action = (label, kind, id, missing) => `<button class="rg-action" data-action="${kind}" data-id="${e(id)}" ${missing ? 'disabled' : ''}>${e(label)}</button>`;
function processOptions(s, title, kind, chosen, unlocked, options) {
    if (chosen)
        return `<article class="rg-card"><strong>✓ ${e(title)}</strong><p>${e(options.find(x => x[0] === chosen)?.[1] ?? chosen)} — paid and recorded in the Chronicle.</p></article>`;
    return `<article class="rg-card"><strong>${e(title)}</strong><p>${unlocked ? 'Select a funded, lasting approach. Each option records real consequences.' : 'Complete the preceding Council story and relevant investigation to unlock this choice.'}</p>${options.map(([id, name, price, detail]) => `<div class="act3-operation"><strong>${e(name)}</strong><p>${e(detail)}</p>${action(`Commit · ${cost(price)}`, kind, id, !unlocked || !can(s, price))}</div>`).join('')}</article>`;
}
export function act3StoryView(s) {
    const ch = act3Available(s), block = act3Block(s);
    if (!s.flags['act2.complete'])
        return '';
    if (!ch)
        return `<div class="act3-notice"><span class="eyebrow brass">ACT III · THE BANNER AND THE WHEEL</span><h3>${s.act3.completed.length === ACT3_CHAPTERS.length ? 'Act III Complete — The Road to Veymark' : 'The Investigation Awaits'}</h3><p>${e(block ?? 'Act III is complete. The Gate of Stone record is secured; the deeper Crownwheel investigation belongs to Act IV.')}</p><p>${s.act3.completed.length} / 19 chapters complete · ${s.act3.evidence.length} / 2 verified historical evidence records. ${s.act3.gateRecord ? 'Gate authorization documented.' : ''}</p></div>`;
    return `<div class="act3-chapter"><span class="eyebrow brass">ACT III · ${e(ch.tag)} · ${ch.id}</span><h3 class="story-title">${e(ch.title)}</h3><div class="narrative">${ch.intro.map(x => `<p>${e(x)}</p>`).join('')}</div><div class="section-heading"><h3>Choose a response</h3><span>Costs and outcomes are recorded</span></div><div class="choices">${ch.choices.map(c => `<button type="button" class="choice-card" data-action="act3-story" data-id="${ch.id}" data-choice="${c.id}" ${!can(s, c.cost) ? 'disabled' : ''}><span class="choice-arrow">↗</span><strong>${e(c.label)}</strong><small>${e(c.detail)}</small><small>Cost: ${e(cost(c.cost))}</small>${!can(s, c.cost) ? '<small class="req">Obtain materials before accepting this approach.</small>' : ''}</button>`).join('')}</div></div>`;
}
export function act3RegionsView(s) {
    if (!s.flags['act2.complete'])
        return '';
    const a = s.act3, started = a.completed.length, block = act3Block(s);
    const border = [['arbitration', 'Independent Arbitration', { gold: 32, knowledge: 6 }, 'Independent evidence and neutral representatives settle the road claim.'], ['shared_access', 'Shared Access Charter', { gold: 29, planks: 5, food: 5 }, 'Both independent communities retain their rights to the road.'], ['defensive_watch', 'Defensive Crossing Watch', { gold: 33, stone: 8, tools: 3 }, 'A supervised protective patrol, not a military annexation.']];
    const audits = [['open_commission', 'Independent Evidence Commission', { gold: 30, knowledge: 7 }, 'Archive specialists verify the recovered documents independently.'], ['engineering_review', 'Engineering Review', { gold: 34, mechanisms: 3, tools: 3 }, 'Inspect material alterations and signed maintenance records.'], ['witness_copies', 'Distributed Witness Copies', { gold: 28, planks: 5, knowledge: 5 }, 'Preserve matching copies for communities affected by the old system.']];
    return `<section class="act3-root" id="act3-strategy"><div class="act3-hero"><span class="fx-kicker">ACT III · THE BANNER AND THE WHEEL</span><h3>From the Border to Veymark</h3><p>Two maps, one crossing, and the first verifiable record of the ancient interruption. Your government must earn authority, not assume it.</p><div class="fx-metrics"><span>${started}/19 Council chapters</span><span>${a.evidence.length}/2 verified clues</span><span>${a.border ? 'Border settled' : 'Border disputed'}</span></div></div>
 <div class="rg-section-title"><h3>Eastbridge Border Settlement</h3><span>${a.border ? 'Ratified' : 'Requires ST3-02'}</span></div><div class="act3-map"><span>FALLOWBANK</span><span>══ LENNE CROSSING ══</span><span>EASTBRIDGE</span></div><p class="act3-detail">A signed agreement changes access and faction relations, but never annexes an independent settlement or creates residents.</p>
 ${a.border ? `<div class="rg-notice"><strong>✓ ${e(border.find(x => x[0] === a.border)?.[1])}</strong><p>Both parties retain their independent government. This outcome is recorded in the Chronicle.</p></div>` : `<div class="rg-list">${border.map(([id, name, price, detail]) => `<article class="rg-card"><strong>${e(name)}</strong><p>${e(detail)}</p>${action(`Establish · ${cost(price)}`, 'act3-border', id, !a.completed.includes('ST3-02') || !can(s, price))}</article>`).join('')}</div>`}
 <div class="rg-section-title"><h3>Historic Evidence Review</h3><span>${a.audit ? 'Commission signed' : 'Optional preparation'}</span></div><p class="act3-detail">You must recover the Quiet Registry order, an engineering discrepancy, and the regulator relay warning before the final review. The evidence does not automatically prove anyone's private intentions.</p>
 ${a.audit ? `<div class="rg-notice"><strong>✓ ${e(audits.find(x => x[0] === a.audit)?.[1])}</strong><p>The investigation has been funded. Its verified findings are available to the next Council chapter.</p></div>` : `<div class="rg-list">${audits.map(([id, name, price, detail]) => `<article class="rg-card"><strong>${e(name)}</strong><p>${e(detail)}</p>${action(`Fund review · ${cost(price)}`, 'act3-audit', id, !a.completed.includes('ST3-07') || !s.adventure.completed.includes('H20') || !can(s, price))}</article>`).join('')}</div>`}
 <div class="rg-section-title"><h3>Investigation Ledger</h3><span>Only verified evidence counts</span></div><div class="rg-list">${[['EV-06', 'Emergency Interruption Order', 'ST3-05'], ['EV-07', 'Altered Safeguards: Engineering Discrepancy', 'ST3-07']].map(([id, name, scene]) => `<div class="rg-card"><strong>${a.evidence.includes(id) ? '✓' : '○'} ${e(id)} · ${e(name)}</strong><p>${a.evidence.includes(id) ? 'Verified through the Council with supporting expedition evidence.' : `Unverified. Complete ${scene} after its required expedition.`}</p></div>`).join('')}</div>
 ${block ? `<div class="rg-notice"><strong>Next story objective</strong><p>${e(block)}</p></div>` : ''}
 <div class="rg-section-title"><h3>Regency, Accountability & Summit</h3><span>Political terms are paid, not assumed</span></div>
 <div class="rg-list">
 ${processOptions(s, 'Regency Security Response', 'act3-regency', a.regency, a.completed.includes('ST3-10'), [
        ['limited_security', 'Limited Security Compact', { gold: 28, tools: 3, food: 5 }, 'An explicitly limited security arrangement with the Regency, without annexation.'],
        ['civic_guarantees', 'Civic Review Charter', { gold: 24, knowledge: 7 }, 'Publish civilian oversight and avenues for challenging temporary mandates.'],
        ['independent_coalition', 'Independent Border Coalition', { gold: 32, planks: 5, food: 6 }, 'Coordinate independent communities through paid defensive cooperation.']
    ])}
 ${processOptions(s, 'Mara’s Restitution', 'act3-restitution', a.restitution, a.completed.includes('ST3-10') && s.adventure.completed.includes('H21') && !!a.regency, [
        ['repay_wagons', 'Restore Requisitioned Supplies', { gold: 35, food: 8 }, 'Repay documented civilian losses using genuine kingdom resources.'],
        ['public_inquiry', 'Public Military Inquiry', { gold: 25, knowledge: 8 }, 'Fund open investigation and preservation of the original requisition records.'],
        ['supply_reform', 'Civilian Supply Protection', { gold: 28, tools: 4, planks: 4 }, 'Adopt a new supply rule that protects civilian property during emergencies.']
    ])}
 ${processOptions(s, 'Six-Faction Summit Framework', 'act3-summit', a.summit, a.completed.includes('ST3-13'), [
        ['shared_council', 'Shared Council Framework', { gold: 44, knowledge: 10, food: 8 }, 'Provisional talks with Tideglass, Copperwash and Brackenveil.'],
        ['regulated_security', 'Bounded Security Framework', { gold: 42, tools: 6, planks: 6 }, 'Provisional talks with Regency, Kilnspire and Copperwash.'],
        ['independent_inspection', 'Independent Technical Inspection', { gold: 38, glass: 5, knowledge: 10 }, 'Provisional talks with Starveil, Tideglass and Kilnspire.']
    ])}
 </div>
 <div class="rg-section-title"><h3>Passage to the Ruined Capital</h3><span>${a.route ? 'Expedition route funded' : 'Requires ST3-16 and H22'}</span></div>
 <div class="rg-list">${processOptions(s, 'Approach to Veymark', 'act3-route', a.route, a.completed.includes('ST3-16'), [
        ['negotiated', 'Negotiated Safe Passage', { gold: 46, knowledge: 8, food: 8 }, 'Pay for a diplomatic convoy under written protections.'],
        ['engineered', 'Repaired Stone Causeway', { gold: 40, planks: 10, tools: 5 }, 'Restore a damaged but surveyed causeway.'],
        ['scouted', 'Surveyed Wilderness Approach', { gold: 32, food: 12, knowledge: 7 }, 'Use Rook’s surveyed detour and carry enough field provisions.'],
        ['escorted', 'Protected Convoy', { gold: 38, food: 10, iron: 4 }, 'Fund a limited armed escort; the expedition does not annex foreign territory.']
    ])}</div>
 <div class="rg-section-title"><h3>Summit & Authorization Record</h3><span>Verified, not assumed</span></div>
 <div class="rg-notice"><strong>${a.summit ? `Provisional support: ${e(a.summitSupport.join(' · '))}` : 'No summit framework ratified yet'}</strong><p>${a.gateRecord ? 'The Gate of Stone authorization has been verified. The full Crownwheel mechanism remains unknown.' : 'H21 investigates military accountability; H22 surveys the Crownroad; H23 recovers the outer gate authorization.'}</p>${s.flags['act3.complete'] ? '<strong>✓ ACT III COMPLETE — Veymark open for future Act IV content</strong>' : ''}</div>
 ${block ? `<div class="rg-notice"><strong>Next campaign step</strong><p>${e(block)}</p></div>` : ''}
 <p class="act3-detail">Act III can be completed by negotiation and exploration. The Crownwheel interior, full technical verdict, Acts IV–V and eight ending projects remain future content.</p></section>`;
}

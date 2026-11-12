import { BUILDINGS, CONTENT_VERSION, RESEARCH_BY_ID, RESOURCE_KEYS, SCHEMA_VERSION, WORK_ORDERS } from './content.js';
import { FOUNDING_EVENTS, COUNCIL_BY_ID, ADVISERS } from './council.js';
import { newAdventureState, recruitHero, handleAdventure, adventureInvariants } from './adventure.js';
import { newMilitaryState, militaryPersonnel, militaryGoldUpkeep, militaryFieldNeed, militaryAdvanceWeek, militaryInvariants, handleMilitary } from './military.js';
import { newRegionalState, regionalForecast, regionalAdvanceWeek, regionalInvariants, handleRegional } from './regional.js';
import { newFrontierState, frontierForecast, frontierAdvanceWeek, frontierInvariants, handleFrontier } from './frontier.js';
import { newDepthState, depthInvariants, depthUpkeep, handleDepth } from './depth.js';
import { newAct3State, handleAct3, act3Invariants } from './act3.js';
import { newAct4State, handleAct4, act4Invariants } from './act4.js';
import { newAct5State, handleAct5, act5Invariants, mandateForecast, specializationForecast } from './act5.js';
export const INITIAL_RESOURCES = { gold: 150, food: 45, timber: 24, stone: 16, knowledge: 0, tools: 0, herbs: 0, clay: 0, bricks: 0, planks: 0, iron_ore: 0, iron: 0, medicine: 0, glass: 0, living_timber: 0, mechanisms: 0 };
const newEntry = (s, title, body, type) => { s.chronicle.unshift({ id: 'entry-' + s.nextId++, turn: s.turn, title, body, type }); };
export function newGame(slot, name = 'Fallowbank') {
    return { schemaVersion: SCHEMA_VERSION, contentVersion: CONTENT_VERSION, revision: 0, slot, name: name.trim().slice(0, 28) || 'Fallowbank', turn: 0, resources: { ...INITIAL_RESOURCES }, population: 12,
        buildings: [{ id: 'building-1', kind: 'common_hall', level: 1, parcel: 14, workers: 0 }, { id: 'building-2', kind: 'cottages', level: 1, parcel: 13, workers: 0 }, { id: 'building-3', kind: 'farm', level: 1, parcel: 7, workers: 2 }, { id: 'building-4', kind: 'forager', level: 1, parcel: 8, workers: 2 }, { id: 'building-5', kind: 'watchtower', level: 0, parcel: 20, workers: 0 }],
        completedEvents: [], research: [], flags: {}, chronicle: [], nextId: 6, workOrdersUsed: 0, lastInviteTurn: -2, activeExpedition: null, expeditionDone: false, heroRecruited: false, pendingOfflineAt: Date.now(), lastSavedAt: Date.now(), provisionsClaimed: false, civic: { publicTrust: 50, landHealth: 65, tradeStanding: 10, safetyBonus: 0 }, adviserTrust: { bera: 50, tovin: 50, mara: 50, iven: 50, nella: 50, rook: 50, sella: 50 }, pledges: [], foodStableWeeks: 0, adventure: newAdventureState(), military: newMilitaryState(), regional: newRegionalState(), frontier: newFrontierState(), depth: newDepthState(), act3: newAct3State(), act4: newAct4State(), act5: newAct5State() };
}
export function yearWeek(turn) { const week = turn % 48 + 1; return { year: 186 + Math.floor(turn / 48), week, season: ['Spring', 'Summer', 'Autumn', 'Winter'][Math.floor((week - 1) / 12)], seasonWeek: (week - 1) % 12 + 1 }; }
export function workforce(s) { return Math.floor(s.population * 0.75); }
export function housing(s) { return s.buildings.filter(b => b.kind === 'cottages').reduce((sum, b) => sum + 12 + 4 * b.level, 0); }
export function employed(s) { return s.buildings.reduce((x, b) => x + b.workers, 0); }
export function safety(s) { return 10 + s.civic.safetyBonus + s.research.reduce((v, id) => v + (RESEARCH_BY_ID[id]?.safetyBonus ?? 0), 0) + s.buildings.reduce((x, b) => x + (b.kind === 'watchtower' && b.level > 0 ? 8 + 3 * (b.level - 1) : 0) + (b.kind === 'well' ? 2 * b.level : 0) + (b.kind === 'signal_post' ? 3 * b.level : 0), 0); }
export function capacity(s, key) { const extra = s.buildings.filter(b => b.kind === 'storehouse').reduce((v, b) => v + b.level * 60, 0); if (key === 'food')
    return 180 + extra + s.research.reduce((v, id) => v + (RESEARCH_BY_ID[id]?.capacityBonus?.resource === 'food' ? (RESEARCH_BY_ID[id]?.capacityBonus?.amount ?? 0) : 0), 0); if (key === 'timber' || key === 'stone')
    return 120 + extra; if (key === 'gold')
    return 2000; if (key === 'knowledge')
    return 250; return 100 + extra; }
export function hasResources(s, cost) { return Object.entries(cost).every(([key, value]) => s.resources[key] >= (value ?? 0)); }
export function costLabel(cost) { return Object.entries(cost).filter(([, v]) => v && v > 0).map(([k, v]) => `${v} ${k === 'timber' ? 'Timber' : k[0].toUpperCase() + k.slice(1)}`).join(' · ') || 'Free'; }
function spend(s, cost) { if (!hasResources(s, cost))
    throw new Error('Not enough resources: ' + costLabel(cost)); for (const [key, v] of Object.entries(cost))
    s.resources[key] -= v ?? 0; }
function add(s, res) { for (const [key, v] of Object.entries(res)) {
    const r = key;
    if (s.resources[r] + (v ?? 0) > capacity(s, r))
        throw new Error('Not enough ' + key + ' storage for this reward. Spend supplies or build a Storehouse first.');
} for (const [key, v] of Object.entries(res))
    s.resources[key] += v ?? 0; }
export function buildingYield(s, b) { if (b.level < 1)
    return {}; const d = BUILDINGS[b.kind], out = {}; const ratio = d.workers ? b.workers / d.workers : 1; for (const [key, value] of Object.entries(d.yield ?? {})) {
    let v = (value ?? 0) + (b.level - 1) * (key === 'food' ? 4 : key === 'gold' ? 2 : 2);
    if (b.kind === 'farm' && key === 'food' && s.research.includes('irrigation'))
        v += 2;
    if (b.kind === 'lumber' && key === 'timber' && s.research.includes('forest'))
        v += 2;
    if (b.kind === 'quarry' && key === 'stone' && s.research.includes('masonry'))
        v += 2;
    if (b.kind === 'common_hall' && key === 'gold') {
        if (s.research.includes('ledgers'))
            v += 2;
        if (s.research.includes('planning'))
            v += 1;
    }
    if (b.kind === 'common_hall' && key === 'knowledge' && s.research.includes('archives'))
        v += 1;
    for (const id of s.research) {
        const bonus = RESEARCH_BY_ID[id]?.bonus;
        if (bonus?.building === b.kind && bonus.resource === key)
            v += bonus.amount;
    }
    out[key] = Math.floor(v * ratio);
} return out; }
export function weeklyForecast(s) {
    // The forecast and the weekly command share exactly this deterministic production model.
    const before = s.resources, working = { ...before };
    const breakdown = [];
    const structures = [...s.buildings].filter(b => b.level > 0).sort((a, b) => (BUILDINGS[a.kind].processTier ?? 0) - (BUILDINGS[b.kind].processTier ?? 0) || a.id.localeCompare(b.id));
    for (const b of structures) {
        const d = BUILDINGS[b.kind];
        const y = buildingYield(s, b);
        const inputs = d.inputs ?? {};
        const fraction = d.workers ? b.workers / d.workers : 1;
        if (d.workers && b.workers < d.workers)
            breakdown.push(`${d.name} is understaffed (${b.workers}/${d.workers})`);
        const scaled = {};
        for (const [key, amount] of Object.entries(inputs))
            scaled[key] = Math.ceil((amount ?? 0) * fraction);
        const operating = Object.values(y).some(v => v && v > 0);
        const lacks = operating && Object.entries(scaled).some(([key, amount]) => working[key] < (amount ?? 0));
        const noRoom = operating && Object.entries(y).every(([key, v]) => !v || v <= 0 || working[key] >= capacity(s, key));
        if (lacks || noRoom) {
            breakdown.push(`${d.name}: ${lacks ? 'waiting for recipe inputs' : 'output storage full'}`);
        }
        else {
            for (const [key, amount] of Object.entries(scaled))
                working[key] -= amount ?? 0;
            for (const [key, amount] of Object.entries(y))
                working[key] = Math.min(capacity(s, key), working[key] + (amount ?? 0));
        }
        const upkeep = d.upkeep ?? 0;
        if (upkeep) {
            working.gold = Math.max(0, working.gold - upkeep);
            breakdown.push(`${d.name}: −${upkeep} Gold upkeep`);
        }
    }
    const wages = militaryGoldUpkeep(s);
    const militaryPaid = working.gold >= wages;
    if (wages) {
        if (militaryPaid)
            working.gold -= wages;
        breakdown.push(militaryPaid ? `Defenders: −${wages} Gold wages` : `Military wages unpaid (${wages} Gold required); squad Morale will decline`);
    }
    const fieldNeed = militaryFieldNeed(s), fieldFromWagon = Math.min(fieldNeed, s.military.fieldSupplies), fieldFood = fieldNeed - fieldFromWagon;
    const fieldShortfall = Math.max(0, fieldFood - working.food);
    if (fieldNeed) {
        working.food -= fieldFood;
        breakdown.push(`Field army: ${fieldFromWagon} carried Food + ${fieldFood} settlement Food (${fieldNeed} additional provisions)`);
        if (fieldShortfall)
            breakdown.push(`Military field supplies short by ${fieldShortfall} Food; readiness suffers.`);
    }
    const regionCost = regionalForecast(s).gold + frontierForecast(s) + depthUpkeep(s);
    const regionPaid = militaryPaid && working.gold >= regionCost;
    if (regionCost) {
        if (regionPaid)
            working.gold -= regionCost;
        breakdown.push(regionPaid ? `Satellite settlements: −${regionCost} Gold operating costs` : `Satellite operating costs of ${regionCost} Gold unpaid; local production pauses`);
    }
    // Pass 25: the established mandate and exactly one funded specialization
    // run separately, in that order. No staff, no output, no upkeep. No storage,
    // no output or upkeep. Both use the real post-wages treasury.
    for (const [programIndex, program] of [mandateForecast(s), specializationForecast(s)].entries()) {
        if (!program.resource || !program.cost)
            continue;
        if (working.gold < program.cost) {
            breakdown.push(`${program.label}: underfunded ${programIndex === 0 ? 'mandate' : 'specialist program'} paused`);
            continue;
        }
        const amount = Math.max(0, Math.min(program.bonus, capacity(s, program.resource) - working[program.resource]));
        if (amount <= 0) {
            breakdown.push(`${program.label}: output storage full; no program cost paid`);
            continue;
        }
        working.gold -= program.cost;
        working[program.resource] += amount;
        breakdown.push(`${program.label}: −${program.cost} Gold, +${amount} ${program.resource.replaceAll('_', ' ')} through a staffed program`);
    }
    const relief = s.research.reduce((v, id) => v + (RESEARCH_BY_ID[id]?.foodRelief ?? 0), 0);
    const eating = Math.max(0, Math.ceil(s.population * 2 / 3) - relief);
    working.food -= eating;
    breakdown.push(`${s.population} residents consume ${eating} Food`);
    const changes = Object.fromEntries(RESOURCE_KEYS.map(k => [k, working[k] - before[k]]));
    return { changes, breakdown, foodAfter: working.food, militaryPaid, fieldShortfall, regionPaid, regionCost };
}
export function foundingMilestones(s) {
    return [
        { id: 'population', label: 'A community of 20 residents', done: s.population >= 20, detail: `${s.population} / 20 residents` },
        { id: 'food', label: 'Three stable Food weeks', done: s.foodStableWeeks >= 3, detail: `${Math.min(3, s.foodStableWeeks)} / 3 consecutive positive Food weeks` },
        { id: 'buildings', label: 'Six functioning settlement structures', done: s.buildings.filter(b => b.level > 0).length >= 6, detail: `${s.buildings.filter(b => b.level > 0).length} / 6 buildings` },
        { id: 'research', label: 'Three researched improvements', done: s.research.length >= 3, detail: `${s.research.length} / 3 discoveries` },
        { id: 'evidence', label: 'The Watchtower inscription recovered', done: !!s.flags.evidence, detail: s.flags.evidence ? 'Evidence secured' : 'Investigate beneath the tower' }
    ];
}
export function councilChoiceBlock(s, c) {
    if (c.cost && !hasResources(s, c.cost))
        return 'Insufficient resources: ' + costLabel(c.cost);
    if (c.pledge && s.pledges.filter(p => p.status === 'active').length >= 3)
        return 'Resolve one of your three active promises first';
    return null;
}
function councilReady(s, id) {
    const e = COUNCIL_BY_ID[id];
    if (!e || s.completedEvents.includes(id) || s.turn < e.minTurn)
        return false;
    if (e.requires?.some(req => req === 'evidence' ? !s.flags.evidence : req.startsWith('event:') ? !s.completedEvents.includes(req.slice(6)) : !s.flags[req]))
        return false;
    if (id === 'FH-035' && !foundingMilestones(s).every(x => x.done))
        return false;
    return true;
}
export function availableEvent(s) {
    if (!s.completedEvents.includes('FH-001'))
        return 'FH-001';
    if (!s.completedEvents.includes('FH-002'))
        return 'FH-002';
    if (s.turn >= 1 && !s.completedEvents.includes('FH-003'))
        return 'FH-003';
    if (s.turn >= 2 && s.completedEvents.includes('FH-003') && !s.completedEvents.includes('FH-005'))
        return 'FH-005';
    if (s.expeditionDone && !s.completedEvents.includes('FH-008'))
        return 'FH-008';
    // Historical anchors outrank optional events when eligible.
    for (const id of ['FH-011', 'FH-017', 'FH-028', 'FH-035'])
        if (councilReady(s, id))
            return id;
    return FOUNDING_EVENTS.find(e => !e.story && councilReady(s, e.id))?.id ?? null;
}
export function availableLabor(s) { return Math.max(0, workforce(s) - employed(s) - militaryPersonnel(s)); }
export function canBuild(s, kind) {
    const def = BUILDINGS[kind];
    if (!s.completedEvents.includes('FH-001'))
        return 'Complete your founding choice first';
    if (kind === 'common_hall' || kind === 'watchtower')
        return 'Use the existing landmark';
    if (def.research && !s.research.includes(def.research))
        return 'Requires research: ' + RESEARCH_BY_ID[def.research]?.name;
    if (def.flag === 'ore_source' && !((s.flags['orchard.surveyed'] || s.flags['orchard.mine_authorized']) || s.research.includes('ore_survey')))
        return 'Survey a workable Iron deposit';
    if (def.flag && def.flag !== 'ore_source' && !s.flags[def.flag])
        return 'Requires the first Quarry survey';
    if (!hasResources(s, def.cost))
        return 'Missing materials';
    if (!s.buildings.some(() => true))
        return 'Missing settlement';
    if (!Array.from({ length: 30 }, (_, i) => i).some(i => !s.buildings.some(b => b.parcel === i)))
        return 'No free parcels';
    return null;
}
export function advancePrediction(s) { const f = weeklyForecast(s); return RESOURCE_KEYS.map(k => ({ key: k, current: s.resources[k], delta: f.changes[k], next: Math.max(0, Math.min(capacity(s, k), s.resources[k] + f.changes[k])) })); }
export function reduceState(original, cmd) {
    const s = structuredClone(original);
    let note = '';
    if (!s.completedEvents.includes('FH-001') && cmd.type !== 'found')
        throw new Error('Choose the founding investment at the Royal Council before using other kingdom actions.');
    switch (cmd.type) {
        case 'found': {
            if (availableEvent(s) !== 'FH-001')
                throw new Error('The founding decision has already been made.');
            const titles = { farm: 'The Harvest First', watchtower: 'A Watch Above Us', lumber: 'The Builders’ Promise' };
            const b = s.buildings.find(b => b.kind === cmd.path || (cmd.path === 'lumber' && b.kind === 'lumber'));
            if (cmd.path === 'farm') {
                spend(s, { gold: 20, timber: 8, stone: 2 });
                if (!b)
                    throw new Error('Farm missing');
                b.level = 2;
            }
            if (cmd.path === 'watchtower') {
                spend(s, { gold: 45, timber: 18, stone: 12 });
                if (!b)
                    throw new Error('Watchtower missing');
                b.level = 1;
            }
            if (cmd.path === 'lumber') {
                spend(s, { gold: 30, timber: 12 });
                s.buildings.push({ id: `building-${s.nextId++}`, kind: 'lumber', level: 1, parcel: 16, workers: Math.min(2, availableLabor(s)) });
                s.pendingOfflineAt = Date.now();
            }
            s.flags['founding.' + cmd.path] = true;
            s.completedEvents.push('FH-001');
            note = titles[cmd.path];
            newEntry(s, 'The First Choice', `The founders chose ${cmd.path === 'farm' ? 'to strengthen their harvest' : cmd.path === 'watchtower' ? 'to restore the old watchtower' : 'to establish their lumber camp'}. Fallowbank took its first step.`, 'story');
            break;
        }
        case 'event': {
            if (availableEvent(s) !== cmd.id)
                throw new Error('That council event is not available.');
            if (cmd.id === 'FH-002') {
                if (cmd.choice === 'welcome') {
                    if (s.population + 2 > housing(s))
                        throw new Error('Insufficient housing.');
                    spend(s, { food: 6 });
                    s.population += 2;
                    s.flags['travelers.welcome'] = true;
                    note = 'Two travelers have joined Fallowbank.';
                    newEntry(s, 'New Hearths', 'Two travelers settled in Fallowbank after receiving provisions.', 'story');
                }
                else if (cmd.choice === 'trade') {
                    spend(s, { food: 4 });
                    add(s, { gold: 12 });
                    s.flags['travelers.trade'] = true;
                    note = 'The travelers exchanged goods and continued their journey.';
                    newEntry(s, 'The Road Exchange', 'The settlement traded provisions with passing travelers for Gold.', 'story');
                }
                else if (cmd.choice === 'decline') {
                    s.flags['travelers.decline'] = true;
                    note = 'The travelers continued down the road.';
                    newEntry(s, 'A Quiet Departure', 'The founders kept their limited provisions and wished the travelers safe passage.', 'story');
                }
                else
                    throw new Error('Unknown council choice.');
            }
            else if (cmd.id === 'FH-003') {
                if (cmd.choice !== 'survey')
                    throw new Error('Complete the authorized Site Survey.');
                s.flags.quarry = true;
                note = 'Old Stone Quarry revealed. Stone extraction can now be built.';
                newEntry(s, 'The First Site Survey', 'Rook located workable Stone in an abandoned quarry near the valley road.', 'world');
            }
            else if (cmd.id === 'FH-005') {
                if (cmd.choice === 'investigate') {
                    s.flags.cellar = true;
                    note = 'The Watchtower cellar is accessible on the World map.';
                }
                else if (cmd.choice === 'study') {
                    s.flags.cellar = true;
                    add(s, { knowledge: 2 });
                    note = 'The old markings reveal a clue; cellar expedition unlocked.';
                }
                else
                    throw new Error('Unknown investigation.');
                newEntry(s, 'The Tower’s Foundation', 'A stairwell under the ruined watchtower leads to a forgotten First Charter chamber.', 'story');
            }
            else if (cmd.id === 'FH-008') {
                if (cmd.choice === 'record') {
                    add(s, { knowledge: 3 });
                    s.flags.evidence = true;
                    note = 'The first Charter record is safely entered in the Chronicle.';
                }
                else if (cmd.choice === 'preserve') {
                    add(s, { knowledge: 2 });
                    s.flags.evidence = true;
                    note = 'The old Charter record is preserved for further research.';
                }
                else
                    throw new Error('Unknown evidence decision.');
                newEntry(s, 'The First Remembering', 'The old inscription names agreements made beneath the Witnessgrove. Some dates do not match the accepted history.', 'story');
            }
            else {
                const event = COUNCIL_BY_ID[cmd.id];
                if (!event)
                    throw new Error('Unknown council record.');
                const choice = event.choices.find(c => c.id === cmd.choice);
                if (!choice)
                    throw new Error('Unknown council choice.');
                const blocked = councilChoiceBlock(s, choice);
                if (blocked)
                    throw new Error(blocked);
                if (choice.cost)
                    spend(s, choice.cost);
                if (choice.gain) {
                    let excess = false;
                    for (const [key, amount] of Object.entries(choice.gain)) {
                        const k = key, space = capacity(s, k) - s.resources[k], take = Math.max(0, Math.min(space, amount ?? 0));
                        s.resources[k] += take;
                        if (take < (amount ?? 0))
                            excess = true;
                    }
                    if (excess)
                        note = 'Some rewards exceeded storage and were not collected. ';
                }
                if (choice.civic)
                    for (const [key, delta] of Object.entries(choice.civic)) {
                        const k = key;
                        s.civic[k] = Math.max(k === 'safetyBonus' ? 0 : 0, Math.min(k === 'safetyBonus' ? 100 : 100, s.civic[k] + (delta ?? 0)));
                    }
                if (choice.adviser) {
                    const [key, delta] = choice.adviser;
                    s.adviserTrust[key] = Math.max(0, Math.min(100, s.adviserTrust[key] + delta));
                }
                if (choice.flag)
                    s.flags[choice.flag] = true;
                if (choice.pledge) {
                    const p = choice.pledge;
                    s.pledges.push({ id: 'pledge-' + s.nextId++, title: p.title, acceptedTurn: s.turn, dueTurn: s.turn + p.dueIn, cost: p.cost, reward: p.reward, successTrust: p.successTrust, failureTrust: p.failureTrust, status: 'active' });
                }
                note += `${event.title}: ${choice.label}.`;
                newEntry(s, event.title, `${event.intro[0]} Your council chose: ${choice.label}. ${choice.pledge ? 'A timed promise was entered in the Promise Book.' : choice.detail}`, 'story');
                if (cmd.id === 'FH-035')
                    s.flags['act1.complete'] = true;
            }
            s.completedEvents.push(cmd.id);
            break;
        }
        case 'fulfill_pledge': {
            const pledge = s.pledges.find(x => x.id === cmd.id && x.status === 'active');
            if (!pledge)
                throw new Error('This promise is no longer active.');
            if (s.turn >= pledge.dueTurn)
                throw new Error('The promised delivery is already past its deadline.');
            spend(s, pledge.cost);
            // Promise rewards are bounded by storage; the promise is honored even if the warehouse is full.
            let excess = false;
            for (const [key, amount] of Object.entries(pledge.reward)) {
                const k = key, space = capacity(s, k) - s.resources[k], take = Math.max(0, Math.min(space, amount ?? 0));
                s.resources[k] += take;
                if (take < (amount ?? 0))
                    excess = true;
            }
            pledge.status = 'fulfilled';
            s.civic.publicTrust = Math.min(100, s.civic.publicTrust + pledge.successTrust);
            note = `Promise fulfilled: ${pledge.title}.${excess ? ' Some rewards exceeded storage.' : ''}`;
            newEntry(s, 'A Promise Honored', `Fallowbank delivered what was promised: ${pledge.title}.`, 'story');
            break;
        }
        case 'advance': {
            if (s.adventure.active)
                throw new Error('Return from the active adventure before advancing the Council Week.');
            if (s.military.battle)
                throw new Error('Resolve the active border battle or withdraw before advancing the Council Week.');
            if (!s.completedEvents.includes('FH-001'))
                throw new Error('Make the founding decision first.');
            if (s.activeExpedition)
                throw new Error('Finish or return from your current expedition first.');
            const f = weeklyForecast(s);
            if (s.resources.food + f.changes.food < 0)
                throw new Error('Not enough Food for the coming week. Use an emergency supply order first.');
            for (const key of RESOURCE_KEYS) {
                s.resources[key] = Math.max(0, Math.min(capacity(s, key), s.resources[key] + f.changes[key]));
            }
            s.turn++;
            militaryAdvanceWeek(s, f.militaryPaid, f.fieldShortfall > 0);
            regionalAdvanceWeek(s, f.regionPaid);
            frontierAdvanceWeek(s);
            s.workOrdersUsed = 0;
            s.adventure.contractsThisWeek = 0;
            for (const hero of s.adventure.heroes)
                if (hero.injuryWeeks > 0) {
                    hero.injuryWeeks--;
                    if (hero.injuryWeeks === 0)
                        hero.hp = hero.maxHp;
                }
            const grossFood = s.buildings.reduce((v, b) => v + (buildingYield(s, b).food ?? 0), 0);
            const foodNeed = Math.max(0, Math.ceil(s.population * 2 / 3) - s.research.reduce((v, id) => v + (RESEARCH_BY_ID[id]?.foodRelief ?? 0), 0));
            s.foodStableWeeks = grossFood >= foodNeed && s.resources.food > 0 ? Math.min(10000, s.foodStableWeeks + 1) : 0;
            for (const pledge of s.pledges.filter(p => p.status === 'active' && p.dueTurn <= s.turn)) {
                pledge.status = 'broken';
                s.civic.publicTrust = Math.max(0, s.civic.publicTrust + pledge.failureTrust);
                newEntry(s, 'An Unkept Promise', `${pledge.title} was not delivered before its agreed deadline. Fallowbank must live with that record.`, 'story');
            }
            const w = yearWeek(s.turn);
            note = `Welcome to ${w.season}, Week ${w.seasonWeek}. ${f.changes.food >= 0 ? `Food +${f.changes.food}` : `Food ${f.changes.food}`}; ${f.changes.gold >= 0 ? `Gold +${f.changes.gold}` : `Gold ${f.changes.gold}`}.`;
            if (s.turn === 1)
                newEntry(s, 'A Valley Wakes', 'The first week passed. Rook returned with news of an abandoned Stone Quarry.', 'story');
            if (s.turn === 2)
                newEntry(s, 'A Mark Beneath the Stones', 'Tovin reports an old passage beneath the watchtower foundation.', 'story');
            break;
        }
        case 'build': {
            const d = BUILDINGS[cmd.kind];
            const unavailable = canBuild(s, cmd.kind);
            if (unavailable)
                throw new Error(unavailable);
            const occupied = s.buildings.map(b => b.parcel);
            let p = cmd.parcel;
            if (p === undefined)
                p = Array.from({ length: 30 }, (_, i) => i).find(i => !occupied.includes(i));
            if (p === undefined || p < 0 || p >= 30 || occupied.includes(p))
                throw new Error('Choose an empty construction parcel.');
            spend(s, d.cost);
            let workers = Math.min(d.workers, availableLabor(s));
            s.buildings.push({ id: `building-${s.nextId++}`, kind: cmd.kind, level: 1, parcel: p, workers });
            if (cmd.kind === 'lumber')
                s.pendingOfflineAt = Date.now();
            note = `${d.name} constructed${d.workers > workers ? ' — assign more workers for full production' : ''}.`;
            newEntry(s, 'A New Building', `${d.name} was constructed in Fallowbank.`, 'build');
            break;
        }
        case 'upgrade': {
            const b = s.buildings.find(b => b.id === cmd.buildingId);
            if (!b)
                throw new Error('Building not found.');
            const d = BUILDINGS[b.kind];
            if (b.level >= d.maxLevel)
                throw new Error('This building is at maximum level.');
            const cost = b.level === 0 ? d.cost : { gold: Math.ceil((d.cost.gold ?? 20) * (1 + b.level * 0.7)), timber: Math.ceil((d.cost.timber ?? 5) * (1 + b.level * 0.6)), stone: Math.ceil((d.cost.stone ?? 0) * (1 + b.level * 0.5)) };
            spend(s, cost);
            b.level++;
            note = `${d.name} improved to Level ${b.level}.`;
            newEntry(s, 'A Better ' + d.name, `${d.name} has reached Level ${b.level}.`, 'build');
            break;
        }
        case 'workers': {
            const b = s.buildings.find(b => b.id === cmd.buildingId);
            if (!b)
                throw new Error('Building not found.');
            const def = BUILDINGS[b.kind];
            const newWorkers = b.workers + cmd.delta;
            if (![-1, 1].includes(cmd.delta) || newWorkers < 0 || newWorkers > def.workers)
                throw new Error('Worker assignment is not valid.');
            if (cmd.delta > 0 && availableLabor(s) < 1)
                throw new Error('No available labor. Unassign a worker elsewhere first.');
            b.workers = newWorkers;
            if (b.kind === 'lumber')
                s.pendingOfflineAt = Date.now();
            note = `${def.name}: ${newWorkers} / ${def.workers} workers assigned.`;
            break;
        }
        case 'workorder': {
            if (s.workOrdersUsed >= 2)
                throw new Error('Two Work Orders have already been completed this council week.');
            if (availableLabor(s) < 1)
                throw new Error('You need at least one available worker for a Work Order.');
            const o = WORK_ORDERS.find(o => o.id === cmd.id);
            if (!o)
                throw new Error('Unknown Work Order.');
            if ('research' in o && o.research && !s.research.includes(o.research))
                throw new Error('Research required: ' + o.research);
            spend(s, o.cost);
            add(s, o.gain);
            s.workOrdersUsed++;
            note = `Work Order completed: ${o.name}.`;
            newEntry(s, 'Work Order', `${o.name} supplied useful materials to Fallowbank.`, 'economy');
            break;
        }
        case 'invite_settlers': {
            if (!s.completedEvents.includes('FH-002') || s.turn < 2)
                throw new Error('Complete the first traveler decision and two Council Weeks before inviting more settlers.');
            if (s.turn - s.lastInviteTurn < 2)
                throw new Error('The last invitation is too recent. Try again after two Council Weeks.');
            if (s.population + 2 > housing(s))
                throw new Error('Not enough housing. Upgrade Cottages or build another one first.');
            spend(s, { gold: 18, food: 10 });
            s.population += 2;
            s.lastInviteTurn = s.turn;
            note = 'Two new residents have settled in Fallowbank.';
            newEntry(s, 'New Hearths', 'Two new residents joined the settlement after the kingdom provided provisions and helped them find homes.', 'story');
            break;
        }
        case 'research': {
            const r = RESEARCH_BY_ID[cmd.id];
            if (!r)
                throw new Error('Unknown research.');
            if (s.research.includes(r.id))
                throw new Error('Research already completed.');
            for (const p of r.prereq)
                if (!s.research.includes(p))
                    throw new Error('First complete ' + RESEARCH_BY_ID[p].name + '.');
            spend(s, { knowledge: r.cost });
            s.research.push(r.id);
            if (r.civicBonus)
                for (const [key, v] of Object.entries(r.civicBonus))
                    s.civic[key] = Math.min(100, s.civic[key] + (v ?? 0));
            note = `Research completed: ${r.name}.`;
            newEntry(s, r.name, `Fallowbank's scholars learned ${r.name}. ${r.effects}.`, 'research');
            break;
        }
        case 'expedition_start': {
            if (!s.flags.cellar || s.expeditionDone)
                throw new Error('No available cellar expedition.');
            if (s.activeExpedition)
                throw new Error('An expedition is already active.');
            spend(s, { food: 2 });
            s.heroRecruited = true;
            s.activeExpedition = { node: 0, history: [], secureStone: 0, secureKnowledge: 0 };
            note = 'Dain Ashford has joined your party. The expedition has begun.';
            break;
        }
        case 'expedition_choice': {
            const e = s.activeExpedition;
            if (!e)
                throw new Error('No active expedition.');
            if (e.node === 0) {
                if (cmd.choice === 'stones') {
                    e.secureStone += 4;
                    e.history.push('Cleared the collapsed masonry.');
                }
                else if (cmd.choice === 'marks') {
                    e.secureKnowledge += 2;
                    e.history.push('Studied the stone markings.');
                }
                else
                    throw new Error('Invalid route.');
                e.node = 1;
                note = 'You descend into the ancient passage.';
            }
            else if (e.node === 1) {
                if (cmd.choice === 'panel') {
                    e.history.push('Examined the silent regulator.');
                    e.secureKnowledge += 1;
                }
                else if (cmd.choice === 'inscription') {
                    e.history.push('Read the ancient inscription.');
                    e.secureKnowledge += 2;
                }
                else
                    throw new Error('Invalid investigation.');
                e.node = 2;
                note = 'You found an inscription about an old Charter agreement.';
            }
            else
                throw new Error('Return to Fallowbank to complete the expedition.');
            break;
        }
        case 'expedition_finish': {
            if (!s.activeExpedition || s.activeExpedition.node !== 2)
                throw new Error('The expedition is not ready to complete.');
            add(s, { gold: 6, stone: s.activeExpedition.secureStone, knowledge: s.activeExpedition.secureKnowledge });
            s.activeExpedition = null;
            s.expeditionDone = true;
            s.flags.inscription = true;
            if (!s.adventure.completed.includes('H01'))
                s.adventure.completed.push('H01');
            recruitHero(s.adventure, 'dain', () => `gear-${s.nextId++}`);
            note = 'Expedition complete! The ancient inscription has been recovered.';
            newEntry(s, 'Beneath the Watchtower', 'Dain returned with a damaged Charter inscription. Its age raises troubling questions about the old network.', 'world');
            break;
        }
        case 'claim_adventure_reward':
        case 'mission_start':
        case 'mission_choice':
        case 'mission_retreat':
        case 'hero_equip':
        case 'hero_unequip':
        case 'hero_craft':
        case 'hero_skill':
        case 'hero_attribute':
        case 'battle_attack':
        case 'battle_guard':
        case 'battle_skill':
        case 'battle_move':
        case 'battle_end_round':
        case 'battle_retreat':
        case 'battle_technique':
        case 'battle_medicine':
        case 'hero_enhance': {
            const result = handleAdventure(s, cmd, () => `gear-${s.nextId++}`);
            note = result.note;
            if (result.chronicle)
                newEntry(s, result.note.split(' complete!')[0], result.chronicle, 'world');
            break;
        }
        case 'military_expand_command':
        case 'military_drill':
        case 'military_doctrine':
        case 'military_patrol':
        case 'military_fortify':
        case 'military_provision':
        case 'military_recall_supplies':
        case 'military_recruit':
        case 'military_assign':
        case 'military_demobilize':
        case 'military_start_battle':
        case 'military_order':
        case 'military_resolve_round':
        case 'military_retreat':
        case 'military_resolve_peacefully': {
            const r = handleMilitary(s, cmd);
            note = r.note;
            if (r.chronicle)
                newEntry(s, 'The Hearthmere Watch', r.chronicle, 'world');
            break;
        }
        case 'region_upgrade_road':
        case 'region_charter':
        case 'region_trade':
        case 'region_ship':
        case 'region_claim':
        case 'region_found':
        case 'region_envoy':
        case 'region_restitution':
        case 'region_story': {
            const result = handleRegional(s, cmd);
            note = result.note;
            if (result.chronicle)
                newEntry(s, result.note.split(':')[0], result.chronicle, 'world');
            break;
        }
        case 'frontier_story':
        case 'frontier_road':
        case 'frontier_trade':
        case 'frontier_claim':
        case 'frontier_settlement_upgrade': {
            const result = handleFrontier(s, cmd);
            note = result.note;
            if (result.chronicle)
                newEntry(s, result.note.split(':')[0], result.chronicle, 'world');
            break;
        }
        case 'act3_border':
        case 'act3_audit':
        case 'act3_story':
        case 'act3_regency':
        case 'act3_restitution':
        case 'act3_summit':
        case 'act3_route': {
            const result = handleAct3(s, cmd);
            note = result.note;
            if (result.chronicle)
                newEntry(s, cmd.type === 'act3_story' ? cmd.id : cmd.type === 'act3_summit' ? 'Continental Summit' : cmd.type === 'act3_route' ? 'Road to Veymark' : cmd.type === 'act3_restitution' ? 'Mara’s Restitution' : cmd.type === 'act3_regency' ? 'Regency Council' : 'The Contested Border', result.chronicle, 'story');
            break;
        }
        case 'act4_story':
        case 'act4_access':
        case 'act4_review':
        case 'act4_puzzle': {
            const result = handleAct4(s, cmd);
            note = result.note;
            newEntry(s, cmd.type === 'act4_story' ? cmd.id : 'The Veymark Accord', result.chronicle, 'story');
            break;
        }
        case 'act5_story':
        case 'act5_path':
        case 'act5_pact':
        case 'act5_rebuild':
        case 'act5_specialize':
        case 'act5_dispute':
        case 'act5_safeguard':
        case 'act5_ending': {
            const result = handleAct5(s, cmd);
            note = result.note;
            newEntry(s, cmd.type === 'act5_story' ? cmd.id : 'The Kingdoms Choose', result.chronicle, 'story');
            break;
        }
        case 'depth_commission':
        case 'depth_specialize':
        case 'depth_claim': {
            const result = handleDepth(s, cmd);
            note = result.note;
            if (result.chronicle)
                newEntry(s, 'The Regional Compacts', result.chronicle, 'world');
            break;
        }
        case 'offline_claim': {
            const reward = offlineReward(s, Date.now());
            if (reward <= 0)
                throw new Error('No passive supplies are ready yet.');
            add(s, { timber: reward });
            s.pendingOfflineAt = Date.now();
            note = `Claimed ${reward} Timber from the passive wood-gathering crew.`;
            break;
        }
        default: {
            const never = cmd;
            throw new Error('Unknown command ' + String(never));
        }
    }
    assertInvariants(s);
    return { state: s, note };
}
export function offlineReward(s, now) { if (!s.buildings.some(b => b.kind === 'lumber' && b.level > 0 && b.workers >= 2))
    return 0; const elapsed = Math.min(6 * 3600 * 1000, Math.max(0, now - s.pendingOfflineAt)); return Math.max(0, Math.min(12, Math.floor(elapsed / (30 * 60 * 1000)), capacity(s, 'timber') - s.resources.timber)); }
export function assertInvariants(s) {
    if (s.schemaVersion !== SCHEMA_VERSION || s.contentVersion !== CONTENT_VERSION)
        throw new Error('Incompatible save version.');
    if (!Number.isInteger(s.turn) || s.turn < 0 || !Number.isInteger(s.revision) || s.revision < 0)
        throw new Error('Invalid turn or revision.');
    if (!Number.isInteger(s.population) || s.population < 12 || s.population > housing(s))
        throw new Error('Invalid population or housing.');
    if (employed(s) + militaryPersonnel(s) > workforce(s))
        throw new Error('Assigned civilian and military labor exceeds available labor.');
    const ids = new Set();
    const parcels = new Set();
    for (const b of s.buildings) {
        const d = BUILDINGS[b.kind];
        if (!d)
            throw new Error('Unknown building kind.');
        if (ids.has(b.id) || parcels.has(b.parcel) || b.parcel < 0 || b.parcel >= 30)
            throw new Error('Duplicate building ID or occupied parcel.');
        ids.add(b.id);
        parcels.add(b.parcel);
        if (!Number.isInteger(b.level) || b.level < 0 || b.level > d.maxLevel || (b.level === 0 && b.kind !== 'watchtower') || !Number.isInteger(b.workers) || b.workers < 0 || b.workers > d.workers)
            throw new Error('Invalid building progression.');
    }
    for (const key of RESOURCE_KEYS) {
        const v = s.resources[key];
        if (!Number.isFinite(v) || !Number.isInteger(v) || v < 0 || v > capacity(s, key))
            throw new Error('Invalid ' + key + ' balance.');
    }
    if (!Number.isInteger(s.lastInviteTurn) || s.lastInviteTurn > s.turn)
        throw new Error('Invalid recruitment cooldown.');
    if (s.workOrdersUsed < 0 || s.workOrdersUsed > 2)
        throw new Error('Invalid work-order counter.');
    if (new Set(s.completedEvents).size !== s.completedEvents.length || new Set(s.research).size !== s.research.length)
        throw new Error('Duplicate completion record.');
    for (const r of s.research) {
        if (!RESEARCH_BY_ID[r])
            throw new Error('Unknown research in save.');
    }
    if (s.activeExpedition && (s.activeExpedition.node < 0 || s.activeExpedition.node > 2 || s.expeditionDone))
        throw new Error('Invalid expedition progress.');
    if (!s.civic || !s.adviserTrust || !Array.isArray(s.pledges))
        throw new Error('Missing new founding civic state.');
    for (const key of ['publicTrust', 'landHealth', 'tradeStanding', 'safetyBonus'])
        if (!Number.isInteger(s.civic[key]) || s.civic[key] < 0 || s.civic[key] > 100)
            throw new Error('Invalid civic rating ' + key);
    for (const [key] of ADVISERS)
        if (!Number.isInteger(s.adviserTrust[key]) || s.adviserTrust[key] < 0 || s.adviserTrust[key] > 100)
            throw new Error('Invalid adviser Trust');
    if (!Number.isInteger(s.foodStableWeeks) || s.foodStableWeeks < 0 || s.foodStableWeeks > 10000)
        throw new Error('Invalid Food stability');
    if (new Set(s.pledges.map(p => p.id)).size !== s.pledges.length)
        throw new Error('Duplicate promise');
    for (const p of s.pledges) {
        if (!['active', 'fulfilled', 'broken'].includes(p.status) || !Number.isInteger(p.dueTurn) || p.dueTurn < p.acceptedTurn || p.acceptedTurn > s.turn)
            throw new Error('Invalid promise status');
        if (!p.title || typeof p.title !== 'string')
            throw new Error('Invalid promise title');
    }
    if (s.pledges.filter(p => p.status === 'active').length > 3)
        throw new Error('Too many active promises');
    adventureInvariants(s);
    militaryInvariants(s);
    regionalInvariants(s);
    frontierInvariants(s);
    depthInvariants(s);
    act3Invariants(s);
    act4Invariants(s);
    act5Invariants(s);
    if (s.activeExpedition && s.adventure.active)
        throw new Error('Conflicting old and new expeditions');
    if (s.completedEvents.some(id => !['FH-001', 'FH-002', 'FH-003', 'FH-005', 'FH-008'].includes(id) && !COUNCIL_BY_ID[id]))
        throw new Error('Unknown council completion');
    return true;
}

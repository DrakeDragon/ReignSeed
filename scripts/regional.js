/** Pass 16 — regional charters, negotiated trade and local satellite settlements.
 * No offscreen wars or autonomous Council turns. All cargo moves through committed commands.
 */
import { capacity } from './core.js';
import { RESOURCE_KEYS } from './content.js';
import { militaryPersonnel } from './military.js';
import { depthAdvanceWeek } from './depth.js';
export const FACTIONS = [
    { id: 'copperwash', name: 'Copperwash League', icon: '◈', tagline: 'Contracts, trade routes and fair commercial terms' },
    { id: 'brackenveil', name: 'Brackenveil Circles', icon: '❧', tagline: 'Living lands, forest routes and local stewardship' },
    { id: 'kilnspire', name: 'Kilnspire Houses', icon: '⚒', tagline: 'Industry, engineers and reliable infrastructure' },
    { id: 'regency', name: 'Pale Banner Regency', icon: '⚑', tagline: 'Regional security and centralized authority' },
    { id: 'starveil', name: 'Starveil Archive', icon: '✧', tagline: 'Evidence, scholarship and regulated technology' },
    { id: 'tideglass', name: 'Tideglass Assembly', icon: '≋', tagline: 'Navigation, independence and voluntary agreements' }
];
export const ROAD_DEFS = [
    { id: 'lenne-road', a: 'HM-01', b: 'HM-02', requires: 'MR-02', name: 'Lenne Bridge Road' },
    { id: 'eastbridge-road', a: 'HM-02', b: 'HM-03', requires: 'MR-03', name: 'Eastbridge Road' },
    { id: 'quarry-road', a: 'HM-02', b: 'HM-05', requires: 'MR-06', name: 'Quarry Causeway' },
    { id: 'beacon-road', a: 'HM-01', b: 'HM-04', requires: 'MR-05', name: 'Beacon Ridge Track' },
    { id: 'briarwood-road', a: 'HM-04', b: 'HM-06', requires: 'MR-07', name: 'Briarwood Woodland Path' }
];
export const TOWN_DEFS = [
    { sector: 'HM-01', name: 'Fallowbank', population: 0 },
    { sector: 'HM-02', name: 'Lenne Landing', population: 0 },
    { sector: 'HM-03', name: 'Eastbridge', population: 18 },
    { sector: 'HM-04', name: 'Beacon Ridge', population: 9 },
    { sector: 'HM-05', name: 'Quarrygate Hamlet', population: 0 },
    { sector: 'HM-06', name: 'Briarwood Freehold', population: 11 }
];
export const OFFERS = [
    { id: 'eastbridge-grain', sector: 'HM-03', name: 'Eastbridge Grain Caravan', send: { timber: 8, gold: 6 }, receive: { food: 14 }, faction: 'copperwash', description: 'Exchange finished timber for grain brought through the Lenne route.' },
    { id: 'eastbridge-tools', sector: 'HM-03', name: 'Eastbridge Artisan Exchange', send: { stone: 5, gold: 9 }, receive: { tools: 3 }, faction: 'kilnspire', description: 'Ship raw stone and pay the artisans for specialist Tools.' },
    { id: 'beacon-herbs', sector: 'HM-04', name: 'Ridge Herbalists', send: { food: 6, gold: 8 }, receive: { herbs: 7 }, faction: 'brackenveil', description: 'Provision the highland herbalists in exchange for cultivated supplies.' },
    { id: 'briarwood-botany', sector: 'HM-06', name: 'Briarwood Restoration Trade', send: { food: 8, gold: 12 }, receive: { herbs: 10, knowledge: 2 }, faction: 'brackenveil', description: 'Support protected forest work and receive studied herbs and field notes.' },
    { id: 'quarry-masonry', sector: 'HM-05', name: 'Quarrygate Stone Exchange', send: { timber: 8, gold: 10 }, receive: { stone: 10 }, faction: 'kilnspire', description: 'A paid stone-shipment contract after the road is reopened.' }
];
export const ACT2_STORIES = [
    { id: 'ST2-01', title: 'Traders of Two Roads', intro: [
            'A Copperwash caravan reaches Fallowbank under a striped gold-and-blue awning. Its master, Jessa Vell, carries two maps of the valley. The routes disagree about who is responsible for the crossing.',
            '“We would like to trade,” Jessa says. “But we need to know whether this road belongs to one ruler, or to everyone willing to maintain it.”',
            'Nella Quill sets out the first contract. Your reply will become the opening chapter of a much larger regional relationship.'
        ], choices: [
            { id: 'shared', label: 'Propose a shared-travel agreement', detail: '12 Gold · +7 Copperwash Trust · +4 Trade Standing. Record open access as the first principle.', cost: { gold: 12 }, faction: 'copperwash', trust: 7, trade: 4, flag: 'act2.open_roads' },
            { id: 'investigate', label: 'Commission an independent route survey', detail: '8 Gold and 2 Food · +4 Copperwash Trust · +3 Trade Standing. Verify each claim before granting rights.', cost: { gold: 8, food: 2 }, faction: 'copperwash', trust: 4, trade: 3, flag: 'act2.survey_roads' },
            { id: 'exclusive', label: 'Offer a protected commercial concession', detail: '5 Gold · +2 Copperwash Trust · +7 Trade Standing, but 1 grievance over preferential access.', cost: { gold: 5 }, faction: 'copperwash', trust: 2, trade: 7, grievance: 1, flag: 'act2.exclusive_roads' }
        ] },
    { id: 'ST2-02', title: 'The Contract Beneath the Ink', intro: [
            'The first trade agreements arrive with a troubling appendix: the League could appoint its own agents to manage part of the road and decide which carts pass first.',
            'Nella taps the passage. “The clause is legal, but the smallest villages had no hand in writing it. An agreement can be perfectly recorded and still be unfair.”',
            'This is not a question of whether to trade. It is a question of who gets to shape the terms.'
        ], choices: [
            { id: 'audit', label: 'Require a public contract audit', detail: '5 Knowledge · +6 Copperwash Trust · +2 Trade Standing. Open the records to local review.', cost: { knowledge: 5 }, faction: 'copperwash', trust: 6, trade: 2, flag: 'act2.contract_audited' },
            { id: 'local', label: 'Fund independent road inspectors', detail: '16 Gold · +3 Copperwash Trust · +5 Trade Standing. Give the small communities an accountable voice.', cost: { gold: 16 }, faction: 'copperwash', trust: 3, trade: 5, flag: 'act2.local_road_voice' },
            { id: 'sign', label: 'Accept the commercial clause', detail: '4 Gold · +1 Copperwash Trust · +8 Trade Standing, but 2 grievances.', cost: { gold: 4 }, faction: 'copperwash', trust: 1, trade: 8, grievance: 2, flag: 'act2.contract_exclusive' }
        ] },
    { id: 'ST2-03', title: 'The Price of Opening', intro: [
            'Bera reads the latest ledgers. Supplies now travel farther than ever before. Caravans bring work and possibilities, but the roads do not maintain themselves.',
            'Jessa asks for a durable arrangement. “This should outlive one good trading season. What do your people want these roads to be?”',
            'Your decision closes the first Copperwash chapter and opens new regional obligations.'
        ], choices: [
            { id: 'compact', label: 'Sign a modest reciprocal compact', detail: '18 Gold and 4 Timber · +8 Copperwash Trust · +5 Trade Standing. Shared road obligations.', cost: { gold: 18, timber: 4 }, faction: 'copperwash', trust: 8, trade: 5, flag: 'act2.trade_compact' },
            { id: 'freeholds', label: 'Protect village independence first', detail: '10 Gold and 4 Food · +4 Copperwash Trust · +4 Trade Standing. Independent communities keep their rights.', cost: { gold: 10, food: 4 }, faction: 'copperwash', trust: 4, trade: 4, flag: 'act2.local_independence' },
            { id: 'crown', label: 'Build an administered trade corridor', detail: '25 Gold · +2 Copperwash Trust · +6 Trade Standing. Central direction with a future oversight question.', cost: { gold: 25 }, faction: 'copperwash', trust: 2, trade: 6, flag: 'act2.trade_corridor' }
        ] }
];
export const ACT2_BY_ID = Object.fromEntries(ACT2_STORIES.map(s => [s.id, s]));
export function newRegionalState() {
    const factions = Object.fromEntries(FACTIONS.map(f => [f.id, { trust: 45, influence: 10, alignment: 0, grievances: 0, lastEnvoyTurn: -1, lastRestitutionTurn: -1 }]));
    return { factions, roads: ROAD_DEFS.map(r => ({ id: r.id, a: r.a, b: r.b, tier: 0, requires: r.requires })), towns: TOWN_DEFS.map(t => ({ ...t, status: t.sector === 'HM-01' ? 'home' : 'independent', stock: {}, lastTradeTurn: -1 })), caravans: [], storyCompleted: [], storyChoices: {}, dispatchesThisTurn: 0 };
}
const established = (s) => Boolean(s.flags['act1.complete']);
const requireEra = (s) => { if (!established(s))
    throw Error('Ratify the Hearthmere Charter in the Royal Council to open regional development.'); };
const has = (s, c) => Object.entries(c).every(([k, v]) => s.resources[k] >= (v ?? 0));
const spend = (s, c) => { if (!has(s, c))
    throw Error('Insufficient materials for the regional operation.'); for (const [k, v] of Object.entries(c))
    s.resources[k] -= (v ?? 0); };
export function roadsOpen(s, r) { return s.military.resolved.includes(r.requires); }
export function routeBetween(s, origin, target) {
    if (origin === target)
        return { distance: 0, links: [] };
    const q = [{ at: origin, distance: 0, links: [] }], visited = new Set([origin]);
    while (q.length) {
        const curr = q.shift();
        for (const r of s.regional.roads.filter(r => roadsOpen(s, r) && (r.a === curr.at || r.b === curr.at))) {
            const next = r.a === curr.at ? r.b : r.a;
            if (visited.has(next))
                continue;
            const chain = [...curr.links, r.id], distance = curr.distance + 1;
            if (next === target)
                return { distance, links: chain };
            visited.add(next);
            q.push({ at: next, distance, links: chain });
        }
    }
    return null;
}
export function travelWeeks(s, sector) { const path = routeBetween(s, 'HM-01', sector); if (!path)
    return null; return path.links.length > 0 && path.links.every(id => s.regional.roads.find(r => r.id === id).tier >= 2) ? 1 : Math.max(1, path.distance); }
export function regionalStoryAvailable(s) {
    if (!established(s) || s.adventure.active || s.military.battle || s.activeExpedition)
        return null;
    return ACT2_STORIES.find(r => !s.regional.storyCompleted.includes(r.id) && (r.id === 'ST2-01' || s.regional.storyCompleted.includes('ST2-0' + (Number(r.id.slice(-1)) - 1)))) ?? null;
}
export function regionalForecast(s) { const active = s.regional.towns.filter(t => t.status === 'founded').length; return { gold: active * 2, active, arrivals: s.regional.caravans.filter(c => c.status === 'traveling' && c.arriveTurn === s.turn + 1).length }; }
export function regionalAdvanceWeek(s, paid) {
    s.regional.dispatchesThisTurn = 0;
    for (const town of s.regional.towns.filter(t => t.status === 'founded')) {
        if (!paid)
            continue;
        const key = town.sector === 'HM-05' ? 'stone' : 'timber', tier = s.frontier?.settlementLevels[town.sector] ?? 1, gain = (town.sector === 'HM-05' ? 3 : 4) + 2 * (tier - 1);
        town.stock[key] = Math.min(40 + 20 * (tier - 1), (town.stock[key] ?? 0) + gain);
    }
    depthAdvanceWeek(s, paid);
    for (const caravan of s.regional.caravans)
        if (caravan.status === 'traveling' && caravan.arriveTurn <= s.turn)
            caravan.status = 'ready';
}
export function regionalPreview(s) { return { tradeCount: s.regional.caravans.filter(c => c.status === 'traveling').length, received: s.regional.caravans.filter(c => c.status === 'ready').length, settlements: s.regional.towns.filter(t => t.status === 'founded').length, agreements: s.regional.towns.filter(t => t.status === 'chartered').length }; }
export function handleRegional(s, cmd) {
    const r = s.regional;
    requireEra(s);
    switch (cmd.type) {
        case 'region_story': {
            const story = regionalStoryAvailable(s);
            if (story?.id !== cmd.id)
                throw Error('This story chapter is not currently available.');
            const choice = story.choices.find(c => c.id === cmd.choiceId);
            if (!choice)
                throw Error('Invalid story response.');
            spend(s, choice.cost);
            const faction = r.factions[choice.faction];
            faction.trust = Math.min(100, faction.trust + choice.trust);
            faction.influence = Math.min(100, faction.influence + 2);
            faction.grievances = Math.min(20, faction.grievances + (choice.grievance ?? 0));
            s.civic.tradeStanding = Math.min(100, s.civic.tradeStanding + choice.trade);
            r.storyCompleted.push(story.id);
            r.storyChoices[story.id] = choice.id;
            s.flags[choice.flag] = true;
            return { note: `${story.title}: ${choice.label}.`, chronicle: `${story.title}. ${choice.label}. The Copperwash League remembers Fallowbank's opening commercial decision.` };
        }
        case 'region_upgrade_road': {
            const road = r.roads.find(x => x.id === cmd.roadId);
            if (!road)
                throw Error('Unknown road.');
            if (!roadsOpen(s, road))
                throw Error('Resolve the corresponding regional security arrangement before improving this route.');
            if (road.tier >= 2)
                throw Error('This road has already received both improvements.');
            const cost = road.tier === 0 ? { gold: 20, timber: 10, stone: 5 } : { gold: 34, planks: 6, stone: 10 };
            spend(s, cost);
            road.tier++;
            return { note: `${ROAD_DEFS.find(d => d.id === road.id).name} improved to Tier ${road.tier}.`, chronicle: `Fallowbank invested in the ${ROAD_DEFS.find(d => d.id === road.id).name}, making the shared route safer and more reliable.` };
        }
        case 'region_charter': {
            const town = r.towns.find(t => t.sector === cmd.sector);
            const req = { 'HM-03': 'MR-03', 'HM-04': 'MR-05', 'HM-06': 'MR-07' };
            if (!town || !req[town.sector])
                throw Error('This settlement has no independent-charter option.');
            if (town.status !== 'independent')
                throw Error('A charter already governs this relationship.');
            if (!s.military.resolved.includes(req[town.sector]))
                throw Error('First resolve the local security or access matter.');
            if (!routeBetween(s, 'HM-01', town.sector))
                throw Error('The community needs an accessible regional road.');
            const faction = town.sector === 'HM-03' ? 'copperwash' : 'brackenveil';
            if (r.factions[faction].trust < 20)
                throw Error('The local partners need more reliable relations before signing.');
            const cost = town.sector === 'HM-03' ? { gold: 24, planks: 3 } : { gold: 18, food: 6, herbs: 2 };
            spend(s, cost);
            town.status = 'chartered';
            r.factions[faction].trust = Math.min(100, r.factions[faction].trust + 7);
            r.factions[faction].influence = Math.min(100, r.factions[faction].influence + 4);
            s.civic.tradeStanding = Math.min(100, s.civic.tradeStanding + 4);
            return { note: `${town.name} joined a voluntary regional charter. Its ${town.population} residents remain citizens of their own community.`, chronicle: `Fallowbank and ${town.name} signed a reciprocal charter. ${town.name} retained its own government, population and local resources.` };
        }
        case 'region_envoy': {
            const faction = r.factions[cmd.faction];
            if (!faction)
                throw Error('Unknown faction.');
            if (faction.lastEnvoyTurn === s.turn)
                throw Error('An envoy has already visited this faction during this council week.');
            if (faction.trust >= 70)
                throw Error('Relations are already strong. Improve specific agreements rather than sending more gifts.');
            spend(s, { gold: 12, food: 2 });
            faction.trust = Math.min(70, faction.trust + 4);
            faction.lastEnvoyTurn = s.turn;
            const name = FACTIONS.find(f => f.id === cmd.faction).name;
            return { note: `Your envoy met with the ${name}. Trust is now ${faction.trust}.`, chronicle: `Fallowbank funded an envoy to the ${name} and developed a more dependable diplomatic relationship.` };
        }
        case 'region_restitution': {
            const faction = r.factions[cmd.faction];
            if (!faction || faction.grievances < 1)
                throw Error('There are no active grievances to address through this offer.');
            if (faction.lastRestitutionTurn === s.turn)
                throw Error('Restitution was already arranged this week.');
            spend(s, { gold: 20, tools: 1 });
            faction.grievances = Math.max(0, faction.grievances - 1);
            faction.trust = Math.min(100, faction.trust + 3);
            faction.lastRestitutionTurn = s.turn;
            return { note: 'Documented restitution reduced one grievance. The original historical decision remains in the Chronicle.', chronicle: `Fallowbank offered material restitution to the ${FACTIONS.find(f => f.id === cmd.faction).name}. The earlier disputed decision remains part of its history.` };
        }
        case 'region_found': {
            if (!['HM-02', 'HM-05'].includes(cmd.sector))
                throw Error('Only Lenne Landing and Quarrygate currently support player-founded satellite settlements.');
            const town = r.towns.find(t => t.sector === cmd.sector);
            if (town.status === 'founded')
                throw Error('A settlement already exists there.');
            const required = cmd.sector === 'HM-05' ? 'MR-06' : 'MR-02';
            if (!s.military.resolved.includes(required) || !routeBetween(s, 'HM-01', cmd.sector))
                throw Error('First establish safe access to the selected site.');
            if (s.population < 16)
                throw Error('Fallowbank must have at least 16 residents before relocating two founders.');
            const remaining = s.population - 2;
            if (Math.floor(remaining * .75) < s.buildings.reduce((v, b) => v + b.workers, 0) + militaryPersonnel(s))
                throw Error('Free sufficient workforce before relocating citizens.');
            spend(s, { gold: 90, timber: 20, stone: 12, tools: 2 });
            s.population = remaining;
            town.status = 'founded';
            town.population = 2;
            town.stock = {};
            return { note: `${town.name} was founded by relocating two residents. Local material output begins with the next funded council week.`, chronicle: `Two residents of Fallowbank relocated to establish ${town.name}. Its population and stores remain separate from the founding town.` };
        }
        case 'region_trade': {
            const offer = OFFERS.find(x => x.id === cmd.offerId);
            if (!offer)
                throw Error('Unknown trade contract.');
            const town = r.towns.find(t => t.sector === offer.sector);
            if (!routeBetween(s, 'HM-01', offer.sector))
                throw Error('No connected safe trading route to this settlement.');
            if (offer.sector === 'HM-05' && !s.military.resolved.includes('MR-06'))
                throw Error('Quarry Gate must be reopened.');
            if (town.lastTradeTurn === s.turn)
                throw Error('This community has already accepted a caravan this council week.');
            if (r.dispatchesThisTurn + s.frontier.weeklyDispatches >= 2)
                throw Error('Only two new caravans can depart per council week across all routes.');
            if (r.caravans.filter(c => c.status === 'traveling').length + s.frontier.caravans.filter(c => c.status === 'traveling').length >= 3)
                throw Error('All three available caravan teams are in use.');
            spend(s, offer.send);
            const duration = travelWeeks(s, offer.sector);
            const c = { id: `caravan-${s.nextId++}`, kind: 'trade', from: 'HM-01', to: offer.sector, label: offer.name, cargo: { ...offer.send }, reward: { ...offer.receive }, departTurn: s.turn, arriveTurn: s.turn + duration, status: 'traveling' };
            r.caravans.push(c);
            town.lastTradeTurn = s.turn;
            r.dispatchesThisTurn++;
            return { note: `${offer.name} dispatched. Arrival after ${duration} council week${duration === 1 ? '' : 's'}; rewards stay in escrow until claimed.`, chronicle: `A caravan departed for ${town.name} with a documented exchange of goods, carried over ${duration} council-week travel.` };
        }
        case 'region_ship': {
            const town = r.towns.find(t => t.sector === cmd.sector);
            if (!town || town.status !== 'founded')
                throw Error('Only player-founded satellites may send local depot goods.');
            if (!['stone', 'timber', 'planks', 'bricks', 'knowledge'].includes(cmd.resource) || !Number.isInteger(cmd.amount) || cmd.amount < 1 || cmd.amount > 20)
                throw Error('Choose 1–20 units of an eligible local material.');
            if ((town.stock[cmd.resource] ?? 0) < cmd.amount)
                throw Error('Not enough supplies in the satellite depot.');
            if (!routeBetween(s, town.sector, 'HM-01'))
                throw Error('No connected return route.');
            if (r.dispatchesThisTurn + s.frontier.weeklyDispatches >= 2 || r.caravans.filter(c => c.status === 'traveling').length + s.frontier.caravans.filter(c => c.status === 'traveling').length >= 3)
                throw Error('Caravan capacity is currently full.');
            const duration = travelWeeks(s, town.sector);
            town.stock[cmd.resource] = (town.stock[cmd.resource] ?? 0) - cmd.amount;
            r.caravans.push({ id: `caravan-${s.nextId++}`, kind: 'shipment', from: town.sector, to: 'HM-01', label: `${town.name} Supply Wagon`, cargo: { [cmd.resource]: cmd.amount }, reward: { [cmd.resource]: cmd.amount }, departTurn: s.turn, arriveTurn: s.turn + duration, status: 'traveling' });
            r.dispatchesThisTurn++;
            return { note: `${cmd.amount} ${cmd.resource} left ${town.name}. Arrival in ${duration} council week${duration === 1 ? '' : 's'}.` };
        }
        case 'region_claim': {
            const caravan = r.caravans.find(c => c.id === cmd.caravanId);
            if (!caravan || caravan.status !== 'ready')
                throw Error('The caravan has not arrived or its reward has already been claimed.');
            let moved = 0;
            for (const [key, value] of Object.entries(caravan.reward)) {
                const res = key;
                const cap = capacity(s, res);
                const space = Math.max(0, cap - s.resources[res]);
                const qty = Math.min(space, value ?? 0);
                s.resources[res] += qty;
                caravan.reward[res] = (value ?? 0) - qty;
                moved += qty;
            }
            if (moved < 1)
                throw Error('Fallowbank has no storage room for these supplies. Free capacity and try again.');
            const pending = Object.values(caravan.reward).some(v => (v ?? 0) > 0);
            if (!pending)
                r.caravans = r.caravans.filter(c => c.id !== caravan.id);
            return { note: `Claimed ${moved} delivered material units. ${pending ? 'The remainder stays in caravan escrow.' : 'The caravan exchange is complete.'}`, chronicle: pending ? undefined : `The ${caravan.label} delivered its full cargo to Fallowbank without generating additional goods.` };
        }
    }
}
export function regionalInvariants(s) {
    const r = s.regional;
    if (!r || !Array.isArray(r.towns) || !Array.isArray(r.roads) || !Array.isArray(r.caravans) || !r.factions)
        throw Error('Invalid regional state.');
    if (r.towns.length !== TOWN_DEFS.length || new Set(r.towns.map(t => t.sector)).size !== r.towns.length)
        throw Error('Regional towns are missing or duplicated.');
    if (r.roads.length !== ROAD_DEFS.length || new Set(r.roads.map(x => x.id)).size !== r.roads.length)
        throw Error('Invalid regional route registry.');
    if (!Number.isInteger(r.dispatchesThisTurn) || r.dispatchesThisTurn < 0 || r.dispatchesThisTurn > 2)
        throw Error('Invalid caravan dispatch count.');
    for (const f of FACTIONS) {
        const x = r.factions[f.id];
        if (!x || ![x.trust, x.influence, x.alignment, x.grievances].every(n => Number.isInteger(n)) || x.trust < 0 || x.trust > 100 || x.influence < 0 || x.influence > 100 || x.alignment < -100 || x.alignment > 100 || x.grievances < 0 || x.grievances > 20)
            throw Error('Invalid faction relationship.');
    }
    for (const road of r.roads) {
        const def = ROAD_DEFS.find(d => d.id === road.id);
        if (!def || def.a !== road.a || def.b !== road.b || def.requires !== road.requires || !Number.isInteger(road.tier) || road.tier < 0 || road.tier > 2)
            throw Error('Invalid road status.');
    }
    for (const town of r.towns) {
        if (!['home', 'independent', 'chartered', 'founded'].includes(town.status) || !Number.isInteger(town.population) || town.population < 0 || !Number.isInteger(town.lastTradeTurn) || town.lastTradeTurn > s.turn)
            throw Error('Invalid local settlement.');
        if (town.sector === 'HM-01' && town.status !== 'home')
            throw Error('Fallowbank must remain home.');
        if (town.status === 'founded' && (!(town.sector === 'HM-02' || town.sector === 'HM-05') || town.population !== (s.frontier?.settlementLevels[town.sector] ?? 1) + 1))
            throw Error('Invalid satellite population.');
        for (const [key, val] of Object.entries(town.stock))
            if (!['stone', 'timber', 'planks', 'bricks', 'knowledge'].includes(key) || !Number.isInteger(val) || val < 0 || val > 40 + 20 * ((s.frontier?.settlementLevels[town.sector] ?? 1) - 1))
                throw Error('Invalid local depot.');
    }
    if (new Set(r.storyCompleted).size !== r.storyCompleted.length || r.storyCompleted.some(id => !ACT2_BY_ID[id]))
        throw Error('Invalid Act II event history.');
    if (new Set(r.caravans.map(c => c.id)).size !== r.caravans.length)
        throw Error('Duplicate caravan IDs.');
    if (r.caravans.filter(c => c.status === 'traveling').length > 3)
        throw Error('Too many active caravans.');
    for (const c of r.caravans) {
        if (!['trade', 'shipment'].includes(c.kind) || !['traveling', 'ready'].includes(c.status) || !Number.isInteger(c.departTurn) || !Number.isInteger(c.arriveTurn) || c.arriveTurn < c.departTurn || c.departTurn > s.turn)
            throw Error('Invalid caravan schedule.');
        for (const [key, val] of Object.entries(c.reward))
            if (!RESOURCE_KEYS.includes(key) || !Number.isInteger(val) || val < 0 || val > 100)
                throw Error('Invalid caravan reward');
        for (const [key, val] of Object.entries(c.cargo))
            if (!RESOURCE_KEYS.includes(key) || !Number.isInteger(val) || val < 0 || val > 100)
                throw Error('Invalid caravan cargo');
    }
    return true;
}

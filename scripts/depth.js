import { RESOURCE_KEYS } from './content.js';
import { routeBetween } from './regional.js';
export const SPECIALTIES = [
    { id: 'plankwright', sector: 'HM-02', name: 'Lenne Plankwrights', description: 'Local Timber becomes processed Planks for construction.', cost: { gold: 35, tools: 2, planks: 3 }, input: { timber: 3 }, output: { planks: 2 }, research: 'sawmill' },
    { id: 'river_records', sector: 'HM-02', name: 'Lenne River School', description: 'Use managed Timber and staff time to prepare research notes.', cost: { gold: 32, planks: 5, knowledge: 5 }, input: { timber: 2 }, output: { knowledge: 2 }, research: 'public_archives' },
    { id: 'stone_cutter', sector: 'HM-05', name: 'Quarrygate Masonry', description: 'Cut and finish local Stone into Bricks.', cost: { gold: 38, tools: 3, bricks: 4 }, input: { stone: 3 }, output: { bricks: 2 }, research: 'brickmaking' },
    { id: 'quarry_archive', sector: 'HM-05', name: 'Quarry Survey Office', description: 'Stone surveys become useful technical Knowledge.', cost: { gold: 34, tools: 2, knowledge: 5 }, input: { stone: 2 }, output: { knowledge: 2 }, research: 'mapmaking' }
];
export const COMMISSIONS = [
    { id: 'K-01', name: 'The Kilnspire Safety Audit', region: 'ironspine', faction: 'kilnspire', mission: 'H09', description: 'The engineers seek independent verification of worksite conditions before the next contract.', choices: [
            { id: 'inspect', label: 'Fund public engineering inspectors', description: 'An open safety record, even if it delays future work.', cost: { gold: 24, tools: 3 }, reward: { knowledge: 8, iron: 2 }, trust: 8 },
            { id: 'repair', label: 'Provide replacement fittings', description: 'Improve the operating machinery with practical supplies.', cost: { gold: 15, iron: 4 }, reward: { knowledge: 5, tools: 4 }, trust: 5 }
        ] },
    { id: 'K-02', name: 'The Missing Warning', region: 'ironspine', faction: 'kilnspire', mission: 'H13', description: 'The mountain settlements ask how the forgotten signal should be preserved.', choices: [
            { id: 'publish', label: 'Copy the warning into public archives', description: 'Guarantee an independently accessible record.', cost: { gold: 20, knowledge: 4 }, reward: { mechanisms: 3, knowledge: 4 }, trust: 9 },
            { id: 'reinforce', label: 'Reinforce the mountain relay', description: 'Leave reliable equipment for local workers.', cost: { gold: 22, tools: 5 }, reward: { iron: 6, knowledge: 3 }, trust: 6 }
        ] },
    { id: 'B-01', name: 'The Watershed Witnesses', region: 'brackenveil', faction: 'brackenveil', mission: 'H10', description: 'Stewards request support that respects local ownership of the living record.', choices: [
            { id: 'shared', label: 'Fund a witnessed watershed charter', description: 'The river communities retain control of their records.', cost: { gold: 20, food: 6 }, reward: { herbs: 8, knowledge: 5 }, trust: 8 },
            { id: 'nursery', label: 'Support grove restoration', description: 'Protect saplings and supply local caretakers.', cost: { gold: 18, herbs: 5 }, reward: { living_timber: 3, knowledge: 3 }, trust: 6 }
        ] },
    { id: 'B-02', name: 'The Nursery Covenant', region: 'brackenveil', faction: 'brackenveil', mission: 'H15', description: 'The grove-keepers want cultivation that does not depend on harvesting old trees.', choices: [
            { id: 'teach', label: 'Publish sustainable cultivation methods', description: 'Share useful growing methods with local communities.', cost: { gold: 25, knowledge: 5 }, reward: { living_timber: 5, knowledge: 3 }, trust: 9 },
            { id: 'materials', label: 'Supply young groves with garden tools', description: 'Provide practical aid for replanting.', cost: { gold: 18, tools: 3 }, reward: { living_timber: 3, herbs: 6 }, trust: 6 }
        ] },
    { id: 'T-01', name: 'The Mariners’ Charter', region: 'copperwash_coast', faction: 'tideglass', mission: 'H11', description: 'Local pilots request enforceable safe-passage rights for independent vessels.', choices: [
            { id: 'independent', label: 'Recognize independent port oversight', description: 'Keep maritime access open to eligible communities.', cost: { gold: 28, planks: 4 }, reward: { knowledge: 9, glass: 2 }, trust: 9 },
            { id: 'relay', label: 'Invest in navigation equipment', description: 'Provide physical repairs without overriding local port councils.', cost: { gold: 16, tools: 4 }, reward: { knowledge: 4, planks: 6 }, trust: 6 }
        ] },
    { id: 'T-02', name: 'The Unwritten Sea Routes', region: 'copperwash_coast', faction: 'tideglass', mission: 'H17', description: 'Navigators want an open map that does not erase the independent ports.', choices: [
            { id: 'atlas', label: 'Fund the public coast atlas', description: 'Distribute a verified chart and written withdrawal rights.', cost: { gold: 30, knowledge: 6 }, reward: { glass: 4, knowledge: 4 }, trust: 9 },
            { id: 'beacons', label: 'Rebuild safe signal lanterns', description: 'Pay for durable materials along the coast.', cost: { gold: 24, planks: 6 }, reward: { mechanisms: 2, tools: 4 }, trust: 6 }
        ] }
];
export const newDepthState = () => ({ completed: [], choices: {}, specialties: {}, pending: [] });
export function commissionAvailable(s, c) {
    if (!s.flags['act1.complete'])
        return 'Complete the founding charter';
    if (s.depth.completed.includes(c.id))
        return 'Commission completed';
    if (!s.adventure.completed.includes(c.mission))
        return `Complete expedition ${c.mission}`;
    if (s.adventure.active || s.activeExpedition || s.military.battle)
        return 'Finish the active encounter first';
    return null;
}
export function depthUpkeep(s) { return Object.values(s.depth.specialties).filter(Boolean).length; }
const stocked = (s, c) => Object.entries(c).every(([k, v]) => RESOURCE_KEYS.includes(k) && Number.isInteger(v) && s.resources[k] >= (v ?? 0));
const spend = (s, c) => { if (!stocked(s, c))
    throw Error('Insufficient resources for this regional project.'); for (const [k, v] of Object.entries(c))
    s.resources[k] -= v ?? 0; };
const maximum = (s, k) => { const extra = s.buildings.filter(b => b.kind === 'storehouse').reduce((sum, b) => sum + b.level * 60, 0); if (k === 'gold')
    return 2000; if (k === 'knowledge')
    return 250; if (k === 'food')
    return 180 + extra + (s.research.includes('harvest_store') ? 60 : 0); if (k === 'stone' || k === 'timber')
    return 120 + extra; return 100 + extra; };
export function handleDepth(s, cmd) {
    const d = s.depth;
    switch (cmd.type) {
        case 'depth_commission': {
            const def = COMMISSIONS.find(c => c.id === cmd.id);
            if (!def)
                throw Error('Unknown faction commission.');
            const block = commissionAvailable(s, def);
            if (block)
                throw Error(block);
            const choice = def.choices.find(c => c.id === cmd.choice);
            if (!choice)
                throw Error('Unknown commission response.');
            spend(s, choice.cost);
            d.completed.push(def.id);
            d.choices[def.id] = choice.id;
            const rel = s.regional.factions[def.faction];
            rel.trust = Math.min(100, rel.trust + choice.trust);
            rel.influence = Math.min(100, rel.influence + 3);
            rel.grievances = Math.max(0, Math.min(20, rel.grievances + (choice.grievanceChange ?? 0)));
            const remaining = {};
            for (const [key, raw] of Object.entries(choice.reward)) {
                const k = key, amt = raw ?? 0, available = Math.max(0, maximum(s, k) - s.resources[k]), take = Math.min(amt, available);
                s.resources[k] += take;
                if (amt > take)
                    remaining[k] = amt - take;
            }
            if (Object.keys(remaining).length)
                d.pending.push({ id: `regional-reward-${s.nextId++}`, commissionId: def.id, remaining });
            return { note: `${def.name}: ${choice.label}. ${Object.keys(remaining).length ? 'Excess materials are held safely for later claim.' : 'Rewards received.'}`, chronicle: `${def.name} — ${choice.label}. The community accepted a documented commission, and its representatives remember how Fallowbank helped.` };
        }
        case 'depth_specialize': {
            const town = s.regional.towns.find(t => t.sector === cmd.sector);
            if (!town || town.status !== 'founded')
                throw Error('Establish this satellite town before assigning a workshop.');
            if ((s.frontier.settlementLevels[cmd.sector] ?? 1) < 2)
                throw Error('Develop this settlement to Tier 2 before assigning specialists.');
            if (d.specialties[cmd.sector])
                throw Error('This settlement already has a permanent specialist district.');
            const def = SPECIALTIES.find(x => x.id === cmd.specialty && x.sector === cmd.sector);
            if (!def)
                throw Error('This specialist district does not belong to the chosen settlement.');
            if (!s.research.includes(def.research))
                throw Error('Complete ' + def.research.replaceAll('_', ' ') + ' research first.');
            if (!routeBetween(s, 'HM-01', cmd.sector))
                throw Error('A connected safe supply road is required.');
            if (town.population < 3)
                throw Error('This settlement lacks the local residents needed to staff a district.');
            spend(s, def.cost);
            d.specialties[cmd.sector] = def.id;
            return { note: `${town.name} has opened ${def.name}. It consumes actual local stock and needs 1 additional Gold each funded Council Week.`, chronicle: `${town.name} established ${def.name} with its existing local workers. Regional production now includes a specialized industry.` };
        }
        case 'depth_claim': {
            const reward = d.pending.find(x => x.id === cmd.id);
            if (!reward)
                throw Error('Reward already claimed or unknown.');
            let taken = 0;
            for (const [key, raw] of Object.entries(reward.remaining)) {
                const k = key, amt = raw ?? 0, take = Math.max(0, Math.min(amt, maximum(s, k) - s.resources[k]));
                s.resources[k] += take;
                reward.remaining[k] = amt - take;
                taken += take;
            }
            if (!taken)
                throw Error('No warehouse space available for this reward.');
            if (Object.values(reward.remaining).every(v => (v ?? 0) === 0))
                d.pending = d.pending.filter(r => r.id !== cmd.id);
            return { note: `Claimed ${taken} secured commission materials. ${d.pending.some(r => r.id === cmd.id) ? 'Any remainder is still protected.' : 'Reward fully collected.'}` };
        }
    }
}
export function depthAdvanceWeek(s, paid) {
    if (!paid)
        return;
    for (const [sector, id] of Object.entries(s.depth.specialties)) {
        const def = SPECIALTIES.find(x => x.id === id && x.sector === sector);
        const town = s.regional.towns.find(t => t.sector === sector);
        if (!def || !town || town.status !== 'founded')
            continue;
        if (Object.entries(def.input).some(([key, amount]) => (town.stock[key] ?? 0) < (amount ?? 0)))
            continue;
        const capacity = 40 + 20 * ((s.frontier.settlementLevels[sector] ?? 1) - 1);
        if (Object.entries(def.output).every(([key, amount]) => (amount ?? 0) === 0 || (town.stock[key] ?? 0) >= capacity))
            continue;
        for (const [key, amount] of Object.entries(def.input))
            town.stock[key] = (town.stock[key] ?? 0) - (amount ?? 0);
        for (const [key, amount] of Object.entries(def.output))
            town.stock[key] = Math.min(capacity, (town.stock[key] ?? 0) + (amount ?? 0));
    }
}
export function depthInvariants(s) {
    const d = s.depth;
    if (!d || !Array.isArray(d.completed) || !d.choices || !d.specialties || !Array.isArray(d.pending))
        throw Error('Invalid specialist region state.');
    if (new Set(d.completed).size !== d.completed.length || d.completed.some(id => !COMMISSIONS.some(c => c.id === id) || !d.choices[id]))
        throw Error('Invalid commission history.');
    if (Object.keys(d.choices).some(id => !d.completed.includes(id) || !COMMISSIONS.some(c => c.id === id && c.choices.some(x => x.id === d.choices[id]))))
        throw Error('Invalid commission choice.');
    for (const [sector, id] of Object.entries(d.specialties)) {
        const town = s.regional.towns.find(t => t.sector === sector);
        if (!SPECIALTIES.some(x => x.sector === sector && x.id === id) || !town || town.status !== 'founded' || (s.frontier.settlementLevels[sector] ?? 1) < 2)
            throw Error('Invalid satellite specialist district.');
    }
    if (new Set(d.pending.map(r => r.id)).size !== d.pending.length)
        throw Error('Duplicate secured commission reward.');
    for (const r of d.pending)
        if (!r.id || !d.completed.includes(r.commissionId) || !Object.keys(r.remaining).length || Object.entries(r.remaining).some(([key, v]) => !RESOURCE_KEYS.includes(key) || !Number.isInteger(v) || v < 0 || v > 100) || Object.values(r.remaining).every(v => v === 0))
            throw Error('Invalid commission reward escrow.');
    return true;
}

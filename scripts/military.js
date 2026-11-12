export const DOCTRINES = {
    militia: { a: 'defenders', b: 'pathfinders', labels: ['Hearth Defenders', 'Road Patrols'] },
    scouts: { a: 'pathfinders', b: 'defenders', labels: ['Pathfinders', 'Watch Archers'] },
    shield_guard: { a: 'ironwall', b: 'defenders', labels: ['Iron Wall', 'Civic Protectors'] },
    engineers: { a: 'fieldcraft', b: 'ironwall', labels: ['Fieldcraft', 'Shielded Builders'] }
};
export const TRAINING_RANKS = [{ min: 0, name: 'Recruits' }, { min: 20, name: 'Trained' }, { min: 60, name: 'Experienced' }, { min: 140, name: 'Veteran' }, { min: 260, name: 'Elite' }];
export const squadRank = (q) => [...TRAINING_RANKS].reverse().find(x => q.xp >= x.min) ?? TRAINING_RANKS[0];
export const UNIT_DEFS = {
    militia: { name: 'Village Militia', icon: '🛡', personnel: 2, cost: { gold: 12, timber: 4 }, upkeep: 1, training: 1, fieldFood: 1, cohesion: 10, morale: 5, attack: 4, armor: 0, desc: 'Affordable local defenders who hold crossings and protect the hearth.' },
    scouts: { name: 'Bow Scouts', icon: '🏹', personnel: 2, cost: { gold: 18, timber: 6 }, upkeep: 2, training: 1, fieldFood: 1, cohesion: 8, morale: 5, attack: 3, armor: 0, desc: 'Mobile archers who can expose weaknesses and reposition swiftly.' },
    shield_guard: { name: 'Shield Guard', icon: '⚔️', personnel: 3, cost: { gold: 25, iron: 2, tools: 2 }, upkeep: 3, training: 2, fieldFood: 1, cohesion: 15, morale: 7, attack: 4, armor: 2, desc: 'Professional shield line. Uses worked Iron and trained infantry discipline.' },
    engineers: { name: 'Field Engineers', icon: '🛠️', personnel: 2, cost: { gold: 26, tools: 2, planks: 3 }, upkeep: 3, training: 2, fieldFood: 1, cohesion: 10, morale: 6, attack: 2, armor: 1, desc: 'Repair and breach specialists, invaluable against border fortifications.' }
};
export const SECTORS = [
    { id: 'HM-01', name: 'Fallowbank', status: 'home', security: 1, fortifications: 0 },
    { id: 'HM-02', name: 'Lenne Crossing', status: 'disputed', security: 0, fortifications: 0 },
    { id: 'HM-03', name: 'Eastbridge Road', status: 'independent', security: 0, fortifications: 0 },
    { id: 'HM-04', name: 'Beacon Ridge', status: 'independent', security: 0, fortifications: 0 },
    { id: 'HM-05', name: 'Old Quarry Gate', status: 'disputed', security: 0, fortifications: 0 },
    { id: 'HM-06', name: 'Briarwood Approach', status: 'independent', security: 0, fortifications: 0 }
];
export const SCENARIOS = [
    { id: 'MR-02', name: 'Alarm at the Lenne', subtitle: 'The crossing is blocked by an armed group. Investigate, negotiate, or defend.', minTurn: 3, sector: 'HM-02', combat: true },
    { id: 'MR-03', name: 'The Eastbridge Watch', subtitle: 'A neighboring community requests a formal security arrangement.', minTurn: 4, sector: 'HM-03', combat: false },
    { id: 'MR-04', name: 'Road After Dark', subtitle: 'Dangerous armed movements threaten the Eastbridge road.', minTurn: 6, sector: 'HM-03', combat: true },
    { id: 'MR-05', name: 'The Silent Beacon', subtitle: 'Restore an ancient signal station or patrol an exposed ridge.', minTurn: 8, sector: 'HM-04', combat: false },
    { id: 'MR-06', name: 'Quarry Gate Standoff', subtitle: 'A fortified blockade controls the old quarry approach. Negotiate or breach its palisade.', minTurn: 10, sector: 'HM-05', combat: true },
    { id: 'MR-07', name: 'The Briarwood Accord', subtitle: 'Establish voluntary forest-route protection without absorbing an independent community.', minTurn: 12, sector: 'HM-06', combat: false },
    { id: 'MR-08', name: 'The Border Council', subtitle: 'Unite the region with a shared defensive charter or a costly security campaign.', minTurn: 14, sector: 'HM-04', combat: false }
];
export const militaryCapacity = (s) => s.military.capacityUpgrade ? 4 : 2;
export const militaryFieldNeed = (s) => s.military.squads.filter(x => x.status === 'field').reduce((n, x) => n + UNIT_DEFS[x.kind].fieldFood, 0);
export const militaryFieldWarehouseNeed = (s) => Math.max(0, militaryFieldNeed(s) - s.military.fieldSupplies);
export function newMilitaryState() { return { squads: [], battle: null, resolved: [], sectors: structuredClone(SECTORS), briefings: [], capacityUpgrade: false, fieldSupplies: 0, fieldSupplyCap: 12, borderPolicy: 'none' }; }
export const militaryPersonnel = (s) => s.military.squads.reduce((n, q) => n + UNIT_DEFS[q.kind].personnel, 0);
export const militaryGoldUpkeep = (s) => s.military.squads.filter(x => x.status !== 'training').reduce((n, x) => n + UNIT_DEFS[x.kind].upkeep, 0);
export const militaryFoodUpkeep = (s) => militaryFieldWarehouseNeed(s);
export function militaryAvailable(s, id) {
    const def = SCENARIOS.find(x => x.id === id);
    if (!def)
        return 'Unknown border matter';
    if (s.military.resolved.includes(id))
        return 'Resolved this reign';
    if (!s.completedEvents.includes('FH-003'))
        return 'Complete the first Quarry survey';
    if (s.turn < def.minTurn)
        return `Available from Council Week ${def.minTurn + 1}`;
    if (id === 'MR-04' && !s.military.resolved.includes('MR-02'))
        return 'First resolve the Lenne Crossing dispute';
    if (id === 'MR-05' && !s.military.resolved.includes('MR-04'))
        return 'First secure the Eastbridge Road';
    if (id === 'MR-06' && !s.military.resolved.includes('MR-05'))
        return 'First restore the Beacon Ridge approach';
    if (id === 'MR-07' && !s.military.resolved.includes('MR-05'))
        return 'First resolve the Beacon Ridge problem';
    if (id === 'MR-08' && !['MR-02', 'MR-03', 'MR-04', 'MR-05', 'MR-06', 'MR-07'].every(x => s.military.resolved.includes(x)))
        return 'Resolve the six previous regional matters';
    return null;
}
export function militaryForecast(s) { const gold = militaryGoldUpkeep(s), food = militaryFoodUpkeep(s); return { gold, food, warning: s.resources.gold + 0 < gold ? 'Military wages exceed current Gold stock.' : '', field: militaryFieldWarehouseNeed(s) }; }
export function militaryAdvanceWeek(s, covered, unprovided = false) {
    const spent = Math.min(s.military.fieldSupplies, militaryFieldNeed(s));
    s.military.fieldSupplies -= spent;
    for (const squad of s.military.squads) {
        if (squad.status === 'training') {
            squad.trainingLeft = Math.max(0, squad.trainingLeft - 1);
            if (squad.trainingLeft === 0) {
                squad.status = 'garrison';
                s.military.briefings.unshift(`${UNIT_DEFS[squad.kind].name} finished training.`);
            }
        }
        else if (squad.status === 'recovering') {
            squad.injuryWeeks = Math.max(0, squad.injuryWeeks - 1);
            if (squad.injuryWeeks === 0) {
                squad.status = 'garrison';
                squad.cohesion = UNIT_DEFS[squad.kind].cohesion;
                squad.morale = UNIT_DEFS[squad.kind].morale;
                s.military.briefings.unshift(`${UNIT_DEFS[squad.kind].name} returned from recovery.`);
            }
        }
        else if (!covered || unprovided && squad.status === 'field') {
            squad.morale = Math.max(1, squad.morale - 1);
        }
    }
    s.military.briefings = s.military.briefings.slice(0, 6);
}
function take(s, cost) { for (const [key, value] of Object.entries(cost))
    if (s.resources[key] < (value ?? 0))
        throw Error(`Requires ${value} ${key}.`); for (const [key, value] of Object.entries(cost))
    s.resources[key] -= value ?? 0; }
function getSquad(s, id) { const squad = s.military.squads.find(x => x.id === id); if (!squad)
    throw Error('Military squad not found.'); return squad; }
const active = (s) => s.military.squads.filter(x => x.status === 'garrison' || x.status === 'field');
const finishResult = (s, id, desc) => { if (s.military.resolved.includes(id))
    throw Error('This border situation is already resolved.'); s.military.resolved.push(id); s.military.briefings.unshift(desc); s.military.briefings = s.military.briefings.slice(0, 6); };
function makeUnit(id, kind, lane, side, squad) {
    if (side === 'player' && squad) {
        const d = UNIT_DEFS[squad.kind];
        return { id, name: d.name, kind: squad.kind, side, cohesion: squad.cohesion, maxCohesion: d.cohesion, morale: squad.morale, maxMorale: d.morale, armor: d.armor + (squadRank(squad).min >= 140 ? 1 : 0), attack: d.attack + (squadRank(squad).min >= 20 ? 1 : 0) + (squad.doctrine === 'pathfinders' ? 1 : 0), lane, intent: 'Engage', guard: squad.doctrine === 'ironwall' || squad.doctrine === 'defenders' ? 2 : 0 };
    }
    const d = kind === 'gate_guard' ? { name: 'Gate Wardens', hp: 13, morale: 6, armor: 2, attack: 3 } : kind === 'captain' ? { name: 'Raid Captain', hp: 14, morale: 6, armor: 1, attack: 4 } : kind === 'skirmisher' ? { name: 'Road Skirmisher', hp: 7, morale: 4, armor: 0, attack: 2 } : { name: 'Crossing Raider', hp: 9, morale: 5, armor: 1, attack: 3 };
    return { id, name: d.name, kind, side, cohesion: d.hp, maxCohesion: d.hp, morale: d.morale, maxMorale: d.morale, armor: d.armor, attack: d.attack, lane, intent: 'Strike', guard: 0 };
}
const isFighting = (u) => u.cohesion > 0 && u.morale > 0;
function enemyIntents(b) { for (const e of b.units.filter(x => x.side === 'enemy' && isFighting(x))) {
    e.intent = e.kind === 'captain' && b.round % 3 === 0 ? 'Heavy Strike' : e.kind === 'skirmisher' ? 'Flank' : 'Strike';
} }
function resolveWin(s, b) {
    const allies = b.units.filter(u => u.side === 'player');
    for (const a of allies) {
        const q = getSquad(s, a.id);
        q.cohesion = Math.max(0, a.cohesion);
        q.morale = Math.max(1, a.morale);
        q.xp = Math.min(999, q.xp + 12);
        if (!isFighting(a) || a.cohesion <= Math.floor(a.maxCohesion / 3)) {
            q.status = 'recovering';
            q.injuryWeeks = 2;
        }
    }
    finishResult(s, b.scenario, b.scenario === 'MR-02' ? 'Fallowbank secured the Lenne Crossing through a defensive deployment.' : b.scenario === 'MR-06' ? 'The Old Quarry Gate palisade was breached and the approach secured.' : 'The Eastbridge road patrol restored local security.');
    const sector = s.military.sectors.find(x => x.id === SCENARIOS.find(z => z.id === b.scenario).sector);
    if (sector.status !== 'allied')
        sector.status = 'secured';
    sector.security = 2;
    s.civic.safetyBonus = Math.min(100, s.civic.safetyBonus + 2);
    s.military.battle = null;
}
export function handleMilitary(s, cmd) {
    const m = s.military;
    switch (cmd.type) {
        case 'military_expand_command': {
            if (m.battle)
                throw Error('Finish the current military battle.');
            if (m.capacityUpgrade)
                throw Error('The muster office has already expanded.');
            if (s.turn < 8 || !s.research.includes('mapmaking') || !s.research.includes('trail_lanterns'))
                throw Error('Requires Council Week 9, Valley Cartography and Trail Lanterns research.');
            take(s, { gold: 35, timber: 10, stone: 6 });
            m.capacityUpgrade = true;
            return { note: 'Muster Office expanded: four squads can now serve.', chronicle: 'Fallowbank funded a regional muster office, expanding command capacity without creating additional citizens.' };
        }
        case 'military_drill': {
            if (m.battle)
                throw Error('Finish the battle before scheduling drills.');
            const q = getSquad(s, cmd.squadId);
            if (q.status !== 'garrison' && q.status !== 'field')
                throw Error('Only operational squads can drill.');
            if (q.lastDrillTurn === s.turn)
                throw Error('This squad has already drilled during this Council Week.');
            take(s, { gold: 5, food: 2 });
            q.lastDrillTurn = s.turn;
            q.xp = Math.min(999, q.xp + 14);
            q.morale = Math.min(UNIT_DEFS[q.kind].morale, q.morale + 1);
            return { note: `${UNIT_DEFS[q.kind].name} drilled: +14 Training XP. Rank: ${squadRank(q).name}.` };
        }
        case 'military_doctrine': {
            if (m.battle)
                throw Error('Finish the current battle.');
            const q = getSquad(s, cmd.squadId);
            if (q.xp < 60)
                throw Error('A squad needs 60 Training XP before specializing.');
            if (q.doctrine)
                throw Error('Doctrine already selected for this squad.');
            const paths = DOCTRINES[q.kind];
            if (cmd.doctrine !== paths.a && cmd.doctrine !== paths.b)
                throw Error('Doctrine is not available to this unit family.');
            take(s, { gold: 15 });
            q.doctrine = cmd.doctrine;
            return { note: `${UNIT_DEFS[q.kind].name} adopted the ${cmd.doctrine} doctrine.`, chronicle: `A trained ${UNIT_DEFS[q.kind].name} squad adopted the ${cmd.doctrine} doctrine.` };
        }
        case 'military_patrol': {
            if (m.battle)
                throw Error('Resolve the battle first.');
            const q = getSquad(s, cmd.squadId);
            const sec = m.sectors.find(x => x.id === cmd.sectorId);
            if (!sec)
                throw Error('Unknown sector.');
            if (!['home', 'secured', 'allied'].includes(sec.status))
                throw Error('Patrol requires a safe route, treaty, or local home sector.');
            if (q.status !== 'field' && !(q.status === 'garrison' && sec.id === 'HM-01'))
                throw Error('Assign the squad to the field to patrol outside Fallowbank.');
            if (q.lastPatrolTurn === s.turn)
                throw Error('This squad has already patrolled this Council Week.');
            take(s, { food: 1 });
            q.lastPatrolTurn = s.turn;
            q.xp = Math.min(999, q.xp + 8);
            sec.security = Math.min(5, sec.security + 1);
            return { note: `${UNIT_DEFS[q.kind].name} patrolled ${sec.name}. Security ${sec.security}/5; +8 XP.`, chronicle: `A patrol maintained the security of ${sec.name} while respecting its political status.` };
        }
        case 'military_fortify': {
            if (m.battle)
                throw Error('Resolve the battle first.');
            const sec = m.sectors.find(x => x.id === cmd.sectorId);
            if (!sec || !['home', 'secured', 'allied'].includes(sec.status))
                throw Error('Fortifications require access or a cooperative agreement.');
            if (sec.fortifications >= 2)
                throw Error('This sector already has the two available defensive improvements.');
            take(s, { timber: 8, stone: 4, tools: 1 });
            sec.fortifications++;
            sec.security = Math.min(5, sec.security + 1);
            return { note: `${sec.name} received defensive works (Tier ${sec.fortifications}).`, chronicle: `Workers reinforced ${sec.name} with protective roadworks and signal defenses.` };
        }
        case 'military_provision': {
            if (!Number.isInteger(cmd.amount) || cmd.amount < 1 || cmd.amount > 12)
                throw Error('Choose 1–12 Food.');
            if (m.fieldSupplies + cmd.amount > m.fieldSupplyCap)
                throw Error('Field provision capacity exceeded.');
            take(s, { food: cmd.amount });
            m.fieldSupplies += cmd.amount;
            return { note: `Loaded ${cmd.amount} Food into the military supply wagon. No Food was duplicated.` };
        }
        case 'military_recall_supplies': {
            if (!Number.isInteger(cmd.amount) || cmd.amount < 1 || cmd.amount > m.fieldSupplies)
                throw Error('No such amount in the military supply wagon.');
            // Food capacity is checked before transferring back to the settlement.
            if (s.resources.food + cmd.amount > 180 + s.buildings.filter(b => b.kind === 'storehouse').reduce((n, b) => n + 60 * b.level, 0) + s.research.reduce((n, id) => n + (id === 'harvest_store' ? 60 : 0), 0))
                throw Error('Not enough Food storage to recall supplies.');
            m.fieldSupplies -= cmd.amount;
            s.resources.food += cmd.amount;
            return { note: `Returned ${cmd.amount} unused Food to Fallowbank storage.` };
        }
        case 'military_recruit': {
            if (m.battle)
                throw Error('Resolve your battle before organizing new recruits.');
            if (m.squads.length >= militaryCapacity(s))
                throw Error('Military command capacity reached. Expand the muster office to field four squads.');
            const d = UNIT_DEFS[cmd.kind];
            if (!d)
                throw Error('Unknown military unit.');
            if (cmd.kind === 'scouts' && (!s.completedEvents.includes('FH-003') || !s.research.includes('mapmaking')))
                throw Error('Bow Scouts require the Quarry survey and Valley Cartography research.');
            if (cmd.kind === 'shield_guard' && (!m.capacityUpgrade || !s.research.includes('smelting')))
                throw Error('Shield Guard require the expanded muster office and Iron Smelting research.');
            if (cmd.kind === 'engineers' && (!m.capacityUpgrade || !s.research.includes('workshop') || !s.research.includes('sawmill')))
                throw Error('Field Engineers require the expanded muster office, Workshop Techniques and Sawmill Construction.');
            const employed = s.buildings.reduce((n, b) => n + b.workers, 0);
            if (Math.floor(s.population * .75) - employed - militaryPersonnel(s) < d.personnel)
                throw Error('Free two civilian workers or grow the population before enlistment.');
            take(s, d.cost);
            const q = { id: `squad-${s.nextId++}`, kind: cmd.kind, status: 'training', trainingLeft: d.training, injuryWeeks: 0, cohesion: d.cohesion, morale: d.morale, xp: 0, position: m.squads.length, doctrine: null, lastDrillTurn: -1, lastPatrolTurn: -1 };
            m.squads.push(q);
            return { note: `${d.name} enlisted ${d.personnel} existing citizens. Training requires ${d.training} Council Week.`, chronicle: `${d.personnel} residents entered training for the ${d.name}. They remain citizens and are no longer available for civilian work.` };
        }
        case 'military_assign': {
            if (m.battle)
                throw Error('An active battle blocks assignments.');
            const q = getSquad(s, cmd.squadId);
            if (q.status === 'training' || q.status === 'recovering')
                throw Error('This squad cannot deploy until its training or recovery ends.');
            if (cmd.role !== 'field' && cmd.role !== 'garrison')
                throw Error('Invalid assignment.');
            q.status = cmd.role;
            return { note: `${UNIT_DEFS[q.kind].name} assigned to ${cmd.role === 'field' ? 'the field army' : 'the Fallowbank garrison'}.` };
        }
        case 'military_demobilize': {
            if (m.battle)
                throw Error('Cannot demobilize during a battle.');
            const q = getSquad(s, cmd.squadId);
            m.squads = m.squads.filter(x => x.id !== q.id);
            return { note: 'Squad demobilized. Its ${UNIT_DEFS[q.kind].personnel} citizens returned to the available labor pool. No equipment refund is issued.', chronicle: `Fallowbank demobilized a ${UNIT_DEFS[q.kind].name} squad, returning ${UNIT_DEFS[q.kind].personnel} citizens to civilian service.` };
        }
        case 'military_start_battle': {
            const config = SCENARIOS.find(x => x.id === cmd.scenario);
            if (!config?.combat)
                throw Error('No battle route for this scenario.');
            const blocked = militaryAvailable(s, cmd.scenario);
            if (blocked)
                throw Error(blocked);
            if (m.battle)
                throw Error('Finish the active border battle first.');
            if (s.adventure.active || s.activeExpedition)
                throw Error('Return from your active hero expedition before opening a new battle.');
            const allies = active(s);
            if (!allies.length)
                throw Error('Train at least one operational squad first.');
            if ((cmd.scenario === 'MR-04' || cmd.scenario === 'MR-06') && !allies.some(q => q.status === 'field'))
                throw Error('Road After Dark requires at least one squad assigned to the field army.');
            const supplyCost = allies.reduce((n, q) => n + UNIT_DEFS[q.kind].fieldFood, 0);
            const fromWagon = Math.min(m.fieldSupplies, supplyCost);
            take(s, { food: supplyCost - fromWagon });
            m.fieldSupplies -= fromWagon;
            const defenders = cmd.scenario === 'MR-04' ? [makeUnit('enemy-captain', 'captain', 1, 'enemy'), makeUnit('enemy-skirmisher', 'skirmisher', 0, 'enemy')] : cmd.scenario === 'MR-06' ? [makeUnit('enemy-gate', 'gate_guard', 1, 'enemy'), makeUnit('enemy-skirmisher', 'skirmisher', 2, 'enemy')] : [makeUnit('enemy-raider', 'raider', 1, 'enemy')];
            const b = { scenario: cmd.scenario, round: 1, units: [...allies.map((q, i) => makeUnit(q.id, q.kind, [1, 0, 2, 1][i], 'player', q)), ...defenders], orders: [], commandPoints: 3, wallIntegrity: cmd.scenario === 'MR-06' ? 8 : 0, maxWallIntegrity: cmd.scenario === 'MR-06' ? 8 : 0, log: [`The ${SCENARIOS.find(z => z.id === cmd.scenario).name} confrontation begins. Enemy intentions are visible.`] };
            const local = m.sectors.find(x => x.id === config.sector);
            if (local) {
                for (const u of b.units.filter(x => x.side === 'player'))
                    u.guard = Math.min(2, u.guard + local.fortifications + (local.security >= 3 ? 1 : 0));
            }
            enemyIntents(b);
            m.battle = b;
            return { note: 'The patrol has entered tactical combat. Select orders, then resolve the round.' };
        }
        case 'military_order': {
            const b = m.battle;
            if (!b)
                throw Error('No active military battle.');
            const u = b.units.find(x => x.id === cmd.squadId && x.side === 'player');
            if (!u || !isFighting(u))
                throw Error('Select an operational friendly squad.');
            if (!['hold', 'focus', 'rally', 'flank', 'breach'].includes(cmd.order))
                throw Error('Unknown tactical order.');
            const cost = cmd.order === 'flank' || cmd.order === 'breach' ? 2 : 1;
            if (b.orders.some(x => x.squadId === u.id))
                throw Error('This squad already has a special order this round.');
            if (cost > b.commandPoints)
                throw Error('Not enough Command Points.');
            if (cmd.order === 'flank' && u.kind !== 'scouts')
                throw Error('Only Bow Scouts may flank.');
            if (cmd.order === 'breach' && (u.kind !== 'engineers' || !b.wallIntegrity))
                throw Error('Breach requires Engineers and an intact palisade.');
            b.commandPoints -= cost;
            b.orders.push({ squadId: u.id, order: cmd.order });
            return { note: `${u.name}: ${cmd.order === 'hold' ? 'Hold Line' : cmd.order === 'focus' ? 'Focused Attack' : cmd.order === 'rally' ? 'Rally' : cmd.order === 'flank' ? 'Flank' : 'Breach'} ordered.` };
        }
        case 'military_resolve_round': {
            const b = m.battle;
            if (!b)
                throw Error('No active military battle.');
            const entries = [];
            const ally = b.units.filter(u => u.side === 'player' && isFighting(u));
            const enemy = b.units.filter(u => u.side === 'enemy' && isFighting(u));
            const orders = new Map(b.orders.map(o => [o.squadId, o.order]));
            for (const u of ally) {
                if (orders.get(u.id) === 'rally') {
                    u.morale = Math.min(u.maxMorale, u.morale + 2);
                    entries.push(`${u.name} rallied (+2 Morale).`);
                }
                if (orders.get(u.id) === 'hold') {
                    u.guard = 2;
                    entries.push(`${u.name} raised its shields.`);
                }
            }
            for (const u of ally.filter(x => isFighting(x) && orders.get(x.id) === 'breach' && b.wallIntegrity > 0)) {
                const hit = Math.min(u.kind === 'engineers' && s.military.squads.find(q => q.id === u.id)?.doctrine === 'fieldcraft' ? 8 : 6, b.wallIntegrity);
                b.wallIntegrity -= hit;
                entries.push(`${u.name} dismantled ${hit} points of palisade.`);
            }
            for (const u of ally.filter(isFighting)) {
                if (orders.get(u.id) === 'breach')
                    continue;
                if (b.wallIntegrity > 0) {
                    const hit = Math.min(u.kind === 'engineers' ? 3 : 2, b.wallIntegrity);
                    b.wallIntegrity -= hit;
                    entries.push(`${u.name} advanced through the palisade (${hit} Integrity removed).`);
                    continue;
                }
                const targets = enemy.filter(isFighting);
                if (!targets.length)
                    break;
                const t = targets.find(e => e.lane === u.lane) ?? targets[0];
                const order = orders.get(u.id);
                const bonus = order === 'focus' || order === 'flank' ? 2 : 0;
                const dmg = Math.max(1, u.attack + bonus - t.armor - t.guard);
                t.cohesion = Math.max(0, t.cohesion - dmg);
                entries.push(`${u.name} struck ${t.name} for ${dmg} Cohesion.`);
                if (!isFighting(t))
                    entries.push(`${t.name} broke formation.`);
            }
            if (enemy.some(isFighting))
                for (const u of enemy.filter(isFighting)) {
                    const targets = ally.filter(isFighting);
                    if (!targets.length)
                        break;
                    const t = targets.find(p => p.lane === u.lane) ?? targets[0];
                    const heavy = u.intent === 'Heavy Strike' ? 2 : 0;
                    const dmg = Math.max(1, u.attack + heavy - t.armor - t.guard);
                    t.cohesion = Math.max(0, t.cohesion - dmg);
                    entries.push(`${u.name} ${u.intent.toLowerCase()} dealt ${dmg} to ${t.name}.`);
                    if (!isFighting(t)) {
                        t.morale = 0;
                        entries.push(`${t.name} routed.`);
                    }
                    else if (dmg >= 5)
                        t.morale = Math.max(0, t.morale - 1);
                }
            b.log = [...entries, ...b.log].slice(0, 12);
            if (!b.units.some(u => u.side === 'enemy' && isFighting(u)) && b.wallIntegrity === 0) {
                resolveWin(s, b);
                return { note: 'Victory! The route is secure. Squads have gained training experience.', chronicle: entries.join(' ') + ' The defensive operation succeeded.' };
            }
            if (!b.units.some(u => u.side === 'player' && isFighting(u))) {
                for (const u of b.units.filter(u => u.side === 'player')) {
                    const q = getSquad(s, u.id);
                    q.status = 'recovering';
                    q.injuryWeeks = 2;
                    q.cohesion = Math.max(0, u.cohesion);
                    q.morale = 1;
                }
                m.battle = null;
                return { note: 'Your squads were routed and must recover for two Council Weeks. The dispute remains open.', chronicle: 'Fallowbank suffered a border defeat. The damaged squads withdrew to recover; the contested route remains unresolved.' };
            }
            b.round++;
            b.commandPoints = 3;
            b.orders = [];
            for (const u of b.units)
                u.guard = 0;
            enemyIntents(b);
            return { note: `Round ${b.round} ready. Review enemy intentions and issue new orders.` };
        }
        case 'military_retreat': {
            const b = m.battle;
            if (!b)
                throw Error('No active military battle.');
            for (const u of b.units.filter(x => x.side === 'player')) {
                const q = getSquad(s, u.id);
                q.status = 'recovering';
                q.injuryWeeks = 1;
                q.cohesion = Math.max(0, u.cohesion);
                q.morale = Math.max(1, u.morale);
            }
            m.battle = null;
            return { note: 'Your squads withdrew to Fallowbank. They require one recovery week.', chronicle: 'The military patrol chose an organized withdrawal rather than a prolonged fight.' };
        }
        case 'military_resolve_peacefully': {
            const blocked = militaryAvailable(s, cmd.scenario);
            if (blocked)
                throw Error(blocked);
            if (m.battle)
                throw Error('Finish the battle first.');
            const choices = {
                'MR-02:negotiate': { scenario: 'MR-02', cost: { gold: 8 }, desc: 'The Lenne Crossing dispute ended through a negotiated payment and recognized safe passage.', status: 'secured', security: 1 },
                'MR-02:investigate': { scenario: 'MR-02', cost: { food: 2, tools: 1 }, desc: 'A careful investigation uncovered the transport grievance and produced a nonviolent agreement.', status: 'secured', security: 1 },
                'MR-03:charter': { scenario: 'MR-03', cost: { gold: 10, timber: 4 }, desc: 'Eastbridge signed a mutual-watch charter. Its residents retain independent government.', status: 'allied', security: 2 },
                'MR-03:assist': { scenario: 'MR-03', cost: { food: 6 }, desc: 'Fallowbank supplied Eastbridge volunteers and earned a local defense partnership.', status: 'allied', security: 1 },
                'MR-04:repair': { scenario: 'MR-04', cost: { timber: 10, stone: 6 }, desc: 'A repaired signal post secured the Eastbridge Road without a military confrontation.', status: 'secured', security: 2 },
                'MR-04:escort': { scenario: 'MR-04', cost: { gold: 14 }, desc: 'Contracted local escorts and a road-access arrangement restored safety without annexation.', status: 'secured', security: 1 },
                'MR-05:restore': { scenario: 'MR-05', cost: { timber: 8, stone: 5, tools: 1 }, desc: 'The ridge beacon was rebuilt. Scouts and caravans receive earlier warnings.', status: 'secured', security: 2 },
                'MR-05:guide': { scenario: 'MR-05', cost: { gold: 18, food: 5 }, desc: 'Independent ridge guides accepted a paid warning-and-patrol charter.', status: 'allied', security: 2 },
                'MR-06:arbitrate': { scenario: 'MR-06', cost: { gold: 24, stone: 8 }, desc: 'Mediators resolved the quarry gate dispute with an infrastructure agreement.', status: 'secured', security: 2 },
                'MR-06:detour': { scenario: 'MR-06', cost: { timber: 15, stone: 10 }, desc: 'A bypass road restored quarry access without breaching the palisade.', status: 'secured', security: 1 },
                'MR-07:charter': { scenario: 'MR-07', cost: { gold: 14, herbs: 4 }, desc: 'Forest wardens signed a voluntary route charter with Fallowbank.', status: 'allied', security: 2 },
                'MR-07:restore': { scenario: 'MR-07', cost: { timber: 12, food: 5 }, desc: 'A restored woodland crossing earned local cooperation without annexation.', status: 'allied', security: 1 },
                'MR-08:council': { scenario: 'MR-08', cost: { gold: 35, planks: 5 }, desc: 'Six Hearthmere sectors agreed on a regional defensive council while retaining their existing governments.', status: 'allied', security: 3 },
                'MR-08:watch': { scenario: 'MR-08', cost: { gold: 20, stone: 12, tools: 3 }, desc: 'Fallowbank established a funded frontier watch with documented oversight.', status: 'secured', security: 3 }
            };
            const key = `${cmd.scenario}:${cmd.approach}`;
            const option = choices[key];
            if (!option || option.scenario !== cmd.scenario)
                throw Error('Invalid peaceful resolution.');
            take(s, option.cost);
            finishResult(s, cmd.scenario, option.desc);
            const sec = m.sectors.find(x => x.id === SCENARIOS.find(z => z.id === cmd.scenario).sector);
            if (sec.status !== 'allied')
                sec.status = option.status;
            sec.security = Math.max(sec.security, option.security);
            if (cmd.scenario === 'MR-08') {
                m.borderPolicy = cmd.approach === 'council' ? 'council' : 'watch';
                s.civic.publicTrust = Math.min(100, s.civic.publicTrust + (cmd.approach === 'council' ? 3 : 1));
            }
            if (cmd.scenario === 'MR-03')
                s.civic.tradeStanding = Math.min(100, s.civic.tradeStanding + 2);
            else
                s.civic.safetyBonus = Math.min(100, s.civic.safetyBonus + 1);
            return { note: option.desc, chronicle: option.desc };
        }
    }
}
export function militaryInvariants(s) {
    const m = s.military;
    if (!m || !Array.isArray(m.squads) || !Array.isArray(m.sectors) || !Array.isArray(m.resolved))
        throw Error('Invalid military save.');
    if (typeof m.capacityUpgrade !== 'boolean' || !Number.isInteger(m.fieldSupplies) || m.fieldSupplies < 0 || m.fieldSupplies > 12 || m.fieldSupplyCap !== 12 || !['none', 'council', 'watch'].includes(m.borderPolicy))
        throw Error('Invalid military logistics.');
    if (m.squads.length > militaryCapacity(s))
        throw Error('Military command capacity exceeded.');
    const ids = new Set();
    for (const q of m.squads) {
        const d = UNIT_DEFS[q.kind];
        if (!d || ids.has(q.id) || !['training', 'garrison', 'field', 'recovering'].includes(q.status) || ![q.trainingLeft, q.injuryWeeks, q.cohesion, q.morale, q.xp, q.lastDrillTurn, q.lastPatrolTurn].every(v => Number.isInteger(v)) || q.cohesion < 0 || q.morale < 0 || q.xp < 0 || q.xp > 999 || q.cohesion > d.cohesion || q.morale > d.morale || q.trainingLeft < 0 || q.trainingLeft > 3 || q.injuryWeeks < 0 || q.injuryWeeks > 2 || q.lastDrillTurn > s.turn || q.lastPatrolTurn > s.turn)
            throw Error('Invalid squad state.');
        if (q.doctrine !== null && ![DOCTRINES[q.kind].a, DOCTRINES[q.kind].b].includes(q.doctrine))
            throw Error('Invalid squad doctrine.');
        if (q.doctrine && q.xp < 60)
            throw Error('Doctrine without experience.');
        ids.add(q.id);
    }
    if (new Set(m.resolved).size !== m.resolved.length || m.resolved.some(x => !SCENARIOS.some(y => x === y.id)))
        throw Error('Invalid military operation history.');
    if (m.sectors.length !== 6 || new Set(m.sectors.map(x => x.id)).size !== 6)
        throw Error('Invalid strategic sector registry.');
    for (const sec of m.sectors)
        if (!SECTORS.some(x => x.id === sec.id) || !['home', 'disputed', 'secured', 'allied', 'independent'].includes(sec.status) || !Number.isInteger(sec.security) || sec.security < 0 || sec.security > 5 || !Number.isInteger(sec.fortifications) || sec.fortifications < 0 || sec.fortifications > 2)
            throw Error('Invalid sector status.');
    if (m.battle) {
        const b = m.battle;
        if (!['MR-02', 'MR-04', 'MR-06'].includes(b.scenario) || !Number.isInteger(b.round) || b.round < 1 || b.round > 100 || b.commandPoints < 0 || b.commandPoints > 3 || !Number.isInteger(b.wallIntegrity) || b.wallIntegrity < 0 || b.wallIntegrity > b.maxWallIntegrity)
            throw Error('Invalid army battle.');
        if (b.units.filter(u => u.side === 'player').length < 1 || b.units.filter(u => u.side === 'player').length > 4 || new Set(b.units.map(u => u.id)).size !== b.units.length)
            throw Error('Invalid army formation.');
        if (b.orders.length > 4 || new Set(b.orders.map(x => x.squadId)).size !== b.orders.length)
            throw Error('Invalid army orders.');
        for (const u of b.units)
            if (!Number.isInteger(u.cohesion) || u.cohesion < 0 || u.cohesion > u.maxCohesion || !Number.isInteger(u.morale) || u.morale < 0 || u.morale > u.maxMorale || u.lane < 0 || u.lane > 2 || u.guard < 0 || u.guard > 2)
                throw Error('Invalid army battle unit.');
    }
    return true;
}

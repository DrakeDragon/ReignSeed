export const CLASSES = {
    guardian: { name: 'Guardian', icon: '🛡️', primary: 'might', secondary: 'resolve', skill: 'Shieldwall', description: 'Protects allies and holds the frontline.' },
    ranger: { name: 'Ranger', icon: '🏹', primary: 'agility', secondary: 'insight', skill: 'Hunter’s Mark', description: 'Finds safe paths and exposes dangerous enemies.' },
    engineer: { name: 'Engineer', icon: '⚙️', primary: 'insight', secondary: 'agility', skill: 'Jam Mechanism', description: 'Repairs ancient systems and disrupts constructs.' },
    warden: { name: 'Warden', icon: '🌿', primary: 'resolve', secondary: 'insight', skill: 'Restoring Bloom', description: 'Protects living places and supports the wounded.' }
};
export const RECRUITS = [
    { id: 'dain', name: 'Dain Ashford', classId: 'guardian', description: 'A dependable former gate guard who keeps his promises.', starter: ['frontier_sword', 'traveler_coat'] },
    { id: 'jori', name: 'Jori Vell', classId: 'warden', description: 'A quiet grove-keeper who listens before speaking.', starter: ['grove_staff', 'herbal_satchel'] },
    { id: 'pella', name: 'Pella Nox', classId: 'engineer', description: 'An inventive mechanic with absolutely no patience for rusted bolts.', starter: ['mechanic_hammer', 'survey_kit'] },
    { id: 'keira', name: 'Keira Moss', classId: 'ranger', description: 'An independent pathfinder who knows the valley’s forgotten trails.', starter: ['hunter_bow', 'traveler_coat'] }
];
export const GEAR = [
    { id: 'frontier_sword', name: 'Frontier Sword', slot: 'weapon', power: 3, classIds: ['guardian'], description: 'Simple, sturdy iron blade.', cost: { gold: 8, iron: 2 } },
    { id: 'hunter_bow', name: 'Hunter’s Bow', slot: 'weapon', power: 3, classIds: ['ranger'], description: 'Reliable bow for ranged combat.', cost: { gold: 8, timber: 4 } },
    { id: 'mechanic_hammer', name: 'Mechanic’s Hammer', slot: 'weapon', power: 2, classIds: ['engineer'], description: 'A tool that can be put to rather forceful use.', cost: { gold: 9, tools: 2 } },
    { id: 'grove_staff', name: 'Grove Staff', slot: 'weapon', power: 2, classIds: ['warden'], description: 'Living wood shaped into a defensive staff.', cost: { gold: 7, timber: 3, herbs: 1 } },
    { id: 'reinforced_buckler', name: 'Reinforced Buckler', slot: 'armor', armor: 2, classIds: ['guardian'], description: 'Steady protection against direct attacks.', cost: { gold: 10, timber: 4 } },
    { id: 'traveler_coat', name: 'Traveler’s Coat', slot: 'armor', armor: 1, description: 'Protective layers suitable for long walks.', cost: { gold: 8, timber: 3 } },
    { id: 'engineer_apron', name: 'Engineer’s Apron', slot: 'armor', armor: 1, toolBonus: 1, description: 'Extra protection and easy access to fittings.', cost: { gold: 12, tools: 2 } },
    { id: 'forest_cloak', name: 'Forest Cloak', slot: 'armor', armor: 1, hp: 3, description: 'Durable travel cloak with hidden pockets.', cost: { gold: 14, timber: 3, herbs: 2 } },
    { id: 'survey_kit', name: 'Surveyor’s Kit', slot: 'tool', toolBonus: 1, description: 'Improves surveys, routes, and inspections.', cost: { gold: 6, timber: 2 } },
    { id: 'repair_kit', name: 'Repair Kit', slot: 'tool', toolBonus: 2, description: 'Helps engineers repair working machinery.', cost: { gold: 12, tools: 1 } },
    { id: 'herbal_satchel', name: 'Herbal Satchel', slot: 'tool', toolBonus: 2, description: 'Useful for identifying roots and preparing remedies.', cost: { gold: 6, herbs: 2 } },
    { id: 'charter_insignia', name: 'Charter Insignia', slot: 'trinket', toolBonus: 1, description: 'A symbol recognized during formal negotiations.', cost: { gold: 10, planks: 1 } },
    { id: 'rune_token', name: 'Runic Token', slot: 'trinket', hp: 4, description: 'An old metal charm that bolsters courage.', cost: { gold: 16, stone: 3, knowledge: 3 } },
    { id: 'hardwood_shield', name: 'Hardwood Shield', slot: 'armor', armor: 2, hp: 2, description: 'Solid defense for dangerous roads.', cost: { gold: 16, timber: 6, planks: 2 } },
    { id: 'fine_string_bow', name: 'Fine-String Bow', slot: 'weapon', power: 5, classIds: ['ranger'], description: 'A more accurate specialist bow.', cost: { gold: 25, timber: 5, tools: 2 } },
    { id: 'iron_edge', name: 'Iron-Edged Blade', slot: 'weapon', power: 5, classIds: ['guardian'], description: 'Forged for more serious confrontations.', cost: { gold: 30, iron: 5, tools: 1 } },
    { id: 'sentinel_maul', name: 'Sentinel Maul', slot: 'weapon', power: 6, classIds: ['guardian'], description: 'Heavy iron head; a Guardian can break stubborn armor.', cost: { gold: 48, iron: 7, tools: 3 } },
    { id: 'briar_longbow', name: 'Briar Longbow', slot: 'weapon', power: 6, classIds: ['ranger'], description: 'Long-limbed and precisely balanced; excels in difficult hunts.', cost: { gold: 42, timber: 8, planks: 3 } },
    { id: 'spark_wrench', name: 'Spark Wrench', slot: 'weapon', power: 5, classIds: ['engineer'], description: 'A calibrated mechanism tool that doubles as a combat weapon.', cost: { gold: 35, iron: 4, tools: 4 } },
    { id: 'willow_scepter', name: 'Willow Scepter', slot: 'weapon', power: 5, classIds: ['warden'], description: 'A cultivated staff reinforced with healing herbs.', cost: { gold: 31, planks: 3, herbs: 6 } },
    { id: 'stoneweave_vest', name: 'Stoneweave Vest', slot: 'armor', armor: 3, hp: 3, description: 'Fine quarry fibers protect against crushing blows.', cost: { gold: 35, stone: 9, planks: 2 } },
    { id: 'scout_mantle', name: 'Scout’s Mantle', slot: 'armor', armor: 2, toolBonus: 1, description: 'Quiet, reinforced fabric supports wilderness checks.', cost: { gold: 25, herbs: 3, timber: 5 } },
    { id: 'runic_lens', name: 'Runic Lens', slot: 'tool', toolBonus: 3, description: 'Specialized instrument for ancient mechanical records.', cost: { gold: 34, tools: 4, knowledge: 6 } },
    { id: 'river_charm', name: 'River Charm', slot: 'trinket', hp: 5, description: 'Polished riverstone charm that improves endurance.', cost: { gold: 20, stone: 5, herbs: 2 } },
    { id: 'lensed_caliper', name: 'Lensed Caliper', slot: 'tool', toolBonus: 4, description: 'Glass lenses reveal delicate mechanical tolerances.', cost: { gold: 46, glass: 4, tools: 3 } },
    { id: 'groveheart_staff', name: 'Groveheart Staff', slot: 'weapon', power: 7, classIds: ['warden'], description: 'Cultivated living timber responds gently to its caretaker.', cost: { gold: 55, living_timber: 5, herbs: 5 } },
    { id: 'precision_hammer', name: 'Precision Hammer', slot: 'weapon', power: 7, classIds: ['engineer'], description: 'A balanced engineering instrument with a reinforced head.', cost: { gold: 58, mechanisms: 4, iron: 3 } },
    { id: 'glassguard_charm', name: 'Glassguard Charm', slot: 'trinket', hp: 7, description: 'A careful glass-and-metal reminder of an independent audit.', cost: { gold: 43, glass: 3, mechanisms: 1 } },
    { id: 'livingwood_buckler', name: 'Livingwood Buckler', slot: 'armor', armor: 4, hp: 4, description: 'Resilient cultivated material grown for defense.', cost: { gold: 46, living_timber: 4, planks: 3 } },
    { id: 'signal_sight', name: 'Signal Sight', slot: 'tool', toolBonus: 5, description: 'Precision-glass tool for navigation and record studies.', cost: { gold: 66, glass: 3, mechanisms: 3 } },
];
GEAR.push({ id: 'ward_oath_pin', name: 'Ward Oath Pin', slot: 'trinket', hp: 6, toolBonus: 2, description: 'Verified civic token improves endurance and careful inspection.', cost: { gold: 45, glass: 5, knowledge: 8 } }, { id: 'isolator_wrench', name: 'Isolator Wrench', slot: 'weapon', power: 7, classIds: ['engineer'], description: 'A calibrated tool for safe isolated tests and difficult field repairs.', cost: { gold: 60, iron: 7, mechanisms: 5 } }, { id: 'petitioner_guard', name: 'Petitioner Guard', slot: 'armor', armor: 4, hp: 4, description: 'Protective gear made for ward witnesses crossing dangerous corridors.', cost: { gold: 55, planks: 6, glass: 4, iron: 4 } });
export const GEAR_BY_ID = Object.fromEntries(GEAR.map(g => [g.id, g]));
const choice = (id, label, detail, next, opts = {}) => ({ id, label, detail, next, ...opts });
const node = (id, title, scene, choices, dialogue) => ({ id, title, scene, choices, dialogue });
const field = (attribute, threshold, classId) => ({ attribute, threshold, classId });
/** Eight authored story missions + two bounded repeatable contracts. Every choice has a tested destination. */
export const MISSIONS = [
    { id: 'H01', name: 'Beneath the Watchtower', subtitle: 'A stairway under the ruins', icon: '♜', threat: 1, food: 2, minTurn: 2, requires: ['cellar'], recruit: 'dain', reward: { gold: 6, stone: 2, knowledge: 2 }, xp: 12, intro: 'Rook has found a stair behind the oldest stones. Dain volunteers to lead the descent.', nodes: [
            node('a', 'The Broken Stair', 'The tower’s foundations open into a narrow stair. Dust hangs in the cold air.', [choice('mark', 'Study the carved warning', 'Find a clue about who built the passage.', 'b', { gain: { knowledge: 1 } }), choice('clear', 'Clear the collapsed stones', 'Recover loose stone and open a safe route.', 'b', { gain: { stone: 2 } })], 'Dain: “That staircase looks older than the tower.”'),
            node('b', 'The Empty Guardroom', 'The guardroom contains broken shelves and a rusted brass seal.', [choice('seal', 'Examine the seal', 'Learn the pattern of the original locks.', 'c', { gain: { knowledge: 1 } }), choice('supplies', 'Search the old supply shelves', 'Secure a few usable supplies.', 'c', { gain: { gold: 3 } })]),
            node('c', 'The Silent Regulator', 'A brass machine hums as water passes through a stone channel.', [choice('controls', 'Read the control markings', 'A careful investigation avoids disturbing the machine.', 'd', { check: field('insight', 4) }), choice('route', 'Follow the intact service passage', 'A longer but straightforward path.', 'd')]),
            node('d', 'The Charter Tablet', 'An old stone tablet records an agreement made beneath a Witnessgrove.', [choice('careful', 'Preserve the whole inscription', 'Secure the historical record and return.', 'end', { gain: { knowledge: 2 } }), choice('copy', 'Make a tracing and seal the tablet', 'Take a safer copy for Iven.', 'end', { gain: { stone: 1 } })]),
            node('end', 'The First Record', 'The date on the inscription contradicts Tavercale’s accepted history.', [choice('finish', 'Return to Fallowbank', 'Bring the first Charter record to the Council.', undefined)])
        ] },
    { id: 'H02', name: 'The Orchard’s Roots', subtitle: 'A living mystery beneath the soil', icon: '❀', threat: 1, food: 2, minTurn: 4, requires: ['orchard'], recruit: 'jori', reward: { herbs: 5, knowledge: 3 }, xp: 16, intro: 'Sella asks the party to inspect pale roots stretching toward the watchtower.', nodes: [
            node('a', 'The Pale Orchard', 'The trees bear fruit, but their roots glow faintly beneath the soil.', [choice('listen', 'Study the root pattern', 'Seek an older natural pathway.', 'b', { gain: { herbs: 1 } }), choice('stone', 'Follow the old drainage stones', 'Discover how the orchard was watered.', 'b', { gain: { stone: 2 } })]),
            node('b', 'The Green Hollow', 'A frightened orchard creature blocks the narrow entrance.', [choice('soothe', 'Approach quietly', 'A Warden can calm it without force.', 'c', { check: field('resolve', 7, 'warden') }), choice('leave', 'Take the outer path', 'Avoid alarming it and lose time instead.', 'c')], 'A soft voice calls from the trees. “You cannot rush something frightened.”'),
            node('c', 'The Old Water Root', 'A damaged conduit presses against a living root.', [choice('healing', 'Untangle the living growth', 'Warden field work or careful preparation.', 'd', { check: field('insight', 6, 'warden') }), choice('clearing', 'Clear a small hand-width channel', 'Free the root without disturbing the whole grove.', 'd', { gain: { knowledge: 1 } })]),
            node('d', 'A Keeper’s Choice', 'Jori Vell offers to help protect the grove whatever the Council decided about the mine.', [choice('promise', 'Agree to monitor the roots', 'Earn Jori’s trust and preserve useful samples.', 'end', { gain: { herbs: 2 } }), choice('study', 'Ask Jori to explain the network', 'Receive a lesson in the old Witnessgroves.', 'end', { gain: { knowledge: 2 } })]),
            node('end', 'The Orchard Report', 'Jori agrees to aid Fallowbank, provided its people keep listening to the land.', [choice('finish', 'Return with Jori', 'Complete the grove investigation.', undefined)])
        ] },
    { id: 'H03', name: 'Across the Lenne', subtitle: 'A damaged bridge and a dangerous crossing', icon: '⌁', threat: 2, food: 2, minTurn: 3, requires: ['quarry'], reward: { stone: 5, gold: 10 }, xp: 18, intro: 'A wagon cannot cross the old road. Its owners are running short of provisions.', nodes: [
            node('a', 'The Broken Crossing', 'The river races beneath half a bridge. A stranded wagon waits on the far bank.', [choice('bank', 'Inspect the riverbank', 'Spot where the stone foundations have weakened.', 'b', { gain: { knowledge: 1 } }), choice('wood', 'Search for spare beams', 'Secure timber from a dry repair shed.', 'b', { gain: { timber: 3 } })]),
            node('b', 'The Floodgate', 'A broken wheel controls part of the crossing.', [choice('repair', 'Attempt a careful repair', 'Requires technical skill or good Tools.', 'c', { check: field('insight', 7, 'engineer') }), choice('detour', 'Mark a safe detour', 'Guide everyone around the broken mechanism.', 'c')]),
            node('c', 'Shadows on the Road', 'Road thieves approach the stranded wagon, demanding its cargo.', [choice('fight', 'Defend the travelers', 'Fight the raiders and secure the road.', 'd', { battle: 'raiders' }), choice('barter', 'Offer a settlement toll instead', 'Pay 8 Gold to avoid a fight.', 'd', { cost: { gold: 8 } }), choice('hide', 'Find a sheltered crossing', 'A Ranger can slip past without fighting.', 'd', { check: field('agility', 7, 'ranger') }), choice('bridgebreaker', 'Investigate the huge tracks under the bridge', 'Optional elite river predator · a difficult boss with sweeping attacks.', 'd', { battle: 'bridgebreaker' })]),
            node('d', 'The Wagon’s Choice', 'The grateful travelers ask how to help the valley.', [choice('supplies', 'Accept emergency supplies', 'Bring useful timber back.', 'end', { gain: { timber: 3 } }), choice('maps', 'Ask for their road maps', 'Learn about an old transport route.', 'end', { gain: { knowledge: 3 } })]),
            node('end', 'Roads Reconnected', 'A safe route through the crossing is marked for local travelers.', [choice('finish', 'Return with the report', 'Complete the crossing expedition.', undefined)])
        ] },
    { id: 'H04', name: 'Stones of the Old Quarry', subtitle: 'A survey and salvage run', icon: '◆', threat: 2, food: 2, minTurn: 3, requires: ['quarry'], recruit: 'pella', reward: { stone: 8, knowledge: 2 }, xp: 17, intro: 'An abandoned lifting machine stands near the old quarry. Pella Nox insists she can fix it.', nodes: [
            node('a', 'The Cracked Derrick', 'A timber lifting rig leans over the abandoned stone face.', [choice('inspect', 'Inspect the lifting mechanism', 'Learn what failed.', 'b', { gain: { knowledge: 1 } }), choice('gather', 'Recover loose quarry stone', 'Secure useful material.', 'b', { gain: { stone: 3 } })]),
            node('b', 'The Rusted Gear', 'A heavy counterweight hangs from a damaged chain.', [choice('engineer', 'Repair the tension gear', 'Use Engineering expertise.', 'c', { check: field('insight', 7, 'engineer') }), choice('lever', 'Build a simple lever', 'Spend two Timber to bypass the mechanism.', 'c', { cost: { timber: 2 } }), choice('path', 'Use the manual ramp', 'Avoid the machine and explore carefully.', 'c')], 'Pella: “If it was made by someone, someone can put it right.”'),
            node('c', 'The Quarry Sentry', 'A half-awake stone construct defends the old storeroom.', [choice('battle', 'Stand and fight', 'Defeat the damaged sentry.', 'd', { battle: 'quarry_guard' }), choice('bypass', 'Repair its authorization plate', 'An Engineer can disable its patrol.', 'd', { check: field('insight', 7, 'engineer') }), choice('outside', 'Take the outer excavation route', 'Avoid the machine and reach the records.', 'd')]),
            node('d', 'A Mechanic’s Bargain', 'Pella reveals that the quarry’s old lift may help the growing town.', [choice('hire', 'Invite Pella to Fallowbank', 'Gain an experienced Engineer.', 'end', { gain: { knowledge: 1 } }), choice('salvage', 'Offer the recovered machinery for study', 'Pella joins, taking sketches for the workshop.', 'end', { gain: { tools: 1 } })]),
            node('end', 'The Quarry Ledger', 'Pella joins your adventurers, and the quarry’s old records are secured.', [choice('finish', 'Return to the kingdom', 'Complete the quarry expedition.', undefined)])
        ] },
    { id: 'H05', name: 'Briarwood Trail', subtitle: 'A missing scout and a hidden passage', icon: '🌲', threat: 2, food: 3, minTurn: 5, requires: ['quarry'], recruit: 'keira', reward: { timber: 6, herbs: 3, knowledge: 2 }, xp: 19, intro: 'Rook asks you to find a missing trail marker deep inside Briarwood.', nodes: [
            node('a', 'The Three Tracks', 'Three paths branch under the old pines. Only one has recent footprints.', [choice('prints', 'Study the footprints', 'Follow a careful set of tracks.', 'b', { check: field('insight', 4), gain: { knowledge: 1 } }), choice('stream', 'Follow the narrow stream', 'A longer route with herbs beside the water.', 'b', { gain: { herbs: 2 } })]),
            node('b', 'A Ranger’s Warning', 'Keira Moss steps from behind a tree and warns of a territorial pack.', [choice('listen', 'Follow Keira’s advice', 'Avoid a dangerous den.', 'c'), choice('rush', 'Take the direct path', 'Enter the wolf pack’s territory.', 'c', { battle: 'wolves' }), choice('stag', 'Investigate the glowing trail', 'Optional elite Hollow Stag · face its charging attacks or choose Keira’s safer route.', 'c', { battle: 'hollow_stag' })], 'Keira: “The fastest path is usually the one that gets you eaten.”'),
            node('c', 'The Fallen Oak', 'A vast old tree blocks the trail.', [choice('climb', 'Find a careful path over', 'Agility and equipment can reveal a shortcut.', 'd', { check: field('agility', 7, 'ranger') }), choice('around', 'Circle the old tree', 'Find old logging marks and recover Timber.', 'd', { gain: { timber: 3 } })]),
            node('d', 'The Forgotten Signpost', 'The missing marker points toward a road erased from recent maps.', [choice('chart', 'Chart the hidden road', 'Recover additional cartographic knowledge.', 'end', { gain: { knowledge: 3 } }), choice('camp', 'Escort stranded travelers', 'Recover supplies and escort them home.', 'end', { gain: { gold: 6 } })]),
            node('end', 'The Path Restored', 'Keira joins the party to help investigate the roads that no longer exist on any map.', [choice('finish', 'Return with Keira', 'Complete the Briarwood expedition.', undefined)])
        ] },
    { id: 'H06', name: 'The Forgotten Culvert', subtitle: 'Ancient water rules beneath the old road', icon: '◈', threat: 3, food: 3, minTurn: 9, requires: ['evidence', 'river'], reward: { knowledge: 6, stone: 5, tools: 1 }, gearReward: 'rune_token', xp: 28, intro: 'Water leaks beneath the Lenne road. The regulator may still follow an ancient agreement.', nodes: [
            node('a', 'The Flooded Entrance', 'Cold water fills the service tunnel under the old causeway.', [choice('side', 'Inspect the surface controls', 'Find a safer route through the maintenance channels.', 'b', { gain: { knowledge: 1 } }), choice('wade', 'Wade through the shallow section', 'Secure loose stone fittings.', 'b', { gain: { stone: 2 } })]),
            node('b', 'The Broken Channel', 'A damaged gate lies across the passage.', [choice('fix', 'Repair the gate', 'An Engineer can open a controlled route.', 'c', { check: field('insight', 8, 'engineer') }), choice('detour', 'Use the narrow maintenance stairs', 'Take longer, but avoid using the old mechanisms.', 'c')]),
            node('c', 'The Maintenance Sentries', 'Two old constructs guard the allocation panel.', [choice('fight', 'Fight the sentries', 'Disable the ancient defenses in combat.', 'd', { battle: 'culvert_sentries' }), choice('repair', 'Reauthorize the maintenance path', 'A prepared Engineer with specialist tools can disable the sentries.', 'd', { check: field('insight', 8, 'engineer') }), choice('withdrawal', 'Use the submerged bypass', 'Spend one Tool to open a side door.', 'd', { cost: { tools: 1 } })]),
            node('d', 'The Final Valve', 'Records show water was withheld from a village whose circumstances had changed.', [choice('restore', 'Restore the original channels', 'Preserve the old mechanism for Council review.', 'end', { flag: 'culvert.restored' }), choice('free', 'Disable the restrictive allocation', 'Open the flow but require later repairs.', 'end', { flag: 'culvert.disabled' }), choice('document', 'Document and stabilize the valve', 'Secure an impartial record before changing anything.', 'end', { flag: 'culvert.stabilized', gain: { knowledge: 2 } })]),
            node('end', 'The Water Debt', 'The party brings the water-allocation record to Iven and the Council.', [choice('finish', 'Return with the evidence', 'Complete the Culvert expedition.', undefined)])
        ] },
    { id: 'H07', name: 'Eastbridge in Trouble', subtitle: 'A village asks for help', icon: '⚑', threat: 3, food: 4, minTurn: 10, requires: ['river'], reward: { gold: 16, food: 7, knowledge: 3 }, gearReward: 'charter_insignia', xp: 30, intro: 'Eastbridge sends a plea: travelers are disappearing near a damaged signal post.', nodes: [
            node('a', 'The Empty Market', 'The roadside market is closed. A worried elder waits beneath the bell.', [choice('listen', 'Hear the townspeople’s accounts', 'Discover which routes are threatened.', 'b', { gain: { knowledge: 1 } }), choice('repair', 'Offer to repair the signal bell', 'Spend a Tool to restore its warning system.', 'b', { cost: { tools: 1 } })]),
            node('b', 'The Broken Signal', 'The signal tower cannot warn the village of approaching danger.', [choice('scout', 'Survey from the upper path', 'A Ranger may find the hidden enemy route.', 'c', { check: field('agility', 7, 'ranger') }), choice('traders', 'Question the stranded merchants', 'Exchange help for useful information.', 'c', { gain: { gold: 4 } })]),
            node('c', 'The Blockade', 'Armed raiders hold the east road and demand supplies.', [choice('stand', 'Defend Eastbridge', 'Defeat the road blockade in tactical combat.', 'd', { battle: 'eastbridge_blockade' }), choice('settle', 'Offer a supervised settlement', 'Spend 10 Gold to protect travelers without fighting.', 'd', { cost: { gold: 10 } }), choice('negotiate', 'Bring a fair-weights agreement', 'The Fair Weights research provides a credible written settlement.', 'd', { requiresResearch: 'fair_weights' })]),
            node('d', 'The Village Charter', 'The local elder offers friendship, but asks Fallowbank to respect their independence.', [choice('respect', 'Promise independent cooperation', 'Earn the village’s confidence.', 'end', { flag: 'eastbridge.cooperative', gain: { knowledge: 2 } }), choice('aid', 'Offer practical rebuilding supplies', 'Spend 3 Timber; the village welcomes your assistance.', 'end', { cost: { timber: 3 }, flag: 'eastbridge.rebuilt' })]),
            node('end', 'Eastbridge Stands', 'The road is safe again, and Eastbridge remembers who helped.', [choice('finish', 'Return to Fallowbank', 'Complete the Eastbridge mission.', undefined)])
        ] },
    { id: 'H08', name: 'The First Root Chamber', subtitle: 'The ancient network answers', icon: '✧', threat: 4, food: 5, minTurn: 12, requires: ['evidence', 'mission:H06', 'mission:H07'], reward: { gold: 35, knowledge: 12, stone: 8 }, gearReward: 'reinforced_buckler', xp: 42, intro: 'A network chamber beneath the Witnessgrove has awakened. The party must investigate its guardian.', nodes: [
            node('a', 'The Root-Crowned Stair', 'Pale living roots frame an ancient stone entrance that has remained closed for generations.', [choice('memory', 'Examine the engraved promises', 'Identify an old authorization mark.', 'b', { gain: { knowledge: 2 } }), choice('growth', 'Study the living roots', 'Collect samples without harming the grove.', 'b', { gain: { herbs: 3 } })]),
            node('b', 'The Four Turning Rings', 'Four rings have fallen out of alignment. Each records an ancient local agreement.', [choice('repair', 'Align the mechanism', 'Engineer fieldwork can open the inner gate.', 'c', { check: field('insight', 9, 'engineer') }), choice('record', 'Follow the sequence of recorded names', 'Use insight to trace the original pattern.', 'c', { check: field('insight', 7) }), choice('manual', 'Use the emergency maintenance path', 'Bypass the regulator through the service steps.', 'c')]),
            node('c', 'The First Sentry', 'An ancient defender stands before the central chamber. Its arms glow with dormant warning runes.', [choice('fight', 'Face the First Sentry', 'A multi-phase boss battle with visible heavy attacks.', 'd', { battle: 'first_sentry' }), choice('authorize', 'Repair its authorization sequence', 'An Engineer with survey equipment can restore its access record.', 'd', { check: field('insight', 7, 'engineer') }), choice('archive', 'Present the verified historical inscription', 'Requires Witness Inscription research and 3 Knowledge.', 'd', { requiresResearch: 'archives', cost: { knowledge: 3 } })]),
            node('d', 'The Root Network', 'A map of ancient infrastructure flickers across the chamber. The network was far larger than anyone believed.', [choice('record', 'Record its surviving locations', 'Secure evidence and chart the network.', 'end', { gain: { knowledge: 4 } }), choice('protect', 'Isolate its damaged output lines', 'Preserve the grove and stabilize its connections.', 'end', { flag: 'root_chamber.stabilized' })]),
            node('end', 'The Network Remembers', 'Fallowbank has discovered that its lonely watchtower belongs to something spanning the continent.', [choice('finish', 'Return to the Royal Council', 'Complete the first major Root Chamber revelation.', undefined)])
        ] },
    { id: 'H09', name: 'Kilnspire Underworks', subtitle: 'The abandoned mountain regulator hall', icon: '⚒', threat: 3, food: 4, minTurn: 6, requires: ['story:ST2-04'], reward: { iron_ore: 4, knowledge: 4 }, xp: 18, intro: 'A mountain engineer seeks careful witnesses to the old lift and its sealed fittings.', nodes: [
            node('a', 'The Old Lift', 'The lift cage rests above a yawning shaft. Ancient instructions mark its counterweights.', [choice('inspect', 'Inspect the counterweight', 'Use engineering skill to follow the safer route.', 'b', { check: field('insight', 7, 'engineer'), gain: { knowledge: 2 } }), choice('stairs', 'Use the maintenance steps', 'Take a slower, stable route around the shaft.', 'b')]),
            node('b', 'The Forged Registry', 'A damaged sentry protects the records. Its orders seem older than the markings around it.', [choice('disable', 'Reset the old control', 'Engineer skill avoids a dangerous fight.', 'end', { check: field('insight', 8, 'engineer') }), choice('battle', 'Protect the survey team', 'Face a maintenance construct in tactical combat.', 'end', { battle: 'culvert_sentries' }), choice('bypass', 'Secure the exterior logbook', 'Copy a legitimate record without entering the sealed hall.', 'end', { gain: { knowledge: 2 } })]),
            node('end', 'The Engineer’s Account', 'The recovered regulator sketch can be compared with the old First Charter records.', [choice('finish', 'Return with the surveyed machinery records', 'Preserve a one-time historical engineering discovery.')])
        ] },
    { id: 'H10', name: 'Amberroot Sanctuary', subtitle: 'The grove that remembers agreements', icon: '❧', threat: 3, food: 4, minTurn: 7, requires: ['story:ST2-07'], reward: { herbs: 6, knowledge: 4 }, xp: 18, intro: 'Brackenveil stewards ask you to examine a damaged water charter without disturbing the living roots.', nodes: [
            node('a', 'The Tangle Gate', 'Pale roots cover a gate of old stone. Clearings suggest a safer way into the sanctuary.', [choice('listen', 'Follow the grove keeper’s markers', 'Use nature knowledge for the best route.', 'b', { check: field('resolve', 7, 'warden'), gain: { herbs: 2 } }), choice('trail', 'Take the marked public path', 'Avoid trespassing on the protected inner grove.', 'b')]),
            node('b', 'The Water Record', 'An old living marker holds an outdated allocation instruction. A territorial creature approaches.', [choice('speak', 'Approach peacefully with a Warden', 'Settle the crossing without a fight.', 'end', { check: field('resolve', 8, 'warden') }), choice('defend', 'Protect the stewards', 'Survive a tactical wildlife encounter.', 'end', { battle: 'wolves' }), choice('copy', 'Copy the accessible marker', 'Preserve the public record without disturbing the grove.', 'end', { gain: { knowledge: 1 } })]),
            node('end', 'A Living Witness', 'The grove recorded an agreement; it did not judge whether that agreement remained just.', [choice('finish', 'Share the finding with the Council', 'Secure the sanctuary’s historical evidence.')])
        ] },
    { id: 'H11', name: 'Stormbreak Lighthouse', subtitle: 'A beacon beyond the inland roads', icon: '≋', threat: 3, food: 4, minTurn: 8, requires: ['story:ST2-10'], reward: { planks: 4, knowledge: 5 }, xp: 19, intro: 'Tideglass navigators need the failed beacon surveyed before ships enter the channel.', nodes: [
            node('a', 'The Tide Ladder', 'Spray strikes the abandoned lighthouse steps. The lower door is jammed.', [choice('repair', 'Repair the latch', 'An Engineer can secure a safer entrance.', 'b', { check: field('insight', 7, 'engineer'), gain: { knowledge: 1 } }), choice('climb', 'Climb the sheltered ladder', 'Use the alternate marked access.', 'b')]),
            node('b', 'The Dark Lamp', 'A small band of scavengers has taken shelter near the lamp assembly.', [choice('negotiate', 'Offer them safe passage', 'A calm leader can settle this without a fight.', 'end', { check: field('presence', 7) }), choice('fight', 'Clear the lamp chamber', 'Defend the navigators in tactical combat.', 'end', { battle: 'raiders' }), choice('survey', 'Take the public maritime logs', 'Recover the surviving records and withdraw carefully.', 'end', { gain: { knowledge: 2 } })]),
            node('end', 'The Forgotten Withdrawal', 'The lighthouse ledger includes signatures from ports that tried to leave the Common Measure.', [choice('finish', 'Return with the sea records', 'Add the maritime testimony to the regional Chronicle.')])
        ] },
    { id: 'C01', name: 'Trail Patrol', subtitle: 'A repeatable patrol contract', icon: '🏹', threat: 2, food: 2, minTurn: 5, requires: ['quarry'], repeat: true, reward: { gold: 8, timber: 2 }, xp: 10, intro: 'Rook asks for a patrol along a recently restored road.', nodes: [
            node('a', 'The Patrol Route', 'Broken branches and footprints mark the old trail.', [choice('track', 'Follow the marks carefully', 'Find where supplies have been disturbed.', 'b', { gain: { knowledge: 1 } }), choice('circle', 'Secure the roadside shelter', 'Recover loose materials.', 'b', { gain: { timber: 1 } })]),
            node('b', 'The Trail Threat', 'A small group blocks the patrol route.', [choice('fight', 'Defend the route', 'Tactical combat against a small threat.', 'end', { battle: 'scouts' }), choice('bypass', 'Find an alternate safe path', 'Use scouting and careful navigation.', 'end', { check: field('agility', 7, 'ranger') }), choice('retreat_route', 'Withdraw with the survey report', 'Avoid combat and bring back partial information.', 'end')]),
            node('end', 'Patrol Complete', 'The route remains in service and the watch receives another report.', [choice('finish', 'Return to Fallowbank', 'Complete this week’s patrol.', undefined)])
        ] },
    { id: 'C02', name: 'Quarry Salvage', subtitle: 'A repeatable resource contract', icon: '⛏', threat: 2, food: 2, minTurn: 6, requires: ['quarry'], repeat: true, reward: { stone: 4, gold: 4 }, xp: 9, intro: 'Workers have spotted recoverable supplies in an abandoned excavation.', nodes: [
            node('a', 'The Abandoned Cut', 'Loose stone and forgotten fittings lie beside the old excavation.', [choice('work', 'Survey the secure stone face', 'Recover useful building material.', 'b', { gain: { stone: 1 } }), choice('inspect', 'Inspect the old mechanisms', 'Learn from the forgotten quarry records.', 'b', { gain: { knowledge: 1 } })]),
            node('b', 'The Old Watcher', 'A single damaged construct circles the supplies.', [choice('fight', 'Disable the watcher', 'Resolve a minor tactical battle.', 'end', { battle: 'quarry_guard' }), choice('repair', 'Reset its old control switch', 'Engineer expertise can bypass the fight.', 'end', { check: field('insight', 7, 'engineer') }), choice('outer', 'Take the exposed materials outside its path', 'Avoid the guardian and leave part of the cache.', 'end')]),
            node('end', 'Salvage Returned', 'The workers can use the secured equipment and stone.', [choice('finish', 'Bring back the salvage', 'Complete the quarry contract.', undefined)])
        ] },
    { id: 'H12', name: 'The Boiler Gallery', subtitle: 'An interrupted pressure network under Ironspine', icon: '⚙', threat: 3, food: 4, minTurn: 8, requires: ['story:ST2-06', 'mission:H09'], reward: { iron: 5, knowledge: 5 }, xp: 22, intro: 'Pella follows a stamped pressure diagram into a maintenance gallery abandoned after the Sundering.', nodes: [
            node('a', 'The Cold Valves', 'Warm air leaks from a sealed pipe. A warning plate has three different dates.', [choice('copy', 'Copy all three inspection marks', 'Preserve a useful technical record.', 'b', { gain: { knowledge: 2 } }), choice('clear', 'Clear the service trench', 'Make a safer path without damaging the valves.', 'b', { cost: { tools: 1 }, gain: { iron_ore: 2 } })]),
            node('b', 'An Unstable Pump', 'A damaged regulator blocks the archive chamber. Mechanical sentries still protect it.', [choice('stabilize', 'Disconnect the pressure feed', 'Use specialist insight to approach safely.', 'c', { check: field('insight', 5, 'engineer') }), choice('support', 'Build a timber support', 'Spend materials rather than forcing the old machine.', 'c', { cost: { timber: 5, tools: 1 } }), choice('defend', 'Fight the maintenance sentries', 'Optional tactical encounter to secure the passage.', 'c', { battle: 'culvert_sentries' })]),
            node('c', 'The Workers’ Log', 'The final recorded warning was signed by several engineers whose names were later erased.', [choice('record', 'Preserve the signed warning', 'Secure the recovered testimony.', 'end', { gain: { knowledge: 2 }, flag: 'depth.boiler_log' }), choice('inspect', 'Examine the replacement bolts', 'Recover salvage without taking the original record.', 'end', { gain: { iron: 2 } })]),
            node('end', 'The Gallery Secured', 'The machinery remains inactive, and the copied record can be studied at home.', [choice('finish', 'Return to the kingdom', 'Complete the gallery expedition.')])
        ] },
    { id: 'H13', name: 'The Signal Cradle', subtitle: 'A beacon that once warned the mountain settlements', icon: '✧', threat: 3, food: 4, minTurn: 9, requires: ['story:ST2-06', 'mission:H12'], reward: { tools: 5, knowledge: 6 }, xp: 24, intro: 'A mountain settlement asks for proof that its old warning station can be repaired without restarting the regulator.', nodes: [
            node('a', 'The Ridge Steps', 'A narrow stair climbs to the cracked signal cradle above Ironspine.', [choice('survey', 'Map the anchor points', 'Find a reliable route for future engineers.', 'b', { gain: { knowledge: 1 } }), choice('scavenge', 'Salvage abandoned braces', 'Recover useful metal but leave the old tower intact.', 'b', { gain: { iron: 2 } })]),
            node('b', 'The Listening Plate', 'A fractured brass array reacts to movement along the ridge.', [choice('calibrate', 'Calibrate the dormant plate', 'A careful engineer can steady the signal.', 'c', { check: field('insight', 6, 'engineer') }), choice('insulate', 'Insulate the array', 'Spend materials to prevent accidental activation.', 'c', { cost: { planks: 3, tools: 2 } }), choice('hold', 'Hold off lurking raiders', 'Secure the station through a short battle.', 'c', { battle: 'raiders' })]),
            node('c', 'The Warning Chain', 'The signal recorded a failure warning that never reached the towns below.', [choice('copy', 'Copy the missing warning', 'Take a reliable record to the public archive.', 'end', { gain: { knowledge: 3 }, flag: 'depth.signal_record' }), choice('repair', 'Secure the signal frame', 'Leave a safer structure for future crews.', 'end', { cost: { timber: 3 }, gain: { tools: 2 } })]),
            node('end', 'Mountain Beacon', 'The settlement knows exactly what remains damaged.', [choice('finish', 'Return with the report', 'Complete the signal expedition.')])
        ] },
    { id: 'H14', name: 'The Root Ledger Hollow', subtitle: 'A living archive remembers a contested watershed', icon: '❧', threat: 3, food: 4, minTurn: 8, requires: ['story:ST2-09', 'mission:H10'], reward: { herbs: 6, knowledge: 6 }, xp: 22, intro: 'Sella joins local stewards in reading the roots left behind by an abandoned water agreement.', nodes: [
            node('a', 'The Quiet Threshold', 'Pale branches arch over a stone record without enclosing the trail.', [choice('listen', 'Listen to the stewards', 'Learn why the record matters to the villages.', 'b', { gain: { knowledge: 2 } }), choice('tend', 'Repair a damaged garden', 'Leave the entrance healthier than you found it.', 'b', { cost: { herbs: 2 }, gain: { knowledge: 1 } })]),
            node('b', 'The Fallen Channel', 'A flooded channel hides part of the old charter.', [choice('trace', 'Trace the remaining living roots', 'A Warden can locate the surviving record.', 'c', { check: field('resolve', 5, 'warden') }), choice('bridge', 'Lay a temporary footbridge', 'Spend materials to avoid the damaged grove.', 'c', { cost: { planks: 3 } }), choice('protect', 'Drive off hostile wildlife', 'A tactical option if the party cannot reach the records safely.', 'c', { battle: 'wolves' })]),
            node('c', 'The Watershed Ledger', 'The agreement recorded one town’s need but ignored the changing river.', [choice('witness', 'Create a witnessed copy', 'Preserve the formal record without removing roots.', 'end', { gain: { knowledge: 3 }, flag: 'depth.root_ledger' }), choice('restore', 'Tend the source channel', 'Help the grove recover before departing.', 'end', { cost: { herbs: 3 }, gain: { herbs: 5 } })]),
            node('end', 'The Grove Rested', 'The stewards have enough evidence to discuss a new agreement.', [choice('finish', 'Return respectfully', 'Complete the hollow expedition.')])
        ] },
    { id: 'H15', name: 'The Flooded Nursery', subtitle: 'A grove where living timber was cultivated', icon: '🌿', threat: 3, food: 4, minTurn: 9, requires: ['story:ST2-09', 'mission:H14'], reward: { herbs: 7, knowledge: 5 }, xp: 24, intro: 'An abandoned nursery contains a practical way to grow living timber without harvesting ancient trees.', nodes: [
            node('a', 'Floodwater in the Rows', 'Broken sluices leave cultivated saplings in standing water.', [choice('mark', 'Mark surviving beds', 'Recover evidence of sustainable techniques.', 'b', { gain: { knowledge: 2 } }), choice('clear', 'Open a drainage trench', 'Spend provisions and prevent further damage.', 'b', { cost: { food: 2 }, gain: { herbs: 2 } })]),
            node('b', 'The Nursery Gate', 'A living boundary closes over the safest passage.', [choice('gently', 'Ease the roots aside', 'A Warden can avoid harming the saplings.', 'c', { check: field('resolve', 6, 'warden') }), choice('divert', 'Open the side path', 'Use a proper wooden walkway.', 'c', { cost: { planks: 4 } }), choice('guard', 'Defend the camp from wolves', 'Clear the route through combat.', 'c', { battle: 'wolves' })]),
            node('c', 'The Caretaker’s Instructions', 'A precise set of instructions describes sustainable propagation.', [choice('copy', 'Preserve the nursery methods', 'Record the technique for your researchers.', 'end', { gain: { knowledge: 3 }, flag: 'depth.nursery_methods' }), choice('tend', 'Replant surviving shoots', 'Fund careful restoration before returning.', 'end', { cost: { herbs: 3 }, gain: { herbs: 4 } })]),
            node('end', 'The Nursery’s Future', 'Local growers can consider a voluntary cultivation agreement.', [choice('finish', 'Bring back the findings', 'Complete the nursery expedition.')])
        ] },
    { id: 'H16', name: 'The Ledger Vault of Tideglass', subtitle: 'An independent port’s missing withdrawal request', icon: '⚓', threat: 3, food: 4, minTurn: 9, requires: ['story:ST2-12', 'mission:H11'], reward: { planks: 5, knowledge: 6 }, xp: 22, intro: 'A navigator points toward a dry vault beneath the old customs office.', nodes: [
            node('a', 'The Salt-Stained Door', 'A thin strip of sea light enters the ruined customhouse.', [choice('inspect', 'Study the seal', 'Learn which port authority closed the room.', 'b', { gain: { knowledge: 2 } }), choice('shore', 'Recover usable dock timber', 'Secure materials for repairing the access.', 'b', { gain: { planks: 2 } })]),
            node('b', 'The Customs Lock', 'A brass accounting lock remains held by a mechanical guard.', [choice('solve', 'Read the ledger sequence', 'Use careful study to open the mechanism.', 'c', { check: field('insight', 5, 'engineer') }), choice('replace', 'Replace the damaged frame', 'Use Tools and Planks to free the vault.', 'c', { cost: { tools: 2, planks: 3 } }), choice('fight', 'Disable the watch mechanisms', 'Resolve an optional combat encounter.', 'c', { battle: 'culvert_sentries' })]),
            node('c', 'The Withdrawal Ledger', 'Three communities asked for lawful release from the old distribution agreement.', [choice('copy', 'Make an independent copy', 'Preserve evidence of the refused requests.', 'end', { gain: { knowledge: 3 }, flag: 'depth.tideglass_ledger' }), choice('protect', 'Reinforce the archives', 'Keep the surviving ledger safe for local historians.', 'end', { cost: { planks: 2 }, gain: { knowledge: 2 } })]),
            node('end', 'Records Returned', 'Tideglass representatives can now examine the original request.', [choice('finish', 'Return to the Council', 'Complete the coastal archive expedition.')])
        ] },
    { id: 'H17', name: 'The Beacon of Unwritten Roads', subtitle: 'An old sea relay with an altered map', icon: '≋', threat: 4, food: 5, minTurn: 10, requires: ['story:ST2-12', 'mission:H16'], reward: { tools: 5, knowledge: 7 }, xp: 26, intro: 'Keira hears that the second lighthouse recorded routes which no official atlas admits existed.', nodes: [
            node('a', 'The Sea Stair', 'Cliffside steps lead up to an unmanned navigation relay.', [choice('chart', 'Chart the safe approach', 'Mark an alternate route that avoids the old cliffs.', 'b', { gain: { knowledge: 2 } }), choice('gather', 'Secure abandoned navigation gear', 'Bring back practical supplies.', 'b', { gain: { tools: 2 } })]),
            node('b', 'The Divided Lantern', 'The mechanism can be reached by a guarded stair or a narrow outside ledge.', [choice('climb', 'Take the outer ledge', 'A prepared Ranger can navigate the wind.', 'c', { check: field('agility', 6, 'ranger') }), choice('brace', 'Build a sheltered crossing', 'Use materials to reach the lantern safely.', 'c', { cost: { timber: 5, tools: 1 } }), choice('clear', 'Defend against coast raiders', 'Open the normal stair through combat.', 'c', { battle: 'eastbridge_blockade' })]),
            node('c', 'The Missing Cartography', 'The original chart lists independent routes omitted from later government records.', [choice('duplicate', 'Make a complete chart copy', 'Record the alternate waterways for future diplomacy.', 'end', { gain: { knowledge: 3 }, flag: 'depth.coastal_routes' }), choice('secure', 'Stabilize the old lens', 'Leave navigation safer for local pilots.', 'end', { cost: { tools: 2 }, gain: { planks: 3 } })]),
            node('end', 'The Lantern Relit', 'The mariners retain the original; Fallowbank receives a verified copy.', [choice('finish', 'Return with the chart', 'Complete the coastal relay expedition.')])
        ] },
    { id: 'H18', name: 'The Quiet Registry Vault', subtitle: 'Iven’s sealed collection and a preserved interruption order', icon: '▤', threat: 3, food: 5, minTurn: 10, requires: ['story3:ST3-04'], reward: { knowledge: 8, glass: 3 }, xp: 28, intro: 'Iven needs trustworthy witnesses for a family archive whose records could change the history of the Sundering.', nodes: [
            node('a', 'The Quiet Registry Door', 'The brass-latched entrance is marked with several official seals, some broken and some intact.', [choice('document', 'Record the seals before opening', 'Copy the serial numbers into a witnessed register.', 'b', { gain: { knowledge: 2 } }), choice('brace', 'Support the damaged archway', 'Use construction materials so the archive is entered safely.', 'b', { cost: { timber: 4, stone: 2 } })]),
            node('b', 'The Catalog Machine', 'A rusted clerk-machine holds the archive doors shut. Its watchdogs are still active.', [choice('isolate', 'Isolate its control supply', 'Use small replacement parts without rewriting the archived instructions.', 'c', { cost: { tools: 3 } }), choice('keys', 'Rebuild the original indexing key', 'Preserve the original archive sequence.', 'c', { cost: { knowledge: 4, glass: 1 } }), choice('fight', 'Defeat the remaining archive watchdogs', 'Optional tactical encounter.', 'c', { battle: 'ledger_sentry' })]),
            node('c', 'The Emergency Order', 'The recovered order describes a planned interruption with carefully limited safety expectations.', [choice('copy', 'Make witnessed copies of the order', 'Preserve it without overstating what it proves.', 'end', { gain: { knowledge: 3 }, flag: 'act3.registry_order_found' }), choice('secure', 'Seal the original in a protected case', 'The source remains available for later independent inspection.', 'end', { cost: { planks: 3 }, gain: { knowledge: 2 } })]),
            node('end', 'The Vault Reopened', 'Iven carries a documented copy back to Fallowbank. The Council must verify its historical meaning.', [choice('finish', 'Return with the recovered records', 'Complete the Quiet Registry expedition.')])
        ] },
    { id: 'H19', name: 'Foundry Testimony', subtitle: 'Machinery records beneath a suspended Kilnspire bridge', icon: '⚙', threat: 4, food: 5, minTurn: 11, requires: ['story3:ST3-06'], reward: { iron: 6, knowledge: 7 }, xp: 30, intro: 'Tovin follows the replacement-regulator drawing to a foundry whose safety inspection plates were never made public.', nodes: [
            node('a', 'The Low Foundry', 'A cooling channel runs beneath broken industrial scaffolding, leading toward the old regulation bench.', [choice('copy', 'Copy the engineering diagram', 'Preserve the original dimensions and annotations.', 'b', { gain: { knowledge: 2 } }), choice('collect', 'Recover spare repair brackets', 'Gather materials without stripping machinery from service.', 'b', { gain: { iron: 2 } })]),
            node('b', 'The Jammed Service Lift', 'Mechanical guards patrol a narrow service platform with no intact main stair.', [choice('gantry', 'Brace a crossing using the spare planks', 'Build a temporary safe passage.', 'c', { cost: { planks: 4, tools: 2 } }), choice('guide', 'Follow a mapped lower maintenance tunnel', 'Use existing surveying records to find a route.', 'c', { cost: { knowledge: 4 } }), choice('engage', 'Fight through the machine guards', 'Optional tactical encounter at the service lift.', 'c', { battle: 'forge_wardens' })]),
            node('c', 'The Replacement Fitting', 'Original fittings were swapped before the interruption. Their inspection dates match the missing registry lines.', [choice('photograph', 'Make a complete etched-glass tracing', 'Preserve the serial marks and dates.', 'end', { gain: { knowledge: 4 }, flag: 'act3.foundry_evidence_found' }), choice('sample', 'Remove a redundant sample component', 'Carry a technical reference without damaging active machinery.', 'end', { gain: { mechanisms: 2 } })]),
            node('end', 'An Unfinished Explanation', 'The engineering discrepancies are real; their effect on the network still requires independent verification.', [choice('finish', 'Return with the technical record', 'Complete Foundry Testimony.')])
        ] },
    { id: 'H20', name: 'The Regulator Relay', subtitle: 'The last warning station before the Sundering', icon: '✧', threat: 4, food: 6, minTurn: 12, requires: ['story3:ST3-07'], reward: { knowledge: 9, mechanisms: 3 }, xp: 32, intro: 'A relay records a protective warning that never reached the intended communities. The story depends on preserving that sequence.', nodes: [
            node('a', 'The Broken Signal Way', 'Old mirrors point toward an empty valley. A damaged signal cable remains buried under stone.', [choice('map', 'Map the cable and tower sequence', 'Trace where the warning was supposed to go.', 'b', { gain: { knowledge: 2 } }), choice('prepare', 'Reinforce the walkway supports', 'Make the tower accessible without pulling the cable free.', 'b', { cost: { stone: 3, tools: 1 } })]),
            node('b', 'The Relay Guardians', 'Two old guarding mechanisms are jammed between powered relay plates and a narrow maintenance route.', [choice('disconnect', 'Shut down the relay feed carefully', 'Spend mechanisms to stop dangerous automatic responses.', 'c', { cost: { mechanisms: 3 } }), choice('bypass', 'Build an insulated bypass', 'Use practical equipment to reach the memory plate without fighting.', 'c', { cost: { tools: 3, planks: 4 } }), choice('battle', 'Hold the relay against its defenders', 'Optional tactical encounter.', 'c', { battle: 'relay_guardians' })]),
            node('c', 'The Missing Warning', 'A dated signal proves a redundancy failed to deliver its promised notification before the interruption.', [choice('duplicate', 'Preserve the failure warning', 'Make a certified second copy to compare with the Registry and foundry.', 'end', { gain: { knowledge: 3 }, flag: 'act3.relay_warning_found' }), choice('brace', 'Secure the damaged relay for inspection', 'Leave a safer, stable installation for independent reviewers.', 'end', { cost: { tools: 2 }, gain: { glass: 2 } })]),
            node('end', 'Three Records, One Question', 'The order, changed fittings and missing warning can now be reviewed as independent evidence.', [choice('finish', 'Return for an independent review', 'Complete The Regulator Relay.')])
        ] },
    { id: 'H21', name: 'The Eastbridge Supply Ledger', subtitle: 'Mara’s military-accountability investigation', icon: '⚖', threat: 3, food: 5, minTurn: 12, requires: ['story3:ST3-10'], reward: { knowledge: 9, planks: 4 }, xp: 30, intro: 'A family asks Mara to explain a military requisition that took their wagons and grain. The records remain in an abandoned security office.', nodes: [
            node('a', 'The Requisition Road', 'An old gate bears painted wagon numbers. The surviving families still know which supplies were taken.', [choice('listen', 'Hear the families and record their account', 'Secure testimony without promising a verdict before examining the ledger.', 'b', { gain: { knowledge: 2 } }), choice('survey', 'Chart the abandoned supply trail', 'Recover the locations of wagon stops and abandoned storage.', 'b', { gain: { planks: 2 } })]),
            node('b', 'The Quartermaster Lock', 'A mechanical lock protects the requisition ledger. An overgrown side passage reaches the same room.', [choice('keys', 'Reassemble the independent document key', 'Open the office without losing its original seal.', 'c', { cost: { tools: 3, knowledge: 2 } }), choice('side', 'Clear the overgrown service corridor', 'Spend supplies on safe access and avoid fighting the old sentries.', 'c', { cost: { planks: 4, food: 3 } }), choice('defend', 'Protect the witnesses from the old gate sentries', 'Optional tactical encounter; the families remain outside the danger.', 'c', { battle: 'quartermaster_watch' })]),
            node('c', 'The Wagon Register', 'The register names civilian property seized during an emergency and traces the approval to Mara’s former command.', [choice('copy', 'Create a witnessed ledger copy', 'Preserve identities and quantities for restitution.', 'end', { gain: { knowledge: 3 }, flag: 'act3.mara_wagon_ledger' }), choice('preserve', 'Stabilize the original office records', 'Ensure the families and Council can inspect the surviving document.', 'end', { cost: { tools: 2 }, gain: { knowledge: 2 } })]),
            node('end', 'The People Behind the Numbers', 'Mara carries the record home. The Council must fund a response, not just offer kind words.', [choice('finish', 'Return for a public accountability decision', 'Complete the supply-ledger expedition.')])
        ] },
    { id: 'H22', name: 'The Crownroad Survey', subtitle: 'Find a supply-safe route toward Veymark', icon: '🧭', threat: 4, food: 6, minTurn: 14, requires: ['story3:ST3-15'], reward: { stone: 7, knowledge: 8 }, xp: 34, intro: 'The factions agree to investigate the old capital, but no one can safely approach it without a verified route and provisions.', nodes: [
            node('a', 'The Broken Milestones', 'Three roads vanish into a collapsed trade causeway. None can be assumed to remain usable.', [choice('stones', 'Measure the remaining markers', 'Identify the original alignment of the Crownroad.', 'b', { gain: { knowledge: 2 } }), choice('supplies', 'Recover weatherproof supply containers', 'Reclaim equipment without taking goods from occupied settlements.', 'b', { gain: { stone: 2 } })]),
            node('b', 'The Collapsed Causeway', 'A sentry still watches a road no longer safe for travelers.', [choice('bridge', 'Brace the damaged crossing', 'Build a temporary maintenance span, leaving the original stones intact.', 'c', { cost: { planks: 5, tools: 3 } }), choice('ravine', 'Mark a surveyed detour', 'Spend Food and Knowledge on a slower but safe route.', 'c', { cost: { food: 4, knowledge: 4 } }), choice('fight', 'Disable the abandoned road sentry', 'Optional tactical engagement at the causeway.', 'c', { battle: 'crownroad_sentinel' })]),
            node('c', 'The Travel Ledger', 'A dated ledger compares the roads, their load limits, and where the old guard posts were maintained.', [choice('copy', 'Duplicate the travel and supply table', 'Record a verifiable approach to the basin.', 'end', { gain: { knowledge: 4 }, flag: 'act3.crownroad_survey' }), choice('repair', 'Mark the damaged load-bearing stones', 'Leave clear guidance for the next convoy.', 'end', { cost: { stone: 3 }, gain: { tools: 2 } })]),
            node('end', 'The Route Is Real', 'Rook confirms a safe but costly approach. The player must fund the convoy and select its legal route.', [choice('finish', 'Report to the Council on the surveyed passage', 'Complete the Crownroad Survey.')])
        ] },
    { id: 'H23', name: 'The Gate of Stone', subtitle: 'Reach the authorization chamber outside Veymark', icon: '✧', threat: 5, food: 7, minTurn: 15, requires: ['story3:ST3-17', 'mission:H22'], reward: { knowledge: 10, glass: 4 }, xp: 38, intro: 'The chosen approach leads to an outer gate with damaged protections and an intact privileged-authorization record.', nodes: [
            node('a', 'The Ash-Colored Gateway', 'The ruin carries the marks of six old participating governments. Its primary gate is silent.', [choice('signs', 'Document each remaining seal', 'Preserve the authorizations with their correct dates and locations.', 'b', { gain: { knowledge: 3 } }), choice('stones', 'Recover fallen construction supports', 'Stabilize the approach without changing the gate mechanism.', 'b', { gain: { stone: 2 } })]),
            node('b', 'The Gateward Mechanism', 'A dormant watch mechanism blocks the last stair while a maintenance vent offers another route.', [choice('maintenance', 'Rebuild the maintenance key', 'Use Tools and Mechanisms to open the original lock.', 'c', { cost: { tools: 4, mechanisms: 2 } }), choice('vent', 'Brace the service passage', 'Carefully bypass the main gate without disabling the historical record.', 'c', { cost: { planks: 5, knowledge: 5 } }), choice('hold', 'Defend the convoy at the outer gate', 'Optional tactical battle against the remaining guardian.', 'c', { battle: 'gateward_construct' })]),
            node('c', 'The Privileged Authorization', 'An operating record proves a limited privileged command reached this station before the collapse. The command does not identify an operator’s intentions.', [choice('witness', 'Preserve the authorization sequence', 'Keep the record and its limits available to independent historical review.', 'end', { gain: { knowledge: 4 }, flag: 'act3.gate_sequence' }), choice('secure', 'Create a protected physical tracing', 'Transport a verifiable copy to the Council while leaving the original intact.', 'end', { cost: { glass: 2 }, gain: { knowledge: 3 } })]),
            node('end', 'The Road Into Veymark', 'The investigation can now proceed into the ruined capital. The deeper regulator and the full historical mechanism remain unresolved.', [choice('finish', 'Return with the gate authorization record', 'Complete the Gate of Stone.')])
        ] },
];
// Pass 21 Veymark expeditions: optional combat, always a practical noncombat alternative.
MISSIONS.push({ id: 'H24', name: 'Hall of Petitions', subtitle: 'The residents and rejected requests of Veymark', icon: '📜', threat: 4, food: 6, minTurn: 15, requires: ['story4:ST4-02'], reward: { knowledge: 11, glass: 3 }, xp: 37, intro: 'The formal petition chamber is damaged, but its objections and approval ledgers can still be read without violating occupied homes.', nodes: [
        node('a', 'The Petition Steps', 'The hall entrance is littered with broken nameplates. Living residents help identify the doors still in use.', [choice('listen', 'Hear the resident custodians', 'Pay attention to the boundaries of occupied rooms.', 'b', { gain: { knowledge: 2 } }), choice('map', 'Make a public access map', 'Mark safe routes and protected rooms.', 'b', { gain: { stone: 2 } })]),
        node('b', 'The Wardens of the Racks', 'A maintenance warden prevents the group from reaching a damaged filing room.', [choice('key', 'Repair the original document key', 'Open the reading room without breaking its lock.', 'c', { cost: { tools: 4, mechanisms: 2 } }), choice('stairs', 'Brace the unguarded inspection stair', 'Reach the same chamber without disturbing the warden.', 'c', { cost: { planks: 5, food: 3 } }), choice('defend', 'Disable the malfunctioning record guardians', 'Optional battle for a protected access route.', 'c', { battle: 'petition_wardens' })]),
        node('c', 'The Denied Petitions', 'The records retain public objections made before the planned interruption, but record receipt rather than private thoughts.', [choice('copies', 'Create identical witnessed copies', 'Preserve accepted and rejected requests with the original dates.', 'end', { gain: { knowledge: 3 }, flag: 'act4.petition_source' }), choice('secure', 'Protect the papers in a sealed case', 'Keep the originals intact for inspection by other factions.', 'end', { cost: { glass: 2 }, gain: { knowledge: 3 } })]),
        node('end', 'The Voices That Remain', 'Iven carries a complete verified petition ledger back to the Council.', [choice('finish', 'Submit the petitions to the Council', 'Complete Hall of Petitions.')])
    ] }, { id: 'H25', name: 'Chamber of Six Seals', subtitle: 'Follow the authorization chain below the capital', icon: '◈', threat: 5, food: 7, minTurn: 15, requires: ['story4:ST4-04', 'mission:H24'], reward: { knowledge: 12, mechanisms: 4 }, xp: 39, intro: 'Six mechanical seals form an old authorization circuit. Their sequence can be studied without waking the old system.', nodes: [
        node('a', 'The Disconnected Antechamber', 'Six carved stations face a ring of damaged brass tracks. One mounting is not original.', [choice('trace', 'Trace the countersignature order', 'Record the original placement of the six seal plates.', 'b', { gain: { knowledge: 2 } }), choice('clear', 'Stabilize fallen stone supports', 'Prepare a safe route without touching the circuit.', 'b', { gain: { stone: 2 } })]),
        node('b', 'A Station That Still Guards', 'Two dormant seal keepers activate when the door is approached.', [choice('isolate', 'Disconnect the old plate feed', 'Spend mechanical parts to isolate the circuit for safe passage.', 'c', { cost: { mechanisms: 4, tools: 2 } }), choice('corridor', 'Use a surveyed service corridor', 'Brace a narrow bypass around the keepers.', 'c', { cost: { planks: 5, knowledge: 4 } }), choice('fight', 'Defend the archival team against the keepers', 'Optional battle with the ancient sentries.', 'c', { battle: 'seal_keepers' })]),
        node('c', 'The Privileged Override', 'The seal table shows five ordinary checks and one privileged override, but the operator name field is blank.', [choice('record', 'Copy the complete authorization table', 'Make the blank field explicit in the record.', 'end', { gain: { knowledge: 4 }, flag: 'act4.seal_source' }), choice('trace', 'Preserve a physical tracing of all six seals', 'Secure a verifiable copy without guessing the signer.', 'end', { cost: { glass: 2 }, gain: { knowledge: 3 } })]),
        node('end', 'The Missing Name', 'The party returns with a genuine approval sequence and an unresolved identity.', [choice('finish', 'Present the six-seal table', 'Complete Chamber of Six Seals.')])
    ] }, { id: 'H26', name: 'Regulator Galleries', subtitle: 'Find the last disconnected warning interval', icon: '⚙', threat: 5, food: 8, minTurn: 15, requires: ['story4:ST4-06', 'mission:H25'], reward: { knowledge: 13, tools: 5 }, xp: 40, intro: 'The gallery still holds dangerous mechanisms. Map the last warning path without restarting any part of the Crownwheel.', nodes: [
        node('a', 'The Bronze Galleries', 'Rows of disconnected conduits lead through a dim chamber above a closed service river.', [choice('lights', 'Light the independent maintenance lamps', 'Separate working emergency lights from old command feeds.', 'b', { gain: { knowledge: 2 } }), choice('route', 'Map the flood-safe walkways', 'Keep the crew away from exposed machinery.', 'b', { gain: { stone: 2 } })]),
        node('b', 'The Relay Wardens', 'Old gallery wardens patrol a closed service door.', [choice('bypass', 'Build an insulated maintenance bridge', 'Reach the archival plate without a fight.', 'c', { cost: { tools: 4, planks: 6 } }), choice('disable', 'Power down the local guard relay', 'Isolate the old defense circuit without restarting it.', 'c', { cost: { mechanisms: 4, glass: 3 } }), choice('battle', 'Defend the survey crew', 'Optional tactical fight against the relay wardens.', 'c', { battle: 'gallery_guardians' })]),
        node('c', 'The Last Warning Interval', 'A dated pause appears between an override and the warning signal. The recovered record cannot yet prove all downstream consequences.', [choice('copy', 'Preserve the timing trace', 'Register the warning interval with an independent verification mark.', 'end', { gain: { knowledge: 4 }, flag: 'act4.gallery_source' }), choice('stabilize', 'Secure the original disconnected signal panel', 'Keep the material open for later technical examination.', 'end', { cost: { tools: 2 }, gain: { knowledge: 3 } })]),
        node('end', 'The Question Still Open', 'The warning gap is real, but the complete sequence behind the Sundering remains uncertain.', [choice('finish', 'Bring the verified warning to the Council', 'Complete Regulator Galleries.')])
    ] });
// Pass 22: three four-scene Veymark adventures; combat is optional in each.
MISSIONS.push({ id: 'H27', name: 'The Magistrate Annex', subtitle: 'A mechanical witness for unanswered petitions', icon: '▤', threat: 5, food: 7, minTurn: 15, requires: ['story4:ST4-10', 'mission:H26'], reward: { knowledge: 13, glass: 4 }, xp: 42, intro: 'The reconstructed petition order points to a sealed annex where old requests could be marked received but left unanswered.', nodes: [
        node('a', 'The Receiving Desk', 'Dust covers two ledgers: incoming objections and the orders entered after them.', [choice('compare', 'Compare the stamped dates', 'Make a dated record without assuming a reason for each rejection.', 'b', { gain: { knowledge: 2 } }), choice('repair', 'Brace the fragile drawer', 'Protect the original papers before opening the annex.', 'b', { cost: { planks: 3 }, gain: { knowledge: 2 } })]),
        node('b', 'The Empty Magistrate Seat', 'An old archive magistrate construct guards the inaccessible registry.', [choice('isolate', 'Disconnect its authorization key', 'Spend engineering supplies to prevent the warden from waking.', 'c', { cost: { tools: 5, mechanisms: 3 } }), choice('bypass', 'Follow the stamped public inspection corridor', 'Reach the archive without claiming the magistrate’s desk.', 'c', { cost: { glass: 3, knowledge: 4 } }), choice('battle', 'Face the Archive Magistrate', 'Optional three-phase tactical boss battle.', 'c', { battle: 'archive_magistrate' })]),
        node('c', 'The Unanswered Index', 'The ledger shows objections received before the order but not resolved before it was carried out.', [choice('witness', 'Witness the two ledgers together', 'Preserve the limits of the records and the legal blanks.', 'end', { gain: { knowledge: 4 }, flag: 'act4.magistrate_record' }), choice('catalogue', 'Secure the original plate without removing it', 'Record a verifiable imprint of the filing mechanism.', 'end', { cost: { glass: 2 }, gain: { knowledge: 3 } })]),
        node('end', 'The Paper Trail', 'The annex provides a clear record of formal receipt and delay, not the missing magistrate’s intentions.', [choice('finish', 'Return with the magistrate record', 'Complete the Magistrate Annex.')])
    ] }, { id: 'H28', name: 'The Disconnected Isolator', subtitle: 'A physically altered protection wheel beneath Veymark', icon: '⚙', threat: 6, food: 8, minTurn: 15, requires: ['story4:ST4-12', 'mission:H27'], reward: { knowledge: 15, mechanisms: 5 }, xp: 45, intro: 'A disconnected machine offers a rare chance to examine altered safeguards without waking the Crownwheel network.', nodes: [
        node('a', 'The Cut Gear', 'Freshly recut teeth interrupt a pattern stamped into an original inspection plate.', [choice('measure', 'Measure the differences before touching anything', 'Preserve the approved and altered shapes separately.', 'b', { gain: { knowledge: 3 } }), choice('brace', 'Build an independent safety brace', 'Isolate the inspection passage from fallen stone.', 'b', { cost: { stone: 3, tools: 2 }, gain: { knowledge: 2 } })]),
        node('b', 'The Regulator Warden', 'A heavy machine guards the isolated test room and starts a warning cycle.', [choice('isolate', 'Insert a cold safety plate', 'Keep the mechanism disconnected using verified engineering steps.', 'c', { cost: { mechanisms: 5, glass: 3 } }), choice('shaft', 'Take the surveyed unpowered service shaft', 'Spend building supplies to reach the replica without a fight.', 'c', { cost: { planks: 7, tools: 3 } }), choice('battle', 'Fight the Crown Regulator', 'Optional three-phase tactical boss battle against a mechanical guardian.', 'c', { battle: 'crown_regulator' })]),
        node('c', 'Approved and Altered', 'The approved drawing and recut wheel demonstrate a real modification, not the identity of whoever ordered it.', [choice('photograph', 'Make matched mechanical tracings', 'Protect evidence that independent engineers can compare.', 'end', { gain: { knowledge: 4 }, flag: 'act4.isolator_proof' }), choice('replica', 'Build a disconnected test replica', 'Spend materials to establish the path without activating the original.', 'end', { cost: { mechanisms: 2, tools: 2 }, gain: { knowledge: 4 } })]),
        node('end', 'The Machine Cannot Name Its Operator', 'The physical alteration can be verified; responsibility still requires documentary evidence.', [choice('finish', 'Present the isolator findings', 'Complete the Disconnected Isolator.')])
    ] }, { id: 'H29', name: 'The Ash-Ward Archive', subtitle: 'Distinguish a formal emergency order from an unsigned alteration', icon: '✧', threat: 6, food: 8, minTurn: 15, requires: ['story4:ST4-14', 'mission:H28'], reward: { knowledge: 16, glass: 4 }, xp: 48, intro: 'The last sealed file is protected by a guardian that enforces old access law, not conscious malice.', nodes: [
        node('a', 'Ash-Ward Steps', 'An evacuation route winds between occupied shelters and the sealed public record annex.', [choice('listen', 'Speak to current residents before proceeding', 'Respect the difference between living homes and abandoned public offices.', 'b', { gain: { knowledge: 3 } }), choice('map', 'Map a safe route outside the residences', 'Preserve the city without claiming its neighborhoods.', 'b', { gain: { stone: 2 } })]),
        node('b', 'The Last Custodian', 'A surviving archive defender enforces an expired but still physically active access rule.', [choice('ledger', 'Present the witnessed public-access authorization', 'Document lawful entry using copies and public testimony.', 'c', { cost: { knowledge: 7, glass: 3 } }), choice('gallery', 'Use the disconnected maintenance gallery', 'Reach the archive with protective equipment and independent witnesses.', 'c', { cost: { tools: 5, planks: 6 } }), choice('battle', 'Defeat the Ash-Ward Guardian', 'Optional three-phase tactical encounter with the archive defender.', 'c', { battle: 'ash_ward_guardian' })]),
        node('c', 'Two Different Orders', 'One document authorizes an emergency interruption; a separate unsigned plate describes a safeguard alteration.', [choice('separate', 'Preserve both records separately', 'Refuse to merge their authors into a single unsupported accusation.', 'end', { gain: { knowledge: 5 }, flag: 'act4.ash_ward_records' }), choice('copies', 'Fund separate public copies', 'Protect both evidence chains from selective erasure.', 'end', { cost: { glass: 2 }, gain: { knowledge: 4 } })]),
        node('end', 'A Bounded Finding', 'The inquiry now has enough to describe a dangerous series of choices, but not a complete attribution of blame.', [choice('finish', 'Bring both authenticated records home', 'Complete the Ash-Ward Archive.')])
    ] });
// Pass 23: three protected Veymark landmarks. Combat is an optional solution;
// civilian rights and documentary limits are preserved by every exit route.
MISSIONS.push({ id: 'H30', name: 'Lower Ward Court', subtitle: 'Two authenticated copies of an unbroken public grant', icon: '▤', threat: 6, food: 9, minTurn: 15, requires: ['story4:ST4-17', 'mission:H29'], reward: { knowledge: 17, glass: 5 }, xp: 52, intro: 'A ruined hearing court still belongs to the living wards. Recover the grant copies without taking the residents’ rooms.', nodes: [
        node('a', 'The Ward Gates', 'Resident caretakers lead the party around occupied chambers to two surviving public shelves.', [choice('witness', 'Ask the wards to witness every record', 'Protect the chain of custody under local supervision.', 'b', { gain: { knowledge: 3 } }), choice('repair', 'Brace a broken public walkway', 'Protect the court before taking impressions.', 'b', { cost: { planks: 4, tools: 2 }, gain: { knowledge: 2 } })]),
        node('b', 'The Grant Sentinel', 'An inactive court sentry reawakens when the secondary archive is approached.', [choice('custody', 'Present matching public access registers', 'Use authenticated duplicates to open the witness corridor without fighting.', 'c', { cost: { knowledge: 8, glass: 3 } }), choice('route', 'Repair the accessible public side door', 'Pay for legal, non-destructive access along the ward path.', 'c', { cost: { planks: 8, tools: 5 } }), choice('battle', 'Defend the witness team', 'Optional tactical encounter with the Court Sentinel.', 'c', { battle: 'court_sentinel' })]),
        node('c', 'The Two Originals', 'The public grant is dated before the technical change. A missing signature remains an unknown, not an accusation.', [choice('copy', 'Register both original chains', 'Secure distinct copies and the documented gaps.', 'end', { gain: { knowledge: 5 }, flag: 'act4.ward_grants_verified' }), choice('local', 'Fund a resident-held copy', 'Leave the ward custodians with independently readable evidence.', 'end', { cost: { glass: 2 }, gain: { knowledge: 4 } })]),
        node('end', 'Rights That Survived', 'The court proves that local grants survived the collapse and must still be respected.', [choice('finish', 'Bring the witnessed record to the Council', 'Complete Lower Ward Court.')])
    ] }, { id: 'H31', name: 'The Safeguard Orchard', subtitle: 'A disconnected warning model among the western terraces', icon: '⚙', threat: 7, food: 9, minTurn: 15, requires: ['story4:ST4-19', 'mission:H30'], reward: { knowledge: 18, mechanisms: 5 }, xp: 55, intro: 'A protected test orchard offers a safe isolated model of the Crownwheel warning path. No live network activation is permitted.', nodes: [
        node('a', 'The Western Test Beds', 'Old regulators stand beneath living roots. None are connected to the Crownwheel.', [choice('ground', 'Ground the isolated test circuit', 'Confirm that no energy returns to the original conduits.', 'b', { gain: { knowledge: 3 } }), choice('measure', 'Measure the approved teeth', 'Build a repeatable record of the original safety design.', 'b', { gain: { tools: 2 } })]),
        node('b', 'The Orchard Wardens', 'A local automated patrol watches the sealed test bench.', [choice('keys', 'Use the witnessed maintenance release', 'Show an authenticated service authorization for the unpowered test room.', 'c', { cost: { mechanisms: 6, glass: 4 } }), choice('bridge', 'Build a separate safety platform', 'Reach the safe replica without touching the old controls.', 'c', { cost: { planks: 9, tools: 5 } }), choice('battle', 'Hold off the Orchard Protector', 'Optional three-phase tactical fight against a safeguard construct.', 'c', { battle: 'orchard_protector' })]),
        node('c', 'Two Controlled Conditions', 'The approved safety design gives a warning. The altered fitting combined with the emergency interruption reproduces the missing alert.', [choice('trial', 'Document the two contrasting runs', 'Publish repeatable observations and the limits of causal inference.', 'end', { gain: { knowledge: 6 }, flag: 'act4.orchard_test_verified' }), choice('witnesses', 'Invite independent engineers to verify the result', 'Pay to certify the record with outside observers.', 'end', { cost: { knowledge: 4 }, gain: { glass: 4 } })]),
        node('end', 'A Mechanism, Not a Name', 'The experiment establishes how two actions defeat a warning, not who privately ordered the alteration.', [choice('finish', 'Return with the safe-test findings', 'Complete the Safeguard Orchard.')])
    ] }, { id: 'H32', name: 'The Sixth Ward Docket', subtitle: 'The remaining public claims after the Sundering', icon: '⚖', threat: 7, food: 10, minTurn: 15, requires: ['story4:ST4-21', 'mission:H31'], reward: { knowledge: 19, medicine: 6 }, xp: 58, intro: 'The last civic docket records surviving residents, property rights, and requests for compensation.', nodes: [
        node('a', 'The Open Kitchens', 'Living wards still operate public kitchens in the old capital.', [choice('listen', 'Record each household request', 'Do not treat a claim as a sworn historical confession.', 'b', { gain: { knowledge: 3 } }), choice('help', 'Carry medical supplies into the ward', 'Provide immediate help before asking questions.', 'b', { cost: { medicine: 4 }, gain: { knowledge: 3 } })]),
        node('b', 'The Docket Gate', 'A broken civic warden blocks the hall of accepted and denied claims.', [choice('release', 'Match the public docket keys', 'Open the legitimate inspection passage through the official claim registers.', 'c', { cost: { knowledge: 9, glass: 4 } }), choice('repair', 'Rebuild the accessible public ramp', 'Help residents reach the hearing chamber without a fight.', 'c', { cost: { planks: 9, tools: 6 } }), choice('battle', 'Defend the claims team', 'Optional three-phase encounter with the Civic Warden.', 'c', { battle: 'civic_warden' })]),
        node('c', 'Restitution Without Conquest', 'The ledger distinguishes proven damage, disputed losses, and decisions still open to appeal.', [choice('archive', 'Preserve every verified claim and uncertainty', 'Protect the right of independent wards to challenge compensation findings.', 'end', { gain: { knowledge: 5 }, flag: 'act4.restitution_verified' }), choice('relief', 'Fund emergency relief for affected households', 'Provide immediate care while keeping the claims process independent.', 'end', { cost: { food: 8 }, gain: { medicine: 3 } })]),
        node('end', 'The Ledger Remains Open', 'The wards can rebuild without being absorbed into Fallowbank or forced to accept a single verdict.', [choice('finish', 'Bring the claims register to the Council', 'Complete the Sixth Ward Docket.')])
    ] });
// Act V opening: each independent-road expedition has real material alternatives
// to combat. The legal record is never an automatic claim of territory.
MISSIONS.push({ id: 'H33', name: 'Accord Road', subtitle: 'Independent signatures beyond the capital', icon: '⌁', threat: 7, food: 9, minTurn: 15, requires: ['story5:ST5-03', 'mission:H32'], reward: { knowledge: 18, planks: 6 }, xp: 55, intro: 'Nella and Rook survey a caravan road whose waystations have signed contradictory access terms.', nodes: [
        node('a', 'The Four Waystations', 'The roadkeepers show signed passes, refusals, and a damaged but open public crossing.', [choice('listen', 'Hear the independent roadkeepers', 'Record every voluntary route and boundary before moving onward.', 'b', { gain: { knowledge: 3 } }), choice('repair', 'Pay to reinforce the river steps', 'Provide safe passage without demanding an annexation.', 'b', { cost: { planks: 5, stone: 6 }, gain: { knowledge: 2 } })]),
        node('b', 'A Forgotten Road Warden', 'An old sentry mistakes the party’s open records for a seizure order.', [choice('register', 'Present the witnessed independent travel passes', 'Spend 8 Knowledge and 4 Glass to document nonexclusive access.', 'c', { cost: { knowledge: 8, glass: 4 } }), choice('detour', 'Construct a safe neutral passage', 'Pay for an alternative route without powering the sentry.', 'c', { cost: { planks: 10, tools: 6 } }), choice('battle', 'Hold off the Accord Warden', 'Optional three-phase tactical defense.', 'c', { battle: 'accord_warden' })]),
        node('c', 'Signs of Refusal', 'Several communities explicitly declined the proposed central authority. Those refusals are part of the record.', [choice('publish', 'Publish both consent and refusal', 'Secure impartial copies for every settlement.', 'end', { gain: { knowledge: 5 }, flag: 'act5.accord_witnessed' }), choice('copies', 'Supply signed copies to the independent wardens', 'Leave the surviving records in local custody.', 'end', { cost: { glass: 3 }, gain: { knowledge: 4 } })]),
        node('end', 'A Road Under Many Charters', 'The Council can negotiate a compact without pretending the roadway belongs to Fallowbank.', [choice('finish', 'Return with the roadkeepers’ written accord', 'Complete Accord Road.')])
    ] }, { id: 'H34', name: 'The Broken Causeway', subtitle: 'A dangerous neutral crossing and its repair manual', icon: '⚒', threat: 8, food: 10, minTurn: 15, requires: ['story5:ST5-05', 'mission:H33'], reward: { tools: 7, knowledge: 17 }, xp: 57, intro: 'An old lifting bridge blocks a relief convoy. Its repair instructions are legal engineering documents, not a political charter.', nodes: [
        node('a', 'The Shattered Span', 'A collapsed arch has trapped a civilian wagon before the remains of the repair station.', [choice('rescue', 'Rescue the trapped wagon crew', 'Use ropes and food to bring them safely away from the span.', 'b', { cost: { food: 6 }, gain: { knowledge: 2 } }), choice('survey', 'Map the safe foundations', 'Mark the structures that can actually support a repair crew.', 'b', { gain: { stone: 3 } })]),
        node('b', 'The Causeway Guardian', 'An old automated guardian holds the repair door shut.', [choice('keys', 'Use authenticated engineering releases', 'Present the documented, disconnected repair instructions.', 'c', { cost: { knowledge: 10, glass: 5 } }), choice('bridge', 'Build a safe temporary approach', 'Spend physical materials to bypass the sealed mechanism.', 'c', { cost: { planks: 12, tools: 7 } }), choice('battle', 'Defend the repair party', 'Optional three-phase encounter with the Causeway Guardian.', 'c', { battle: 'causeway_guardian' })]),
        node('c', 'Who May Repair', 'The original plan assigns maintenance to independent towns through a shared budget, not a capital governor.', [choice('audit', 'Copy the shared maintenance register', 'Document who is entitled to inspect and challenge the work.', 'end', { gain: { knowledge: 6 }, flag: 'act5.causeway_audited' }), choice('share', 'Provide materials to the local roadkeepers', 'Return spare construction goods to those doing the repairs.', 'end', { cost: { stone: 7 }, gain: { knowledge: 5 } })]),
        node('end', 'The Crossing Is Not a Throne', 'The road can be reopened through funded and revocable agreements.', [choice('finish', 'Return with the verified causeway plan', 'Complete the Broken Causeway.')])
    ] }, { id: 'H35', name: 'The Concord Steps', subtitle: 'The oldest voluntary warning charter', icon: '✧', threat: 8, food: 11, minTurn: 15, requires: ['story5:ST5-07', 'mission:H34'], reward: { knowledge: 20, mechanisms: 5 }, xp: 60, intro: 'An isolated relay beneath the Concord Steps records a framework for independent communities to share warnings without surrendering local authority.', nodes: [
        node('a', 'The Public Stairs', 'Hundreds of old civic signatures are carved beside a weathered manual signal bell.', [choice('record', 'Read the public signatures exactly as written', 'Preserve the withdrawal and review clauses as well as the approvals.', 'b', { gain: { knowledge: 4 } }), choice('restore', 'Stabilize the open stairway', 'Make the site safe for visiting residents and independent observers.', 'b', { cost: { stone: 8, tools: 4 }, gain: { knowledge: 3 } })]),
        node('b', 'The Concord Sentinel', 'A disconnected guardian protects a device that has not been operated for centuries.', [choice('witness', 'Show a witnessed safe-access authorization', 'Use non-destructive tests and independent custody.', 'c', { cost: { knowledge: 12, glass: 6 } }), choice('platform', 'Build a separate inspection platform', 'Reach the record without reconnecting the old network.', 'c', { cost: { planks: 13, mechanisms: 5 } }), choice('battle', 'Defend the surveyors', 'Optional three-phase tactical encounter with the Concord Sentinel.', 'c', { battle: 'concord_sentinel' })]),
        node('c', 'The Right to Disconnect', 'The model charter protects community withdrawal, public review and control of local safety equipment.', [choice('certify', 'Certify the voluntary warning charter', 'Preserve the rights and limits as well as the technical record.', 'end', { gain: { knowledge: 7 }, flag: 'act5.concord_charter' }), choice('locals', 'Give local custodians matching records', 'Supply authenticated copies without taking the original.', 'end', { cost: { glass: 4 }, gain: { knowledge: 6 } })]),
        node('end', 'Warnings Shared, Power Divided', 'The old contract can inform the future. It cannot choose that future for the living.', [choice('finish', 'Return with the Concord charter', 'Complete the Concord Steps.')])
    ] });
// Pass 25: story-gated missions testing the real social and material costs of the
// civilization mandates; no mission awards independent territory as a reward.
MISSIONS.push({ id: 'H36', name: 'The Grainline Petition', subtitle: 'Food rights at the edge of a contested mandate', icon: '🌾', threat: 8, food: 10, minTurn: 15, requires: ['story5:ST5-10', 'mission:H35'], reward: { knowledge: 20, food: 12 }, xp: 62, intro: 'Bera and Rook investigate claims that promised emergency grain never reached the independent villages.', nodes: [
        node('a', 'Three Unpaid Granaries', 'Every village keeps separate records of harvests, exemptions and unmet promises.', [choice('listen', 'Hear the village storekeepers', 'Preserve the original ration register, including appeals and rejected orders.', 'b', { gain: { knowledge: 4 } }), choice('feed', 'Provide immediate food assistance', 'Fund temporary supplies before asking residents to testify.', 'b', { cost: { food: 8 }, gain: { knowledge: 3 } })]),
        node('b', 'The Grainline Keeper', 'A sealed ration station refuses access to the public ledger and deploys a damaged defender.', [choice('register', 'Present recorded exemptions and public custody', 'Use the correct release documents without claiming the storehouse.', 'c', { cost: { knowledge: 13, glass: 6 } }), choice('platform', 'Build a safe observation scaffold', 'Photograph the records from an independent platform.', 'c', { cost: { planks: 13, tools: 8 } }), choice('battle', 'Hold off the Grainline Keeper', 'Optional three-phase encounter to defend the recordkeepers.', 'c', { battle: 'grainline_keeper' })]),
        node('c', 'A Debt in Three Ledgers', 'The tally identifies real shortages and contested authority, but not the secret intentions of old wardens.', [choice('publish', 'Preserve the independent ledger copies', 'Return each original to its custodians and provide matching public copies.', 'end', { gain: { knowledge: 5 }, flag: 'act5.grainline_verified' }), choice('repair', 'Supply the ruined public storehouse', 'Fix the accessible door without claiming control of its food.', 'end', { cost: { stone: 8 }, gain: { knowledge: 4 } })]),
        node('end', 'A Promise Cannot Feed Itself', 'The Council will have to fund agreements, not merely announce them.', [choice('finish', 'Return with the Grainline petitions', 'Complete the Grainline Petition.')])
    ] }, { id: 'H37', name: 'The Treaty Weighhouse', subtitle: 'Public tariffs at a neutral border market', icon: '⚖', threat: 9, food: 11, minTurn: 15, requires: ['story5:ST5-12', 'mission:H36'], reward: { knowledge: 22, tools: 8 }, xp: 65, intro: 'Nella follows conflicting merchant contracts to a weighhouse whose old gate still assumes a single ruler owns every route.', nodes: [
        node('a', 'Counters of Old Coin', 'Two merchant companies offer contradictory toll receipts and a signed exemption for medicine.', [choice('record', 'Compare the surviving payment stubs', 'Reconstruct actual paid charges rather than accepting a ruler’s later claim.', 'b', { gain: { knowledge: 4 } }), choice('help', 'Provision stranded trading families', 'Deliver food to the neutral wagon camp.', 'b', { cost: { food: 9 }, gain: { knowledge: 3 } })]),
        node('b', 'The Silent Weighmaster', 'A machine marks every new wagon as seized cargo.', [choice('exempt', 'Show authenticated civilian tariff exemptions', 'Disconnect the seizure process under public witness.', 'c', { cost: { knowledge: 14, glass: 6 } }), choice('bypass', 'Build a temporary neutral scale', 'Measure cargo without operating the ancient collection mechanism.', 'c', { cost: { planks: 14, mechanisms: 6 } }), choice('battle', 'Protect the caravans from the Weighmaster', 'Optional three-phase defense of the wagon crews.', 'c', { battle: 'weighhouse_auditor' })]),
        node('c', 'No One Owns the Road', 'The surviving contract allows independent accounting and neutral access but not forced regional tariffs.', [choice('copies', 'Copy the exemptions for every settlement', 'Preserve each community’s right to challenge the new route charges.', 'end', { gain: { knowledge: 6 }, flag: 'act5.weighhouse_verified' }), choice('refund', 'Return stored cargo to its owners', 'Issue a witnessed inventory rather than keeping the seized goods.', 'end', { cost: { tools: 5 }, gain: { knowledge: 5 } })]),
        node('end', 'A Measure of Trust', 'The weighhouse can operate without recreating the old empire.', [choice('finish', 'Return with the verified trade ledger', 'Complete the Treaty Weighhouse.')])
    ] }, { id: 'H38', name: 'The Unbound Beacon', subtitle: 'Shared warnings without central commands', icon: '⚑', threat: 9, food: 12, minTurn: 15, requires: ['story5:ST5-14', 'mission:H37'], reward: { knowledge: 24, mechanisms: 7 }, xp: 69, intro: 'At the end of a broken sky road, a beacon records the last voluntary warning network before the Sundering.', nodes: [
        node('a', 'Three Quiet Towers', 'The warning towers are disconnected. Their resident caretakers request a public safety test, not a forced restoration.', [choice('listen', 'Read the caretakers’ independent instructions', 'Mark each warning method, refusal clause and safe shutdown procedure.', 'b', { gain: { knowledge: 5 } }), choice('stabilize', 'Secure the damaged stairway', 'Spend stone and tools to provide a safe public inspection path.', 'b', { cost: { stone: 9, tools: 6 }, gain: { knowledge: 4 } })]),
        node('b', 'The Beacon Husk', 'A dormant ward construct guards the disconnected instrument and challenges every attempt to reactivate it.', [choice('manual', 'Present an independently witnessed manual warning plan', 'Use local hand signals and leave the ancient command bus disconnected.', 'c', { cost: { knowledge: 16, glass: 8 } }), choice('separate', 'Build an isolated field signal stand', 'Restore warning capability without restoring the old network.', 'c', { cost: { planks: 15, mechanisms: 8 } }), choice('battle', 'Defend the survey party from the Beacon Husk', 'Optional three-phase battle against the remaining guardian.', 'c', { battle: 'beacon_husk' })]),
        node('c', 'A Network of Choices', 'The old model is useful only if every participating town may disconnect and publicly challenge an order.', [choice('witness', 'Publish a limited warning agreement', 'Preserve the open appeal, isolation, and withdrawal requirements.', 'end', { gain: { knowledge: 7 }, flag: 'act5.beacon_verified' }), choice('locals', 'Leave control keys with local custodians', 'Make copies of safe procedures and keep the original controls separate.', 'end', { cost: { glass: 4 }, gain: { knowledge: 6 } })]),
        node('end', 'The Beacon Is Not a Crown', 'A shared signal can warn a continent. It cannot choose what its people become.', [choice('finish', 'Return with the unbound beacon charter', 'Complete the Unbound Beacon.')])
    ] });
// Pass 26: The final Act V field record is earned through genuine expeditions.
MISSIONS.push({ id: 'H39', name: 'Chamber of Unpaid Names', subtitle: 'Families forgotten by the original compensation register', icon: '◈', threat: 10, food: 12, minTurn: 15, requires: ['story5:ST5-18', 'mission:H38'], reward: { knowledge: 23, medicine: 8 }, xp: 72, intro: 'Bera accompanies the families whose names were removed from a public relief register. The chamber holds signatures and claims, never private intent.', nodes: [
        node('a', 'The Missing Family Pages', 'Six families present old ration tickets that do not appear in the surviving official copy.', [choice('listen', 'Record each family testimony separately', 'Leave originals with their owners and record the corrections.', 'b', { gain: { knowledge: 4 } }), choice('care', 'Fund medicine for the witnesses', 'Protect the living claimants before opening the old records.', 'b', { cost: { medicine: 5 }, gain: { knowledge: 3 } })]),
        node('b', 'The Names Warden', 'A damaged clerk construct attempts to close the civic record because the city no longer has a magistrate.', [choice('copies', 'Use a witnessed correction writ', 'Pay for archival copies and a legally recorded opening.', 'c', { cost: { knowledge: 17, glass: 9 } }), choice('door', 'Construct an independent inspection doorway', 'Reach the paper ledgers without powering the official guardian.', 'c', { cost: { planks: 16, tools: 9 } }), choice('battle', 'Protect the family witnesses from the Names Warden', 'Optional three-phase battle.', 'c', { battle: 'names_warden' })]),
        node('c', 'Names, Not Motives', 'The register proves who was owed supplies and which lines were deleted, not why any individual privately made the decision.', [choice('witness', 'Restore missing names through open testimony', 'Record corrections and preserve the families’ own account of what was owed.', 'end', { gain: { knowledge: 6 }, flag: 'act5.final_names' }), choice('relief', 'Leave the families matching medical supplies', 'Help the petitioners without treating the records as property of the Crown.', 'end', { cost: { medicine: 4 }, gain: { knowledge: 4 } })]),
        node('end', 'A Debt with Living Names', 'The Assembly can now review this public debt honestly.', [choice('finish', 'Return with the unpaid-names record', 'Complete the Chamber of Unpaid Names.')])
    ] }, { id: 'H40', name: 'Saltwater Relay', subtitle: 'The independent coastal warning records', icon: '⚓', threat: 10, food: 13, minTurn: 15, requires: ['story5:ST5-21', 'mission:H39'], reward: { knowledge: 25, glass: 8 }, xp: 75, intro: 'Copperwash dock workers open a storm-flooded signal vault. Local law requires witnesses before any old warning equipment may be moved.', nodes: [
        node('a', 'The Flooded Warning Floor', 'The saltwater has preserved painted exit markers and erased some of the machine’s original contacts.', [choice('map', 'Sketch the local escape and shutdown paths', 'Work under the dockmaster’s signed inspection terms.', 'b', { gain: { knowledge: 5 } }), choice('drain', 'Pay the port crew to drain a safe corridor', 'Spend tools and food without transferring custody of the site.', 'b', { cost: { tools: 7, food: 8 }, gain: { knowledge: 4 } })]),
        node('b', 'Tideglass Signal Keeper', 'A wave-damaged guardian treats every visitor as an unauthorized central command.', [choice('public', 'Present the dock’s public signal charter', 'Keep remote control wires physically disconnected.', 'c', { cost: { knowledge: 19, glass: 10 } }), choice('platform', 'Construct a manual observation platform', 'Read the independent relay copies without waking the Crownwheel.', 'c', { cost: { planks: 16, mechanisms: 10 } }), choice('battle', 'Defend the coastal recordkeepers', 'Optional three-phase battle.', 'c', { battle: 'tideglass_keeper' })]),
        node('c', 'A Warning That Could Be Refused', 'The surviving protocol worked because local stewards could switch off a dangerous order.', [choice('copies', 'Publish the separate warning logs', 'Issue identical reports to all six factions, recording the gaps too.', 'end', { gain: { knowledge: 7 }, flag: 'act5.final_signal' }), choice('local', 'Return the regulator keys to port custodians', 'Preserve local authority and leave the master bus disconnected.', 'end', { cost: { glass: 5 }, gain: { knowledge: 5 } })]),
        node('end', 'The Dockmaster’s Witness', 'A future signal network may coordinate without controlling.', [choice('finish', 'Return with the Saltwater Relay record', 'Complete the Saltwater Relay.')])
    ] }, { id: 'H41', name: 'Witnessgrove Gate', subtitle: 'The last public charter beneath living roots', icon: '❧', threat: 10, food: 14, minTurn: 15, requires: ['story5:ST5-22', 'mission:H40'], reward: { knowledge: 27, living_timber: 8 }, xp: 78, intro: 'Sella leads an open delegation to the last Witnessgrove archive. Living groves hold the signed memory of agreements, but no human mind.', nodes: [
        node('a', 'The Living Root Hall', 'A grovekeeper explains that the original charter was signed, challenged and partially withdrawn over centuries.', [choice('listen', 'Ask the custodians to read the withdrawal clauses', 'Respect the limits of what the Witnessgrove can actually remember.', 'b', { gain: { knowledge: 5 } }), choice('stabilize', 'Repair the visitor paths without cutting roots', 'Supply local stewards and maintain the grove’s living ground.', 'b', { cost: { living_timber: 7, herbs: 8 }, gain: { knowledge: 4 } })]),
        node('b', 'The Rootbound Custodian', 'A disconnected guardian disputes the Council’s authority to remove the keys.', [choice('witness', 'Show independent consent to inspect', 'Pay for witnessing and leave custody with local stewards.', 'c', { cost: { knowledge: 20, glass: 11 } }), choice('walkway', 'Construct a harmless external reading deck', 'Make copies of the surviving record without connecting a control port.', 'c', { cost: { planks: 17, mechanisms: 11 } }), choice('battle', 'Hold the entrance while the grovekeeper exits', 'Optional three-phase defense.', 'c', { battle: 'rootbound_custodian' })]),
        node('c', 'The Right to Remember', 'The grove contains signatures, refusals, and dates. It offers no prophecy and no confession.', [choice('record', 'Publish the signed clauses and corrections', 'Allow all signatories and descendants to challenge copies.', 'end', { gain: { knowledge: 7 }, flag: 'act5.final_grove' }), choice('care', 'Fund the future custodians', 'Leave keys separate, and place the living grove under voluntary protection.', 'end', { cost: { medicine: 7 }, gain: { knowledge: 6 } })]),
        node('end', 'The Grove Makes No King', 'The last record is complete. The future is still a choice for living people.', [choice('finish', 'Return with the Witnessgrove Gate testimony', 'Complete the Witnessgrove Gate.')])
    ] });
export const MISSIONS_BY_ID = Object.fromEntries(MISSIONS.map(m => [m.id, m]));
export const ENCOUNTERS = {
    raiders: { name: 'Road Raider', hp: 11, attack: 3, armor: 1, count: 2 }, quarry_guard: { name: 'Quarry Watcher', hp: 17, attack: 4, armor: 1, count: 1 }, wolves: { name: 'Briar Wolf', hp: 12, attack: 4, armor: 0, count: 2 }, culvert_sentries: { name: 'Maintenance Sentry', hp: 16, attack: 5, armor: 1, count: 2 }, eastbridge_blockade: { name: 'Road Marauder', hp: 17, attack: 5, armor: 1, count: 2 }, first_sentry: { name: 'First Sentry', hp: 42, attack: 6, armor: 2, count: 1, boss: true }, bridgebreaker: { name: 'Bridgebreaker', hp: 32, attack: 5, armor: 2, count: 1, boss: true }, hollow_stag: { name: 'Hollow Stag', hp: 34, attack: 5, armor: 1, count: 1, boss: true }, quartermaster_watch: { name: 'Quartermaster Watch', hp: 24, attack: 5, armor: 2, count: 1 }, crownroad_sentinel: { name: 'Crownroad Sentry', hp: 28, attack: 5, armor: 2, count: 1 }, gateward_construct: { name: 'Gateward Construct', hp: 34, attack: 6, armor: 2, count: 1 }, ledger_sentry: { name: 'Archive Watchdog', hp: 21, attack: 5, armor: 2, count: 2 }, forge_wardens: { name: 'Foundry Watcher', hp: 23, attack: 6, armor: 2, count: 2 }, relay_guardians: { name: 'Relay Guardian', hp: 25, attack: 6, armor: 2, count: 2 }, petition_wardens: { name: 'Petition Warden', hp: 27, attack: 6, armor: 2, count: 2 }, seal_keepers: { name: 'Seal Keeper', hp: 31, attack: 7, armor: 2, count: 2 }, gallery_guardians: { name: 'Gallery Guardian', hp: 33, attack: 7, armor: 3, count: 2 }, archive_magistrate: { name: 'Archive Magistrate', hp: 48, attack: 7, armor: 2, count: 1, boss: true }, crown_regulator: { name: 'Crown Regulator', hp: 55, attack: 8, armor: 3, count: 1, boss: true }, ash_ward_guardian: { name: 'Ash-Ward Guardian', hp: 52, attack: 8, armor: 3, count: 1, boss: true }, court_sentinel: { name: 'Court Sentinel', hp: 57, attack: 8, armor: 3, count: 1, boss: true }, orchard_protector: { name: 'Orchard Protector', hp: 60, attack: 8, armor: 3, count: 1, boss: true }, civic_warden: { name: 'Civic Warden', hp: 62, attack: 9, armor: 3, count: 1, boss: true }, accord_warden: { name: 'Accord Warden', hp: 65, attack: 9, armor: 3, count: 1, boss: true }, causeway_guardian: { name: 'Causeway Guardian', hp: 68, attack: 9, armor: 3, count: 1, boss: true }, concord_sentinel: { name: 'Concord Sentinel', hp: 70, attack: 10, armor: 3, count: 1, boss: true }, grainline_keeper: { name: 'Grainline Keeper', hp: 70, attack: 9, armor: 3, count: 1, boss: true }, weighhouse_auditor: { name: 'Treaty Weighmaster', hp: 74, attack: 10, armor: 3, count: 1, boss: true }, beacon_husk: { name: 'Beacon Husk', hp: 78, attack: 10, armor: 4, count: 1, boss: true }, names_warden: { name: 'Names Warden', hp: 78, attack: 10, armor: 3, count: 1, boss: true }, tideglass_keeper: { name: 'Tideglass Signal Keeper', hp: 82, attack: 10, armor: 4, count: 1, boss: true }, rootbound_custodian: { name: 'Rootbound Custodian', hp: 86, attack: 11, armor: 4, count: 1, boss: true }, scouts: { name: 'Trail Lurker', hp: 9, attack: 3, armor: 0, count: 1 }
};
export const newAdventureState = () => ({ heroes: [], gear: [], completed: [], outcomes: {}, active: null, contractsThisWeek: 0, lastContractTurn: {}, unclaimed: [] });
function heroMaxHp(hero, adv) { return 12 + 3 * hero.attributes.might + 2 * (hero.level - 1) + Object.values(hero.equipment).reduce((sum, id) => sum + ((GEAR_BY_ID[adv.gear.find(x => x.id === id)?.template ?? '']?.hp ?? 0) + ((GEAR_BY_ID[adv.gear.find(x => x.id === id)?.template ?? '']?.slot === 'trinket') ? (adv.gear.find(x => x.id === id)?.rank ?? 0) : 0)), 0); }
export function recruitHero(adv, id, nextId) {
    const def = RECRUITS.find(r => r.id === id);
    if (!def)
        throw Error('Unknown companion.');
    const exists = adv.heroes.find(h => h.id === id);
    if (exists)
        return exists;
    const attrs = { might: 2, agility: 2, insight: 2, resolve: 2, presence: 2 };
    const cls = CLASSES[def.classId];
    attrs[cls.primary] += 2;
    attrs[cls.secondary] += 1;
    const h = { id, name: def.name, classId: def.classId, level: 1, xp: 0, hp: 1, maxHp: 1, attributes: attrs, skillPoints: 0, attributePoints: 0, skills: [], equipment: {}, injuryWeeks: 0 };
    for (const item of def.starter) {
        const instance = { id: nextId(), template: item };
        adv.gear.push({ ...instance, rank: 0 });
        h.equipment[GEAR_BY_ID[item].slot] = instance.id;
    }
    h.maxHp = heroMaxHp(h, adv);
    h.hp = h.maxHp;
    adv.heroes.push(h);
    return h;
}
export function missionAvailability(s, m) {
    if (!s.completedEvents.includes('FH-001'))
        return 'Complete the founding decision first';
    if (s.turn < m.minTurn)
        return `Available from Council Turn ${m.minTurn}`;
    if (!m.repeat && s.adventure.completed.includes(m.id))
        return 'Story expedition completed';
    if (m.repeat && (s.adventure.contractsThisWeek >= 2 || s.adventure.lastContractTurn[m.id] === s.turn))
        return 'Already completed this week';
    for (const req of m.requires ?? []) {
        if (req === 'cellar' && !s.flags.cellar)
            return 'Investigate FH-005: The Tower’s Foundation';
        if (req === 'quarry' && !s.flags.quarry)
            return 'Survey the Old Quarry with Rook';
        if (req === 'orchard' && !s.completedEvents.includes('FH-010'))
            return 'Resolve the Orchard Hill council decision';
        if (req === 'evidence' && !s.flags.evidence)
            return 'Review the first Charter inscription at the Council';
        if (req === 'river' && !s.completedEvents.includes('FH-017'))
            return 'Resolve FH-017: The River Charter';
        if (req.startsWith('story:') && !s.frontier.storiesCompleted.includes(req.slice(6)))
            return `Complete Council chapter ${req.slice(6)}`;
        if (req.startsWith('story3:') && !s.act3.completed.includes(req.slice(7)))
            return `Complete Act III chapter ${req.slice(7)}`;
        if (req.startsWith('story4:') && !s.act4.completed.includes(req.slice(7)))
            return `Complete Act IV chapter ${req.slice(7)}`;
        if (req.startsWith('story5:') && !s.act5.completed.includes(req.slice(7)))
            return `Complete Act V chapter ${req.slice(7)}`;
        if (req.startsWith('mission:') && !s.adventure.completed.includes(req.slice(8)))
            return `Complete ${MISSIONS_BY_ID[req.slice(8)]?.name ?? req}`;
    }
    return null;
}
export function fieldScore(s, attr, classId) { let best = 0; for (const id of s.adventure.active?.party ?? []) {
    const h = s.adventure.heroes.find(x => x.id === id);
    if (!h || h.hp <= 0)
        continue;
    let score = h.attributes[attr] + (classId && h.classId === classId ? 2 : 0);
    const tool = h.equipment.tool ? s.adventure.gear.find(x => x.id === h.equipment.tool) : undefined;
    score += tool ? (GEAR_BY_ID[tool.template]?.toolBonus ?? 0) + (tool.rank ?? 0) : 0;
    const armor = h.equipment.armor ? s.adventure.gear.find(x => x.id === h.equipment.armor) : undefined;
    score += armor ? (GEAR_BY_ID[armor.template]?.toolBonus ?? 0) : 0;
    best = Math.max(best, score);
} return best; }
export function choiceUnavailable(s, c) { if (c.requiresResearch && !s.research.includes(c.requiresResearch))
    return `Research required: ${c.requiresResearch}`; if (c.cost)
    for (const [key, value] of Object.entries(c.cost))
        if (s.resources[key] < (value ?? 0))
            return `Need ${value} ${key}`; if (c.check) {
    const actual = fieldScore(s, c.check.attribute, c.check.classId);
    if (actual < c.check.threshold)
        return `Requires ${c.check.attribute} field score ${c.check.threshold} (party ${actual})`;
} return null; }
function addBounded(s, gain) { const remaining = {}; for (const [key, v] of Object.entries(gain)) {
    const k = key;
    const amount = v ?? 0;
    const caps = k === 'gold' ? 2000 : k === 'food' ? 180 + s.buildings.filter(b => b.kind === 'storehouse').reduce((a, b) => a + b.level * 60, 0) : k === 'timber' || k === 'stone' ? 120 + s.buildings.filter(b => b.kind === 'storehouse').reduce((a, b) => a + b.level * 60, 0) : k === 'knowledge' ? 250 : 100 + s.buildings.filter(b => b.kind === 'storehouse').reduce((a, b) => a + b.level * 60, 0);
    const take = Math.max(0, Math.min(amount, caps - s.resources[k]));
    s.resources[k] += take;
    if (take < amount)
        remaining[k] = amount - take;
} return remaining; }
function spend(s, cost) { for (const [key, v] of Object.entries(cost))
    if (s.resources[key] < (v ?? 0))
        throw Error('Insufficient ' + key); for (const [key, v] of Object.entries(cost))
    s.resources[key] -= v ?? 0; }
function mergeGain(dest, gain) { for (const [key, v] of Object.entries(gain))
    dest[key] = (dest[key] ?? 0) + (v ?? 0); }
function xpFor(hero, xp, adv) { hero.xp += xp; while (hero.level < 20 && hero.xp >= 12 * hero.level * hero.level) {
    hero.level++;
    if (hero.level % 4 === 0)
        hero.attributePoints++;
    if (hero.level % 3 === 0)
        hero.skillPoints++;
    const max = heroMaxHp(hero, adv);
    hero.hp += max - hero.maxHp;
    hero.maxHp = max;
} }
export function getHero(s, id) { const h = s.adventure.heroes.find(h => h.id === id); if (!h)
    throw Error('Hero unavailable'); return h; }
export function gearPower(s, h) { const id = h.equipment.weapon; const gear = s.adventure.gear.find(x => x.id === id); return (GEAR_BY_ID[gear?.template ?? '']?.power ?? 1) + (gear?.rank ?? 0); }
export function gearArmor(s, h) { const id = h.equipment.armor; const gear = s.adventure.gear.find(x => x.id === id); return (GEAR_BY_ID[gear?.template ?? '']?.armor ?? 0) + (gear?.rank ?? 0); }
function battleEnemyIntent(e, round) {
    if (e.name === 'Archive Magistrate')
        return e.phase === 3 ? round % 2 === 0 ? 'sweep' : 'heavy' : e.phase === 2 ? round % 3 === 0 ? 'guard' : 'pierce' : round % 3 === 0 ? 'heavy' : 'strike';
    if (e.name === 'Crown Regulator')
        return e.phase === 3 ? round % 3 === 0 ? 'repair' : 'sweep' : e.phase === 2 ? round % 2 === 0 ? 'heavy' : 'guard' : round % 3 === 0 ? 'charge' : 'strike';
    if (e.name === 'Ash-Ward Guardian')
        return e.phase === 3 ? round % 2 === 0 ? 'charge' : 'sweep' : e.phase === 2 ? round % 3 === 0 ? 'pierce' : 'guard' : round % 2 === 0 ? 'heavy' : 'strike';
    if (e.name === 'First Sentry')
        return e.phase === 3 ? (round % 3 === 0 ? 'repair' : round % 2 === 0 ? 'sweep' : 'heavy') : e.phase === 2 ? (round % 3 === 0 ? 'guard' : 'sweep') : round % 3 === 0 ? 'heavy' : 'strike';
    if (e.name === 'Bridgebreaker')
        return e.phase === 3 ? 'charge' : round % 3 === 0 ? 'sweep' : round % 2 === 0 ? 'pierce' : 'strike';
    if (e.name === 'Hollow Stag')
        return e.phase === 3 ? 'sweep' : round % 3 === 0 ? 'charge' : 'strike';
    if (e.name.includes('Wolf'))
        return round % 3 === 0 ? 'charge' : 'strike';
    if (e.name.includes('Raider') || e.name.includes('Marauder'))
        return round % 3 === 0 ? 'pierce' : round % 2 === 0 ? 'guard' : 'strike';
    return e.name.includes('Sentry') && round % 3 === 0 ? 'guard' : round % 3 === 0 ? 'heavy' : 'strike';
}
function beginBattle(s, encounterId, nextNode) { const active = s.adventure.active; const d = ENCOUNTERS[encounterId]; if (!d)
    throw Error('Unknown combat encounter'); const party = active.party.map((id, i) => ({ heroId: id, position: [3, 4, 5, 0][i], ap: 2, focus: 2, guard: 0, regeneration: 0 })); const enemies = Array.from({ length: d.count }, (_, i) => ({ id: `${encounterId}-${i}`, name: d.name, hp: d.hp, maxHp: d.hp, armor: d.armor, attack: d.attack, position: i === 0 ? 1 : 4, guard: 0, marked: 0, weakened: 0, phase: 1, intent: 'strike' })); for (const foe of enemies)
    foe.intent = battleEnemyIntent(foe, 1); active.battle = { id: encounterId, round: 1, heroes: party, enemies, nextNode, log: [`Encounter begins: ${d.name}. Choose your orders.`] }; }
function battle(s) { const b = s.adventure.active?.battle; if (!b)
    throw Error('There is no active battle'); return b; }
function getCombatActor(s, heroId) { const b = battle(s), actor = b.heroes.find(x => x.heroId === heroId); if (!actor)
    throw Error('Hero not in this battle'); const h = getHero(s, heroId); if (!h.hp || actor.ap <= 0)
    throw Error('This hero cannot act again this round'); return { b, actor, h }; }
function enemy(s, id) { const e = battle(s).enemies.find(e => e.id === id && e.hp > 0); if (!e)
    throw Error('Select an active enemy'); return e; }
function hitEnemy(e, damage, round = 1) {
    const isBoss = Object.values(ENCOUNTERS).some(def => def.boss && def.name === e.name);
    const oldHp = e.hp;
    const guarded = Math.min(e.guard, damage);
    e.guard -= guarded;
    let hpAfter = Math.max(0, e.hp - Math.max(0, damage - guarded));
    if (isBoss) {
        // Each authored boss phase gets at least one player round. No single burst may
        // silently skip every announced phase. This is a visible phase threshold.
        const phase2 = Math.ceil(e.maxHp * 2 / 3), phase3 = Math.ceil(e.maxHp / 3);
        if (e.phase === 1 && hpAfter <= phase2) {
            hpAfter = Math.max(hpAfter, phase2);
            e.phase = 2;
            e.phaseBarrierRound = round;
        }
        else if (e.phase === 2 && hpAfter <= phase3) {
            if (e.phaseBarrierRound === round)
                hpAfter = Math.max(hpAfter, phase3 + 1);
            else {
                hpAfter = Math.max(hpAfter, phase3);
                e.phase = 3;
                e.phaseBarrierRound = round;
            }
        }
        else if (e.phase === 3 && e.phaseBarrierRound === round)
            hpAfter = Math.max(hpAfter, 1);
    }
    e.hp = Math.max(0, hpAfter);
    return oldHp - e.hp;
}
function checkVictory(s) { const b = battle(s); if (b.enemies.some(x => x.hp > 0))
    return null; const a = s.adventure.active; a.history.push(`Won ${ENCOUNTERS[b.id].name} encounter in ${b.round} rounds.`); a.battle = null; a.nodeId = b.nextNode; return `Victory! ${ENCOUNTERS[b.id].name} has been defeated. You can continue exploring.`; }
function minValidTarget(s) { const b = battle(s); const standing = b.heroes.filter(a => getHero(s, a.heroId).hp > 0); const front = standing.filter(a => a.position >= 3); const list = front.length ? front : standing; return getHero(s, list[0].heroId); }
function takeDamage(s, h, amount, pierce = 0) { const b = battle(s); const a = b.heroes.find(a => a.heroId === h.id); const blocked = Math.min(a.guard, Math.max(0, amount - pierce)); a.guard -= blocked; h.hp = Math.max(0, h.hp - (amount - blocked)); }
function resolveEndRound(s) {
    const b = battle(s), notes = [];
    for (const e of b.enemies) {
        if (e.hp <= 0)
            continue;
        if (e.intent === 'guard') {
            e.guard = Math.min(24, e.guard + 4);
            notes.push(`${e.name} reinforces its Guard.`);
            continue;
        }
        if (!b.heroes.some(a => getHero(s, a.heroId).hp > 0))
            break;
        const damage = Math.max(1, e.attack + (e.intent === 'heavy' ? 2 : e.intent === 'charge' ? 3 : 0) - (e.weakened > 0 ? 2 : 0));
        if (e.intent === 'repair') {
            e.hp = Math.min(e.maxHp, e.hp + 3);
            e.guard = Math.min(24, e.guard + 2);
            notes.push(`${e.name} repairs its damaged plating.`);
            continue;
        }
        if (e.intent === 'sweep') {
            for (const h of b.heroes.filter(a => getHero(s, a.heroId).hp > 0).slice(0, 3)) {
                const hero = getHero(s, h.heroId);
                takeDamage(s, hero, Math.max(1, damage - gearArmor(s, hero)));
                notes.push(`${e.name} sweeps ${hero.name}.`);
            }
        }
        else {
            const target = minValidTarget(s);
            takeDamage(s, target, Math.max(1, damage - gearArmor(s, target)), e.intent === 'pierce' ? 2 : 0);
            if (e.intent === 'charge')
                e.guard = Math.min(24, e.guard + 2);
            notes.push(`${e.name} ${e.intent === 'charge' ? 'charges' : e.intent === 'pierce' ? 'pierces the line and strikes' : 'hits'} ${target.name}.`);
        }
    }
    for (const e of b.enemies) {
        e.weakened = Math.max(0, e.weakened - 1);
        e.marked = Math.max(0, e.marked - 1);
    }
    if (!b.heroes.some(a => getHero(s, a.heroId).hp > 0)) {
        for (const a of b.heroes) {
            const h = getHero(s, a.heroId);
            h.injuryWeeks = Math.max(2, h.injuryWeeks);
            h.hp = Math.max(1, Math.ceil(h.maxHp * .5));
        }
        s.adventure.active = null;
        notes.push('Your party was defeated. Everyone returned injured. Rest for two Council Weeks before redeploying.');
        return notes.join(' ');
    }
    b.round++;
    for (const a of b.heroes) {
        a.ap = getHero(s, a.heroId).hp > 0 ? 2 : 0;
        a.focus = Math.min(5, a.focus + 1);
        a.guard = 0;
        if (a.regeneration > 0) {
            const h = getHero(s, a.heroId);
            h.hp = Math.min(h.maxHp, h.hp + 2);
            a.regeneration--;
        }
    }
    for (const e of b.enemies)
        e.intent = battleEnemyIntent(e, b.round);
    b.log = [...b.log.slice(-5), ...notes.slice(-3), `Round ${b.round}: enemy intentions revealed.`].slice(-6);
    return notes.join(' ') || 'A new round begins.';
}
const skillChoices = { guardian: ['bulwark', 'rescue', 'vanguard', 'counterstance'], ranger: ['precision', 'evasion', 'pinning_shot', 'twinshot'], engineer: ['overclock', 'shielding', 'pulse_bomb', 'repair_field'], warden: ['grove_bloom', 'thorn_guard', 'thornburst', 'renewal'] };
export const CLASS_SKILLS = {
    bulwark: { name: 'Bulwark', description: 'Shieldwall grants extra Guard to the whole party.', classId: 'guardian' }, rescue: { name: 'Rescue Step', description: 'Shieldwall also restores 3 HP to the weakest ally.', classId: 'guardian' }, precision: { name: 'Precision', description: 'Marked enemies take an additional 2 damage.', classId: 'ranger' }, evasion: { name: 'Evasive Mark', description: 'Mark also grants the Ranger 3 Guard.', classId: 'ranger' }, overclock: { name: 'Overclock', description: 'Jam Mechanism deals 2 additional damage.', classId: 'engineer' }, shielding: { name: 'Emergency Shielding', description: 'Jam Mechanism also grants the Engineer 3 Guard.', classId: 'engineer' }, grove_bloom: { name: 'Grove Bloom', description: 'Restoring Bloom heals an additional 3 HP.', classId: 'warden' }, thorn_guard: { name: 'Thorn Guard', description: 'Restoring Bloom also grants the target 3 Guard.', classId: 'warden' },
    vanguard: { name: 'Vanguard Break', description: 'Active · 1 AP, 2 Focus. Heavy strike and gain 4 Guard.', classId: 'guardian', kind: 'technique', target: 'enemy', ap: 1, focus: 2 },
    counterstance: { name: 'Counterline', description: 'Active · 1 AP, 2 Focus. Every standing ally gains 5 Guard.', classId: 'guardian', kind: 'technique', target: 'none', ap: 1, focus: 2 },
    pinning_shot: { name: 'Pinning Shot', description: 'Active · 1 AP, 2 Focus. Damage and Weaken a target.', classId: 'ranger', kind: 'technique', target: 'enemy', ap: 1, focus: 2 },
    twinshot: { name: 'Twinshot', description: 'Active · 2 AP, 2 Focus. Hit up to two enemies.', classId: 'ranger', kind: 'technique', target: 'none', ap: 2, focus: 2 },
    pulse_bomb: { name: 'Pulse Bomb', description: 'Active · 2 AP, 2 Focus. Disrupt the entire enemy formation.', classId: 'engineer', kind: 'technique', target: 'none', ap: 2, focus: 2 },
    repair_field: { name: 'Field Repair', description: 'Active · 1 AP, 2 Focus. Restore ally HP and Guard.', classId: 'engineer', kind: 'technique', target: 'ally', ap: 1, focus: 2 },
    thornburst: { name: 'Thornburst', description: 'Active · 2 AP, 2 Focus. Hit and mark all enemies.', classId: 'warden', kind: 'technique', target: 'none', ap: 2, focus: 2 },
    renewal: { name: 'Renewal', description: 'Active · 1 AP, 2 Focus. Heal the party and grant regeneration.', classId: 'warden', kind: 'technique', target: 'none', ap: 1, focus: 2 }
};
export function handleAdventure(s, cmd, nextId) {
    const a = s.adventure;
    switch (cmd.type) {
        case 'mission_start': {
            if (s.activeExpedition || a.active)
                throw Error('Finish or retreat from the active expedition first.');
            const m = MISSIONS_BY_ID[cmd.mission];
            if (!m)
                throw Error('Unknown mission');
            const block = missionAvailability(s, m);
            if (block)
                throw Error(block);
            if (!Array.isArray(cmd.party) || cmd.party.length < 1 || cmd.party.length > 4 || new Set(cmd.party).size !== cmd.party.length)
                throw Error('Select one to four different available heroes.');
            const known = new Set(a.heroes.map(h => h.id));
            if (m.id === 'H01' && !known.has('dain'))
                recruitHero(a, 'dain', nextId);
            for (const id of cmd.party) {
                const h = a.heroes.find(h => h.id === id);
                if (!h || h.injuryWeeks > 0 || h.hp < 1)
                    throw Error(`${id} is unavailable or recovering.`);
            }
            spend(s, { food: m.food });
            a.active = { id: m.id, instanceId: nextId(), nodeId: m.nodes[0].id, party: [...cmd.party], history: [], secured: {}, battle: null };
            return { note: `${m.name} begins. ${m.food} Food was packed for the journey.` };
        }
        case 'mission_choice': {
            const active = a.active;
            if (!active || active.battle)
                throw Error('No available adventure choice.');
            const m = MISSIONS_BY_ID[active.id];
            const n = m.nodes.find(n => n.id === active.nodeId);
            if (!n)
                throw Error('Adventure scene missing.');
            const c = n.choices.find(x => x.id === cmd.choice);
            if (!c)
                throw Error('Unknown adventure choice.');
            const reason = choiceUnavailable(s, c);
            if (reason)
                throw Error(reason);
            if (c.cost)
                spend(s, c.cost);
            if (c.gain)
                mergeGain(active.secured, c.gain);
            if (c.flag)
                s.flags[c.flag] = true;
            active.history.push(`${n.title}: ${c.label}`);
            if (c.battle) {
                beginBattle(s, c.battle, c.next ?? 'end');
                return { note: `Battle begins: ${ENCOUNTERS[c.battle].name}! Enemy intentions are visible before each round.` };
            }
            if (c.next) {
                active.nodeId = c.next;
                return { note: `${c.label}. ${m.nodes.find(x => x.id === c.next)?.title ?? 'Continue'}.` };
            }
            for (const id of active.party) {
                const h = getHero(s, id);
                xpFor(h, m.xp, a);
                h.hp = h.maxHp;
            }
            const once = !m.repeat && !a.completed.includes(m.id);
            const rewards = { ...active.secured };
            mergeGain(rewards, m.reward);
            const overflow = addBounded(s, rewards);
            const gearTemplates = m.gearReward ? [m.gearReward] : [];
            const pendingGear = [];
            for (const g of gearTemplates) {
                if (a.gear.length < 40)
                    a.gear.push({ id: nextId(), template: g, rank: 0 });
                else
                    pendingGear.push(g);
            }
            if (Object.keys(overflow).length || pendingGear.length)
                a.unclaimed.push({ id: nextId(), missionId: m.id, resources: overflow, gearTemplates: pendingGear });
            if (once)
                a.completed.push(m.id);
            if (m.repeat) {
                a.contractsThisWeek++;
                a.lastContractTurn[m.id] = s.turn;
            }
            a.outcomes[m.id] = active.history.join(' • ');
            if (m.recruit) {
                const hero = recruitHero(a, m.recruit, nextId);
                if (m.id === 'H01') {
                    s.heroRecruited = true;
                    s.expeditionDone = true;
                    s.flags.inscription = true;
                }
            }
            if (m.id === 'H08')
                s.flags['root_chamber.discovered'] = true;
            a.active = null;
            return { note: `${m.name} complete! Rewards and ${m.xp} Hero XP secured.${m.recruit ? ' New hero recruited.' : ''}`, chronicle: `${m.name} — ${active.history.join('; ')}. The party returned with their discoveries.` };
        }
        case 'mission_retreat': {
            if (!a.active)
                throw Error('No active expedition');
            if (a.active.battle)
                throw Error('End the ongoing battle or accept defeat before returning.');
            const m = MISSIONS_BY_ID[a.active.id];
            const secured = a.active.secured;
            const left = addBounded(s, secured);
            if (Object.keys(left).length)
                a.unclaimed.push({ id: nextId(), missionId: m.id, resources: left, gearTemplates: [] });
            a.active = null;
            return { note: `Returned early from ${m.name}. Only secured optional finds were brought home. The mission can be tried again.`, chronicle: `The party returned early from ${m.name} without completing its main objective.` };
        }
        case 'claim_adventure_reward': {
            const r = a.unclaimed.find(x => x.id === cmd.id);
            if (!r)
                throw Error('No pending reward');
            r.resources = addBounded(s, r.resources);
            const left = [];
            for (const id of r.gearTemplates) {
                if (a.gear.length < 40)
                    a.gear.push({ id: nextId(), template: id, rank: 0 });
                else
                    left.push(id);
            }
            r.gearTemplates = left;
            if (!Object.keys(r.resources).length && !r.gearTemplates.length)
                a.unclaimed = a.unclaimed.filter(x => x.id !== r.id);
            return { note: 'Claimed every secured expedition reward that fits your inventory and storage.' };
        }
        case 'hero_craft': {
            const def = GEAR_BY_ID[cmd.recipe];
            if (!def)
                throw Error('Unknown crafting recipe');
            if (a.gear.length >= 40)
                throw Error('Equipment inventory is full (40 slots).');
            spend(s, def.cost);
            a.gear.push({ id: nextId(), template: def.id, rank: 0 });
            return { note: `Crafted ${def.name}. Open the Hero Roster to equip it.` };
        }
        case 'hero_equip': {
            const h = getHero(s, cmd.hero), g = a.gear.find(x => x.id === cmd.item);
            if (!g)
                throw Error('Equipment not found.');
            if (a.active?.party.includes(h.id))
                throw Error('Change equipment before or after a mission, not during it.');
            const def = GEAR_BY_ID[g.template];
            if (!def)
                throw Error('Unknown equipment.');
            if (def.classIds && !def.classIds.includes(h.classId))
                throw Error('This class cannot equip that item.');
            if (a.heroes.some(x => x.id !== h.id && Object.values(x.equipment).includes(g.id)))
                throw Error('Another hero is using this item.');
            const old = h.maxHp;
            h.equipment[def.slot] = g.id;
            h.maxHp = heroMaxHp(h, a);
            h.hp = Math.max(1, Math.min(h.maxHp, h.hp + h.maxHp - old));
            return { note: `${h.name} equipped ${def.name}.` };
        }
        case 'hero_unequip': {
            const h = getHero(s, cmd.hero);
            if (a.active?.party.includes(h.id))
                throw Error('Cannot change equipment during an expedition');
            delete h.equipment[cmd.slot];
            h.maxHp = heroMaxHp(h, a);
            h.hp = Math.min(h.hp, h.maxHp);
            return { note: `${h.name} removed the ${cmd.slot}.` };
        }
        case 'hero_skill': {
            const h = getHero(s, cmd.hero);
            const def = CLASS_SKILLS[cmd.skill];
            if (!def || def.classId !== h.classId || h.skillPoints < 1 || h.skills.includes(cmd.skill) || !skillChoices[h.classId].includes(cmd.skill))
                throw Error('Skill not available.');
            h.skillPoints--;
            h.skills.push(cmd.skill);
            return { note: `${h.name} learned ${def.name}!` };
        }
        case 'hero_attribute': {
            const h = getHero(s, cmd.hero);
            if (!['might', 'agility', 'insight', 'resolve', 'presence'].includes(cmd.attribute) || h.attributePoints < 1 || h.attributes[cmd.attribute] >= 12)
                throw Error('Attribute point not available.');
            const oldMax = h.maxHp;
            h.attributes[cmd.attribute]++;
            h.attributePoints--;
            h.maxHp = heroMaxHp(h, a);
            h.hp += h.maxHp - oldMax;
            return { note: `${h.name} increased ${cmd.attribute}.` };
        }
        case 'battle_attack': {
            const { actor, h, b } = getCombatActor(s, cmd.hero);
            const e = enemy(s, cmd.enemy);
            if ((h.classId === 'guardian' || h.classId === 'warden') && e.position < 3 && b.enemies.some(x => x.hp > 0 && x.position >= 3))
                throw Error('Frontline enemies block this melee target. Select a frontline enemy first.');
            const attr = CLASSES[h.classId].primary;
            const marked = e.marked > 0 ? 2 : 0;
            const bonus = h.skills.includes('precision') && marked ? 2 : 0;
            const damage = Math.max(1, gearPower(s, h) + Math.floor(h.attributes[attr] / 2) + marked + bonus - e.armor);
            actor.ap--;
            const oldPhase = e.phase;
            const dealt = hitEnemy(e, damage, b.round);
            const victory = checkVictory(s);
            if (b.enemies.some(x => x.hp > 0)) {
                b.log = [...b.log.slice(-5), `${h.name} hits ${e.name} for ${dealt}.`, ...(e.phase !== oldPhase ? [`${e.name} shifts to phase ${e.phase}!`] : [])].slice(-6);
            }
            return { note: victory ?? `${h.name} strikes ${e.name} for ${dealt} damage. ${e.hp} HP remaining.${e.phaseBarrierRound === b.round ? ' The boss has entered a protected new phase.' : ''}` };
        }
        case 'battle_guard': {
            const { actor, h, b } = getCombatActor(s, cmd.hero);
            actor.ap--;
            actor.guard = Math.min(30, actor.guard + 4 + (h.skills.includes('bulwark') ? 1 : 0));
            b.log = [...b.log.slice(-5), `${h.name} braces behind Guard.`];
            return { note: `${h.name} braces for danger and gains Guard.` };
        }
        case 'battle_skill': {
            const { actor, h, b } = getCombatActor(s, cmd.hero);
            if (actor.focus < 1)
                throw Error('Need at least one Focus for this ability.');
            actor.focus--;
            actor.ap--;
            if (h.classId === 'guardian') {
                for (const ally of b.heroes.filter(x => getHero(s, x.heroId).hp > 0))
                    ally.guard = Math.min(30, ally.guard + 3 + (h.skills.includes('bulwark') ? 3 : 0));
                if (h.skills.includes('rescue')) {
                    const allies = b.heroes.map(x => getHero(s, x.heroId)).filter(x => x.hp > 0).sort((x, y) => x.hp / x.maxHp - y.hp / y.maxHp);
                    const weak = allies[0];
                    if (weak)
                        weak.hp = Math.min(weak.maxHp, weak.hp + 3);
                }
                return { note: `${h.name} raises Shieldwall. Your party gains Guard.` };
            }
            if (h.classId === 'ranger') {
                const e = enemy(s, cmd.target);
                e.marked = 2;
                if (h.skills.includes('evasion'))
                    actor.guard += 3;
                return { note: `${h.name} marks ${e.name}. Attacks deal bonus damage for two rounds.` };
            }
            if (h.classId === 'engineer') {
                const e = enemy(s, cmd.target);
                e.weakened = 2;
                const n = h.skills.includes('overclock') ? 5 : 3;
                hitEnemy(e, Math.max(1, n - e.armor), b.round);
                if (h.skills.includes('shielding'))
                    actor.guard += 3;
                return { note: checkVictory(s) ?? `${h.name} jams ${e.name}. Its attacks are weakened.` };
            }
            const ally = getHero(s, cmd.target);
            if (!b.heroes.some(x => x.heroId === ally.id))
                throw Error('Choose an ally in the current party.');
            const heal = 6 + (h.skills.includes('grove_bloom') ? 3 : 0);
            ally.hp = Math.min(ally.maxHp, ally.hp + heal);
            if (h.skills.includes('thorn_guard')) {
                const ch = b.heroes.find(x => x.heroId === ally.id);
                ch.guard = Math.min(30, ch.guard + 3);
            }
            return { note: `${h.name} heals ${ally.name} for up to ${heal} HP.` };
        }
        case 'battle_move': {
            const { actor, h, b } = getCombatActor(s, cmd.hero);
            if (!Number.isInteger(cmd.position) || cmd.position < 0 || cmd.position > 5 || b.heroes.some(x => x.position === cmd.position))
                throw Error('Choose an empty valid formation cell.');
            actor.ap--;
            actor.position = cmd.position;
            return { note: `${h.name} moves to a new formation position.` };
        }
        case 'battle_technique': {
            const { actor, h, b } = getCombatActor(s, cmd.hero);
            const tech = CLASS_SKILLS[cmd.technique];
            if (!tech || tech.classId !== h.classId || tech.kind !== 'technique' || !h.skills.includes(cmd.technique))
                throw Error('Technique is not trained.');
            const apCost = tech.ap ?? 1, focusCost = tech.focus ?? 2;
            if (actor.ap < apCost || actor.focus < focusCost)
                throw Error('Not enough AP or Focus for this technique.');
            // Validate the target before spending any action resources.
            const targetEnemy = tech.target === 'enemy' ? enemy(s, cmd.target) : null;
            const targetAlly = tech.target === 'ally' ? b.heroes.find(x => x.heroId === cmd.target && getHero(s, x.heroId).hp > 0) : null;
            if (tech.target === 'ally' && !targetAlly)
                throw Error('Choose an active ally for this technique.');
            actor.ap -= apCost;
            actor.focus -= focusCost;
            let effect = '';
            if (cmd.technique === 'vanguard') {
                const foe = targetEnemy;
                const d = Math.max(1, gearPower(s, h) + Math.floor(h.attributes.might / 2) + 3 - foe.armor);
                const actual = hitEnemy(foe, d, b.round);
                actor.guard = Math.min(30, actor.guard + 4);
                effect = `${h.name} breaks through for ${actual} and raises Guard.`;
            }
            else if (cmd.technique === 'counterstance') {
                for (const ally of b.heroes.filter(x => getHero(s, x.heroId).hp > 0))
                    ally.guard = Math.min(30, ally.guard + 5);
                effect = `${h.name} anchors a protective counterline.`;
            }
            else if (cmd.technique === 'pinning_shot') {
                const foe = targetEnemy;
                const d = Math.max(1, gearPower(s, h) + 2 - foe.armor);
                const actual = hitEnemy(foe, d, b.round);
                foe.weakened = 2;
                effect = `${h.name} pins ${foe.name} for ${actual}, weakening its next attacks.`;
            }
            else if (cmd.technique === 'twinshot') {
                const targets = b.enemies.filter(x => x.hp > 0).slice(0, 2);
                for (const foe of targets)
                    hitEnemy(foe, Math.max(1, gearPower(s, h) + 1 - foe.armor), b.round);
                effect = `${h.name} fires across ${targets.length} enemies.`;
            }
            else if (cmd.technique === 'pulse_bomb') {
                for (const foe of b.enemies.filter(x => x.hp > 0)) {
                    hitEnemy(foe, Math.max(1, 5 - foe.armor), b.round);
                    foe.weakened = Math.max(foe.weakened, 1);
                }
                effect = `${h.name} detonates a controlled pulse across the formation.`;
            }
            else if (cmd.technique === 'repair_field') {
                const ally = getHero(s, targetAlly.heroId);
                ally.hp = Math.min(ally.maxHp, ally.hp + 6);
                targetAlly.guard = Math.min(30, targetAlly.guard + 3);
                effect = `${h.name} repairs ${ally.name}'s protection and restores health.`;
            }
            else if (cmd.technique === 'thornburst') {
                for (const foe of b.enemies.filter(x => x.hp > 0)) {
                    hitEnemy(foe, Math.max(1, 4 - foe.armor), b.round);
                    foe.marked = Math.max(foe.marked, 1);
                }
                effect = `${h.name} sends protective thorns through the enemy line.`;
            }
            else if (cmd.technique === 'renewal') {
                for (const ally of b.heroes.filter(x => getHero(s, x.heroId).hp > 0)) {
                    const hero = getHero(s, ally.heroId);
                    hero.hp = Math.min(hero.maxHp, hero.hp + 3);
                    ally.regeneration = Math.max(ally.regeneration, 2);
                }
                effect = `${h.name} invokes renewal for the whole party.`;
            }
            else
                throw Error('Technique not implemented.');
            const victory = checkVictory(s);
            if (b === a.active?.battle)
                b.log = [...b.log.slice(-5), effect];
            return { note: victory ?? effect };
        }
        case 'battle_medicine': {
            const { actor, h, b } = getCombatActor(s, cmd.hero);
            const target = b.heroes.find(x => x.heroId === cmd.target && getHero(s, x.heroId).hp > 0);
            if (!target)
                throw Error('Choose an active companion.');
            if (actor.medicineUsed)
                throw Error('This hero already used Medicine in this battle.');
            if (s.resources.medicine < 1)
                throw Error('No Medicine available.');
            s.resources.medicine--;
            actor.ap--;
            actor.medicineUsed = true;
            const ally = getHero(s, cmd.target);
            ally.hp = Math.min(ally.maxHp, ally.hp + 9);
            b.log = [...b.log.slice(-5), `${h.name} treats ${ally.name} with Medicine.`];
            return { note: `${h.name} uses Medicine on ${ally.name}; up to 9 HP restored.` };
        }
        case 'hero_enhance': {
            if (a.active)
                throw Error('Improve equipment between expeditions.');
            const g = a.gear.find(x => x.id === cmd.item);
            if (!g)
                throw Error('Equipment not found.');
            if (g.rank >= 2)
                throw Error('Equipment is already fully refined.');
            const def = GEAR_BY_ID[g.template];
            const cost = { gold: 12 + (g.rank + 1) * 10, tools: g.rank + 1 };
            if (def.slot === 'weapon')
                cost.iron = 1 + g.rank;
            else
                cost.stone = 2 + g.rank;
            spend(s, cost);
            g.rank++;
            for (const hero of a.heroes) {
                if (!Object.values(hero.equipment).includes(g.id))
                    continue;
                const max = heroMaxHp(hero, a);
                hero.hp = Math.min(max, hero.hp + max - hero.maxHp);
                hero.maxHp = max;
            }
            return { note: `${def.name} is now refinement +${g.rank}. ${def.slot === 'weapon' ? 'Weapon Power' : def.slot === 'armor' ? 'Armor' : def.slot === 'tool' ? 'Field skill bonus' : 'Vitality'} increased.` };
        }
        case 'battle_end_round': return { note: resolveEndRound(s) };
        case 'battle_retreat': {
            const active = a.active;
            if (!active?.battle)
                throw Error('No ongoing battle.');
            const title = MISSIONS_BY_ID[active.id].name;
            for (const id of active.party) {
                const h = getHero(s, id);
                h.injuryWeeks = Math.max(1, h.injuryWeeks);
                h.hp = Math.max(1, h.hp);
            }
            a.active = null;
            return { note: `The party withdrew from ${title}. Everyone needs one Council Week of recovery. The mission can be attempted again.`, chronicle: `The party withdrew during ${title} and returned to recover.` };
        }
        default: {
            const never = cmd;
            throw Error('Unsupported adventure command ' + String(never));
        }
    }
}
export function adventureInvariants(s) {
    const a = s.adventure;
    if (!a || !Array.isArray(a.heroes) || !Array.isArray(a.gear) || !Array.isArray(a.completed) || !Array.isArray(a.unclaimed) || !Number.isInteger(a.contractsThisWeek) || a.contractsThisWeek < 0 || a.contractsThisWeek > 2)
        throw Error('Invalid adventure record');
    if (a.gear.length > 40 || new Set(a.gear.map(g => g.id)).size !== a.gear.length || a.gear.some(g => !GEAR_BY_ID[g.template] || !Number.isInteger(g.rank) || g.rank < 0 || g.rank > 2))
        throw Error('Invalid gear inventory');
    if (new Set(a.unclaimed.map(x => x.id)).size !== a.unclaimed.length || a.unclaimed.some(r => !r.id || !MISSIONS_BY_ID[r.missionId] || r.gearTemplates.some(id => !GEAR_BY_ID[id]) || Object.entries(r.resources).some(([k, v]) => typeof v !== 'number' || !Number.isInteger(v) || v <= 0 || !(k in s.resources))))
        throw Error('Invalid secured reward record');
    if (new Set(a.heroes.map(h => h.id)).size !== a.heroes.length || new Set(a.completed).size !== a.completed.length || a.completed.some(id => !MISSIONS_BY_ID[id] || MISSIONS_BY_ID[id].repeat))
        throw Error('Invalid adventure registry');
    const used = new Set();
    for (const h of a.heroes) {
        if (!RECRUITS.some(r => r.id === h.id && r.classId === h.classId) || !Number.isInteger(h.level) || h.level < 1 || h.level > 20 || h.hp < 0 || h.hp > h.maxHp || h.maxHp !== heroMaxHp(h, a) || !Number.isInteger(h.injuryWeeks) || h.injuryWeeks < 0 || !Number.isInteger(h.skillPoints) || h.skillPoints < 0 || !Number.isInteger(h.attributePoints) || h.attributePoints < 0 || !Number.isInteger(h.xp))
            throw Error('Invalid hero state');
        for (const key of Object.keys(h.equipment)) {
            const item = h.equipment[key];
            if (!item || used.has(item))
                throw Error('Equipment is duplicated');
            used.add(item);
            const g = a.gear.find(g => g.id === item);
            if (!g || GEAR_BY_ID[g.template].slot !== key)
                throw Error('Hero equipment mismatch');
        }
        for (const sk of h.skills)
            if (!CLASS_SKILLS[sk] || CLASS_SKILLS[sk].classId !== h.classId)
                throw Error('Invalid hero skill');
    }
    if (a.active) {
        const m = MISSIONS_BY_ID[a.active.id];
        if (!m || !m.nodes.some(n => n.id === a.active.nodeId) || !a.active.party.length || a.active.party.length > 4 || new Set(a.active.party).size !== a.active.party.length || a.active.party.some(id => !a.heroes.some(h => h.id === id)))
            throw Error('Invalid active mission');
        if (a.active.battle) {
            const b = a.active.battle;
            if (new Set(b.heroes.map(x => x.heroId)).size !== b.heroes.length || new Set(b.heroes.map(x => x.position)).size !== b.heroes.length || b.heroes.some(x => !a.active.party.includes(x.heroId)) || new Set(b.enemies.map(x => x.id)).size !== b.enemies.length || new Set(b.enemies.map(x => x.position)).size !== b.enemies.length)
                throw Error('Invalid combat formation');
            if (!ENCOUNTERS[b.id] || b.round < 1 || b.heroes.length !== a.active.party.length || b.enemies.some(e => e.hp < 0 || e.hp > e.maxHp || e.guard < 0 || e.marked < 0 || e.weakened < 0 || e.phase < 1 || e.phase > 3) || !Array.isArray(b.log) || b.log.length > 6 || b.log.some(t => typeof t !== 'string' || t.length > 250) || b.heroes.some(x => x.ap < 0 || x.ap > 2 || x.focus < 0 || x.focus > 5 || x.guard < 0 || x.position < 0 || x.position > 5))
                throw Error('Invalid saved battle');
        }
    }
    return true;
}

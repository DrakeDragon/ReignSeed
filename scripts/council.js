// Exact names are stable save identifiers. Event consequences belong to the validated command engine.
export const FOUNDING_EVENTS = [
    { id: 'FH-004', title: 'The Lean Pantry', tag: 'A WARNING FROM BERA', minTurn: 3, story: false, intro: ['Bera finds a damp page in the food ledger. Several families have begun setting aside their own winter stores.', '“I would rather have a plan before the cupboards run thin,” she says.'], choices: [
            { id: 'reserve', label: 'Set aside an emergency reserve', detail: 'Spend 6 Food. +3 Public Trust; Bera approves.', cost: { food: 6 }, civic: { publicTrust: 3 }, adviser: ['bera', 3], flag: 'pantry.reserve' },
            { id: 'purchase', label: 'Buy provisions from a traveler', detail: 'Spend 9 Gold. Gain 10 Food.', cost: { gold: 9 }, gain: { food: 10 }, civic: { tradeStanding: 1 } },
            { id: 'survey', label: 'Publish the food ledger', detail: 'Gain 2 Knowledge; residents see the numbers.', gain: { knowledge: 2 }, civic: { publicTrust: 1 }, flag: 'pantry.published' }
        ] },
    { id: 'FH-006', title: 'Timber for the Crossing', tag: 'THE LENNE ROAD', minTurn: 4, story: false, intro: ['A section of the old crossing is becoming unsafe. Rook recommends temporary supports while the long-term repair is planned.', 'The carpenter offers to lead a small volunteer crew if the settlement supplies materials.'], choices: [
            { id: 'promise', label: 'Promise replacement timber', detail: 'Deliver 8 Timber within four council turns. Fulfillment grants Gold and Trust.', pledge: { title: 'Supply the Lenne repair crew', dueIn: 4, cost: { timber: 8 }, reward: { gold: 12 }, successTrust: 4, failureTrust: -5 }, adviser: ['tovin', 2] },
            { id: 'immediate', label: 'Supply the crew immediately', detail: 'Spend 8 Timber; increase Public Trust by 2.', cost: { timber: 8 }, civic: { publicTrust: 2 }, flag: 'lenne.temporary_supports' },
            { id: 'warn', label: 'Post a warning and seek another route', detail: 'No resource cost. Safety +1, but the work is postponed.', civic: { safetyBonus: 1 }, flag: 'lenne.warning' }
        ] },
    { id: 'FH-007', title: 'Lanterns on the Ridge', tag: 'NIGHT WATCH', minTurn: 5, story: false, intro: ['Mara points out that travelers cannot see the turn toward Fallowbank after sunset.', 'A handful of carefully placed lanterns might prevent accidents long before the Watchtower can be restored.'], choices: [
            { id: 'lanterns', label: 'Install lanterns along the road', detail: 'Pay 7 Gold and 3 Timber. Safety +2.', cost: { gold: 7, timber: 3 }, civic: { safetyBonus: 2 }, adviser: ['mara', 2] },
            { id: 'patrol', label: 'Organize volunteer evening patrols', detail: 'Spend 4 Food. Safety +1 and Public Trust +1.', cost: { food: 4 }, civic: { safetyBonus: 1, publicTrust: 1 } },
            { id: 'markers', label: 'Mark the road on Rook’s map', detail: 'Gain 2 Knowledge; no new permanent defenses.', gain: { knowledge: 2 }, adviser: ['rook', 2] }
        ] },
    { id: 'FH-009', title: 'Three Working Hands', tag: 'WORKFORCE QUESTION', minTurn: 6, story: false, intro: ['A construction crew asks whether the settlement ought to train apprentices or hire passing workers.', 'Bera warns that an apprentice still needs food and housing.'], choices: [
            { id: 'train', label: 'Fund practical apprenticeships', detail: 'Spend 8 Gold; gain 3 Knowledge.', cost: { gold: 8 }, gain: { knowledge: 3 }, civic: { publicTrust: 1 } },
            { id: 'tools', label: 'Share the best tools between crews', detail: 'Gain 2 Tools; Tovin favors the arrangement.', gain: { tools: 2 }, adviser: ['tovin', 2] },
            { id: 'record', label: 'Map shortages before acting', detail: 'Gain 2 Knowledge. No immediate labor expansion.', gain: { knowledge: 2 }, adviser: ['bera', 1] }
        ] },
    { id: 'FH-010', title: 'Roots at Orchard Hill', tag: 'THE ORCHARD QUESTION', minTurn: 7, story: false, intro: ['Sella returns from Orchard Hill with a sketch of unusually pale roots. Tovin identifies traces of a usable Iron deposit beneath the slope.', 'The site may eventually support a mine, but no one knows whether the deeper roots connect to ancient structures.'], choices: [
            { id: 'survey', label: 'Survey before any excavation', detail: 'Spend 6 Gold. Unlock a carefully surveyed Iron Mine site, and gain 2 Knowledge.', cost: { gold: 6 }, gain: { knowledge: 2 }, flag: 'orchard.surveyed', adviser: ['tovin', 2] },
            { id: 'preserve', label: 'Protect the orchard and its roots', detail: 'Land Health +5. Iron will need another source or a later review.', civic: { landHealth: 5 }, flag: 'orchard.preserved', adviser: ['sella', 4] },
            { id: 'extract', label: 'Authorize regulated extraction', detail: 'Unlock the Iron Mine site. Land Health −4; improve trade opportunities.', civic: { landHealth: -4, tradeStanding: 2 }, flag: 'orchard.mine_authorized', adviser: ['tovin', 2] }
        ] },
    { id: 'FH-011', title: 'The Broken Inscription', tag: 'THE FIRST CHARTER', minTurn: 2, requires: ['evidence'], story: true, intro: ['Iven lays the recovered inscription beside a newer history book. The dates do not agree.', '“The agreement was still being recorded long after the network was supposed to have fallen silent,” he says. “That deserves an honest investigation.”'], choices: [
            { id: 'publish', label: 'Share the contradiction publicly', detail: 'Public Trust +2. Gain 2 Knowledge for the public archive.', gain: { knowledge: 2 }, civic: { publicTrust: 2 }, adviser: ['iven', 2], flag: 'history.public_record' },
            { id: 'verify', label: 'Commission a careful comparison', detail: 'Spend 6 Gold; gain 4 Knowledge and Iven’s confidence.', cost: { gold: 6 }, gain: { knowledge: 4 }, adviser: ['iven', 4], flag: 'history.verified_record' },
            { id: 'protect', label: 'Secure the record before publishing', detail: 'Gain 2 Knowledge. Verification can continue later.', gain: { knowledge: 2 }, flag: 'history.secured_record' }
        ] },
    { id: 'FH-012', title: 'The Carpenter’s Promise', tag: 'A WORKSHOP REQUEST', minTurn: 8, story: false, intro: ['Tovin reports that the cottages are losing heat through gaps in the walls.', 'A craftsman offers to demonstrate a stronger joinery method if the kingdom supplies usable timber.'], choices: [
            { id: 'repair', label: 'Fund repairs across the settlement', detail: 'Spend 5 Timber and 5 Gold. Public Trust +3.', cost: { timber: 5, gold: 5 }, civic: { publicTrust: 3 }, adviser: ['tovin', 2] },
            { id: 'lesson', label: 'Study the joinery method', detail: 'Gain 3 Knowledge.', gain: { knowledge: 3 }, flag: 'craft.joinery_studied' },
            { id: 'volunteers', label: 'Help the families organize volunteers', detail: 'Spend 3 Food and improve Public Trust +1.', cost: { food: 3 }, civic: { publicTrust: 1 } }
        ] },
    { id: 'FH-013', title: 'Market at Dawn', tag: 'A NEW TRADE ROUTE', minTurn: 9, story: false, intro: ['Nella arrives with samples from a merchant who is willing to stop in the valley each week.', 'The merchant wants a safe, predictable arrangement rather than a single purchase.'], choices: [
            { id: 'welcome', label: 'Welcome independent market stalls', detail: 'Spend 8 Gold; Trade Standing +4.', cost: { gold: 8 }, civic: { tradeStanding: 4 }, adviser: ['nella', 3], flag: 'trade.stalls' },
            { id: 'inspect', label: 'Require public weights and records', detail: 'Gain 3 Knowledge; Public Trust +1.', gain: { knowledge: 3 }, civic: { publicTrust: 1 }, flag: 'trade.weights' },
            { id: 'delay', label: 'Keep the square for local use', detail: 'Public Trust +1. No new trade terms yet.', civic: { publicTrust: 1 }, adviser: ['bera', 1] }
        ] },
    { id: 'FH-014', title: 'A Surveyor’s Warning', tag: 'AN OLD BOUNDARY', minTurn: 10, story: false, intro: ['Rook finds boundary stones that are missing from modern maps.', 'No one agrees whether they once marked farmland, a protected grove, or a road easement.'], choices: [
            { id: 'map', label: 'Map every surviving marker', detail: 'Spend 4 Gold, gain 4 Knowledge.', cost: { gold: 4 }, gain: { knowledge: 4 }, adviser: ['rook', 3] },
            { id: 'consult', label: 'Ask neighboring families for testimony', detail: 'Public Trust +2; preserve local stories.', civic: { publicTrust: 2 }, flag: 'boundary.testimony' },
            { id: 'wait', label: 'Leave the markers undisturbed', detail: 'Land Health +1, and keep the site for a later survey.', civic: { landHealth: 1 } }
        ] },
    { id: 'FH-015', title: 'Tools for the Road', tag: 'ROAD CREW', minTurn: 11, story: false, intro: ['The crew repairing the approach road needs stronger tools.', 'Bera asks whether the equipment is worth purchasing before the stone trade expands.'], choices: [
            { id: 'purchase', label: 'Buy a shared Tool stock', detail: 'Pay 10 Gold. Gain 3 Tools.', cost: { gold: 10 }, gain: { tools: 3 }, adviser: ['tovin', 2] },
            { id: 'study', label: 'Research how to repair the old tools', detail: 'Gain 3 Knowledge.', gain: { knowledge: 3 }, flag: 'workshop.repair_notes' },
            { id: 'spare', label: 'Keep current equipment in service', detail: 'Spend 3 Timber on immediate repairs. Safety +1.', cost: { timber: 3 }, civic: { safetyBonus: 1 } }
        ] },
    { id: 'FH-016', title: 'The Herbal Remedy', tag: 'A COLD SEASON PREPARATION', minTurn: 12, story: false, intro: ['A child has fallen ill after several wet nights. Sella knows the local herbs but worries about the condition of the water.', 'She asks for supplies and time to investigate before making promises.'], choices: [
            { id: 'help', label: 'Support the herbal treatment', detail: 'Spend 3 Herbs or use the free water investigation instead. Public Trust +3.', cost: { herbs: 3 }, civic: { publicTrust: 3 }, adviser: ['sella', 3] },
            { id: 'clean', label: 'Inspect and clean the water supply', detail: 'Spend 4 Timber. Safety +2.', cost: { timber: 4 }, civic: { safetyBonus: 2 }, flag: 'well.inspected' },
            { id: 'teach', label: 'Ask Sella to teach safe plant handling', detail: 'Gain 3 Knowledge and preserve public health records.', gain: { knowledge: 3 }, adviser: ['sella', 2] }
        ] },
    { id: 'FH-017', title: 'The River Charter', tag: 'THE INHERITED AGREEMENT', minTurn: 10, requires: ['event:FH-011'], story: true, intro: ['A damaged charter reveals that the old waterway favored one community even after its needs had changed.', 'The neighboring village asks Fallowbank to help establish a fairer crossing and allocation.'], choices: [
            { id: 'shared', label: 'Promise a shared repair', detail: 'Deliver 8 Stone and 6 Timber within five council weeks; earn civic support.', pledge: { title: 'Repair the shared Lenne crossing', dueIn: 5, cost: { stone: 8, timber: 6 }, reward: { gold: 20, knowledge: 2 }, successTrust: 6, failureTrust: -6 }, adviser: ['bera', 2], flag: 'river.shared_plan' },
            { id: 'investigate', label: 'Commission a hydraulic investigation', detail: 'Spend 10 Gold. Gain 4 Knowledge and record the historic flaw.', cost: { gold: 10 }, gain: { knowledge: 4 }, adviser: ['iven', 2], flag: 'river.study' },
            { id: 'mediate', label: 'Call a local agreement council', detail: 'Public Trust +2; Trade Standing +1.', civic: { publicTrust: 2, tradeStanding: 1 }, flag: 'river.mediated' }
        ] },
    { id: 'FH-018', title: 'Dust from the Quarry', tag: 'A WORKER PETITION', minTurn: 13, story: false, intro: ['Stonecutters ask for a covered path beside the quarry route. Their request is modest, but construction crews are already busy.', 'Mara says accidents are more costly than a short delay.'], choices: [
            { id: 'path', label: 'Build safer approach markers', detail: 'Spend 5 Stone and 3 Timber. Safety +2.', cost: { stone: 5, timber: 3 }, civic: { safetyBonus: 2, publicTrust: 1 }, adviser: ['mara', 2] },
            { id: 'records', label: 'Collect measurements and improve planning', detail: 'Gain 3 Knowledge.', gain: { knowledge: 3 }, adviser: ['tovin', 1] },
            { id: 'hear', label: 'Listen to the quarry crews', detail: 'Public Trust +2.', civic: { publicTrust: 2 } }
        ] },
    { id: 'FH-019', title: 'Shared Work', tag: 'THE FOUNDERS’ LABOR', minTurn: 14, story: false, intro: ['Bera has noticed that some families volunteer every week while others struggle to cover their own chores.', 'She proposes a fairer way of organizing community work.'], choices: [
            { id: 'rota', label: 'Publish a voluntary work rota', detail: 'Public Trust +3.', civic: { publicTrust: 3 }, adviser: ['bera', 2], flag: 'civic.work_rota' },
            { id: 'tools', label: 'Supply the most overworked crews', detail: 'Spend 2 Tools. Safety +1 and Public Trust +2.', cost: { tools: 2 }, civic: { safetyBonus: 1, publicTrust: 2 } },
            { id: 'training', label: 'Study more efficient assignments', detail: 'Gain 3 Knowledge.', gain: { knowledge: 3 } }
        ] },
    { id: 'FH-020', title: 'The Merchant’s Margin', tag: 'AN ACCOUNTING QUESTION', minTurn: 15, story: false, intro: ['Nella presents a contract offering immediate Gold in exchange for first refusal on future supplies.', '“The words look friendly,” she says. “The consequences might not be.”'], choices: [
            { id: 'offer', label: 'Accept the limited supply contract', detail: 'Gain 16 Gold; Trade Standing +2.', gain: { gold: 16 }, civic: { tradeStanding: 2 }, flag: 'trade.supply_contract' },
            { id: 'rewrite', label: 'Request a balanced contract', detail: 'Spend 5 Gold on review; Public Trust +2.', cost: { gold: 5 }, civic: { publicTrust: 2 }, adviser: ['nella', 3], flag: 'trade.fair_contract' },
            { id: 'decline', label: 'Remain independent of the offer', detail: 'Gain 2 Knowledge by documenting the terms.', gain: { knowledge: 2 }, flag: 'trade.declined_exclusive' }
        ] },
    { id: 'FH-021', title: 'The Quarry Contractors', tag: 'AN EXTERNAL OFFER', minTurn: 16, story: false, intro: ['A crew from outside the valley offers to extract stone under a favorable short-term contract.', 'Their proposed agreement says little about repairs to the roads they would use.'], choices: [
            { id: 'contract', label: 'Accept temporary contracted extraction', detail: 'Gain 12 Stone; Trade Standing +2.', gain: { stone: 12 }, civic: { tradeStanding: 2 }, flag: 'quarry.external_contract' },
            { id: 'terms', label: 'Require road-maintenance terms', detail: 'Spend 5 Gold on inspections. Public Trust +2.', cost: { gold: 5 }, civic: { publicTrust: 2 }, adviser: ['nella', 2], flag: 'quarry.protected_terms' },
            { id: 'local', label: 'Prioritize local quarry labor', detail: 'Gain 3 Knowledge from local survey work.', gain: { knowledge: 3 }, flag: 'quarry.local_priority' }
        ] },
    { id: 'FH-022', title: 'A Grove Underfoot', tag: 'AN ANCIENT ROOT', minTurn: 17, story: false, intro: ['Sella shows the council a root that bends around a buried piece of old metal.', '“The grove survived something our roads did not,” she says.'], choices: [
            { id: 'restore', label: 'Protect the ground around the roots', detail: 'Spend 5 Timber on barriers. Land Health +4.', cost: { timber: 5 }, civic: { landHealth: 4 }, adviser: ['sella', 3], flag: 'grove.protected' },
            { id: 'study', label: 'Record the strange metalwork', detail: 'Gain 4 Knowledge.', gain: { knowledge: 4 }, adviser: ['iven', 2] },
            { id: 'leave', label: 'Leave the roots undisturbed', detail: 'Land Health +2; no immediate new research.', civic: { landHealth: 2 } }
        ] },
    { id: 'FH-023', title: 'Honest Weights', tag: 'THE MARKET SQUARE', minTurn: 18, story: false, intro: ['A family claims that two merchants weigh grain differently on the same scales.', 'Nella says the argument will only grow unless the kingdom establishes a method of checking the weights.'], choices: [
            { id: 'inspect', label: 'Establish public weights', detail: 'Spend 6 Gold and 1 Tool. Public Trust +3.', cost: { gold: 6, tools: 1 }, civic: { publicTrust: 3 }, adviser: ['nella', 2], flag: 'market.public_weights' },
            { id: 'arbitrate', label: 'Hear the merchants before deciding', detail: 'Public Trust +2, Trade Standing +1.', civic: { publicTrust: 2, tradeStanding: 1 } },
            { id: 'teach', label: 'Document proper market measures', detail: 'Gain 3 Knowledge.', gain: { knowledge: 3 } }
        ] },
    { id: 'FH-024', title: 'Two Carts, One Road', tag: 'TRAFFIC AT LENNE', minTurn: 19, story: false, intro: ['Two supply carts have reached a crossing too narrow for both. Each driver claims an urgent obligation.', 'Rook asks for a rule that future travelers can understand.'], choices: [
            { id: 'repair', label: 'Widen the approach', detail: 'Spend 6 Timber and 4 Stone. Safety +2.', cost: { timber: 6, stone: 4 }, civic: { safetyBonus: 2 }, adviser: ['tovin', 2] },
            { id: 'schedule', label: 'Establish a shared crossing schedule', detail: 'Public Trust +2; Trade Standing +2.', civic: { publicTrust: 2, tradeStanding: 2 }, flag: 'road.shared_schedule' },
            { id: 'survey', label: 'Survey a second path', detail: 'Gain 3 Knowledge.', gain: { knowledge: 3 }, adviser: ['rook', 2] }
        ] },
    { id: 'FH-025', title: 'The Bridge’s Future', tag: 'AN OLD ROAD RENEWED', minTurn: 20, story: false, intro: ['The council reviews the Lenne crossing. Some repairs are complete; other work still needs a responsible long-term plan.', 'The villagers ask how the road will be maintained in the coming years.'], choices: [
            { id: 'charter', label: 'Establish a public-maintenance charter', detail: 'Public Trust +3; records permanent responsibility.', civic: { publicTrust: 3 }, flag: 'bridge.public_charter' },
            { id: 'commercial', label: 'Ask merchants to share upkeep', detail: 'Trade Standing +3.', civic: { tradeStanding: 3 }, adviser: ['nella', 2] },
            { id: 'survey', label: 'Study stronger bridge construction', detail: 'Gain 4 Knowledge.', gain: { knowledge: 4 }, adviser: ['tovin', 2] }
        ] },
    { id: 'FH-026', title: 'An Evening Assembly', tag: 'THE GROWING TOWN', minTurn: 21, story: false, intro: ['The Common Hall is crowded with people who were strangers only a few seasons ago.', 'Bera suggests holding open meetings before the first formal charter is written.'], choices: [
            { id: 'open', label: 'Invite every household to speak', detail: 'Public Trust +4.', civic: { publicTrust: 4 }, flag: 'civic.open_assembly', adviser: ['bera', 3] },
            { id: 'delegates', label: 'Choose delegates from working groups', detail: 'Public Trust +2 and Trade Standing +1.', civic: { publicTrust: 2, tradeStanding: 1 }, flag: 'civic.delegates' },
            { id: 'record', label: 'Record the proposals for a later vote', detail: 'Gain 4 Knowledge.', gain: { knowledge: 4 }, adviser: ['iven', 2] }
        ] },
    { id: 'FH-027', title: 'Letters from Eastbridge', tag: 'A NEIGHBORING COMMUNITY', minTurn: 22, story: false, intro: ['Eastbridge sends word that a recent harvest was poor. The town is not asking for endless charity—only help while the next crop takes root.', 'Bera asks the council to consider both the need and Fallowbank’s own pantry.'], choices: [
            { id: 'pledge', label: 'Promise a food delivery', detail: 'Deliver 10 Food within three council turns; earn Gold and Public Trust.', pledge: { title: 'Provision Eastbridge families', dueIn: 3, cost: { food: 10 }, reward: { gold: 14 }, successTrust: 5, failureTrust: -5 }, adviser: ['bera', 2] },
            { id: 'send', label: 'Send provisions today', detail: 'Spend 10 Food; increase Public Trust by 4.', cost: { food: 10 }, civic: { publicTrust: 4 }, flag: 'eastbridge.relief' },
            { id: 'teach', label: 'Share crop methods and seed records', detail: 'Gain 4 Knowledge; strengthen Trade Standing +1.', gain: { knowledge: 4 }, civic: { tradeStanding: 1 }, adviser: ['sella', 2] }
        ] },
    { id: 'FH-028', title: 'The First Banner', tag: 'THE FOUNDING CEREMONY', minTurn: 24, requires: ['event:FH-017', 'evidence'], story: true, intro: ['At sunset the settlers gather before the old watchtower. A banner is ready, but Bera refuses to raise it without discussing what the new government should promise.', '“The banner is only cloth,” she says. “What matters is what we agree to do beneath it.”'], choices: [
            { id: 'voices', label: 'Promise a government that listens', detail: 'Public Trust +4. Begin the final charter discussions.', civic: { publicTrust: 4 }, flag: 'banner.voices', adviser: ['bera', 3] },
            { id: 'safety', label: 'Promise to protect the roads and people', detail: 'Safety +3. Begin the final charter discussions.', civic: { safetyBonus: 3 }, flag: 'banner.protection', adviser: ['mara', 3] },
            { id: 'stewardship', label: 'Promise responsible care for the valley', detail: 'Land Health +4. Begin the final charter discussions.', civic: { landHealth: 4 }, flag: 'banner.stewardship', adviser: ['sella', 3] }
        ] },
    { id: 'FH-029', title: 'Seats at the Table', tag: 'A NEW COUNCIL', minTurn: 25, requires: ['event:FH-028'], story: false, intro: ['There are more people than seats in the Common Hall. Some ask for a clear way to choose who speaks in public meetings.', 'Nella wonders how merchants and artisans will be heard alongside the founding families.'], choices: [
            { id: 'open', label: 'Keep meetings open to all residents', detail: 'Public Trust +3.', civic: { publicTrust: 3 }, flag: 'governance.open' },
            { id: 'rotate', label: 'Rotate seats between working groups', detail: 'Public Trust +2; Trade Standing +1.', civic: { publicTrust: 2, tradeStanding: 1 }, flag: 'governance.rotation' },
            { id: 'record', label: 'Develop formal meeting procedures', detail: 'Gain 5 Knowledge.', gain: { knowledge: 5 }, adviser: ['iven', 2] }
        ] },
    { id: 'FH-030', title: 'A Need for Records', tag: 'THE FIRST ARCHIVE', minTurn: 26, story: false, intro: ['Iven has begun storing important agreements in a dry room beside the Common Hall.', '“If a promise can change the future,” he says, “it ought to be possible to read what was actually promised.”'], choices: [
            { id: 'archive', label: 'Fund public copies of agreements', detail: 'Pay 8 Gold and 2 Planks; Public Trust +3.', cost: { gold: 8, planks: 2 }, civic: { publicTrust: 3 }, flag: 'archive.public_copies', adviser: ['iven', 3] },
            { id: 'records', label: 'Write a standard record format', detail: 'Gain 5 Knowledge.', gain: { knowledge: 5 }, flag: 'archive.standard_records' },
            { id: 'witness', label: 'Invite community witnesses', detail: 'Public Trust +2; no specialist materials needed.', civic: { publicTrust: 2 } }
        ] },
    { id: 'FH-031', title: 'The Field at Winter’s Edge', tag: 'SEASONAL PREPARATION', minTurn: 27, story: false, intro: ['A farmer asks whether the kingdom should hold more of the harvest in reserve.', 'The first seasons have taught Fallowbank that a productive week is not the same thing as a secure year.'], choices: [
            { id: 'store', label: 'Set aside winter supplies', detail: 'Spend 8 Food. Public Trust +3.', cost: { food: 8 }, civic: { publicTrust: 3 }, flag: 'winter.reserve' },
            { id: 'study', label: 'Study better seed and soil methods', detail: 'Gain 5 Knowledge.', gain: { knowledge: 5 }, adviser: ['sella', 2] },
            { id: 'trade', label: 'Arrange a backup supply agreement', detail: 'Spend 6 Gold. Trade Standing +3.', cost: { gold: 6 }, civic: { tradeStanding: 3 }, adviser: ['nella', 2] }
        ] },
    { id: 'FH-032', title: 'A Founder’s Oath', tag: 'THE OLD PROMISES', minTurn: 28, requires: ['event:FH-028'], story: false, intro: ['Mara asks the council to decide how important future promises will be documented and enforced.', 'An old agreement failed because people had no reliable way to change it. The founders do not want to repeat that mistake.'], choices: [
            { id: 'public', label: 'Require a public record for major oaths', detail: 'Public Trust +3; Iven approves.', civic: { publicTrust: 3 }, flag: 'oath.public_records', adviser: ['iven', 3] },
            { id: 'review', label: 'Require regular review of obligations', detail: 'Gain 4 Knowledge; establish review notes.', gain: { knowledge: 4 }, flag: 'oath.review' },
            { id: 'care', label: 'Make restitution part of the charter', detail: 'Public Trust +2; Sella appreciates the provision.', civic: { publicTrust: 2 }, flag: 'oath.restitution', adviser: ['sella', 2] }
        ] },
    { id: 'FH-033', title: 'A New Settlement Charter', tag: 'THE ROAD AHEAD', minTurn: 29, requires: ['event:FH-028'], story: false, intro: ['Eastbridge asks what formal recognition from Fallowbank would mean.', 'Rook lays a map on the council table. The two communities share roads and water, but each has its own people and needs.'], choices: [
            { id: 'autonomy', label: 'Respect independent local government', detail: 'Trade Standing +3 and Public Trust +1.', civic: { tradeStanding: 3, publicTrust: 1 }, flag: 'charter.independent' },
            { id: 'shared', label: 'Propose shared public services', detail: 'Spend 10 Gold. Public Trust +3.', cost: { gold: 10 }, civic: { publicTrust: 3 }, flag: 'charter.shared_services' },
            { id: 'survey', label: 'Survey opportunities for another settlement', detail: 'Gain 5 Knowledge.', gain: { knowledge: 5 }, flag: 'charter.survey' }
        ] },
    { id: 'FH-034', title: 'Before the Seal', tag: 'FINAL FOUNDING REVIEW', minTurn: 30, requires: ['event:FH-028'], story: false, intro: ['Bera presents the final founding ledger. There are more hands, more homes, and more promises than when the twelve settlers first arrived.', '“We should look at what we can sustain,” she says, “before asking our neighbors to recognize it.”'], choices: [
            { id: 'audit', label: 'Conduct a public economic review', detail: 'Gain 5 Knowledge; Public Trust +2.', gain: { knowledge: 5 }, civic: { publicTrust: 2 }, adviser: ['bera', 3] },
            { id: 'safety', label: 'Inspect roads and safety measures', detail: 'Spend 5 Timber; Safety +3.', cost: { timber: 5 }, civic: { safetyBonus: 3 }, adviser: ['mara', 2] },
            { id: 'supply', label: 'Build a modest emergency stock', detail: 'Spend 10 Food; Public Trust +3.', cost: { food: 10 }, civic: { publicTrust: 3 } }
        ] },
    { id: 'FH-035', title: 'The Hearthmere Charter', tag: 'ACT I · FOUNDING MILESTONE', minTurn: 30, requires: ['event:FH-028', 'event:FH-034', 'evidence'], story: true, intro: ['The council has inspected the new fields, roads, workshops, and public agreements. The townspeople gather to decide whether Fallowbank is ready for formal regional recognition.', 'The old watchtower stands above a settlement that has grown through its own choices. A new charter can finally be signed.'], choices: [
            { id: 'assembly', label: 'Ratify a charter of common voices', detail: 'Public Trust +5. Record the founding as a cooperative government.', civic: { publicTrust: 5 }, flag: 'act1.charter_assembly', adviser: ['bera', 4] },
            { id: 'protection', label: 'Ratify a charter of protected roads', detail: 'Safety +4. Record a government committed to regional security.', civic: { safetyBonus: 4 }, flag: 'act1.charter_protection', adviser: ['mara', 4] },
            { id: 'stewardship', label: 'Ratify a charter of responsible stewardship', detail: 'Land Health +5. Record an ecological founding principle.', civic: { landHealth: 5 }, flag: 'act1.charter_stewardship', adviser: ['sella', 4] }
        ] }
];
export const COUNCIL_BY_ID = Object.fromEntries(FOUNDING_EVENTS.map(e => [e.id, e]));
export const ADVISERS = [['bera', 'Bera Tallow', 'Steward'], ['tovin', 'Tovin Brask', 'Engineer'], ['mara', 'Mara Kest', 'Captain'], ['iven', 'Iven Sorel', 'Historian'], ['nella', 'Nella Quill', 'Trade'], ['rook', 'Rook Fenner', 'Scout'], ['sella', 'Sella Fen', 'Grove']];

export const CIVILIZATIONS = [
    { id: 'hearthbound', name: 'Hearthbound Accord', theme: 'Secure homes before expansion', promise: 'Fund family granaries and the public right to shelter. Food support depends on staffed farms.', cost: { gold: 60, food: 12, planks: 8 }, faction: 'tideglass', resource: 'food', bonus: 4, upkeep: 2, requiresBuilding: 'farm' },
    { id: 'iron_crown', name: 'Iron Crown', theme: 'Preparedness under civilian limits', promise: 'Maintain a transparent defense industry with independent oversight. Iron support requires staffed smelters.', cost: { gold: 65, iron: 8, tools: 5 }, faction: 'regency', resource: 'iron', bonus: 2, upkeep: 3, requiresBuilding: 'smelter' },
    { id: 'golden_compact', name: 'Golden Compact', theme: 'Trade held to public promises', promise: 'Reinvest fair-market revenues and preserve independent charters. Commerce requires staffed markets.', cost: { gold: 68, planks: 9, glass: 4 }, faction: 'copperwash', resource: 'gold', bonus: 4, upkeep: 2, requiresBuilding: 'market' },
    { id: 'verdant_covenant', name: 'Verdant Covenant', theme: 'Repair the land before claiming it', promise: 'Fund stewardship without treating Witnessgroves as servants. Restoration requires a staffed grove nursery.', cost: { gold: 58, herbs: 12, living_timber: 6 }, faction: 'brackenveil', resource: 'living_timber', bonus: 2, upkeep: 3, requiresBuilding: 'grove_nursery' },
    { id: 'starveil_ascendancy', name: 'Starveil Ascendancy', theme: 'Knowledge with public accountability', promise: 'Make evidence accessible in independent archives. Scholarship needs a staffed public archive.', cost: { gold: 66, knowledge: 12, glass: 6 }, faction: 'starveil', resource: 'knowledge', bonus: 4, upkeep: 3, requiresBuilding: 'archive' },
    { id: 'crownless_dawn', name: 'Crownless Dawn', theme: 'Local councils and shared authority', promise: 'Let each community govern its own commitments. Shared civic education begins at the Common Hall.', cost: { gold: 61, food: 10, knowledge: 9 }, faction: 'tideglass', resource: 'knowledge', bonus: 2, upkeep: 2, requiresBuilding: 'common_hall' }
];
const c = (id, label, detail, cost, faction, trust) => ({ id, label, detail, cost, faction, trust });
const chapter = (id, name, eyebrow, paragraphs, requires, choices) => ({ id, name, eyebrow, paragraphs, requires, choices });
export const ACT5_CHAPTERS = [
    chapter('ST5-01', 'The Kingdoms Choose', 'AFTER THE PUBLIC VERDICT', [
        'The proven failure of the Crownwheel is now public. None of Tavercale’s six factions agrees that the discovery gives Fallowbank the right to rule the others.',
        'Bera spreads six proposals across the table. “A vision is cheap until we agree who pays for it, who may refuse it, and who gets to challenge us.”'
    ], undefined, [
        c('listen', 'Hear the independent villages first', 'Fund travel and public hearings before proposing a continental course.', { gold: 42, food: 10, knowledge: 6 }, 'tideglass', 6),
        c('survey', 'Commission a common-needs survey', 'Record supply shortages, unsafe roads and settlement rights before setting policy.', { gold: 45, planks: 9, glass: 3 }, 'starveil', 6),
        c('stewards', 'Invite the six faction stewards', 'Pay for a safe, open forum with no demand for unanimous loyalty.', { gold: 48, food: 9, tools: 4 }, 'copperwash', 5)
    ]),
    chapter('ST5-02', 'Six Roads, No Single Crown', 'THE CIVILIZATION MANDATE', [
        'The Council rejects the idea that the old catastrophe entitles anyone to rebuild the ancient command network as it was.',
        'Six distinct visions are proposed instead: Hearthbound, Iron Crown, Golden Compact, Verdant Covenant, Starveil Ascendancy and Crownless Dawn. Choose a funded public mandate in World → Regions before the next chapter.'
    ], undefined, [
        c('limits', 'Publish limits on any new mandate', 'Write down what the new government may not compel from neighbors.', { gold: 44, knowledge: 9, planks: 5 }, 'tideglass', 7),
        c('budgets', 'Require a public annual budget', 'Every mandate must show costs and how its ongoing programs will be funded.', { gold: 47, glass: 5, knowledge: 7 }, 'copperwash', 6),
        c('appeals', 'Establish a right of civic appeal', 'Give communities a lawful way to challenge the decision before it becomes policy.', { gold: 46, food: 8, knowledge: 7 }, 'starveil', 6)
    ]),
    chapter('ST5-03', 'The Cost of a Vision', 'PROMISES MADE REAL', [
        'The newly chosen civilization mandate changes the way Fallowbank spends and produces. Its weekly benefit requires the relevant working buildings and an actual treasury.',
        'Iven asks for a record of households that might bear the cost. A good plan should survive a hungry winter, not just a crowded hall.'
    ], 'path', [
        c('reserve', 'Fund a public emergency reserve', 'Keep an emergency supply separate from the mandate’s first promises.', { gold: 53, food: 12, stone: 6 }, 'tideglass', 7),
        c('audit', 'Publish a cost-and-benefit register', 'Let affected communities compare the policy’s actual weekly expenses.', { gold: 51, knowledge: 10, glass: 5 }, 'starveil', 7),
        c('workers', 'Protect paid labor agreements', 'Make sure new industry does not simply seize workers from local farms.', { gold: 55, planks: 8, tools: 5 }, 'kilnspire', 7)
    ]),
    chapter('ST5-04', 'The Roads Between Us', 'A TEST OF GOOD FAITH', [
        'The party returns from the Accord Road with the names of settlements that intend to stay independent. Their signatures authorize cooperation, not annexation.',
        'Nella reports that a single faction is ready to enter a binding, paid diplomatic compact. Choose the partner carefully: this is an enduring relationship, not a conquest reward.'
    ], 'H33', [
        c('records', 'Protect every independent signature', 'Fund public copies of all the consent and refusal records.', { gold: 54, glass: 5, knowledge: 9 }, 'starveil', 7),
        c('supplies', 'Pay the road keepers and families', 'Provide food and materials where caravans have damaged local roads.', { gold: 56, food: 13, planks: 8 }, 'copperwash', 8),
        c('bridges', 'Repair the crossing under shared supervision', 'Invest in safe bridges without claiming the surrounding land.', { gold: 56, stone: 12, tools: 6 }, 'brackenveil', 7)
    ]),
    chapter('ST5-05', 'A Compact Is Not a Crown', 'ONE ALLY, SIX VOICES', [
        'The diplomatic partner has signed its own terms. The other factions remain free to disagree, and even the new compact can be challenged through its published clauses.',
        'The Council must decide how to protect neutral travelers and communities outside the agreement.'
    ], 'pact', [
        c('neutral', 'Fund protection for neutral roads', 'Keep commerce and emergency access open even to communities that refused the compact.', { gold: 62, food: 12, planks: 9 }, 'tideglass', 9),
        c('inspect', 'Create a joint civilian inspection panel', 'Review complaints about supply requisitions and border watches.', { gold: 60, knowledge: 11, glass: 5 }, 'starveil', 8),
        c('defend', 'Provide limited escorted relief convoys', 'Supply volunteer guards with recorded rules on force and civilian property.', { gold: 66, tools: 7, food: 10 }, 'regency', 8)
    ]),
    chapter('ST5-06', 'The Broken Causeway', 'RECONSTRUCTION WITHOUT RULE', [
        'At the disputed causeway, a dormant barrier has blocked a relief route. The party retrieves an old repair diagram, but its authority is only technical.',
        'The kingdom must choose who funds and maintains the repairs. A working crossing is not a declaration of sovereignty.'
    ], 'H34', [
        c('public', 'Fund an open public maintenance board', 'Allow local towns to appoint and dismiss their own repair delegates.', { gold: 64, planks: 12, knowledge: 11 }, 'tideglass', 8),
        c('industry', 'Pay regional engineers for safe rebuilding', 'Require independent safety inspection of the restored bridge.', { gold: 69, iron: 8, mechanisms: 5 }, 'kilnspire', 10),
        c('living', 'Restore surrounding wetlands first', 'Avoid repeating old damage to floodplains and grove-water agreements.', { gold: 61, living_timber: 8, herbs: 12 }, 'brackenveil', 10)
    ]),
    chapter('ST5-07', 'Foundations of Tomorrow', 'THE FIRST FUNDED WORK', [
        'The first reconstruction tier has been paid for. The project creates shared infrastructure, but each participant still controls its own land and public records.',
        'Rook discovers a second relay at the Concord Steps. Its surviving contracts could let Tavercale coordinate without surrendering sovereignty to one capital.'
    ], 'rebuild', [
        c('open', 'Invite neutral observers to the next survey', 'Provide transparent route information and room for outside challenge.', { gold: 68, knowledge: 14, glass: 6 }, 'starveil', 9),
        c('provisions', 'Provision the independent survey teams', 'Pay cooks, medics and local escorts rather than conscripting them.', { gold: 65, food: 16, medicine: 5 }, 'tideglass', 9),
        c('escort', 'Assign a strictly limited survey escort', 'Fund a protective team with no authority to seize the old network.', { gold: 69, iron: 9, tools: 7 }, 'regency', 8)
    ]),
    chapter('ST5-08', 'The First Living Charter', 'THE ROAD TO THE FINAL CHOICE', [
        'The Concord Steps record offers a legal framework for separate communities to maintain a shared warning service under revocable agreements.',
        'Its machinery is not sentient, and its surviving contracts cannot decide the future for living people. The new charter must be deliberately chosen, funded, and open to refusal.'
    ], 'H35', [
        c('rights', 'Draft the Charter of Independent Communities', 'Protect self-rule and voluntary cooperation, including a right to withdraw.', { gold: 78, knowledge: 16, planks: 12 }, 'tideglass', 10),
        c('safety', 'Draft the Charter of Limited Safeguards', 'Specify disconnected testing, civilian oversight and a ban on secret overrides.', { gold: 80, mechanisms: 9, glass: 8 }, 'kilnspire', 10),
        c('mutual', 'Draft the Charter of Mutual Provision', 'Require clear food reserves, audited trade and mutual relief obligations.', { gold: 78, food: 17, tools: 9 }, 'copperwash', 10)
    ])
];
export const ACT5_SPECIALIZATIONS = [
    { id: 'hearth_granaries', path: 'hearthbound', name: 'Winter Granaries', description: 'Reserve surplus harvests for public distribution under audited household registers.', cost: { gold: 70, planks: 10, food: 15 }, requiresBuilding: 'farm', resource: 'food', bonus: 6, upkeep: 3 },
    { id: 'hearth_clinics', path: 'hearthbound', name: 'Neighborhood Clinics', description: 'Fund staffed medical workshops with voluntary access to treatment.', cost: { gold: 72, medicine: 9, glass: 5 }, requiresBuilding: 'apothecary', resource: 'medicine', bonus: 2, upkeep: 4 },
    { id: 'iron_armories', path: 'iron_crown', name: 'Audited Armories', description: 'Publish every weapons requisition and strengthen independent military inspection.', cost: { gold: 75, iron: 11, tools: 8 }, requiresBuilding: 'workshop', resource: 'tools', bonus: 3, upkeep: 4 },
    { id: 'iron_reserves', path: 'iron_crown', name: 'Watchline Reserves', description: 'Maintain emergency foundry stock under civilian limits, not secret mobilization.', cost: { gold: 76, iron: 12, mechanisms: 6 }, requiresBuilding: 'smelter', resource: 'iron', bonus: 3, upkeep: 4 },
    { id: 'golden_markets', path: 'golden_compact', name: 'Fair Market Exchange', description: 'Expand publicly audited market stalls and pay fair transit charges.', cost: { gold: 80, glass: 7, planks: 12 }, requiresBuilding: 'market', resource: 'gold', bonus: 8, upkeep: 3 },
    { id: 'golden_shipwrights', path: 'golden_compact', name: 'Caravan Carpenter Guild', description: 'Pay road carpenters to maintain wagons without requisitioning local timber.', cost: { gold: 75, planks: 15, tools: 8 }, requiresBuilding: 'sawmill', resource: 'planks', bonus: 3, upkeep: 4 },
    { id: 'verdant_seedbanks', path: 'verdant_covenant', name: 'Community Seed Banks', description: 'Distribute local seeds and medicinal plants while protecting grove consent.', cost: { gold: 70, herbs: 15, living_timber: 7 }, requiresBuilding: 'herbal_garden', resource: 'herbs', bonus: 4, upkeep: 3 },
    { id: 'verdant_watershed', path: 'verdant_covenant', name: 'Watershed Renewal', description: 'Replant managed woodland outside Witnessgrove boundaries.', cost: { gold: 78, living_timber: 12, tools: 5 }, requiresBuilding: 'grove_nursery', resource: 'living_timber', bonus: 3, upkeep: 4 },
    { id: 'starveil_schools', path: 'starveil_ascendancy', name: 'Open Scholarships', description: 'Fund public learning and independent scrutiny of archival claims.', cost: { gold: 74, knowledge: 16, glass: 6 }, requiresBuilding: 'archive', resource: 'knowledge', bonus: 6, upkeep: 3 },
    { id: 'starveil_optics', path: 'starveil_ascendancy', name: 'Public Optics Laboratory', description: 'Produce transparent inspection lenses for disconnected safety tests.', cost: { gold: 79, glass: 12, mechanisms: 5 }, requiresBuilding: 'glassworks', resource: 'glass', bonus: 3, upkeep: 4 },
    { id: 'crownless_pantries', path: 'crownless_dawn', name: 'Neighborhood Pantries', description: 'Enable local foragers to support independently organized food stores.', cost: { gold: 69, food: 15, planks: 8 }, requiresBuilding: 'forager', resource: 'food', bonus: 5, upkeep: 3 },
    { id: 'crownless_scribes', path: 'crownless_dawn', name: 'Council Scribes', description: 'Equip independent local councils to retain their own records and objections.', cost: { gold: 74, knowledge: 14, glass: 6 }, requiresBuilding: 'civic_registry', resource: 'knowledge', bonus: 4, upkeep: 3 }
];
export const ACT5_DISPUTE_APPROACHES = {
    hearing: { name: 'Independent Hearing', description: 'Pay for impartial witnesses and publish objections without forcing a verdict.', cost: { gold: 64, knowledge: 10, glass: 5 }, trust: 9, grievance: 1 },
    restitution: { name: 'Documented Restitution', description: 'Compensate proven damage while preserving the right to dispute a claim.', cost: { gold: 86, food: 13, planks: 10 }, trust: 13, grievance: 2 },
    mediation: { name: 'Local Mediation', description: 'Fund volunteer mediators, access agreements, and neutral travel.', cost: { gold: 71, tools: 8, knowledge: 8 }, trust: 10, grievance: 1 }
};
// The middle arc changes diplomacy and construction; it does NOT trigger an ending.
ACT5_CHAPTERS.push(chapter('ST5-09', 'One Kingdom, Many Needs', 'THE PROMISE TESTED', [
    'The first living charter is signed, but households in the outer regions ask what Fallowbank will actually build for them.',
    'Bera opens two concrete proposals for each civilization mandate. Their crews, materials and weekly expenses must be funded in the same ledger as the rest of the kingdom.'
], undefined, [
    c('publish', 'Publish a separate civilian budget', 'Prevent reconstruction supplies from being quietly diverted to an unaccountable program.', { gold: 58, knowledge: 11, glass: 6 }, 'starveil', 7),
    c('workers', 'Protect skilled workers and wages', 'Guarantee that a new public program cannot simply seize regional labor.', { gold: 62, food: 13, tools: 6 }, 'kilnspire', 7),
    c('rights', 'Invite independent town delegates', 'Let neighbors challenge both of the proposed investments before adoption.', { gold: 60, planks: 11, knowledge: 10 }, 'tideglass', 7)
]), chapter('ST5-10', 'The Second Foundation', 'A FUNDED SPECIALIZATION', [
    'The new specialist program begins with a public work order. It can only produce when its supporting building is staffed and the treasury pays the weekly cost.',
    'Two districts offer rival plans. The Council must defend its choice without claiming that every neighboring settlement should make the same one.'
], 'specialization', [
    c('audit', 'Inspect the first production reports', 'Record actual materials produced, refused costs and the labor supporting the new program.', { gold: 65, knowledge: 12, glass: 5 }, 'starveil', 8),
    c('relief', 'Reserve the first benefits for vulnerable households', 'Pay for distribution records and public collection points.', { gold: 64, food: 16, planks: 9 }, 'tideglass', 8),
    c('survey', 'Invite a neighboring technical review', 'Ask qualified critics to examine the program before extending its reach.', { gold: 66, mechanisms: 6, knowledge: 10 }, 'kilnspire', 8)
]), chapter('ST5-11', 'The Grainline Objection', 'THE ROAD DOES NOT BELONG TO US', [
    'An expedition on the Grainline finds a string of independent emergency food agreements. Several factions file separate objections about what the kingdom’s new mandate could cost their independent communities.',
    'Each objecting faction offers different claims. Resolve one contested claim openly in Regions; the others retain their arguments, grievances and rights.'
], 'H36', [
    c('public', 'Open the full Grainline petition', 'Publish the claimants’ original words, including refusals of the proposed charter.', { gold: 67, glass: 7, knowledge: 13 }, 'tideglass', 8),
    c('rations', 'Pay for immediate road provisions', 'Deliver emergency food under independent distribution records.', { gold: 72, food: 18, planks: 8 }, 'copperwash', 8),
    c('survey', 'Commission neutral testimony', 'Pay travel and safety costs for outside witnesses.', { gold: 69, tools: 9, knowledge: 11 }, 'starveil', 8)
]), chapter('ST5-12', 'The Price of Consent', 'ONE RIVAL CLAIM IS ANSWERED', [
    'The public dispute has a recorded resolution. A hearing, restitution, or local mediation changed the costs of cooperation but did not automatically turn a rival into an ally.',
    'Mara asks the Council to protect relief convoys; Nella asks that the same rules protect caravans crossing the lands of dissenters.'
], 'dispute', [
    c('neutral', 'Protect neutral relief roads', 'Pay volunteer escorts without creating compulsory border posts.', { gold: 74, food: 14, tools: 8 }, 'tideglass', 8),
    c('inspect', 'Publish safeguards on escorted cargo', 'Require neutral accounting and limits on security searches.', { gold: 76, glass: 7, knowledge: 14 }, 'starveil', 8),
    c('repair', 'Pay dissenting villages for road damage', 'Repair shared routes under local custodianship.', { gold: 76, stone: 14, planks: 11 }, 'brackenveil', 8)
]), chapter('ST5-13', 'The Treaty Weighhouse', 'WHAT COMMERCE REMEMBERS', [
    'The old Weighhouse contains incompatible tariffs from rulers who each claimed their order was the only one the market needed.',
    'Nella produces a transparent ledger that distinguishes lawful tolls, emergency exemptions, and seizures that were never authorized.'
], 'H37', [
    c('open', 'Publish the disputed trade ledger', 'Allow affected towns to correct records and contest tariffs.', { gold: 77, knowledge: 15, glass: 8 }, 'copperwash', 9),
    c('rebate', 'Fund a neutral cargo rebate', 'Return proven unlawful fees without taking the port into Fallowbank.', { gold: 83, food: 12, planks: 10 }, 'tideglass', 9),
    c('maintain', 'Repair independent weigh stations', 'Provide real components and inspection training.', { gold: 80, mechanisms: 7, tools: 9 }, 'kilnspire', 9)
]), chapter('ST5-14', 'A Crossing Held in Trust', 'SECOND RECONSTRUCTION MILESTONE', [
    'The second reconstruction stage is finally funded. The crossing carries food and warnings through voluntary agreements and disconnected safety mechanisms.',
    'The Council has learned that a durable promise needs a repair budget, an appeal procedure, and the right for a community to leave.'
], 'rebuild2', [
    c('account', 'Publish the full construction accounts', 'Protect the paper trail from bids to maintenance crews.', { gold: 79, knowledge: 16, glass: 8 }, 'starveil', 9),
    c('stewards', 'Pay independent road stewards', 'Fund continuing inspections rather than reserving exclusive Crown guards.', { gold: 82, planks: 13, tools: 10 }, 'tideglass', 9),
    c('wild', 'Restore the banks beside the causeway', 'Limit future erosion and defend local restoration rights.', { gold: 81, living_timber: 9, herbs: 14 }, 'brackenveil', 9)
]), chapter('ST5-15', 'The Unbound Beacon', 'A WARNING WITHOUT A THRONE', [
    'The final relay expedition recovers a model that lets independent communities share warnings while retaining their own disconnected controls.',
    'The test establishes that coordination can be voluntary. It does not give Fallowbank permission to secretly activate the old Crownwheel.'
], 'H38', [
    c('manual', 'Publish a manual warning protocol', 'Provide accessible procedures that work without restoring imperial commands.', { gold: 85, knowledge: 16, glass: 9 }, 'starveil', 10),
    c('service', 'Fund volunteer emergency messengers', 'Pay independent towns for cross-border medical and food alerts.', { gold: 87, food: 18, medicine: 8 }, 'tideglass', 10),
    c('isolate', 'Commission isolated warning equipment', 'Build a safety-only network with public testing and no hidden override.', { gold: 90, mechanisms: 10, tools: 9 }, 'kilnspire', 10)
]), chapter('ST5-16', 'The Assembly of Living Charters', 'NO ENDING YET', [
    'Fallowbank arrives with a publicly funded civilization mandate, a specialist program, a voluntary faction compact, a documented rival claim and two paid reconstruction stages.',
    'The delegates disagree about what should come next. Their choices will shape the ending of the campaign, but neither the old machinery nor this Council may select that future for them.'
], undefined, [
    c('citizens', 'Convene an independent citizens’ assembly', 'Let each community keep its own delegates, exit terms and written objections.', { gold: 95, knowledge: 18, planks: 13 }, 'tideglass', 11),
    c('auditors', 'Appoint a mixed technical and civic review', 'Pair disconnected engineering tests with public challenges and open minutes.', { gold: 95, glass: 11, mechanisms: 8 }, 'starveil', 11),
    c('relief', 'Sign a revocable mutual-aid pledge', 'Fund common relief stores with no claim on participating settlements.', { gold: 95, food: 20, medicine: 9 }, 'copperwash', 11)
]), chapter('ST5-17', 'Six Debts, One Winter', 'THE PUBLIC ACCOUNTS', [
    'The Assembly cannot erase promises that outlived the people who made them. Bera lays out the accounts: food owed, safe roads still missing, and villages that rejected any central crown.',
    'Your chosen mandate is now measured by what it can maintain when no one is watching. No faction offers unconditional loyalty; every one asks who will be able to object next year.'
], undefined, [
    c('shelter', 'Fund shelters without changing village charters', 'Distribute winter supplies through local signatories and leave their rights intact.', { gold: 88, food: 18, planks: 10 }, 'tideglass', 8),
    c('ledgers', 'Pay for independent fiscal inspections', 'Make every charter payment and unpaid bill available to public review.', { gold: 86, glass: 10, knowledge: 14 }, 'starveil', 8),
    c('bridges', 'Reinforce the dangerous shared crossings', 'Use local contractors and a public repair schedule rather than military requisition.', { gold: 90, stone: 12, tools: 10 }, 'kilnspire', 8)
]), chapter('ST5-18', 'The Last Unpaid Name', 'EVIDENCE BEFORE VERDICTS', [
    'Iven discovers six families omitted from the old compensation ledger. They did not disappear from history. Their names were removed from the public copy.',
    'The Council must investigate the original citizen record at the Chamber of Unpaid Names. The Witnessgrove contains only signed agreements, never private thoughts.'
], undefined, [
    c('witness', 'Offer witnesses protection and travel funds', 'Record family testimony under their chosen custodians and independent advocates.', { gold: 92, food: 12, medicine: 7 }, 'tideglass', 9),
    c('copies', 'Commission a legally witnessed copy', 'Fund a secure public archive and a right to correct incomplete entries.', { gold: 91, knowledge: 17, glass: 11 }, 'starveil', 9),
    c('route', 'Make the ruined archive safe to enter', 'Hire engineers and local guides instead of seizing historical material.', { gold: 93, planks: 11, mechanisms: 7 }, 'kilnspire', 9)
]), chapter('ST5-19', 'No Name Is a Crown', 'THE CHAMBER OF UNPAID NAMES', [
    'The original ledger lists public claims, dates and refused reimbursements. It also shows why a signature proving a lawful order is not proof of a person’s secret motive.',
    'The families ask for restoration of their records and reparations, not another ruler claiming to speak for the dead. Your decision will form part of the final constitutional account.'
], 'H39', [
    c('restore', 'Restore names under family custody', 'Pay for copies, hearings and a future correction procedure.', { gold: 96, knowledge: 18, glass: 10 }, 'tideglass', 10),
    c('compensate', 'Fund overdue medical and housing claims', 'Begin relief without waiting for disputed historical guilt to be assigned.', { gold: 100, food: 18, medicine: 10 }, 'brackenveil', 10),
    c('audit', 'Publish the complete chain of custody', 'Preserve original signatures, annotations and independent objections together.', { gold: 95, mechanisms: 8, knowledge: 17 }, 'starveil', 10)
]), chapter('ST5-20', 'The Hand Above the Switch', 'THE SAFEGUARD DECISION', [
    'Tovin finds that no single repair plan can guarantee safety if one ruler holds a hidden override. Mara asks who would be accountable when an emergency comes at night.',
    'You must fund a final safeguard policy in World → Regions → Kingdoms Choose. Distributed controls and public audits preserve independent choices. A unilateral seizure might break the coalition.'
], undefined, [
    c('hear', 'Hear emergency crews and independent towns', 'Pay for a constitutional hearing before the safeguards are ratified.', { gold: 101, knowledge: 17, medicine: 7 }, 'tideglass', 10),
    c('test', 'Run disconnected warning tests', 'Fund an open demonstration without restoring any silent central command.', { gold: 105, mechanisms: 9, glass: 9 }, 'kilnspire', 10),
    c('records', 'Publish the limits of emergency authority', 'State how orders are challenged, timed out, and overridden by local shutdowns.', { gold: 103, knowledge: 19, tools: 9 }, 'starveil', 10)
]), chapter('ST5-21', 'The Saltwater Witness', 'THE SECOND RECORD', [
    'In Copperwash, a neutral dockmaster offers a sealed maintenance report about the Crownwheel’s last warning network. A storm has filled the signal vault with saltwater.',
    'No one will grant the report to an army by default. Its lawful custodians demand repairs, independent observation, and proof that the new safeguards cannot silently seize a port.'
], 'safeguard', [
    c('publish', 'Guarantee public access to every signal test', 'Allow independent towns to challenge and duplicate the entire technical record.', { gold: 105, knowledge: 20, glass: 12 }, 'starveil', 12),
    c('safety', 'Fund a coastal relief and flood-warning crew', 'Put residents ahead of the political race for the sealed report.', { gold: 107, medicine: 9, food: 16 }, 'copperwash', 11),
    c('engineers', 'Pay neutral engineers to isolate the vault', 'Keep all old remote commands physically disconnected under local supervision.', { gold: 110, mechanisms: 10, tools: 11 }, 'kilnspire', 11)
]), chapter('ST5-22', 'The Warning That Could Leave', 'THE SALTWATER RELAY', [
    'The relay reveals that the old design assumed every region would obey an order it could not inspect. Its independent copies survived only because local maintainers physically disconnected their stations.',
    'You can fund a warning service that each community can shut off or demand consent for every signal. The old Crownwheel remains disconnected.'
], 'H40', [
    c('teach', 'Train local warning stewards', 'Provide accessible training and public exit procedures in every participating town.', { gold: 112, knowledge: 20, food: 15 }, 'tideglass', 11),
    c('build', 'Pay for locally controlled beacons', 'Supply isolated components and supervised tests, without a continental master key.', { gold: 114, mechanisms: 12, planks: 12 }, 'kilnspire', 11),
    c('audit', 'Publish the failure simulations', 'Make every failed experiment available to the engineers and citizens it could harm.', { gold: 112, glass: 13, knowledge: 21 }, 'starveil', 11)
]), chapter('ST5-23', 'The Witnessgrove Gate', 'THE LIVING RECORD', [
    'The last expedition reaches an archive beneath living roots. The grove faithfully remembers an agreement and its withdrawals. It cannot read guilt, loyalty or the future.',
    'Sella refuses to let the Council turn that memory into a throne. The archive can be entrusted to public custodians, or its keys can remain separate and dormant.'
], 'H41', [
    c('custodians', 'Give the archive independent custodians', 'Protect public access, voluntary withdrawal, and the grove’s freedom from coercion.', { gold: 116, knowledge: 23, living_timber: 10 }, 'brackenveil', 13),
    c('sealed', 'Keep the surviving controls permanently separated', 'Fund separate local copies and allow independent petitions for future access.', { gold: 114, glass: 14, mechanisms: 11 }, 'starveil', 12),
    c('teachers', 'Train community historians in open methods', 'Send the archive’s non-secret protocols to schools without removing the originals.', { gold: 118, food: 16, knowledge: 24 }, 'tideglass', 12)
]), chapter('ST5-24', 'The Final Assembly', 'THE END OF THE CROWNWHEEL ERA', [
    'From Fallowbank to Veymark, the delegates assemble under their own banners. The evidence is public: the old emergency interruption and the separately altered safeguard system together caused the disaster. What no record proves is a universal confession.',
    'You bring a chosen civilization, a paid specialization, one voluntary faction compact, the disputed claim, two rebuilt crossings and the final safeguards. Now the kingdom must live with the commitments it has truly earned. The ending routes are reviewed in World → Regions → Kingdoms Choose.'
], undefined, [
    c('charters', 'Ratify the right to dissent and withdraw', 'Sign the final framework only if independent communities keep their own authority.', { gold: 122, knowledge: 23, planks: 15 }, 'tideglass', 13),
    c('witnesses', 'Fund a permanent public evidence service', 'Make the historical finding, its uncertainties, and future corrections available to all.', { gold: 120, glass: 15, knowledge: 25 }, 'starveil', 13),
    c('repairs', 'Pay for standing relief and repair funds', 'Back the final agreement with emergency supplies and a published repair budget.', { gold: 125, food: 20, mechanisms: 11 }, 'copperwash', 13)
]));
export const ACT5_PACTS = [
    { faction: 'copperwash', name: 'Copperwash League', description: 'Open-account trade and neutral caravan routes.', cost: { gold: 58, planks: 9, glass: 4 } },
    { faction: 'brackenveil', name: 'Brackenveil Circles', description: 'Living-land restoration and voluntary watershed compacts.', cost: { gold: 52, herbs: 11, living_timber: 6 } },
    { faction: 'kilnspire', name: 'Kilnspire Houses', description: 'Independent inspections and safer civic engineering.', cost: { gold: 60, iron: 8, mechanisms: 6 } },
    { faction: 'regency', name: 'Pale Banner Regency', description: 'Limited security with civilian audit and strict mandates.', cost: { gold: 62, tools: 8, food: 10 } },
    { faction: 'starveil', name: 'Starveil Archive', description: 'Public archives, evidence custody and scholarly challenge.', cost: { gold: 56, knowledge: 14, glass: 5 } },
    { faction: 'tideglass', name: 'Tideglass Assembly', description: 'Civic autonomy, withdrawal rights and local councils.', cost: { gold: 57, planks: 10, food: 11 } }
];
export const newAct5State = () => ({ completed: [], choices: {}, path: null, pact: null, reconstruction: 0, specialization: null, dispute: null, safeguard: null, ending: null, endingTurn: null, legacy: null });
export const ACT5_ENDINGS = [
    { id: 'hearthbound', name: 'Hearthbound Accord', subtitle: 'A federation where security starts with families', epilogue: [
            'Fallowbank sends its first winter wagons without banners claiming the homes beside the road. Villages keep the right to refuse and return to the shared table when they choose.',
            'The granaries are staffed. The clinics publish their accounts. Hungry households now have a public claim that survives the death of a king.',
            'The Witnessgroves remember an agreement, not a ruler. The hearths stay lit because living people keep their promises.'
        ] },
    { id: 'iron_crown', name: 'Iron Crown', subtitle: 'Preparedness constrained by civilian oversight', epilogue: [
            'Mara’s sentries stand watch beside bridges governed by independent charters. They must answer to the villages they protect and to an inspection board that cannot be silenced.',
            'The ironworks turn out repair braces and defensive tools. Every emergency order is recorded, limited and open to appeal.',
            'The crown is iron because its duty is heavy, not because its hand can reach every door.'
        ] },
    { id: 'golden_compact', name: 'Golden Compact', subtitle: 'Open roads, honest tolls and voluntary markets', epilogue: [
            'Copperwash merchants cross the causeway with receipts anyone can inspect. Towns trade under their own seals and keep a right to withdraw.',
            'Nella’s public tariff books replace secret tribute. Real cargo feeds workshops, schools and families across Tavercale.',
            'The gold is counted openly; the value of an unforced promise is beyond any ledger.'
        ] },
    { id: 'verdant_covenant', name: 'Verdant Covenant', subtitle: 'A restoration compact between land and community', epilogue: [
            'Sella leads the first independent grove census. No one orders the Witnessgroves to remember a thought or obey a ruler.',
            'Watersheds recover under locally managed agreements. Every harvest is paired with care for the ground that made it possible.',
            'Tavercale grows again, not because the forest was conquered, but because its people learned where to stop.'
        ] },
    { id: 'starveil_ascendancy', name: 'Starveil Ascendancy', subtitle: 'Public knowledge with independent challenge', epilogue: [
            'Iven opens the archives beneath lamps that never conceal their costs. Six factions receive the same copies, including every correction and unresolved objection.',
            'The catastrophe becomes a lesson in accountable engineering, not a legend that excuses the next secret order.',
            'A generation learns to ask not who claims certainty, but who will let them see the evidence.'
        ] },
    { id: 'crownless_dawn', name: 'Crownless Dawn', subtitle: 'A concord of autonomous councils', epilogue: [
            'The final assembly sends no single monarch to Veymark. Each community keeps the authority to choose, leave, return, and contest common decisions.',
            'The warnings still travel. Supplies move by agreement; safeguards remain in local hands. Coordination needs patience rather than a throne.',
            'The dawn is crownless, but it is not leaderless. Every village must do the work of governing itself.'
        ] },
    { id: 'shattered_reign', name: 'Shattered Reign', subtitle: 'The price of forcing an unaccountable peace', epilogue: [
            'The Assembly refuses the seized control keys. The public charter fractures, and neighbors close roads rather than submit to another silent override.',
            'Fallowbank survives, but its wider authority does not. Its officers confront a ledger of lost trust, unfinished restitution and broken warnings.',
            'The lesson is neither glorious nor final. The kingdom may rebuild, but this reign will not be remembered as the one that made everyone obey.'
        ] },
    { id: 'living_archive', name: 'The Living Archive', subtitle: 'A rare custodial concord of evidence and consent', epilogue: [
            'Six factions receive authenticated records; none receives a master key. The Witnessgroves remain living witnesses to agreements, never judges of unseen intent.',
            'Public custodians maintain independent copies, a right of correction, and the power for every settlement to disconnect its warning instruments.',
            'The archive lives because its readers can challenge it. Tavercale has not discovered a perfect ruler. It has learned not to need one.'
        ] }
];
export const ACT5_SAFEGUARDS = [
    { id: 'distributed', name: 'Distributed Local Keys', description: 'Each community owns its shutdown key. Public appeals and voluntary exit remain enforceable.', cost: { gold: 100, glass: 11, mechanisms: 9 } },
    { id: 'audited', name: 'Civilian Audited Safeguards', description: 'A civilian board inspects every emergency action and can shut down shared services.', cost: { gold: 105, knowledge: 18, tools: 11 } },
    { id: 'seized', name: 'Unilateral Regency Override', description: 'Seize the old controls despite the Assembly’s objections. This can fracture the reign.', cost: { gold: 95, iron: 13, mechanisms: 8 } }
];
export function act5EndingEligibility(s, id) {
    const a = s.act5, reasons = [];
    if (a.completed.length !== ACT5_CHAPTERS.length)
        reasons.push(`Complete Act V (${a.completed.length}/${ACT5_CHAPTERS.length} chapters).`);
    if (!a.safeguard)
        reasons.push('Fund a final safeguard policy.');
    if (!s.adventure.completed.includes('H41'))
        reasons.push('Complete the Witnessgrove Gate expedition.');
    if (!a.path || !a.specialization || !a.pact || !a.dispute || a.reconstruction !== 2)
        reasons.push('Fund a mandate, specialization, pact, dispute resolution and both reconstruction stages.');
    if (a.ending)
        reasons.push('Your reign has already reached its ending.');
    if (id === 'shattered_reign') {
        if (a.safeguard !== 'seized' && !(s.civic.publicTrust < 40 && s.pledges.some(p => p.status === 'broken')))
            reasons.push('The Assembly must suffer a recorded breakdown: seized safeguards or serious broken public promises.');
    }
    else if (id === 'living_archive') {
        if (a.safeguard !== 'distributed')
            reasons.push('Keep control keys distributed to independent communities.');
        if (a.choices['ST5-21'] !== 'publish' || a.choices['ST5-23'] !== 'custodians')
            reasons.push('Publish the relay evidence and choose independent Witnessgrove custodians.');
        if (s.regional.factions.starveil.trust < 60 || s.regional.factions.brackenveil.trust < 55)
            reasons.push('Earn 60 Starveil Trust and 55 Brackenveil Trust.');
        if (s.civic.publicTrust < 75)
            reasons.push('Reach at least 75 Public Trust.');
        if (Object.values(s.act4.puzzles).some(p => !p.solved))
            reasons.push('Solve all five historical reconstruction puzzles.');
    }
    else {
        if (a.path !== id)
            reasons.push('This conclusion requires its matching, permanent civilization mandate.');
        if (a.safeguard === 'seized')
            reasons.push('A unilateral override blocks accountable civilization conclusions.');
        if (s.civic.publicTrust < 45)
            reasons.push('Reach at least 45 Public Trust.');
        if (!mandateForecast(s).resource)
            reasons.push('Staff the building supporting your civilization mandate.');
        if (!specializationForecast(s).resource)
            reasons.push('Staff the building supporting your specialist program.');
    }
    return reasons;
}
export function act5Available(s) {
    if (!s.flags['act4.complete'])
        return null;
    const ch = ACT5_CHAPTERS[s.act5.completed.length];
    if (!ch)
        return null;
    const gate = ch.requires;
    if (gate === 'safeguard' && !s.act5.safeguard)
        return null;
    if (gate === 'path' && !s.act5.path || gate === 'pact' && !s.act5.pact || gate === 'rebuild' && s.act5.reconstruction < 1 || gate === 'specialization' && !s.act5.specialization || gate === 'dispute' && !s.act5.dispute || gate === 'rebuild2' && s.act5.reconstruction < 2 || gate?.startsWith('H') && !s.adventure.completed.includes(gate))
        return null;
    return ch;
}
export function act5Block(s) {
    if (!s.flags['act4.complete'])
        return null;
    const ch = ACT5_CHAPTERS[s.act5.completed.length];
    if (!ch)
        return null;
    if (ch.requires === 'safeguard' && !s.act5.safeguard)
        return 'Ratify and fund a safeguard policy under World → Regions → Kingdoms Choose.';
    if (ch.requires === 'specialization' && !s.act5.specialization)
        return 'Choose and fund one path-specific development program in World → Regions → Kingdoms Choose.';
    if (ch.requires === 'dispute' && !s.act5.dispute)
        return 'Address a contested faction claim in World → Regions → Kingdoms Choose.';
    if (ch.requires === 'rebuild2' && s.act5.reconstruction < 2)
        return 'Fund the second reconstruction stage in World → Regions → Kingdoms Choose.';
    if (ch.requires === 'path' && !s.act5.path)
        return 'Choose and fund one civilization mandate in World → Regions → Kingdoms Choose.';
    if (ch.requires === 'pact' && !s.act5.pact)
        return 'Negotiate one accountable faction compact in World → Regions → Kingdoms Choose.';
    if (ch.requires === 'rebuild' && s.act5.reconstruction < 1)
        return 'Fund the first shared reconstruction stage in World → Regions → Kingdoms Choose.';
    if (ch.requires?.startsWith('H') && !s.adventure.completed.includes(ch.requires))
        return `Complete ${ch.requires} in World → Expeditions.`;
    return null;
}
function spend(s, cost) { for (const [key, v] of Object.entries(cost)) {
    if (!Number.isInteger(v) || (v ?? 0) < 0 || s.resources[key] < (v ?? 0))
        throw Error('Insufficient ' + key + ' for this Act V commitment.');
} for (const [key, v] of Object.entries(cost))
    s.resources[key] -= v ?? 0; }
const clamp = (x) => Math.max(0, Math.min(100, x));
export function mandateForecast(s) {
    const def = CIVILIZATIONS.find(p => p.id === s.act5.path);
    if (!def)
        return { cost: 0, resource: null, bonus: 0, label: '' };
    const staffed = s.buildings.some(b => b.kind === def.requiresBuilding && b.level > 0 && (b.workers > 0 || def.requiresBuilding === 'common_hall'));
    return { cost: staffed ? def.upkeep : 0, resource: staffed ? def.resource : null, bonus: staffed ? def.bonus : 0, label: def.name };
}
export function specializationForecast(s) {
    const def = ACT5_SPECIALIZATIONS.find(p => p.id === s.act5.specialization);
    if (!def)
        return { cost: 0, resource: null, bonus: 0, label: '' };
    const staffed = s.buildings.some(b => b.kind === def.requiresBuilding && b.level > 0 && (b.workers > 0 || def.requiresBuilding === 'common_hall'));
    return { cost: staffed ? def.upkeep : 0, resource: staffed ? def.resource : null, bonus: staffed ? def.bonus : 0, label: def.name };
}
export function handleAct5(s, cmd) {
    if (!s.flags['act4.complete'])
        throw Error('Complete Act IV before beginning Act V.');
    if (s.adventure.active || s.activeExpedition || s.military.battle)
        throw Error('Finish your active battle or expedition before signing a public commitment.');
    const a = s.act5;
    if (a.ending)
        throw Error('This reign has already reached its conclusion. Begin a new reign to choose another future.');
    if (cmd.type === 'act5_safeguard') {
        if (!a.completed.includes('ST5-20') || a.safeguard)
            throw Error('Complete ST5-20 before funding one final safeguard policy.');
        const def = ACT5_SAFEGUARDS.find(p => p.id === cmd.policy);
        if (!def)
            throw Error('Unknown safeguard policy.');
        spend(s, def.cost);
        a.safeguard = cmd.policy;
        s.flags['act5.safeguard_' + cmd.policy] = true;
        if (cmd.policy === 'seized') {
            s.civic.publicTrust = clamp(s.civic.publicTrust - 30);
            for (const f of Object.values(s.regional.factions))
                f.trust = clamp(f.trust - 8);
        }
        else {
            s.civic.publicTrust = clamp(s.civic.publicTrust + 3);
            s.civic.safetyBonus = clamp(s.civic.safetyBonus + 4);
        }
        return { note: `${def.name} funded.`, chronicle: `The Assembly recorded ${def.name}. ${def.description} This choice affects which conclusions the kingdom may earn.` };
    }
    if (cmd.type === 'act5_ending') {
        if (!ACT5_ENDINGS.some(e => e.id === cmd.id))
            throw Error('Unknown ending route.');
        const reasons = act5EndingEligibility(s, cmd.id);
        if (reasons.length)
            throw Error(reasons[0]);
        a.ending = cmd.id;
        a.endingTurn = s.turn;
        s.flags['act5.complete'] = true;
        s.flags['act5.ending_' + cmd.id] = true;
        const ep = ACT5_ENDINGS.find(e => e.id === cmd.id);
        return { note: `Ending earned: ${ep.name}. Your kingdom may continue, or you may begin New Game+.`, chronicle: `${ep.name} — ${ep.subtitle}. ${ep.epilogue.join(' ')}` };
    }
    if (cmd.type === 'act5_specialize') {
        if (!a.completed.includes('ST5-09') || !a.path || a.specialization)
            throw Error('Finish the public program hearing before funding one specialization.');
        const def = ACT5_SPECIALIZATIONS.find(p => p.id === cmd.id && p.path === a.path);
        if (!def)
            throw Error('That specialization does not belong to your selected civilization.');
        spend(s, def.cost);
        a.specialization = def.id;
        s.flags['act5.specialization_' + def.id] = true;
        s.civic.publicTrust = clamp(s.civic.publicTrust + 2);
        return { note: `${def.name} funded. Staff the supporting building to produce weekly benefits.`, chronicle: `Fallowbank funded ${def.name} under the ${a.path} mandate. ${def.description} Ongoing production costs Gold and requires staffed facilities.` };
    }
    if (cmd.type === 'act5_dispute') {
        if (!a.completed.includes('ST5-11') || a.dispute || !a.pact)
            throw Error('Complete the Grainline objection and negotiate only one disputed claim.');
        if (cmd.faction === a.pact || !ACT5_PACTS.some(p => p.faction === cmd.faction))
            throw Error('Select a different faction, not your signed compact partner.');
        const approach = ACT5_DISPUTE_APPROACHES[cmd.approach];
        if (!approach)
            throw Error('Unknown dispute response.');
        spend(s, approach.cost);
        a.dispute = { faction: cmd.faction, approach: cmd.approach };
        const f = s.regional.factions[cmd.faction];
        f.trust = clamp(f.trust + approach.trust);
        f.grievances = Math.max(0, f.grievances - approach.grievance);
        s.civic.publicTrust = clamp(s.civic.publicTrust + 2);
        s.flags['act5.dispute_' + cmd.faction + '_' + cmd.approach] = true;
        return { note: `${approach.name} recorded with ${ACT5_PACTS.find(x => x.faction === cmd.faction)?.name}.`, chronicle: `Fallowbank funded ${approach.name} to answer a ${cmd.faction} claim. ${approach.description} No settlement was annexed or forced to sign the kingdom's mandate.` };
    }
    if (cmd.type === 'act5_path') {
        if (!a.completed.includes('ST5-02') || a.path)
            throw Error('Resolve the Council debate before choosing one permanent civilization mandate.');
        const def = CIVILIZATIONS.find(x => x.id === cmd.id);
        if (!def)
            throw Error('Unknown civilization mandate.');
        spend(s, def.cost);
        a.path = def.id;
        s.regional.factions[def.faction].trust = clamp(s.regional.factions[def.faction].trust + 6);
        s.flags['act5.path_' + def.id] = true;
        s.civic.publicTrust = clamp(s.civic.publicTrust + 3);
        return { note: `${def.name} adopted. Weekly support requires a working ${def.requiresBuilding.replaceAll('_', ' ')} and funding.`, chronicle: `Fallowbank formally funded the ${def.name} as its public development mandate. ${def.promise} This does not fix the kingdom's final ending.` };
    }
    if (cmd.type === 'act5_pact') {
        if (!a.completed.includes('ST5-04') || a.pact)
            throw Error('The Accord Road findings must be heard before a single diplomatic compact can be signed.');
        const pact = ACT5_PACTS.find(p => p.faction === cmd.faction);
        if (!pact)
            throw Error('Unknown diplomatic compact.');
        const faction = s.regional.factions[cmd.faction];
        if (faction.trust < 35)
            throw Error('This faction requires at least 35 trust before signing a compact.');
        spend(s, pact.cost);
        a.pact = cmd.faction;
        faction.trust = clamp(faction.trust + 10);
        faction.influence = clamp(faction.influence + 4);
        s.civic.tradeStanding = clamp(s.civic.tradeStanding + 3);
        s.flags['act5.pact_' + cmd.faction] = true;
        return { note: `Voluntary compact signed with ${pact.name}.`, chronicle: `The ${pact.name} entered a paid, challengeable compact with Fallowbank. ${pact.description} Other factions and independent communities were not annexed or compelled to join.` };
    }
    if (cmd.type === 'act5_rebuild') {
        if (!a.completed.includes('ST5-06') || !a.path || !a.pact)
            throw Error('Complete the causeway decision, mandate and diplomatic compact first.');
        if (a.reconstruction >= 2)
            throw Error('The current reconstruction work is already funded.');
        const cost = a.reconstruction === 0 ? { gold: 75, stone: 16, planks: 12, tools: 7 } : { gold: 110, bricks: 12, mechanisms: 8, glass: 8 };
        spend(s, cost);
        a.reconstruction = (a.reconstruction + 1);
        s.civic.safetyBonus = clamp(s.civic.safetyBonus + 4);
        s.civic.tradeStanding = clamp(s.civic.tradeStanding + 3);
        return { note: `Shared reconstruction stage ${a.reconstruction}/2 funded.`, chronicle: `The kingdom contributed real materials to a voluntary, independently inspected crossing and warning-way project (stage ${a.reconstruction}/2). No residents or territory were claimed.` };
    }
    const ch = act5Available(s);
    if (!ch || ch.id !== cmd.id)
        throw Error('That Act V Council chapter is not available.');
    const choice = ch.choices.find(x => x.id === cmd.choiceId);
    if (!choice)
        throw Error('Unknown Council choice.');
    spend(s, choice.cost);
    a.completed.push(ch.id);
    a.choices[ch.id] = choice.id;
    s.regional.factions[choice.faction].trust = clamp(s.regional.factions[choice.faction].trust + choice.trust);
    s.civic.publicTrust = clamp(s.civic.publicTrust + 2);
    s.flags['act5.choice_' + ch.id + '_' + choice.id] = true;
    if (ch.id === 'ST5-08')
        s.flags['act5.opening_complete'] = true;
    if (ch.id === 'ST5-16')
        s.flags['act5.middle_complete'] = true;
    if (ch.id === 'ST5-24')
        s.flags['act5.final_assembly_complete'] = true;
    return { note: `${ch.name}: public choice recorded.`, chronicle: `${ch.name} — ${choice.label}. ${choice.detail} The six factions retain their rights to disagree, and no ending has been prematurely selected.` };
}
export function act5Invariants(s) {
    const a = s.act5;
    if (!a || !Array.isArray(a.completed) || !a.choices || a.reconstruction === undefined)
        throw Error('Missing Act V state.');
    const expected = ACT5_CHAPTERS.slice(0, a.completed.length).map(x => x.id);
    if (a.completed.length > ACT5_CHAPTERS.length || a.completed.some((id, i) => id !== expected[i]))
        throw Error('Invalid Act V chapter order.');
    if (Object.keys(a.choices).length !== a.completed.length || a.completed.some(id => !ACT5_CHAPTERS.find(ch => ch.id === id)?.choices.some(c => c.id === a.choices[id])))
        throw Error('Invalid Act V decisions.');
    if (a.path && !CIVILIZATIONS.some(x => x.id === a.path) || a.pact && !ACT5_PACTS.some(x => x.faction === a.pact) || ![0, 1, 2].includes(a.reconstruction))
        throw Error('Invalid civilization commitment.');
    if (a.safeguard !== null && !ACT5_SAFEGUARDS.some(x => x.id === a.safeguard))
        throw Error('Invalid final safeguard policy.');
    if (a.safeguard && !a.completed.includes('ST5-20') || a.completed.includes('ST5-21') && !a.safeguard)
        throw Error('Safeguard funding out of order.');
    if (!!s.flags['act5.final_assembly_complete'] !== a.completed.includes('ST5-24'))
        throw Error('Final Assembly flag mismatch.');
    for (const [id, mission] of [['ST5-19', 'H39'], ['ST5-22', 'H40'], ['ST5-23', 'H41']])
        if (a.completed.includes(id) && !s.adventure.completed.includes(mission))
            throw Error('Act V finale bypassed expedition ' + mission);
    if (a.ending !== null) {
        if (!ACT5_ENDINGS.some(e => e.id === a.ending) || !Number.isInteger(a.endingTurn) || a.endingTurn > s.turn || a.completed.length !== ACT5_CHAPTERS.length || !s.flags['act5.complete'] || !s.flags['act5.ending_' + a.ending])
            throw Error('Invalid earned ending.');
        // A conclusion is a historical event: later weekly changes cannot revoke it.
        if (a.ending !== 'living_archive' && a.ending !== 'shattered_reign' && a.ending !== a.path)
            throw Error('Conclusion conflicts with founding mandate.');
    }
    else if (a.endingTurn !== null || s.flags['act5.complete'])
        throw Error('Ending marker inconsistent.');
    if (a.legacy !== null && (!a.legacy || !ACT5_ENDINGS.some(e => e.id === a.legacy?.ending) || typeof a.legacy.name !== 'string' || a.legacy.name.length > 28 || !Number.isInteger(a.legacy.week) || a.legacy.week < 0))
        throw Error('Invalid cosmetic legacy.');
    if (a.specialization !== null && !ACT5_SPECIALIZATIONS.some(x => x.id === a.specialization && x.path === a.path))
        throw Error('Invalid civilization specialization.');
    if (a.dispute !== null && (!a.dispute || !ACT5_PACTS.some(x => x.faction === a.dispute?.faction) || a.dispute.faction === a.pact || !Object.hasOwn(ACT5_DISPUTE_APPROACHES, a.dispute.approach)))
        throw Error('Invalid rival-faction settlement.');
    if (a.specialization && !a.completed.includes('ST5-09') || a.dispute && !a.completed.includes('ST5-11'))
        throw Error('Act V deepening operation out of order.');
    if (a.completed.includes('ST5-10') && !a.specialization || a.completed.includes('ST5-12') && !a.dispute || a.completed.includes('ST5-14') && a.reconstruction < 2)
        throw Error('Act V deepening bypassed a funded commitment.');
    for (const [id, mission] of [['ST5-11', 'H36'], ['ST5-13', 'H37'], ['ST5-15', 'H38']])
        if (a.completed.includes(id) && !s.adventure.completed.includes(mission))
            throw Error('Act V deepening bypassed expedition ' + mission);
    if (!!s.flags['act5.middle_complete'] !== a.completed.includes('ST5-16'))
        throw Error('Act V middle arc flag mismatch.');
    if (a.specialization && s.flags['act5.specialization_' + a.specialization] !== true || a.dispute && s.flags['act5.dispute_' + a.dispute.faction + '_' + a.dispute.approach] !== true)
        throw Error('Act V funding flags mismatched.');
    if (a.completed.length && !s.flags['act4.complete'])
        throw Error('Act V began before Act IV.');
    if (a.path && !a.completed.includes('ST5-02') || a.pact && !a.completed.includes('ST5-04') || a.reconstruction > 0 && !a.completed.includes('ST5-06'))
        throw Error('Act V operation out of order.');
    if (a.completed.includes('ST5-03') && !a.path || a.completed.includes('ST5-05') && !a.pact || a.completed.includes('ST5-07') && a.reconstruction < 1)
        throw Error('Act V chapter bypassed a funded policy.');
    for (const [id, mission] of [['ST5-04', 'H33'], ['ST5-06', 'H34'], ['ST5-08', 'H35']])
        if (a.completed.includes(id) && !s.adventure.completed.includes(mission))
            throw Error('Act V chapter bypassed expedition ' + mission);
    if (!!s.flags['act5.opening_complete'] !== a.completed.includes('ST5-08'))
        throw Error('Act V opening flag mismatched.');
    if (a.path && s.flags['act5.path_' + a.path] !== true || a.pact && s.flags['act5.pact_' + a.pact] !== true)
        throw Error('Act V signed policy flag mismatched.');
}

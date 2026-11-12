const opt = (id, label, detail, cost, flag, faction, trust = 0, knowledge = 0) => ({ id, label, detail, cost, flag, faction, trust, knowledge });
const chapter = (id, title, tag, intro, choices, needs) => ({ id, title, tag, intro, choices, needs });
export const ACT4_CHAPTERS = [
    chapter('ST4-01', 'The City Beneath the Ash', 'ARRIVAL AT VEYMARK', [
        'The ancient capital rises from the plain in broken layers. Veymark is not empty: families shelter beneath roofs that the old empire never repaired.',
        'Rook finds the Hall of Petitions marked on an old city plan. “We have permission to enter the gate,” he says. “That is not permission to take anything we find.”'
    ], [
        opt('camp', 'Fund a public arrival camp', 'Provide shelter and food while residents explain which places are still in use.', { gold: 28, food: 9 }, 'act4.arrival_camp', 'tideglass', 4, 2),
        opt('record', 'Register an independent arrival ledger', 'Pay clerks to distinguish protected homes from abandoned offices.', { gold: 25, knowledge: 6 }, 'act4.arrival_ledger', 'starveil', 5, 2),
        opt('repair', 'Repair the public well before exploring', 'Use tools and stone to restore basic service without claiming local authority.', { gold: 24, stone: 9, tools: 3 }, 'act4.arrival_well', 'brackenveil', 4, 2)
    ]),
    chapter('ST4-02', 'The Hall of Petitions', 'WHO WAS ALLOWED TO SPEAK', [
        'Hundreds of requests are set into racks along a vast hearing hall. Each one records a formal petition, not the speaker’s thoughts.',
        'Iven insists that the copies show both approvals and refusals. The people whose requests were rejected are part of the city’s history too.'
    ], [
        opt('copies', 'Preserve the denied petitions alongside approvals', 'Fund two matching sets so an unpopular request cannot simply disappear.', { gold: 20, planks: 6, knowledge: 5 }, 'act4.petitions_complete', 'starveil', 5, 2),
        opt('local', 'Invite living residents to supervise the inventory', 'Pay for local witnesses, not just visiting officials.', { gold: 22, food: 5 }, 'act4.petitions_local', 'tideglass', 6, 1),
        opt('repair', 'Stabilize the petition gallery before handling its records', 'Prevent a dangerous collapse and create a controlled route for researchers.', { gold: 23, tools: 4, stone: 5 }, 'act4.petitions_safe', 'kilnspire', 4, 2)
    ], 'access'),
    chapter('ST4-03', 'The Names That Remained', 'THE FIRST PETITION EVIDENCE', [
        'The party returns from the Hall with a certified register of petitions. Some officials recorded formal objections to the interruption plan.',
        'That proves objections were received. It does not prove the readers followed them, or that a Witnessgrove secretly knew what was in anyone’s mind.'
    ], [
        opt('certify', 'Certify the petition register', 'Preserve the date, witnesses and both accepted and rejected entries.', { gold: 18, knowledge: 6 }, 'act4.petitions_certified', 'starveil', 6, 3),
        opt('copies', 'Distribute copies under civic custody', 'Make authenticated public copies available to affected communities.', { gold: 24, planks: 6, glass: 2 }, 'act4.petitions_distributed', 'tideglass', 6, 2),
        opt('protect', 'Reinforce the original record room', 'Fund protection without controlling who may read the evidence.', { gold: 21, tools: 3, stone: 4 }, 'act4.petitions_protected', 'brackenveil', 4, 2)
    ], 'H24'),
    chapter('ST4-04', 'The Chamber of Six Seals', 'THE APPROVAL CHAIN', [
        'Tovin finds six mechanical impressions on the chamber doors. Their sequence matches formal permissions, but one seal has been remounted.',
        'The Hall showed that requests existed. The seals may reveal who had the authority to change what the machinery was allowed to do.'
    ], [
        opt('trace', 'Fund a mechanical seal tracing', 'Use calibrated glass and Tools to compare the mounting holes without forcing the door.', { gold: 26, glass: 4, tools: 4 }, 'act4.seals_traced', 'kilnspire', 6, 2),
        opt('witness', 'Invite independent observers to the door', 'Establish a witnessed inventory before any seal is lifted.', { gold: 24, knowledge: 7 }, 'act4.seals_witnessed', 'starveil', 6, 2),
        opt('support', 'Stabilize the damaged masonry', 'Support the vault so local residents are not endangered by the investigation.', { gold: 23, stone: 10, planks: 5 }, 'act4.seals_supported', 'brackenveil', 5, 2)
    ]),
    chapter('ST4-05', 'Six Signatures, One Gap', 'A LIMIT OF AUTHORITY', [
        'The recovered seal table shows that an authorization passed through five ordinary countersignatures and one privileged override.',
        'Iven points to a blank field. “A blank name cannot be turned into a person by wishing. We need an actual authenticated source.”'
    ], [
        opt('publish', 'Publish the verified sequence, with the missing name blank', 'Tell the public what the record says and where it stops.', { gold: 25, knowledge: 8 }, 'act4.seals_public', 'tideglass', 5, 3),
        opt('secure', 'Preserve the seal impressions for later challenges', 'Provide identical safeguarded sets to outside reviewers.', { gold: 26, glass: 4, planks: 4 }, 'act4.seals_copies', 'starveil', 5, 3),
        opt('engineer', 'Fund a study of the privileged override hardware', 'Compare fittings against the approved regulator drawings.', { gold: 27, mechanisms: 3, tools: 3 }, 'act4.seals_engineered', 'kilnspire', 6, 2)
    ], 'H25'),
    chapter('ST4-06', 'The Regulator Galleries', 'THE LAST WARNING', [
        'Beneath the public chambers, old conduits disappear into the capital. Some still carry warning marks from the final days.',
        'Tovin refuses to restart the network. The party will map the surviving warning path and leave the live fittings undisturbed.'
    ], [
        opt('safety', 'Equip the party for a non-destructive inspection', 'Provide masks, lamps and a secure route through the gallery.', { gold: 27, tools: 5, food: 5 }, 'act4.gallery_safe', 'kilnspire', 5, 2),
        opt('listen', 'Ask former maintenance families to identify old passages', 'Pay local residents for their expertise and witnesses.', { gold: 24, food: 8, knowledge: 3 }, 'act4.gallery_guides', 'tideglass', 5, 2),
        opt('maps', 'Create a complete galleries map', 'Fund safe measuring equipment and a physical route ledger.', { gold: 25, glass: 3, planks: 6 }, 'act4.gallery_mapped', 'starveil', 5, 2)
    ]),
    chapter('ST4-07', 'The Warning Between Orders', 'INDEPENDENT REVIEW', [
        'A missing warning interval is recovered from the lower gallery. The record matches the changed fitting found at Kilnspire, but it does not establish a final chain of causation.',
        'The evidence now warrants a public technical review: a deliberate interruption, a privileged override, altered safeguards and a missing warning signal.'
    ], [
        opt('record', 'Register the warning with its uncertainty intact', 'Submit the authenticated sequence and name the unproven technical links.', { gold: 23, knowledge: 9 }, 'act4.warning_registered', 'starveil', 6, 3),
        opt('public', 'Release a readable findings summary', 'Explain the record in plain terms without accusing a person not identified by evidence.', { gold: 25, planks: 7, knowledge: 5 }, 'act4.warning_explained', 'tideglass', 5, 2),
        opt('preserve', 'Secure the original relay without restarting it', 'Fund a safe preserved specimen for independent mechanical review.', { gold: 28, mechanisms: 3, stone: 6 }, 'act4.warning_preserved', 'kilnspire', 6, 2)
    ], 'H26'),
    chapter('ST4-08', 'The Question the Wheel Cannot Answer', 'THE OPEN INVESTIGATION', [
        'The interim review reaches Veymark. Documents show who could issue some commands and which safeguards failed to match the approved design, but the complete network sequence remains unproven.',
        'Sella says, “The Witnessgroves remember promises made aloud. They do not remember secret intentions. We must find the missing proof in the real world.”'
    ], [
        opt('interim', 'Publish the interim account and list unresolved questions', 'Give every faction the evidence and clearly label what remains unknown.', { gold: 35, knowledge: 10 }, 'act4.interim_public', 'starveil', 7, 3),
        opt('inspect', 'Create a multi-faction independent inspection team', 'Fund joint observation without awarding any faction command over the network.', { gold: 40, glass: 5, tools: 5 }, 'act4.interim_inspection', 'tideglass', 6, 3),
        opt('repair', 'Fund protected study of the disconnected regulator', 'Preserve access and civilian safety without restarting the ancient Crownwheel.', { gold: 38, mechanisms: 5, food: 7 }, 'act4.interim_safety', 'kilnspire', 6, 2)
    ], 'review')
];
// Pass 22: eight more sequential chapters. The evidence remains limited and contestable.
ACT4_CHAPTERS.push(chapter('ST4-09', 'The Broken Petition Index', 'A PUBLIC CLAIM, NOT A VERDICT', [
    'A second index cross-references old emergency petitions. Several entries were assigned later filing numbers, including one dated before the interruption itself.',
    'Iven warns that a filing date and a command date are different facts. The Council must reconstruct the order, not guess a hidden voice.'
], [
    opt('crosscheck', 'Commission a two-register comparison', 'Pay archivists to compare the source and receiving copies.', { gold: 31, knowledge: 8 }, 'act4.index_crosscheck', 'starveil', 6, 2),
    opt('residents', 'Fund a public petition hearing', 'Let current Veymark residents challenge the proposed timeline.', { gold: 32, food: 8 }, 'act4.index_hearing', 'tideglass', 7, 1),
    opt('preserve', 'Secure the fragile original index', 'Stabilize the documents with independent custody.', { gold: 30, glass: 4, planks: 6 }, 'act4.index_preserved', 'brackenveil', 5, 2)
]), chapter('ST4-10', 'Order of the Petition Seals', 'THE FIRST CUSTODY TEST', [
    'The reconstructed index identifies which petitions predate the emergency order. The public record must separate objections, authorization, and later filing.',
    'A displaced council clerk asks that the ledger remain open to appeal. “Proof that a request was heard is not proof it was obeyed.”'
], [
    opt('witness', 'Appoint rotating independent witnesses', 'No single faction will control the new index.', { gold: 30, knowledge: 7 }, 'act4.index_witnessed', 'tideglass', 6, 2),
    opt('archive', 'Make durable copies for all six factions', 'Distribute authenticated indexes with the same known gaps.', { gold: 35, planks: 7, glass: 3 }, 'act4.index_distributed', 'starveil', 6, 2),
    opt('repair', 'Fund the petition hall’s broken supports', 'Repair dangerous shelving before further inspections.', { gold: 30, stone: 9, tools: 3 }, 'act4.index_supported', 'kilnspire', 5, 2)
], 'puzzle:petitions'), chapter('ST4-11', 'The Magistrate’s Empty Seat', 'THE RECORDING MACHINE', [
    'In a locked annex, a stamped machine reveals how a petition could be recorded but deliberately left unresolved.',
    'The magistrate seal is damaged and its last custodian unnamed. The machine’s functions can be examined; it does not speak for a missing person.'
], [
    opt('open', 'Invite every city ward to witness the annex review', 'Record the mechanism without granting exclusive rights.', { gold: 34, food: 7, knowledge: 5 }, 'act4.magistrate_witness', 'tideglass', 7, 2),
    opt('parts', 'Conserve the machine’s removable evidence plates', 'Create tamper-evident copies while leaving the original in place.', { gold: 32, glass: 5, mechanisms: 3 }, 'act4.magistrate_parts', 'kilnspire', 6, 2),
    opt('names', 'Publish an appeal for the missing custodians', 'Fund a careful search for names, rather than inventing them.', { gold: 34, knowledge: 8 }, 'act4.magistrate_names', 'starveil', 6, 2)
], 'H27'), chapter('ST4-12', 'One Circuit, Six Limits', 'THE SECOND CUSTODY TEST', [
    'The mechanical seal tracing identifies a later service branch that could carry the privileged override around one of the normal checks.',
    'An authority to use a bypass is not proof that using it was wise. Tovin demands a test using a disconnected replica.'
], [
    opt('replica', 'Fund a disconnected seal replica', 'Make its safe physical behavior reproducible by independent engineers.', { gold: 37, mechanisms: 5, glass: 3 }, 'act4.circuit_replica', 'kilnspire', 7, 2),
    opt('citizens', 'Establish a civilian challenge panel', 'Permit affected residents to question technical assumptions.', { gold: 35, knowledge: 8, food: 6 }, 'act4.circuit_challenge', 'tideglass', 6, 2),
    opt('copies', 'Share seal diagrams with independent scholars', 'Require each reviewer to identify what the diagram cannot prove.', { gold: 33, planks: 7, knowledge: 7 }, 'act4.circuit_copies', 'starveil', 6, 2)
], 'puzzle:seals'), chapter('ST4-13', 'The Isolator’s Choice', 'A SAFEGUARD ALTERED', [
    'An intact isolation wheel sits behind the ruined regulator. Its teeth were deliberately re-cut after the approved safety design was filed.',
    'That change could explain the warning gap, but a disconnected demonstration is needed before anyone can call it a complete cause.'
], [
    opt('seal', 'Isolate and catalogue the original teeth', 'Document tool marks while keeping the machinery inert.', { gold: 38, tools: 6, glass: 4 }, 'act4.isolator_catalogued', 'kilnspire', 7, 2),
    opt('repair', 'Protect nearby houses from loose masonry', 'Make the site safer before more testing.', { gold: 35, stone: 10, planks: 7 }, 'act4.isolator_safety', 'brackenveil', 7, 1),
    opt('committee', 'Fund outside technical witnesses', 'Let all parties challenge the proposed model.', { gold: 36, knowledge: 9 }, 'act4.isolator_observed', 'starveil', 6, 2)
], 'H28'), chapter('ST4-14', 'The Missing Relay Beat', 'THE THIRD CUSTODY TEST', [
    'Three preserved signal strips can now be ordered by their own time stamps. One command preceded a missing alert; another arrived after the network was already failing.',
    'The party can demonstrate the gap, not every consequence of the collapse. The original warning paths must remain disconnected.'
], [
    opt('timeline', 'Publish the verified timing and uncertainties', 'Show the public the order and the unresolved downstream effects.', { gold: 37, knowledge: 10 }, 'act4.relay_timeline', 'starveil', 7, 3),
    opt('inspection', 'Fund witnessed disconnected timing trials', 'Let engineers replay the timing with isolated models.', { gold: 39, tools: 5, mechanisms: 4 }, 'act4.relay_model', 'kilnspire', 7, 2),
    opt('hearing', 'Hold a public hearing for those affected', 'Explain the difference between records and conclusions.', { gold: 35, food: 8, planks: 6 }, 'act4.relay_hearing', 'tideglass', 7, 2)
], 'puzzle:relay'), chapter('ST4-15', 'The Ash-Ward Guardian', 'THE LAST SEALED FILE', [
    'A surviving archive contains a legal order to halt part of the network during the crisis. It is countersigned, yet an unsigned maintenance alteration lies beneath it.',
    'The two findings must not be collapsed into a single accusation. The final sealed file was defended by a mechanical guardian.'
], [
    opt('audit', 'Commission a two-part independent findings report', 'Separate the emergency order from the unauthorized maintenance change.', { gold: 42, knowledge: 12 }, 'act4.ash_audit', 'starveil', 8, 3),
    opt('rights', 'Fund protected testimony from the surviving wards', 'Keep compensation and civic rights separate from the investigation.', { gold: 41, food: 10, planks: 7 }, 'act4.ash_rights', 'tideglass', 8, 2),
    opt('safety', 'Secure the disconnected components for inspection', 'Prevent accidental reactivation while preserving physical evidence.', { gold: 43, tools: 6, glass: 5 }, 'act4.ash_safety', 'kilnspire', 8, 2)
], 'H29'), chapter('ST4-16', 'The Broken Wheel Inquiry', 'PROVEN FACTS, OPEN QUESTIONS', [
    'The inquiry has traced the recorded emergency interruption, a privileged override, altered mechanical safeguards, and a missing warning interval. Together they show a dangerous sequence of human decisions and failures.',
    'The record still cannot attribute every action to an individual or prove every downstream consequence. The Council can now prepare an accountable public inquiry rather than issue a fabricated final verdict.'
], [
    opt('findings', 'Publish the bounded Broken Wheel findings', 'Release authenticated evidence, identified uncertainties, and an open appeal process.', { gold: 48, knowledge: 14 }, 'act4.broken_wheel_public', 'starveil', 9, 4),
    opt('restitution', 'Fund restitution hearings without forced annexation', 'Help affected communities while preserving their independent authority.', { gold: 52, food: 12, planks: 8 }, 'act4.broken_wheel_restitution', 'tideglass', 9, 3),
    opt('safeguards', 'Establish a permanent disconnected-systems inspection', 'Protect residents and prevent the old network from being restarted without agreement.', { gold: 49, mechanisms: 6, tools: 6 }, 'act4.broken_wheel_safety', 'kilnspire', 9, 3)
]));
// Pass 23 completes the Act IV public and technical inquiry without claiming
// the records reveal an operator's private intent or the identity of every actor.
ACT4_CHAPTERS.push(chapter('ST4-17', 'The City That Remembers', 'A CITY STILL INHABITED', [
    'The Broken Wheel review draws witnesses to Veymark. The capital is neither a museum nor a prize: families still live in its undamaged quarters.',
    'The delegation must trace surviving ward grants before opening another vault. These grants record formal rights, not private memories.'
], [
    opt('wards', 'Fund a resident-led ward survey', 'Pay local stewards to record occupied homes and protected public passages.', { gold: 50, food: 10, knowledge: 10 }, 'act4.ward_survey', 'tideglass', 9, 3),
    opt('archives', 'Duplicate the public ward charters', 'Preserve the grants in independent archives with common access.', { gold: 52, planks: 8, glass: 5 }, 'act4.ward_copies', 'starveil', 8, 3),
    opt('shelter', 'Repair the unsafe council shelter', 'Provide a safe place for witnesses without claiming their neighborhoods.', { gold: 51, stone: 12, tools: 6 }, 'act4.ward_shelter', 'brackenveil', 9, 2)
]), chapter('ST4-18', 'The Unbroken Witness', 'CHAIN OF CUSTODY', [
    'In the Lower Ward Court, the party finds that two authentic copies of the same grant were preserved by different custodians.',
    'They establish a shared source. Their missing pages remain missing; no witness can supply words that were never recorded.'
], [
    opt('custody', 'Fund two independent chains of custody', 'Register the matching records and the exact gaps between them.', { gold: 49, knowledge: 12, glass: 4 }, 'act4.chain_custody', 'starveil', 10, 4),
    opt('voices', 'Invite the city wards to review the record', 'Require local witnesses to be heard alongside engineers.', { gold: 52, food: 12, planks: 8 }, 'act4.ward_voices', 'tideglass', 10, 3),
    opt('safety', 'Stabilize the ward court gallery', 'Keep residents safe while the record stays open for examination.', { gold: 48, stone: 14, tools: 5 }, 'act4.court_safe', 'brackenveil', 9, 2)
], 'H30'), chapter('ST4-19', 'The Ledger of Three Hands', 'SEPARATE ORDERS, SEPARATE ACTORS', [
    'The verified custody order shows that an emergency interruption, a later safeguard alteration, and the missed warning were separate documented acts.',
    'No single record names every person involved. The Council must not turn three documents into one imaginary confession.'
], [
    opt('publish', 'Release the three records side by side', 'Show the documented sequence and all remaining uncertainties.', { gold: 54, knowledge: 12, planks: 9 }, 'act4.three_hands_public', 'starveil', 10, 4),
    opt('appeal', 'Create a right-of-reply docket', 'Invite affected wards and factions to contest the public chronology.', { gold: 55, food: 12, glass: 4 }, 'act4.three_hands_appeal', 'tideglass', 10, 3),
    opt('replica', 'Fund isolated mechanical comparisons', 'Build disconnected models rather than restarting the old system.', { gold: 57, mechanisms: 7, tools: 6 }, 'act4.three_hands_model', 'kilnspire', 10, 3)
], 'puzzle:custody'), chapter('ST4-20', 'The Safeguard Orchard', 'AN UNAUTHORIZED ALTERATION', [
    'An old test orchard beneath the western terraces contains a disconnected network of protection relays.',
    'Tovin can compare the approved design with the altered one in a safe replica. The result is a mechanical explanation, not proof of who issued the changes.'
], [
    opt('replicate', 'Build an independent regulator trial', 'Demonstrate the difference between approved and altered protection paths.', { gold: 58, mechanisms: 8, glass: 6 }, 'act4.orchard_replica', 'kilnspire', 10, 4),
    opt('grove', 'Protect the adjacent Witnessgrove roots', 'Ensure the historic trees are not used as experimental machinery.', { gold: 55, living_timber: 6, herbs: 8 }, 'act4.orchard_grove', 'brackenveil', 11, 3),
    opt('citizen', 'Establish a public safety observation team', 'Include residents in the disconnected test and preserve accessible copies.', { gold: 56, food: 10, knowledge: 10 }, 'act4.orchard_public', 'tideglass', 10, 3)
], 'H31'), chapter('ST4-21', 'One Missing Warning', 'TESTING A FAILURE PATH', [
    'The isolated model reproduces the missing alert when the approved emergency interruption is combined with the altered safeguard.',
    'It supports a causal mechanism under those tested conditions. It does not prove the identity of a covert maintainer or the full extent of every collapse.'
], [
    opt('model', 'Publish the disconnected test procedure', 'Allow other engineers to repeat the finding without waking the Crownwheel.', { gold: 60, mechanisms: 7, knowledge: 12 }, 'act4.safe_model', 'kilnspire', 11, 4),
    opt('local', 'Fund plain-language public demonstrations', 'Show the evidence and its limits to affected communities.', { gold: 55, planks: 12, food: 12 }, 'act4.safe_demonstration', 'tideglass', 11, 3),
    opt('protect', 'Preserve the original regulator as evidence', 'Keep the dangerous hardware disconnected and accessible for challenge.', { gold: 58, glass: 7, tools: 7 }, 'act4.safe_original', 'starveil', 11, 3)
], 'puzzle:fail_safe'), chapter('ST4-22', 'The Sixth Ward Docket', 'COMPENSATION BEFORE VERDICT', [
    'A surviving compensation docket describes who lost access to food, water, and shelter after the collapse.',
    'Those claims need help now. The Council can pay restitution while keeping the legal question of individual responsibility open.'
], [
    opt('relief', 'Fund the ward restitution kitchens', 'Support displaced families without demanding political allegiance.', { gold: 65, food: 18, medicine: 7 }, 'act4.ward_relief', 'tideglass', 12, 3),
    opt('repair', 'Fund safe public infrastructure restoration', 'Repair damaged waterways with no direct Crownwheel restart.', { gold: 63, stone: 16, mechanisms: 5 }, 'act4.ward_repair', 'brackenveil', 10, 3),
    opt('appeals', 'Create independent claims and appeals desks', 'Let residents challenge awards without surrendering local authority.', { gold: 64, planks: 12, knowledge: 12 }, 'act4.ward_appeals', 'starveil', 12, 4)
], 'H32'), chapter('ST4-23', 'The Six-Faction Hearing', 'A FINDING OPEN TO CHALLENGE', [
    'Six factions receive the authenticated technical summary. Some agree with its mechanism; others challenge its scope or contest compensation.',
    'The Council can protect the independent review but cannot manufacture unanimous consent or force a peaceful town into its domain.'
], [
    opt('joint', 'Protect independent observers at the public hearing', 'Reserve seats for all factions and residents, with separate dissent records.', { gold: 70, knowledge: 16, glass: 6 }, 'act4.final_observers', 'starveil', 12, 4),
    opt('civic', 'Fund civilian appeals before any final decree', 'Keep local rights enforceable even where faction leaders disagree.', { gold: 69, food: 16, planks: 12 }, 'act4.final_appeals', 'tideglass', 12, 3),
    opt('engineers', 'Publish the technical review and safe-test records', 'Allow repeatable disconnected trials and public criticism.', { gold: 70, mechanisms: 8, tools: 7 }, 'act4.final_engineering', 'kilnspire', 12, 4)
]), chapter('ST4-24', 'The Proven Break', 'END OF ACT IV · THE CROWNWHEEL RECORD', [
    'The public inquiry can now explain how the deliberate emergency interruption and an unauthorized physical safeguard change combined to defeat the warning protections. Their interaction was central to the Sundering.',
    'Who ordered the covert alteration, exactly who understood its consequences, and how blame should be apportioned remain contested. The formal findings identify a mechanism, not an omniscient culprit.',
    'Veymark keeps its own civic government. Tavercale must decide what to build next without repeating the First Charter’s mistakes.'
], [
    opt('open', 'Ratify a public evidence-and-appeals accord', 'Publish the supported cause and preserve independent challenges and dissent.', { gold: 80, knowledge: 18, glass: 8 }, 'act4.final_public', 'starveil', 14, 5),
    opt('local', 'Ratify a community-first reconstruction accord', 'Fund repairs and protect independent towns while preserving evidence access.', { gold: 78, food: 20, living_timber: 8 }, 'act4.final_community', 'brackenveil', 14, 4),
    opt('safe', 'Ratify a disconnected-network safeguards accord', 'Fund technical controls, civilian oversight, and limits on future activation.', { gold: 82, mechanisms: 9, tools: 9 }, 'act4.final_safeguards', 'kilnspire', 14, 5)
]));
export const WHEEL_PUZZLES = [
    { id: 'petitions', title: 'The Petition Timeline', subtitle: 'Restore the order in which the city recorded its public requests.', requiresChapter: 'ST4-09', requiresMission: 'H24', steps: [
            { prompt: 'Which record comes first?', clue: 'The receiving ledger dates the citizens’ objection to Week 11. The interruption order is Week 13; the filing copy was entered in Week 15.', options: [{ id: 'objection', label: 'Week 11 · Citizens’ objection' }, { id: 'order', label: 'Week 13 · Interruption order' }, { id: 'copy', label: 'Week 15 · Registry filing' }], answer: 'objection', explanation: 'The petition was made before the order. Receipt does not mean it was followed.' },
            { prompt: 'What came next?', clue: 'The Week 15 filing number was assigned after the Week 13 order had already been delivered.', options: [{ id: 'copy', label: 'Week 15 · Registry filing' }, { id: 'order', label: 'Week 13 · Interruption order' }, { id: 'objection', label: 'Week 11 · Citizens’ objection' }], answer: 'order', explanation: 'The emergency order preceded the later filing of the petition copy.' },
            { prompt: 'What happened last?', clue: 'The second index clearly labels its Week 15 entry as a copy, not a new order.', options: [{ id: 'order', label: 'Week 13 · Interruption order' }, { id: 'objection', label: 'Week 11 · Citizens’ objection' }, { id: 'copy', label: 'Week 15 · Registry filing' }], answer: 'copy', explanation: 'The paperwork was copied after both the objection and the actual order.' }
        ] },
    { id: 'seals', title: 'Six Seals, One Bypass', subtitle: 'Trace the isolated authorization path without waking the machine.', requiresChapter: 'ST4-11', requiresMission: 'H27', steps: [
            { prompt: 'Which route is the ordinary authorized route?', clue: 'The approved schematic connects the five regular countersignatures before releasing the sixth seal.', options: [{ id: 'ordinary', label: 'Five checks, then sixth seal' }, { id: 'bypass', label: 'Override before the checks' }, { id: 'reverse', label: 'Sixth seal before all signatures' }], answer: 'ordinary', explanation: 'The five checks were the published ordinary authorization path.' },
            { prompt: 'Which piece of evidence indicates a physical alteration?', clue: 'The current sixth plate has new screw holes not present on the dated approved schematic.', options: [{ id: 'name', label: 'The blank operator-name field' }, { id: 'holes', label: 'Misaligned mounting holes' }, { id: 'petition', label: 'A rejected public petition' }], answer: 'holes', explanation: 'The remounted plate is physical evidence; the blank name is not proof of a particular culprit.' },
            { prompt: 'What conclusion follows from the tracing?', clue: 'The isolated replica demonstrates that the bypass could skip checks. It does not identify who used it.', options: [{ id: 'accuse', label: 'Name the unknown operator' }, { id: 'intent', label: 'Prove the operator wanted catastrophe' }, { id: 'limit', label: 'Confirm the bypass, keep identity open' }], answer: 'limit', explanation: 'A machine can demonstrate a path without revealing an operator’s private intention.' }
        ] },
    { id: 'relay', title: 'The Broken Warning Interval', subtitle: 'Order the disconnected warning strips and respect the evidence limits.', requiresChapter: 'ST4-13', requiresMission: 'H28', steps: [
            { prompt: 'Which signal is earliest?', clue: 'Strip A: privileged command at 02:14. Strip B: alert at 02:18, marked missed. Strip C: response at 02:22.', options: [{ id: 'c', label: '02:22 · Late response' }, { id: 'a', label: '02:14 · Privileged command' }, { id: 'b', label: '02:18 · Missing alert' }], answer: 'a', explanation: 'The privileged command was logged before the warning that did not arrive.' },
            { prompt: 'Which expected event is absent?', clue: 'The timing ledger reserves 02:18 for an automatic alert; its output record is blank.', options: [{ id: 'b', label: '02:18 · Warning output' }, { id: 'a', label: '02:14 · Privileged command' }, { id: 'c', label: '02:22 · Late response' }], answer: 'b', explanation: 'The expected alert is missing, but its absence does not alone explain every failure.' },
            { prompt: 'What is the last recorded event?', clue: 'The response was logged at 02:22, after the planned alert time.', options: [{ id: 'b', label: '02:18 · Missing alert' }, { id: 'c', label: '02:22 · Late response' }, { id: 'a', label: '02:14 · Privileged command' }], answer: 'c', explanation: 'The response was late. The ledger supports a timing sequence, not a complete verdict.' }
        ] },
    { id: 'custody', title: 'The Three Custodians', subtitle: 'Compare two surviving grants without assigning an imaginary signature.', requiresChapter: 'ST4-18', requiresMission: 'H30', steps: [
            { prompt: 'Which is the first authenticated record?', clue: 'The court register marks the public grant Week 7. The service revision is Week 9 and the copy is Week 12.', options: [{ id: 'grant', label: 'Week 7 · Public grant' }, { id: 'revision', label: 'Week 9 · Service revision' }, { id: 'copy', label: 'Week 12 · Later copy' }], answer: 'grant', explanation: 'The public grant predates the technical revision.' },
            { prompt: 'Which document follows the grant?', clue: 'The signed service revision has a Week 9 filing; the public copy was entered later in Week 12.', options: [{ id: 'copy', label: 'Week 12 · Archive copy' }, { id: 'revision', label: 'Week 9 · Service revision' }, { id: 'grant', label: 'Week 7 · Public grant' }], answer: 'revision', explanation: 'The technical revision came after the grant but before its archived duplicate.' },
            { prompt: 'What does the final copy establish?', clue: 'The duplicate confirms receipt of the earlier records, but has no operator-name entry.', options: [{ id: 'blame', label: 'The same person authored all three' }, { id: 'receipt', label: 'A Week 12 archival receipt, without attribution' }, { id: 'intent', label: 'A private motive for the alteration' }], answer: 'receipt', explanation: 'A later copy does not identify the author of the physical change.' }
        ] },
    { id: 'fail_safe', title: 'The Safeguard Interaction', subtitle: 'Reconstruct the isolated failure path supported by the test orchard.', requiresChapter: 'ST4-20', requiresMission: 'H31', steps: [
            { prompt: 'What is known to have been ordered?', clue: 'The emergency interruption is formally authorized and dated. The physical alteration is separate and unsigned.', options: [{ id: 'interruption', label: 'The authorized emergency interruption' }, { id: 'culprit', label: 'The identity of the covert engineer' }, { id: 'motive', label: 'The author’s private motive' }], answer: 'interruption', explanation: 'The formal interruption is documented independently.' },
            { prompt: 'What weakened the approved safety design?', clue: 'The recut protection wheel no longer follows the approved drawing; the separate alteration is not authorized by the order.', options: [{ id: 'roots', label: 'A Witnessgrove changing its memories' }, { id: 'change', label: 'The unauthorized mechanical alteration' }, { id: 'accuse', label: 'Every engineer agreeing to the change' }], answer: 'change', explanation: 'The physical safeguard was modified separately from the recorded order.' },
            { prompt: 'What can the isolated model establish?', clue: 'With both interventions present, the expected warning fails to fire. Without the altered safeguard it fires normally.', options: [{ id: 'all', label: 'The name and motive of every participant' }, { id: 'none', label: 'Nothing about the Sundering mechanism' }, { id: 'cause', label: 'The combined failure mechanism, not personal blame' }], answer: 'cause', explanation: 'The combined interruption and physical bypass defeat the warning protections in the verified model.' }
        ] }
];
export const newAct4State = () => ({ completed: [], choices: {}, access: null, review: null, evidence: [], petitionCopies: false, sealTable: false, galleryWarning: false, puzzles: { petitions: { step: 0, mistakes: 0, solved: false }, seals: { step: 0, mistakes: 0, solved: false }, relay: { step: 0, mistakes: 0, solved: false }, custody: { step: 0, mistakes: 0, solved: false }, fail_safe: { step: 0, mistakes: 0, solved: false } } });
const accessOptions = {
    witnessed: { name: 'Witnessed Public Access', cost: { gold: 34, knowledge: 8 }, faction: 'tideglass', trust: 7 },
    technical: { name: 'Technical Safety Protocol', cost: { gold: 32, tools: 5, glass: 3 }, faction: 'kilnspire', trust: 7 },
    community: { name: 'Local Stewardship Agreement', cost: { gold: 33, food: 9, planks: 5 }, faction: 'brackenveil', trust: 7 }
};
const reviewOptions = {
    distributed: { name: 'Distributed Evidence Commission', cost: { gold: 42, knowledge: 12, glass: 3 }, faction: 'starveil', trust: 7 },
    engineering: { name: 'Independent Regulator Examination', cost: { gold: 44, mechanisms: 5, tools: 5 }, faction: 'kilnspire', trust: 7 },
    public: { name: 'Public Testimony Hearings', cost: { gold: 38, planks: 8, food: 8 }, faction: 'tideglass', trust: 7 }
};
export function act4Available(s) {
    if (!s.flags['act3.complete'])
        return null;
    const ch = ACT4_CHAPTERS.find(x => !s.act4.completed.includes(x.id));
    if (!ch || ch.needs === 'access' && !s.act4.access || ch.needs === 'review' && !s.act4.review || ch.needs?.startsWith('H') && !s.adventure.completed.includes(ch.needs) || ch.needs?.startsWith('puzzle:') && !s.act4.puzzles[ch.needs.slice(7)]?.solved)
        return null;
    return ch;
}
export function act4Block(s) {
    if (!s.flags['act3.complete'])
        return null;
    const ch = ACT4_CHAPTERS.find(x => !s.act4.completed.includes(x.id));
    if (!ch)
        return null;
    if (ch.needs === 'access' && !s.act4.access)
        return 'Fund a Veymark access policy in World → Regions → Veymark.';
    if (ch.needs === 'review' && !s.act4.review)
        return 'Fund an independent interim review in World → Regions → Veymark.';
    if (ch.needs?.startsWith('H') && !s.adventure.completed.includes(ch.needs))
        return `Complete expedition ${ch.needs}: ${['H24', 'H25', 'H26'].includes(ch.needs) ? { H24: 'Hall of Petitions', H25: 'Chamber of Six Seals', H26: 'Regulator Galleries' }[ch.needs] : 'Find the new Veymark expedition in World → Expeditions'}.`;
    if (ch.needs?.startsWith('puzzle:') && !s.act4.puzzles[ch.needs.slice(7)]?.solved)
        return `Solve the ${WHEEL_PUZZLES.find(x => x.id === ch.needs?.slice(7))?.title ?? 'evidence'} puzzle in World → Regions → Veymark.`;
    return null;
}
function spend(s, cost) { for (const [key, v] of Object.entries(cost))
    if (s.resources[key] < (v ?? 0))
        throw Error(`Not enough ${key} for this commitment.`); for (const [key, v] of Object.entries(cost))
    s.resources[key] -= v ?? 0; }
function factionTrust(s, f, delta) { if (f) {
    const record = s.regional.factions[f];
    record.trust = Math.min(100, Math.max(0, record.trust + delta));
} }
export function handleAct4(s, cmd) {
    if (!s.flags['act3.complete'])
        throw Error('Complete Act III before the Veymark investigation.');
    if (s.adventure.active || s.activeExpedition || s.military.battle)
        throw Error('Complete or retreat from your current expedition or battle.');
    if (cmd.type === 'act4_puzzle') {
        const puzzle = WHEEL_PUZZLES.find(x => x.id === cmd.id);
        if (!puzzle)
            throw Error('Unknown evidence puzzle.');
        if (!s.act4.completed.includes('ST4-08') || !s.act4.completed.includes(puzzle.requiresChapter) || !s.adventure.completed.includes(puzzle.requiresMission))
            throw Error('Finish the required Veymark findings and expedition before attempting this puzzle.');
        const progress = s.act4.puzzles[puzzle.id];
        if (!progress || progress.solved)
            throw Error('This evidence sequence is already resolved.');
        const step = puzzle.steps[progress.step];
        if (!step || !step.options.some(x => x.id === cmd.answer))
            throw Error('Choose one of the available records.');
        if (cmd.answer !== step.answer) {
            progress.mistakes++;
            return { note: 'That order contradicts the visible source. Review the dates and try again.', chronicle: `The ${puzzle.title} review rejected an unsupported placement. The record remains open for correction.` };
        }
        progress.step++;
        if (progress.step === puzzle.steps.length) {
            progress.solved = true;
            s.flags['act4.puzzle_' + puzzle.id] = true;
            return { note: `${puzzle.title} reconstructed.`, chronicle: `The Council reconstructed ${puzzle.title} from authenticated records. ${step.explanation}` };
        }
        return { note: step.explanation, chronicle: `${puzzle.title}: ${step.explanation}` };
    }
    if (cmd.type === 'act4_access') {
        if (!s.act4.completed.includes('ST4-01'))
            throw Error('First record your arrival at Veymark.');
        if (s.act4.access)
            throw Error('Veymark access was already funded.');
        const d = accessOptions[cmd.policy];
        if (!d)
            throw Error('Unknown access policy.');
        spend(s, d.cost);
        s.act4.access = cmd.policy;
        factionTrust(s, d.faction, d.trust);
        s.flags['act4.access_open'] = true;
        return { note: d.name + ' ratified.', chronicle: `The delegation paid for ${d.name}, preserving Veymark's local rights and a safe documented entry to the Hall.` };
    }
    if (cmd.type === 'act4_review') {
        if (!s.act4.completed.includes('ST4-06') || !s.adventure.completed.includes('H26'))
            throw Error('The Regulator Galleries investigation must be complete before review.');
        if (s.act4.review)
            throw Error('The interim review was already funded.');
        const d = reviewOptions[cmd.policy];
        if (!d)
            throw Error('Unknown review policy.');
        spend(s, d.cost);
        s.act4.review = cmd.policy;
        factionTrust(s, d.faction, d.trust);
        s.flags['act4.independent_review'] = true;
        return { note: d.name + ' authorized.', chronicle: `Fallowbank funded ${d.name} to assess the surviving records without inventing a full explanation of the Sundering.` };
    }
    const ch = act4Available(s);
    if (!ch || ch.id !== cmd.id)
        throw Error('That Act IV chapter is not available yet.');
    const choice = ch.choices.find(x => x.id === cmd.choiceId);
    if (!choice)
        throw Error('Unknown Act IV choice.');
    spend(s, choice.cost);
    s.act4.completed.push(ch.id);
    s.act4.choices[ch.id] = choice.id;
    s.flags[choice.flag] = true;
    factionTrust(s, choice.faction, choice.trust ?? 0);
    s.adviserTrust.iven = Math.min(100, s.adviserTrust.iven + 1);
    if (ch.id === 'ST4-03') {
        s.act4.petitionCopies = true;
        s.act4.evidence.push('EV-08A');
    }
    if (ch.id === 'ST4-05') {
        s.act4.sealTable = true;
        s.act4.evidence.push('EV-08B');
    }
    if (ch.id === 'ST4-07') {
        s.act4.galleryWarning = true;
        s.act4.evidence.push('EV-08C');
    }
    if (ch.id === 'ST4-08')
        s.flags['act4.opening_complete'] = true;
    if (ch.id === 'ST4-16')
        s.flags['act4.broken_wheel_review'] = true;
    if (ch.id === 'ST4-24') {
        s.flags['act4.complete'] = true;
        s.flags['history.system_cause_confirmed'] = true;
    }
    return { note: `${ch.title} — decision recorded.`, chronicle: `${ch.title}: ${choice.label}. ${choice.detail} The recorded facts preserve the limits of the available evidence.` };
}
export function act4Invariants(s) {
    const a = s.act4;
    if (!a || !Array.isArray(a.completed) || !Array.isArray(a.evidence) || !a.choices)
        throw Error('Missing Act IV state.');
    const expected = ACT4_CHAPTERS.slice(0, a.completed.length).map(x => x.id);
    if (a.completed.length > ACT4_CHAPTERS.length || a.completed.some((id, i) => id !== expected[i]))
        throw Error('Act IV chapters out of order.');
    if (Object.keys(a.choices).length !== a.completed.length || a.completed.some(id => !ACT4_CHAPTERS.find(x => x.id === id).choices.some(c => c.id === a.choices[id])))
        throw Error('Invalid Act IV choice record.');
    if (a.access && !Object.keys(accessOptions).includes(a.access) || a.review && !Object.keys(reviewOptions).includes(a.review))
        throw Error('Invalid Act IV policy.');
    if (a.access && !a.completed.includes('ST4-01') || a.completed.includes('ST4-02') && !a.access)
        throw Error('Hall access was not authorized.');
    if (a.review && (!a.completed.includes('ST4-06') || !s.adventure.completed.includes('H26')) || a.completed.includes('ST4-08') && !a.review)
        throw Error('Invalid interim review.');
    for (const [chapterId, missionId] of [['ST4-03', 'H24'], ['ST4-05', 'H25'], ['ST4-07', 'H26']])
        if (a.completed.includes(chapterId) && !s.adventure.completed.includes(missionId))
            throw Error('Act IV evidence missing required expedition.');
    const evidence = [['ST4-03', 'EV-08A'], ['ST4-05', 'EV-08B'], ['ST4-07', 'EV-08C']].filter(([id]) => a.completed.includes(id)).map(([, id]) => id);
    if (JSON.stringify(a.evidence) !== JSON.stringify(evidence) || a.petitionCopies !== a.completed.includes('ST4-03') || a.sealTable !== a.completed.includes('ST4-05') || a.galleryWarning !== a.completed.includes('ST4-07'))
        throw Error('Act IV evidence record mismatched.');
    if (!!s.flags['act4.opening_complete'] !== a.completed.includes('ST4-08') || !!s.flags['act4.broken_wheel_review'] !== a.completed.includes('ST4-16') || !!s.flags['act4.complete'] !== a.completed.includes('ST4-24') || !!s.flags['history.system_cause_confirmed'] !== a.completed.includes('ST4-24'))
        throw Error('Act IV progress flag mismatched.');
    for (const p of WHEEL_PUZZLES) {
        const progress = a.puzzles?.[p.id];
        if (!progress || !Number.isInteger(progress.step) || progress.step < 0 || progress.step > p.steps.length || !Number.isInteger(progress.mistakes) || progress.mistakes < 0 || progress.solved !== (progress.step === p.steps.length))
            throw Error('Invalid Veymark puzzle progress.');
        if (progress.step && (!a.completed.includes(p.requiresChapter) || !s.adventure.completed.includes(p.requiresMission)))
            throw Error('Veymark puzzle evidence not yet available.');
        if (!!s.flags['act4.puzzle_' + p.id] !== progress.solved)
            throw Error('Veymark puzzle completion mismatched.');
    }
    for (const ch of ACT4_CHAPTERS) {
        if (!a.completed.includes(ch.id))
            continue;
        if (ch.needs?.startsWith('puzzle:') && !a.puzzles[ch.needs.slice(7)]?.solved)
            throw Error('Act IV chapter bypassed evidence puzzle.');
        if (ch.needs?.startsWith('H') && !s.adventure.completed.includes(ch.needs))
            throw Error('Act IV chapter bypassed expedition.');
    }
    if (a.completed.length && !s.flags['act3.complete'])
        throw Error('Act IV started before Act III.');
    if (s.flags['history.full_verdict_verified'])
        throw Error('Act IV opening does not prove the final verdict.');
}

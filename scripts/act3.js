/** Pass 20 — complete Act III, truthful history and treaty-based border decisions.
 * Commands operate only on the reducer's draft. No offscreen war, automatic annexation,
 * free population, or magical omniscience from Witnessgrove records.
 */
import { capacity } from './core.js';
const c = (id, label, detail, cost, flag, faction, trust = 0, grievance = 0, knowledge = 0) => ({ id, label, detail, cost, flag, faction, trust, grievance, knowledge });
const chapter = (id, title, tag, intro, choices, needs) => ({ id, title, tag, intro, choices, needs });
export const ACT3_CHAPTERS = [
    chapter('ST3-01', 'Orders at Dawn', 'THE EASTERN BORDER', [
        'An Eastbridge courier brings two maps bearing official seals. Both governments claim the same crossing, but their boundaries disagree.',
        'Mara asks for scouts. Nella wants both sets of records placed on the table before any soldiers leave Fallowbank.'
    ], [
        c('hear', 'Invite both communities to explain their claim', 'Pay for neutral travel and a public hearing.', { gold: 16, food: 4 }, 'act3.claim_heard', 'tideglass', 4, 0, 2),
        c('survey', 'Commission an independent survey', 'Use mapping equipment to verify the disputed markers.', { gold: 20, tools: 2 }, 'act3.claim_surveyed', 'starveil', 4, 0, 2),
        c('guard', 'Protect the existing crossing without claiming it', 'Fund patrol supplies while talks begin.', { gold: 14, food: 5 }, 'act3.claim_guarded', 'regency', 3, 0, 1)
    ]),
    chapter('ST3-02', 'Two Maps, One Road', 'THE DOCUMENTS DISAGREE', [
        'One map is older. The other shows repairs made after the Sundering. Both are genuine, and neither gives a complete answer.',
        'Iven traces the ink. “A written claim proves what was signed. It does not tell us who maintained the road after the signatures stopped mattering.”'
    ], [
        c('archive', 'Fund copies for both parties', 'An open record will make the eventual settlement harder to dispute.', { gold: 12, knowledge: 4 }, 'act3.maps_copied', 'starveil', 5, 0, 2),
        c('markers', 'Survey the road markers', 'Recover physical evidence without assigning ownership.', { gold: 17, tools: 3 }, 'act3.maps_verified', 'kilnspire', 4, 0, 1),
        c('mediation', 'Pay for a local hearing', 'Give each community a chance to describe its actual use of the crossing.', { gold: 15, food: 5 }, 'act3.maps_heard', 'tideglass', 5, 0, 1)
    ]),
    chapter('ST3-03', 'A Flag on the Crossing', 'BORDER SETTLEMENT', [
        'Both communities return to Fallowbank for a decision. The new border arrangement has already been funded, but its final terms still matter.',
        'Mara unfolds the revised patrol map. “We can keep the crossing safe without claiming either village as our own.”'
    ], [
        c('publish', 'Publish the route settlement', 'Record the rights of the two communities in the regional ledger.', { gold: 7 }, 'act3.border_published', 'tideglass', 5, 0, 1),
        c('inspect', 'Fund an independent review of the terms', 'Keep an impartial record of inspections and maintenance.', { gold: 9, knowledge: 3 }, 'act3.border_reviewed', 'starveil', 5, 0, 2),
        c('maintain', 'Contribute to joint maintenance', 'Supply road repair materials while the communities retain their own government.', { gold: 8, stone: 5 }, 'act3.border_maintained', 'regency', 3, 0, 1)
    ], 'border'),
    chapter('ST3-04', 'Iven’s Door', 'THE QUIET REGISTRY', [
        'Iven admits that his family once preserved documents about an emergency coalition. He kept the collection private because the incomplete records could implicate the wrong people.',
        'The old registry remains sealed. Its lock can be opened through careful fieldwork, but the contents must be recorded faithfully.'
    ], [
        c('respect', 'Request Iven’s help with a witnessed opening', 'Provide transport and witnesses from the public archives.', { gold: 15, planks: 3 }, 'act3.registry_witnesses', 'starveil', 5, 0, 2),
        c('independent', 'Commission a neutral records team', 'Prepare a clear chain of custody before entering the vault.', { gold: 19, knowledge: 4 }, 'act3.registry_neutral', 'tideglass', 4, 0, 2),
        c('protect', 'Secure the entrance without opening the documents', 'Pay for temporary guards while the investigation is prepared.', { gold: 13, food: 4 }, 'act3.registry_guarded', 'regency', 3, 0, 1)
    ]),
    chapter('ST3-05', 'The Family Vault', 'THE FIRST VERIFIED ORDER', [
        'Your expedition has returned from the Quiet Registry with a signed emergency interruption order. The document is authentic, but it describes the planners’ intended shutdown—not its actual result.',
        'Iven reads the names without looking up. “We know the interruption was prepared. We do not yet know why the disaster spread so far.”'
    ], [
        c('certify', 'Certify the original with an independent copy', 'Enter the emergency interruption order as verified evidence.', { gold: 12, knowledge: 3 }, 'act3.order_certified', 'starveil', 6, 0, 2),
        c('public', 'Publish a clearly limited historical report', 'Explain exactly what the recovered order does—and does not—prove.', { gold: 15, planks: 3 }, 'act3.order_public', 'tideglass', 5, 0, 2),
        c('secure', 'Preserve the order under witnessed custody', 'Create a sealed copy available to the next independent review.', { gold: 10, tools: 2 }, 'act3.order_secured', 'regency', 3, 0, 1)
    ], 'H18'),
    chapter('ST3-06', 'Pages with Missing Lines', 'THE RECORD IS INCOMPLETE', [
        'Parts of the registry were copied, while other entries were deliberately omitted. The missing passages concern the safety configuration of the ancient distribution network.',
        'Tovin notices a reference to a replacement regulator fitting. “An order is not a machine log,” he says. “We need to inspect what was actually installed.”'
    ], [
        c('compare', 'Compare the surviving archives', 'Fund the independent source comparison and keep the original intact.', { gold: 15, knowledge: 5 }, 'act3.missing_compared', 'starveil', 5, 0, 3),
        c('engineers', 'Request Kilnspire mechanical records', 'Pay for a specialist report on the replacement fittings.', { gold: 18, tools: 3 }, 'act3.missing_engineered', 'kilnspire', 6, 0, 2),
        c('witness', 'Gather local testimony', 'Hear communities whose warning signals failed before the collapse.', { gold: 12, food: 6 }, 'act3.missing_witnessed', 'brackenveil', 5, 0, 2)
    ]),
    chapter('ST3-07', 'Foundry Testimony', 'WHAT THE MACHINES SHOW', [
        'A second expedition has recovered physical inspections and an engineer’s signed maintenance report. Some safeguards do not match the approved design.',
        'Tovin rests a finger beside a changed drawing. “This is a real discrepancy. But we should verify whether it mattered when the interruption came.”'
    ], [
        c('technical', 'Register the engineering discrepancy', 'Preserve the altered fittings as independently checked evidence.', { gold: 15, tools: 3, knowledge: 3 }, 'act3.foundry_verified', 'kilnspire', 6, 0, 2),
        c('joint', 'Invite an external technical review', 'Fund both industrial and archival inspectors.', { gold: 20, glass: 2 }, 'act3.foundry_joint', 'starveil', 5, 0, 2),
        c('publish', 'Publish the findings with explicit uncertainty', 'Release a careful report and invite technical challenge.', { gold: 16, knowledge: 5 }, 'act3.foundry_public', 'tideglass', 4, 0, 3)
    ], 'H19'),
    chapter('ST3-08', 'The False Redundancy', 'A WARNING THAT DID NOT HOLD', [
        'The old relay station still holds a warning that never reached its intended settlement. A second protection circuit was added to the original regulator system.',
        'The recovered machine logs point toward a hidden alteration, but only a wider evidence review can show how the interruption interacted with it.'
    ], [
        c('compare', 'Compare all three independent records', 'Require agreement between archival testimony, physical logs, and field evidence.', { gold: 16, knowledge: 6 }, 'act3.bypass_compared', 'starveil', 6, 0, 3),
        c('stabilize', 'Secure the relay without restarting it', 'Protect the site while engineers document the machinery.', { gold: 18, mechanisms: 2 }, 'act3.bypass_stabilized', 'kilnspire', 5, 0, 2),
        c('witnesses', 'Preserve the warning as a public record', 'Let affected settlements review the recorded failure.', { gold: 14, planks: 4 }, 'act3.bypass_witnessed', 'tideglass', 5, 0, 2)
    ], 'audit'),
    chapter('ST3-09', 'The Interrupted Signal', 'THE HISTORICAL REVERSAL', [
        'Iven places the emergency interruption order beside the altered engineering plans. The first was deliberate. The second proves the machinery was no longer configured as its public records described.',
        '“This was not a simple accident,” Tovin says. “And the people who ordered the interruption may not have known what would happen. The full mechanism is still waiting in Veymark.”'
    ], [
        c('truth', 'Publish a narrowly verified statement', 'Confirm the planned interruption and altered protections without assigning unproven blame.', { gold: 16, knowledge: 5 }, 'act3.interruption_public', 'starveil', 6, 0, 3),
        c('assembly', 'Invite a cross-faction evidence commission', 'Prepare the records for a wider constitutional debate.', { gold: 20, planks: 4 }, 'act3.interruption_assembly', 'tideglass', 6, 0, 2),
        c('safeguard', 'Protect the evidence and plan a controlled expedition', 'Fund secure handling and independent access procedures.', { gold: 16, tools: 3 }, 'act3.interruption_secured', 'regency', 4, 0, 2)
    ]),
    chapter('ST3-10', 'The Regency Council', 'SECURITY AND AUTHORITY', [
        'Regent Orsen Kade arrives with organized patrol records and a proposed regional security mandate. He argues that disconnected governments could allow ancient failures to happen again.',
        'Mara accepts that the roads need protection. Nella asks who can revoke the mandate if its terms become unfair. Orsen answers directly: “Then write the limitations before you grant the power.”'
    ], [
        c('hear', 'Hear the complete Regency proposal', 'Fund an open hearing before any permanent security transfer.', { gold: 20, knowledge: 4 }, 'act3.regency_heard', 'regency', 5, 0, 2),
        c('rights', 'Demand an independent civilian review', 'Require published terms and a route to challenge the mandate.', { gold: 18, planks: 4 }, 'act3.regency_rights', 'tideglass', 5, 0, 2),
        c('defenders', 'Call a defensive planning conference', 'Request limited patrol cooperation without surrendering local authority.', { gold: 16, food: 6 }, 'act3.regency_defenders', 'regency', 4, 0, 1)
    ]),
    chapter('ST3-11', 'Mara’s Restitution', 'WHO PAID FOR SAFETY', [
        'The Eastbridge Supply Ledger names civilian wagons seized during an old emergency. Mara recognizes the officer who approved the requisition—and a signature she once defended.',
        '“Protecting a road does not give us ownership of everyone who uses it,” Mara tells the Council. The harmed families want a record, a remedy, and assurance it cannot happen again.'
    ], [
        c('apology', 'Publish the testimony and apologize', 'Open the military record and keep restitution independently reviewable.', { gold: 12, knowledge: 4 }, 'act3.mara_apology', 'tideglass', 6, 0, 2),
        c('victims', 'Fund a community-led repair board', 'Give affected families an accountable role in restoring the route.', { gold: 18, planks: 4 }, 'act3.mara_repair', 'copperwash', 5, 0, 2),
        c('discipline', 'Introduce an enforceable quartermaster rule', 'Protect civilian property through documented supply orders.', { gold: 16, tools: 3 }, 'act3.mara_rules', 'regency', 5, 0, 2)
    ], 'restitution'),
    chapter('ST3-12', 'The Frontier Votes', 'CONSENT AT THE CROSSING', [
        'Eastbridge, Beacon Ridge, and the trading communities debate the terms of their future defenses. None has agreed to annexation, and none can be treated as a voting block belonging to Fallowbank.',
        'A local representative asks whether security arrangements can be amended when circumstances change. The answer will follow your delegation to the summit.'
    ], [
        c('local', 'Recognize local votes and an appeal procedure', 'Allow settlements to revise mutual-defense terms through documented consent.', { gold: 14, knowledge: 5 }, 'act3.frontier_local', 'tideglass', 7, 0, 2),
        c('safety', 'Offer a renewable defensive charter', 'Protect local autonomy with scheduled review and clear duties.', { gold: 20, food: 6 }, 'act3.frontier_safety', 'regency', 5, 0, 2),
        c('public', 'Publish the regional decision records', 'Ensure that later delegates can inspect the exact promises made.', { gold: 12, planks: 5 }, 'act3.frontier_public', 'starveil', 6, 0, 2)
    ]),
    chapter('ST3-13', 'Delegates Gather', 'SIX POWERS, SIX INTERESTS', [
        'Representatives of Copperwash, Brackenveil, Kilnspire, the Regency, Starveil, and Tideglass arrive under separate standards. Every delegation needs a different assurance.',
        'Iven places the recovered interruption order and engineering findings on a table accessible to all six factions. It is evidence of a planned shutdown and altered safeguards—not a verdict on every person involved.'
    ], [
        c('exchange', 'Offer shared access to verified copies', 'Provide each delegation an independently comparable archive.', { gold: 22, glass: 3 }, 'act3.delegates_archive', 'starveil', 7, 0, 3),
        c('listening', 'Hold six listening sessions', 'Give representatives time to name their precise conditions.', { gold: 18, food: 9 }, 'act3.delegates_listened', 'tideglass', 6, 0, 2),
        c('records', 'Fund a public summit record', 'Preserve disputed demands and agreements without inventing unanimity.', { gold: 20, planks: 6 }, 'act3.delegates_public', 'copperwash', 5, 0, 3)
    ]),
    chapter('ST3-14', 'Terms of Protection', 'THE CONTINENTAL SUMMIT', [
        'Orsen proposes a common security mandate. Tideglass insists that communities retain a lawful exit. Starveil wants the technical records inspectable; Brackenveil demands safeguards for the groves.',
        'The Council cannot make all six factions agree. It can fund a concrete framework that two or more parties are willing to discuss, then record the objections honestly.'
    ], [
        c('limited', 'Publish the agreed limits of authority', 'Record the summit framework, including local inspection and emergency review.', { gold: 24, knowledge: 6 }, 'act3.summit_limited', 'tideglass', 7, 0, 3),
        c('protected', 'Negotiate a bounded defense arrangement', 'Propose coordination with explicit civilian oversight.', { gold: 20, tools: 4 }, 'act3.summit_protected', 'regency', 7, 0, 2),
        c('audit', 'Establish an open technical evidence committee', 'Separate the historical investigation from the authority to operate machinery.', { gold: 18, glass: 4 }, 'act3.summit_audit', 'starveil', 7, 0, 3)
    ], 'summit'),
    chapter('ST3-15', 'The Broken Table', 'A SUMMIT WITH CONSEQUENCES', [
        'Not every delegation endorses the summit proposal. The disagreement is real, but several representatives are still willing to work together on a controlled investigation.',
        'The player must decide whether to preserve the partial agreement, seek renewed talks, or establish a narrower temporary arrangement. A failed congress does not destroy access to the main story.'
    ], [
        c('partial', 'Preserve the signed partial agreement', 'Record exactly which parties participated and what they promised.', { gold: 14, planks: 4 }, 'act3.summit_partial', 'tideglass', 5, 0, 2),
        c('reconvene', 'Fund continued negotiations', 'Keep independent representatives involved without compelling assent.', { gold: 25, food: 6 }, 'act3.summit_reconvene', 'copperwash', 5, 0, 2),
        c('temporary', 'Approve a temporary records-and-security protocol', 'Establish a limited, reversible framework for reaching Veymark.', { gold: 20, tools: 4 }, 'act3.summit_temporary', 'regency', 5, 0, 2)
    ]),
    chapter('ST3-16', 'The Last Convoy', 'ROAD TO THE CROWNFALL BASIN', [
        'The Crownroad Survey has returned with a verified approach to Veymark. Supply logs show which sections of the ancient route can still carry a party, and which bridges need care.',
        'Rook sets out a compact map. “We have a passage. How we travel it will decide who comes with us, and what the other governments believe we intend.”'
    ], [
        c('routes', 'Publish the road-survey findings', 'Give local communities warning of the expedition and its supply needs.', { gold: 18, knowledge: 4 }, 'act3.convoy_survey', 'tideglass', 5, 0, 2),
        c('carts', 'Prepare construction wagons', 'Fund the repair materials required by the most dangerous crossings.', { gold: 24, planks: 6 }, 'act3.convoy_carts', 'kilnspire', 5, 0, 2),
        c('witness', 'Invite neutral observers to accompany the convoy', 'Ensure the ancient capital approach is not mistaken for a secret seizure.', { gold: 20, food: 8 }, 'act3.convoy_witness', 'starveil', 6, 0, 2)
    ], 'H22'),
    chapter('ST3-17', 'A Route to Veymark', 'CHOSEN APPROACH', [
        'Fallowbank has funded a legitimate route into the Crownfall Basin. The party will carry the recovered records, while independent partners keep their own authority.',
        'Mara says the route is secure enough to attempt, not safe enough to underestimate. Iven insists that every recovered seal and authorization be witnessed.'
    ], [
        c('passage', 'Ratify the travel conditions', 'Make the chosen passage and its permissions part of the public expedition order.', { gold: 15, knowledge: 4 }, 'act3.route_public', 'tideglass', 6, 0, 2),
        c('supply', 'Reinforce the expedition supplies', 'Prepare a safe return route and a limited repair reserve.', { gold: 18, food: 7 }, 'act3.route_supplied', 'kilnspire', 5, 0, 2),
        c('archive', 'Commission evidence custody for the capital', 'Make copies traceable so no single government controls the originals.', { gold: 16, planks: 4 }, 'act3.route_witnessed', 'starveil', 6, 0, 3)
    ], 'route'),
    chapter('ST3-18', 'The Gate of Stone', 'VEYMARK AUTHORIZATION', [
        'The Gate of Stone mission has returned with a surviving privileged authorization command. The seal proves access continued immediately before the Sundering, but cannot tell us what every operator intended.',
        'The findings open the approach to Veymark. The original Crownwheel and the full hidden bypass remain inside the ruined city; they are not yet verified facts.'
    ], [
        c('register', 'Register the authorization record with witnesses', 'Preserve source dates and operating context for a future independent review.', { gold: 20, knowledge: 5 }, 'act3.gate_registered', 'starveil', 7, 0, 3),
        c('shared', 'Give participating communities their own copies', 'Prevent a single government from holding the only surviving gate evidence.', { gold: 18, glass: 3 }, 'act3.gate_shared', 'tideglass', 7, 0, 2),
        c('secure', 'Stabilize the gate and preserve its original controls', 'Protect the surviving mechanism without restarting the Crownwheel.', { gold: 22, mechanisms: 3 }, 'act3.gate_stable', 'kilnspire', 6, 0, 2)
    ], 'H23'),
    chapter('ST3-19', 'The Public Charge', 'THE FINAL ACT III FINDING', [
        'The Council presents evidence of the emergency interruption, the altered approved safeguards, and the privileged commands still active near Veymark. The full cause-and-effect chain cannot be established without the machinery inside the capital.',
        'The delegates disagree about blame and future authority. They agree, at least, that the investigation must continue. Fallowbank records the road by which the gate was reached.'
    ], [
        c('open', 'Publish the verified Act III findings', 'Give all participating communities an inspectable statement and explicitly preserve unresolved questions.', { gold: 20, knowledge: 6 }, 'act3.public_charge_open', 'starveil', 8, 0, 3),
        c('joint', 'Authorize a multi-faction capital investigation', 'Seek independent oversight rather than unilateral control of the surviving network.', { gold: 24, planks: 5 }, 'act3.public_charge_joint', 'tideglass', 7, 0, 3),
        c('protected', 'Fund a protected, limited exploration charter', 'Respect regional sovereignty while securing evidence and damaged infrastructure.', { gold: 26, tools: 4 }, 'act3.public_charge_guarded', 'regency', 6, 0, 2)
    ])
];
export const newAct3State = () => ({ completed: [], choices: {}, border: null, audit: null, evidence: [], publicRecord: false, regency: null, restitution: null, summit: null, route: null, summitSupport: [], gateRecord: false });
const spend = (s, cost) => { for (const [key, amount] of Object.entries(cost))
    if (!Number.isInteger(amount) || (amount ?? 0) < 0 || s.resources[key] < (amount ?? 0))
        throw Error('Insufficient resources for this political commitment.'); for (const [key, amount] of Object.entries(cost))
    s.resources[key] -= amount ?? 0; };
const influence = (s, faction, trust, grievance) => { const x = s.regional.factions[faction]; x.trust = Math.max(0, Math.min(100, x.trust + trust)); x.grievances = Math.max(0, Math.min(20, x.grievances + grievance)); x.influence = Math.min(100, x.influence + 1); };
export function act3Available(s) { if (!s.flags['act2.complete'])
    return null; const ch = ACT3_CHAPTERS.find(x => !s.act3.completed.includes(x.id)); if (!ch)
    return null; if (ch.needs === 'border' && !s.act3.border)
    return null; if (ch.needs === 'restitution' && (!s.act3.regency || !s.act3.restitution || !s.adventure.completed.includes('H21')))
    return null; if (ch.needs === 'summit' && !s.act3.summit)
    return null; if (ch.needs === 'route' && !s.act3.route)
    return null; if (ch.needs === 'audit' && (!s.act3.audit || !s.adventure.completed.includes('H20')))
    return null; if (ch.needs?.startsWith('H') && !s.adventure.completed.includes(ch.needs))
    return null; return ch; }
export function act3Block(s) { if (!s.flags['act2.complete'])
    return null; const ch = ACT3_CHAPTERS.find(x => !s.act3.completed.includes(x.id)); if (!ch)
    return null; if (ch.needs === 'border' && !s.act3.border)
    return 'Choose and fund a border arrangement in World → Regions → Act III before ST3-03.'; if (ch.needs === 'restitution') {
    if (!s.adventure.completed.includes('H21'))
        return 'Complete H21: The Eastbridge Supply Ledger after the Regency Council.';
    if (!s.act3.regency)
        return 'Choose the funded Regency response in World → Regions → Act III.';
    if (!s.act3.restitution)
        return 'Fund Mara’s restitution or reform in World → Regions → Act III.';
} if (ch.needs === 'summit' && !s.act3.summit)
    return 'Fund a practical six-faction summit proposal in World → Regions → Act III.'; if (ch.needs === 'route' && !s.act3.route)
    return 'Choose and supply a valid route to Veymark in World → Regions → Act III.'; if (ch.needs === 'H18' && !s.adventure.completed.includes('H18'))
    return 'Complete expedition H18: The Quiet Registry Vault to recover the original interruption order.'; if (ch.needs === 'H19' && !s.adventure.completed.includes('H19'))
    return 'Complete expedition H19: Foundry Testimony to check the safety changes.'; if (ch.needs === 'H22' && !s.adventure.completed.includes('H22'))
    return 'Complete H22: The Crownroad Survey to find a supply-safe route to the capital.'; if (ch.needs === 'H23' && !s.adventure.completed.includes('H23'))
    return 'Complete H23: The Gate of Stone, after choosing a funded Veymark route.'; if (ch.needs === 'audit') {
    if (!s.adventure.completed.includes('H20'))
        return 'Complete H20: The Regulator Relay to recover the missing warning.';
    if (!s.act3.audit)
        return 'Choose a funded independent evidence review in World → Regions → Act III.';
} return null; }
export function handleAct3(s, cmd) {
    if (!s.flags['act2.complete'])
        throw Error('Ratify the Act II regional settlement before entering Act III.');
    const a = s.act3;
    if (s.adventure.active || s.activeExpedition || s.military.battle)
        throw Error('Complete the current adventure or battle first.');
    switch (cmd.type) {
        case 'act3_border': {
            if (!a.completed.includes('ST3-02'))
                throw Error('Review both border maps before selecting a settlement.');
            if (a.border)
                throw Error('The border settlement is already agreed.');
            const choices = { arbitration: { cost: { gold: 32, knowledge: 6 }, faction: 'starveil', trust: 7, name: 'Independent Arbitration' }, shared_access: { cost: { gold: 29, planks: 5, food: 5 }, faction: 'tideglass', trust: 8, name: 'Shared Access Charter' }, defensive_watch: { cost: { gold: 33, stone: 8, tools: 3 }, faction: 'regency', trust: 6, name: 'Defensive Crossing Watch' } };
            const def = choices[cmd.approach];
            if (!def)
                throw Error('Unknown border approach.');
            spend(s, def.cost);
            a.border = cmd.approach;
            influence(s, def.faction, def.trust, 0);
            s.flags['act3.border_settled'] = true;
            // This does not annex Eastbridge or overwrite local sovereignty.
            return { note: `${def.name} funded at Eastbridge. Both towns retain their government.`, chronicle: `The disputed crossing was secured through ${def.name}. Eastbridge and Fallowbank retained their distinct administrations.` };
        }
        case 'act3_audit': {
            if (!a.completed.includes('ST3-07') || !s.adventure.completed.includes('H20'))
                throw Error('Investigate the foundry and regulator relay before reviewing all records.');
            if (a.audit)
                throw Error('A final verification process is already underway.');
            const options = { open_commission: { cost: { gold: 30, knowledge: 7 }, faction: 'starveil', name: 'Independent Evidence Commission' }, engineering_review: { cost: { gold: 34, mechanisms: 3, tools: 3 }, faction: 'kilnspire', name: 'Engineering Review' }, witness_copies: { cost: { gold: 28, planks: 5, knowledge: 5 }, faction: 'tideglass', name: 'Distributed Witness Copies' } };
            const def = options[cmd.approach];
            if (!def)
                throw Error('Unknown audit process.');
            spend(s, def.cost);
            a.audit = cmd.approach;
            influence(s, def.faction, 7, 0);
            s.flags['act3.independent_review'] = true;
            return { note: `${def.name} funded and recorded.`, chronicle: `Fallowbank created ${def.name}, ensuring the recovered interruption and machine records could be checked independently.` };
        }
        case 'act3_regency': {
            if (!a.completed.includes('ST3-10') || a.regency)
                throw Error('Regency terms are unavailable or already recorded.');
            const options = { limited_security: { name: 'Limited Security Compact', cost: { gold: 28, tools: 3, food: 5 }, faction: 'regency' }, civic_guarantees: { name: 'Civic Review Charter', cost: { gold: 24, knowledge: 7 }, faction: 'tideglass' }, independent_coalition: { name: 'Independent Border Coalition', cost: { gold: 32, planks: 5, food: 6 }, faction: 'copperwash' } };
            const o = options[cmd.approach];
            if (!o)
                throw Error('Unknown Regency response.');
            spend(s, o.cost);
            a.regency = cmd.approach;
            influence(s, o.faction, 8, 0);
            s.flags['act3.regency_terms_recorded'] = true;
            return { note: `${o.name} ratified without annexation.`, chronicle: `The Regency question was addressed through ${o.name}. Local governments retained their legal authority; any outside protection remains subject to recorded terms.` };
        }
        case 'act3_restitution': {
            if (a.restitution)
                throw Error('Mara’s restitution was already recorded.');
            if (!a.completed.includes('ST3-10') || !s.adventure.completed.includes('H21'))
                throw Error('Examine the Eastbridge Supply Ledger before Mara’s restitution.');
            const options = { repay_wagons: { name: 'Restore Requisitioned Supplies', cost: { gold: 35, food: 8 }, faction: 'copperwash' }, public_inquiry: { name: 'Public Military Inquiry', cost: { gold: 25, knowledge: 8 }, faction: 'tideglass' }, supply_reform: { name: 'Civilian Supply Protection', cost: { gold: 28, tools: 4, planks: 4 }, faction: 'regency' } };
            const o = options[cmd.approach];
            if (!o)
                throw Error('Unknown restitution proposal.');
            spend(s, o.cost);
            a.restitution = cmd.approach;
            influence(s, o.faction, 9, 0);
            s.adviserTrust.mara = Math.min(100, s.adviserTrust.mara + 8);
            s.flags['act3.mara_accountability'] = true;
            return { note: `${o.name} completed. Mara’s accountability record is public.`, chronicle: `Mara and Fallowbank addressed past emergency seizures through ${o.name}, with an acknowledged record of affected civilians and safeguards against repetition.` };
        }
        case 'act3_summit': {
            if (!a.completed.includes('ST3-13') || a.summit)
                throw Error('The six-faction summit is not yet convened or is already funded.');
            const options = { shared_council: { name: 'Shared Council Framework', cost: { gold: 44, knowledge: 10, food: 8 }, support: ['tideglass', 'copperwash', 'brackenveil'] }, regulated_security: { name: 'Bounded Security Framework', cost: { gold: 42, tools: 6, planks: 6 }, support: ['regency', 'kilnspire', 'copperwash'] }, independent_inspection: { name: 'Independent Technical Inspection', cost: { gold: 38, glass: 5, knowledge: 10 }, support: ['starveil', 'tideglass', 'kilnspire'] } };
            const o = options[cmd.approach];
            if (!o)
                throw Error('Unknown summit proposal.');
            spend(s, o.cost);
            a.summit = cmd.approach;
            a.summitSupport = [...o.support];
            for (const f of o.support)
                influence(s, f, 5, 0);
            s.flags['act3.summit_framework'] = true;
            return { note: `${o.name} funded. Three delegations provisionally support the approach; the others retain their objections.`, chronicle: `The six delegations discussed ${o.name}. ${o.support.join(', ')} offered provisional cooperation, not a universal constitutional commitment.` };
        }
        case 'act3_route': {
            if (a.route)
                throw Error('A Veymark passage has already been funded.');
            if (!a.completed.includes('ST3-16'))
                throw Error('Complete the Crownroad survey and convoy preparations before choosing a passage.');
            const options = { negotiated: { name: 'Negotiated Safe Passage', cost: { gold: 46, knowledge: 8, food: 8 }, faction: 'tideglass' }, engineered: { name: 'Repaired Stone Causeway', cost: { gold: 40, planks: 10, tools: 5 }, faction: 'kilnspire' }, scouted: { name: 'Surveyed Wilderness Approach', cost: { gold: 32, food: 12, knowledge: 7 }, faction: 'brackenveil' }, escorted: { name: 'Protected Convoy', cost: { gold: 38, food: 10, iron: 4 }, faction: 'regency' } };
            const o = options[cmd.approach];
            if (!o)
                throw Error('Unknown Crownfall route.');
            spend(s, o.cost);
            a.route = cmd.approach;
            influence(s, o.faction, 7, 0);
            s.flags['act3.crownfall_passage_open'] = true;
            return { note: `${o.name} prepared for the Gate of Stone expedition.`, chronicle: `Fallowbank entered the Crownfall approach through ${o.name}, paying for a real route while preserving independent communities' territorial rights.` };
        }
        case 'act3_story': {
            const ch = act3Available(s);
            if (!ch || ch.id !== cmd.id)
                throw Error('That Act III chapter is not available yet.');
            const chosen = ch.choices.find(c => c.id === cmd.choiceId);
            if (!chosen)
                throw Error('Unknown Act III choice.');
            spend(s, chosen.cost);
            a.completed.push(ch.id);
            a.choices[ch.id] = chosen.id;
            s.flags[chosen.flag] = true;
            if (chosen.faction)
                influence(s, chosen.faction, chosen.trust ?? 0, chosen.grievance ?? 0);
            if (chosen.knowledge)
                s.resources.knowledge = Math.min(capacity(s, 'knowledge'), s.resources.knowledge + chosen.knowledge);
            if (ch.id === 'ST3-05') {
                a.evidence.push('EV-06');
                s.flags['history.interruption_order_verified'] = true;
            }
            if (ch.id === 'ST3-07') {
                a.evidence.push('EV-07');
                s.flags['history.engineering_discrepancy_verified'] = true;
            }
            if (ch.id === 'ST3-09') {
                s.flags['act3.interruption_confirmed'] = true;
                a.publicRecord = chosen.id === 'truth' || chosen.id === 'assembly';
            }
            if (ch.id === 'ST3-18') {
                a.gateRecord = true;
                s.flags['act3.gate_authorization_recorded'] = true;
            }
            if (ch.id === 'ST3-19') {
                s.flags['act3.complete'] = true;
                s.flags['act3.crownfall_open'] = true;
            }
            return { note: `${ch.title}: ${chosen.label}.`, chronicle: `${ch.title} — ${chosen.label}. ${ch.intro[ch.intro.length - 1]}${ch.id === 'ST3-09' ? ' The deliberate interruption and altered safeguards have been confirmed; the complete Sundering mechanism remains unresolved.' : ''}` };
        }
    }
}
export function act3Invariants(s) { const a = s.act3; if (!a || !Array.isArray(a.completed) || !Array.isArray(a.evidence))
    throw Error('Missing Act III state.'); const ids = new Set(ACT3_CHAPTERS.map(x => x.id)); if (a.completed.some(x => !ids.has(x)) || new Set(a.completed).size !== a.completed.length)
    throw Error('Invalid Act III history.'); if (a.completed.some((id, i) => id !== ACT3_CHAPTERS[i]?.id))
    throw Error('Out of order Act III chapters.'); if (Object.keys(a.choices).length !== a.completed.length || a.completed.some(id => !ACT3_CHAPTERS.find(x => x.id === id).choices.some(c => c.id === a.choices[id])))
    throw Error('Invalid Act III choice record.'); if (a.border && !['arbitration', 'shared_access', 'defensive_watch'].includes(a.border))
    throw Error('Invalid border settlement.'); if (a.audit && !['open_commission', 'engineering_review', 'witness_copies'].includes(a.audit))
    throw Error('Invalid historical audit.'); if (a.regency && !['limited_security', 'civic_guarantees', 'independent_coalition'].includes(a.regency))
    throw Error('Invalid Regency approach.'); if (a.restitution && !['repay_wagons', 'public_inquiry', 'supply_reform'].includes(a.restitution))
    throw Error('Invalid Mara restitution.'); if (a.summit && !['shared_council', 'regulated_security', 'independent_inspection'].includes(a.summit))
    throw Error('Invalid summit approach.'); if (a.route && !['negotiated', 'engineered', 'scouted', 'escorted'].includes(a.route))
    throw Error('Invalid Crownfall route.'); if (!Array.isArray(a.summitSupport) || new Set(a.summitSupport).size !== a.summitSupport.length || a.summitSupport.some(f => !['copperwash', 'brackenveil', 'kilnspire', 'regency', 'starveil', 'tideglass'].includes(f)) || (!!a.summit !== !!a.summitSupport.length))
    throw Error('Invalid summit endorsements.'); if (a.completed.includes('ST3-03') && !a.border)
    throw Error('Border agreement missing.'); if (a.audit && !a.completed.includes('ST3-07'))
    throw Error('Audit before technical evidence.'); if (a.regency && !a.completed.includes('ST3-10'))
    throw Error('Regency record before negotiations.'); if (a.restitution && (!a.regency || !s.adventure.completed.includes('H21')))
    throw Error('Mara restitution lacks source evidence.'); if (a.completed.includes('ST3-11') && (!a.regency || !a.restitution || !s.adventure.completed.includes('H21')))
    throw Error('Military accountability bypassed.'); if (a.summit && !a.completed.includes('ST3-13'))
    throw Error('Summit prior to delegates.'); if (a.completed.includes('ST3-14') && !a.summit)
    throw Error('Summit chapter without framework.'); if (a.route && !a.completed.includes('ST3-16'))
    throw Error('Route selected before convoy.'); if (a.completed.includes('ST3-17') && !a.route)
    throw Error('Veymark chapter without passage.'); if (a.completed.includes('ST3-18') && !s.adventure.completed.includes('H23'))
    throw Error('Gate decision without expedition.'); if (a.completed.includes('ST3-16') && !s.adventure.completed.includes('H22'))
    throw Error('Convoy without survey.'); if (a.gateRecord !== a.completed.includes('ST3-18'))
    throw Error('Gate record mismatched.'); if (Boolean(s.flags['act3.complete']) !== a.completed.includes('ST3-19'))
    throw Error('Act III conclusion inconsistent.'); if (new Set(a.evidence).size !== a.evidence.length || a.evidence.some(x => !['EV-06', 'EV-07'].includes(x)))
    throw Error('Invalid history evidence.'); if (a.evidence.includes('EV-06') !== a.completed.includes('ST3-05') || a.evidence.includes('EV-07') !== a.completed.includes('ST3-07'))
    throw Error('Evidence does not match historical verification.'); if (a.completed.length && !s.flags['act2.complete'])
    throw Error('Act III without Act II completion.'); if (s.flags['act3.interruption_confirmed'] !== a.completed.includes('ST3-09') && Boolean(s.flags['act3.interruption_confirmed'] || a.completed.includes('ST3-09')))
    throw Error('Act III conclusion inconsistent.'); }

/** Pass 17: authored Act II chapters, three external trade gateways, multi-settlement improvements.
 * Foreign communities are never treated as owned sectors or free local labor.
 */
import { capacity } from './core.js';
import { FACTIONS, routeBetween } from './regional.js';
import { militaryPersonnel } from './military.js';
export const GATEWAYS = [
    { id: 'ironspine', name: 'Ironspine Heights', anchor: 'HM-05', faction: 'kilnspire', openAfter: 'ST2-06', icon: '⛏', summary: 'Highland foundries, mountain engineers and old machine records.' },
    { id: 'brackenveil', name: 'Brackenveil Wilds', anchor: 'HM-06', faction: 'brackenveil', openAfter: 'ST2-09', icon: '❧', summary: 'Protected groves, medicinal herbs and forgotten water agreements.' },
    { id: 'copperwash_coast', name: 'Copperwash Coast', anchor: 'HM-03', faction: 'tideglass', openAfter: 'ST2-12', icon: '≋', summary: 'Free ports, navigators and maritime archives.' }
];
export const FRONTIER_OFFERS = [
    { id: 'highland-ore', gateway: 'ironspine', name: 'Highland Ore Exchange', send: { gold: 24, timber: 7 }, receive: { iron_ore: 9, stone: 4 }, description: 'Buy surveyed ore and masonry from mountain producers.' },
    { id: 'foundry-tools', gateway: 'ironspine', name: 'Kilnspire Toolmakers', send: { gold: 34, planks: 6 }, receive: { iron: 5, tools: 5 }, description: 'Order refined metal and durable equipment from independent workshops.' },
    { id: 'forest-medicine', gateway: 'brackenveil', name: 'Brackenveil Herbal Compact', send: { gold: 18, food: 8 }, receive: { herbs: 10, medicine: 3 }, description: 'Supply a protected community and receive carefully cultivated remedies.' },
    { id: 'grove-research', gateway: 'brackenveil', name: 'Witnessgrove Survey', send: { gold: 20, tools: 3 }, receive: { knowledge: 11, herbs: 4 }, description: 'Fund a regional records survey without excavating living roots.' },
    { id: 'coast-market', gateway: 'copperwash_coast', name: 'Copperwash Cargo Exchange', send: { planks: 8, bricks: 4, gold: 18 }, receive: { gold: 48, knowledge: 3 }, description: 'Send processed materials to the coastal markets for a contracted return.' },
    { id: 'tideglass-contract', gateway: 'copperwash_coast', name: 'Tideglass Navigation Contract', send: { gold: 25, tools: 4 }, receive: { knowledge: 10, medicine: 4 }, description: 'Commission navigators and obtain maritime study notes.' }
];
const make = (id, title, region, intro, choices) => ({ id, title, region, intro, choices });
const opt = (id, label, detail, cost, faction, trust, trade, flag, grievance = 0, knowledge = 0) => ({ id, label, detail, cost, faction, trust, trade, flag, grievance, knowledge });
export const ACT2_EXPANSION = [
    make('ST2-04', 'The Furnace Writ', 'Kilnspire', [
        'The Kilnspire Houses send a sealed industrial writ to Fallowbank. The old mountain lifts have begun moving again, but several workshops dispute who owns the access road.',
        'Tovin studies the signatures. “A route is useful only when the people maintaining it can agree on the rules.”'
    ], [
        opt('workers', 'Protect the mountain workers', 'Pay 20 Gold and 3 Tools. Give workers a voice in the access agreement.', { gold: 20, tools: 3 }, 'kilnspire', 7, 2, 'act2.kilnspire_workers'),
        opt('survey', 'Commission an independent survey', 'Spend 10 Gold and 4 Food to map the old lift safely.', { gold: 10, food: 4 }, 'kilnspire', 4, 3, 'act2.kilnspire_survey', 0, 2),
        opt('owners', 'Accept the owners’ priority contract', 'Pay 8 Gold for fast access, but raise a local grievance.', { gold: 8 }, 'kilnspire', 2, 6, 'act2.kilnspire_owners', 1)
    ]),
    make('ST2-05', 'Under Kilnspire', 'Kilnspire', [
        'The lift leads into an abandoned regulator hall. Some plates show the authorized safety layout; other fittings were installed later.',
        'Pella asks for enough light and room to copy the markings before anyone starts the machinery.'
    ], [
        opt('engineers', 'Fund a careful engineering team', '15 Gold and 3 Iron; technical study improves historical knowledge.', { gold: 15, iron: 3 }, 'kilnspire', 6, 2, 'act2.machine_studied', 0, 3),
        opt('records', 'Preserve the technical ledger', '8 Gold and 5 Knowledge; create an independently witnessed copy.', { gold: 8, knowledge: 5 }, 'kilnspire', 5, 1, 'act2.machine_recorded', 0, 2),
        opt('stabilize', 'Stabilize only the public access route', '12 Gold and 6 Timber; prioritize immediate transport safety.', { gold: 12, timber: 6 }, 'kilnspire', 4, 4, 'act2.machine_route')
    ]),
    make('ST2-06', 'The Unpaid Engineers', 'Kilnspire', [
        'Former lift engineers ask the Council to honor an old payment record that their employers refuse to recognize.',
        'Tovin says, “If we profit from this road, we should know who built it—and whether they were ever paid.”'
    ], [
        opt('settle', 'Fund a shared settlement', 'Spend 25 Gold and 3 Tools; open supervised Ironspine trade.', { gold: 25, tools: 3 }, 'kilnspire', 8, 4, 'act2.engineers_repaid'),
        opt('arbitrate', 'Commission independent arbitration', 'Spend 12 Gold and 6 Knowledge; open Ironspine by a documented agreement.', { gold: 12, knowledge: 6 }, 'kilnspire', 6, 3, 'act2.engineers_arbitrated'),
        opt('lease', 'Secure a limited operating lease', 'Spend 15 Gold; open Ironspine but register a labor grievance.', { gold: 15 }, 'kilnspire', 3, 6, 'act2.engineers_lease', 1)
    ]),
    make('ST2-07', 'The Green Boundary', 'Brackenveil', [
        'The Brackenveil Circles report that a repaired road crosses the roots of a surviving Witnessgrove.',
        'Sella warns that a little convenience for a caravan can become a lasting cost to a living forest.'
    ], [
        opt('restore', 'Protect the root crossing', 'Spend 12 Gold and 6 Timber to protect the old roots.', { gold: 12, timber: 6 }, 'brackenveil', 8, 2, 'act2.grove_route_protected'),
        opt('survey', 'Study the water route', 'Spend 9 Gold and 3 Herbs; document the habitat before changing the road.', { gold: 9, herbs: 3 }, 'brackenveil', 6, 2, 'act2.grove_surveyed', 0, 2),
        opt('direct', 'Keep the direct commercial route', 'Spend 6 Gold; maintain traffic but record one grievance.', { gold: 6 }, 'brackenveil', 1, 5, 'act2.grove_route_direct', 1)
    ]),
    make('ST2-08', 'The Living Witness', 'Brackenveil', [
        'A grove keeper shows an inscription laid down before the Sundering. It describes a formal water agreement whose clauses no longer match the river.',
        'Iven recognizes the pattern. “The grove remembers what people recorded. It does not decide what is fair.”'
    ], [
        opt('copy', 'Share copies with local communities', 'Spend 5 Knowledge and 10 Gold to create a public record.', { knowledge: 5, gold: 10 }, 'brackenveil', 7, 2, 'act2.grove_record_public', 0, 3),
        opt('protect', 'Preserve the original inscription', 'Spend 8 Herbs and 6 Food supporting grove stewards.', { herbs: 8, food: 6 }, 'brackenveil', 7, 1, 'act2.grove_record_protected', 0, 2),
        opt('archive', 'Take an official survey copy', 'Spend 12 Gold on expert transcription.', { gold: 12 }, 'brackenveil', 3, 3, 'act2.grove_record_official', 0, 1)
    ]),
    make('ST2-09', 'The Watershed Petition', 'Brackenveil', [
        'Nearby settlements demand reliable water while the Circles ask that the grove remain protected. There is no single perfect solution.',
        'Bera places the resource estimates beside Sella’s map. The Council must put real terms to its promises.'
    ], [
        opt('shared', 'Create a shared watershed charter', 'Spend 22 Gold and 5 Stone; protect local access and open Brackenveil routes.', { gold: 22, stone: 5 }, 'brackenveil', 9, 3, 'act2.watershed_shared'),
        opt('restoration', 'Finance a restoration agreement', 'Spend 14 Gold and 7 Herbs; open routes under ecological limits.', { gold: 14, herbs: 7 }, 'brackenveil', 8, 2, 'act2.watershed_restored'),
        opt('temporary', 'Arrange temporary monitored access', 'Spend 10 Gold and 6 Food; open the route but retain one grievance.', { gold: 10, food: 6 }, 'brackenveil', 3, 5, 'act2.watershed_temporary', 1)
    ]),
    make('ST2-10', 'The Tideglass Map', 'Tideglass', [
        'A navigator unfolds a coastal chart. Several ports have kept their independence even as inland governments changed.',
        '“A road can lead to a market,” the navigator says, “without giving the market ownership of everyone on the road.”'
    ], [
        opt('ports', 'Respect the independent port charters', 'Spend 15 Gold and 3 Planks.', { gold: 15, planks: 3 }, 'tideglass', 8, 3, 'act2.ports_independent'),
        opt('survey', 'Survey an alternate shoreline route', 'Spend 12 Gold and 4 Food to commission navigation charts.', { gold: 12, food: 4 }, 'tideglass', 5, 4, 'act2.coastal_survey', 0, 2),
        opt('concession', 'Offer priority access for Fallowbank cargo', 'Spend 8 Gold; open stronger trade prospects with one grievance.', { gold: 8 }, 'tideglass', 2, 6, 'act2.coastal_concession', 1)
    ]),
    make('ST2-11', 'Lantern at Stormbreak', 'Tideglass', [
        'Stormbreak Lighthouse has failed. Fishing boats use dangerous passages while a dispute over repair costs delays the work.',
        'Rook points to the dark tower. “We can find the fault, but the people using this coast must decide who keeps it lit.”'
    ], [
        opt('repair', 'Supply a joint lighthouse repair', 'Spend 18 Gold, 5 Stone and 2 Tools.', { gold: 18, stone: 5, tools: 2 }, 'tideglass', 8, 3, 'act2.stormbreak_repaired'),
        opt('guides', 'Hire experienced coastal guides', 'Spend 16 Gold and 5 Food. Gather navigational evidence.', { gold: 16, food: 5 }, 'tideglass', 5, 4, 'act2.stormbreak_guides', 0, 2),
        opt('records', 'Restore the old maritime logbook', 'Spend 7 Knowledge and 8 Gold.', { knowledge: 7, gold: 8 }, 'tideglass', 6, 2, 'act2.stormbreak_logbook', 0, 3)
    ]),
    make('ST2-12', 'A Sea of Signatures', 'Tideglass', [
        'The coastal archive contains requests from communities that once tried to leave the Common Measure. Their signatures remain recorded; the withdrawals were never implemented.',
        'Nella studies the records. “If an agreement cannot end, it is not the same as a freely chosen agreement.”'
    ], [
        opt('public', 'Publish the withdrawal records', 'Spend 8 Gold and 5 Knowledge; open the coast through transparent review.', { gold: 8, knowledge: 5 }, 'tideglass', 8, 2, 'act2.withdrawal_public', 0, 3),
        opt('council', 'Form an independent maritime records council', 'Spend 20 Gold and 3 Planks; enable reciprocal navigation.', { gold: 20, planks: 3 }, 'tideglass', 7, 3, 'act2.withdrawal_council', 0, 2),
        opt('archive', 'Preserve a certified historical copy', 'Spend 12 Gold; maintain regional access and records.', { gold: 12 }, 'tideglass', 4, 4, 'act2.withdrawal_archived', 0, 1)
    ]),
    make('ST2-13', 'Six Different Truths', 'Starveil', [
        'The Starveil Archive compares records sent from mountain works, living groves and coastal ports. Their dates overlap, but their explanations differ.',
        'Iven says, “A record can be true and still leave out half the story.”'
    ], [
        opt('verify', 'Sponsor independent authentication', 'Spend 14 Gold and 7 Knowledge on a shared evidence register.', { gold: 14, knowledge: 7 }, 'starveil', 8, 2, 'act2.starveil_verified', 0, 3),
        opt('commission', 'Convene a scholarly commission', 'Spend 20 Gold and 2 Tools to document the discrepancies.', { gold: 20, tools: 2 }, 'starveil', 7, 3, 'act2.starveil_commission', 0, 2),
        opt('quiet', 'Protect the contested documents', 'Spend 12 Gold; preserve safe custody before publication.', { gold: 12 }, 'starveil', 5, 2, 'act2.starveil_preserved', 0, 1)
    ]),
    make('ST2-14', 'Council of the Outer Roads', 'Starveil', [
        'Delegates from several regions gather to decide which roads and archives should be maintained together.',
        'Bera warns that cooperation without a clear budget can collapse as surely as an unpaid bridge.'
    ], [
        opt('civic', 'Fund shared civic access', 'Spend 26 Gold and 5 Stone to support common road inspections.', { gold: 26, stone: 5 }, 'starveil', 7, 4, 'act2.outer_council_civic'),
        opt('scholars', 'Open a public research exchange', 'Spend 9 Knowledge and 12 Gold on an archive network.', { knowledge: 9, gold: 12 }, 'starveil', 8, 2, 'act2.outer_council_scholars', 0, 2),
        opt('limited', 'Agree on a limited trial', 'Spend 10 Gold and 5 Food; defer larger obligations.', { gold: 10, food: 5 }, 'starveil', 4, 3, 'act2.outer_council_trial')
    ]),
    make('ST2-15', 'Treaty of the Three Crossings', 'Copperwash', [
        'The inland and coastal delegates approve a draft treaty connecting three important transport corridors.',
        'Nella asks whether the new arrangement should include independent local review or remain a narrower exchange of goods.'
    ], [
        opt('charter', 'Sign a reciprocal transport charter', 'Spend 24 Gold and 4 Planks.', { gold: 24, planks: 4 }, 'copperwash', 8, 5, 'act2.three_crossings_charter'),
        opt('audit', 'Add public road oversight', 'Spend 14 Gold and 7 Knowledge; publish common inspections.', { gold: 14, knowledge: 7 }, 'copperwash', 7, 3, 'act2.three_crossings_audited', 0, 2),
        opt('commerce', 'Maintain a commercial-only treaty', 'Spend 10 Gold; strong trade terms without civic expansion.', { gold: 10 }, 'copperwash', 4, 7, 'act2.three_crossings_commercial')
    ]),
    make('ST2-16', 'The Regent’s Offer', 'Regency', [
        'Regent Orsen Kade sends a formal proposal: security, organized supply roads and trained border guards in return for a larger Regency role in regional administration.',
        'Mara acknowledges the value of protection. Nella worries about terms that smaller settlements may have little power to refuse.'
    ], [
        opt('safeguards', 'Negotiate limited defensive oversight', 'Spend 18 Gold and 4 Tools on shared inspectors.', { gold: 18, tools: 4 }, 'regency', 7, 3, 'act2.regency_safeguards'),
        opt('alliance', 'Propose equal defensive cooperation', 'Spend 22 Gold and 6 Food on a joint patrol framework.', { gold: 22, food: 6 }, 'regency', 6, 4, 'act2.regency_alliance'),
        opt('independent', 'Decline centralized control respectfully', 'Spend 9 Gold on independent frontier readiness.', { gold: 9 }, 'regency', 2, 1, 'act2.regency_declined', 1)
    ]),
    make('ST2-17', 'The Price of Recognition', 'The Roads Remember', [
        'The final Act II assembly reviews Fallowbank’s regional obligations, connected settlements, and work accomplished beyond the valley.',
        'Bera closes her ledger. “Our roads have made us part of a much larger world. Now we must decide what kind of neighbor we intend to be.”'
    ], [
        opt('federation', 'Recognize a voluntary regional federation', 'Spend 28 Gold and 5 Planks on transparent charters.', { gold: 28, planks: 5 }, 'tideglass', 8, 4, 'act2.complete_federation'),
        opt('civic', 'Establish a coordinated civic region', 'Spend 25 Gold and 8 Stone on public administration.', { gold: 25, stone: 8 }, 'copperwash', 7, 4, 'act2.complete_civic'),
        opt('trade', 'Commit to a limited commercial partnership', 'Spend 16 Gold and 6 Food, maintaining local independence.', { gold: 16, food: 6 }, 'copperwash', 5, 6, 'act2.complete_trade')
    ])
];
export const FRONTIER_STORY_BY_ID = Object.fromEntries(ACT2_EXPANSION.map(x => [x.id, x]));
export function newFrontierState() { return { storiesCompleted: [], storyChoices: {}, gateways: GATEWAYS.map(g => ({ id: g.id, tier: 0 })), caravans: [], weeklyDispatches: 0, lastDispatch: {}, delivered: [], settlementLevels: { 'HM-02': 1, 'HM-05': 1 } }; }
const established = (s) => !!s.flags['act1.complete'];
export function gatewayAvailable(s, g) { return established(s) && s.frontier.storiesCompleted.includes(g.openAfter) && !!routeBetween(s, 'HM-01', g.anchor); }
export function gatewayWeeks(s, g) {
    const path = routeBetween(s, 'HM-01', g.anchor);
    if (!path)
        return null;
    let weeks = path.distance + 2 - s.frontier.gateways.find(x => x.id === g.id).tier;
    if (s.research.includes('regional_logistics'))
        weeks--;
    if (g.id === 'copperwash_coast' && s.research.includes('coastal_navigation'))
        weeks--;
    return Math.max(1, weeks);
}
export function frontierStoryBlock(s) {
    if (!established(s) || s.regional.storyCompleted.length < 3)
        return null;
    const next = ACT2_EXPANSION.find(x => !s.frontier.storiesCompleted.includes(x.id));
    if (!next)
        return null;
    if (next.id === 'ST2-17') {
        if (!s.regional.towns.some(x => x.status === 'founded'))
            return 'Found at least one working satellite settlement (World → Regions).';
        if (!s.regional.towns.some(x => x.status === 'chartered'))
            return 'Establish a voluntary charter with a neighboring community.';
        if (!s.frontier.delivered.length)
            return 'Complete and claim at least one interregional caravan.';
    }
    if (s.adventure.active || s.military.battle || s.activeExpedition)
        return 'Resolve or retreat from the active expedition or battle.';
    return null;
}
export function frontierStoryAvailable(s) {
    if (!established(s) || s.regional.storyCompleted.length < 3)
        return null;
    if (s.adventure.active || s.military.battle || s.activeExpedition)
        return null;
    const next = ACT2_EXPANSION.find(x => !s.frontier.storiesCompleted.includes(x.id)) ?? null;
    if (next?.id === 'ST2-17' && frontierStoryBlock(s))
        return null;
    return next;
}
const can = (s, cost) => Object.entries(cost).every(([k, v]) => s.resources[k] >= (v ?? 0));
const spend = (s, cost) => { if (!can(s, cost))
    throw Error('Not enough materials for this regional decision.'); for (const [key, value] of Object.entries(cost))
    s.resources[key] -= value ?? 0; };
export function frontierForecast(s) { return s.regional.towns.filter(x => x.status === 'founded').reduce((sum, t) => sum + Math.max(0, (s.frontier.settlementLevels[t.sector] ?? 1) - 1) * (s.research.includes('satellite_management') ? 0 : 1), 0); }
export function frontierAdvanceWeek(s) { s.frontier.weeklyDispatches = 0; for (const c of s.frontier.caravans)
    if (c.status === 'traveling' && c.arriveTurn <= s.turn)
        c.status = 'ready'; }
export function handleFrontier(s, cmd) {
    const f = s.frontier;
    if (!established(s))
        throw Error('First ratify the Hearthmere Charter.');
    switch (cmd.type) {
        case 'frontier_story': {
            const story = frontierStoryAvailable(s);
            if (story?.id !== cmd.id)
                throw Error('This story chapter is not available yet.');
            const choice = story.choices.find(c => c.id === cmd.choiceId);
            if (!choice)
                throw Error('Invalid story choice.');
            spend(s, choice.cost);
            const rel = s.regional.factions[choice.faction];
            rel.trust = Math.min(100, rel.trust + choice.trust);
            rel.influence = Math.min(100, rel.influence + 2);
            rel.grievances = Math.min(20, rel.grievances + (choice.grievance ?? 0));
            s.civic.tradeStanding = Math.min(100, s.civic.tradeStanding + choice.trade);
            if (choice.knowledge)
                s.resources.knowledge = Math.min(capacity(s, 'knowledge'), s.resources.knowledge + choice.knowledge);
            f.storiesCompleted.push(story.id);
            f.storyChoices[story.id] = choice.id;
            s.flags[choice.flag] = true;
            if (story.id === 'ST2-17')
                s.flags['act2.complete'] = true;
            return { note: `${story.title}: ${choice.label}.`, chronicle: `${story.title}: ${choice.label}. The ${FACTIONS.find(x => x.id === choice.faction).name} records this agreement as part of Fallowbank's regional history.` };
        }
        case 'frontier_road': {
            const gateway = GATEWAYS.find(g => g.id === cmd.gateway);
            if (!gateway || !gatewayAvailable(s, gateway))
                throw Error('The regional route is not yet open. Resolve the appropriate faction chapter and approach road.');
            const road = f.gateways.find(x => x.id === gateway.id);
            if (road.tier >= 2)
                throw Error('This gateway has already received both transport improvements.');
            const cost = road.tier === 0 ? { gold: 25, timber: 8, stone: 8 } : { gold: 45, planks: 6, tools: 4, stone: 8 };
            spend(s, cost);
            road.tier++;
            return { note: `The ${gateway.name} gateway improved to Tier ${road.tier}.`, chronicle: `Fallowbank funded a better transit connection to ${gateway.name}, improving the reliability of independent regional exchange.` };
        }
        case 'frontier_trade': {
            const offer = FRONTIER_OFFERS.find(x => x.id === cmd.offerId);
            if (!offer)
                throw Error('Unknown interregional contract.');
            const g = GATEWAYS.find(x => x.id === offer.gateway);
            if (!gatewayAvailable(s, g))
                throw Error('This region is not yet connected. Complete its faction storyline and secure the approach road.');
            if (f.lastDispatch[offer.gateway] === s.turn)
                throw Error('Only one interregional convoy per region may depart during a Council Week.');
            if (f.weeklyDispatches + s.regional.dispatchesThisTurn >= 2 || f.caravans.filter(x => x.status === 'traveling').length + s.regional.caravans.filter(x => x.status === 'traveling').length >= 3)
                throw Error('Interregional caravan capacity is full.');
            spend(s, offer.send);
            const weeks = gatewayWeeks(s, g);
            f.caravans.push({ id: `outer-caravan-${s.nextId++}`, offerId: offer.id, departTurn: s.turn, arriveTurn: s.turn + weeks, status: 'traveling', reward: { ...offer.receive } });
            f.lastDispatch[offer.gateway] = s.turn;
            f.weeklyDispatches++;
            return { note: `${offer.name} dispatched to ${g.name}. Delivery in ${weeks} Council Week${weeks === 1 ? '' : 's'}.`, chronicle: `An independently contracted caravan departed for ${g.name}, carrying paid supplies for a recorded regional exchange.` };
        }
        case 'frontier_claim': {
            const caravan = f.caravans.find(c => c.id === cmd.caravanId);
            if (!caravan || caravan.status !== 'ready')
                throw Error('This caravan has not arrived or has already been claimed.');
            let taken = 0;
            for (const [key, amount] of Object.entries(caravan.reward)) {
                const k = key;
                const qty = Math.max(0, Math.min(amount ?? 0, capacity(s, k) - s.resources[k]));
                s.resources[k] += qty;
                caravan.reward[k] = (amount ?? 0) - qty;
                taken += qty;
            }
            if (taken === 0)
                throw Error('Insufficient storage space for the delivered goods. Free capacity and claim later.');
            const pending = Object.values(caravan.reward).some(x => (x ?? 0) > 0);
            if (!pending) {
                f.caravans = f.caravans.filter(c => c.id !== caravan.id);
                const g = FRONTIER_OFFERS.find(x => x.id === caravan.offerId).gateway;
                if (!f.delivered.includes(g))
                    f.delivered.push(g);
            }
            return { note: `Claimed ${taken} units from the interregional caravan. ${pending ? 'Remaining goods are held safely in escrow.' : 'The exchange is complete.'}`, chronicle: pending ? undefined : `The ${FRONTIER_OFFERS.find(x => x.id === caravan.offerId).name} returned its contracted goods. The exchange was completed and recorded.` };
        }
        case 'frontier_settlement_upgrade': {
            const town = s.regional.towns.find(t => t.sector === cmd.sector);
            if (!town || town.status !== 'founded')
                throw Error('Only a player-founded settlement may be developed through this option.');
            const old = f.settlementLevels[town.sector] ?? 1;
            if (old >= 3)
                throw Error('Settlement administration is fully developed in this release.');
            if (!routeBetween(s, 'HM-01', town.sector))
                throw Error('A safe road connection is required.');
            if (s.population < 16)
                throw Error('Fallowbank needs at least 16 residents before relocating another citizen.');
            const available = Math.floor((s.population - 1) * .75) - s.buildings.reduce((sum, b) => sum + b.workers, 0) - militaryPersonnel(s);
            if (available < 0)
                throw Error('Free enough civilian labor before relocating another resident.');
            const cost = old === 1 ? { gold: 70, timber: 12, planks: 4, stone: 8 } : { gold: 110, bricks: 8, tools: 6, stone: 12 };
            spend(s, cost);
            s.population -= 1;
            town.population += 1;
            f.settlementLevels[town.sector] = old + 1;
            return { note: `${town.name} reached Settlement Tier ${old + 1}. One existing resident relocated; local output and depot capacity will increase.`, chronicle: `A Fallowbank resident relocated to ${town.name}, developing its housing, local industry and administrative services to Tier ${old + 1}.` };
        }
    }
}
export function frontierInvariants(s) {
    const f = s.frontier;
    if (!f || !Array.isArray(f.gateways) || !Array.isArray(f.caravans) || !Array.isArray(f.storiesCompleted) || !f.settlementLevels)
        throw Error('Invalid outer-region state.');
    if (f.gateways.length !== 3 || new Set(f.gateways.map(x => x.id)).size !== 3)
        throw Error('Invalid gateway registry.');
    for (const x of f.gateways)
        if (!GATEWAYS.some(g => g.id === x.id) || !Number.isInteger(x.tier) || x.tier < 0 || x.tier > 2)
            throw Error('Invalid gateway tier.');
    if (new Set(f.storiesCompleted).size !== f.storiesCompleted.length || f.storiesCompleted.some(x => !FRONTIER_STORY_BY_ID[x]))
        throw Error('Invalid regional story history.');
    for (const key of ['HM-02', 'HM-05']) {
        const lvl = f.settlementLevels[key];
        if (!Number.isInteger(lvl) || lvl < 1 || lvl > 3)
            throw Error('Invalid satellite level.');
        const town = s.regional.towns.find(t => t.sector === key);
        if (town.status === 'founded' && town.population !== lvl + 1)
            throw Error('Satellite citizens do not match actual relocation history.');
    }
    if (!Number.isInteger(f.weeklyDispatches) || f.weeklyDispatches < 0 || f.weeklyDispatches + s.regional.dispatchesThisTurn > 2 || f.caravans.filter(c => c.status === 'traveling').length + s.regional.caravans.filter(c => c.status === 'traveling').length > 3)
        throw Error('Invalid external caravan capacity.');
    if (new Set(f.caravans.map(c => c.id)).size !== f.caravans.length || new Set(f.delivered).size !== f.delivered.length || f.delivered.some(x => !GATEWAYS.some(g => g.id === x)))
        throw Error('Invalid regional delivery registry.');
    for (const c of f.caravans) {
        if (!FRONTIER_OFFERS.some(x => x.id === c.offerId) || !['traveling', 'ready'].includes(c.status) || !Number.isInteger(c.departTurn) || !Number.isInteger(c.arriveTurn) || c.arriveTurn < c.departTurn || c.departTurn > s.turn)
            throw Error('Invalid external caravan.');
        for (const [k, v] of Object.entries(c.reward))
            if (!['gold', 'food', 'timber', 'stone', 'knowledge', 'tools', 'herbs', 'clay', 'bricks', 'planks', 'iron_ore', 'iron', 'medicine'].includes(k) || !Number.isInteger(v) || v < 0 || v > 100)
                throw Error('Invalid external cargo.');
    }
    return true;
}

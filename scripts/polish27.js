/** Pass 27: read-only, save-compatible UI projections. Never advances the simulation. */
import { weeklyForecast, capacity } from './core.js';
import { RESOURCE_KEYS, RESOURCE_META } from './content.js';
export function campaignSteps(s) {
    const a2 = s.regional.storyCompleted.length + s.frontier.storiesCompleted.length;
    return [
        { act: 'I', title: 'The First Hearth', done: s.flags['act1.complete'] ? 35 : Math.min(s.completedEvents.length, 35), total: 35, complete: !!s.flags['act1.complete'], destination: 'council', description: 'Found Fallowbank and ratify the Hearthmere Charter.' },
        { act: 'II', title: 'The Roads Remember', done: s.flags['act2.complete'] ? 17 : Math.min(17, a2), total: 17, complete: !!s.flags['act2.complete'], destination: 'council', description: 'Build roads, negotiate independent charters and trace the first records.' },
        { act: 'III', title: 'The Banner and the Wheel', done: s.act3.completed.length, total: 19, complete: !!s.flags['act3.complete'], destination: 'council', description: 'Face the Regency and reach the gates of Veymark.' },
        { act: 'IV', title: 'The Proven Break', done: s.act4.completed.length, total: 24, complete: !!s.flags['act4.complete'], destination: 'council', description: 'Reconstruct the catastrophe with verifiable public evidence.' },
        { act: 'V', title: 'The Kingdoms Choose', done: s.act5.completed.length, total: 24, complete: !!s.act5.ending, destination: s.act5.completed.length >= 24 ? 'world' : 'council', description: s.act5.ending ? 'An earned conclusion now belongs to your Chronicle.' : s.act5.completed.length >= 24 ? 'Review the earned endings under World → Regions.' : 'Build a civilization, protect its promises, and earn a conclusion.' }
    ];
}
export function currentCampaign(s) {
    return campaignSteps(s).find(x => !x.complete) ?? campaignSteps(s)[4];
}
export function stewardAlerts(s) {
    const f = weeklyForecast(s), alerts = [];
    const approaching = s.pledges.filter(p => p.status === 'active' && p.dueTurn <= s.turn + 2);
    for (const p of approaching.slice(0, 2))
        alerts.push({ severity: 'warn', title: `Promise due in ${Math.max(0, p.dueTurn - s.turn)} weeks`, detail: p.title, destination: 'council' });
    if (f.changes.food < 0 && s.resources.food <= -f.changes.food * 3)
        alerts.push({ severity: 'warn', title: 'Food reserves under pressure', detail: `${s.resources.food} Food stored; forecast ${f.changes.food} per week.`, destination: 'ledger' });
    if (f.changes.gold < 0 && s.resources.gold <= -f.changes.gold * 3)
        alerts.push({ severity: 'warn', title: 'Treasury needs attention', detail: `${s.resources.gold} Gold held; forecast ${f.changes.gold} per week.`, destination: 'ledger' });
    if (s.adventure.active)
        alerts.push({ severity: 'info', title: 'Expedition in progress', detail: 'Continue your party’s saved encounter.', destination: 'world' });
    if (s.military.battle)
        alerts.push({ severity: 'info', title: 'Field army awaiting orders', detail: 'Resolve or withdraw from the active border battle.', destination: 'world' });
    if (s.regional.caravans.some(c => c.status === 'ready') || s.frontier.caravans.some(c => c.status === 'ready'))
        alerts.push({ severity: 'good', title: 'Trade delivery arrived', detail: 'Claim delivered resources from the regional trade screen.', destination: 'world' });
    const nearFull = RESOURCE_KEYS.filter(k => (s.resources[k] ?? 0) >= capacity(s, k) && f.changes[k] > 0);
    if (nearFull.length)
        alerts.push({ severity: 'info', title: 'Storage limits reached', detail: nearFull.slice(0, 3).map((k) => RESOURCE_META[k].name).join(', ') + ' cannot receive further ordinary weekly output.', destination: 'ledger' });
    if (!alerts.length)
        alerts.push({ severity: 'good', title: 'The kingdom is steady', detail: 'No urgent warnings. Review your forecast before advancing a Council Week.', destination: 'advance' });
    return alerts.slice(0, 4);
}
/** Pure text-only filtering so the log stays responsive after hundreds of events. */
export function filterChronicle(s, term, limit = 60) {
    const query = term.trim().toLocaleLowerCase();
    const matched = query ? s.chronicle.filter(e => (e.title + ' ' + e.body + ' ' + String(e.turn)).toLocaleLowerCase().includes(query)) : s.chronicle;
    return { events: matched.slice(0, limit), total: matched.length, shown: Math.min(limit, matched.length) };
}

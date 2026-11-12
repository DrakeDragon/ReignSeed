import { assertInvariants } from './core.js';
import { RESOURCE_KEYS, CONTENT_VERSION, SCHEMA_VERSION, VERSION } from './content.js';
import { newAdventureState, recruitHero } from './adventure.js';
import { newMilitaryState } from './military.js';
import { newRegionalState } from './regional.js';
import { newFrontierState } from './frontier.js';
import { newDepthState } from './depth.js';
import { newAct3State } from './act3.js';
import { newAct4State } from './act4.js';
import { newAct5State } from './act5.js';
// Keep Pass 10 database name deliberately: old reigns remain discoverable.
const DB_NAME = 'reignseed-p10';
const DB_VERSION = 1;
let dbp;
export function openDB() { if (dbp)
    return dbp; dbp = new Promise((resolve, reject) => { if (!('indexedDB' in window)) {
    reject(Error('IndexedDB unavailable in this browser.'));
    return;
} const req = indexedDB.open(DB_NAME, DB_VERSION); req.onupgradeneeded = () => { const db = req.result; for (const s of ['slots', 'snapshots', 'settings', 'commands'])
    if (!db.objectStoreNames.contains(s))
        db.createObjectStore(s); }; req.onsuccess = () => { req.result.onversionchange = () => { req.result.close(); dbp = undefined; }; resolve(req.result); }; req.onerror = () => { dbp = undefined; reject(req.error ?? Error('Cannot open save database.')); }; req.onblocked = () => { dbp = undefined; reject(Error('A different Reignseed tab is blocking the save database. Close other tabs and retry.')); }; }); return dbp; }
function reqValue(req) { return new Promise((resolve, reject) => { req.onsuccess = () => resolve(req.result); req.onerror = () => reject(req.error); }); }
function txDone(tx) { return new Promise((resolve, reject) => { tx.oncomplete = () => resolve(); tx.onabort = () => reject(tx.error || Error('Save was cancelled.')); tx.onerror = () => { }; }); }
function metaFor(state) { return { slot: state.slot, name: state.name, turn: state.turn, revision: state.revision, updated: Date.now(), version: state.contentVersion }; }
export async function listSlots() { const db = await openDB(); const tx = db.transaction('slots', 'readonly'); const req = tx.objectStore('slots').getAll(); const list = await reqValue(req); await txDone(tx); return list.sort((a, b) => a.slot - b.slot); }
/** Upgrade a Pass 10 save without discarding a single historical choice. */
/** Preserve all Pass 10 / Pass 11 state, including an expedition already in progress. */
export function migrateState(input) {
    if (!input || typeof input !== 'object')
        throw Error('Invalid save structure.');
    const raw = input;
    if (raw.schemaVersion === SCHEMA_VERSION && raw.contentVersion === CONTENT_VERSION) {
        assertInvariants(raw);
        return structuredClone(raw);
    }
    const old10 = raw.schemaVersion === 1 && raw.contentVersion === 'founding-p10';
    const old11 = raw.schemaVersion === 2 && raw.contentVersion === 'founding-p11';
    const old12 = raw.schemaVersion === 3 && raw.contentVersion === 'founding-p12';
    const old13 = raw.schemaVersion === 4 && raw.contentVersion === 'founding-p13';
    const old14 = raw.schemaVersion === 5 && raw.contentVersion === 'founding-p14';
    const old15 = raw.schemaVersion === 6 && raw.contentVersion === 'founding-p15';
    const old16 = raw.schemaVersion === 7 && raw.contentVersion === 'founding-p16';
    const old17 = raw.schemaVersion === 8 && raw.contentVersion === 'founding-p17';
    const old18 = raw.schemaVersion === 9 && raw.contentVersion === 'founding-p18';
    const old19 = raw.schemaVersion === 10 && raw.contentVersion === 'founding-p19';
    const old20 = raw.schemaVersion === 11 && raw.contentVersion === 'founding-p20';
    const old21 = raw.schemaVersion === 12 && raw.contentVersion === 'founding-p21';
    const old22 = raw.schemaVersion === 13 && raw.contentVersion === 'founding-p22';
    const old23 = raw.schemaVersion === 14 && raw.contentVersion === 'founding-p23';
    const old24 = raw.schemaVersion === 15 && raw.contentVersion === 'founding-p24';
    const old25 = raw.schemaVersion === 16 && raw.contentVersion === 'founding-p25';
    if (!old10 && !old11 && !old12 && !old13 && !old14 && !old15 && !old16 && !old17 && !old18 && !old19 && !old20 && !old21 && !old22 && !old23 && !old24 && !old25)
        throw Error('Unsupported save schema or content version. Your original save has not been changed.');
    const s = structuredClone(raw);
    if (!s.resources || typeof s.resources !== 'object')
        throw Error('Legacy save has no valid resources.');
    for (const key of RESOURCE_KEYS)
        if (s.resources[key] === undefined)
            s.resources[key] = 0;
    if (old10) {
        s.civic = { publicTrust: 50, landHealth: 65, tradeStanding: 10, safetyBonus: 0 };
        s.adviserTrust = { bera: 50, tovin: 50, mara: 50, iven: 50, nella: 50, rook: 50, sella: 50 };
        s.pledges = [];
        s.foodStableWeeks = 0;
    }
    if (!old12 && !old13 && !old14 && !old15 && !old16 && !old17 && !old18 && !old19 && !old20 && !old21 && !old22 && !old23 && !old24 && !old25)
        s.adventure = newAdventureState();
    else if (old12) {
        if (!s.adventure || !Array.isArray(s.adventure.gear))
            throw Error('Pass 12 adventure state is incomplete.');
        for (const gear of s.adventure.gear)
            gear.rank = 0;
        if (s.adventure.active?.battle) {
            s.adventure.active.battle.log = [`Resumed ${s.adventure.active.battle.id} at round ${s.adventure.active.battle.round}.`];
        }
    }
    // The old short Watchtower mission is grandfathered: it remains complete, and Dain returns.
    if (!old12 && !old13 && !old14 && !old15 && !old16 && !old17 && !old18 && !old19 && !old20 && !old21 && !old22 && !old23 && !old24 && !old25 && s.expeditionDone) {
        s.adventure.completed.push('H01');
        recruitHero(s.adventure, 'dain', () => `gear-${s.nextId++}`);
        s.heroRecruited = true;
    }
    // An old expedition *in progress* is left untouched; its choices still work until completed.
    if (old14) {
        if (!s.military || !Array.isArray(s.military.squads) || !Array.isArray(s.military.sectors))
            throw Error('Pass 14 military state incomplete.');
        const baseline = newMilitaryState();
        s.military.capacityUpgrade = false;
        s.military.fieldSupplies = 0;
        s.military.fieldSupplyCap = 12;
        s.military.borderPolicy = 'none';
        for (const q of s.military.squads) {
            q.doctrine = null;
            q.lastDrillTurn = -1;
            q.lastPatrolTurn = -1;
        }
        for (const sec of s.military.sectors)
            sec.fortifications = 0;
        for (const sec of baseline.sectors)
            if (!s.military.sectors.some(x => x.id === sec.id))
                s.military.sectors.push(sec);
        if (s.military.battle) {
            s.military.battle.wallIntegrity = 0;
            s.military.battle.maxWallIntegrity = 0;
        }
    }
    else if (!old15 && !old16 && !old17 && !old18 && !old19 && !old20 && !old21 && !old22 && !old23 && !old24 && !old25)
        s.military = newMilitaryState();
    if (!old16 && !old17 && !old18 && !old19 && !old20 && !old21 && !old22 && !old23 && !old24 && !old25)
        s.regional = newRegionalState();
    if (!old17 && !old18 && !old19 && !old20 && !old21 && !old22 && !old23 && !old24 && !old25)
        s.frontier = newFrontierState();
    if (!old18 && !old19 && !old20 && !old21 && !old22 && !old23 && !old24 && !old25)
        s.depth = newDepthState();
    s.act3 = (old19 || old20 || old21 || old22 || old23 || old24 || old25) ? { ...newAct3State(), ...s.act3 } : newAct3State();
    s.act4 = (old21 || old22 || old23 || old24 || old25) ? { ...newAct4State(), ...s.act4, puzzles: { ...newAct4State().puzzles, ...(s.act4?.puzzles ?? {}) } } : newAct4State();
    s.act5 = (old24 || old25) ? { ...newAct5State(), ...s.act5 } : newAct5State();
    s.schemaVersion = SCHEMA_VERSION;
    s.contentVersion = CONTENT_VERSION;
    assertInvariants(s);
    return s;
}
export async function loadSlot(slot) {
    const db = await openDB();
    const tx = db.transaction('snapshots', 'readonly');
    const store = tx.objectStore('snapshots');
    const [current, backup] = await Promise.all([reqValue(store.get(`${slot}:current`)), reqValue(store.get(`${slot}:backup`))]);
    await txDone(tx);
    for (const candidate of [{ raw: current, recovered: false }, { raw: backup, recovered: true }]) {
        if (!candidate.raw)
            continue;
        try {
            const state = migrateState(candidate.raw);
            const before = candidate.raw;
            const migrated = before.schemaVersion !== SCHEMA_VERSION || before.contentVersion !== CONTENT_VERSION;
            if (candidate.recovered)
                await restoreRecoveredSnapshot(state);
            else if (migrated)
                await overwriteSlot(state);
            return { state, recovered: candidate.recovered, migrated };
        }
        catch { /* Try the protected older snapshot. */ }
    }
    if (current || backup)
        throw Error('Neither current nor recovery save is compatible. Your original data remains untouched.');
    return null;
}
/** Recovering a corrupted current save must NOT replace the good backup with corrupted bytes. */
async function restoreRecoveredSnapshot(state) {
    assertInvariants(state);
    const db = await openDB();
    const tx = db.transaction(['slots', 'snapshots'], 'readwrite');
    tx.objectStore('snapshots').put(state, `${state.slot}:current`);
    // Preserve the old valid backup intact for a second recovery attempt.
    tx.objectStore('slots').put(metaFor(state), state.slot);
    await txDone(tx);
}
export async function recoveryInfo(slot) {
    const db = await openDB();
    const tx = db.transaction('snapshots', 'readonly');
    const [backup, current] = await Promise.all([reqValue(tx.objectStore('snapshots').get(`${slot}:backup`)), reqValue(tx.objectStore('snapshots').get(`${slot}:current`))]);
    await txDone(tx);
    let currentRevision;
    try {
        if (current)
            currentRevision = migrateState(current).revision;
    }
    catch { /* Corrupt current must not mask a good backup. */ }
    try {
        if (backup) {
            const state = migrateState(backup);
            if (state.slot !== slot)
                throw Error('Recovery snapshot belongs to a different slot.');
            return { available: true, revision: state.revision, turn: state.turn, currentRevision };
        }
    }
    catch { /* Invalid backup is never offered as restorable. */ }
    return { available: false, currentRevision };
}
/** An explicit user-confirmed rollback. A valid former current becomes the new backup; invalid bytes never do. */
export async function restorePreviousSnapshot(slot) {
    const db = await openDB();
    const tx = db.transaction(['slots', 'snapshots', 'commands'], 'readwrite');
    const store = tx.objectStore('snapshots');
    const [prior, current] = await Promise.all([reqValue(store.get(`${slot}:backup`)), reqValue(store.get(`${slot}:current`))]);
    let recovered;
    try {
        recovered = migrateState(prior);
        if (recovered.slot !== slot)
            throw Error('Recovery snapshot belongs to a different slot.');
    }
    catch {
        tx.abort();
        throw Error('No valid recovery snapshot is available for this slot.');
    }
    let validCurrent = null;
    try {
        validCurrent = migrateState(current);
    }
    catch { /* Keep the verified backup. */ }
    store.put(recovered, `${slot}:current`);
    if (validCurrent)
        store.put(validCurrent, `${slot}:backup`);
    tx.objectStore('slots').put(metaFor(recovered), slot);
    // Old command identifiers belong to a different historical branch.
    tx.objectStore('commands').delete(slot);
    await txDone(tx);
    return recovered;
}
function downloadJson(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
}
/** One self-contained file stores the three independent reigns. Import selects source and destination slots. */
export async function exportAllReigns() {
    const metas = await listSlots();
    const reigns = [];
    for (const meta of metas) {
        const loaded = await loadSlot(meta.slot);
        if (loaded)
            reigns.push({ slot: meta.slot, state: loaded.state });
    }
    if (!reigns.length)
        throw Error('There are no saved reigns to export.');
    downloadJson({ format: 'reignseed-reign-collection', exportVersion: 1, gameVersion: VERSION, exportedAt: new Date().toISOString(), reigns }, 'Reignseed_All_Reigns_Backup.json');
    return reigns.length;
}
export async function writeNewSlot(state) { assertInvariants(state); const db = await openDB(); const tx = db.transaction(['slots', 'snapshots'], 'readwrite'); const slotStore = tx.objectStore('slots'); const snap = tx.objectStore('snapshots'); const existing = await reqValue(slotStore.get(state.slot)); if (existing) {
    tx.abort();
    throw Error('This slot already contains a reign. Explicitly delete it before replacing.');
} snap.put(state, `${state.slot}:current`); slotStore.put(metaFor(state), state.slot); await txDone(tx); }
export async function overwriteSlot(state) { assertInvariants(state); const db = await openDB(); const tx = db.transaction(['slots', 'snapshots'], 'readwrite'); const snap = tx.objectStore('snapshots'); const old = await reqValue(snap.get(`${state.slot}:current`)); if (old) {
    try {
        const valid = migrateState(old);
        if (valid.slot === state.slot)
            snap.put(old, `${state.slot}:backup`);
    }
    catch { /* Do not overwrite a sound backup with corrupted current data. */ }
} snap.put(state, `${state.slot}:current`); tx.objectStore('slots').put(metaFor(state), state.slot); await txDone(tx); }
export async function deleteSlot(slot) { const db = await openDB(); const tx = db.transaction(['slots', 'snapshots', 'commands'], 'readwrite'); tx.objectStore('slots').delete(slot); tx.objectStore('snapshots').delete(`${slot}:current`); tx.objectStore('snapshots').delete(`${slot}:backup`); tx.objectStore('commands').delete(slot); await txDone(tx); }
export async function commitCommand(before, after, commandId) {
    assertInvariants(after);
    const db = await openDB();
    const tx = db.transaction(['slots', 'snapshots', 'commands'], 'readwrite');
    const slotStore = tx.objectStore('slots');
    const snap = tx.objectStore('snapshots');
    const commands = tx.objectStore('commands');
    const req = slotStore.get(before.slot);
    const meta = await reqValue(req);
    if (!meta || meta.revision !== before.revision) {
        tx.abort();
        throw new Error('This reign was changed in another tab. Reload the latest save before continuing.');
    }
    const recent = await reqValue(commands.get(before.slot)) ?? [];
    if (recent.includes(commandId)) {
        tx.abort();
        throw Error('That action has already been completed.');
    }
    snap.put(before, `${before.slot}:backup`);
    snap.put(after, `${after.slot}:current`);
    slotStore.put(metaFor(after), after.slot);
    commands.put([...recent, commandId].slice(-256), before.slot);
    await txDone(tx);
}
export async function loadSetting(name, fallback) { const db = await openDB(); const tx = db.transaction('settings', 'readonly'); const data = await reqValue(tx.objectStore('settings').get(name)); await txDone(tx); return data === undefined ? fallback : data; }
export async function saveSetting(name, value) { const db = await openDB(); const tx = db.transaction('settings', 'readwrite'); tx.objectStore('settings').put(value, name); await txDone(tx); }
export function exportState(state) { const payload = { format: 'reignseed-save', exportVersion: 1, gameVersion: VERSION, schemaVersion: state.schemaVersion, contentVersion: state.contentVersion, exportedAt: new Date().toISOString(), state }; const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `Reignseed_${state.name.replace(/[^a-z0-9]+/gi, '_')}_Slot${state.slot}.reignseed-save.json`; document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 3000); }
export function parseImportedSave(raw, slot, sourceSlot = slot) {
    if (raw.length > 12_000_000)
        throw Error('Save archive is too large.');
    let parsed;
    try {
        parsed = JSON.parse(raw);
    }
    catch {
        throw Error('This file is not valid JSON.');
    }
    if (!parsed || typeof parsed !== 'object')
        throw Error('Invalid save file.');
    const o = parsed;
    if (o.exportVersion !== 1)
        throw Error('Unsupported export version.');
    let original;
    if (o.format === 'reignseed-save')
        original = o.state;
    else if (o.format === 'reignseed-reign-collection' && Array.isArray(o.reigns)) {
        if (o.reigns.length > 3)
            throw Error('A save collection may contain at most three reigns.');
        original = o.reigns.find(r => r.slot === sourceSlot)?.state;
        if (!original)
            throw Error(`Source Slot ${sourceSlot} is not present in this archive. Choose one of its occupied slots.`);
    }
    else
        throw Error('This is not a supported Reignseed save.');
    if (!original)
        throw Error('No save data was found in the selected file.');
    const state = migrateState(original);
    state.slot = slot;
    assertInvariants(state);
    return state;
}

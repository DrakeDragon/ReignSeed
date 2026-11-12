const W = 900, H = 315;
function p(c, pts, fill, stroke) { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fillStyle = fill; c.fill(); if (stroke) {
    c.lineWidth = 2;
    c.strokeStyle = stroke;
    c.stroke();
} }
function line(c, pts, stroke, width = 2) { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.strokeStyle = stroke; c.lineWidth = width; c.lineCap = 'round'; c.stroke(); }
function ellipse(c, x, y, rx, ry, fill) { c.beginPath(); c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); c.fillStyle = fill; c.fill(); }
function round(c, x, y, w, h, r, fill) { c.beginPath(); c.roundRect(x, y, w, h, r); c.fillStyle = fill; c.fill(); }
function tree(c, x, y, size) { round(c, x - size * .09, y - size * .5, size * .18, size * .5, 3, '#30473b'); for (let a = 0; a < 3; a++) {
    const sw = size * (.52 - a * .085);
    p(c, [[x - sw, y - size * (.24 + a * .26)], [x, y - size * (.9 + a * .2)], [x + sw, y - size * (.24 + a * .26)]], a % 2 ? '#2a5447' : '#376958', '#1a3d39');
} }
function environment(c, t, motion, scenario) {
    const sky = c.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, '#172d3e');
    sky.addColorStop(.5, '#6e8778');
    sky.addColorStop(1, '#c3ad73');
    c.fillStyle = sky;
    c.fillRect(0, 0, W, H);
    ellipse(c, 716, 48, 32, 32, '#f2d79b');
    ellipse(c, 716, 48, 66, 66, '#edd5a018');
    p(c, [[0, 141], [105, 45], [183, 109], [278, 34], [405, 129], [548, 66], [691, 133], [778, 57], [900, 137], [900, 315], [0, 315]], '#476a6b');
    p(c, [[0, 159], [164, 97], [309, 139], [491, 91], [625, 145], [807, 103], [900, 152], [900, 315], [0, 315]], '#38594f');
    for (let i = 0; i < 9; i++) {
        const x = i * 127 + 15;
        tree(c, x, 193 + (i % 3) * 8, 54 + (i % 4) * 13);
    }
    // river and bridge / guarded trade road
    if (scenario === 'MR-02') {
        p(c, [[0, 222], [240, 198], [420, 203], [540, 240], [900, 208], [900, 258], [540, 287], [420, 240], [240, 230], [0, 260]], '#427c83', '#7fb0a0');
        for (let i = 0; i < 18; i++) {
            const x = (i * 77 + (motion ? t * 13 : 0)) % W, y = 218 + (i % 3) * 11;
            line(c, [[x, y], [x + 34, y - 2]], '#b9e6d385', 2);
        }
        p(c, [[320, 196], [536, 196], [551, 233], [315, 233]], '#81765f', '#c7b17f');
        for (let i = 0; i < 7; i++)
            line(c, [[326 + i * 32, 197], [324 + i * 32, 229]], '#ceb98b73', 2);
    }
    else {
        p(c, [[0, 253], [70, 235], [240, 228], [340, 210], [510, 219], [665, 240], [900, 232], [900, 306], [0, 306]], '#aa956f', '#d4b88c');
        for (let i = 0; i < 7; i++) {
            const x = i * 125 + 15;
            line(c, [[x, 242], [x + 50, 237]], '#d6c29888', 2);
        }
    }
    p(c, [[0, 263], [135, 252], [420, 278], [750, 256], [900, 265], [900, 315], [0, 315]], '#40543e');
    for (let i = 0; i < 11; i++) {
        let x = (i * 93 + 27) % W, y = 276 + i % 3 * 9;
        ellipse(c, x, y, 15, 4, '#96a96b55');
    }
    // watch tower and flags
    round(c, 64, 115, 44, 95, 3, '#6a7970');
    round(c, 59, 101, 54, 17, 3, '#8c8e77');
    for (let i = 0; i < 3; i++)
        round(c, 59 + i * 21, 89, 11, 15, 2, '#879484');
    round(c, 79, 138, 14, 23, 7, '#243c3a');
    line(c, [[103, 108], [103, 64]], '#d8c89d', 3);
    p(c, [[105, 65], [142, 73], [106, 94]], '#dcb770');
    // atmospheric dust motes, no gameplay effect
    if (motion)
        for (let i = 0; i < 18; i++) {
            const x = (i * 71 + t * (i % 3 + 1) * 7) % W, y = (i * 42 + Math.sin(t * .6 + i) * 9) % 220;
            ellipse(c, x, y, 1.2 + i % 2, .9, '#f2e5c055');
        }
}
/** Palisade visibly loses its timber stakes as Integrity falls; no tactical logic lives in the renderer. */
function palisade(c, integrity, max) {
    const x0 = 322, y = 208, w = 340;
    if (max === 0)
        return;
    if (integrity <= 0) {
        for (let i = 0; i < 8; i++) {
            const x = x0 + i * 42;
            p(c, [[x, 222], [x + 23, 216], [x + 34, 224], [x + 8, 232]], i % 2 ? '#76624e' : '#947b58', '#4b4b37');
            line(c, [[x + 4, 219], [x + 19, 226]], '#d0ad75', 2);
        }
        return;
    }
    const stakes = Math.max(2, Math.round(14 * integrity / max));
    // Low palisade placed between enemy and friendly ranks.
    round(c, x0 - 9, y - 11, w + 18, 13, 5, '#2d3531a8');
    for (let i = 0; i < stakes; i++) {
        const x = x0 + i * (w / 14) + 3;
        p(c, [[x, y + 14], [x - 2, y - 26], [x + 9, y - 42], [x + 19, y - 25], [x + 18, y + 14]], i % 2 ? '#886d4c' : '#a3845b', '#463e31');
        line(c, [[x + 1, y - 18], [x + 15, y - 18]], '#d2af78', 2);
        if (i % 3 === 0)
            round(c, x + 2, y - 4, 15, 6, 2, '#4e4939');
    }
    line(c, [[x0 - 5, y + 7], [x0 + stakes * (w / 14) + 3, y + 7]], '#645039', 8);
    for (let i = 0; i < stakes; i += 3)
        ellipse(c, x0 + i * (w / 14) + 12, y + 7, 3, 3, '#e0c48a');
}
function trooper(c, x, y, side, archer, t, motion, scale, role) {
    const bob = motion ? Math.sin(t * 2.6 + x * .08) * 1.5 : 0;
    c.save();
    c.translate(x, y + bob);
    c.scale(scale, scale);
    ellipse(c, 0, 5, 22, 6, '#14282489');
    const coat = side === 'player' ? '#426b4e' : '#975b4b', metal = side === 'player' ? '#d7ccb0' : '#bfa99d';
    const walking = motion ? Math.sin(t * 2.6 + x * .1) * 2.3 : 0;
    line(c, [[-6, -23], [-7 - walking, 0]], '#313b36', 6);
    line(c, [[7, -23], [8 + walking, 0]], '#313b36', 6);
    p(c, [[-13, -54], [11, -54], [17, -29], [-13, -26]], coat, '#33483f');
    ellipse(c, 0, -63, 12, 12, '#d0b395');
    p(c, [[-15, -69], [0, -84], [16, -69], [9, -60], [-10, -60]], metal, '#53655a');
    round(c, -8, -61, 16, 5, 2, side === 'player' ? '#eccf8a' : '#a86f59');
    line(c, [[-11, -49], [-19, -30]], '#b59c80', 7);
    line(c, [[11, -50], [22, -33]], '#bba486', 7);
    if (archer) {
        line(c, [[21, -55], [34, -75], [39, -32]], '#dbb47d', 3);
        line(c, [[34, -75], [39, -32]], '#f5e4b7', 1);
    }
    else if (role === 'engineers') {
        line(c, [[22, -30], [30, -65]], '#a68253', 6);
        round(c, 24, -76, 20, 13, 2, '#b6ada0');
        round(c, 20, -70, 5, 13, 1, '#88765b');
        ellipse(c, -19, -40, 10, 12, '#8ca998');
    }
    else {
        line(c, [[24, -30], [32, -66]], '#ced1b6', 4);
        p(c, [[33, -64], [29, -70], [33, -80], [40, -68], [39, -60]], '#dddac8');
        ellipse(c, -19, -40, role === 'shield_guard' ? 18 : 12, role === 'shield_guard' ? 24 : 18, side === 'player' ? '#829b75' : '#a77661');
    }
    c.restore();
}
function banner(c, x, y, side, t, motion) { line(c, [[x, y], [x, y - 104]], '#dfcaa0', 4); const sway = motion ? Math.sin(t * 1.9 + x) * 4 : 0; p(c, [[x + 3, y - 104], [x + 42 + sway, y - 96], [x + 4, y - 70]], side === 'player' ? '#8bb37b' : '#b96c52', '#dfd3b0'); ellipse(c, x + 15, y - 91, 3, 3, '#f5e1a0'); }
function squadGroup(c, u, t, motion) {
    const x = 245 + u.lane * 213, y = u.side === 'enemy' ? 162 : 290;
    const alive = u.cohesion > 0 && u.morale > 0;
    c.save();
    c.globalAlpha = alive ? 1 : .26;
    banner(c, x - 34, y - 4, u.side, t, motion);
    for (let i = 0; i < 3; i++)
        trooper(c, x + (i - 1) * 27, y - (i % 2) * 12, u.side, u.kind === 'scouts' || u.kind === 'skirmisher', t, motion, .86, u.kind);
    if (u.guard > 0) {
        c.strokeStyle = '#c2f3c4b0';
        c.lineWidth = 4;
        c.beginPath();
        c.ellipse(x, y - 42, 63, 60, 0, 0, Math.PI * 2);
        c.stroke();
    }
    // simple clear full squad bar
    round(c, x - 39, y - 100, 78, 7, 3, '#132624');
    round(c, x - 38, y - 99, 76 * Math.max(0, u.cohesion / u.maxCohesion), 5, 2, u.side === 'player' ? '#a4e29b' : '#e7a88c');
    c.restore();
}
export function mountMilitaryFX(canvas, state, reduced = false) {
    const ctx = canvas.getContext('2d');
    const b = state.military.battle;
    if (!ctx || !b)
        return { dispose() { } };
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    let alive = true, frameId = 0;
    const start = performance.now();
    let lastFrame = 0;
    function draw(now) {
        if (!alive || !ctx)
            return;
        const delta = now - lastFrame;
        if (!reduced && delta < 30) {
            frameId = requestAnimationFrame(draw);
            return;
        }
        lastFrame = now;
        const t = reduced ? 0 : (now - start) / 1000;
        environment(ctx, t, !reduced, b.scenario);
        if (b.maxWallIntegrity)
            palisade(ctx, b.wallIntegrity, b.maxWallIntegrity);
        for (const u of b.units.filter(x => x.side === 'enemy'))
            squadGroup(ctx, u, t, !reduced);
        for (const u of b.units.filter(x => x.side === 'player'))
            squadGroup(ctx, u, t, !reduced);
        const bottom = ctx.createLinearGradient(0, 246, 0, H);
        bottom.addColorStop(0, '#1a332a00');
        bottom.addColorStop(1, '#112b2699');
        ctx.fillStyle = bottom;
        ctx.fillRect(0, 245, W, H - 245);
        round(ctx, 14, 14, 200, 29, 9, '#142e2bda');
        ctx.font = 'bold 14px system-ui';
        ctx.fillStyle = '#e6d19d';
        ctx.fillText('THE BORDER WATCH', 28, 34);
        if (!reduced)
            frameId = requestAnimationFrame(draw);
    }
    frameId = requestAnimationFrame(draw);
    return { dispose() { alive = false; cancelAnimationFrame(frameId); } };
}

import { yearWeek } from './core.js';
import { BUILDINGS } from './content.js';
const W = 820, H = 575;
const TW = 106, TH = 52;
const hash = (n) => { let x = Math.sin(n * 127.1 + 43.7) * 43758.5453; return x - Math.floor(x); };
function iso(c, r) { return { x: 415 + (c - r) * 59, y: 220 + (c + r) * 29.6 }; }
function poly(ctx, pts, fill, stroke) { ctx.beginPath(); ctx.moveTo(...pts[0]); for (let i = 1; i < pts.length; i++)
    ctx.lineTo(...pts[i]); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.4;
    ctx.stroke();
} }
function rr(ctx, x, y, w, h, r, fill) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fillStyle = fill; ctx.fill(); }
function ellipse(ctx, x, y, rx, ry, color) { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill(); }
function tree(ctx, x, y, scale, variant) { const g = ctx.createLinearGradient(x, y - 54 * scale, x + 20 * scale, y); g.addColorStop(0, variant > 0.5 ? '#80b36d' : '#528765'); g.addColorStop(1, '#254d3c'); ellipse(ctx, x + 3 * scale, y + 2 * scale, 15 * scale, 6 * scale, '#163f3280'); rr(ctx, x - 3 * scale, y - 22 * scale, 6 * scale, 25 * scale, 2 * scale, '#795842'); ellipse(ctx, x, y - 35 * scale, 18 * scale, 17 * scale, g); ellipse(ctx, x - 11 * scale, y - 28 * scale, 14 * scale, 13 * scale, variant > 0.5 ? '#4f9267' : '#377c58'); ellipse(ctx, x + 9 * scale, y - 28 * scale, 15 * scale, 14 * scale, '#568e65'); ellipse(ctx, x, y - 43 * scale, 14 * scale, 12 * scale, '#82ad70'); }
function light(ctx, x, y, size = 8) { const grad = ctx.createRadialGradient(x, y, 1, x, y, size); grad.addColorStop(0, '#ffe9a99a'); grad.addColorStop(1, '#ffdd9900'); ctx.fillStyle = grad; ctx.fillRect(x - size, y - size, size * 2, size * 2); }
function drawBuilding(ctx, b, x, y, t) {
    const d = BUILDINGS[b.kind];
    const ruined = b.level === 0;
    ctx.save();
    ellipse(ctx, x, y + 8, 46, 17, '#1b372a6b');
    if (b.kind === 'farm') {
        poly(ctx, [[x - 44, y - 11], [x - 8, y - 27], [x + 39, y - 9], [x + 5, y + 9]], '#b08f3c', '#775c30');
        for (let i = 0; i < 5; i++) {
            ctx.strokeStyle = i % 2 ? '#ebce74' : '#d3ac54';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(x - 34 + i * 7, y - 12 + i * 2);
            ctx.lineTo(x + 3 + i * 7, y - 1 + i * 2);
            ctx.stroke();
        }
        drawHouse(ctx, x - 21, y - 24, 0.68, '#c98960', '#9b5c4a');
    }
    else if (b.kind === 'forager') {
        poly(ctx, [[x - 36, y - 2], [x - 12, y - 18], [x + 22, y - 10], [x, y + 8]], '#6b9c64');
        poly(ctx, [[x - 19, y - 20], [x + 8, y - 40], [x + 26, y - 11], [x - 2, y + 4]], '#63905f', '#436d4b');
        poly(ctx, [[x - 19, y - 20], [x - 2, y + 4], [x - 21, y - 7]], '#3f654f');
        ellipse(ctx, x + 29, y + 3, 11, 4, '#caa16f');
        for (let i = 0; i < 4; i++)
            ellipse(ctx, x + 20 + i * 5, y - 3 + (i % 2) * 2, 2, 4, '#b76c44');
    }
    else if (b.kind === 'watchtower') {
        const h = ruined ? 38 : 91;
        poly(ctx, [[x - 26, y - 3], [x - 26, y - h], [x + 4, y - h - 13], [x + 4, y - 11]], '#b5aba0', '#6f7777');
        poly(ctx, [[x + 4, y - h - 13], [x + 26, y - h], [x + 26, y - 1], [x + 4, y - 11]], '#737f7e', '#526768');
        poly(ctx, [[x - 26, y - h], [x + 4, y - h - 13], [x + 26, y - h], [x - 2, y - h + 13]], ruined ? '#626f66' : '#a7a89b');
        if (!ruined) {
            for (let i = -1; i <= 1; i++) {
                rr(ctx, x - 27 + i * 13, y - h - 15, 12, 15, 1, '#b7b6a5');
            }
            for (let i = 0; i < 2; i++)
                rr(ctx, x + 12, y - h + 14 + i * 27, 6, 12, 1, '#1d3f3f');
            rr(ctx, x - 18, y - 32, 11, 19, 5, '#334844');
            light(ctx, x + 11, y - h + 16, 24);
        }
        else {
            poly(ctx, [[x - 26, y - h], [x - 12, y - h - 6], [x - 2, y - h + 4], [x + 11, y - h - 7], [x + 25, y - h]], '#7f8b85');
            ctx.strokeStyle = '#394f4e';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(x - 14, y - 20);
            ctx.lineTo(x + 3, y - 46);
            ctx.stroke();
        }
    }
    else if (b.kind === 'lumber') {
        drawHouse(ctx, x - 12, y - 13, 0.78, '#ab7548', '#6f503c');
        for (let i = 0; i < 4; i++) {
            rr(ctx, x + 4 + i * 3, y + i * 4 - 2, 27, 6, 2, '#ad8055');
            ctx.strokeStyle = '#604a34';
            ctx.strokeRect(x + 4 + i * 3, y + i * 4 - 2, 27, 6);
        }
        ctx.strokeStyle = '#d5ad66';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x - 35, y + 3);
        ctx.lineTo(x - 20, y - 14);
        ctx.stroke();
    }
    else if (b.kind === 'quarry') {
        poly(ctx, [[x - 45, y - 8], [x - 1, y - 24], [x + 44, y - 4], [x + 5, y + 16]], '#7f8f8a', '#5b6a6c');
        for (let i = 0; i < 5; i++) {
            let xx = x - 30 + i * 14, yy = y - 9 + (i % 2) * 9;
            poly(ctx, [[xx - 12, yy + 7], [xx - 6, yy - 5], [xx + 9, yy - 13], [xx + 18, yy + 3], [xx + 5, yy + 12]], i % 2 ? '#9ea9a3' : '#697e80', '#4c6669');
        }
        rr(ctx, x + 14, y - 5, 23, 6, 2, '#b6a075');
    }
    else if (b.kind === 'well') {
        ellipse(ctx, x, y - 5, 28, 13, '#b4ac95');
        ellipse(ctx, x, y - 8, 19, 8, '#406a75');
        rr(ctx, x - 25, y - 30, 6, 28, 1, '#84644c');
        rr(ctx, x + 18, y - 30, 6, 28, 1, '#84644c');
        poly(ctx, [[x - 31, y - 30], [x, y - 50], [x + 32, y - 29], [x, y - 38]], '#ac6851');
    }
    else if (b.kind === 'herbal_garden') {
        poly(ctx, [[x - 40, y - 5], [x - 7, y - 18], [x + 41, y], [x + 8, y + 15]], '#6e8f58');
        for (let i = 0; i < 9; i++) {
            const px = x - 20 + (i % 4) * 13, py = y - 7 + Math.floor(i / 4) * 8;
            ellipse(ctx, px, py, 5, 4, i % 3 === 0 ? '#d89eb0' : '#61994d');
        }
        rr(ctx, x + 25, y - 22, 8, 24, 2, '#c0b69c');
    }
    else if (b.kind === 'market') {
        poly(ctx, [[x - 35, y - 21], [x - 6, y - 47], [x + 38, y - 18], [x + 9, y + 5]], '#c76560', '#884c4c');
        for (let i = 0; i < 4; i++) {
            poly(ctx, [[x - 29 + i * 13, y - 27 + i * 2], [x - 22 + i * 13, y - 32 + i * 2], [x - 4 + i * 13, y - 17 + i * 2], [x - 11 + i * 13, y - 12 + i * 2]], '#eccd91');
        }
        rr(ctx, x - 20, y - 12, 4, 21, 1, '#a78958');
        rr(ctx, x + 22, y - 8, 4, 18, 1, '#a78958');
        rr(ctx, x - 15, y + 1, 36, 7, 2, '#aa784d');
    }
    else if (b.kind === 'storehouse') {
        drawHouse(ctx, x, y - 12, 1.1, '#c5ad87', '#6b6d61');
        rr(ctx, x - 10, y - 20, 20, 24, 3, '#785c48');
        for (let i = 0; i < 3; i++)
            rr(ctx, x + 24 + i * 4, y - 4 + i * 3, 14, 6, 2, '#9f7c4d');
    }
    else if (b.kind === 'workshop') {
        drawHouse(ctx, x, y - 10, 1.08, '#9f8171', '#73534b');
        rr(ctx, x + 18, y - 75, 11, 34, 2, '#74645e');
        for (let i = 0; i < 3; i++)
            ellipse(ctx, x + 24 + Math.sin(t + i) * 3, y - 92 - i * 10, 8 + i * 4, 5 + i * 3, '#d0dbbe27');
    }
    else if (b.kind === 'clay_pit') {
        poly(ctx, [[x - 38, y - 10], [x + 7, y - 29], [x + 43, y - 5], [x + 3, y + 14]], '#ab765b', '#704c3e');
        ellipse(ctx, x + 5, y - 5, 28, 10, '#895944');
        for (let i = 0; i < 4; i++) {
            poly(ctx, [[x - 25 + i * 15, y - 8], [x - 17 + i * 15, y - 18], [x - 9 + i * 15, y - 5]], '#ca9974');
        }
        rr(ctx, x + 25, y - 23, 5, 25, 2, '#755c43');
    }
    else if (b.kind === 'sawmill') {
        drawHouse(ctx, x - 12, y - 6, .85, '#b59c75', '#865c3b');
        rr(ctx, x + 15, y - 33, 36, 8, 3, '#87623d');
        rr(ctx, x + 23, y - 50, 6, 47, 2, '#624a38');
        ctx.strokeStyle = '#ddc18c';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(x + 24, y - 17, 16, 0, Math.PI * 2);
        ctx.stroke();
        for (let i = 0; i < 3; i++)
            rr(ctx, x + 18 + i * 4, y + 4 + i * 3, 27, 5, 2, '#d0a36e');
    }
    else if (b.kind === 'kiln') {
        poly(ctx, [[x - 33, y + 3], [x - 33, y - 28], [x + 1, y - 45], [x + 32, y - 24], [x + 32, y + 5], [x + 1, y + 18]], '#b66b4e', '#835449');
        poly(ctx, [[x - 33, y - 28], [x + 1, y - 45], [x + 32, y - 24], [x, y - 10]], '#c78c68');
        rr(ctx, x - 8, y - 8, 18, 19, 5, '#713c2b');
        ellipse(ctx, x + 2, y + 4, 7, 4, '#ec9b55');
        rr(ctx, x + 20, y - 70, 11, 45, 2, '#89675a');
        for (let i = 0; i < 3; i++)
            ellipse(ctx, x + 26 + Math.sin(t + i) * 4, y - 80 - i * 8, 9 + i * 3, 5, '#cad8cb33');
    }
    else if (b.kind === 'iron_mine') {
        poly(ctx, [[x - 42, y - 8], [x + 4, y - 28], [x + 40, y - 10], [x + 7, y + 10]], '#7d7770', '#5f625f');
        poly(ctx, [[x - 26, y - 13], [x - 12, y - 25], [x + 12, y - 12], [x + 4, y + 4]], '#3c4a47');
        rr(ctx, x + 13, y - 26, 5, 31, 1, '#a47d57');
        rr(ctx, x - 21, y - 28, 5, 29, 1, '#a47d57');
        rr(ctx, x - 25, y - 27, 43, 5, 1, '#d4a96f');
        for (let i = 0; i < 4; i++)
            ellipse(ctx, x + 20 + i * 6, y + i % 2 * 5, 4, 3, '#b98867');
    }
    else if (b.kind === 'smelter') {
        drawHouse(ctx, x - 9, y - 6, 1, '#9d8072', '#6f5650');
        rr(ctx, x + 16, y - 94, 14, 65, 2, '#7b6863');
        ellipse(ctx, x + 23, y - 103, 16, 7, '#b8c8b333');
        rr(ctx, x - 5, y - 22, 19, 22, 3, '#c3724b');
        ellipse(ctx, x + 4, y - 7, 9, 5, '#efae6d');
        for (let i = 0; i < 3; i++)
            ellipse(ctx, x + 23 + Math.sin(t + i) * 4, y - 110 - i * 12, 12 + i * 3, 7, '#cbd2bf22');
    }
    else if (b.kind === 'apothecary') {
        drawHouse(ctx, x, y - 7, .93, '#a3ad8a', '#63826e');
        rr(ctx, x - 32, y - 42, 10, 13, 3, '#7da17c');
        rr(ctx, x + 22, y - 36, 10, 18, 3, '#8cc5a1');
        ellipse(ctx, x - 27, y - 46, 7, 5, '#ddb6aa');
        ellipse(ctx, x + 30, y - 37, 8, 4, '#dbcfac');
    }
    else if (b.kind === 'archive') {
        drawHouse(ctx, x, y - 8, 1.15, '#adb9a6', '#6c7d7b');
        poly(ctx, [[x - 36, y - 55], [x, y - 95], [x + 36, y - 55], [x, y - 42]], '#7795a1');
        rr(ctx, x - 17, y - 38, 34, 8, 2, '#e3c58d');
        rr(ctx, x - 21, y - 19, 42, 7, 2, '#718d88');
    }
    else if (b.kind === 'common_hall') {
        drawHouse(ctx, x, y - 7, 1.3, '#d4ba87', '#7b4c43');
        rr(ctx, x - 7, y - 23, 13, 25, 1, '#574c3d');
        rr(ctx, x - 29, y - 37, 11, 11, 1, '#ecbd70');
        rr(ctx, x + 20, y - 37, 11, 11, 1, '#ecbd70');
        ctx.strokeStyle = '#ddc88f';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y - 90);
        ctx.lineTo(x, y - 118);
        ctx.stroke();
        poly(ctx, [[x, y - 117], [x + 28, y - 112], [x, y - 106]], '#e6c17a');
    }
    else {
        drawHouse(ctx, x, y - 7, 0.9, '#c49d76', '#915746');
    }
    if (b.level > 1) {
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#eccc85';
        ctx.fillText('✦', x + 37, y - 52);
    }
    ctx.restore();
}
function drawHouse(ctx, x, y, s, front, side) { const w = 33 * s, h = 38 * s; poly(ctx, [[x - w, y], [x, y + h * 0.30], [x, y - h * .72], [x - w, y - h]], front, '#5e5a47'); poly(ctx, [[x, y + h * .30], [x + w, y], [x + w, y - h], [x, y - h * .72]], side, '#5e5a47'); poly(ctx, [[x - w - 7 * s, y - h], [x, y - h - 26 * s], [x + w + 7 * s, y - h], [x, y - h + 5 * s]], '#a45548', '#753e3c'); poly(ctx, [[x - w - 7 * s, y - h], [x, y - h - 26 * s], [x, y - h + 5 * s]], '#bd7355'); rr(ctx, x - 12 * s, y - 12 * s, 12 * s, 19 * s, 3 * s, '#69533d'); rr(ctx, x + 12 * s, y - 14 * s, 9 * s, 10 * s, 2 * s, '#eec581'); }
export function mountTown(canvas, state, onPick, reducedMotion = false, strategic = false) {
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return { dispose() { }, focus() { }, zoom() { }, reset() { } };
    let running = true, frameId = 0, panX = 0, panY = 0, zoom = 1, down = null, dragged = false, frame = 0, hovered = -1, lastFrame = -100;
    const parcelBuildings = new Map(state.buildings.map(b => [b.parcel, b]));
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    function draw(ms) {
        if (!running || !ctx)
            return;
        // Limit animation painting to roughly 30 FPS on mobile to reduce battery use;
        // controls, taps and reduced-motion frames still draw immediately.
        if (!reducedMotion && ms - lastFrame < 30) {
            frameId = requestAnimationFrame(draw);
            return;
        }
        lastFrame = ms;
        const season = yearWeek(state.turn).season;
        const palette = season === 'Winter' ? { sky: ['#92a9bf', '#c6d4d6', '#708f91'], mountain: '#7996a0', near: '#628980', grass: ['#b7c6af', '#a7b8ab'], edge: '#819c91', spark: '#fff9ed9b' } :
            season === 'Autumn' ? { sky: ['#ae977c', '#e3bc8f', '#8a956c'], mountain: '#917e76', near: '#95865c', grass: ['#b5a76e', '#afa16d'], edge: '#7f8455', spark: '#e2b35ba8' } :
                season === 'Spring' ? { sky: ['#87b4ae', '#d3d9b5', '#67a38b'], mountain: '#719597', near: '#5b9479', grass: ['#8eb77a', '#80ad71'], edge: '#5d8c63', spark: '#ebdc9ca0' } :
                    { sky: ['#8da9a3', '#d3bd8b', '#547e66'], mountain: '#6d8685', near: '#5e9079', grass: ['#83a67a', '#759a70'], edge: '#55745b', spark: '#bfd1a17a' };
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);
        const sky = ctx.createLinearGradient(0, 0, 0, H);
        sky.addColorStop(0, palette.sky[0]);
        sky.addColorStop(.4, palette.sky[1]);
        sky.addColorStop(1, palette.sky[2]);
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, W, H);
        ellipse(ctx, 668, 91, 62, 62, '#efdb9d44');
        for (let i = 0; i < 5; i++) {
            const x = 80 + i * 180;
            ellipse(ctx, x, 70 + (i % 2) * 29, 94, 19, '#f3e9cf3d');
        }
        poly(ctx, [[0, 278], [110, 143], [231, 264], [358, 119], [497, 263], [624, 157], [820, 263], [820, 480], [0, 480]], palette.mountain);
        poly(ctx, [[0, 300], [135, 196], [254, 278], [380, 194], [532, 280], [690, 206], [820, 273], [820, 580], [0, 580]], palette.near);
        poly(ctx, [[0, 366], [96, 309], [220, 352], [370, 296], [540, 344], [710, 275], [820, 309], [820, 575], [0, 575]], '#487a5e');
        // Pass 28: atmospheric layers, distant village and a gentle gold-hour haze.
        const glow = ctx.createRadialGradient(670, 105, 6, 670, 105, 350);
        glow.addColorStop(0, season === 'Winter' ? '#d9e9ff59' : '#ffe7a96b');
        glow.addColorStop(1, '#f3c88100');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, W, 420);
        for (let i = 0; i < 19; i++) {
            const x = hash(i * 17 + 33) * W, y = 222 + hash(i * 13 + 9) * 76;
            ctx.globalAlpha = .17 + hash(i * 19) * .16;
            poly(ctx, [[x - 12, y + 11], [x - 12, y - 9], [x + 11, y - 9], [x + 11, y + 11]], '#203c38');
            poly(ctx, [[x - 16, y - 9], [x, y - 22], [x + 15, y - 9]], '#d4c19c');
        }
        ctx.globalAlpha = 1;
        for (let i = 0; i < 5; i++) {
            const px = 100 + i * 163, py = 289 + hash(i + 81) * 17;
            ellipse(ctx, px, py, 135, 9, '#edf2db14');
        }
        // Decorative river to the southwest
        poly(ctx, [[0, 420], [125, 382], [194, 436], [298, 460], [359, 574], [0, 575]], '#467f8b');
        poly(ctx, [[0, 447], [110, 406], [183, 459], [287, 485], [340, 575], [276, 575], [197, 504], [90, 446], [0, 480]], '#74b5b4');
        ctx.strokeStyle = '#b4d7c492';
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
            ctx.beginPath();
            const x = 25 + i * 39, y = 451 + (i * 13) % 79;
            ctx.moveTo(x, y);
            ctx.lineTo(x + 28, y + 5);
            ctx.stroke();
        }
        // Old crossing: visible on the river, with raised wooden planks and rope posts.
        poly(ctx, [[105, 405], [133, 392], [213, 452], [189, 467]], '#695b42', '#302f2a');
        for (let i = 0; i < 10; i++) {
            const px = 119 + i * 8.5, py = 401 + i * 5.8;
            ctx.strokeStyle = i % 2 ? '#b89c6e' : '#866d52';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(px - 11, py + 7);
            ctx.lineTo(px + 14, py - 6);
            ctx.stroke();
        }
        for (let i = 0; i < 4; i++) {
            let px = 102 + i * 32, py = 397 + i * 24;
            rr(ctx, px, py - 17, 5, 20, 1, '#dbc08c');
        }
        if (!reducedMotion) {
            for (let i = 0; i < 9; i++) {
                let x = 12 + i * 39, y = 460 + (i * 17) % 84;
                ctx.strokeStyle = '#d0eece80';
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(x + Math.sin(ms / 1700 + i) * 7, y);
                ctx.lineTo(x + 23 + Math.sin(ms / 1700 + i) * 7, y + 2);
                ctx.stroke();
            }
        }
        for (let i = 0; i < 35; i++) {
            const x = hash(i + 19) * W, y = 314 + hash(i * 3 + 99) * 235;
            if (x > 260 && x < 740 && y > 315 && y < 550)
                continue;
            tree(ctx, x, y, .45 + hash(i + 49) * .5, hash(i + 23));
        }
        ctx.translate(panX, panY);
        ctx.translate(410, 355);
        ctx.scale(zoom, zoom);
        ctx.translate(-410, -355);
        const isAutumn = season === 'Autumn';
        // The connected floating-isometric grassy parcel field
        for (let r = 0; r < 5; r++) {
            for (let c = 0; c < 6; c++) {
                const id = r * 6 + c;
                const p = iso(c, r);
                const color = palette.grass[(c + r) % 2];
                poly(ctx, [[p.x, p.y - TH / 2], [p.x + TW / 2, p.y], [p.x, p.y + TH / 2], [p.x - TW / 2, p.y]], color, palette.edge);
                poly(ctx, [[p.x - TW / 2, p.y], [p.x, p.y + TH / 2], [p.x, p.y + TH / 2 + 12], [p.x - TW / 2, p.y + 12]], palette.edge);
                poly(ctx, [[p.x, p.y + TH / 2], [p.x + TW / 2, p.y], [p.x + TW / 2, p.y + 12], [p.x, p.y + TH / 2 + 12]], '#49674e');
                if (hash(id * 9) > 0.5) {
                    ctx.fillStyle = palette.spark;
                    for (let j = 0; j < 4; j++)
                        ellipse(ctx, p.x + (hash(id + j + 1) - .5) * 65, p.y + (hash(id + j + 9) - .5) * 23, 2, 1.5, ctx.fillStyle);
                }
                // Worn footpaths keep the settlements connected without changing buildable parcels.
                if ((r === 2 || c === 2) && id !== 0) {
                    poly(ctx, [[p.x - 23, p.y - 5], [p.x + 9, p.y - 15], [p.x + 24, p.y - 7], [p.x - 8, p.y + 4]], '#baa67a60');
                    ctx.strokeStyle = '#e0c99a50';
                    ctx.lineWidth = 1.4;
                    ctx.beginPath();
                    ctx.moveTo(p.x - 17, p.y - 1);
                    ctx.lineTo(p.x + 15, p.y - 11);
                    ctx.stroke();
                }
                const b = parcelBuildings.get(id);
                if (b)
                    drawBuilding(ctx, b, p.x, p.y, ms / 1100);
                else {
                    if (hash(id * 17) > .75) {
                        tree(ctx, p.x + 8, p.y - 2, .45, hash(id + 5));
                    }
                    else {
                        ellipse(ctx, p.x, p.y - 2, 7, 2, '#b4c18e73');
                    }
                }
            }
        }
        // District labels and clear parcel outlines are opt-in; the normal view stays scenic.
        if (strategic) {
            ctx.save();
            ctx.textAlign = 'center';
            ctx.font = '800 20px system-ui, sans-serif';
            for (let r = 0; r < 5; r++)
                for (let c = 0; c < 6; c++) {
                    const id = r * 6 + c, p = iso(c, r), b = parcelBuildings.get(id);
                    poly(ctx, [[p.x, p.y - 24], [p.x + 48, p.y], [p.x, p.y + 24], [p.x - 48, p.y]], b ? '#244d4a34' : '#7fe6ae25', b ? '#eed38c66' : '#afedbd88');
                    rr(ctx, p.x - 17, p.y - 18, 34, 28, 8, b ? '#152f2ddc' : '#244a39dc');
                    ctx.fillStyle = b ? '#fff1bb' : '#d7f8da';
                    ctx.fillText(String(id + 1), p.x, p.y + 3);
                }
            ctx.restore();
        }
        if (hovered >= 0) {
            const p = iso(hovered % 6, Math.floor(hovered / 6));
            poly(ctx, [[p.x, p.y - 26], [p.x + 53, p.y], [p.x, p.y + 26], [p.x - 53, p.y]], '#e8cf7640', '#fbe9b0');
            const b = parcelBuildings.get(hovered);
            ctx.textAlign = 'center';
            ctx.font = '700 13px system-ui,sans-serif';
            const caption = b ? BUILDINGS[b.kind].name : 'Empty parcel';
            const width = Math.min(150, Math.max(83, caption.length * 7.6 + 17));
            rr(ctx, p.x - width / 2, p.y - 83, width, 27, 9, '#102e2adf');
            ctx.fillStyle = '#f8e5b2';
            ctx.fillText(caption, p.x, p.y - 65);
        }
        // Hanging lanterns make the village feel inhabited at any population size.
        for (let i = 0; i < 6; i++) {
            const c = i % 3 * 2, r = Math.floor(i / 3) * 3, p = iso(c, r), flicker = reducedMotion ? 1 : .85 + .15 * Math.sin(ms / 320 + i);
            rr(ctx, p.x + 33, p.y - 27, 3, 37, 1, '#4f5b47');
            light(ctx, p.x + 34, p.y - 28, 16 * flicker);
            ellipse(ctx, p.x + 34, p.y - 28, 2, 3, '#ffe9ad');
        }
        if (season === 'Winter') {
            for (let i = 0; i < 24; i++) {
                const x = hash(i * 13 + 7) * W, y = (hash(i * 23 + 11) * H + (reducedMotion ? 0 : ms * .006 * (.8 + hash(i * 7)))) % H;
                ellipse(ctx, x, y, 1.9, 1.5, '#f7f9e4ad');
            }
        }
        if (season === 'Autumn') {
            for (let i = 0; i < 14; i++) {
                const x = hash(i * 11 + 2) * W, y = hash(i * 13 + 4) * H;
                ellipse(ctx, x, y, 3, 1.3, '#e8ad5b88');
            }
        }
        // Foreground vine details and townspeople
        for (let i = 0; i < 4; i++) {
            const x = 264 + i * 114 + (reducedMotion ? 0 : Math.sin(ms / 1700 + i) * 10), y = 477 + (i % 2) * 36;
            ellipse(ctx, x, y + 5, 8, 3, '#213d3070');
            ctx.fillStyle = ['#d0ab6c', '#dbd1b7', '#9cbab0', '#c99579'][i];
            ctx.fillRect(x - 3, y - 11, 6, 11);
            ellipse(ctx, x, y - 14, 5, 5, '#ddc5a1');
        }
        // lower edge for legibility
        const vignette = ctx.createLinearGradient(0, 0, 0, H);
        vignette.addColorStop(0, '#122f2300');
        vignette.addColorStop(.82, '#102b2200');
        vignette.addColorStop(1, '#102b22ad');
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, W, H);
        frame++;
        if (!reducedMotion && document.visibilityState !== 'hidden')
            frameId = requestAnimationFrame(draw);
    }
    frameId = requestAnimationFrame(draw);
    const onVisibility = () => { if (running && !reducedMotion && document.visibilityState === 'visible') {
        cancelAnimationFrame(frameId);
        lastFrame = -100;
        frameId = requestAnimationFrame(draw);
    } };
    document.addEventListener('visibilitychange', onVisibility);
    const fromPointer = (ev) => { const rect = canvas.getBoundingClientRect(); let x = (ev.clientX - rect.left) * W / rect.width, y = (ev.clientY - rect.top) * H / rect.height; x = (x - 410 - panX) / zoom + 410; y = (y - 355 - panY) / zoom + 355; return { x, y }; };
    const pointerDown = (ev) => { down = { x: ev.clientX, y: ev.clientY }; dragged = false; canvas.setPointerCapture(ev.pointerId); };
    const pointerMove = (ev) => {
        if (!down) {
            const pt = fromPointer(ev);
            let newHover = -1;
            for (let row = 0; row < 5; row++)
                for (let col = 0; col < 6; col++) {
                    const p = iso(col, row);
                    if (Math.abs((pt.x - p.x) / (TW / 2)) + Math.abs((pt.y - p.y) / (TH / 2)) < 1.2)
                        newHover = row * 6 + col;
                }
            if (newHover !== hovered) {
                hovered = newHover;
                if (reducedMotion)
                    draw(0);
            }
            return;
        }
        const dx = ev.clientX - down.x, dy = ev.clientY - down.y;
        if (Math.abs(dx) + Math.abs(dy) > 7)
            dragged = true;
        if (dragged) {
            const r = canvas.getBoundingClientRect();
            panX = Math.max(-190, Math.min(190, panX + dx * W / r.width));
            panY = Math.max(-135, Math.min(135, panY + dy * H / r.height));
            down = { x: ev.clientX, y: ev.clientY };
            if (reducedMotion)
                draw(0);
        }
    };
    const pointerUp = (ev) => { if (!down)
        return; if (!dragged) {
        const pt = fromPointer(ev);
        let best = -1, bestD = Infinity;
        for (let row = 0; row < 5; row++)
            for (let col = 0; col < 6; col++) {
                const p = iso(col, row);
                const dist = Math.abs((pt.x - p.x) / (TW / 2)) + Math.abs((pt.y - p.y) / (TH / 2));
                if (dist < 1.25 && dist < bestD) {
                    bestD = dist;
                    best = row * 6 + col;
                }
            }
        if (best >= 0)
            onPick(best);
    } down = null; };
    const pointerLeave = () => { hovered = -1; if (reducedMotion)
        draw(0); };
    const wheel = (ev) => { if (ev.ctrlKey || ev.altKey) {
        ev.preventDefault();
        zoom = Math.max(.75, Math.min(1.75, zoom - ev.deltaY * .001));
        if (reducedMotion)
            draw(0);
    } };
    canvas.addEventListener('pointerleave', pointerLeave);
    canvas.addEventListener('wheel', wheel, { passive: false });
    canvas.addEventListener('pointerdown', pointerDown);
    canvas.addEventListener('pointermove', pointerMove);
    const pointerCancel = () => { down = null; hovered = -1; };
    canvas.addEventListener('pointerup', pointerUp);
    canvas.addEventListener('pointercancel', pointerCancel);
    return { dispose() { running = false; cancelAnimationFrame(frameId); document.removeEventListener('visibilitychange', onVisibility); canvas.removeEventListener('pointerdown', pointerDown); canvas.removeEventListener('pointermove', pointerMove); canvas.removeEventListener('pointerup', pointerUp); canvas.removeEventListener('pointercancel', pointerCancel); canvas.removeEventListener('pointerleave', pointerLeave); canvas.removeEventListener('wheel', wheel); }, focus(delta) { panX += delta; if (reducedMotion)
            draw(0); }, zoom(delta) { zoom = Math.max(.75, Math.min(1.75, zoom + delta)); if (reducedMotion)
            draw(0); }, reset() { zoom = 1; panX = 0; panY = 0; hovered = -1; if (reducedMotion)
            draw(0); } };
}

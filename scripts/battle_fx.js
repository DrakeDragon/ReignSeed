const W = 900, H = 350;
function ellipse(c, x, y, rx, ry, color) { c.beginPath(); c.ellipse(x, y, Math.max(.1, rx), Math.max(.1, ry), 0, 0, Math.PI * 2); c.fillStyle = color; c.fill(); }
function line(c, pts, color, width = 2) { c.strokeStyle = color; c.lineWidth = width; c.lineCap = 'round'; c.lineJoin = 'round'; c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke(); }
function poly(c, pts, color, outline) { c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.closePath(); c.fillStyle = color; c.fill(); if (outline) {
    c.strokeStyle = outline;
    c.lineWidth = 2;
    c.stroke();
} }
function round(c, x, y, w, h, r, color) { c.fillStyle = color; c.beginPath(); c.roundRect(x, y, w, h, r); c.fill(); }
function dot(c, x, y, r, col) { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fillStyle = col; c.fill(); }
function terrain(c, boss, t, reduced) {
    const bg = c.createLinearGradient(0, 0, 0, H);
    let forest = ['hollow_stag', 'grainline_keeper', 'rootbound_custodian'].includes(boss), river = ['bridgebreaker', 'weighhouse_auditor', 'tideglass_keeper'].includes(boss), veymark = ['beacon_husk', 'archive_magistrate', 'crown_regulator', 'ash_ward_guardian', 'court_sentinel', 'orchard_protector', 'civic_warden', 'names_warden'].includes(boss), crypt = !forest && !river && !veymark;
    bg.addColorStop(0, forest ? '#132f32' : river ? '#243e48' : veymark ? '#181b34' : '#192e3b');
    bg.addColorStop(.52, forest ? '#346050' : river ? '#486972' : veymark ? '#343e53' : '#384b50');
    bg.addColorStop(1, forest ? '#203d32' : river ? '#1a3942' : veymark ? '#242c34' : '#202f31');
    c.fillStyle = bg;
    c.fillRect(0, 0, W, H);
    // distant slopes / ancient stone archways
    poly(c, [[0, 170], [75, 87], [147, 155], [240, 83], [370, 177], [510, 91], [610, 166], [795, 83], [900, 144], [900, H], [0, H]], forest ? '#254b47' : river ? '#344e59' : '#2a454b');
    if (veymark) {
        for (let i = 0; i < 6; i++) {
            const x = 30 + i * 165;
            round(c, x, 37, 43, 189, 5, '#536071');
            round(c, x + 8, 44, 27, 186, 3, '#2a3445');
            round(c, x - 13, 26, 70, 18, 4, '#8c8b86');
        }
        for (let i = 0; i < 3; i++) {
            const x = 158 + i * 275;
            poly(c, [[x - 62, 48], [x, 13], [x + 62, 48], [x + 62, 123], [x - 62, 123]], '#6d6370', '#b6a384');
            poly(c, [[x - 40, 55], [x, 35], [x + 40, 55], [x + 40, 115], [x - 40, 115]], i === 1 ? '#7a666d' : '#52657d');
            line(c, [[x, 38], [x, 112]], '#dfb97488', 3);
            line(c, [[x - 36, 78], [x + 36, 78]], '#d5c4a277', 3);
        }
        const delta = reduced ? 0 : Math.sin(t * .4) * 3;
        ellipse(c, 480, 94 + delta, 126, 63, '#d7a66f0c');
        line(c, [[300, 163], [440, 128], [560, 128], [675, 165]], '#d8c58c60', 6);
    }
    if (crypt) {
        for (let i = 0; i < 6; i++) {
            let x = i * 176 - 38;
            round(c, x, 40, 40, 210, 8, '#66736c');
            round(c, x + 7, 45, 27, 206, 5, '#2b4141');
            round(c, x - 15, 34, 70, 18, 4, '#859085');
            for (let k = 0; k < 4; k++)
                line(c, [[x + 5, 80 + k * 37], [x + 31, 78 + k * 37]], '#76847d', 1.5);
        }
        line(c, [[0, 163], [180, 112], [450, 146], [680, 96], [900, 163]], '#bba67e45', 8);
    }
    if (forest) {
        for (let i = 0; i < 12; i++) {
            let x = i * 93 - 20;
            round(c, x, 16 + (i % 3) * 15, 13, 230, 5, i % 2 ? '#23413d' : '#315044');
            for (let z = 0; z < 4; z++)
                ellipse(c, x + 7 + (z % 2 ? -15 : 9), 37 + z * 38, 35, 28, z % 2 ? '#356d57' : '#285544');
        }
        for (let i = 0; i < 20; i++) {
            const x = (i * 59 + 31) % W;
            ellipse(c, x, 290 + (i % 3) * 10, 7, 3, '#a0cb9260');
        }
    }
    if (river) {
        for (let i = 0; i < 9; i++) {
            const x = i * 111 + 32;
            poly(c, [[x - 50, 195], [x - 28, 142], [x + 18, 140], [x + 47, 191]], i % 2 ? '#59625b' : '#64746c');
        }
        for (let i = 0; i < 16; i++) {
            const y = 254 + i * 7, shift = reduced ? 0 : Math.sin(t * .9 + i * .7) * 15;
            line(c, [[25 + shift + (i % 3) * 45, y], [205 + shift + (i % 3) * 45, y - 2]], '#72b8bc50', 2);
            line(c, [[490 + shift, y], [700 + shift, y + 3]], '#8ad5d558', 2);
        }
    }
    const floor = c.createLinearGradient(0, 205, 0, H);
    floor.addColorStop(0, '#7b826d');
    floor.addColorStop(.25, '#59665b');
    floor.addColorStop(1, '#243b39');
    poly(c, [[0, 212], [900, 213], [900, H], [0, H]], floor);
    for (let i = 0; i < 14; i++) {
        let y = 218 + i * 10;
        line(c, [[0, y], [900, y + Math.sin(i) * 4]], '#c5ca9c1d', 1);
    }
    for (let i = 0; i < 10; i++) {
        let x = 50 + i * 90;
        line(c, [[x, 210], [x - 28, H]], '#192d3290', 1.5);
    }
    const light = c.createRadialGradient(450, 135, 10, 450, 135, 300);
    light.addColorStop(0, forest ? '#c5e3a21c' : '#dbcfaa20');
    light.addColorStop(1, '#00000000');
    c.fillStyle = light;
    c.fillRect(0, 0, W, H);
    if (!reduced) {
        for (let i = 0; i < 20; i++) {
            let x = (i * 127 + t * (i % 2 ? 3 : -2) * 4) % W, y = (i * 49 + 35 + Math.sin(t + i) * 10) % 200;
            dot(c, x, y, 1.4 + (i % 3) * .5, forest ? '#e3dfaa60' : '#f9d3aa50');
        }
    }
}
function plate(c, x, y, w, h, fill, stroke = '#132a2b') { round(c, x, y, w, h, 4, fill); c.strokeStyle = stroke; c.lineWidth = 2; c.strokeRect(x + 1, y + 1, w - 2, h - 2); }
function heroSprite(c, h, x, y, t, reduced, guard, focus) {
    const bob = reduced ? 0 : Math.sin(t * 2.8 + (h.level % 4)) * 2.6;
    c.save();
    c.translate(x, y + bob);
    ellipse(c, 0, 4, 31, 8, '#051e2080');
    const armor = h.classId === 'guardian' ? '#b4b7a1' : h.classId === 'ranger' ? '#567963' : h.classId === 'engineer' ? '#b58658' : '#91a184';
    const cape = h.classId === 'warden' ? '#3b774c' : h.classId === 'ranger' ? '#365946' : '#62534a';
    poly(c, [[-17, -36], [-26, -1], [-3, -5], [16, -36]], cape);
    // footwork / legs animate smoothly
    const step = reduced ? 0 : Math.sin(t * 3 + (x % 11)) * 2.7;
    line(c, [[-11, -25], [-12 - step, -1]], '#302b2a', 8);
    line(c, [[9, -26], [13 + step, -1]], '#302b2a', 8);
    line(c, [[-12 - step, -1], [-19 - step, 0]], '#a29b80', 6);
    line(c, [[13 + step, -1], [20 + step, 0]], '#a29b80', 6);
    poly(c, [[-19, -63], [14, -64], [20, -31], [6, -25], [-17, -30]], armor, '#25383a');
    plate(c, -16, -59, 32, 14, '#ffffff23', '#ffffff00');
    ellipse(c, 0, -78, 16, 18, '#d5b295');
    if (h.classId === 'ranger') {
        poly(c, [[-21, -81], [0, -100], [22, -79], [13, -67], [-16, -70]], '#315541');
        line(c, [[19, -58], [30, -80], [37, -47]], '#c8a56c', 3);
    }
    else if (h.classId === 'engineer') {
        poly(c, [[-17, -92], [0, -103], [17, -92], [15, -81], [-16, -81]], '#87724d');
        round(c, -15, -84, 30, 7, 2, '#ceae6b');
        line(c, [[21, -54], [34, -74]], '#9e9e95', 6);
        dot(c, 35, -76, 7, '#d5bc8a');
    }
    else if (h.classId === 'warden') {
        poly(c, [[-19, -87], [0, -107], [19, -87], [9, -77], [-10, -77]], '#476e53');
        line(c, [[21, -37], [29, -105]], '#bb9761', 4);
        for (let k = 0; k < 4; k++)
            dot(c, 29 + Math.sin(t + k) * 6, -103 - k * 3, 3, '#9cce88');
    }
    else {
        poly(c, [[-18, -87], [0, -105], [18, -87], [15, -79], [-15, -79]], '#757e85');
        round(c, -3, -104, 6, 20, 3, '#f0d29b');
        line(c, [[18, -45], [35, -76]], '#bac1b6', 5);
        poly(c, [[35, -77], [31, -86], [44, -91], [43, -76]], '#d6d7cb');
        round(c, -34, -59, 20, 29, 6, '#927d53');
    }
    // animated arms
    const sway = reduced ? 0 : Math.sin(t * 3 + (x % 7)) * 3;
    line(c, [[-16, -52], [-26, -33 + sway]], armor, 8);
    line(c, [[16, -53], [25, -33 - sway]], armor, 8);
    ellipse(c, -26, -32 + sway, 5, 5, '#d1ad89');
    ellipse(c, 25, -33 - sway, 5, 5, '#d1ad89');
    if (guard > 0) {
        c.strokeStyle = '#b7e8c6aa';
        c.lineWidth = 3;
        c.beginPath();
        c.arc(0, -52, 45, Math.PI * .16, Math.PI * 1.82);
        c.stroke();
    }
    if (focus >= 3 && !reduced) {
        dot(c, 0, -65, 43, '#9bd8c108');
    }
    c.restore();
}
function wolf(c, x, y, t, reduced, stag) {
    const bob = reduced ? 0 : Math.sin(t * 3 + x) * 2;
    c.save();
    c.translate(x, y + bob);
    ellipse(c, 0, 3, 38, 8, '#10282688');
    const fur = stag ? '#b99c67' : '#4c5961';
    const shade = stag ? '#796945' : '#313c45';
    for (const lx of [-23, -8, 15, 28])
        line(c, [[lx, -26], [lx + (reduced ? 0 : Math.sin(t * 4 + lx) * 2), -2]], shade, 7);
    ellipse(c, 0, -40, 36, 22, fur);
    poly(c, [[14, -54], [35, -72], [49, -57], [37, -36]], fur);
    ellipse(c, 41, -55, 15, 13, fur);
    dot(c, 49, -58, 3, stag ? '#f4ddae' : '#f0bd8a');
    poly(c, [[-24, -49], [-52, -68], [-38, -39]], shade);
    poly(c, [[30, -67], [25, -83], [38, -75]], shade);
    poly(c, [[40, -66], [47, -84], [54, -65]], shade);
    if (stag) {
        for (const sign of [-1, 1]) {
            const a = 31 + sign * 9;
            line(c, [[a, -78], [a + sign * 13, -113], [a + sign * 17, -136]], '#e2c892', 4);
            line(c, [[a + sign * 12, -106], [a + sign * 1, -124]], '#e2c892', 3);
            line(c, [[a + sign * 14, -116], [a + sign * 29, -130]], '#e2c892', 3);
        }
        dot(c, 7, -43, 13, '#a8deaf30');
    }
    else
        line(c, [[-31, -43], [-53, -70], [-64, -67]], shade, 7);
    c.restore();
}
function construct(c, x, y, t, reduced, boss, phase) {
    const s = boss ? 1.45 : 1;
    c.save();
    c.translate(x, y);
    c.scale(s, s);
    const bob = reduced ? 0 : Math.sin(t * 2.2) * 2;
    ellipse(c, 0, 3, 37, 9, '#06191a99');
    const bronze = phase === 3 ? '#b27852' : '#808d86', trim = phase === 3 ? '#f2bb6d' : '#d4b97b';
    for (const sign of [-1, 1]) {
        line(c, [[sign * 17, -31], [sign * 24, -6]], '#4d5653', 11);
        ellipse(c, sign * 24, -5, 12, 7, '#59665c');
    }
    poly(c, [[-28, -69 + bob], [28, -69 + bob], [27, -25 + bob], [-27, -25 + bob]], bronze, '#465958');
    round(c, -24, -62 + bob, 48, 11, 3, '#bec3a19a');
    poly(c, [[-20, -81 + bob], [0, -100 + bob], [20, -81 + bob], [17, -60 + bob], [-17, -60 + bob]], '#586a65', '#b8b79b');
    ellipse(c, 0, -70 + bob, 10, 10, phase === 3 ? '#ed9c4c' : '#86d4c1');
    if (!reduced) {
        ellipse(c, 0, -70 + bob, 19 + Math.sin(t * 4) * 3, 19 + Math.sin(t * 4) * 3, phase === 3 ? '#ef9a2c22' : '#71d9c220');
    }
    for (const sign of [-1, 1]) {
        line(c, [[sign * 26, -63 + bob], [sign * 39, -40 + bob + Math.sin(t * 2 + sign) * 4]], bronze, 11);
        ellipse(c, sign * 39, -38 + bob, 9, 12, '#9eac9b');
    }
    poly(c, [[-31, -102 + bob], [0, -120 + bob], [31, -102 + bob], [24, -93 + bob], [-24, -93 + bob]], '#a5b8a9', '#375e59');
    line(c, [[-22, -110 + bob], [22, -110 + bob]], trim, 3);
    for (let i = 0; i < 3; i++)
        dot(c, (i - 1) * 11, -98 + bob, 2.5, trim);
    if (boss) {
        for (let i = 0; i < 3; i++) {
            line(c, [[0, -120 + bob], [(i - 1) * 24, -135 + bob]], trim, 3);
        }
        c.strokeStyle = phase === 3 ? '#eab97a88' : '#88c6b688';
        c.lineWidth = 3;
        c.beginPath();
        c.arc(0, -65 + bob, 52, 0, Math.PI * 2);
        c.stroke();
    }
    c.restore();
}
/** Original Pass 22 Veymark boss silhouettes, with three distinct phase color stories. */
function veymarkBossSprite(c, e, x, y, t, reduced) {
    const move = reduced ? 0 : Math.sin(t * 1.8 + e.phase) * 3, hot = e.phase === 3, flare = hot ? '#f3a577' : e.phase === 2 ? '#f1d39b' : '#9cdad9';
    c.save();
    c.translate(x, y + move);
    ellipse(c, 0, 7, 76, 12, '#061a2780');
    if (e.name === 'Court Sentinel') {
        // Floating civic scales and ward-grant tablets: law, not a living magistrate.
        for (let i = 0; i < 5; i++) {
            let a = i * Math.PI * 2 / 5 + (reduced ? 0 : t * .16);
            let px = Math.cos(a) * 57, py = -85 + Math.sin(a) * 43;
            poly(c, [[px - 11, py - 15], [px + 11, py - 14], [px + 10, py + 14], [px - 10, py + 14]], '#b5ad92', '#f1d5a0');
        }
        poly(c, [[-31, -36], [31, -36], [24, -113], [-25, -113]], '#536a75', '#c8c3a5');
        ellipse(c, 0, -110, 24, 17, '#c4b595');
        line(c, [[0, -126], [0, -167]], '#d2bd8c', 7);
        line(c, [[-51, -156], [51, -156]], '#ead5a2', 5);
        for (const sign of [-1, 1]) {
            line(c, [[sign * 46, -156], [sign * 40, -125]], '#b8c4c1', 2);
            poly(c, [[sign * 57, -122], [sign * 22, -122], [sign * 31, -109], [sign * 49, -109]], '#8bb2b3', '#ead39f');
        }
        ellipse(c, 0, -82, 15, 18, flare);
    }
    else if (e.name === 'Orchard Protector') {
        // Roots around an entirely disconnected regulator ring.
        for (let i = 0; i < 8; i++) {
            const a = i * Math.PI / 4 + (reduced ? 0 : t * .15), px = Math.cos(a) * 62, py = -95 + Math.sin(a) * 62;
            ellipse(c, px, py, 12, 13, i % 2 ? '#637c60' : '#a5a080');
        }
        c.strokeStyle = '#b9c4a0';
        c.lineWidth = 13;
        c.beginPath();
        c.arc(0, -95, 55, .25, Math.PI * 1.86);
        c.stroke();
        for (const sign of [-1, 1]) {
            line(c, [[sign * 34, -50], [sign * 49, -16], [sign * 63, -3]], '#547b62', 12);
            line(c, [[sign * 35, -116], [sign * 56, -133], [sign * 72, -155]], '#527960', 9);
        }
        poly(c, [[-25, -123], [0, -150], [25, -123], [32, -67], [0, -35], [-32, -67]], '#557068', '#d5ba8e');
        ellipse(c, 0, -90, 19, 22, flare);
    }
    else if (e.name === 'Civic Warden') {
        // Distinct high-chested ward defender: shield bearing open scales.
        for (const sign of [-1, 1]) {
            line(c, [[sign * 21, -45], [sign * 29, 0]], '#5d7078', 13);
            line(c, [[sign * 29, -99], [sign * 54, -56]], '#a4ac9b', 12);
        }
        poly(c, [[-38, -116], [38, -116], [40, -42], [-40, -42]], '#627a85', '#d9c39c');
        poly(c, [[-31, -136], [0, -157], [31, -136], [21, -113], [-21, -113]], '#879695', '#e0c99a');
        round(c, -13, -137, 26, 12, 3, '#2e4a56');
        ellipse(c, 0, -132, 8, 5, flare);
        poly(c, [[-77, -93], [-48, -108], [-19, -92], [-24, -32], [-74, -31]], '#72909a', '#ebd1a3');
        line(c, [[-65, -67], [-34, -67]], '#f2d7a4', 4);
        line(c, [[55, -51], [70, -138]], '#bfb38a', 7);
        poly(c, [[55, -144], [85, -144], [71, -130]], '#d8c4a2');
    }
    else if (e.name === 'Archive Magistrate') {
        // A hovering six-sided archival dais, a missing human seat, and suspended petition pages.
        poly(c, [[-53, -27], [-26, -49], [28, -49], [56, -27], [32, -10], [-35, -10]], '#5d6770', '#bdab85');
        poly(c, [[-39, -75], [0, -106], [39, -75], [29, -32], [-29, -32]], '#465a67', '#a9c5bb');
        round(c, -18, -82, 36, 41, 5, '#2c4251');
        round(c, -12, -77, 24, 28, 3, '#bcbda2');
        for (let i = 0; i < 5; i++) {
            const offset = (i - 2) * 22, bob = reduced ? 0 : Math.sin(t * 2 + i) * 5;
            poly(c, [[offset - 9, -113 + bob], [offset + 9, -117 + bob], [offset + 11, -92 + bob], [offset - 9, -91 + bob]], i % 2 ? '#d4bd97' : '#b6aaa0', '#655a51');
            line(c, [[offset - 7, -106 + bob], [offset + 6, -108 + bob]], '#4d5a62', 1);
        }
        poly(c, [[-25, -126], [0, -158], [25, -126], [19, -111], [-19, -111]], '#6c7e84', '#dbc58e');
        for (let i = 0; i < 3; i++)
            dot(c, (i - 1) * 12, -127, 4, flare);
        line(c, [[-15, -67], [14, -67]], '#e6d4a7', 4);
    }
    else if (e.name === 'Crown Regulator') {
        // A monumental split gear, visibly disconnected at the crown, with revolving safe-clock teeth.
        const spin = reduced ? 0 : t * .22;
        const r = 63;
        for (let i = 0; i < 12; i++) {
            const a = i * Math.PI / 6 + spin, px = Math.cos(a) * r, py = -77 + Math.sin(a) * r;
            poly(c, [[px - 8, py - 9], [px + 8, py - 9], [px + 10, py + 9], [px - 10, py + 9]], hot ? '#b77e63' : '#738b91', '#233a43');
        }
        c.strokeStyle = hot ? '#e9b186' : '#b1c9bd';
        c.lineWidth = 19;
        c.beginPath();
        c.arc(0, -77, 58, 0, Math.PI * 1.72);
        c.stroke();
        c.strokeStyle = '#30404c';
        c.lineWidth = 9;
        c.beginPath();
        c.arc(0, -77, 44, 0, Math.PI * 2);
        c.stroke();
        poly(c, [[-25, -105], [21, -110], [35, -76], [12, -35], [-25, -49]], '#546d78', '#bba881');
        ellipse(c, 0, -78, 21, 24, flare);
        poly(c, [[-3, -94], [10, -83], [2, -65], [-13, -72]], '#273848');
        line(c, [[-53, -58], [-75, -18]], '#637f89', 14);
        line(c, [[54, -61], [78, -15]], '#637f89', 14);
        dot(c, 0, -77, 33, hot ? '#eaa87922' : '#94dad322');
    }
    else {
        // An imposing armored civic guardian, six seal-plates and a suspended ash blade.
        for (let k = 0; k < 6; k++) {
            const a = (k / 6) * Math.PI * 2 + (reduced ? 0 : t * .16);
            const px = Math.cos(a) * 51, py = -92 + Math.sin(a) * 37;
            poly(c, [[px - 9, py - 10], [px + 9, py - 8], [px + 9, py + 10], [px - 9, py + 10]], '#9f9889', '#c5b596');
        }
        poly(c, [[-34, -94], [34, -94], [44, -29], [-44, -29]], '#536779', '#b8bcac');
        poly(c, [[-48, -35], [0, -12], [48, -35], [27, -79], [-27, -79]], '#425567', '#d9bba0');
        poly(c, [[-24, -122], [0, -145], [24, -122], [20, -100], [-20, -100]], '#ac9c88', '#ccb47e');
        round(c, -15, -121, 30, 14, 5, '#30454d');
        ellipse(c, 0, -115, 8, 5, flare);
        line(c, [[38, -91], [64, -46], [83, -103]], '#b7a688', 11);
        poly(c, [[76, -105], [89, -132], [103, -101], [90, -87]], '#c2cbd0', '#8eaba8');
        line(c, [[-36, -87], [-60, -49]], '#73858f', 13);
        dot(c, -61, -47, 9, '#bcc6c1');
    }
    if (!reduced) {
        ellipse(c, 0, -96, 74 + Math.sin(t * 3) * 3, 91 + Math.sin(t * 3) * 3, hot ? '#ee9b6b0a' : '#a3e0d90a');
    }
    c.restore();
}
/** Pass 25 silhouettes: grain granary sentinel, suspended trade scales,
 * and a disconnected three-antenna beacon. Art has no gameplay side effects. */
function act5BossSprite(c, e, x, y, t, reduced) {
    const bob = reduced ? 0 : Math.sin(t * 2 + e.phase) * 3, phase = e.phase, glow = phase === 3 ? '#edb26b' : phase === 2 ? '#e6d4a0' : '#8cd3c5';
    c.save();
    c.translate(x, y + bob);
    ellipse(c, 0, 5, 70, 10, '#0a20258c');
    if (e.name === 'Grainline Keeper') {
        // Field-granary frame, suspended brass measuring wheel, bundled sheaves.
        for (const sign of [-1, 1]) {
            line(c, [[sign * 24, -32], [sign * 35, 0]], '#5a7560', 15);
            poly(c, [[sign * 27, -98], [sign * 64, -116], [sign * 71, -66], [sign * 34, -47]], '#9a9365', '#d5c69a');
            for (let k = 0; k < 4; k++)
                line(c, [[sign * (31 + k * 8), -106], [sign * (38 + k * 8), -68]], '#e2c37d', 3);
        }
        poly(c, [[-38, -117], [37, -117], [31, -30], [-31, -30]], '#647b69', '#d0ad76');
        round(c, -27, -98, 54, 16, 3, '#8d936f');
        ellipse(c, 0, -79, 28, 28, '#253f46');
        ellipse(c, 0, -79, 19, 19, glow);
        poly(c, [[-35, -131], [0, -159], [35, -131], [27, -118], [-27, -118]], '#b49c69', '#efd2a0');
        for (const sign of [-1, 1])
            line(c, [[sign * 37, -51], [sign * 70, -35], [sign * 80, -76]], '#9d986e', 11);
    }
    else if (e.name === 'Treaty Weighmaster') {
        // Two floating copper scales balance disputed receipts and physical goods.
        poly(c, [[-26, -48], [26, -48], [33, -117], [-33, -117]], '#6b7981', '#d6b77c');
        poly(c, [[-37, -129], [0, -156], [37, -129], [23, -115], [-23, -115]], '#b89c71', '#e3cca1');
        ellipse(c, 0, -92, 16, 17, glow);
        line(c, [[0, -151], [0, -182]], '#dac58f', 6);
        line(c, [[-81, -169], [81, -169]], '#d4bb7c', 5);
        for (const sign of [-1, 1]) {
            line(c, [[sign * 69, -169], [sign * 68, -127]], '#d5cb9f', 2);
            poly(c, [[sign * 89, -125], [sign * 49, -125], [sign * 58, -107], [sign * 82, -107]], '#769b9a', '#ead09d');
            for (let i = 0; i < 3; i++)
                dot(c, sign * (55 + i * 10), -116, 2, '#efd3a4');
            line(c, [[sign * 20, -43], [sign * 31, -2]], '#586b70', 13);
        }
    }
    else {
        // Independent antenna array; the command core is visibly split apart.
        for (let i = 0; i < 3; i++) {
            const off = (i - 1) * 46, raise = Math.cos(t * 1.4 + i) * 4;
            line(c, [[off, -74], [off, -162 + raise]], '#77868a', 9);
            poly(c, [[off - 12, -163 + raise], [off, -181 + raise], [off + 12, -163 + raise]], '#d0b88d', '#4b6870');
            dot(c, off, -164 + raise, 7, glow);
        }
        poly(c, [[-44, -113], [44, -113], [36, -26], [-36, -26]], '#71868a', '#c2b18d');
        poly(c, [[-27, -101], [0, -123], [27, -101], [17, -51], [-17, -51]], '#354d59', '#a8cabd');
        ellipse(c, 0, -79, 16, 17, glow);
        // A clearly broken diagonal warning cable, never an activated circuit.
        line(c, [[-57, -45], [-20, -58]], '#c3a37b', 4);
        line(c, [[11, -48], [56, -40]], '#c3a37b', 4);
        for (const sign of [-1, 1])
            line(c, [[sign * 27, -26], [sign * 31, -2]], '#65777b', 13);
    }
    if (!reduced) {
        ellipse(c, 0, -96, 72 + Math.sin(t * 3) * 3, 92 + Math.sin(t * 2) * 3, phase === 3 ? '#eeb0700d' : '#85d5c40b');
    }
    c.restore();
}
/** Pass 26 three original symbolic finale guardians: records, sea signals, living stewardship. */
function finaleGuardian(c, e, x, y, t, reduced) {
    const phase = e.phase, light = phase === 3 ? '#f1ae7c' : phase === 2 ? '#e0c891' : '#a5d6c6', spin = reduced ? 0 : t * .22;
    c.save();
    c.translate(x, y + (reduced ? 0 : Math.sin(t * 2) * 3));
    ellipse(c, 0, 3, 73, 12, '#081b2590');
    if (e.name === 'Names Warden') {
        for (let i = 0; i < 6; i++) {
            const angle = i * Math.PI / 3 + spin, tx = Math.cos(angle) * 64, ty = -95 + Math.sin(angle) * 45;
            poly(c, [[tx - 13, ty - 18], [tx + 12, ty - 18], [tx + 14, ty + 18], [tx - 13, ty + 18]], '#d4c49c', '#4c6c6a');
            for (let q = 0; q < 3; q++)
                line(c, [[tx - 9, ty - 9 + q * 7], [tx + 8, ty - 9 + q * 7]], '#59716e', 1.8);
        }
        poly(c, [[-29, -42], [29, -42], [32, -115], [0, -139], [-32, -115]], '#6c7b7b', '#ceb58a');
        round(c, -25, -104, 50, 45, 5, '#ded1aa');
        for (let q = 0; q < 5; q++)
            line(c, [[-15, -92 + q * 7], [16, -92 + q * 7]], '#61766b', 2);
        ellipse(c, 0, -126, 16, 17, light);
        for (const sign of [-1, 1]) {
            line(c, [[sign * 29, -88], [sign * 54, -46], [sign * 62, -15]], '#70837b', 11);
            line(c, [[sign * 13, -37], [sign * 25, -2]], '#687d72', 11);
        }
    }
    else if (e.name === 'Tideglass Signal Keeper') {
        for (let i = 0; i < 3; i++) {
            const xx = (i - 1) * 53;
            line(c, [[xx, -74], [xx, -160]], '#6e9597', 12);
            poly(c, [[xx - 13, -158], [xx, -183], [xx + 13, -158]], '#d8cfaa', '#536e76');
            ellipse(c, xx, -161, 13, 13, light);
        }
        poly(c, [[-43, -44], [43, -44], [30, -119], [-30, -119]], '#557886', '#b7d8c3');
        ellipse(c, 0, -91, 23, 24, '#1a3d4b');
        ellipse(c, 0, -91, 14, 14, light);
        for (const sign of [-1, 1]) {
            line(c, [[sign * 37, -86], [sign * 69, -53], [sign * 75, -27]], '#658f99', 11);
            line(c, [[sign * 22, -39], [sign * 26, -2]], '#567980', 12);
        }
        line(c, [[-42, -122], [42, -122]], '#e1c991', 3);
        line(c, [[-55, -17], [0, -34]], '#83b8bd88', 2);
        line(c, [[0, -34], [57, -19]], '#83b8bd88', 2);
    }
    else {
        for (const sign of [-1, 1]) {
            line(c, [[sign * 15, -40], [sign * 33, -1], [sign * 53, 3]], '#5a8567', 15);
            line(c, [[sign * 28, -106], [sign * 60, -143], [sign * 75, -158]], '#5c865b', 12);
        }
        poly(c, [[-34, -46], [35, -46], [46, -104], [0, -149], [-42, -106]], '#5a806e', '#b9bd8e');
        ellipse(c, 0, -96, 25, 30, '#304f46');
        ellipse(c, 0, -96, 17, 18, light);
        for (let i = 0; i < 8; i++) {
            let theta = i * Math.PI / 4 + spin * .7, xx = Math.cos(theta) * 68, yy = -95 + Math.sin(theta) * 72;
            ellipse(c, xx, yy, 11, 17, i % 2 ? '#96ba82' : '#639a74');
        }
        for (const sign of [-1, 1]) {
            line(c, [[sign * 30, -61], [sign * 57, -39], [sign * 68, -15]], '#739b76', 11);
        }
    }
    if (!reduced) {
        ellipse(c, 0, -96, 80 + Math.sin(t * 2) * 4, 89 + Math.cos(t * 2) * 4, phase === 3 ? '#e8af6911' : '#8ed8c10d');
    }
    c.restore();
}
function enemySprite(c, e, x, y, t, reduced) {
    if (['Names Warden', 'Tideglass Signal Keeper', 'Rootbound Custodian'].includes(e.name)) {
        finaleGuardian(c, e, x, y, t, reduced);
        return;
    }
    if (['Grainline Keeper', 'Treaty Weighmaster', 'Beacon Husk'].includes(e.name)) {
        act5BossSprite(c, e, x, y, t, reduced);
        return;
    }
    if (['Archive Magistrate', 'Crown Regulator', 'Ash-Ward Guardian', 'Court Sentinel', 'Orchard Protector', 'Civic Warden'].includes(e.name)) {
        veymarkBossSprite(c, e, x, y, t, reduced);
        return;
    }
    if (e.name.includes('Wolf') || e.name.includes('Stag') || e.name.includes('Bridgebreaker')) {
        if (e.name === 'Bridgebreaker') {
            c.save();
            c.translate(x, y);
            c.scale(1.5, 1.4);
            ellipse(c, 0, 1, 64, 11, '#071e2288');
            const bob = reduced ? 0 : Math.sin(t * 2) * 2;
            ellipse(c, 0, -25 + bob, 57, 23, '#89ab83');
            poly(c, [[25, -39 + bob], [70, -34 + bob], [88, -18 + bob], [35, -13 + bob]], '#9fbf9a', '#294b4d');
            dot(c, 67, -30 + bob, 5, '#f8dc9e');
            dot(c, 66, -30 + bob, 2, '#302d22');
            for (let k = 0; k < 6; k++)
                poly(c, [[-47 + k * 17, -41 + bob], [-39 + k * 17, -55 + bob], [-29 + k * 17, -40 + bob]], '#e6c891');
            line(c, [[-44, -24 + bob], [-88, -17 + bob], [-109, -28 + bob]], '#5e7b69', 16);
            c.restore();
        }
        else {
            if (e.name.includes('Stag')) {
                c.save();
                c.translate(x, y);
                c.scale(1.23, 1.23);
                wolf(c, 0, 0, t, reduced, true);
                c.restore();
            }
            else
                wolf(c, x, y, t, reduced, false);
        }
        return;
    }
    if (e.name.includes('Sentry') || e.name.includes('Watcher')) {
        construct(c, x, y, t, reduced, e.name === 'First Sentry', e.phase);
        return;
    }
    // humanoid raider, distinct helmet, animated cloak and weapon
    c.save();
    c.translate(x, y + (reduced ? 0 : Math.sin(t * 3) * 2));
    ellipse(c, 0, 3, 28, 7, '#081b2080');
    poly(c, [[-14, -60], [16, -58], [25, -7], [-21, -6]], '#714746');
    line(c, [[-9, -30], [-13, -1]], '#342f31', 9);
    line(c, [[11, -30], [15, 0]], '#342f31', 9);
    poly(c, [[-20, -68], [18, -68], [20, -27], [-19, -27]], '#936d5b', '#4d383b');
    ellipse(c, 0, -77, 16, 16, '#b88a77');
    poly(c, [[-22, -80], [0, -104], [22, -80], [16, -66], [-16, -66]], '#594947');
    line(c, [[17, -57], [30, -42]], '#89746d', 9);
    line(c, [[29, -41], [37, -81]], '#b3a994', 4);
    poly(c, [[37, -81], [32, -93], [45, -88]], '#d7cab1');
    line(c, [[-20, -60], [-27, -39]], '#977964', 8);
    c.restore();
}
function ENCOUNTERS_BOSS(name) { return ['First Sentry', 'Bridgebreaker', 'Hollow Stag', 'Archive Magistrate', 'Crown Regulator', 'Ash-Ward Guardian', 'Court Sentinel', 'Orchard Protector', 'Civic Warden', 'Grainline Keeper', 'Treaty Weighmaster', 'Beacon Husk'].includes(name); }
function slotOf(position, enemy) { const col = position % 3, row = Math.floor(position / 3); return [170 + col * 270, enemy ? 147 + row * 37 : 310 - row * 45]; }
function label(c, text, x, y, color) { c.textAlign = 'center'; c.font = '600 16px system-ui, sans-serif'; c.lineWidth = 4; c.strokeStyle = '#122a2cd9'; c.strokeText(text, x, y); c.fillStyle = color; c.fillText(text, x, y); }
function intentGlyph(c, e, x, y, t, reduced) { if (e.hp <= 0)
    return; const col = e.intent === 'guard' || e.intent === 'repair' ? '#9bd7c3' : e.intent === 'sweep' || e.intent === 'charge' ? '#f0aa78' : '#f6d7a2'; const scale = reduced ? 1 : 1 + Math.sin(t * 4) * .09; ellipse(c, x, y, 19 * scale, 14 * scale, '#152927bb'); c.strokeStyle = col; c.lineWidth = 2; c.beginPath(); c.arc(x, y, 14 * scale, 0, Math.PI * 2); c.stroke(); label(c, e.intent === 'guard' ? '◆' : e.intent === 'repair' ? '✦' : e.intent === 'sweep' ? '✳' : e.intent === 'charge' ? '➤' : e.intent === 'pierce' ? '↟' : '!', x, y + 5, col); }
export function mountBattleFX(canvas, state, reduced = false, cue) {
    const c = canvas.getContext('2d');
    if (!c)
        return { dispose() { } };
    const a = state.adventure.active?.battle;
    if (!a)
        return { dispose() { } };
    const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    let alive = true, frameId = 0;
    const time0 = performance.now();
    function draw(ms) {
        if (!alive || !c)
            return;
        const t = reduced ? 0 : (ms - time0) / 1000;
        c.setTransform(dpr, 0, 0, dpr, 0, 0);
        c.clearRect(0, 0, W, H);
        terrain(c, a.id, t, reduced);
        for (let i = 0; i < 3; i++) {
            let x = 170 + i * 270;
            poly(c, [[x - 107, 202], [x, 172], [x + 107, 202], [x, 231]], '#b7a77b1d');
        }
        const ongoingCue = cue && !reduced && ms - cue.at < 820;
        const progress = ongoingCue ? Math.max(0, (ms - cue.at) / 820) : 1;
        for (const e of a.enemies) {
            const [x, sy] = slotOf(e.position, true);
            const y = ENCOUNTERS_BOSS(e.name) ? Math.max(170, sy) : sy;
            if (e.hp <= 0)
                continue;
            enemySprite(c, e, x, y, t, reduced);
            intentGlyph(c, e, x + 65, y - 115, t, reduced);
            label(c, e.name, x, y + 24, '#f0d8b7');
        }
        for (const u of a.heroes) {
            const h = state.adventure.heroes.find(v => v.id === u.heroId);
            if (!h || h.hp <= 0)
                continue;
            const [x, y] = slotOf(u.position, false);
            const lunge = ongoingCue && cue.hero === h.id && ['battle_attack', 'battle_skill', 'battle_technique'].includes(cue.kind) ? Math.sin(Math.PI * progress) * -25 : 0;
            heroSprite(c, h, x, y + lunge, t, reduced, u.guard, u.focus);
            label(c, h.name.split(' ')[0], x, y + 23, '#e4e3c8');
        }
        if (ongoingCue && cue.kind === 'battle_end_round') {
            const spark = Math.sin(Math.PI * progress);
            for (const foe of a.enemies.filter(x => x.hp > 0)) {
                const [ex, ey] = slotOf(foe.position, true);
                const target = a.heroes.find(x => state.adventure.heroes.find(h => h.id === x.heroId)?.hp);
                if (!target)
                    continue;
                const [hx, hy] = slotOf(target.position, false);
                const px = ex + (hx - ex) * progress, py = ey + (hy - 70 - ey) * progress;
                dot(c, px, py, 12 * spark + 2, '#ef9f766c');
                line(c, [[px - 14, py - 8], [px + 14, py + 7]], '#ffd8a2b5', Math.max(1, spark * 5));
            }
        }
        if (ongoingCue && cue.kind !== 'battle_end_round') {
            const p = Math.max(0, Math.min(1, progress));
            const spark = (Math.sin(Math.PI * p));
            const hero = a.heroes.find(h => h.heroId === cue.hero);
            const enemy = a.enemies.find(e => e.id === cue.enemy) || a.enemies.find(e => e.hp > 0);
            const point = enemy ? slotOf(enemy.position, true) : [440, 170];
            if (hero && enemy) {
                const start = slotOf(hero.position, false);
                const fx = start[0] + (point[0] - start[0]) * p, fy = start[1] - 70 + (point[1] - start[1]) * p;
                if (cue.kind === 'battle_attack' || cue.kind === 'battle_technique') {
                    dot(c, fx, fy, 16 * spark + 4, '#f3cb8478');
                    line(c, [[fx - 16, fy + 8], [fx + 14, fy - 10]], '#fff2ce', 4 * spark + 1);
                }
            }
        }
        // Pass 28: tactical readout, enemy phase telegraph, and lighting vignette.
        c.save();
        const boss = a.enemies.find(e => e.hp > 0 && e.phase > 0);
        if (boss) {
            const phaseColor = boss.phase === 3 ? '#ea9376' : boss.phase === 2 ? '#dabb80' : '#96c7c0';
            const pulse = reduced ? 1 : .78 + .22 * Math.sin(t * 2.5);
            c.strokeStyle = phaseColor;
            c.globalAlpha = pulse * .55;
            c.lineWidth = 2.5;
            c.beginPath();
            c.moveTo(14, 33);
            c.lineTo(14, 12);
            c.lineTo(39, 12);
            c.moveTo(W - 14, 33);
            c.lineTo(W - 14, 12);
            c.lineTo(W - 39, 12);
            c.stroke();
        }
        for (let i = 0; i < 11; i++) {
            const x = (i * 149 + 37) % W, y = 28 + (i * 37) % 112;
            if (!reduced) {
                const dy = Math.sin(t * .75 + i) * 5;
                dot(c, x, y + dy, .8 + (i % 3) * .5, i % 3 === 0 ? '#ffdfa977' : '#a1d6c15e');
            }
        }
        c.restore();
        // edge vignette, bright informational finish
        const v = c.createLinearGradient(0, H - 110, 0, H);
        v.addColorStop(0, '#0f242900');
        v.addColorStop(1, '#1021269c');
        c.fillStyle = v;
        c.fillRect(0, H - 110, W, 110);
        if (!reduced)
            frameId = requestAnimationFrame(draw);
    }
    frameId = requestAnimationFrame(draw);
    return { dispose() { alive = false; cancelAnimationFrame(frameId); } };
}

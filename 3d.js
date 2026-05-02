bg.width = 800;
bg.height = 600;
const ctx = bg.getContext("2d");

const BACKGROUND = "#191919";
const FOREGROUND = "#d79921";

function clear() {
    ctx.fillStyle = BACKGROUND
    ctx.fillRect(0, 0, bg.width, bg.height)
}

function point({x, y}) {
    const s = 1;
    const hs = 0.5;
    ctx.fillStyle = FOREGROUND
    ctx.fillRect(x - hs, y - hs, s, s)
}

function screen(p) {
    // -1..1 => 0..2 => 0..1 => 0..w
    return {
        x: (p.x + 1)/2*bg.width,
        y: (1 - (p.y + 1)/2)*bg.height,
    }
}

function project({x, y, z}) {
    return {
        x: x/z,
        y: y/z,
    }
}

const FPS = 60;

function translate_z({x, y, z}, dz) {
    return {x, y, z: z + dz};
}

function rotate_xz({x, y, z}, angle) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    return {
        x: x*c-z*s,
        y,
        z: x*s+z*c,
    };
}

let dz = 3;
let angle = 0;

function frame() {
    const dt = 1/FPS;
    // dz += 1*dt;
    angle += Math.PI*dt;
    clear()
    for (const v of vs) {
        point(screen(project(translate_z(rotate_xz(v, angle), dz))))
    }
    setTimeout(frame, 1000/FPS);
}
setTimeout(frame, 1000/FPS);

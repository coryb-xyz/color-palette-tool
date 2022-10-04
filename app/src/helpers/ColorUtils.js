// @ts-nocheck
export class ColorUtils {

    static #rgbToHex = (r, g, b) => [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');

    static #similar(color1, color2, tolerance = 0.01) {
        const RGB1 = this.#hex24ToRGB(color1);
        const RGB2 = this.#hex24ToRGB(color2);

        tolerance = tolerance * (255 * 255 * 3) << 0;

        let distance = 0;

        distance += Math.pow(RGB1.red - RGB2.red, 2);
        distance += Math.pow(RGB1.green - RGB2.green, 2);
        distance += Math.pow(RGB1.blue - RGB2.blue, 2);

        return distance <= tolerance;
    }

    static #different(color, colors, tolerance = 0.01) {
        for (let i = 0; i < colors.length; i++) {
            if (this.#similar(color, colors[i], tolerance)) {
                return false;
            }
        }
        return true;
    }

    static colorPalette(source, maximum = 8, tolerance = 0.01) {
        const palette = this.#uniqueColors(this.#indexColors(source), maximum, tolerance);
        return palette.map(c => `#${c.toString(16)}`);
    }

    static #uniqueColors(colors, maximum, tolerance) {
        const unique = [];
        for (let i = 0; i < colors.length && unique.length < maximum; i++) {
            const color = colors[i];
            if (this.#different(color, unique, tolerance)) {
                unique.push(color);
            }
        }
        return unique;
    }

    static #indexColors(source) {
        const n = {};
        const a = [];
        let p;

        for (let x = 0; x < source.length; x += 4) {
            p = this.#rgbToHex(...source.slice(x, x + 3));
            n[p] ? n[p]++ : n[p] = 1;
        }

        for (const color in n) {
            if (Object.hasOwnProperty.call(n, color)) {
                const count = n[color];
                a.push({ color, count })
            }
        }

        return a.sort((a, b) => {
            if (a.count > b.count) return 1;
            if (a.count < b.count) return -1;
            return 0;
        }).map(c => Number(`0x${c.color}`));
    }

    static #hex24ToRGB(hex) {
        const R = hex >> 16 & 0xFF;
        const G = hex >> 8 & 0xFF;
        const B = hex & 0xFF;

        return { red: R, green: G, blue: B }
    }
}
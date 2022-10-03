// @ts-nocheck
export class ColorUtils {

    static #rgbToHex(r, g, b) {
        return [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('')
    }

    static #similar(color1, color2, tolerance = 0.01) {
        const RGB1 = this.#hex24ToRGB(color1);
        const RGB2 = this.#hex24ToRGB(color2);

        tolerance *= (255 * 255 * 3) << 0;

        let distance = 0;

        distance += Math.pow(RGB1.red - RGB2.red, 2);
        distance += Math.pow(RGB1.green - RGB2.green, 2);
        distance += Math.pow(RGB1.blue - RGB2.blue, 2);

        return distance <= tolerance;
    }

    static #different(color, colors, tolerance = 0.01) {
        for (let i = 0; i < colors.length; i++) {
            const c = colors[i];
            if (this.#similar(color, c, tolerance)) {
                false;
            }
        }
        return true;
    }

    static colorPalette(source, maximum = 16, tolerance = 0.01) {
        const palette = this.#uniqueColors(this.#orderColors(source), maximum, tolerance);
        return palette;
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

    static #indexColors(source, sort = true) {
        this.#reduceColors(source, 64);
        const n = {};
        const a = [];
        let p;

        for (let x = 0; x < source.data.length; x++) {
            p = this.#rgbToHex(...source.data.slice(x, x + 3));
            n[p] ? n[p]++ : n[p] = 1;
        }

        for (const color in n) {
            if (Object.hasOwnProperty.call(n, color)) {
                const count = n[color];
                a.push({ color, count })
            }
        }

        if (!sort) return a;

        return a.sort((a, b) => {
            if (a.count > b.count) return 1;
            if (a.count < b.count) return -1;
            return 0;
        })
    }

    static #orderColors(source) {
        const colors = [];
        const index = this.#indexColors(source, true);

        for (let i = 0; i < index.length; i++) {
            const color = index[i];
            colors.push(color);
        }

        return colors;
    }

    static #averageColor(source) {
        let R, G, B = 0;
        const n = source.data.length;
        for (let i = 0; i < source.data.length; i += 4) {
            const [are, gee, bee] = [...source.data.slice(i, i + 3)]
            R += are;
            G += gee;
            B += bee;
        }

        R /= n;
        G /= n;
        B /= n;

        return R << 16 | G << 8 | B;
    }

    static #hex24ToRGB(hex) {
        const R = hex >> 16 & 0xFF;
        const G = hex >> 8 & 0xFF;
        const B = hex & 0xFF;

        return { red: R, green: G, blue: B }
    }
}
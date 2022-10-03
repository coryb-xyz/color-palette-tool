// @ts-nocheck
export class ColorUtils {

    static similar(color1, color2, tolerance = 0.01) {
        const RGB1 = this.hex24ToRGB(color1);
        const RGB2 = this.hex24ToRGB(color2);

        tolerance *= (255 * 255 * 3) << 0;
        
        let distance = 0;

        distance += Math.pow(RGB1.red - RGB2.red, 2);
        distance += Math.pow(RGB1.green - RGB2.green, 2);
        distance += Math.pow(RGB1.blue - RGB2.blue, 2);
        
        return distance <= tolerance;
    }

    static different(color, colors, tolerance = 0.01) {
        for (let i = 0; i < colors.length; i++) {
            const c = colors[i];
            if (this.similar(color, c, tolerance)) {
                false;
            }
        }
        return true;
    }

    static colorPalette(source, maximum = 16, tolerance = 0.01) {
        console.log("Oooh wee");
        console.log("Oooh wee");

    }


    static hex24ToRGB(hex) {
        const R = hex >> 16 & 0xFF;
        const G = hex >> 8 & 0xFF;
        const B = hex & 0xFF;

        return { red: R, green: G, blue: B }
    }
}
<script>
    // @ts-nocheck
    import { ColorUtils } from "../helpers/ColorUtils.js";
    let image;
    let canvas;
    let ctx;
    let palette = [];
    let tolerance = 1;
    let number = 8;

    function loadImage(e) {
        e.preventDefault();
        const imgPath = e.dataTransfer.files[0];
        if (!imgPath.type.match(/image.*/)) {
            console.log("The dropped file is not an image: ", imgPath.type);
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => render(e.target?.result);
        reader.readAsDataURL(imgPath);
    }

    function generatePalette() {
        const img = ctx.getImageData(0, 0, image.width, image.height).data;
        palette = ColorUtils.colorPalette(img, number, tolerance / 100);
    }

    function render(src) {
        const MAX_HEIGHT = 480;
        image = new Image();
        image.onload = (_) => {
            if (image.height > MAX_HEIGHT) {
                image.width *= MAX_HEIGHT / image.height;
                image.height = MAX_HEIGHT;
            }
            ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);
            const img = ctx.getImageData(0, 0, image.width, image.height).data;
            palette = ColorUtils.colorPalette(img, number, tolerance / 100);
        };
        image.src = src;
    }
</script>

<body>
    <div class="main-wrapper">
        <canvas
            bind:this={canvas}
            id="dropzone"
            on:dragover={(e) => e.preventDefault()}
            on:drop={loadImage}
            class="bordered"
        />
        <div class="color-wrapper">
            {#each palette as color}
                <div>
                    <div
                        style={`width:10vw; height:10vh; background-color: ${color};`}
                    />
                    <div>{color}</div>
                </div>
            {/each}
        </div>
    </div>

    <div class="control-area">
        <label for="tolerance"
            >Tolerance<input
                type="number"
                name="tolerance"
                bind:value={tolerance}
                on:change={generatePalette}
            /></label
        >
        <label for="number"
            >Number of colors<input
                type="number"
                name="number"
                bind:value={number}
                on:change={generatePalette}
            /></label
        >
    </div>

</body>

<style>
    .main-wrapper {
        display: grid;
        grid-template-columns: 20vw 40vw;
        gap: 5vw;
    }

    .color-wrapper {
        display: grid;
        grid-template-columns: 10vw 10vw 10vw 10vw;
    }

    .bordered {
        width: 20vw;
        height: 20vh;
        padding: 2px;
        border-color: rgba(128, 128, 128, 255);
        border-style: dotted;
        border-radius: 20px;
        border-width: 0.25vh;
        font-size: 5vh;
    }
</style>

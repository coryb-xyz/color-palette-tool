<script>
    // @ts-nocheck
    import { ColorUtils } from "../helpers/ColorUtils.js";
    let palette = [];
    let canvas;
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

    function render(src) {
        const MAX_HEIGHT = 480;
        const image = new Image();
        image.onload = (_) => {
            if (image.height > MAX_HEIGHT) {
                image.width *= MAX_HEIGHT / image.height;
                image.height = MAX_HEIGHT;
            }
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);
            palette = ColorUtils.colorPalette(
                ctx.getImageData(0, 0, image.width, image.height).data,
                number,
                tolerance / 100
            );
        };
        image.src = src;
    }
</script>

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
    <label for="tolerance">Tolerance<input type="number" name="tolerance" bind:value={tolerance}></label>
    <label for="number">Number of colors<input type="number" name="number" bind:value={number}></label>

</div>

<style>
    .main-wrapper {
        display: grid;
        grid-template-columns: 25vw 75vw;
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
        border-style: dashed;
        font-size: 5vh;
    }
</style>

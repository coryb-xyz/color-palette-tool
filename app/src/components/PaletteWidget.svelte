<script>
    // @ts-nocheck
    import { ColorUtils } from "../helpers/ColorUtils.js";
    import { onMount } from "svelte";
    let files;
    let image;
    let filePicker;
    let canvas;
    let ctx;
    let palette = [];
    let tolerance = 1;
    let number = 8;

    onMount(async () => {
        const ctx = canvas.getContext("2d")
        ctx.fillText("Drop Image Here", canvas.width / 2.8, canvas.height / 2);
    });

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

<div class="main-wrapper">
    <div class="color-input">
        
        <input type="file" id="filePicker" bind:this={filePicker} on:change={loadImage} bind:files>
        <canvas
            bind:this={canvas}
            id="dropzone"
            on:dragover={(e) => e.preventDefault()}
            on:drop={loadImage}
            on:click={_ => filePicker.click()}
            class="bordered"
        />
    
        <div class="color-wrapper">
            {#each palette as color}
                <div class="color-box">
                    <canvas
                        class="color-swatch"
                        style={`background-color: ${color};`}
                    />
                    <div>{color}</div>
                </div>
            {/each}
        </div>
    </div>
    <div class="control-area">
        <div>Tolerance</div>
        <input
            name="tolerance"
            bind:value={tolerance}
            on:change={generatePalette}
        />
        <div>Colors</div>
        <input name="number" bind:value={number} on:change={generatePalette} />
    </div>
</div>

<style>
    #filePicker {
        display: none;
    }

    .main-wrapper {
        display: grid;
        gap: 1.5vh;
        background-color: #4c4c4c;
        padding: 1.5vh;
        border-radius: 10px;
        color: #e3e3ce;
    }

    .color-input {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 1vw;
    }

    .control-area {
        display: grid;
        grid-template-columns: repeat(4, min-content);
        gap: 1vh;
    }

    input {
        width: 1.3vw;
        border-radius: 5px;
        border: none;
        text-align: center;
    }

    .color-wrapper {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 5px;
        font-family: "JetBrains Mono", monospace;
    }

    .color-swatch {
        width: 100%;
        height: 100%;
        border-color: #1f1f1f;
        border-style: solid;
        border-width: 0.1vh;
        border-radius: 5px;
    }

    .color-box {
        display: grid;
        gap: 0.5vh;
    }
    .bordered {
        width: 100%;
        border-color: #1f1f1f;
        border-style: solid;
        border-radius: 10px;
        border-width: 0.2vh;
        font-size: 5vh;
    }
</style>

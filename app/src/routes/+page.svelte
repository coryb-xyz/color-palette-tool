<script>
    // @ts-nocheck
    import { ColorUtils } from "../helpers/ColorUtils.js";
    let palette = [];

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
            var canvas = document.getElementById("dropzone");
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
                ctx.getImageData(0, 0, image.width, image.height).data
            );
        };
        image.src = src;
    }
</script>

<div class="main-wrapper">
    <canvas
        id="dropzone"
        on:dragover={(e) => e.preventDefault()}
        on:drop={loadImage}
        class="bordered"
    />
    <div class="color-wrapper">
        {#each palette as color}
            <div>
                <div
                    style={`width: 10vw;height: 10vh; background-color: ${color};`}
                />
                <div>{color}</div>
            </div>
        {/each}
    </div>
</div>

<style>
    .main-wrapper {
        display: grid;
        grid-template-columns: 25vw 75vw;
    }

    .color-wrapper {
        --grid-layout-gap: 0px;
        --grid-column-count: 10;
        --grid-item--min-width: 1vw;

        --gap-count: calc(var(--grid-column-count) - 1);
        --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
        --grid-item--max-width: calc(
            (100% - var(--total-gap-width)) / var(--grid-column-count)
        );

        display: grid;
        grid-template-columns: repeat(
            auto-fill,
            minmax(
                max(var(--grid-item--min-width), var(--grid-item--max-width)),
                1fr
            )
        );
        grid-gap: var(--grid-layout-gap);
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

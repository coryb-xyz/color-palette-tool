<script>
    // @ts-nocheck
    import { ColorUtils } from "../helpers/ColorUtils.js";

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
        const MAX_HEIGHT = 100;
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
            const p = ColorUtils.colorPalette(
                ctx.getImageData(0, 0, image.width, image.height)
            );
        };
        image.src = src;
    }
</script>

<canvas
    id="dropzone"
    on:dragover={(e) => e.preventDefault()}
    on:drop={loadImage}
    class="bordered"
/>

<style>
    .bordered {
        width: 10vw;
        height: 10vh;
        border-color: rgba(96, 96, 96, 255);
        border-style: dashed;
        font-size: 5vh;
    }
</style>

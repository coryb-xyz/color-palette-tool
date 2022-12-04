<script>
    import PaletteWidget from "../components/PaletteWidget.svelte";
    let widgetTracker = [0];
</script>

<body>
    {#each widgetTracker as _}
    <div class="palettewidget">
        <PaletteWidget />
    </div>
    {/each}
    <button
        on:click={() => (widgetTracker = [...widgetTracker, 0])}>+</button
    >
</body>

<style>
    body {
        font-family: "Open Sans", sans-serif;
        display: grid;
        gap: 1vh;
    }
    button {
        border-radius: 10px;
        background-color: #4d8a99;
        width: 5vw;
        height: 5vh;
        position: absolute;
        bottom: 1vh;
        right: 1vw;
        border: solid;
        border-color: #3b6a75;
        color: white;
        font-size: x-large;
    }

    .palettewidget {
        padding: .5vh 1vw;
    }
</style>

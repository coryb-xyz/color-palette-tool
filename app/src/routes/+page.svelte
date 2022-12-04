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
        background-color: #e0e0e0;
        width: 2.5vw;
    }

    .palettewidget {
        padding: .5vh 1vw;
    }
</style>

<script>
    import Scrolly from "./Scrolly.svelte";
    import { tweened } from "svelte/motion";
    let number = tweened(0);

    let currentStep;

    $: if (currentStep == 0) {
        number.set(100);
    } else if (currentStep == 1) {
        number.set(200);
    } else if (currentStep == 2) {
        number.set(300);
    }
</script>

<section>
    <Scrolly bind:value={currentStep}>
        {#each [1, 2, 3] as text, i}
        <div class="step" class:active={currentStep === i}>
            <div class="step-content">
                <p>Step {text}</p>
            </div>
        </div>
        {/each}
        <div class="sticky">{Math.round($number)}</div>
    </Scrolly>
</section>

<style>
    section {
        height: 80vh;
        margin-bottom: 1.15rem;
        position: relative;
        overflow-y: scroll;
        background: rgba(255, 255, 255, 0.3);
    }

    .step {
        height: 60vh;
        display: flex;
        place-items: center;
        justify-content: center;
    }

    .step-content {
        background: whitesmoke;
        color: #ccc;
        padding: .5rem 1rem;
        box-shadow: 1px 1px 10px rgba(0, 0, 0, .2);
        transition: background 500ms ease, color 500ms ease;
    }

    .step.active .step-content {
        background: white;
        color: black;
    }

    .sticky {
        position: sticky;
        bottom: 0;
        left: 0;
        margin: 0;
        padding: 1rem;
    }
</style>
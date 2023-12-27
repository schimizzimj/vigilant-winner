<script lang="ts">
    import Scroll from "./Scrolly.svelte";
    import { tweened } from "svelte/motion";

    let data = [
        { foo: 4, bar: 1 },
        { foo: 6, bar: 7 },
        { foo: 9, bar: 5 },
        { foo: 2, bar: 4 },
        { foo: 8, bar: 2 },
        { foo: 9, bar: 9 },
        { foo: 5, bar: 3 },
        { foo: 3, bar: 8 },
        { foo: 1, bar: 6 }
    ];

    import { scaleLinear } from "d3-scale";

    let width = 400;
    let height = 400;

    let xScale = scaleLinear()
        .domain([0, 10])
        .range([0, width]);

    let yScale = scaleLinear()
        .domain([0, 10])
        .range([height, 0]);

    const tweenedX = tweened(data.map(d => d.foo));
    const setFoo = function () {
        tweenedX.set(data.map(d => d.foo));
    };
    const setBar = function () {
        tweenedX.set(data.map(d => d.bar));
    };

    let currentStep: number;
    let steps = [
        '<p>Step 1!</p>',
        '<p>Step 2?</p>',
        '<p>Step 3 🙌</p>'
    ]

    $: if (currentStep == 0) {
        setFoo();
    } else if (currentStep == 1) {
        setBar();
    } else if (currentStep == 2) {
        setFoo();
    }
</script>

<section>
    <div class="chart">
        <svg {width} {height}>
            {#each data as d, index}
                <circle
                    cx={xScale($tweenedX[index])}
                    cy={yScale(d.bar)}
                    r={15}
                    fill="steelblue"
                    stroke="#000"
                />
            {/each}
        </svg>
    </div>

    <Scroll bind:value={currentStep}>
        {#each steps as text, i}
            <div class="step" class:active={currentStep === i}>
                <div class="step-content">
                    {@html text}
                </div>
            </div>
        
        {/each}
    </Scroll>
</section>

<style>
    section {
        height: 80vh;
        margin-bottom: 1.15rem;
        position: relative;
        overflow-y: scroll;
        background: rgba(255, 255, 255, 0.3);
    }

    .chart {
        background: whitesmoke;
        width: 400px;
        height: 400px;
        position: sticky;
        top: 10%;
        margin: auto;
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
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: .5rem 1rem;
        box-shadow: 1px 1px 10px rgba(0, 0, 0, .2);
        transition: background 500ms ease, color 500ms ease;
        z-index: 10;
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
<script lang='ts'>
    export let step: number;

    interface Datum {
        foo: number;
        bar: number;
        swag: number;
    }

    type DatumKey = keyof Datum;

    let data: Datum[] = [
        { foo: 4, bar: 1, swag: 7 },
        { foo: 1, bar: 3, swag: 3 },
        { foo: 9, bar: 5, swag: 4 },
        { foo: 2, bar: 5, swag: 5 },
        { foo: 10, bar: 4, swag: 6 },
        { foo: 9, bar: 5, swag: 7 },
        { foo: 5, bar: 3, swag: 8 },
        { foo: 4, bar: 10, swag: 9 },
        { foo: 1, bar: 6, swag: 10 },
    ];

    import { scaleLinear } from "d3-scale";
    import { extent } from "d3-array";
    import { tweened, type Tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";

    let width: number = 400;
    let height: number = 400;

    const margin = {
        top: 30,
        left: 30,
        bottom: 30,
        right: 30,
    };

    const tweenOptions = {
        delay: 0,
        duration: 1000,
        easing: cubicOut,
    };

    const tweenedX = tweened(data.map((d) => d.foo), tweenOptions);
    const tweenedY = tweened(data.map((d) => d.bar), tweenOptions);

    $: tweenedData = data.map((d, i) => ({
        x: $tweenedX[i],
        y: $tweenedY[i],
    }));

    function setTween(dimension: Tweened<number[]>, key: DatumKey) {
        dimension.set(data.map((d: Datum) => +d[key]));
    }

    $: {
        if (step == 0) {
            setTween(tweenedX, 'foo');
            setTween(tweenedY, 'bar');
        }
        if (step == 1) {
            setTween(tweenedX, 'foo');
            setTween(tweenedY, 'swag');
        }
        if (step == 2) {
            setTween(tweenedX, 'swag');
        }
    }

    $: xScale = scaleLinear()
        .domain(extent($tweenedX, (d: number) => d))
        .range([margin.left, width - margin.right]);

    $: yScale = scaleLinear()
        .domain(extent($tweenedY, (d: number) => d))
        .range([height - margin.top, margin.bottom]);
</script>

<div class='chart-container' bind:offsetWidth={width} bind:offsetHeight={height}>
    <svg width={width + margin.right + margin.left} {height}>
        {#each tweenedData as d}
            <circle
                cx={xScale(d.x)}
                cy={yScale(d.y)}
                r={15}
                fill="steelblue"
                stroke="#000"
                opacity={0.9}
            />
        {/each}
    </svg>
</div>

<style>
    .chart-container {
        height: 80vh;
        max-width: 100%;
        background: linear-gradient(to bottom right, steelblue -100%, white 100%);
        border-radius: 5px;
        box-shadow: 1px 1px 6px #cecece;
    }
</style>
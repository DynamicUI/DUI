<script lang="ts">
	import type { Variable } from '$lib/class/variable';
    import type { Input } from '$lib/class/input';

	export let input: Input;
	export let variable: Variable;
	export let onDbClick: (e: any) => void;
    export let value: string | undefined;

    function onMouseDown(e: any) {
        if (e.target == input.target) return;
        input.isWriteMode = false;
    }
</script>

<input
	bind:this={input.target}
	bind:value
	on:dblclick={onDbClick}
	class="input input-{input.isWriteMode ? 'on' : 'off'}"
	style="
    width: {variable.box.size.x - 10}px;
    height: {variable.box.size.y / 2 - 5}px;
    "
	id={input.name}
	readonly={!input.isWriteMode}
/>

<svelte:window on:mousedown={onMouseDown}/>

<style>
	/* You can't put svelte {Var} because this div will be abstract once for all component ! */
	.input {
		@apply select-none cursor-move border-2
        ;
	}
	.input-on {
		@apply bg-white;
	}
	.input-off {
		@apply bg-inherit;
		/*
		pointer-events: none;
		*/
	}
</style>

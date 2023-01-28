<script lang="ts">
	import type { Input } from '$lib/class/input';
	import type { Vec2 } from '$lib/class/vec2';
	import { isMouseUp, mousePosition } from '$lib/store';

	export let input: Input;
	export let size: Vec2;
	export let value: string | undefined;

	let bg_color = 'bg-inherit';
	$: {
		bg_color = input.isWriteMode ? 'bg-white' : 'bg-inherit';
	}
	function onMouseDown(e: any) {
		if (e.target == input.target) return;
		input.isWriteMode = false;
	}

	function onDbClick(e: any) {
		input.isWriteMode = true;
	}

	function onFocusIn(e: any) {
		//input.isWriteMode = true;
	}

	function onFocusOut(e: any) {
		input.isWriteMode = false;
	}
	function onMouseOver(e: any) {
		//bg_color = 'bg-red-100';
	}

	function onMouseLeave(e: any) {
		//console.log(e.target);
		//bg_color = 'bg-inherit';
	}

	$: {
		//console.log($isMouseUp);
		//console.log($mousePosition);
	}
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<input
	bind:this={input.target}
	bind:value
	on:dblclick={onDbClick}
	on:focusin={onFocusIn}
	on:focusout={onFocusOut}
	on:mouseover={onMouseOver}
	on:mouseleave={onMouseLeave}
	id={input.name}
	readonly={!input.isWriteMode}
	class="
		m-1
		{bg_color}
		input
	"
	style="
		width:  {size.x}px;
		height: {size.y}px;
    "
/>
<!--

-->

<svelte:window on:mousedown={onMouseDown} />

<style lang="postcss">
	.input {
		@apply select-none cursor-move border-2;
	}
	.input-on {
		@apply bg-white;
	}
	.input-off {
		@apply bg-inherit;
	}
</style>

<script lang="ts">
	import type { Input } from '$lib/class/input';
	import type { Vec2 } from '$lib/class/vec2';
	import { fade } from 'svelte/transition';

	export let input_size: Vec2;
	export let value: any;
	export let input: Input;
	export let isInputValid: Function;
	export let id: string;

	$: {
		input.target?.focus();
	}

	let draggover = false;
</script>

<div
	on:dragenter={(event) => {
		draggover = true;
	}}
	on:dragleave={(event) => {
		draggover = false;
	}}
	on:drop={(event) => {
		event.preventDefault();
		const json = event?.dataTransfer?.getData('dragDatas');
		if (json) {
			const data = JSON.parse(json);
			if (data.id == id) {
				console.log("you can't drop on yourself");
			} else {
				//value = data.value;
			}
		}
		draggover = false;
	}}
	ondragover="return false"
>
	<button
		disabled={draggover}
		class="btn bg-inherit border-none"
		style:width="{input_size.x}px"
		style:height="{input_size.y}px"
		on:click={() => {
			input.value = value;
			input.isWriteMode = true;
		}}
	>
		{value}
	</button>
</div>

{#if input.isWriteMode}
	<div class="modal modal-middle modal-open" transition:fade={{ duration: 100 }}>
		<div class="modal-box">
			<input
				transition:fade
				bind:value={input.value}
				bind:this={input.target}
				type="text"
				class:border-error={!isInputValid(input.value)}
				class="input input-bordered w-full border-error"
				placeholder="Variable name"
			/>
		</div>
	</div>
{/if}

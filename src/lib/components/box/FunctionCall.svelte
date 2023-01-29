<script lang="ts">
	import type { Variable } from '$lib/class/variable';
	import type { Box } from '$lib/class/box';
	import { Input } from '$lib/class/input';
	import { Vec2 } from '$lib/class/vec2';
	import { onMount } from 'svelte';
	import type { Function_ } from '$lib/class/function';

	export let function_: Function_;
	export let box: Box;
	export let delBlock: Function;

	let input_size: Vec2 = new Vec2(box.size.x / 2 - 10, box.size.y - 20);
	let input_name: Input = Input.default('name');

	onMount(() => {
		//input_name.isWriteMode = true;
	});

	function onKeyPress(e: any) {
		if (e.key == 'Enter') {
			if (!isVarNameValid(input_name.value)) {
				// TODO warning
				return;
			}
			if (input_name.isWriteMode) function_.name = input_name.value;
			input_name.isWriteMode = false;
		}
	}

	function isVarNameValid(name: string): boolean {
		// TODO verifier que ce nom de variable n'existe pas deja !
		console.log(name);
		return true;
	}

	$: {
		if (!isVarNameValid(input_name.value)) {
			// TODO warning
		}
	}
</script>

<div class="flex items-center mb-10">
	<span class="badge bg-warning" draggable="true" />
	<div
		style="width:{box.size.x}px; height:{box.size.y}px;"
		class="bg-base-100 flex flex-row rounded-3xl mx-5 justify-center items-center"
	>
		<button
			class="btn bg-inherit border-none"
			style="
				width: {input_size.x}px;
				height: {input_size.y}px;
			"
			on:click={() => {
				input_name.isWriteMode = true;
			}}
		>
			{function_.name}
		</button>
		<div class="modal modal-middle {input_name.isWriteMode && 'modal-open'}">
			<div class="modal-box">
				<h3 class="font-bold text-lg">Var name</h3>
				<input
					bind:value={input_name.value}
					bind:this={input_name.target}
					type="text"
					class="input input-bordered w-full"
					placeholder="Enter your name"
				/>
			</div>
		</div>
		{#each function_.args as arg}
			<div
				on:dragenter={(e) => {
					arg.dragover = true;
					arg = arg;
					console.log('dragenter', e);
				}}
				on:dragleave={(e) => {
					arg.dragover = false;
					arg = arg;
					console.log('dragleave');
				}}
			>
				<button class="btn bg-inherit border-none" disabled={arg.dragover}>
					{arg.name}
				</button>
			</div>
		{/each}
	</div>

	<button
		class="btn btn-circle bg-red-400 hover:bg-red-700"
		on:click={() => {
			delBlock(function_.id);
		}}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 text-black"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 18L18 6M6 6l12 12"
			/></svg
		>
	</button>
</div>

<svelte:window on:keypress={onKeyPress} />

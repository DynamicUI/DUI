<script lang="ts">
	import type { Variable } from '$lib/class/variable';
	import type { Box } from '$lib/class/box';
	import { Input } from '$lib/class/input';
	import { Vec2 } from '$lib/class/vec2';

	export let variable: Variable;
	export let box: Box;
	export let delVariable: Function;

	let input_size: Vec2 = new Vec2(box.size.x / 2 - 10, box.size.y - 20);
	let input_name: Input = Input.default('name');

	function onKeyPress(e: any) {
		if (e.key == 'Enter') {
			input_name.isWriteMode = false;
		}
	}
</script>

<div class="flex items-center mb-10">
	<span class="badge bg-success" />
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
			{variable.name}
		</button>
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
			{variable.name}
		</button>
		<div class="modal modal-middle {input_name.isWriteMode && 'modal-open'}">
			<div class="modal-box">
				<h3 class="font-bold text-lg">Var name</h3>
				<input
					bind:this={input_name.target}
					type="text"
					class="input input-bordered w-full"
					placeholder="Enter your name"
				/>
			</div>
		</div>
	</div>
	<button
		class="btn btn-circle bg-red-400 hover:bg-red-700"
		on:click={() => {
			delVariable(variable.name);
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

<!--

	<InBoxInput bind:size={input_size} bind:input={input_name} bind:value={variable.name} />
	<InBoxInput bind:size={input_size} bind:input={input_value} bind:value={variable.value} />

-->

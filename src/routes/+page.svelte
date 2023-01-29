<script lang="ts">
	import { Variable } from '$lib/class/variable';
	import { BoxType, Box } from '$lib/class/box';
	import Sequencer from './Sequencer.svelte';

	let vars = [new Variable('Var 1', undefined, 0), new Variable('Var 2', undefined, 0)];

	function addVar() {
		vars.push(new Variable('Var ' + vars.length + 1, undefined, 0));
		vars = vars;
	}

	let b: Box = new Box('name', BoxType.VARIABLE, Variable.CONST_BOX_INFOS);
	console.log(b.size);
</script>

<!-- TODO Table-->
<div class="w-full h-screen flex justify-center items-center ">
	<div class="p-4 rounded-xl bg-base-300 m-3">
		<div class="flex flex-row items-center text-lg m-2">
			<kbd class="kbd">Ctrl</kbd>
			<div class="m-2" />
			<kbd class="kbd">A</kbd>
			<i class="ml-5">add a var</i>
		</div>
		<div class="flex flex-row items-center text-lg m-2">
			<kbd class="kbd">Ctrl</kbd>
			<div class="m-2" />
			<kbd class="kbd">R</kbd>
			<i class="ml-5">reset</i>
		</div>
		<div class="flex flex-row items-center text-lg m-2">
			<kbd class="kbd">Ctrl</kbd>
			<div class="m-2" />
			<kbd class="kbd">S</kbd>
			<i class="ml-5">save</i>
		</div>
		<div class="flex flex-row items-center text-lg m-2">
			<kbd class="kbd">Space</kbd>
			<i class="ml-5">run</i>
		</div>
	</div>
	<Sequencer />
	<div class="w-96 m-10" />
</div>

<!--


{#each vars as v (v.box.id)}
	<V><VariableBox bind:variable={v} bind:box={b} /></V>
{/each}

<button on:click={addVar} class="btn text-accent-content bg-accent">+</button>


-->

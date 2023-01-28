<script lang="ts">
	import { VariableBox } from '$lib/components';
	import { Variable } from '$lib/class/variable';
	import V from './V.svelte';
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


<Sequencer></Sequencer>

<!--


{#each vars as v (v.box.id)}
	<V><VariableBox bind:variable={v} bind:box={b} /></V>
{/each}

<button on:click={addVar} class="btn text-accent-content bg-accent">+</button>


-->
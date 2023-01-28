<script lang="ts">
	import { Box } from '$lib/class/box';
	import { Variable } from '$lib/class/variable';
	import VariableDeclaration from '$lib/components/box/VariableDeclaration.svelte';

	let box = new Box('name', 0, Variable.CONST_BOX_INFOS);
	let variables = [new Variable('Var 1', undefined, 0), new Variable('Var 2', undefined, 0)];

	function delVariable(name: String) {
		variables = variables.filter((variable) => variable.name != name);
	}
</script>

<div class="w-full h-screen flex justify-center items-center ">
	<div class="mockup-window bg-neutral items-center">
		<div class="justify-center p-16 overflow-scroll h-[80vh] items-center">
			{#each variables as variable (variable.box.id)}
				<VariableDeclaration bind:box bind:variable {delVariable} />
			{/each}
		</div>
		<div class="btn-group flex justify-center">
			<div class="tooltip" data-tip="Add a variable">
				<button
					class="btn"
					on:click={() => {
						variables.push(new Variable('Var ' + variables.length + 1, undefined, 0));
						variables = variables;
					}}
				>
					<span class="badge bg-success" />
				</button>
			</div>
			<button class="btn">
				<span class="badge bg-error" />
			</button>
			<button class="btn">
				<span class="badge bg-warning" />
			</button>
		</div>
	</div>
</div>

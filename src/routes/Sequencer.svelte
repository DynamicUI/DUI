<script lang="ts">
	import { Box } from '$lib/class/box';
	import { Variable } from '$lib/class/variable';
	import { flip } from 'svelte/animate';
	import VariableDeclaration from '$lib/components/box/VariableDeclaration.svelte';
	import { Function_ } from '$lib/class/function';
	import FunctionCall from '$lib/components/box/FunctionCall.svelte';

	let box = new Box('name', 0, Variable.CONST_BOX_INFOS);

	let println = new Function_('println');
	println.args = [{ name: 'toPrint', value: null, dragover: false }];

	let actionBlocks = [new Variable('', undefined, 0), new Variable('', undefined, 0), println];

	function delBlock(id: String) {
		actionBlocks = actionBlocks.filter((actionBlock) => actionBlock.id != id);
	}
</script>

<div class="w-full h-screen flex justify-center items-center ">
	<div class="bg-neutral items-center  rounded-2xl justify-center">
		<div style="width: {Variable.CONST_BOX_INFOS.BASIC_BOX_SIZE.x * 1.9}px;" />
		<div class="flex  flex-col p-16 overflow-scroll h-[80vh] items-center">
			{#each actionBlocks as actionBlock (actionBlock.id)}
				<div animate:flip={{ duration: 150 }}>
					{#if actionBlock instanceof Variable}
						<VariableDeclaration bind:box bind:variable={actionBlock} {delBlock} />
					{:else if actionBlock instanceof Function_}
						<FunctionCall bind:box bind:function_={actionBlock} {delBlock} />
					{/if}
				</div>
			{/each}
		</div>
		<div class="btn-group flex justify-center">
			<div class="tooltip" data-tip="Add a variable declaration">
				<button
					class="btn"
					on:click={() => {
						actionBlocks = [...actionBlocks, new Variable('', undefined, 0)];
					}}
				>
					<span class="badge bg-success" />
				</button>
			</div>
			<div class="tooltip" data-tip="Add a function call">
				<button
					class="btn"
					on:click={() => {
						actionBlocks = [...actionBlocks, new Function_('fn_Name')];
					}}
				>
					<span class="badge bg-warning" />
				</button>
			</div>
			<div class="tooltip" data-tip="">
				<button class="btn">
					<span class="badge bg-error" />
				</button>
			</div>
			<div class="tooltip" data-tip="run">
				<button class="btn">
					<svg
						class="fill-white"
						width="20px"
						height="20px"
						viewBox="0 0 16 16"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="m 2 2.5 v 11 c 0 1.5 1.269531 1.492188 1.269531 1.492188 h 0.128907 c 0.246093 0.003906 0.488281 -0.050782 0.699218 -0.171876 l 9.796875 -5.597656 c 0.433594 -0.242187 0.65625 -0.734375 0.65625 -1.226562 c 0 -0.492188 -0.222656 -0.984375 -0.65625 -1.222656 l -9.796875 -5.597657 c -0.210937 -0.121093 -0.453125 -0.175781 -0.699218 -0.175781 h -0.128907 s -1.269531 0 -1.269531 1.5 z m 0 0"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</div>

<script lang="ts">
	import { isKeyboardOpen } from '$lib/store';
	import { Box } from '$lib/class/box';
	import { Function_ } from '$lib/class/function';
	import FunctionCall from '$lib/components/box/FunctionCall.svelte';
	import { Variable } from '$lib/class/variable';
	import { flip } from 'svelte/animate';
	import VariableDeclaration from '$lib/components/box/VariableDeclaration.svelte';
	import { fade } from 'svelte/transition';

	let box = new Box('name', 0, Variable.CONST_BOX_INFOS);
	let actionBlocks: any[] = [];

	function delBlock(id: String) {
		actionBlocks = actionBlocks.filter((actionBlock) => actionBlock.id != id);
	}

	let showKbd: boolean = false;
	let keys: string[] = [];
	let isSaving: boolean = false;

	function onKeyDown(e: any) {
		keys.push(e.key);
		if ([...keys].includes('Control') && [...keys].includes('r')) {
			e.preventDefault();
			$isKeyboardOpen = false;
			actionBlocks = [];
		}

		if ([...keys].includes('Control') && [...keys].includes('a') && !$isKeyboardOpen) {
			e.preventDefault();
			actionBlocks = [...actionBlocks, new Variable('', undefined, 0)];
		}

		if ([...keys].includes('Control') && [...keys].includes('s')) {
			e.preventDefault();
			isSaving = true;
			setTimeout(() => {
				isSaving = false;
			}, 3000);
		}
	}

	function onKeyUp(event: any) {
		keys = keys.filter((k) => k !== event.key);
		showKbd = false;
	}
</script>

<svelte:window on:keyup={onKeyUp} on:keydown={onKeyDown} />

<div class="bg-neutral items-center  rounded-2xl justify-center">
	<div style="width: {Variable.CONST_BOX_INFOS.BASIC_BOX_SIZE.x * 1.9}px;" />
	<div class="flex  flex-col p-16 overflow-scroll h-[80vh] items-center">
		{#each actionBlocks as actionBlock (actionBlock.id)}
			<div animate:flip={{ duration: 150 }} transition:fade={{ duration: 150 }}>
				<div class="flex items-center mb-10">
					<span
						class="badge {actionBlock instanceof Variable ? 'bg-success' : 'bg-warning'}"
						draggable="true"
						on:dragstart={(event) => {
							event?.dataTransfer?.setData('dragDatas', JSON.stringify({ id: actionBlock.id }));
						}}
					/>
					{#if actionBlock instanceof Variable}
						<VariableDeclaration bind:box bind:variable={actionBlock} {delBlock} />
					{:else if actionBlock instanceof Function_}
						<FunctionCall bind:box bind:function_={actionBlock} {delBlock} />
					{/if}
					<button
						class="btn btn-circle bg-red-400 hover:bg-red-700"
						on:click={() => {
							delBlock(actionBlock.id);
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

{#if isSaving}
	<div
		transition:fade={{ duration: 180 }}
		class="alert alert-error shadow-lg absolute top-8 left-[38vw] w-96"
	>
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current flex-shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span>You can't save, you ass</span>
		</div>
	</div>
{/if}

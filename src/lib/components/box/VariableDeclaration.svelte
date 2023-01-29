<script lang="ts">
	import type { Variable } from '$lib/class/variable';
	import type { Box } from '$lib/class/box';
	import { Input } from '$lib/class/input';
	import { Vec2 } from '$lib/class/vec2';
	import TextInput from './TextInput.svelte';
	import { onMount } from 'svelte';
	import { isKeyboardOpen } from '$lib/store';
	import MulitInput from './MulitInput.svelte';

	export let variable: Variable;
	export let box: Box;

	let input_size: Vec2 = new Vec2(box.size.x / 2 - 10, box.size.y - 20);
	let input_name: Input = Input.default('name');
	let input_value: Input = Input.default('value');
	onMount(() => {
		input_name.isWriteMode = true;
		$isKeyboardOpen = true;
	});

	function onWindowClick(e: any) {
		if (input_name.isWriteMode && !input_name.target.contains(e.target)) {
			input_name.isWriteMode = false;
		}
	}

	function onKeyDown(e: any) {
		if (e.repeat) return;

		if (e.key == 'Escape') {
			if (!isVarNameValid(variable.name)) return;
			if (!isVarValValid(variable.value)) return;
			$isKeyboardOpen = false;
			input_name.isWriteMode = false;
			input_value.isWriteMode = false;
		}
		if (e.key == 'Enter') {
			if (!isVarNameValid(input_name.value)) return;
			if (!isVarValValid(input_value.value)) return;
			if (input_name.isWriteMode) variable.name = input_name.value;
			if (input_value.isWriteMode) variable.value = input_value.value;
			$isKeyboardOpen = false;
			input_name.isWriteMode = false;
			input_value.isWriteMode = false;
		}
	}

	function isVarNameValid(name: string): boolean {
		if (name.length == 0) return false;
		// TODO verifier que ce nom de variable n'existe pas deja !
		return true;
	}

	function isVarValValid(value: string): boolean {
		// TODO
		//console.log(value);
		return true;
	}
</script>

<div
	style="width:{box.size.x}px; height:{box.size.y}px;"
	class="bg-base-100 flex flex-row rounded-3xl mx-5 justify-center items-center"
>
	<TextInput
		bind:input={input_name}
		bind:input_size
		bind:value={variable.name}
		isInputValid={isVarNameValid}
	/>
	<MulitInput
		bind:input={input_value}
		bind:input_size
		bind:value={variable.value}
		bind:id={variable.id}
		isInputValid={isVarNameValid}
	/>
</div>

<svelte:window on:mouseup={onWindowClick} on:keydown={onKeyDown} />

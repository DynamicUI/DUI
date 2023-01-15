<script lang="ts">
	import InBoxInput from './InBoxInput.svelte';
	import type { Variable } from '$lib/class/variable';
	import { Input } from '$lib/class/input';

	export let variable: Variable;
	let isDragging = false;

	let input: { value: Input; name: Input } = { value: Input.default("value"), name: Input.default("name") };

	function onMouseDown() {
		isDragging = true;
	}

	function onMouseMove(e: any) {
		if (!isDragging || input.name.isWriteMode || input.value.isWriteMode) return;
		variable.box.position.x += e.movementX;
		variable.box.position.y += e.movementY;
	}

	function onMouseUp() {
		isDragging = false;
	}

	let onDbClick = (e: any) => {
		if (e.target.id == 'value') {
			input.value.isWriteMode = true;
		}
		if (e.target.id == 'name') {
			input.name.isWriteMode = true;
		}
		if (e.target.tagName == 'DIV') {
			input.name.isWriteMode = true;
		}
	};

	function onKeyUp(event: any) {
		if (input.name.isWriteMode && event.key == 'Enter') {
			input.name.isWriteMode = !input.name.isWriteMode;
			input.value.isWriteMode = !input.value.isWriteMode;
			input.value.target.focus();
			return;
		}
		if (event.key == 'Escape' || event.key == 'Enter') {
			input.name.isWriteMode = false;
			input.value.isWriteMode = false;
		}
	}
</script>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} on:keyup={onKeyUp} />

<!--

-->
<div
	on:mousedown={onMouseDown}
	on:dblclick={onDbClick}
	class="
		inline
		select-none
		cursor-move
		absolute
		p-1
		{variable.ui_info.BACKGROUD_COLOR} {variable.box.css.position}
	"
	style="
		border: solid 1px gray;
		left: {variable.box.position.x}px;
		top: {variable.box.position.y}px;
		border: {variable.box.border.size}px solid {variable.box.border.color};
		width:  {variable.box.size.x}px;
		height: {variable.box.size.y}px;
		box-shadow: {variable.box.shadow.delta}px {variable.box.shadow.size}px {variable.box.shadow
		.blur}px {variable.ui_info.SHADOW_COLOR};
		z-index: {variable.box.css.z_index};
		"
>
	<InBoxInput bind:variable bind:input={input.name} bind:onDbClick bind:value={variable.name}/>
	<InBoxInput bind:variable bind:input={input.value} bind:onDbClick bind:value={variable.value}/>
</div>
<script lang="ts">
	import InBoxInput from './InBoxInput.svelte';
	import { Variable } from '$lib/class/variable';
	import { Input } from '$lib/class/input';
	import type { Box } from '$lib/class/box';
	import { Vec2 } from '$lib/class/vec2';
	import { mousePosition } from '$lib/store';

	export let variable: Variable;
	export let box: Box;

	let input_size: Vec2 = new Vec2(box.size.x / 2 - 10, box.size.y - 20);
	let input_value: Input = Input.default('value');
	let input_name: Input = Input.default('name');

	function onMouseEnter(e: any) {
		//console.log(e.target);
	}

	$: {
		//console.log($isMouseUp);
		//console.log($mousePosition);
	}
</script>

<div
	class="
		flex
		select-none
		cursor-move
		absolute
		p-1
		{Variable.CONST_BOX_INFOS.BACKGROUD_COLOR} {box.css.position}
	"
	style="
		border: solid 1px gray;
		width: {box.size.x}px;
		height: {box.size.y}px;
		border: {box.border.size}px solid {box.border.color};
		box-shadow: {box.shadow.delta}px
			{box.shadow.size}px {box.shadow.blur}px {Variable.CONST_BOX_INFOS.SHADOW_COLOR};
	"
>
	<InBoxInput bind:size={input_size} bind:input={input_value} bind:value={variable.value} />
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<div
		on:mouseenter={onMouseEnter}
		on:mouseover={(e) => {
			//console.log('over', e);
		}}
	>
		<InBoxInput bind:size={input_size} bind:input={input_name} bind:value={variable.name} />
	</div>
</div>

<!--


-->

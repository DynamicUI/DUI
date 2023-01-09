<script lang="ts">
	import { specialKeys, screenHeight, screenWight, isMouseUp, mousePosition } from '$lib/store.ts';
	import { Variable } from '$lib/class/variable.ts';

	export let variable: Variable;

	let isDragging = false; // TODO trouver un moyent de subscribe a celui de la class ?

	function handleMouseDown(event) {
		variable.box.updateDeltaMouse($mousePosition);
		isDragging = $specialKeys.control && !variable.box.is_child;
	}

	$: if (!$specialKeys.control || $isMouseUp) {
		isDragging = false;
	}

	$: {
		variable.box.updateDrag(isDragging);
		variable = variable; // permet d'update
	}

	mousePosition.subscribe((value) => {
		if (!isDragging) return;
		variable.box.boxPosition = value;
		variable.box.boxPosition.x -= variable.box.deltaMouseBox.x;
		variable.box.boxPosition.y -= variable.box.deltaMouseBox.y;
	});
</script>

<div
	class="post-it {variable.ui_info.BACKGROUD_COLOR} {variable.box.css.position}"
	style="
		   left: {variable.box.boxPosition.x}px;
		   top: {variable.box.boxPosition.y}px;
		   border: {variable.box.border.size}px solid {variable.box.border.color};
		   width:  {variable.box.boxSize.x}px;
		   height: {variable.box.boxSize.y}px;
		   box-shadow: {variable.box.shadow.delta}px {variable.box.shadow.size}px {variable.box.shadow
		.blur}px {variable.ui_info.SHADOW_COLOR};
	"
	on:mousedown={handleMouseDown}
>
	<slot />
</div>

<style>
	.post-it {
		border-radius: 15px;
		user-select: none; /* permet de ne pas select le text */
		display: flex;
	}
</style>

<script lang="ts">
	import { specialKeys, screenHeight, screenWight, isMouseUp, mousePosition } from '$lib/store.ts';

	const FIXED_COLOR = 'black';
	const FIXED_SHADOW = 0;
	const DRAGGING_COLOR = 'red';
	const DRAGGING_DELTA = 4;
	const SHADOW_COLOR = 'grey';
	const SHADOW_BLUR = 5;
	const BACKGROUD_COLOR = 'bg-teal-100';
	const BASIC_BOX_SIZE = { x: 100, y: 100 };
	const GAP = 20; // between two child

	export let child_count = 0;
	export let is_child = false; // if true, can't move

	let shadow = { delta: 0, size: 0, blur: SHADOW_BLUR };
	let boxPosition = { x: 0, y: 0 };
	let boxSize = BASIC_BOX_SIZE;
	if (child_count) {
		boxSize.y = boxSize.y * 1.2
		boxSize.x = boxSize.x * child_count + GAP * child_count;
	}
	let deltaMouseBox = { x: 0, y: 0 };
	let border = { color: 'black', size: 1 };
	let isDragging: bool = false;

	function handleMouseDown(event) {
		if (!$specialKeys.control || is_child) return;
		isDragging = true;
		deltaMouseBox.x = $mousePosition.x - boxPosition.x;
		deltaMouseBox.y = $mousePosition.y - boxPosition.y;
	}

	$: {
		if (!$specialKeys.control || $isMouseUp) {
			isDragging = false;
		}
	}

	$: {
		if (isDragging) {
			border.color = DRAGGING_COLOR;
			shadow.delta = DRAGGING_DELTA;
			shadow.size = DRAGGING_DELTA;
			shadow.blur = SHADOW_BLUR;
			boxPosition.x -= DRAGGING_DELTA;
			boxPosition.y -= DRAGGING_DELTA;
		} else {
			border.color = FIXED_COLOR;
			shadow.delta = FIXED_SHADOW;
			shadow.size = FIXED_SHADOW;
			shadow.blur = 0;
			boxPosition.x += DRAGGING_DELTA;
			boxPosition.y += DRAGGING_DELTA;
		}
	}

	mousePosition.subscribe((value) => {
		if (!isDragging) return;
		boxPosition = value;
		boxPosition.x -= deltaMouseBox.x;
		boxPosition.y -= deltaMouseBox.y;
	});

</script>

<div
		class="post-it {BACKGROUD_COLOR}"
	style="
		   left: {boxPosition.x}px;
		   top: {boxPosition.y}px;
		   border: {border.size}px solid {border.color};
		   width: {boxSize.x}px;
		   height: {boxSize.y}px;
		   box-shadow: {shadow.delta}px {shadow.size}px {shadow.blur}px {SHADOW_COLOR};
	"
	on:mousedown={handleMouseDown}
>
	<slot />
</div>

<style>
	.post-it {
		--s: 200px; /* control the size */
		--r: 42px; /* control the circular shapes */

		border-radius: 15px;
		position: absolute;
		user-select: none; /* permet de ne pas select le text */
		/*
		mask: radial-gradient(calc(var(--r)) at calc(100%) 50%, #0000 95%, #000) top/100%
				calc(100% - var(--r)) no-repeat,
			radial-gradient(var(--r) at left 50% bottom var(--r), #000 95%, #0000);
			*/
	}
</style>

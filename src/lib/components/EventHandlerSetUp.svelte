<script lang="ts">
	import { specialKeys, screenHeight, screenWight, isMouseUp, mousePosition } from '$lib/store.ts';

	function handleMouseUp() {
		isMouseUp.set(true);
	}

	function handleMouseDown() {
		isMouseUp.set(false);
	}

	function handleMouseMove(event) {
		mousePosition.set({ x: event.clientX, y: event.clientY });
	}

	function handleKeyDown(event) {
		if (event.key == 'Control') {
			$specialKeys.control = true;
		}
		if (event.key == 'Shift') {
			$specialKeys.shift = true;
		}
	}

	function handleKeyUp(event) {
		if (event.key == 'Control') {
			$specialKeys.control = false;
		}
		if (event.key == 'Shift') {
			$specialKeys.shift = false;
		}
	}

	let sidebar = false;
</script>

<svelte:window
	bind:innerWidth={$screenWight}
	bind:innerHeight={$screenHeight}
	on:keydown={handleKeyDown}
	on:keyup={handleKeyUp}
/>

<div
	style="width: {$screenWight}px; height: {$screenHeight}px;"
	on:mouseup={handleMouseUp}
	on:mousedown={handleMouseDown}
	on:mousemove={handleMouseMove}
>
	<slot />
</div>

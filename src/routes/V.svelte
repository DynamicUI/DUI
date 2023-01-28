<script lang="ts">
	import type { Vec2 } from '$lib/class/vec2';
	import { mousePosition } from '$lib/store';
	export let position: Vec2 = { x: 0, y: 0 };

	let isMoving = false;

	function onMouseMove(e: any) {
		if (isMoving) {
			position.x += e.movementX;
			position.y += e.movementY;
		}
	}

	function onMouseUp() {
		isMoving = false;
	}

	function onMouseDown() {
		isMoving = true;
	}

	let el1: any;
	let one_found = false;
	function checkOverlap() {
		if (!el1) return;
		if (one_found) return;
		const rect1 = el1.getBoundingClientRect();

		const elements = document.querySelectorAll('div');
		for (let i = 0; i < elements.length; i++) {
			if (elements[i] == el1) continue;
			console.log('Checking element id:', elements[i]);

			const rect2 = elements[i].getBoundingClientRect();
			if (
				rect1.left < rect2.right &&
				rect1.right > rect2.left &&
				rect1.top < rect2.bottom &&
				rect1.bottom > rect2.top
			) {
				console.log('Elements are overlapping', elements[i]);
				console.log('Overlapping element id:', elements[i].id);
				one_found = true;
				break;
			}
		}
		console.log('Elements are not overlapping');
	}

	mousePosition.subscribe((value) => {
		if (!isMoving) return;
		checkOverlap();
	});
</script>

<section
	bind:this={el1}
	on:mousedown={onMouseDown}
	style="
		left: {position.x}px;
		top: {position.y}px;
		z-index: {isMoving ? 1 : 0};
	"
	class="
		absolute
	"
>
	<slot />
</section>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />

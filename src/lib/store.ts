import { writable } from 'svelte/store';
import { Vec2 } from '$lib/class/vec2.ts';

export const isMouseUp = writable(true);
export const mousePosition = writable(new Vec2(0, 0));
export const screenHeight = writable(0);
export const screenWight = writable(0);
export const specialKeys = writable({ control: false, shift: false });

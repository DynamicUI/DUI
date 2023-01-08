import { writable } from 'svelte/store';

export const isMouseUp = writable(true);
export const mousePosition = writable({ x: 0, y: 0 });
export const screenHeight = writable(0);
export const screenWight = writable(0);
export const specialKeys = writable({ control: false, shift: false });

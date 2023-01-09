import { Vec2 } from '$lib/class/vec2.ts';

export enum BoxType {
	VARIABLE,
	FUNCTION
}

export type ConstBoxInfos = {
	// TODO faire un type color ? juste utiliser les couleurs de tailwind ?
	FIXED_COLOR: string; // Color when on the floor
	DRAGGING_COLOR: string; // Color when dragged
	SHADOW_COLOR: string; // Shadow color
	BACKGROUD_COLOR: string; // Color of the Box

	FIXED_SHADOW: number; // Shadow size and distance when on the floor
	DRAGGING_DELTA: number; // ... when dragged
	SHADOW_BLUR: number; //

	GAP: number; // Distance between two child
	BASIC_BOX_SIZE: Vec2;
};

/// Class qui contient tout les elements UI
export class Box {
	type: BoxType;

	name: String;

	child_count: number = 0;
	is_child: bool = false; // if true, can't move

	ui_info: ConstBoxInfos;

	shadow = { delta: 0, size: 0, blur: 0 };
	boxPosition: Vec2 = new Vec2(0, 0);
	boxSize: Vec2;

	deltaMouseBox: Vec2 = new Vec2(0, 0);
	border = { color: 'black', size: 1 };
	isDragging: bool = false;

	css = { position: 'absolute' };

	constructor(name: String, type: BoxType, ui_info: ConstBoxInfos) {
		this.name = name;
		this.type = type;
		this.ui_info = ui_info;
		this.boxSize = ui_info.BASIC_BOX_SIZE;
		this.shadow.blur = ui_info.SHADOW_BLUR;
		if (this.child_count) {
			this.boxSize.y = this.boxSize.y * 1.2;
			this.boxSize.x = this.boxSize.x * this.child_count + ui_info.GAP * this.child_count;
		}
		if (this.is_child) {
			this.css.position = 'relative';
		}
	}

	updateDrag(isDragging: bool) {
		this.border.color = isDragging ? this.ui_info.DRAGGING_COLOR : this.ui_info.FIXED_COLOR;
		this.shadow.delta = isDragging ? this.ui_info.DRAGGING_DELTA : this.ui_info.FIXED_SHADOW;
		this.shadow.size = isDragging ? this.ui_info.DRAGGING_DELTA : this.ui_info.FIXED_SHADOW;
		this.shadow.blur = isDragging ? this.ui_info.SHADOW_BLUR : 0;
		// TODO vec op
		this.boxPosition.x += isDragging ? -this.ui_info.DRAGGING_DELTA : this.ui_info.DRAGGING_DELTA;
		this.boxPosition.y += isDragging ? -this.ui_info.DRAGGING_DELTA : this.ui_info.DRAGGING_DELTA;
	}

	updateDeltaMouse(mousePosition: Vec2) {
		this.deltaMouseBox.x = mousePosition.x - this.boxPosition.x;
		this.deltaMouseBox.y = mousePosition.y - this.boxPosition.y;
	}
}

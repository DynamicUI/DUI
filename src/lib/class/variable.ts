import { Vec2 } from '$lib/class/vec2.ts';
import { BoxType, Box } from '$lib/class/box.ts';

/// Class specifique qui contient tout ce qui concerne les Box Varibles
export class Variable {
	box: Box;
	ui_info: ConstBoxInfos = {
		FIXED_COLOR: 'black',
		DRAGGING_COLOR: 'red',
		BACKGROUD_COLOR: 'bg-teal-100',
		SHADOW_COLOR: 'grey',
		SHADOW_BLUR: 5,
		FIXED_SHADOW: 0,
		DRAGGING_DELTA: 4,
		BASIC_BOX_SIZE: new Vec2(100, 100),
		GAP: 20
	};

	constructor(name: String, is_child: bool, child_count: number) {
		this.box = new Box(name, BoxType.VARIABLE, this.ui_info);
		this.box.child_count = child_count;
		this.box.is_child = is_child;
	}
}

/* reflection sur comment s'occuper de tous ces blocks:
- avoir une AST direct ? 
- avoir un tableau d'un class block de base ?

- avoir une class pour chaque type de boite 
	et une class box qui compose les autres (ou heritage)
	+ avoir un lien vers le parent ?


- Ce qu'il faut se dire c'est qu'a un moment ou a un autre, on va devoir creer
	un interpreteur/compilateur et qu'un des premieres etapes,
	la tokenisation (et le parsing) va etre grandement simplifiee
	si on a une structure de donnee qui est deja "simple" et qui
	va dans le sens ou qui est directement la structure de donnee qu'on
	veut pour le compilateur
 
*/

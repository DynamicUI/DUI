import { Vec2 } from '$lib/class/vec2';
import { BoxType, Box, type ConstBoxInfos } from '$lib/class/box';

// specifique a la class Variable
const CONST_BOX_INFOS: ConstBoxInfos = {
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

export enum VarType {
	INT,
	STRING,
	FLOAT,
	OTHER
}

/// Class specifique qui contient tout ce qui concerne les Box Varibles
export class Variable {
	box: Box;
	name?: string;

	type?: VarType;
	value?: any;

	ui_info: ConstBoxInfos = CONST_BOX_INFOS;

	constructor(name: string, type: VarType | undefined = undefined, value: any = null) {
		this.box = new Box(name, BoxType.VARIABLE, CONST_BOX_INFOS);
		this.type = type;
		this.value = value;
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

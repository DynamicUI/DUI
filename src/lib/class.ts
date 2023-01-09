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

/// Class qui contient tout les elements UI
export class Box {
	name: String;

	constructor(name: String) {
		this.name = name;
		console.log(name + " instancied");
	}
}

/// Class specifique qui contient tout ce qui concerne les Box Varibles
export class Variable {
	box: Box;

	constructor(name: String) {
		this.box = new Box(name);
	}
}

/// Class specifique qui contient tout ce qui concerne les Box Func
export class Func {
	box: Box;

	constructor(name: String) {
		//box = new Box(name);
	}
}

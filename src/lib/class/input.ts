export class Input {
	target: any;
	isWriteMode: boolean;
	name: string; // TODO a quoi sert le name bon sang ?
	value: string = '';

	constructor(target: any, isWriteMode: boolean, name: string) {
		this.target = target;
		this.isWriteMode = isWriteMode;
		this.name = name;
	}

	static default(name: string) {
		return new Input(undefined, false, name);
	}
}

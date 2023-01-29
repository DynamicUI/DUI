/* Contains the built-in functions of the language. */

export function println(...any_args: any[]) {
	console.log(arguments);
	console.log(...any_args, '\n');
}

export function print(...any_args: any[]) {
	console.log(...any_args);
}

export function math(string_litteral: string) {
	console.log('TODO: math function');
}

export const builtins: Map<string, Function> = new Map([
	['println', println],
	['print', print],
	['math', math]
]);

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
const ARGUMENT_NAMES = /([^\s,]+)/g;
export function getParamNames(func: Function) {
	let fnStr = func.toString().replace(STRIP_COMMENTS, '');
	let args: string[] | null = fnStr
		.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
		.match(ARGUMENT_NAMES);
	if (args === null) return [];
	let result = args.map((arg) => {
		if (arg.startsWith('any_')) return { name: arg.slice(4), type: 'any' };
		if (arg.startsWith('...any_')) return { name: arg.slice(7), type: '...any' };
		if (arg.startsWith('string_')) return { name: arg.slice(7), type: 'string' };
		if (arg.startsWith('number_')) return { name: arg.slice(7), type: 'number' };
		if (arg.startsWith('boolean_')) return { name: arg.slice(8), type: 'boolean' };
		if (arg.startsWith('array_')) return { name: arg.slice(6), type: 'array' };
	});
	return result;
}

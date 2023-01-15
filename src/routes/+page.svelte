<script lang="ts">
	import { VariableBox } from '$lib/components';
	import { Variable } from '$lib/class/variable';

	/// En javascript, quand un object est instancier, le GC commence a compter
	///		le nombre de variable qui y font reference.
	///		quand ce nombre descend a 0, le GC supprime l'objet de la memoire
	///		Ca signifie qu'en assignand un object a une autre varible que la
	///		premiere, cela creer un lien (comment un pointeur) et non une copie !
	///		-> ca vaut aussi pour les objects dans des objects !!

	/// Vu qu'on la bind avec la VariableBox, il est actualise dans les 2 sens
	let vars = [new Variable('Var 1', undefined, 0), new Variable('Var 2', undefined, 0)];

	/*
<VariableBox bind:variable={vars[0]}>VarC</VariableBox>
<VariableBox bind:variable={vars[1]}>m2</VariableBox>
*/
</script>

{#each vars as v (v.box.id)}
	<VariableBox bind:variable={v} />
{/each}

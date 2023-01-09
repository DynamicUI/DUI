<script lang="ts">
	import { VariableBox } from '$lib/components';
	import { Variable } from '$lib/class/variable.ts';

	let MaVar: VariableBox = new Variable('MaVar name', false, 0);
	/*
		<VariableBox child_count={2}>
			Function
			<VariableBox is_child={true}>VarA</VariableBox>
			<VariableBox is_child={true}>VarB</VariableBox>
		</VariableBox>
	*/
</script>

<VariableBox bind:variable={MaVar}>VarC</VariableBox>

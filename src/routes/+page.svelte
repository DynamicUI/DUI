<script lang="ts">
	import { PostIt } from '$lib/components';
</script>

<PostIt child_count={2}>
	Function
	<PostIt is_child={true}>VarA</PostIt>
	<PostIt is_child={true}>VarB</PostIt>
</PostIt>

<PostIt is_child={false}>VarC</PostIt>

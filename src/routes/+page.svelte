<script lang="ts">
	import { PostIt } from '$lib/components';
</script>

<PostIt child_count={2}>
	<PostIt is_child={true}>Benoit</PostIt>
	<PostIt is_child={true}>Arnaud</PostIt>
</PostIt>

<PostIt is_child={false}>Quentin</PostIt>

<script lang="ts">
	/*
	import { signInWithPopup } from 'firebase/auth';
	import { authState } from 'rxfire/auth';
	import { auth, googleProvider } from '$lib/firebase';
	let user = authState(auth);
	$: {
		if ($user) {
			setContext('user', $user);
		}
	}

	{#if $user === undefined}
	<LoadingSpin />
	{:else if $user !== null}

		// ce qu'il y a

{:else}
	<!-- login and register -->
	<div class="center bg-cyan-200">
		<button on:click={() => signInWithPopup(auth, googleProvider)} class="rounded-md bg-white drop-shadow-2xl px-5">
			<div class="flex items-center pr-2">
			<img src="images/btn_google_light_normal_ios.svg" alt="google logo"/>SignIn
			</div>
		</button>
	</div>
{/if}
		*/

	import '$lib/app.css';
	import { EventHandlerSetUp, Navbar, PostIt, Sidebar } from '$lib/components';
	import { screenHeight, screenWight, isMouseUp, mousePosition } from '$lib/store.ts';

	let sidebar = false;
</script>

<EventHandlerSetUp>
	<Navbar bind:sidebar />
	<Sidebar bind:sidebar />
	<slot />
</EventHandlerSetUp>

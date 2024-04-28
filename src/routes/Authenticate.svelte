<!-- Based on the tutorial by Smoljames, thank you for the guidance. -->
<script lang="ts">
	import { authHandlers } from '$lib/stores/auth_store';

	let email = '';
	let password = '';
	let confirm = '';
	let error = false;
	let register = false;
	let authenticating = false;

	async function handleAuthenticate() {
		if (authenticating) return;

		if (!email || !password || (register && password !== confirm)) {
			error = true;
			return;
		}
		authenticating = true;
		try {
			if (!register) {
				await authHandlers.login(email, password);
			} else {
				await authHandlers.signup(email, password);
			}
		} catch (err) {
			console.log('There is an auth error', err);
			error = true;
			authenticating = false;
		}
	}

	function handleRegister() {
		register = !register;
	}
</script>

<div class="main-container">
	<div class="auth-container">
		<form action="">
			<h1>{register ? 'Register' : 'Login'}</h1>

			{#if error}
				<p class="error">There's something wrong with the email or password.</p>
			{/if}

			<label for="email">
				<p class={email ? 'above' : 'center'}>Email</p>
				<input bind:value={email} type="email" name="email" id="email" placeholder="Email" />
			</label>

			<label for="password">
				<p class={password ? 'above' : 'center'}>Password</p>
				<input
					bind:value={password}
					type="password"
					name="password"
					id="password"
					placeholder="Password"
				/>
			</label>

			{#if register}
				<label for="confirm">
					<p class={confirm ? 'above' : 'center'}>Confirm Password</p>
					<input
						bind:value={confirm}
						type="password"
						name="confirm"
						id="confirm"
						placeholder="Confirm Password"
					/>
				</label>
			{/if}

			<button type="submit" on:click={handleAuthenticate}>
				{#if authenticating}
					<!-- spinner icon -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
						{...$$props}
					>
						<defs>
							<linearGradient id="mingcuteLoadingFill0" x1="50%" x2="50%" y1="5.271%" y2="91.793%">
								<stop offset="0%" stop-color="currentColor" />
								<stop offset="100%" stop-color="currentColor" stop-opacity="0.55" />
							</linearGradient>
							<linearGradient id="mingcuteLoadingFill1" x1="50%" x2="50%" y1="15.24%" y2="87.15%">
								<stop offset="0%" stop-color="currentColor" stop-opacity="0" />
								<stop offset="100%" stop-color="currentColor" stop-opacity="0.55" />
							</linearGradient>
						</defs>
						<g fill="none">
							<path
								d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
							/>
							<path
								fill="url(#mingcuteLoadingFill0)"
								d="M8.749.021a1.5 1.5 0 0 1 .497 2.958A7.502 7.502 0 0 0 3 10.375a7.5 7.5 0 0 0 7.5 7.5v3c-5.799 0-10.5-4.7-10.5-10.5C0 5.23 3.726.865 8.749.021"
								transform="translate(1.5 1.625)"
							/>
							<path
								fill="url(#mingcuteLoadingFill1)"
								d="M15.392 2.673a1.5 1.5 0 0 1 2.119-.115A10.475 10.475 0 0 1 21 10.375c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5.007-13.084a1.5 1.5 0 0 1-.115-2.118"
								transform="translate(1.5 1.625)"
							/>
						</g>
					</svg>
				{:else}
					Submit
				{/if}
			</button>
		</form>

		<div class="options">
			<p class="divider">Or</p>
			{#if register}
				<div>
					<p>Already have an account?</p>
					<button on:click={handleRegister}>Login</button>
				</div>
			{:else}
				<div>
					<p>Don't have an account?</p>
					<button on:click={handleRegister}>Register</button>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.main-container {
		min-height: 100vh;
		background: linear-gradient(to right, #000428, #000046);
		color: white;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.auth-container {
		display: flex;
		flex-direction: column;
		align-items: center; /* horizontally center the container */
		justify-content: center; /* vertically center the container */
		flex: 1; /* this will make the container take up the full height of the viewport */
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.2rem; /* rem means relative to the font-size of the root element */
		width: 350px;
		max-width: 100%;
		margin: 0 auto;
		padding: 1rem;
	}

	form label {
		position: relative;
		border: 3px solid rgb(6, 6, 78);
		border-radius: 0.5rem;
	}

	form label:focus-within {
		border: 3px solid rgb(91, 159, 255);
	}

	form input {
		padding: 0.5rem;
		width: 100%;
		border: none;
		background: transparent;
		border-radius: 0.5rem;
		color: white;
		font-size: 0.8rem;
	}

	form input:focus {
		outline: none;
	}

	form button {
		background: rgb(6, 6, 78);
		color: white;
		border: none;
		padding: 0.5rem;
		margin-top: 1.5rem;
		border-radius: 0.5rem;
		cursor: pointer; /* changes the cursor to a pointer (hand) when hovering over the button */
		font-size: 1.2rem;
		height: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	form button svg {
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	form button:hover {
		background: rgb(91, 159, 255);
	}

	h1 {
		text-align: center;
		font-size: 3rem;
	}

	.above,
	.center {
		position: absolute; /* absolute means that the element is positioned relative to its first positioned ancestor */
		transform: translateY(-50%); /* translateY() moves the element up by 50% of its height */
		pointer-events: none; /* makes the element unselectable */
		color: white;
		border-radius: 0.5rem;
		border: 1px solid transparent;
		padding: 0 0.5rem;
		font-size: 0.75rem;
	}

	.above {
		top: 0;
		left: 0.5rem;
		background: rgb(6, 6, 78);
	}

	form label:focus-within .above {
		background: rgb(91, 159, 255);
	} /* space means that all the descendants of the element will be affected, in this case, when the form label is focused, .above will be affected */

	.center {
		top: 50%;
		left: 0.5rem;
		opacity: 0;
	}

	.error {
		color: rgb(241, 114, 68);
		font-size: 0.8rem;
		text-align: center;
	}

	.options {
		padding: 1rem 0;
		width: 350px;
		max-width: 100%;
		margin: 0 auto;
		padding: 1rem;
		font-size: 0.8rem;
	}

	.options div {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin: 0.5rem;
	}

	.options div button {
		cursor: pointer;
		color: rgb(91, 159, 255);
		background: none;
		border: none;
		font-weight: bold;
	}

	.divider {
		display: flex;
		align-items: center; /* Vertically center text and lines */
		text-align: center; /* Horizontally center text */
		gap: 0.5rem;
	}

	.divider::before,
	.divider::after {
		content: '';
		height: 1px;
		background-color: white; /* Color of the divider line */
		flex-grow: 1; /* Both lines will expand to occupy available space */
	}
</style>

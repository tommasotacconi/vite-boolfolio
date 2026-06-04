<script>
	import AppHeader from './components/AppHeader.vue';
	import AppFooter from './components/AppFooter.vue';
	import { RouterView } from 'vue-router';

	export default {
		data() {
			return {

			}
		},
		components: {
			AppHeader,
			AppFooter
		},
	}
</script>

<template>
	<!-- Immediately visible content -->
	<div class="page">
		<header>
			<AppHeader id="header" />
		</header>
		<div class="container mb-4">
			<main id="main-view">
				<RouterView />
			</main>
		</div>
	</div>

	<!-- Not shown immediately -->
	<AppFooter id="footer" />
</template>

<style lang="scss">
	main {
		flex: 1;
	}

	.page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.logo {
		height: 6em;
		padding: 1.5em;
		will-change: filter;
		transition: filter 300ms;
	}

	.logo:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}

	.logo.vue:hover {
		filter: drop-shadow(0 0 2em #42b883aa);
	}
</style>
<!-- final commit -->

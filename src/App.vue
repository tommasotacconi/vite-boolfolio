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
	<!-- Header -->
	<AppHeader />

	<!-- Dinamic content with Router-link	 -->
	<RouterView id="router-view"/>

	<!-- Footer -->
	<AppFooter />
</template>

<style lang="scss">
@use 'bootstrap/scss/bootstrap.scss' as *;

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

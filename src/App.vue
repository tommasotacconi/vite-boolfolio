<script>
import AppMain from './components/AppMain.vue';

export default {
	data() {
		return {

		}
	},
	components: {
		AppMain,
	},
}
</script>

<template>
	<AppMain />

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

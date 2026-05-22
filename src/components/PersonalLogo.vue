<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<template>
	<div class="personal-logo text-center">
		<img src="../assets/images/TT-2.jpg" class="rounded-circle my-3 p-1" alt="personal image">
		<h2>Tommaso Tacconi</h2>
		<h3>Sviluppatore full stack</h3>
	</div>
</template>

<style scoped>
	h3 {
		font-weight: 400;
	}

	/* Utility */
	.personal-logo {
		padding: 30px;

		img {
			display: block;
			max-width: 100%;
			width: 150px;
			margin: 0 auto;
			outline: 3px solid darkorange;
		}
	}

	.fa-brands {
		font-size: 2rem;
	}
</style>
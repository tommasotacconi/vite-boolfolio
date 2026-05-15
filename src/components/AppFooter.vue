<script>
	export default {
		data() {
			return {
				year: new Date().getFullYear()
			}
		}
	}
</script>

<template>
	<footer>
		<p class="p-1">Copyright &#169; {{ year }} Tommaso Tacconi.</p>
	</footer>
</template>

<style lang="scss" scoped>
	footer {
		height: 400px;
		background-color: rgb(0, 45, 167);

		color: #fff;
	}

</style>
<script>
	import SiteLogo from './SiteLogo.vue';

	export default {
		data() {
			return {
				year: new Date().getFullYear()
			}
		},
		components: {
			SiteLogo
		}
	}
</script>

<template>
	<footer>
		<div class="footer-signature">
			<div class="footer-signature__brand">
				<span class="footer-signature__name">Tommaso Tacconi</span>
				<SiteLogo class="footer-signature__logo" :animated="false" />
			</div>

			<small class="footer-signature__copyright">&#169; {{ year }}. All rights reserved.</small>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
	@use '../style/variables/palette' as pall;

	footer {
		height: 400px;
		background-color: rgb(0, 45, 167);
		color: #fff;
		background-color: pall.$primary;
		border-top: 3px solid pall.$secondary;

		display: flex;
		justify-content: center;
		align-items: flex-end;
		padding-bottom: 2rem;
	}

	.footer-signature {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		gap: .35rem;
	}

	.footer-signature__brand {
		display: inline-flex;
		align-items: center;
		gap: .5rem;
	}

	.footer-signature__logo {
		width: 28px;
		height: 28px;
		flex: 0 0 auto;
	}
</style>

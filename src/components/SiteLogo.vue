<script>
	const siteLogoPaths = {
		mark: {
			left: 'M22 46 L50 46 L50 74',
			right: 'M98 46 L70 46 L70 74'
		},
		code: {
			left: 'M35.8 40.2 L16 60 L35.8 79.8',
			right: 'M84.2 40.2 L104 60 L84.2 79.8'
		}
	};

	export default {
		props: {
			animated: {
				type: Boolean,
				default: true
			}
		},
		data() {
			const mode = this.animated && this.$route.name === 'projects' ? 'code' : 'mark';

			return {
				logoAnimationKey: 0,
				logoAnimationTimer: null,
				logoDirection: 'idle',
				logoMode: mode,
				logoTargetMode: mode
			};
		},
		computed: {
			logoLeftPath() {
				return siteLogoPaths[this.logoMode].left;
			},
			logoRightPath() {
				return siteLogoPaths[this.logoMode].right;
			},
			logoLeftAnimation() {
				return this.getLogoAnimationValues('left');
			},
			logoRightAnimation() {
				return this.getLogoAnimationValues('right');
			}
		},
		watch: {
			'$route.name'(routeName) {
				if (!this.animated) return;

				const nextMode = routeName === 'projects' ? 'code' : 'mark';

				if (nextMode === this.logoTargetMode) return;

				window.clearTimeout(this.logoAnimationTimer);
				this.logoDirection = nextMode === 'code' ? 'to-code' : 'to-mark';
				this.logoTargetMode = nextMode;
				this.logoAnimationKey += 1;

				this.$nextTick(() => {
					this.$refs.logoLeftAnimation?.beginElement();
					this.$refs.logoRightAnimation?.beginElement();
				});

				this.logoAnimationTimer = window.setTimeout(() => {
					this.logoMode = this.logoTargetMode;
					this.logoDirection = 'idle';
					this.logoAnimationTimer = null;
				}, 1750);
			}
		},
		beforeUnmount() {
			window.clearTimeout(this.logoAnimationTimer);
		},
		methods: {
			getLogoAnimationValues(side) {
				const from = siteLogoPaths[this.logoDirection === 'to-code' ? 'mark' : 'code'][side];
				const to = siteLogoPaths[this.logoDirection === 'to-code' ? 'code' : 'mark'][side];

				return `${from}; ${from}; ${to}; ${to}`;
			}
		}
	};
</script>

<template>
	<svg :class="['site-logo', `site-logo--${logoMode}`, `site-logo--${logoDirection}`]" viewBox="0 0 120 120" role="img"
		aria-hidden="true">
		<defs>
			<linearGradient id="site-logo-gradient" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
				<stop class="site-logo__gradient-start" offset="0%" stop-color="#2dd4bf" />
				<stop class="site-logo__gradient-end" offset="100%" stop-color="#693ff0" />
			</linearGradient>

			<filter id="site-logo-glow" x="-30%" y="-30%" width="160%" height="160%">
				<feGaussianBlur stdDeviation="2.5" result="blur" />
				<feMerge>
					<feMergeNode in="blur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>

		<path class="site-logo__stroke site-logo__bracket" :d="logoLeftPath">
			<animate v-if="logoDirection !== 'idle'" ref="logoLeftAnimation" :key="`left-${logoAnimationKey}`"
				attributeName="d" begin="indefinite" dur="1.45s" fill="freeze" calcMode="linear" keyTimes="0; .38; .7; 1"
				:values="logoLeftAnimation" />
		</path>

		<path class="site-logo__stroke site-logo__bracket" :d="logoRightPath">
			<animate v-if="logoDirection !== 'idle'" ref="logoRightAnimation" :key="`right-${logoAnimationKey}`"
				attributeName="d" begin="indefinite" dur="1.45s" fill="freeze" calcMode="linear" keyTimes="0; .38; .7; 1"
				:values="logoRightAnimation" />
		</path>

		<path class="site-logo__stroke site-logo__slash" d="M60 29 V91" />
	</svg>
</template>

<style lang="scss" scoped>
	@use '../style/variables/palette' as pall;

	.site-logo {
		display: block;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.site-logo__stroke {
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
		filter: url(#site-logo-glow);
	}

	.site-logo__bracket {
		stroke: url(#site-logo-gradient);
		stroke-width: 8;
	}

	.site-logo__slash {
		stroke: pall.$secondary;
		stroke-width: 4;
		filter: drop-shadow(0 0 5px rgba(pall.$secondary, .35));
		transform-box: fill-box;
		transform-origin: center;
	}

	.site-logo--mark {
		.site-logo__gradient-start {
			stop-color: pall.$frontend;
		}

		.site-logo__gradient-end {
			stop-color: #693ff0;
		}

		.site-logo__slash {
			transform: translateY(0) rotate(0deg) scaleY(1);
			filter: drop-shadow(0 0 4px rgba(pall.$secondary, .24));
		}
	}

	.site-logo--code {
		.site-logo__gradient-start {
			stop-color: pall.$accent-blue;
		}

		.site-logo__gradient-end {
			stop-color: #a855f7;
		}

		.site-logo__slash {
			transform: rotate(17deg) scaleY(1.08);
			filter: drop-shadow(0 0 6px rgba(pall.$secondary, .38));
		}
	}

	.site-logo--to-code {
		.site-logo__gradient-start {
			animation: site-logo-gradient-start-to-code 1.45s linear forwards;
		}

		.site-logo__gradient-end {
			animation: site-logo-gradient-end-to-code 1.45s linear forwards;
		}

		.site-logo__slash {
			animation: site-logo-slash-to-code 1.75s ease-in-out forwards;
		}
	}

	.site-logo--to-mark {
		.site-logo__gradient-start {
			animation: site-logo-gradient-start-to-mark 1.45s linear forwards;
		}

		.site-logo__gradient-end {
			animation: site-logo-gradient-end-to-mark 1.45s linear forwards;
		}

		.site-logo__slash {
			animation: site-logo-slash-to-mark 1.75s ease-in-out forwards;
		}
	}

	@keyframes site-logo-gradient-start-to-code {
		from {
			stop-color: pall.$frontend;
		}

		to {
			stop-color: pall.$accent-blue;
		}
	}

	@keyframes site-logo-gradient-end-to-code {
		from {
			stop-color: #693ff0;
		}

		to {
			stop-color: #a855f7;
		}
	}

	@keyframes site-logo-gradient-start-to-mark {
		from {
			stop-color: pall.$accent-blue;
		}

		to {
			stop-color: pall.$frontend;
		}
	}

	@keyframes site-logo-gradient-end-to-mark {
		from {
			stop-color: #a855f7;
		}

		to {
			stop-color: #693ff0;
		}
	}

	@keyframes site-logo-slash-to-code {

		0%,
		35% {
			transform: translateY(0) rotate(0deg) scaleY(1);
			filter: drop-shadow(0 0 4px rgba(pall.$secondary, .24));
		}

		72% {
			transform: rotate(17deg) scaleY(1.08);
			filter: drop-shadow(0 0 9px rgba(pall.$secondary, .55));
		}

		100% {
			transform: rotate(17deg) scaleY(1.08);
			filter: drop-shadow(0 0 6px rgba(pall.$secondary, .38));
		}
	}

	@keyframes site-logo-slash-to-mark {

		0%,
		28% {
			transform: rotate(17deg) scaleY(1.08);
			filter: drop-shadow(0 0 6px rgba(pall.$secondary, .38));
		}

		65%,
		100% {
			transform: translateY(0) rotate(0deg) scaleY(1);
			filter: drop-shadow(0 0 4px rgba(pall.$secondary, .24));
		}
	}
</style>

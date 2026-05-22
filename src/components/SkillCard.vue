<script>
	import '@fortawesome/fontawesome-free/css/all.min.css'

	export default {
		data() {
			return {
				show: false
			}
		},
		props: {
			skill: {
				type: String,
				required: true,
			},
			faIcon: {
				type: String,
				required: true
			},
			picked: {
				type: Boolean,
				required: true
			}
		}

	}
</script>

<template>
	<div :class="['skill-card', 'z-1', { picked }]">
		<i
			:class="[{ 'fa-brands': !['database'].includes(faIcon) }, `fa-${faIcon}`, { 'fa-solid': faIcon?.includes('data') }]"></i>
		<span v-if="false" :style="{ opacity: show ? 1 : 0 }">{{ skill }}</span>
	</div>
</template>

<style lang="scss">
	@use '../style/variables/palette' as pall;
	@use '../style/variables/transformation' as tran;

	@function trans($gaps-num, $percent-x: -50%, $percent-y: -50%, $offset-x: 0px, $offset-y: 0px, $gap-x: -15px) {
		@return calc($percent-x + $offset-x) calc($percent-y + $offset-y) calc(-1 * $gap-x * $gaps-num);
	}

	.skill-card {
		position: absolute;
		left: 50%;
		top: 50%;
		flex-basis: max-content;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: .65rem;
		// transform: tran.$rot-3d;
		padding: 0.875rem .5rem;
		$card-width: 40px;
		min-width: $card-width;

		border: 1px solid pall.$border-soft;
		border-radius: .5rem;

		background: pall.$card-gradient;

		box-shadow:
			pall.$shadow-primary,
			pall.$shadow-soft;

		backdrop-filter: blur(10px);

		cursor: default;
		overflow: hidden;

		transition:
			translate .6s ease,
			transform .6s ease,
			box-shadow .25s ease,
			border-color .25s ease;


		// pick offsets
		$of-x: 0px;
		$of-y: 100px;

		@for $i from 0 to 11 {
			&:nth-of-type(#{$i + 1}) {
				translate: trans($i);

				&.picked {
					translate: trans($i, $offset-y: $of-y);
				}
			}
		}

		&::before {
			content: '';

			position: absolute;
			inset: 0;

			background: pall.$overlay-primary;

			opacity: 0;
			transition: opacity .25s ease;
		}

		&.picked {
			border-color: pall.$border-hover;

			box-shadow:
				pall.$shadow-hover,
				pall.$shadow-hover-soft;

			&::before {
				opacity: 1;
			}

			i {
				transform: scale(1.08);
				color: pall.$secondary;
			}
		}

		i,
		span {
			position: relative;
			pointer-events: none;
		}

		i {
			font-size: 2rem;

			color: pall.$primary;

			transition:
				transform .25s ease,
				color .25s ease;
		}

		span {
			font-size: .92rem;
			font-weight: 500;
			letter-spacing: .02em;

			color: pall.$text-main;
			transition: opacity 0.4s;

			text-align: center;
		}
	}
</style>
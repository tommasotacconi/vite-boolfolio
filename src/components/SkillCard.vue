<script>
	import '@fortawesome/fontawesome-free/css/all.min.css'

	export default {
		data() {
			return {
				show: false
			}
		},
		computed: {
			style() {
				const stackedStyle = { '--stack-z': `${this.index * 15}px` };
				const expandedStyle = {
					'--i': this.index,
					'--stack-x': `${this.index * -15}px`,
					'--grid-x': `${this.index * 80}px`,
					...stackedStyle
				};

				return !this.expanded ? stackedStyle : expandedStyle;
			}
		},
		props: {
			skill: {
				type: String,
				required: true,
			},
			index: {
				type: Number,
				required: true
			},
			faIcon: {
				type: String,
				required: true
			},
			picked: {
				type: Boolean,
				required: true
			},
			expanded: {
				type: Boolean,
				required: true
			}
		}

	}
</script>

<template>
	<div :class="['skill-card', 'z-1', { picked, expanded }]" :style>
		<div class="skill-card__shell">
			<i
				:class="[{ 'fa-brands': !['database'].includes(faIcon) }, `fa-${faIcon}`, { 'fa-solid': faIcon?.includes('data') }]"></i>
			<span v-if="false" :style="{ opacity: show ? 1 : 0 }">{{ skill }}</span>
		</div>
	</div>
</template>

<style lang="scss">
	@use '../style/variables/palette' as pall;
	@use '../style/variables/transformation' as tran;

	$card-width: 40px;
	$pick-offset-y: 100px;
	// transform .8s ease-out;
	$pick-transition: transform .3s ease;
	$face-tilt-transition: rotate .25s .4s;
	$face-transition: transform 5s ease,
		rotate .25s ease,
		box-shadow .25s ease,
		border-color .25s ease;
	$icon-transition: transform .25s ease,
		color .25s ease;
	$overlay-transition: opacity .25s ease;
	// Card movements relative to stack initial stack position
	$movement-vars: --card-x --card-y --card-z;

	@each $name, $_ in $movement-vars {
		@property #{$name} {
			syntax: "<length>";
			inherits: false;
			initial-value: 0px;
		}
	}


	@mixin stack-transition($is-expanding: false, $lateral-expan-time: .4s, $z-move-time: .25s) {
		$in-plane-delay: if(sass($is-expanding): 0s; else: $z-move-time);
		$z-delay: if(sass($is-expanding): $lateral-expan-time; else: 0s);
		$transitions: (
		);

	@each $var in $movement-vars {
		// transition shorthand without property name
		$in-plane: $lateral-expan-time ease $in-plane-delay;
		$along-z: $z-move-time ease $z-delay;
		$transitions: append($transitions, $var if(sass($var !='--card-z'): $in-plane; else: $along-z), comma);
	}

	transition: $transitions;
}

@function centered-translation($offset-x: 0px, $offset-y: 0px, $percent-x: -50%, $percent-y: -50%) {
	@return calc($percent-x + $offset-x), calc($percent-y + $offset-y);
}


.skill-card {
	// Card's offsets relative to parent center
	--card-x: 0px;
	--card-y: 0px;
	// Card's displacement from parent plane
	--card-z: var(--stack-z);
	@include stack-transition;

	position: absolute;
	left: 50%;
	top: 50%;
	flex-basis: max-content;
	transform: translate(centered-translation(var(--card-x), var(--card-y))) translateZ(var(--card-z));
	transform-style: preserve-3d;

	.skill-card__shell {
		padding: 0.875rem .5rem;
		min-width: $card-width;
		border: 1px solid pall.$border-soft;
		border-radius: .5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: .65rem;
		cursor: default;
		overflow: hidden;

		background: pall.$card-gradient;
		box-shadow:
			pall.$shadow-primary,
			pall.$shadow-soft;
		backdrop-filter: blur(10px);

		transition: $face-transition;
	}

	&::before {
		content: '';

		position: absolute;
		inset: 0;

		background: pall.$overlay-primary;

		opacity: 0;
		transition: $overlay-transition;
	}

	&.picked {
		--card-y: #{$pick-offset-y};

		transition: $pick-transition;

		.skill-card__shell {
			transition: $face-tilt-transition;
			rotate: tran.$rot-3d-inverse;
			border-color: pall.$border-hover;

			box-shadow:
				pall.$shadow-hover,
				pall.$shadow-hover-soft;
		}

		&::before {
			opacity: 1;
		}

		i {
			transform: scale(1.2);
			color: pall.$secondary;
		}
	}

	&.expanded {
		--card-x: var(--grid-x);
		--card-y: var(--grid-y, 0px);
		--card-z: 0px;

		@include stack-transition($is-expanding: true);

		&.picked {
			--card-z: 50px;
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

		transition: $icon-transition;
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

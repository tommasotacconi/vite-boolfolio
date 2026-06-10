<script>
	export default {
		data() {
			return {
				skillAnimations: new Map(),
				skillTimeouts: new Map()
			}
		},
		props: {
			keypath: String,
			text: String,
			skillsMap: Object
		},
		emits: ['skill-enter', 'skill-leave'],
		computed: {
			placeholders() {
				return [...this.text.matchAll(/{(.*?)}/g)].map(match => match[1]);
			}
		},
		methods: {
			getSkillLabel(ph) {
				return this.skillsMap[ph]?.label ?? ph;
			},
			getSkillStyle(ph) {
				return {
					'--glow-color': `var(--skill-glow-${ph}, var(--skill-color-${ph}, var(--skill-color-default)))`
				};
			},
			runSkillGlow(ph, span) {
				const labelLength = span.textContent.trim().length;
				const speed = 8;
				const pause = 1500;
				const travelMs = labelLength / speed * 1000;

				const animation = span.animate(
					[
						{ backgroundPosition: '120% 0' },
						{ backgroundPosition: '-75% 0' }
					],
					{
						duration: travelMs,
						easing: 'linear',
						fill: 'forwards'
					}
				)

				this.skillAnimations.set(ph, animation);

				animation.finished.then(() => {
					this.skillAnimations.delete(ph);

					const timeout = window.setTimeout(() => {
						this.skillTimeouts.delete(ph);
						this.runSkillGlow(ph, span);
					}, pause);

					this.skillTimeouts.set(ph, timeout);
				}).catch(() => { });
			},
			startSkillGlow(ph) {
				const span = this.$refs[ph];

				if (!span || this.skillAnimations.has(ph)) return;

				this.runSkillGlow(ph, span)
			},
			stopSkillGlow(ph) {
				const animation = this.skillAnimations.get(ph);
				const timeout = this.skillTimeouts.get(ph);

				animation?.cancel();
				window.clearTimeout(timeout);

				this.skillAnimations.delete(ph);
				this.skillTimeouts.delete(ph);

				const span = this.$refs[ph];
				span?.style.removeProperty('background-position');
			}
		},
		mounted() {
			const skillSpans = this.$refs;
			[...Object.values(skillSpans)].forEach((span) => {
				span.style.setProperty('--placeholder-length', span.textContent.length);
			})
		},
		beforeUnmount() {
			this.skillAnimations.forEach(animation => animation.cancel());
			this.skillTimeouts.forEach(timeout => window.clearTimeout(timeout));
		}

	}
</script>

<template>
	<i18n-t :keypath="keypath" tag="p">
		<template v-for="ph in placeholders" :key="ph" #[ph]>
			<span :ref="ph" class="skill" :style="getSkillStyle(ph)"
				@mouseenter="startSkillGlow(ph); $emit('skill-enter', ph)"
				@mouseleave="stopSkillGlow(ph); $emit('skill-leave')">
				{{ getSkillLabel(ph) }}
			</span>
		</template>
	</i18n-t>
</template>

<style lang="scss">
	@use '../style/variables/palette' as pall;

	:root {
		// Shimmer animation options
		--speed: 3.5; // letters per sec
		--bg-spread: 1.5;
		--bg-angle: 115;
		--main-offset: calc(var(--bg-spread, 6) * 0.5ch);
		--secondary-offset: 0.5ch;
		--angle: calc(var(--bg-angle) * 1deg);

		@each $skill, $color in pall.$tech-logo-colors {
			--skill-color-#{$skill}: #{$color};
		}
	}

	.skill {
		$classic-effect: linear-gradient(var(--angle),
				transparent calc(35% - var(--main-offset) - var(--secondary-offset)),
				var(--glow-color) calc(35% - var(--main-offset)),
				var(--glow-color),
				var(--glow-color) calc(35% + var(--main-offset)),
				transparent calc(35% + var(--main-offset) + var(--secondary-offset)));

		--word-color: color-mix(in srgb, canvas 18%, canvasText 84%);
		--glow-color-visible: color-mix(in srgb, var(--glow-color), white 24%);
		--duration: calc((var(--placeholder-length, 10) / var(--speed)) * 1s);
		--bg: #{$classic-effect} 120% 0 / 200% 100% no-repeat border-box,
		linear-gradient(var(--word-color), var(--word-color)) padding-box;

		margin: 0;
		border: 2px solid #0000;
		white-space: nowrap;
		line-height: 1.2;
		outline-offset: 0.1em;
		background: var(--bg);
		outline-color: hsl(280 90% 60% / 0.5);
		font-weight: 500;
		background-clip: text;
		color: transparent;
		display: inline-block;
		align-self: start;
		position: relative;

		&:hover {
			animation: shimmer var(--duration) infinite both ease-in-out;
		}
	}

	.skill.inspect-bg {
		background-clip: padding-box;
		color: currentColor;
	}

	@keyframes shimmer {
		0% {
			background-position: 120% 0;
			// left: -140%;
		}

		40%,
		100% {
			background-position: -75% 0;
			// left: 110%;
		}
	}

</style>

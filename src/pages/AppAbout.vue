<script>
	import PersonalLogo from '../components/PersonalLogo.vue';
	import SkillCard from '../components/SkillCard.vue';

	function capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
	const plhol = '<service>'
	const mesService = `http://${plhol}.me`;
	const contacts = {
		'envelope-at': {
			hrefBase: 'mailto:',
			address: 'tommaso.tacconi@gmail.com'
		},
		whatsapp: {
			hrefBase: mesService.replace(plhol, 'wa'),
			address: '331 5378794'
		},
		telegram: {
			hrefBase: mesService.replace(plhol, 't'),
			address: 'Tom_T218'
		},
	}

	const skills = [
		['html', , 'html5'],
		['css', , 'css3'],
		['js', 'Javascript'],
		['bootstrap'],
		['sass'],
		['vue', 'Vue.js', 'vuejs',],
		['react', 'React.js'],
		['node', 'Node.js'],
		['php'],
		['laravel'],
		['sql', , 'database'],
		['postgresql']
	];

	const skillsMap = Object.fromEntries(skills.map(([key, label = capitalize(key), faIcon = key]) =>
		[key, { label, faIcon }]
	));

	export default {
		data() {
			return {
				contacts,
				skillsGroup: {
					frontend: [
						'html',
						'css',
						'js',
						'sass',
						'bootstrap',
						'vue',
						'react'
					],
					backend: {
						application: [
							'node',
							'php',
							'laravel'
						],
						data: [
							'sql',
							'postgresql'
						]
					},
				},
				skillsMap,
				hoveredSkill: null,
			};
		},
		methods: {
			getFaIcon(item) {
				const associations = {
					frontend: 'computer',
					backend: 'server',
					application: 'code',
					data: 'database'
				}

				return associations[item];
			}
		},
		components: {
			PersonalLogo,
			SkillCard
		},
		computed: {
			aboutTxtTemplate() {
				return this.$i18n.getLocaleMessage(this.$i18n.locale).about.skills.text;
			},
			placeholders() {
				return [...this.aboutTxtTemplate.matchAll(/{(.*?)}/g)].map(match => match[1]);
			},
			hoveredCtx() {

			}
		}
	}
</script>

<template>
	<h1>{{ $t('about.title') }}</h1>
	<PersonalLogo />

	<section>
		<h4 class="mt-2 py-1">{{ $t('about.skills.title') }}</h4>

		<div class="section-contents d-flex">
			<div class="section-text">
				<!-- <p v-html="integratedSkillsText"></p> -->
				<i18n-t keypath="about.skills.text" tag="p">
					<template v-for="plhol in placeholders" :key="plhol" #[plhol]>
						<span :class="['skill']" @mouseenter="hoveredSkill = plhol" @mouseleave="hoveredSkill = null">{{
							skillsMap[plhol].label }}</span>
					</template>
				</i18n-t>
			</div>
			<div class="section-illustration d-md-flex flex-wrap">
				<div :class="['skill-context', ctx]" v-for="(stackOrSubctx, ctx) in skillsGroup">
					<h3><i :class="['fa-solid', 'fa-' + getFaIcon(ctx)]"></i></h3>
					<template v-if="Array.isArray(stackOrSubctx)">
						<SkillCard v-for="plhol in stackOrSubctx" :key="plhol" :skill="skillsMap[plhol].label"
							:faIcon="skillsMap[plhol].faIcon" :picked="hoveredSkill === plhol" />
					</template>
					<template v-else>
						<div :class="['skill-subcontext', subCtx]" v-for="(stack, subCtx) in stackOrSubctx">
							<h3><i :class="['fa-solid', 'fa-' + getFaIcon(subCtx)]"></i></h3>
							<SkillCard v-for="plhol in stack" :key="plhol" :skill="skillsMap[plhol].label"
								:faIcon="skillsMap[plhol].faIcon" :picked="hoveredSkill === plhol" />
						</div>
					</template>
				</div>
			</div>
		</div>
	</section>
	<section>
		<h4 class="mt-2 py-1">{{ $t('about.personalPath.title') }}</h4>

		<i18n-t keypath="about.personalPath.text" tag="p">
			<a href="../../public/cv/cv_Tommaso_Tacconi.pdf" target="_blank">{{
				$t('about.personalPath.linkWord')
			}}</a>.
		</i18n-t>
	</section>
	<section>
		<h4 class="mt-2 py-1">{{ $t('about.contacts.title') }}</h4>

		<ul>
			<li v-for="[service, { hrefBase, address }] of Object.entries(contacts)">
				<a :href="hrefBase + address" target="_blank" rel="noopener noreferrer">
					<i :class="['bi', 'bi-' + service]"></i><span class="item-text">{{ address }}</span>
				</a>
			</li>
		</ul>
	</section>

</template>

<style lang="scss">
	@use '../style/general.scss' as gen;
	@use '../style/variables/dimensions' as *;
	@use '../style/variables/palette' as pall;
	@use '../style/variables/transformation' as tran;

	section {
		margin: 1rem 0;
		min-height: 220px;
	}

	h1 {
		text-align: center;
		color: lightsteelblue
	}

	h4 {
		font-size: 1.25rem;
	}

	li {
		list-style-type: none;

		a {
			text-decoration: none;
			color: #000;

			@each $icon-name, $color in (envelope-at gen.$link-color,
				whatsapp gen.$wa-color,
				telegram gen.$teleg-color) {
				&:hover:has(.bi-#{$icon-name}) .bi {
					color: $color;
				}
			}
		}

		i {
			margin-right: 10px;
		}
	}

	// Utility
	.section-contents {
		min-height: inherit;
	}

	.section-text {
		width: auto;
		flex: 1 1 50%;
	}

	.section-illustration {
		flex: 0 0 50%;
	}


	.skill {
		color: pall.$secondary;
	}

	.skill-context,
	.skill-subcontext {
		perspective: 3500px;
		transform-style: preserve-3d;
	}


	.skill-context {
		padding: 0 $px;
		margin: 0 auto;
		display: flex;
		align-items: center;

		position: relative;
		column-gap: 10px;
		transform: tran.$rot-3d;

		h3 {
			padding-left: 10px;
			aspect-ratio: 5 / 4;
			border: 2px solid pall.$border-soft;
			border-radius: $br;

			display: flex;
			align-items: end;

			font-size: 1.2rem;
			vertical-align: bottom;

			transition: border-width 0.2s, border-color 0.5s;

			&:hover,
			&.hovered {
				border-width: 5px;
			}
		}

		&.frontend>h3 {
			width: $card-lg;
			color: pall.$secondary;

			&:hover,
			&.hovered {
				border-color: currentColor;
			}
		}

		&.backend>h3 {
			width: $card-xxl;
			color: pall.$primary;

			&:hover {
				border-color: currentColor;
			}
		}

		.skill-subcontext {
			$y-of: 25%;
			$x-of: 3%;

			width: calc(50% - ($x-of * 2 + $px));

			position: absolute;
			top: $y-of;
			bottom: $y-of;

			&.application {
				left: calc($px + $x-of);
				color: mix(pall.$secondary, pall.$primary, 40%);
			}

			&.data {
				right: calc($px + $x-of);
				color: pall.$accent-blue;

			}

			& h3 {
				width: 100%;
				height: 100%;
				border: 2px solid pall.$border-soft;
				border-radius: $br;

				&:hover {}
			}
		}
	}
</style>
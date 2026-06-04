<script>
	import AppStack from '../components/AppStack.vue';
	import PersonalLogo from '../components/PersonalLogo.vue';
	import SkillText from '../components/SkillText.vue';
	import skillsMap from '../js/skillsMap.js';

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

	export default {
		data() {
			return {
				contacts,
				hoveredSkill: null,
				expandedContext: '',
				skillsMap
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
			},
			handleShowCtx(ctx) {
				this.expandedContext = this.expandedContext === ctx ? null : ctx;
			},
			getPlaceholders(text) {
				return [...text.matchAll(/{(.*?)}/g)].map(match => match[1]);
			},
			getPhPerSection(sections) {
				const result = {};

				for (const [secName, contents] of Object.entries(sections)) {
					if (secName === 'title') continue;

					if (contents.text) result[secName] = this.getPlaceholders(contents.text);
					else result[secName] = this.getPhPerSection(contents);
				}

				return result;
			},
			getChildSections(section) {
				return Object.fromEntries(
					Object.entries(section).filter(([key]) => !['title', 'text'].includes(key))
				);
			},
		},
		components: {
			PersonalLogo,
			AppStack,
			SkillText
		},
		computed: {
			msgSkillsSections() {
				return this.$i18n.getLocaleMessage(this.$i18n.locale).about.skills.sections;
			},
			// Placeholders per sections
			phPerSec() {
				return this.getPhPerSection(this.msgSkillsSections);
			}
		}
	}
</script>

<template>
	<h1>{{ $t('about.title') }}</h1>
	<PersonalLogo />

	<section>
		<h2 class="mt-2 py-1">{{ $t('about.skills.title') }}</h2>

		<div class="section-contents d-flex">
			<div class="section-text">
				<section v-for="(section, ctx) in msgSkillsSections" :key="ctx" :class="[ctx + '-section']">
					<h3>
						{{ section.title }}
						<button :class="['btn', 'btn-info', 'skill-toggle', { active: expandedContext === ctx }]"
							@click="handleShowCtx(ctx)"><i :class="['fa-solid', `fa-${getFaIcon(ctx)}`]"></i></button>
					</h3>
					<SkillText v-if="section.text" :keypath="`about.skills.sections.${ctx}.text`" :text="section.text"
						:skills-map="skillsMap" @skill-enter="hoveredSkill = $event" @skill-leave="hoveredSkill = null" />
					<section v-else v-for="(subSection, subCtx) in getChildSections(section)" :key="subCtx"
						:class="['skill-text-subsection']">
						<span :class="['skill-text-label', subCtx + '-subctx']">{{ subSection.title }}</span>
						<SkillText :keypath="`about.skills.sections.${ctx}.${subCtx}.text`" :text="subSection.text"
							:skills-map="skillsMap" @skill-enter="hoveredSkill = $event" @skill-leave="hoveredSkill = null" />
					</section>
				</section>
			</div>

			<div class="section-illustration d-md-flex flex-wrap">
				<div :class="['skill-context', ctx]" v-for="(stackOrSubctx, ctx) in getPhPerSection(msgSkillsSections)">
					<h3 :class="{ hovered: expandedContext === ctx }"><i :class="['fa-solid', 'fa-' + getFaIcon(ctx)]"></i></h3>
					<template v-if="Array.isArray(stackOrSubctx)">
						<AppStack :stack="stackOrSubctx" :pickedCard="hoveredSkill" :expanded="expandedContext === ctx" />
					</template>
					<template v-else>
						<div :class="['skill-subcontext', subCtx]" v-for="(stack, subCtx) in stackOrSubctx">
							<h3><i :class="['fa-solid', 'fa-' + getFaIcon(subCtx)]"></i></h3>
							<AppStack :stack :pickedCard="hoveredSkill" :expanded="expandedContext === ctx"
								:gridOptions="{ cols: 2 }" />
						</div>
					</template>
				</div>
			</div>
		</div>
	</section>
	<section>
		<h2 class="mt-2 py-1">{{ $t('about.personalPath.title') }}</h2>

		<i18n-t keypath="about.personalPath.text" tag="p">
			<a href="../../public/cv/cv_Tommaso_Tacconi.pdf" target="_blank">{{
				$t('about.personalPath.linkWord')
			}}</a>.
		</i18n-t>
	</section>
	<section>
		<h2 class="mt-2 py-1">{{ $t('about.contacts.title') }}</h2>

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
	}

	h1 {
		text-align: center;
		color: lightsteelblue
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

	%frontend-ctx {
		color: pall.$frontend;
	}

	%backend-ctx {
		color: pall.$backend;
	}

	%app-subctx {
		color: pall.$application;
	}

	%data-subctx {
		color: pall.$data;
	}

	.section-text {
		width: auto;
		flex: 1 1 50%;

		.frontend-section h3 {
			@extend %frontend-ctx;
		}

		.backend-section h3 {
			@extend %backend-ctx;
		}

		.skill-toggle {
			border: 0;
			color: pall.$text-main;
			background: pall.$card-gradient;
			box-shadow: pall.$shadow-soft;
		}

		.skill-toggle.active {
			box-shadow:
				inset 0 0 0 2px pall.$border-hover,
				pall.$shadow-hover-soft;
		}

		.skill-text-label {
			display: inline-flex;
			margin-bottom: 0.35rem;
			font-size: 0.75rem;
			font-weight: 700;
			letter-spacing: 0.06em;
			text-transform: uppercase;
			color: pall.$data;

			&.application-subctx {
				@extend %app-subctx;
			}

			&.data-subctx {
				@extend %data-subctx;
			}
		}
	}

	.section-illustration {
		flex: 0 0 50%;
	}


	.skill {
		color: pall.$text-soft;
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
		rotate: tran.$rot-3d;

		h3 {
			--shadow-width: 2px;
			--shadow-color: #{pall.$border-soft};

			padding: {
				left: 10px;
				bottom: 5px;
			}

			aspect-ratio: 5 / 4;
			border-radius: $br;
			display: flex;
			align-items: end;

			font-size: 1.2rem;
			vertical-align: bottom;

			transition: box-shadow 0.5s;
			box-shadow: 0 0 0 var(--shadow-width) var(--shadow-color);
		}

		// Each item: context, width, color, shadow-color
		$skill-contexts: (
			(frontend, $card-lg, pall.$frontend, pall.$frontend),
			(backend, $card-xxl, pall.$backend, pall.$backend)
		);

	@each $ctx, $width, $color, $shadow-color in $skill-contexts {
		&.#{$ctx}>h3 {
			width: $width;
			@extend %#{$ctx}-ctx;

			&:hover,
			&.hovered {
				--shadow-width: 6px;
				--shadow-color: #{$shadow-color};
			}
		}
	}

	.skill-subcontext {
		$x-of: 3%;
		width: calc(50% - ($x-of * 2 + $px));

		position: absolute;

		&.application {
			@extend %app-subctx;
			left: calc($px + $x-of);
		}

		&.data {
			@extend %data-subctx;
			right: calc($px + $x-of);
		}

		& h3 {
			width: 100%;
			height: 100%;
			border: 2px solid pall.$border-soft;
			border-radius: $br;
		}
	}
}
</style>

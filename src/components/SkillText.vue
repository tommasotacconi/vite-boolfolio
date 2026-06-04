<script>
	export default {
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
			}
		}
	}
</script>

<template>
	<i18n-t :keypath="keypath" tag="p">
		<template v-for="ph in placeholders" :key="ph" #[ph]>
			<span class="skill" @mouseenter="$emit('skill-enter', ph)" @mouseleave="$emit('skill-leave')">
				{{ getSkillLabel(ph) }}
			</span>
		</template>
	</i18n-t>
</template>

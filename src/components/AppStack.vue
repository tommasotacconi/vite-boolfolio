<script>
	import SkillCard from './SkillCard.vue';
	import skillsMap from './../js/skillsMap.js';


	export default {
		data() {
			return {
				hoveredSkill: null,
				skillsMap
			}
		},
		methods: {
			getCardStyle(index, skillsNum, gridOpts = {}) {
				const { cols = 3, gapX = 70, gapY = 90 } = gridOpts;

				// Positional indexes
				const row = Math.floor(index / cols);
				const col = index % cols;

				const totalRows = Math.ceil(skillsNum / cols);
				const gridMiddleX = (cols - 1) / 2;
				const gridMiddleY = (totalRows - 1) / 2;

				return {
					'--grid-x': `${(col - gridMiddleX) * gapX}px`,
					'--grid-y': `${(row - gridMiddleY) * gapY}px`
				};
			},
		},
		props: {
			stack: {
				type: Array,
				required: true
			},
			pickedCard: String,
			expanded: Boolean,
			gridOptions: Object

		},
		components: {
			SkillCard
		}
	}
</script>

<template>
	<slot></slot>
	<SkillCard v-for="(plhol, index) in stack" :key="plhol" :skill="skillsMap[plhol].label"
		:faIcon="skillsMap[plhol].faIcon" :picked="pickedCard === plhol" :index :expanded
		:style="getCardStyle(index, stack.length, gridOptions)" />
</template>

<style scoped></style>

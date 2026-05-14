<script>
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
		setup() {
			return { contacts };
		}
	}
</script>

<template>
	<h1>{{ $t('about.title') }}</h1>

	<p>{{ $t('about.cvPar.text') }} <a href="../../public/cv/cv_Tommaso_Tacconi.pdf" target="_blank">{{
		$t('about.cvPar.linkWord') }}.</a>
	</p>

	<h2>{{ $t('about.contacts.title') }}</h2>

	<ul>
		<li v-for="[service, { hrefBase, address }] of Object.entries(contacts)">
			<a :href="hrefBase + address" target="_blank" rel="noopener noreferrer">
				<i :class="['bi', 'bi-' + service]"></i><span class="item-text">{{ address }}</span>
			</a>
		</li>
	</ul>
</template>

<style lang="scss" scoped>
	@use '../style/general.scss' as gen;

	h1 {
		text-align: center;
		color: lightsteelblue
	}

	h2 {
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

</style>
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
		data() {
			return {

			}
		},
		setup() {
			return { contacts };
		}
	}
</script>

<template>
	<h1>Chi sono</h1>

	<p>Trovi il mio cv a questo <a href="../../public/cv/cv_Tommaso_Tacconi.pdf" target="_blank">link.</a>
	</p>

	<h2>Contatti</h2>

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

	@mixin anchor-hover($icon, $color) {
		&:hover:has(.bi-#{$icon}) .bi {
			color: $color;
		}
	}

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

			@include anchor-hover(whatsapp, gen.$wa-color);
			@include anchor-hover(telegram, gen.$teleg-color);
			@include anchor-hover(envelope-at, gen.$link-color);
		}

		i {
			margin-right: 10px;


		}
	}

</style>
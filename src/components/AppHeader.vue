<script>
	export default {
		data() {
			return {

			}
		},
	}
</script>

<template>
	<nav class="navbar navbar-expand-lg bg-body-tertiary">
		<div class="container-fluid">
			<a class="navbar-brand" href="#">Portfolio</a>
			<div class="d-flex order-lg-1">
				<label class="d-inline navbar-text me-1" for="lang-select">language</label>
				<select id="lang-select" class="form-select locale-changer me-4" v-model="$i18n.locale"
					placeholder="choose language">
					<option disabled>Choose language</option>
					<option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">{{ locale }}
					</option>
				</select>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
					aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
			</div>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav">
					<li class="nav-item">
						<router-link :to="{ name: 'home' }" class="nav-link">{{ $t('components.header.nav.links.homepage')
						}}</router-link>
					</li>
					<li class="nav-item">
						<router-link :to="{ name: 'projects' }" class="nav-link">{{ $t('components.header.nav.links.projectsPage')
						}}</router-link>
					</li>
					<li class="nav-item">
						<router-link :to="{ name: 'about' }" class="nav-link">{{ $t('components.header.nav.links.aboutPage')
						}}</router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>

<style lang="scss" scoped>
	@use '../style/variables/palette' as pall;

	.locale-changer {
		width: 70px;
	}

	.navbar-brand {
		color: pall.$primary;
	}

	.nav-link {
		position: relative;
		width: fit-content;
		color: pall.$text-soft;
		transition: color .2s ease;

		&::after {
			content: '';

			position: absolute;
			left: var(--bs-nav-link-padding-x);
			right: var(--bs-nav-link-padding-x);
			bottom: .25rem;

			height: 2px;

			background-color: pall.$secondary;

			transform: scaleX(0);
			transform-origin: left;
		}

		&:hover,
		&:focus {
			color: pall.$primary;
		}

		&.router-link-exact-active {
			color: pall.$primary;

			&::after {
				transform: scaleX(1);
				transition: transform .2s ease;
			}
		}
	}
</style>

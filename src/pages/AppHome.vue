<script>
	import typewriter from '../js/typewriter';
	import thoughts from '../js/thoughts';

	const getRandInt = (max) => Math.floor(Math.random() * (max + 1));
	const currHour = 3;
	let thought = '';
	for (const [interval, { sentences }] of Object.entries(thoughts)) {
		const [start, end] = interval.split('-');
		if (currHour >= start && currHour < end) {
			thought = sentences[getRandInt(sentences.length - 1)];
			break;
		}
	}

	export default {
		data() {
			return {
				name: '',
				gender: '',
				loading: false,
				showInput: true,
			}
		},
		methods: {
			async handleConfirm(e) {
				if (!this.name) return;

				this.loading = true;
				this.resetGender();
				this.gender = 'female';

				try {
					if (this.gender) return;
					const county = 'IT';

					const res = await fetch(`https://gender-api.com/get?name=${this.name}&country=${country}&key=${import.meta.env.VITE_GENDER_API_KEY}`);
					({ gender: this.gender = '', meaning: this.meaning } = await res.json());
				} catch (err) {
					console.log(err);
				} finally {
					this.loading = false;
					this.showInput = false;
				}
			},
			resetGender() {
				this.gender = '';
			}
		},
		watch: {
			gender(newValue) {
				if (!newValue) return;

				const concordance = this.gender.toLowerCase() === 'male' ? 'o' : 'a';
				const isIncompleteSentence = thought.slice(-1) !== '.';
				const textBl = `\`Ciao ${this.name}, benvenut${concordance} nel mio portfolio personale!

${thought}${isIncompleteSentence ?
						', ma qualora volessi dare un\'occhiata,'
						: ' Comunque, aggiungo solo che'} alla pagina 'progetti' trovi i collegamenti ai siti dimostrativi più recenti che ho realizzato, mentre ad 'info' il mio percorso e i miei contatti.

Ah dimenticavo! Il sito è in test, quindi se notassi qualche funzionamento inatteso, puoi farmelo sapere alla mia mail.\``;
				const bl = this.$refs.codeBl;
				bl.innerHTML = textBl;
				console.log('Start typewriter...');
				typewriter.createWithProcessing(bl);
			}
		}
	}
</script>

<template>
	<h1 class="text-center py-5">Introduzione</h1>

	<div class="code-wrapper">
		<pre class="cod-ex-block">
<code ref="codeBl" class="language-javascript typewriter"></code>
			</pre>

		<Transition name="bounce">
			<div v-if="showInput" class="input-field">
				<div class="form-floating">
					<input id="name" class="form-control" v-model.trim="name" placeholder="inserisci nome" type="text"
						@keypress.enter="handleConfirm">
					<label for="name">Nome</label>
					<div class="form-text">Iserisci il tuo nome e avvia l'introduzione con 'invio'</div>
				</div>
			</div>
		</Transition>
	</div>
</template>

<style lang="scss">
	h1 {
		vertical-align: middle;
		color: #8b949e
	}

	pre {
		position: relative;
	}

	/* Utility */
	.code-wrapper {
		position: relative;

		.form-text {
			color: #8b949e;
		}
	}

	.bounce-enter-active {
		animation: bounce-in 0.5s;
	}

	.bounce-leave-active {
		animation: bounce-in 0.5s reverse;
	}

	.input-field {
		width: min(85%, 350px);

		position: absolute;
		left: 50%;
		top: 50%;
		translate: -50% -50%;
		z-index: 1;

		font-size: 1rem;

		.form-floating>.form-control {
			color: #a5d6ff;
			background-color: #24292f;

			&,
			&:focus,
			&:not(:placeholder-shown) {
				&~label {
					color: #8b949e;
					background-color: transparent;

					&::after {
						background: transparent !important;
					}
				}
			}
		}
	}
</style>
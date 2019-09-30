<template>
	<div class="result-container">
		<div class="result-display">
			<p id="shortUrl">{{ url }}</p>
			<input type="hidden" id="result" :value="url">
			<span class="copy-container" :class="{clicked: clicked}" @click="copyToClipboard" v-if="hasResult">
				<i class="far fa-clipboard"></i>
				<small>Copiar</small>
			</span>
		</div>
		<div class="input-container" v-if="hasResult">
			<input id="urlName" type="text" placeholder="Nombre de URL" v-model="urlName">
			<b-button id="saveUrl" variant="primary" @click="saveURL">Guardar</b-button>
		</div>
		<small id="successUrl" class="success" v-if="success">URL guardada!</small>

	</div>
</template>

<script>
	import axios from 'axios'
	import { firebasePaths } from '../firebase-config.js'
	export default {
		props: ['url'],
		data() {
			return {
				clicked: false,
				hasResult: false,
				urlName: null,
				success: false,
			}
		},

		computed: {
			savedURL() {
				return this.$store.state.saved
			}
		},

		watch: {
			url() {
				this.hasResult = true
			}
		},

		methods: {
			copyToClipboard() {

				let urlToCopy = document.querySelector('#result')
				urlToCopy.setAttribute('type', 'text')
				urlToCopy.select()

				document.execCommand('copy')

				urlToCopy.setAttribute('type', 'hidden')
          		window.getSelection().removeAllRanges()

				this.clicked = true
				setTimeout( ()=> {
					this.clicked = false
				}, 500)
			},

			saveURL() {
				let d = new Date()
				let year = d.getFullYear()
				let month = d.getMonth() + 1
				if( month < 10 ) {
					month = '0' + month
				}

				let day = d.getDate()
				if( day < 10 ) {
					day = '00 + day'
				}

				let date = `${day}-${month}-${year}`

				let data = {
					name: this.urlName,
					url: this.url,
					date
				}

				this.savedURL.unshift(data)

				this.$store.commit('updateURL', this.savedURL)

				this.urlName = null
				this.success = true
				setTimeout( ()=> {
					this.success = false
					this.updateDB()
				}, 2000)
			},

			updateDB() {
				let headers = {
					"Content-Type": "application/json"
				}
				let data = {
					id: this.$store.state.currentUser,
					data: {
						saved: this.$store.state.saved
					}
				}

				axios
					.post( firebasePaths.saveData, data, {headers: headers} )
					.then( (response)=> {
						console.log(response)
					})
					.catch( (error)=> {
						console.log(error)
					})
			}
		}
	}
</script>

<style scoped>
	.result-container {
		margin-top: 2rem;
	}

	.result-display {
		color: #fff;
		background: #1c1c1c;
		padding: 1rem;
		display: flex;
		justify-content: space-between;
	}

	.result-display p {
		margin-bottom: 0;
	}

	.input-container {
		margin-top: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.input-container button {
		width: 100px;
		border-radius: 0 3px 3px 0;
		font-size: 14px;
		font-weight: 700;
		padding: 0.4rem 1rem;
		margin-left: -1px;
	}

	.input-container input {
		width: calc(100% - 100px);
		padding: 0.25rem 0.5rem;
	}

	.copy-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		color: #fff;
		transition: color 0.1s ease-in-out;
	}

	.copy-container small {
		font-size: 10px;
	}

	.copy-container.clicked {
		color: #ccc;
	}

	.success {
		margin-top: 1rem;
		display: block;
	}

	@media screen and (max-width: 450px) {		
		.input-container {
			flex-direction: column;
		}

		.input-container input {
			width: 100%;
			margin-bottom: 0.5rem;
		}

		.input-container button {
			width: 100%;
		}

		.success {
			text-align: center;
		}
	}
</style>
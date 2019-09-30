<template>
	<main>
		<navigation></navigation>

		<b-container>
			<b-row>
				<b-col>
					<b-card class="url-card">
						<h2>Acorta tus URL</h2>
						<div class="input-container url-container">
							<input id="urlInput" type="text" placeholder="Pega tu URL (https://...)" v-model="url" @keyup.enter="shortenURL">
							<b-button id="urlButton" variant="primary" @click="shortenURL">Acortar</b-button>
						</div>

						<small class="error" v-if="error">*Error - Inserte una URL válida</small>

						<hr>
							
						<result :url="result"></result>
						
					</b-card>
				</b-col>
			</b-row>
		</b-container>
	</main>
</template>

<script>
	import navigation from './navigation.vue'
	import result from './result.vue'
	import axios from 'axios'
	export default {
		components: { navigation, result },
		data() {
			return {
				url: null,
				result: null,
				error: false,
			}
		},

		methods: {
			shortenURL() {
				let data = {
					url: this.url
				}

				axios
					.post( 'https://rel.ink/api/links/', data )
					.then( (response)=> {
						this.error = false
						this.result = `https://rel.ink/${response.data.hashid}`
					})
					.catch( (error)=> {
						this.error = true
					})
			}
		}
	}
</script>

<style scoped>
	h2 {
		text-align: center;
		margin-bottom: 2.5rem;
		font-size: 1.5rem;
	}

	.url-card {
		max-width: 600px;
		margin: 6rem auto;
		padding: 2rem 1rem;
	}

	.url-container {
		margin-bottom: 2rem;
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

	.error {
		color: red;
	}

	@media screen and (max-width: 450px) {
		.url-card {
			padding: 1rem 0;
		}
		
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
	}
</style>
<template>
	<main>
		<navigation></navigation>

		<b-container>
			<b-row>
				<b-col class="table-container">
					<h3>URL Guardadas</h3>

					<div class="search">
						<div class="search-input">
							<input id="searchUrl" type="text" placeholder="Buscar" v-model="search" @keyup.enter="searchURL">
							<b-button id="searchButton" variant="primary" @click="searchURL">Buscar</b-button>
						</div>
						<span @click="allURL">Ver todos</span>
					</div>
						
					<b-row class="saved-row" v-for="(item, index) in items">
						<b-col class="inner-row">
							<p class="bold url-name">{{ item.name }}</p>
							<p>{{ item.url }}</p>
						</b-col>
						<b-col class="inner-row">
							<p class="bold">Fecha de creación</p>
							<p>{{ item.date }}</p>
						</b-col>
						<b-col class="inner-row button-row">
							<b-button variant="primary" class="copy-btn" @click="copyToClipboard(item.url)">
								<i class="far fa-clipboard"></i>
								<small>Copiar</small>
							</b-button>
							<b-button variant="primary" @click="deleteSaved(index)">Eliminar</b-button>
						</b-col>
					</b-row>
					<h3 v-if="noURL" class="no-saved">No hay URLs guardadas</h3>
					<input type="hidden" id="currentURL" v-model="currentURL">
				</b-col>
			</b-row>
		</b-container>
	</main>
</template>

<script>
	import axios from 'axios'
	import { firebasePaths } from '../firebase-config.js'
	import navigation from './navigation.vue'
	export default {
		components: { navigation },
		data() {
			return {
				currentURL: null,
				noURL: false,
				search: null,
			}
		},

		computed: {
			items: {
				get() {
					return this.$store.state.saved
				},
				set(newValue) {
					this.$store.commit('updateURL', newValue)
				}
				
			},

			itemsRaw() {
				return this.$store.state.savedRaw
			}

		},

		watch: {
			items() {
				if( this.items.length === 0 ) {
					this.noURL = true
				} else {
					this.noURL = false
				}
			},
		},

		methods: {		
			allURL() {
				this.items = this.itemsRaw
				this.search = null
			},

			searchURL() {

				this.items = this.itemsRaw

				let results = []
				this.items.forEach( (item)=> {
					if( item.name.toLowerCase().indexOf( this.search.toLowerCase() ) !== -1 ) {
						results.push( item )
					}
				})

				this.items = results

			},

    		copyToClipboard(data) {

    			this.currentURL = data

				setTimeout( ()=> {
					let urlToCopy = document.querySelector('#currentURL')
					urlToCopy.setAttribute('type', 'text')
					urlToCopy.select()

					document.execCommand('copy')

					urlToCopy.setAttribute('type', 'hidden')
          			window.getSelection().removeAllRanges()
          		}, 250)

			},

			deleteSaved(index) {
				let deleteItem = this.items[index]

				let newItems = this.itemsRaw.filter( item => item !== deleteItem )

				this.$store.commit('updateURL', newItems)
				this.$store.commit('saveURLRaw', newItems)

				this.updateDB()
				this.search = null
			},

			updateDB() {
				let headers = {
					"Content-Type": "application/json"
				}

				let data = {
					id: this.$store.state.currentUser,
					data: {
						saved: this.items
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
	.table-container {
		margin: 6rem auto;

	}

	h3 {
		font-size: 1.25rem;
		margin-bottom: 1.5rem;
	}

	.search {
		margin-bottom: 2rem;
	}

	.search-input {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-bottom: 0.5rem;
	}

	.search input {
		padding: 0.25rem 0.5rem;
		width: 100%;
		max-width: 400px;
	}

	.search span {
		cursor: pointer;
		font-weight: 700;
		color: #6c757d;
		margin-left: 0.125rem;
	}

	.search span:hover {
		text-decoration: underline;
	}

	.search button {
		margin-right: -0.35rem;
		border-radius: 0 3px 3px 0;
		padding: 0.3rem 1rem;
	}

	.no-saved {
		text-align: center;
		color: #555;
		margin-top: 6rem;
	}

	.saved-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 0;
		border-bottom: 1px solid #ccc;
	}

	.saved-row p {
		margin-bottom: 0;
	}

	.saved-row .bold {
		font-weight: 700;
	}

	.copy-btn small {
		font-size: 1rem
	}

	.copy-btn .far {
		font-size: 1.2rem;
	}

	@media screen and (max-width: 768px) {
		.saved-row {
			flex-direction: column;
		}

		.inner-row {
			width: 100%;
			margin-bottom: 1rem;
		}

		.button-row {
			display: flex;
			justify-content: space-between;
		}

		.button-row button {
			width: 49%;
		}
	}
</style>
import Vue from 'vue/dist/vue.js'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './css/styles.css'

import VueRouter from 'vue-router'
import routes from './router.js'

import Vuex from 'vuex'
import storeContent from './store.js'


import { firebaseConfig } from './firebase-config.js'
import firebase from 'firebase/app'
import 'firebase/auth'
global.firebase = firebase
firebase.initializeApp(firebaseConfig)

Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
	routes,
	mode: 'history'
})
const store = new Vuex.Store(storeContent)

import axios from 'axios'
import { firebasePaths } from './firebase-config.js'

const vm = new Vue({
	el: '#app',
	router,
	store,
	computed: {
		logged() {
			return this.$store.state.currentUser
		}
	},

	watch: {
		logged() {
			this.$store.commit('setCurrentUser', this.getSessionCookie('session'))
			this.getURL()
		}
	},

	methods: {
		getSessionCookie(name) {
			let decodedCookie = decodeURIComponent( document.cookie )
			let ca = decodedCookie.split(';')

			for( let i = 0; i < ca.length; i++ ) {
				let c = ca[i]
				while ( c.charAt(0) == ' ' ) {
					c = c.substring(1)
				}
				if( c.indexOf(name) == 0 ) {
					return c.substring(name.length + 1, c.length)
				}
			}
			return false
		},

		getURL() {
			let url = `${firebasePaths.getData}?id=${this.$store.state.currentUser}`

			axios
				.get( url )
				.then( (response)=> {
					this.$store.commit('updateURL', response.data.saved)
					this.$store.commit('saveURLRaw', response.data.saved)
				})
				.catch( (error)=> {
					console.log(error)
				})
		},
	},

	created() {
		if( this.getSessionCookie('session') ) {
			this.$store.commit('setCurrentUser', this.getSessionCookie('session'))
			this.getURL()
		}
	}
})
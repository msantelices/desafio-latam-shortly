import login from './components/login.vue'
import main from './components/main.vue'
import saved from './components/saved.vue'

const getSessionCookie = (name)=> {
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
	return ""

}

const routes = [
	{
		path: '*',
		redirect: '/acortador'
	},
	{
		path: '/login',
		component: login
	},
	{
		path: '/acortador',
		component: main,
		beforeEnter: (to, from, next) => {

			if( getSessionCookie('session') ) {
				next()
			} else {
				next('/login')
			}

		}
	},
	{
		path: '/guardados',
		component: saved,
		beforeEnter: (to, from, next) => {
			
			if( getSessionCookie('session') ) {
				next()
			} else {
				next('/login')
			}

		}
	}
]

module.exports = routes
<template>
	<div>
		<b-navbar toggleable="md" type="dark" variant="primary" class="navbar">
			<b-navbar-brand href="#">SHORT.ly</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav class="nav-menu">
					<router-link id="toShortener" to="/acortador">Acortador</router-link>
					<router-link id="toSaved" to="/guardados">Guardados</router-link>
				</b-navbar-nav>

				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto nav-logout">
					<router-link to="/login" @click.native="logOut" class="logout"><em>Log out</em> <i class="fas fa-power-off"></i></router-link>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>

</template>

<script>
	export default {
		methods: {
			deleteCookie(name) {
				let d = new Date()
				d.setTime( d.getTime() - ( 1000*60*60*24 ) )
				
				let expires = `expires=${d.toGMTString()}`
				document.cookie = `${name}=; ${expires}`
			},

			logOut() {
				this.deleteCookie('session')
				firebase.auth().signOut()
			}
		}
	}
</script>

<style scoped>
	.navbar {
		box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
	}

	.navbar-brand {
		font-weight: 700;
	}

	.navbar a, em {
		color: #fff;
	}

	.navbar a:hover {
		text-decoration: none;
		opacity: 0.9;
	}

	.navbar-nav {
		padding-left: 6rem;
	}

	.navbar-nav a {
		margin: 0 0.5rem;
		display: block;
	}

	.navbar .logout {
		color: #fff;
		text-align: center;
	}

	.navbar-dark .navbar-toggler {
		border: none;
	}

	.navbar-dark .navbar-toggler-icon {
		stroke-color: #fff;
	}

	.nav-logout .fas {
		margin-left: 0.25rem;
	}

	@media screen and (max-width: 768px) {
		.navbar-nav {
			padding: 0;
			width: 100%;
		}

		.navbar-nav a {
			margin: 0;
		}

		.navbar-collapse {
			display: flex;
			flex-direction: column;
		}

		.nav-menu {
			margin: 2rem 0;
		}

		.nav-menu a {
			margin-bottom: 0.5rem;
		}

		.nav-logout {
			display: flex;
			flex-direction: row;
			margin-bottom: 2rem;
		}

		
	}
</style>
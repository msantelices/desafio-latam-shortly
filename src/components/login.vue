<template>
	<main>
		<b-container>
			<b-row>
				<b-col class="title">
					<i class="fas fa-link"></i>
					<h1>SHORT.ly</h1>
					<small>Acortador de URLs</small>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<b-card class="login-card">
						<h3>Login</h3>
						<div class="input-container">
							<label>Correo</label>
							<input id="email" type="email" v-model="user">
						</div>
						<div class="input-container">
							<label>Contraseña</label>
							<input id="pass" type="password" v-model="pass">
						</div>
						<small v-if="failed" class="error">*Usuario o contraseña incorrectos</small>
						<div class="input-container">
							<b-button id="btnLogin" :class="{disabled: disabled}" variant="primary" @click="login">Ingresar</b-button>
						</div>
					</b-card>
				</b-col>
			</b-row>
		</b-container>
	</main>
</template>

<script>
	export default {
		data() {
			return {
				user: null,
				pass: null,
				disabled: true,
				failed: false,
			}
		},

		watch: {
			user() {
				this.hasLoginData()
			},

			pass() {
				this.hasLoginData()
			}
		},

		methods: {
			hasLoginData() {
				if( this.user !== null && this.user !== '' && this.pass !== null && this.pass !== '' ) {
					this.disabled = false
				} else {
					this.disabled = true
				}
				
			},

			setSessionCookie(name, value, days) {
				let d = new Date()
				d.setTime( d.getTime() + (days*24*60*60*1000) )
				
				let expires = `expires=${d.toUTCString()}`
				document.cookie = `${name}=${value};${expires};path=/`
			},

			login() {

				firebase.auth().signInWithEmailAndPassword(this.user, this.pass)
					.then( (response)=> {
						this.setSessionCookie('session', response.user.email, 1)
						this.$store.commit('setCurrentUser', response.user.email)
						this.$router.push('/acortador')
					})
					.catch( (error)=> {
						this.failed = true
					})
			}
		}
	}
</script>

<style scoped>
	main {
		margin: 4.5rem auto 9rem auto;
	}

	h1 {
		font-weight: 700;
	}

	h3 {
		text-align: center;
		font-size: 1.25rem;
		margin-bottom: 2.5rem;
	}

	.login-card {
		max-width: 400px;
		margin: auto;
		padding: 2rem 1rem;
		box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
	}

	.input-container {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
	}

	.title {
		text-align: center;
		margin-bottom: 3rem;
	}

	.title .fas {
		font-size: 2rem;
	}

	label {
		font-weight: 700;
		margin-bottom: 0.25rem;
		font-size: 14px;
	}

	input {
		padding: 0.25rem 0.5rem;
	}

	.error {
		color: red;
		text-align: center;
		margin-bottom: 1.5rem;
		display: block;
	}
</style>
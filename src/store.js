const storeContent = {
	state: {
		currentUser: '',
		saved: [],
		savedRaw: [],
	},

	mutations: {
		setCurrentUser(state, data) {
			state.currentUser = data
		},

		saveURL(state, data) {
			state.saved.unshift(data)
		},

		saveURLRaw(state, data) {
			state.savedRaw = data
		},

		updateURL(state, data) {
			state.saved = data
		}
	}
}

module.exports = storeContent
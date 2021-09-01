export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, userObject) {
    state.user = userObject
  },
}

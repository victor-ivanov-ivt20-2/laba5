import { createStore } from 'vuex'

export default createStore({
  state: {
    wins: 0,
    max: 0,
    level: 0
  },
  getters: {
  },
  mutations: {
    addWins(state) {
        state.wins++;
        if (state.wins > state.max) state.max = state.wins
    },
    selectLevel(state, level) {
        state.level = level
    }
  },
  actions: {

  },
  modules: {
  }
})

import { createStore } from 'vuex'
import People from '@/models/People'

export default createStore({
  state: {
    peoples: [] as People[],
    countPeoples: 0 as number,
    favorites: [] as People[],
    hasNext: true as boolean,
    hasPrev: false as boolean
  },
  getters: {
    userIsFavorite: (state) => (id:number) => {
      return state.favorites.find(favorite => favorite.id === id)
    }
  },
  mutations: {
    clearPeoples(state) {
      state.peoples = []
    },
    addPeople(state, people: People) {
      state.peoples.push(people)
    },
    setCountPeoples(state, count: number) {
      state.countPeoples = count
    },
    addToFavorite(state, people: People) {
      state.favorites.push(people)
    },
    removeFromFavorites(state, id: number) {
      const index = state.favorites.findIndex(favorite => favorite.id === id)
      if (index !== -1) {
        state.favorites.splice(index, 1)
      }
    },
    setHasNext(state, isHas: boolean) {
      state.hasNext = isHas
    },
    setHasPrev(state, isHas: boolean) {
      state.hasPrev = isHas
    },
  },
  actions: {
    setPeoples({ commit }, peoples: People[]) {
      commit('clearPeoples')

      peoples.forEach((people: People) => {
        people.id = Number((people.url ?? '')
            .replace('https://swapi.dev/api/people/', '')
            .replace('/', '')) ?? null
        commit('addPeople', people)
      })
    },
    setCountPeoples({ commit }, count: number) {
      commit('setCountPeoples', count)
    },
    addToFavorite({ commit }, people: People) {
      commit('addToFavorite', people)
    },
    removeFromFavorites({ commit }, id: number) {
      commit('removeFromFavorites', id)
    },
    setHasNext({ commit }, isHas: boolean) {
      commit('setHasNext', isHas)
    },
    setHasPrev({ commit }, isHas: boolean) {
      commit('setHasPrev', isHas)
    },
  },
  modules: {
  }
})

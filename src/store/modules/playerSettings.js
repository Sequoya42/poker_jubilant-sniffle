const state = {};

const getters = {};

const actions = {
  update_players: ({ commit }, d) => {
    commit('updatePlayers', d);
  },
  change_name: ({ commit }, d) => {
    console.log('IN action', d);
    commit('changeName', d);
  }
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations
};

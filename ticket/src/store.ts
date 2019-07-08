import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    formSchema: null,
    miscAsync: false,
  },
  mutations: {
    formSchema: (state: any, data: any) => {
      state.miscAsync = false;
      state.formSchema = data;
    },
    miscAsyncInProgress: (state: any) => {
      state.miscAsync = true;
    },
  },
  actions: {
    getSchema({ commit }: any) {
      commit('miscAsyncInProgress');

      fetch('http://localhost:9000/schema')
        .then(res => {
          return res.json();
        })
        .then(res => {
          console.log(res);
          commit('formSchema', res);
        });
    },
  },
});

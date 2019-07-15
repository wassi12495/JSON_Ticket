import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    formSchema: null,
    miscAsync: false,
    ticketValid: null,
    ticketErrors: null,
    tickets: null,
  },
  mutations: {
    formSchema: (state: any, data: any) => {
      state.miscAsync = false;
      state.formSchema = data;
    },
    miscAsyncInProgress: (state: any) => {
      state.miscAsync = true;
    },
    miscAsyncCompleted: (state: any) => {
      state.miscAsync = false;
    },
    ticketValidated: (state: any) => {
      state.ticketValid = true;
      state.ticketErrors = null;
    },
    ticketInvalid: (state: any, errors: any) => {
      state.ticketValid = false;
      state.ticketErrors = errors;
    },
  },
  actions: {
    getSchema({ commit }: any) {
      commit('miscAsyncInProgress');

      fetch('http://localhost:9000/schema')
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);

          commit('formSchema', res);
          commit('miscAsyncCompleted');
        });
    },
    testSchema({ commit }: any) {
      commit('miscAsyncInProgress');
      fetch('http://localhost:9000/schema/test')
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          commit('formSchema', res);
          commit('miscAsyncCompleted');
        });
    },
    submitForm({ commit }: any, data: any) {
      commit('miscAsyncInProgress');
      fetch('http://localhost:9000/ticket/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((resp) => {
          return resp.json();
        })
        .then((resp) => {
          console.log('Post Ticket response', resp);
          if (resp.valid === true) {
            commit('ticketValidated');
            console.log('Ticket is Valid, will push to new URL');
          } else {
            const errorField: string = resp[0].dataPath.slice(1);
            const error: string = resp[0].message;
            const errorMessage: string = errorField + ' ' + error;
            commit('ticketInvalid', errorMessage);
            console.log('Ticket is Invalid, error messages added to store.');
          }
          debugger;
          commit('miscAsyncCompleted');
        });
    },
  },
});

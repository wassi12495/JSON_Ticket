import Vue from 'vue';
import Vuex, { Store } from 'vuex';

Vue.use(Vuex);

const URL = 'http://localhost:9000';
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
    setTickets: (state: any, tickets: any) => {
      state.tickets = tickets;
    },
  },
  actions: {
    //  -------- SCHEMA HANDLING ---------
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
    // ------------- TICKET HANDLING ---------

    // Simple GET fetch list of tickets stored in the server
    getTickets({ commit }: any) {
      console.log('Called getTickets');
      commit('miscAsyncInProgress');
      fetch(`${URL}/tickets`)
        .then((resp) => {
          return resp.json();
        })
        .then((resp) => {
          console.log('Fetch list of tickets, at init should be empty', resp);
          commit('setTickets', resp);
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
          commit('miscAsyncCompleted');
        });
    },
  },
});



import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    reducer: (state) => ({
      pdf: state.pdf,
    }),
  });
  
  function initialState() {
    return {
        pdf: undefined,
      
    };
  }
  
  export default new Vuex.Store({
    state: initialState,
    mutations: {
     
      updatePDF(state, val) {
        state.pdf = val;
      },
      
    },
    plugins: [vuexLocal.plugin],
  });
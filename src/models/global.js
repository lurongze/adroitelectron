import { Effect, Reducer } from 'umi';

const GlobalModel = {
  namespace: 'global',
  state: {
    showNav: true,
    currentNote: {},
  },
  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    toggleNav(state) {
      return {
        ...state,
        showNav: !state.showNav,
      };
    },
    selectNote(state, action) {
      return {
        ...state,
        currentNote: action.payload,
      };
    },
  },
};
export default GlobalModel;

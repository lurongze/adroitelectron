import { Effect, Reducer } from 'umi';

export interface GlobalModelState {
  showNav: boolean;
  currentNote: string;
}
export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<GlobalModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
}
const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    showNav: true,
    currentNote: {},
  },
  effects: {
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    toggleNav(state: any) {
      return {
        ...state,
        showNav: !state.showNav,
      };
    },
    selectNote(state: any, action: any) {
      return {
        ...state,
        currentNote: action.payload,
      };
    },
  },
};
export default GlobalModel;

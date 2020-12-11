import { Effect, Reducer } from 'umi';

const GlobalModel = {
  namespace: 'global',
  state: {
    showNav: true,
    currentNote: {},
    currentCategory: {},
    currentArticle: {},
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
      let resState = {
        ...state,
        currentNote: action.payload,
      };
      // 如果笔记变了，分类和文章都清空一下
      if (
        state.currentNote?._id &&
        action.payload?._id &&
        state.currentNote._id !== action.payload._id
      ) {
        resState = {
          ...resState,
          currentCategory: {},
          currentArticle: {},
        };
      }
      return resState;
    },
    selectCategory(state, action) {
      return {
        ...state,
        currentCategory: action.payload,
      };
    },
    selectArticle(state, action) {
      return {
        ...state,
        currentArticle: action.payload,
      };
    },
  },
};
export default GlobalModel;

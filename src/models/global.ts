import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import cloudFunc from '@/utils/cloudFunc';
import { isFuncAndRun } from '@/utils/helper';

export interface IndexModelState {
  notes: Object[];
  articles: Object[];
  categories: Object[];
  showNav: boolean;
}
export interface IndexModelType {
  namespace: 'global';
  state: IndexModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<IndexModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
}
const IndexModel: IndexModelType = {
  namespace: 'global',
  state: {
    notes: [],
    articles: [],
    categories: [],
    showNav: true,
  },
  effects: {
    *query({ payload }, { call, put }) {},
    *queryNotes({ payload }, { call, put }) {
      const res = yield call(cloudFunc.queryNotes);
      yield put({
        type: 'save',
        payload: {
          notes: res?.data || [],
        },
      });
    },
    *deleteNote({ payload }, { call, put }) {
      const res = yield call(cloudFunc.deleteNote, payload.id);
      isFuncAndRun(payload?.success);
    },
    *saveNote({ payload }, { call, put }) {
      const res = yield call(cloudFunc.saveNote, payload);
      isFuncAndRun(payload?.success);
    },
  },
  reducers: {
    save(state: any, action: any) {
      return {
        ...state,
        ...action.payload,
      };
    },
    toggleNav(state: any) {
      return {
        ...state,
        showNav: !state.showNav,
      };
    },
  },
};
export default IndexModel;

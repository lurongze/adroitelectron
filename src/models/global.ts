import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getNotes } from '@/utils/tcb';

export interface IndexModelState {
  notes: Object[];
  articles: Object[];
  categories: Object[];
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
    notes: [{ name: 'zhuawajiaoyu' }, { name: 'useEffect' }],
    articles: [],
    categories: [],
  },
  effects: {
    *query({ payload }, { call, put }) {},
    *queryNotes({ payload }, { call, put }) {
      const res = yield call(getNotes);
      console.log('queryNotes', res);
      yield put({
        type: 'save',
        payload: {
          notes: res?.data || [],
        },
      });
    },
  },
  reducers: {
    save(state: any, action: any) {
      console.log('payload', state, action.payload);
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
export default IndexModel;

import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import cloudFunc from '@/utils/cloudFunc';
import { isFuncAndRun } from '@/utils/helper';

export interface NoteModelState {
  notes: Object[];
}
export interface NoteModelType {
  namespace: 'noteModel';
  state: NoteModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<NoteModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
}
const NoteModel: NoteModelType = {
  namespace: 'noteModel',
  state: {
    notes: [],
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
  },
};
export default NoteModel;

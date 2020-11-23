import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import cloudFunc from '@/utils/cloudFunc';
import { isFuncAndRun } from '@/utils/helper';
import { message } from 'antd';

const NoteModel = {
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
      if (res?.data?.deleted && +res.data.deleted !== 0) {
        isFuncAndRun(payload?.success);
      } else {
        message.error('删除失败！');
      }
    },
    *saveNote({ payload }, { call, put }) {
      const res = yield call(cloudFunc.saveNote, payload);
      console.log('res', res);
      if (res?.data?.updated && +res.data.updated !== 0) {
        isFuncAndRun(payload?.success);
      } else {
        message.error('保存失败！');
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
export default NoteModel;

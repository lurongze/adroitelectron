import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import cloudFunc from '@/utils/cloudFunc';
import { isFuncAndRun, isEmpty } from '@/utils/helper';
import { message } from 'antd';

const ArticleModel = {
  namespace: 'articleModel',
  state: {
    articles: [],
  },
  effects: {
    *query({ payload }, { call, put }) {},
    *queryArticles({ payload }, { call, put }) {
      const res = yield call(cloudFunc.queryArticles, payload);
      yield put({
        type: 'save',
        payload: {
          articles: res?.data || [],
        },
      });
    },
    *deleteArticle({ payload }, { call, put }) {
      const res = yield call(cloudFunc.deleteArticles, payload.id);
      if (res?.deleted && +res.deleted !== 0) {
        isFuncAndRun(payload?.success);
      } else {
        message.error('删除失败！');
      }
    },
    *saveArticle({ payload }, { call, put }) {
      const res = yield call(cloudFunc.saveArticle, payload);
      if ((res?.updated && +res.updated !== 0) || !isEmpty(res?.id)) {
        isFuncAndRun(payload?.success);
      } else {
        message.error('保存失败！');
      }
    },
    *getArticle({ payload }, { call, put }) {
      const res = yield call(cloudFunc.getArticle, payload);
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
export default ArticleModel;

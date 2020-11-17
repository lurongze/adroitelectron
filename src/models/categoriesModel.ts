import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import cloudFunc from '@/utils/cloudFunc';
import { isFuncAndRun } from '@/utils/helper';

export interface CategoriesModelState {
  categories: Object[];
}
export interface CategoriesModelType {
  namespace: 'categoriesModel';
  state: CategoriesModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<CategoriesModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
}
const CategoriesModel: CategoriesModelType = {
  namespace: 'categoriesModel',
  state: {
    categories: [
      { title: '分类一' },
      { title: '分类二' },
      { title: '分类三' },
      { title: '分类四' },
    ],
  },
  effects: {
    *query({ payload }, { call, put }) {},
    *queryCategories({ payload }, { call, put }) {
      const res = yield call(cloudFunc.queryCategories);
      yield put({
        type: 'save',
        payload: {
          notes: res?.data || [],
        },
      });
    },
    *deleteCategory({ payload }, { call, put }) {
      const res = yield call(cloudFunc.deleteCategory, payload.id);
      isFuncAndRun(payload?.success);
    },
    *saveCategory({ payload }, { call, put }) {
      const res = yield call(cloudFunc.saveCategory, payload);
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
export default CategoriesModel;

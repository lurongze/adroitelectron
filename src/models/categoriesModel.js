import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import cloudFunc from '@/utils/cloudFunc';
import { isFuncAndRun } from '@/utils/helper';

const CategoriesModel = {
  namespace: 'categoriesModel',
  state: {
    categories: [
      {
        title: '分类一',
        _id: '123',
        children: [
          {
            title: '子类1',
            _id: '1grfg23',
            children: [
              {
                title: '子类1',
                _id: '1grgrgr23',
                children: [
                  { title: '子类1', _id: '1tytyt23' },
                  { title: '子类2', _id: '12grgrgrg3' },
                ],
              },
              { title: '子类2', _id: '12gtjyjtyj3' },
            ],
          },
          { title: '子类2', _id: '1bgtryhtry23' },
        ],
      },
      { title: '分类二', _id: '1w23' },
      { title: '分类三', _id: '12d3' },
      { title: '分类四', _id: '1d23' },
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
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};
export default CategoriesModel;

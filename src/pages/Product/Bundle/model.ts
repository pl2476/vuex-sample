import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { add, query, remove, get, update, exportList, getProduct } from './service';

import { TableListData } from '@/pages/Product/Bundle/data';

export interface StateType {
  data: TableListData;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    export: Effect;
    add: Effect;
    remove: Effect;
    get: Effect;
    update: Effect;
    getProduct: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'bundle',

  state: {
    data: {
      list: [],
      optionFields: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *export({ payload, callback }, { call, put }) {
      const response = yield call(exportList, payload);
      if (callback) callback(response);
    },
    *add({ payload, callback }, { call }) {
      const response = yield call(add, payload);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call }) {
      const { ids } = payload;
      const response = yield call(remove, ids);
      if (callback) callback(response);
    },
    *getProduct({ payload, callback }, { call }) {
      const response = yield call(getProduct, payload);
      if (callback) callback(response);
    },
    *get({ payload, callback }, { call }) {
      const { id } = payload;
      const response = yield call(get, id);
      if (callback) {
        callback({
          code: '200',
          data: response,
        });
      }
    },
    *update({ payload, callback }, { call }) {
      const response = yield call(update, payload);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      const { list, optionFields } = action.payload;
      const { pagination } = action.payload;
      return {
        ...state,
        data: {
          list,
          pagination: {
            total: pagination.totalRecord || 0,
            currentPage: pagination.pageIndex || 1,
          },
          optionFields,
        },
      };
    },
  },
};

export default Model;

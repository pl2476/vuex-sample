import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { addMember, queryMember, removeMember, getMember, updateMember } from './service';

import { TableListData } from '@/pages/Member/List/data';

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
    add: Effect;
    remove: Effect;
    get: Effect;
    update: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'listTableList',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryMember, payload);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *add({ payload, callback }, { call }) {
      const response = yield call(addMember, payload);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call }) {
      const { memberCode } = payload;
      const response = yield call(removeMember, memberCode);
      if (callback) callback(response);
    },
    *get({ payload, callback }, { call }) {
      const { memberCode } = payload;
      const response = yield call(getMember, memberCode);
      if (callback) {
        callback({
          code: '200',
          data: response,
        });
      }
    },
    *update({ payload, callback }, { call }) {
      const response = yield call(updateMember, payload);
      // yield put({
      //   type: 'save',
      //   payload: response,
      // });
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      const { list } = action.payload;
      const { pagination } = action.payload;
      return {
        ...state,
        data: {
          list,
          pagination: {
            total: pagination.totalRecord || 0,
            currentPage: pagination.pageIndex || 1,
          },
        },
      };
    },
  },
};

export default Model;
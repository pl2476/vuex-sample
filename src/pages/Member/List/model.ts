import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import {
  addMember,
  queryMember,
  removeMember,
  getMember,
  updateMember,
  exportList,
  changePassword,
} from './service';

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
    export: Effect;
    add: Effect;
    remove: Effect;
    get: Effect;
    update: Effect;
    changePassword: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'memberList',

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
    *export({ payload, callback }, { call, put }) {
      const response = yield call(exportList, payload);
      if (callback) callback(response);
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
      const { memberCodes } = payload;
      const response = yield call(removeMember, memberCodes);
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
    *changePassword({ payload, callback }, { call }) {
      const response = yield call(changePassword, payload);
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

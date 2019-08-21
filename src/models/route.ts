import { Effect } from 'dva';
import { Reducer } from 'redux';

import { getMenuData } from '@/services/route';

export interface MenuModelState {
  menuData: object[];
}

export interface MenuModelType {
  namespace: 'menu';
  state: MenuModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    saveMenuData: Reducer<MenuModelState>;
  };
}

const MenuModel: MenuModelType = {
  namespace: 'menu',

  state: {
    menuData: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(getMenuData);
      yield put({
        type: 'saveMenuData',
        payload: response,
      });
      return response;
    },
  },

  reducers: {
    saveMenuData(state, action) {
      return {
        ...state,
        menuData: action.payload || [],
      };
    },
  },
};

export default MenuModel;

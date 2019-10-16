import { Effect } from 'dva';
import { Reducer } from 'redux';

import { getMenuData } from '@/services/menu';

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
    *fetch({ callback }, { put }) {
      const menuData = [
        {
          path: '/homepage',
          name: 'homepage',
          icon: 'home',
        },
        {
          path: '/member',
          icon: 'table',
          name: 'member',
          children: [
            {
              path: '/member/list',
              name: 'list',
              hideInMenu: false,
            },
            {
              path: '/member/family',
              name: 'family',
              hideInMenu: false,
            },
          ],
        },
      ];
      // const response = yield call(getMenuData);
      yield put({
        type: 'saveMenuData',
        payload: menuData,
      });
      if (callback) {
        callback(menuData);
      }
      return menuData;
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

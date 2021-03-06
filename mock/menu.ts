import { Request, Response } from 'express';

const menuData = [
  {
    path: '/homepage',
    name: 'homepage',
    icon: 'home',
  },
  // {
  //   path: '/module1',
  //   icon: 'table',
  //   name: 'module1',
  //   children: [
  //     {
  //       path: '/module1/similarTable',
  //       name: 'similarTable',
  //       hideInMenu: false,
  //     },
  //   ],
  // },
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
    ],
  },
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  // },
];

function getMenuData(req: Request, res: Response) {
  return res.json(menuData);
}

export default {
  'GET /api/getMenuData': getMenuData,
};

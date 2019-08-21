import { Request, Response } from 'express';

const menuData = [
  {
    path: '/',
    name: 'homepage',
    icon: 'home',
  },
  {
    path: '/module1',
    icon: 'table',
    name: 'module1',
    children: [
      {
        path: '/module1/similarTable',
        name: 'similarTable',
        hideInMenu: false,
      },
    ],
  },
];

function getMenuData(req: Request, res: Response) {
  return res.json(menuData);
}

export default {
  '/api/auth_routes': {
    '/form/advanced-form': { authority: ['admin', 'user'] },
  },
  'GET /api/getMenuData': getMenuData,
};

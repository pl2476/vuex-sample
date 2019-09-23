import { Request, Response } from 'express';

function getFakeCaptcha(req: Request, res: Response) {
  return res.json('captcha-xxx');
}
// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  'GET  /api/login/captcha': getFakeCaptcha,
};

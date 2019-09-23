import { Request, Response } from 'express';

const getNotices = (req: Request, res: Response) => {
  res.json([
    {
      id: '000000001',
      avatar: '',
      title: '',
      datetime: '',
      type: 'notification',
    },
  ]);
};

export default {
  'GET /api/notices': getNotices,
};

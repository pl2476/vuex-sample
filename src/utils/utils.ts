import { parse } from 'querystring';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export interface TreeNode {
  id: string | number;
  name: string;
  parentId: string;
  children: TreeNode[];
}

const getParents = (data: TreeNode[], id: string): TreeNode['id'][] => {
  let res: TreeNode['id'][] = [];
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].id === id) {
      res = [data[i].id];
    }
    if (data[i].children) {
      const ro = getParents(data[i].children, id);
      if (ro !== undefined) {
        res = ro.concat(data[i].id);
      }
    }
  }
  return res;
};
export const getTreeNodeParent = (data: TreeNode[], nodeId: string) => {
  const res = getParents(data, nodeId);
  if (res) {
    return res.reverse();
  }
  return [];
};

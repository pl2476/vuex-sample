import request from '@/utils/request';
import { TableListParams } from '@/pages/Product/Category/data';

export async function query(params: TableListParams) {
  return request('/system/category/list', {
    params,
  });
}

export async function remove(ids: string[]) {
  return request('/system/category/delete', {
    method: 'delete',
    data: {
      ids,
    },
  });
}

export async function add(params: TableListParams) {
  return request('/system/category/create', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function get(id: string) {
  return request(`/system/category/get/${id}`, {});
}

export async function update(params: TableListParams) {
  return request('/system/category/update', {
    method: 'put',
    data: {
      ...params,
    },
  });
}

export async function exportList(params: TableListParams) {
  return request('/system/category/export', {
    params,
  });
}

export async function treeOptions(params: TableListParams) {
  return request('/system/category/treeOption', {
    params,
  });
}

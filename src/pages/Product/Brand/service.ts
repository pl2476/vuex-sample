import request from '@/utils/request';
import { TableListParams } from '@/pages/Product/Brand/data';

export async function query(params: TableListParams) {
  return request('/system/brand/list', {
    params,
  });
}

export async function remove(ids: string[]) {
  return request('/system/brand/delete', {
    method: 'delete',
    data: {
      ids,
    },
  });
}

export async function add(params: TableListParams) {
  return request('/system/brand/create', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function get(id: string) {
  return request(`/system/brand/get/${id}`, {});
}

export async function update(params: TableListParams) {
  return request('/system/brand/update', {
    method: 'put',
    data: {
      ...params,
    },
  });
}

export async function exportList(params: TableListParams) {
  return request('/system/brand/export', {
    params,
  });
}

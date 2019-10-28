import request from '@/utils/request';
import { TableListParams } from '@/pages/Product/Bundle/data';

export async function query(params: TableListParams) {
  return request('/system/bundle/list', {
    params,
  });
}

export async function remove(ids: string[]) {
  return request('/system/bundle/delete', {
    method: 'delete',
    data: {
      ids,
    },
  });
}

export async function add(params: TableListParams) {
  return request('/system/bundle/create', {
    method: 'post',
    data: {
      ...params,
    },
  });
}

export async function get(id: string) {
  return request(`/system/bundle/get/${id}`, {});
}

export async function update(params: TableListParams) {
  return request('/system/bundle/update', {
    method: 'put',
    data: {
      ...params,
    },
  });
}

export async function exportList(params: TableListParams) {
  return request('/system/bundle/export', {
    params,
  });
}

export async function getProduct() {
  return request('/system/bundle/getProduct', {
    method: 'get',
  });
}

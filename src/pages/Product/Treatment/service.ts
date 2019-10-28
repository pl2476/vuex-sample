import request from '@/utils/request';
import { TableListParams } from '@/pages/Product/Treatment/data';

export async function query(params: TableListParams) {
  return request('/system/treatment/list', {
    params,
  });
}

export async function remove(ids: string[]) {
  return request('/system/treatment/delete', {
    method: 'delete',
    data: {
      ids,
    },
  });
}

export async function deleteOption(payload: object) {
  return request('/system/treatment/deleteOption', {
    method: 'delete',
    data: payload,
  });
}

export async function add(params: TableListParams) {
  return request('/system/treatment/create', {
    method: 'post',
    data: {
      ...params,
    },
  });
}

export async function get(id: string) {
  return request(`/system/treatment/get/${id}`, {});
}

export async function update(params: TableListParams) {
  return request('/system/treatment/update', {
    method: 'put',
    data: {
      ...params,
    },
  });
}

export async function exportList(params: TableListParams) {
  return request('/system/treatment/export', {
    params,
  });
}

export async function categoryOption() {
  return request('/system/treatment/categoryOption', {
    method: 'get',
  });
}

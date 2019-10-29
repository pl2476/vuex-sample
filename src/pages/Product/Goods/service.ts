import request from '@/utils/request';
import { TableListParams } from '@/pages/Product/Goods/data';

export async function query(params: TableListParams) {
  return request('/system/goods/list', {
    params,
  });
}

export async function brandList(params: TableListParams) {
  return request('/system/brand/list', {
    params,
  });
}

export async function supplierList(params: TableListParams) {
  return request('/system/supplier/list', {
    params,
  });
}

export async function remove(ids: string[]) {
  return request('/system/goods/delete', {
    method: 'delete',
    data: {
      ids,
    },
  });
}

export async function deleteOption(payload: object) {
  return request('/system/goods/deleteOption', {
    method: 'delete',
    data: payload,
  });
}

export async function add(params: TableListParams) {
  return request('/system/goods/create', {
    method: 'post',
    data: {
      ...params,
    },
  });
}

export async function get(id: string) {
  return request(`/system/goods/get/${id}`, {});
}

export async function update(params: TableListParams) {
  return request('/system/goods/update', {
    method: 'put',
    data: {
      ...params,
    },
  });
}

export async function exportList(params: TableListParams) {
  return request('/system/goods/export', {
    params,
  });
}

export async function categoryOption() {
  return request('/system/goods/categoryOption', {
    method: 'get',
  });
}

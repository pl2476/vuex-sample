import request from '@/utils/request';
import { TableListParams } from '@/pages/Member/List/data';

export async function query(params: TableListParams) {
  return request('/system/familyDetail/list', {
    params,
  });
}

export async function remove(id: string[]) {
  return request('/system/familyDetail/delete', {
    method: 'put',
    data: {
      id,
    },
  });
}

export async function add(params: TableListParams) {
  return request('/system/familyDetail/create', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function get(id: string) {
  return request(`/system/familyDetail/get/${id}`, {});
}

export async function update(params: TableListParams) {
  return request('/system/familyDetail/update', {
    method: 'put',
    data: {
      ...params,
    },
  });
}

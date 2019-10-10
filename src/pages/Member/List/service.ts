import request from '@/utils/request';
import { TableListParams } from '@/pages/Member/List/data';

export async function queryMember(params: TableListParams) {
  return request('/proxy/system/member/list', {
    params,
  });
}

export async function removeMember(params: TableListParams) {
  return request('/proxy/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addMember(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateMember(params: TableListParams) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

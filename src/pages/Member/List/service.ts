import request from '@/utils/request';
import { TableListParams } from '@/pages/Member/List/data';

export async function queryMember(params: TableListParams) {
  return request('/system/member/list', {
    params,
  });
}

export async function removeMember(memberCode: string) {
  return request('/system/member/delete', {
    method: 'put',
    data: {
      memberCode,
    },
  });
}

export async function addMember(params: TableListParams) {
  return request('/system/member/create', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getMember(memberCode: string) {
  return request(`/system/member/get/${memberCode}`, {});
}

export async function updateMember(params: TableListParams) {
  return request('/system/member/update', {
    method: 'put',
    data: {
      ...params,
    },
  });
}

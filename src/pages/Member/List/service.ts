import request from '@/utils/request';
import { TableListParams } from '@/pages/Member/List/data';

export async function queryMember(params: TableListParams) {
  return request('/system/member/list', {
    params,
  });
}

export async function removeMember(memberCodes: string[]) {
  return request('/system/member/delete', {
    method: 'put',
    data: {
      memberCodes,
    },
  });
}

export async function addMember(params: TableListParams) {
  return request('/system/member/create', {
    method: 'POST',
    data: {
      ...params,
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

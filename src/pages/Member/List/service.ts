import request from '@/utils/request';
import { TableListParams } from '@/pages/Member/List/data';

export async function queryMember(params: TableListParams) {
  return request('http://52.193.131.42:8889/system/member/list', {
    params,
  });
}

export async function removeMember(memberCode: string) {
  return request('http://52.193.131.42:8889/system/member/delete', {
    method: 'put',
    data: {
      memberCode,
    },
  });
}

export async function addMember(params: TableListParams) {
  return request('http://52.193.131.42:8889/system/member/create', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function getMember(memberCode: string) {
  return request(`http://52.193.131.42:8889/system/member/get/${memberCode}`, {});
}

export async function updateMember(params: TableListParams) {
  return request('http://52.193.131.42:8889/system/member/update', {
    method: 'put',
    data: {
      ...params,
    },
  });
}

import request from '@/utils/request';

export interface LoginParamsType {
  username: string;
  password: string;
  mobile?: string;
  captcha?: string;
  isLogout?: boolean;
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function login(params: LoginParamsType) {
  return request(`/proxy/login?username=${params.username}&password=${params.password}`, {
    method: 'POST',
    data: params,
  });
}

export async function logout(params: LoginParamsType) {
  return request('/proxy/logout', {
    method: 'POST',
    data: params,
  });
}

// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除规则 DELETE /api/rule */
export async function getUsers(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/users', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 删除规则 DELETE /api/rule */
export async function getUserGroups(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/groups', {
    method: 'GET',
    ...(options || {}),
  });
}

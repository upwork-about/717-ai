// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function getConfigAgreement(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/config/agreements', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function getFields(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/config/fields', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function getContextLists(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/config/agreements?context_only=true', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function getDataTypes(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/v1/config/field_types', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function getMasterData(options: { tab: 1 | 2 | 3; query?: any }) {
  let url = `/api/v1/masterdata/${options.tab}`;
  if (options.query) {
    url = url + options.query;
  }
  return request<Record<string, any>>(url, {
    method: 'GET',
    ...(options || {}),
  });
}

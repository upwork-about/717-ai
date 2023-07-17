// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function getConfigAgreement(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/config/agreements', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function getFields(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/config/fields', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function getContextLists(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/config/agreements?context_only=true', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function getDataTypes(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/config/field_types', {
    method: 'GET',
    ...(options || {}),
  });
}

// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除规则 DELETE /api/rule */
export async function getAgreementType(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/agreements/types', {
    method: 'GET',
    ...(options || {}),
  });
}

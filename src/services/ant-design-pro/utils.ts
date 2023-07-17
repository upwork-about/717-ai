// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除规则 DELETE /api/rule */
export async function getPDFMappingsContext(name: string, config_id: string) {
  const url =
    name === null
      ? `/api/utils/pdf/mappings`
      : config_id
      ? `/api/utils/pdf/mappings?mapped_to=${name}&agreement_config_id=${config_id}`
      : `/api/utils/pdf/mappings?mapped_to=${name}`;
  return request<Record<string, any>>(url, {
    method: 'GET',
  });
}
export async function getPDFMappings(name: string) {
  const url =
    name === null ? `/api/utils/pdf/mappings` : `/api/utils/pdf/mappings?mapped_to=${name}`;
  return request<Record<string, any>>(url, {
    method: 'GET',
  });
}

// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

export async function getConfigAgreement(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/config/agreements', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function createConfigAgreement(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/config/agreements', {
    method: 'POST',
    ...(options || {}),
  });
}
export async function getFormType(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/utils/form/types', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function getAgreementsConfigDetail(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/config/agreements/details', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function getAgreementsConfigDetailGeneral(id: number) {
  return request<Record<string, any>>(`/config/agreements/${id}`, {
    method: 'GET',
  });
}
export async function deleteConfigAgreement(id: number, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/config/agreements/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
export async function updateConfigAgreementSetting(id: number, data: any) {
  return request<Record<string, any>>(`/config/agreements/${id}/setting`, {
    method: 'PUT',
    data,
  });
}
export async function updateConfigAgreement(id: number, data: any) {
  return request<Record<string, any>>(`/config/agreements/${id}`, {
    method: 'PUT',
    data,
  });
}
export async function copyConfigAgreement(id: number, data: any) {
  return request<Record<string, any>>(`/config/agreements/copy/${id}`, {
    method: 'POST',
    data,
  });
}
export async function getConfigFields(data: { mapped_to: string; config_id: string }) {
  return request<Record<string, any>>(`/config/fields`, {
    method: 'GET',
    params: data,
  });
}

export async function getFields(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/config/fields', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function getContextList(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/config/agreements?context_only=true', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function getDataType(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/config/field_types', {
    method: 'GET',
    ...(options || {}),
  });
}
export async function getPDFMappingsContext(mapped_to: string, config_id: string) {
  const url =
    mapped_to === null
      ? `/utils/pdf/mappings`
      : config_id
      ? `/utils/pdf/mappings?mapped_to=${mapped_to}&agreement_config_id=${config_id}`
      : `/utils/pdf/mappings?mapped_to=${mapped_to}`;
  return request<Record<string, any>>(url, {
    method: 'GET',
  });
}
export async function getPDFMappings(mapped_to: string) {
  const url =
    mapped_to === null ? `/utils/pdf/mappings` : `/utils/pdf/mappings?mapped_to=${mapped_to}`;
  return request<Record<string, any>>(url, {
    method: 'GET',
  });
}

export async function getMasterData(options: { tab: 1 | 2 | 3; query?: any }) {
  let url = `/masterdata/${options.tab}`;
  if (options.query) {
    url = url + options.query;
  }
  return request<Record<string, any>>(url, {
    method: 'GET',
    ...(options || {}),
  });
}

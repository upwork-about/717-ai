import { getAgreementType } from '@/services/ant-design-pro/agreement';
import { getAgreementsConfigDetail } from '@/services/ant-design-pro/config';
import { useRequest } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const {
    data: agreementConfigDetailOptions,
    error,
    loading,
  } = useRequest(async () => {
    let res = await getAgreementsConfigDetail();
    return { data: res };
  });

  return {
    agreementConfigDetailOptions,
  };
};

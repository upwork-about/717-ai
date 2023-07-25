import { getAgreementType } from '@/services/ant-design-pro/agreement';
import { getAgreementsConfigDetail } from '@/services/ant-design-pro/config';
import { useRequest } from '@umijs/max';
import { message } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const [agreementType, setAgreementType] = useState<{ total: number; types: any[] } | null>(null);
  // const [agreementConfigDetailOptions, setAgreementConfigDetailOptions] = useState<{
  //   steps: any[];
  //   types: any[];
  // } | null>(null);

  const {
    data: agreementConfigDetailOptions,
    error,
    loading,
  } = useRequest(async () => {
    let res = await getAgreementsConfigDetail();
    return { data: res };
  });
  // const getAgreementsConfigDetailModel = async () => {
  //   let response: any | null = null;
  //   try {
  //     response = (await getAgreementsConfigDetail()) as any[];
  //   } catch (error: any) {
  //     if (error.message) {
  //       message.error(error.message);
  //     } else {
  //       message.error('Something went wrong');
  //     }
  //   }
  //   setAgreementConfigDetailOptions(response);
  //   return response;
  // };

  const getTypeCount = async () => {
    let agreementResponse: any[] | null = null;
    try {
      agreementResponse = (await getAgreementType()) as any[];
    } catch (error: any) {
      if (error.message) {
        message.error(error.message);
      } else {
        message.error('Something went wrong');
      }
    }

    if (agreementResponse?.length && agreementResponse?.length > 0) {
      const totalCount = agreementResponse?.reduce((sum, obj) => sum + obj.count, 0);
      setAgreementType({ total: totalCount, types: agreementResponse });
      return agreementResponse;
    }
  };

  return {
    agreementType,
    getTypeCount,
    agreementConfigDetailOptions,
  };
};

import { getAgreementType } from '@/services/ant-design-pro/agreement';
import { message } from 'antd';
import { useEffect, useState } from 'react';

export default () => {
  const [agreementType, setAgreementType] = useState<{ total: number; types: any[] } | null>(null);
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
  };
};

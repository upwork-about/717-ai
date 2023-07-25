import React from 'react';
import { Button, Input, Popover } from 'antd';
import { PageContainer, ProCard } from '@ant-design/pro-components';

import Config from './Config';
import General from './General';
import Version from './Version';
import { useParams, useRequest } from '@umijs/max';
import { getAgreementsConfigDetailGeneral } from '@/services/ant-design-pro/config';
const BalanceForm: React.FC = () => {
  const params = useParams();
  const id = params.id as any;
  const { data, error, loading } = useRequest(async () => {
    return await getAgreementsConfigDetailGeneral(id);
  });
  return (
    <PageContainer
      loading={loading}
      fixedHeader
      header={{
        title: 'Agreement Configuration',
        subTitle: data?.agreement_type + data?.agreement_subtype,
      }}
      tabList={[
        {
          tab: 'General',
          key: '1',
          children: <General data={data} />,
        },
        {
          tab: 'Configuration',
          key: '2',
          children: <Config data={data} />,
        },
        {
          tab: 'Versions',
          key: '3',
          children: <Version data={data} />,
        },
      ]}
    ></PageContainer>
  );
};
export default BalanceForm;

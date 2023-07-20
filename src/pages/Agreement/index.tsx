import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { history, useIntl, useParams, useRequest } from '@umijs/max';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import TableFormBlock from '@/components/TableFormBlock';
import { getAgreementType } from '@/services/ant-design-pro/agreement';
import Agreement from './item/Agreement';
const TableList: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const { data, error, loading } = useRequest(async () => {
    let res = await getAgreementType();
    return { data: res };
  });
  console.log(data, 'agreementType');

  const tabList = data?.map((item: any) => {
    return {
      name: item.name,
      tab: `${item.name}(${item.count})`,
      key: item.name.toLowerCase(),
      children: <Agreement name={item.name} />,
    };
  });

  const activeKey = tabList?.find((item: any) => item.key === id)?.key;
  console.log(activeKey, 'activeKey');
  return (
    // <PageContainer>
    //   <TableFormBlock />
    // </PageContainer>
    <PageContainer
      fixedHeader
      tabActiveKey={activeKey}
      tabList={tabList}
      onTabChange={(activeTabKey) => history.push(`/agreements/${activeTabKey}`)}
    ></PageContainer>
  );
};

export default TableList;

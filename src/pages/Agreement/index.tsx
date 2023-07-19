import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useParams, useRequest } from '@umijs/max';
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
      key: item.id.toString(),
      children: <Agreement name={item.name} />,
    };
  });

  const activeKey = tabList?.find((item: any) => item.name.toLowerCase() === id)?.key;
  console.log(activeKey, 'activeKey');
  return (
    // <PageContainer>
    //   <TableFormBlock />
    // </PageContainer>
    <PageContainer
      fixedHeader
      header={{
        title: 'Master Data Configuration',
      }}
      tabActiveKey={activeKey}
      tabList={tabList}
    ></PageContainer>
  );
};

export default TableList;

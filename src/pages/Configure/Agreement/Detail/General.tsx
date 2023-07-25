import React, { useEffect, useRef } from 'react';
import { Button, Col, Input, Popover, Row, notification } from 'antd';
import {
  getAgreementsConfigDetailGeneral,
  getConfigFields,
  getFormType,
  updateConfigAgreementSetting,
} from '@/services/ant-design-pro/config';
import {
  BetaSchemaForm,
  FooterToolbar,
  ProCard,
  ProFormColumnsType,
  ProFormInstance,
} from '@ant-design/pro-components';
import { useModel, useParams } from '@umijs/max';
const AgreementDetail: React.FC<{ data: any }> = ({ data }) => {
  const params = useParams();
  const id = params.id as any;
  const formRef = useRef<ProFormInstance>();
  const { agreementConfigDetailOptions } = useModel('config');

  const updateSchema: ProFormColumnsType<any, 'text'>[] = [
    {
      title: 'Agreement Type',
      dataIndex: 'agreement_type',
      valueType: 'select',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },

      fieldProps: {
        options: agreementConfigDetailOptions?.types.map((item: any) => ({
          label: item?.name,
          value: item?.id,
        })),
      },
    },
    {
      title: 'Agreement Subtype',
      dataIndex: 'agreement_subtype',
      valueType: 'select',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      fieldProps: {
        options: (
          agreementConfigDetailOptions?.types
            ?.map(({ subtypes }: any) => subtypes)
            .flat(1)
            .filter(Boolean) || []
        ).map((item: any) => ({ label: item?.name, value: item?.id })),
      },
    },
    {
      title: 'Form Type',
      dataIndex: 'form_types',
      valueType: 'select',
      fieldProps: {
        mode: 'multiple',
      },

      request: async () => {
        let res = await getFormType();
        if (res) {
          return res?.map((item: string) => {
            return {
              label: item,
              value: item,
            };
          });
        }
        return [];
      },
    },
    {
      valueType: 'group',
      colProps: {
        span: 12,
      },
      columns: [
        {
          title: 'Proposal?',
          dataIndex: 'proposal',
          valueType: 'switch',
          colProps: {
            span: 8,
          },
        },
        {
          title: 'Extraction',
          dataIndex: 'extraction',
          valueType: 'switch',
          colProps: {
            span: 8,
          },
        },
        {
          title: 'Send to SAP',
          dataIndex: 'sap',
          valueType: 'switch',
          colProps: {
            span: 8,
          },
        },
      ],
    },
    {
      title: 'Add Step',
      dataIndex: 'steps',
      valueType: 'select',
      fieldProps: {
        mode: 'multiple',
        options: agreementConfigDetailOptions?.steps.map((item: any) => ({
          label: item.name,
          value: item.id,
        })),
      },
    },
  ];

  return (
    <ProCard direction="column">
      <BetaSchemaForm<any>
        key="edit"
        formRef={formRef}
        rowProps={{
          gutter: [16, 16],
        }}
        colProps={{
          span: 12,
        }}
        grid={true}
        onFinish={async (values) => {
          console.log(values);

          const params = {
            sub_type: values.agreement_subtype,
            type: values.agreement_type,
            form_types: values.form_types,
            additional_steps: values.steps,
          };
          let res = await updateConfigAgreementSetting(id, params);
          console.log(res);
          if (res) {
            notification.success({
              message: 'success update',
            });
          }
        }}
        request={async () => {
          let res = await getAgreementsConfigDetailGeneral(id);

          console.log(res, 'res');

          return {
            ...res.data,
            steps: res.data?.steps.map((item: any) => item.type_id),
          };
        }}
        columns={updateSchema}
      />
    </ProCard>
  );
};
export default AgreementDetail;

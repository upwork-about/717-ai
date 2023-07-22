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
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, Drawer, Input, Tag, message, notification } from 'antd';
import React, { ReactNode, useRef, useState } from 'react';
import {
  copyConfigAgreement,
  createConfigAgreement,
  deleteConfigAgreement,
  getAgreementsConfigDetail,
  getConfigAgreement,
  getConfigFields,
  getFormType,
} from '@/services/ant-design-pro/config';
import TableFormBlock from '@/components/TableFormBlock';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { data, error, loading } = useRequest(async () => {
    let res = await getAgreementsConfigDetail();
    actionRef.current?.reload();
    return { data: res };
  });

  const columns: ProColumns<API.ConfigAgreementItem>[] = [
    {
      title: 'Configuration ID',
      dataIndex: 'display_id',
      tip: 'The rule name is the unique key',
      valueType: 'textarea',
    },
    {
      title: 'Type',
      dataIndex: 'agreement_type',
      valueType: 'text',
    },
    {
      title: 'Subtype',
      dataIndex: 'agreement_subtype',
      valueType: 'text',
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      valueType: 'text',
    },
    {
      title: 'Last Edited Date',
      sorter: true,
      dataIndex: 'last_edited_date',
      valueType: 'text',
    },
    {
      title: 'Last Edited By',
      dataIndex: 'last_edited_by',
      valueType: 'text',
    },
    {
      title: 'Created At',
      dataIndex: 'creation_datetime',
      valueType: 'text',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text: ReactNode, record: Record<string, any>) => {
        const color = text === 'Draft' ? 'red' : 'blue';

        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];

  const createSchema = [
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
        options: data?.types.map((item: any) => ({
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
          data?.types
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
      convertValue: (value: string) => {
        return value?.split(',');
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
      title: 'Add Step',
      dataIndex: 'steps',
      valueType: 'select',
      fieldProps: {
        mode: 'multiple',
        options: data?.steps.map((item: any) => ({ label: item.name, value: item.id })),
      },
      convertValue: (value: any) => {
        return value?.map((item: any) => item.id);
      },
    },
  ];

  const updateSchema = [
    {
      valueType: 'dependency',
      name: ['steps', 'id'],
      columns: ({ steps, id }) => {
        return [
          {
            title: 'Section',
            valueType: 'group',
            colProps: {
              span: 24,
            },
            columns: [
              {
                title: 'Header',
                valueType: 'formList',
                dataIndex: 'sections',
                colProps: {
                  span: 24,
                },
                columns: [
                  {
                    valueType: 'group',
                    colProps: {
                      span: 24,
                    },
                    columns: [
                      {
                        title: 'Name',
                        dataIndex: 'name',
                        valueType: 'text',
                        colProps: {
                          span: 6,
                        },
                        formItemProps: {
                          rules: [
                            {
                              required: true,
                              message: '此项为必填项',
                            },
                          ],
                        },
                      },
                      {
                        title: 'Fields',
                        dataIndex: 'fields',
                        valueType: 'select',
                        colProps: {
                          span: 18,
                        },
                        fieldProps: {
                          mode: 'multiple',
                        },
                        request: async () => {
                          let res = await getConfigFields({
                            mapped_to: 'header',
                            config_id: id,
                          });
                          if (res) {
                            return res?.map((item: any) => {
                              return {
                                label: item.name,
                                value: item.id,
                              };
                            });
                          }
                          return [];
                        },
                        formItemProps: {
                          rules: [
                            {
                              required: true,
                              message: '此项为必填项',
                            },
                          ],
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ];
      },
    },
    {
      valueType: 'dependency',
      name: ['steps', 'id'],
      dataIndex: 'steps',
      columns: ({ steps, id }) => {
        console.log(steps, id, 'idsteps');
        const stragery: any = {
          1: 'line-item',
          2: 'clause',
          3: 'line-item',
          4: 'header',
        };
        let stepsArr = steps.map((item: any) => ({
          id: item.id,
          name: item.name,
          key: stragery[item.id] || 'header',
        }));

        const sectionArr = stepsArr?.map((step: any, index: number) => {
          return {
            title: step?.name,
            valueType: 'formList',
            dataIndex: `step${step.id}`,

            colProps: {
              span: 24,
            },
            columns: [
              {
                valueType: 'group',
                colProps: {
                  span: 24,
                },
                columns: [
                  {
                    title: 'Name',
                    dataIndex: 'name',
                    valueType: 'text',
                    colProps: {
                      span: 6,
                    },
                    formItemProps: {
                      rules: [
                        {
                          required: true,
                          message: '此项为必填项',
                        },
                      ],
                    },
                  },
                  {
                    title: 'Fields',
                    dataIndex: 'fields',
                    valueType: 'select',
                    colProps: {
                      span: 18,
                    },
                    fieldProps: {
                      mode: 'multiple',
                    },
                    request: async () => {
                      let res = await getConfigFields({
                        mapped_to: step.key,
                        config_id: id,
                      });
                      if (res) {
                        return res?.map((item: any) => {
                          return {
                            label: item.name,
                            value: item.id,
                          };
                        });
                      }
                      return [];
                    },
                    formItemProps: {
                      rules: [
                        {
                          required: true,
                          message: '此项为必填项',
                        },
                      ],
                    },
                  },
                ],
              },
            ],
          };
        });
        return [
          {
            title: 'Steps',
            valueType: 'group',
            colProps: {
              span: 24,
            },
            columns: sectionArr,
          },
        ];
      },
    },
  ];
  const duplicateSchema = [
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
        options: data?.types.map((item: any) => ({
          label: item?.name,
          value: item?.name,
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
          data?.types
            ?.map(({ subtypes }: any) => subtypes)
            .flat(1)
            .filter(Boolean) || []
        ).map((item: any) => ({ label: item?.name, value: item?.name })),
      },
    },
  ];
  return (
    <PageContainer>
      <TableFormBlock
        actions={{
          renderBefore: (record: Record<string, any>) => {
            if (record.status === 'Draft') {
              return ['view', 'edit', 'duplicate', 'delete'];
            } else {
              return ['view', 'edit', 'duplicate'];
            }
          },
        }}
        headerTitle={'Agreement Configuration'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary" onClick={() => {}}>
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={async () => {
          let res = await getConfigAgreement();
          console.log(res, 'res');
          return { data: res as any[], success: true, total: res.length };
        }}
        operation={{
          createSchema: createSchema as any,
          updateSchema: updateSchema as any,
          duplicateSchema: duplicateSchema as any,
          createRequest: async (values) => {
            let res = await createConfigAgreement({ data: values });
            return res;
          },
          updateRequest: async (values) => {
            console.log(values, 'values');
            // let res = await createConfigAgreement({ data: values });
            // return res;
          },
          duplicateRequest: async (values, record) => {
            let res = await copyConfigAgreement(record.id, values);
            return res;
          },
          deleteRequest: async (record) => {
            let res = await deleteConfigAgreement(record.id);
            if (res.status === 'success') {
              notification.success({
                message: res.message,
              });
            }
            return res;
          },
        }}
        columns={columns}
        rowSelection={{}}
      />
    </PageContainer>
  );
};

export default TableList;

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
import { FormattedMessage, request, history, useRequest, useModel } from '@umijs/max';
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
import { TableFormActionsProps } from '@/components/TableFormBlock/types';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // const { data, error, loading } = useRequest(async () => {
  //   let res = await getAgreementsConfigDetail();
  //   actionRef.current?.reload();
  //   return { data: res };
  // });

  const { agreementConfigDetailOptions: data } = useModel('config');

  const columns: ProColumns<API.ConfigAgreementItem>[] = [
    {
      title: 'Configuration ID',
      dataIndex: 'display_id',
      tip: 'The rule name is the unique key',
      valueType: 'textarea',
      sorter: true,
    },
    {
      title: 'Type',
      dataIndex: 'agreement_type',
      valueType: 'text',
      sorter: true,
    },
    {
      title: 'Subtype',
      dataIndex: 'agreement_subtype',
      valueType: 'text',
      sorter: true,
    },
    {
      title: 'Created By',
      dataIndex: 'created_by',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: 'Last Edited Date',
      dataIndex: 'last_edited_date',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: 'Last Edited By',
      dataIndex: 'last_edited_by',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: 'Created At',
      dataIndex: 'creation_datetime',
      valueType: 'dateTime',
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text: ReactNode, record: Record<string, any>) => {
        const color = record.status === 'Draft' ? 'red' : 'blue';

        return <Tag color={color}>{text}</Tag>;
      },
      valueEnum: {
        Draft: { text: 'Draft' },
        Active: {
          text: 'Active',
        },
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
    },
  ];

  const updateSchema = [
    {
      valueType: 'dependency',
      name: ['steps', 'id'],
      columns: ({ steps, id }: any) => {
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
      columns: ({ steps, id }: any) => {
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

  const exportRecord = async (record: Record<string, any>) => {
    const api_url = `/export/config/${record.id}/agreements`;
    try {
      const response = await request(api_url, { method: 'GET' });
      console.log(response, 'response');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      const timestamp = new Date().getTime();
      link.download = `config_${record.id}_${timestamp}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // no-op
      console.log(error, 'error');
    }
  };
  return (
    <PageContainer>
      <TableFormBlock
        actions={{
          renderBefore: (record: Record<string, any>) => {
            const actionDict = [
              'view',
              <a key="edit" onClick={() => history.push(`/configure/agreement/${record.id}`)}>
                Edit
              </a>,
              <a key="export" onClick={() => exportRecord(record)}>
                Export
              </a>,
              'duplicate',
            ];
            if (record.status === 'Draft') {
              actionDict.push('delete');
            }
            return actionDict;
          },
          schema: {
            createSchema: createSchema as any,
            updateSchema: updateSchema as any,
            duplicateSchema: duplicateSchema as any,
          },
          request: {
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
        columns={columns}
        rowSelection={{}}
      />
    </PageContainer>
  );
};

export default TableList;

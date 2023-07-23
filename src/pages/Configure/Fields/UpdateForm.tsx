import React, { useState } from 'react';
import { Button, Input, Modal, Popover } from 'antd';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { ALPHANUMERIC_REGEX, FORM_TYPE_DATA } from './constants';
import {
  getContextList,
  getDataType,
  getPDFMappings,
  getPDFMappingsContext,
} from '@/services/ant-design-pro/config';
const UpdateForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [configId, setConfigId] = useState('');
  const [mappedTo, setMappedTo] = useState('');
  const updateSchema = [
    [
      {
        title: 'Name',
        dataIndex: 'name',
        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Please Input',
            },
            { pattern: ALPHANUMERIC_REGEX, message: 'Name Only Contains Alphanumeric' },
          ],
        },
      },
      {
        title: 'SAP Technical Name',
        dataIndex: 'sap_technical_name',
      },

      {
        title: 'Context',
        dataIndex: 'config_id',
        valueType: 'select',
        fieldProps: {
          onChange: (v: string) => {
            setConfigId(v);
          },
        },

        request: async () => {
          let res = await getContextList();
          if (res) {
            return res?.map((item: any) => {
              return {
                label: item.context,
                value: item.id,
              };
            });
          }
          return [];
        },
      },
      {
        title: 'Technical Name',
        dataIndex: 'technical_name',
      },
      {
        valueType: 'group',
        colProps: {
          span: 24,
        },
        columns: [
          {
            title: 'Visible',
            dataIndex: 'is_visible',
            valueType: 'switch',
            colProps: {
              span: 8,
            },
          },
          {
            title: 'Required',
            dataIndex: 'is_required',
            valueType: 'switch',
            colProps: {
              span: 8,
            },
          },
          {
            title: 'Live',
            dataIndex: 'is_live',
            valueType: 'switch',
            colProps: {
              span: 8,
            },
          },
        ],
      },
    ],
    [
      {
        title: 'Field Type',
        dataIndex: 'mapped_to',
        valueType: 'select',

        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Please Input',
            },
          ],
        },
        fieldProps: {
          options: FORM_TYPE_DATA,
          onChange: (v: string) => {
            setMappedTo(v);
          },
        },
      },
      {
        title: 'Data Type',
        dataIndex: 'type',
        valueType: 'select',

        formItemProps: {
          rules: [
            {
              required: true,
              message: 'Please Input',
            },
          ],
        },
        request: async () => {
          let res = await getDataType();
          if (res) {
            return res?.map((item: any) => {
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
        valueType: 'dependency',
        name: ['type'],
        columns: ({ type }: any) => {
          if (type === 'Choice') {
            return [
              {
                title: 'Field Values',
                dataIndex: 'choices',
                valueType: 'select',

                fieldProps: {
                  mode: 'tags',
                },
              },
            ];
          }
          return [];
        },
      },
    ],
    [
      {
        valueType: 'group',
        colProps: {
          span: 24,
        },
        columns: [
          {
            title: 'Is Master Data?',
            dataIndex: 'is_master_data',
            valueType: 'switch',
            colProps: {
              span: 6,
            },
          },
          {
            valueType: 'dependency',
            name: ['is_master_data'],
            columns: ({ is_master_data }: any) => {
              if (!!is_master_data) {
                return [
                  {
                    title: 'Label',
                    dataIndex: 'name',
                  },
                ];
              }
              return [];
            },
          },
        ],
      },
      {
        valueType: 'group',
        colProps: {
          span: 24,
        },
        columns: [
          {
            title: 'Is Cascade?',
            dataIndex: 'is_cascade',
            valueType: 'switch',
            colProps: {
              span: 6,
            },
          },
          {
            valueType: 'dependency',
            name: ['is_cascade'],
            columns: ({ is_cascade }: any) => {
              if (!!is_cascade) {
                return [
                  {
                    title: 'Label',
                    dataIndex: 'cascade_name',
                  },
                ];
              }
              return [];
            },
          },
        ],
      },
      {
        valueType: 'group',
        colProps: {
          span: 24,
        },
        columns: [
          {
            title: 'AI Extraction?',
            dataIndex: 'is_pdf_field',
            valueType: 'switch',
            colProps: {
              span: 6,
            },
          },
          {
            valueType: 'dependency',
            name: ['is_pdf_field'],
            columns: ({ is_pdf_field }: any) => {
              console.log(is_pdf_field, mappedTo, configId, ' is_pdf_field, config_id, mapped_to');
              if (!!is_pdf_field) {
                return [
                  {
                    title: 'AI Mapped Field',
                    dataIndex: 'pdf_field_name',
                    valueType: 'select',

                    request: async () => {
                      let response;
                      if (configId) {
                        response = await getPDFMappingsContext(mappedTo, configId);
                      } else {
                        response = await getPDFMappings(mappedTo);
                      }
                      if (response) {
                        return response?.map((item: any) => {
                          return {
                            label: item,
                            value: item,
                          };
                        });
                      }
                      return [];
                    },
                  },
                ];
              }
              return [];
            },
          },
        ],
      },
      {
        valueType: 'group',
        colProps: {
          span: 24,
        },
        columns: [
          {
            title: 'Is Calculated?',
            dataIndex: 'is_calculate',
            valueType: 'switch',
            colProps: {
              span: 6,
            },
          },
          {
            valueType: 'dependency',
            name: ['is_calculate'],
            columns: ({ is_calculate }: any) => {
              if (!!is_calculate) {
                return [
                  {
                    title: 'Field',
                    dataIndex: 'formType',
                    valueType: 'select',

                    fieldProps: {
                      options: FORM_TYPE_DATA,
                    },
                    colProps: {
                      span: 6,
                    },
                  },
                  {
                    title: 'Operator',
                    dataIndex: 'formType',
                    valueType: 'select',

                    fieldProps: {
                      options: FORM_TYPE_DATA,
                    },
                    colProps: {
                      span: 6,
                    },
                  },
                  {
                    title: 'Field',
                    dataIndex: 'formType',
                    valueType: 'select',

                    fieldProps: {
                      options: FORM_TYPE_DATA,
                    },
                    colProps: {
                      span: 6,
                    },
                  },
                ];
              }
              return [];
            },
          },
        ],
      },
    ],
  ];

  return (
    <div>
      <a onClick={() => setOpen(true)}>Edit</a>
      <BetaSchemaForm<any>
        layoutType={'StepsForm'}
        stepsFormRender={(dom, submitter) => {
          return (
            <Modal
              title="Steps Form"
              width={800}
              onCancel={() => setOpen(false)}
              open={open}
              footer={submitter}
              destroyOnClose
            >
              {dom}
            </Modal>
          );
        }}
        steps={[
          {
            title: 'Details',
          },
          {
            title: 'Type',
          },
          {
            title: 'Mapping',
          },
        ]}
        rowProps={{
          gutter: [16, 16],
        }}
        colProps={{
          span: 12,
        }}
        onFinish={async (values) => {
          console.log(values);
        }}
        columns={updateSchema as any}
      />
    </div>
  );
};
export default UpdateForm;

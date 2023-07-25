import React, { useRef } from 'react';
import { Button, Input, Popover, notification } from 'antd';
import {
  getAgreementsConfigDetailGeneral,
  getConfigFields,
  updateConfigAgreement,
} from '@/services/ant-design-pro/config';
import {
  BetaSchemaForm,
  ProCard,
  ProFormColumnsType,
  ProFormInstance,
} from '@ant-design/pro-components';
import { useParams } from '@umijs/max';
const AgreementDetail: React.FC<{ data: any }> = ({ data }) => {
  const params = useParams();
  const id = params.id as any;
  const formRef = useRef<ProFormInstance>();
  const updateSchema: ProFormColumnsType<any, 'text'>[] = [
    {
      valueType: 'dependency',
      name: ['id'],
      columns: ({ id }: any) => {
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
          4: 'line-item',
        };
        let stepsArr = steps.map((item: any) => ({
          id: item.id,
          name: item.name,
          key: stragery[item.type_id],
          type_id: item.type_id,
        }));
        console.log(stepsArr, 'steps');

        const sectionArr = stepsArr?.map((step: any, index: number) => {
          if (step.type_id === 3) {
            return {
              title: step?.name,
              valueType: 'formList',
              dataIndex: `steps-${step.type_id}-${step.id}`,

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
          }
          return {
            title: step.name,
            dataIndex: `steps-${step.type_id}-${step.id}`,
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
          let steps: any[] = [];
          Object.keys(values).forEach((key) => {
            if (key.includes('steps')) {
              let keyArr = key.split('-');
              let pa = {
                id: keyArr[2],
                type_id: keyArr[1],
                fields: values[key],
              };
              if (typeof values[key][0] === 'object') {
                pa = values[key];
              }
              steps.push(pa);
            }
          });
          const params = {
            sections: values.sections,
            steps,
          };
          let res = await updateConfigAgreement(id, params);
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
          const returnData = { ...res.data };
          res.data.steps.forEach((step: any) => {
            returnData[`step-${step.type_id}`] = step;
          });

          return {
            ...res.data,
          };
        }}
        columns={updateSchema}
      />
    </ProCard>
  );
};
export default AgreementDetail;

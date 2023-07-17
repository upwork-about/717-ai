import {
  ProForm,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  StepsForm,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Modal } from 'antd';
import React from 'react';
import { ALPHANUMERIC_REGEX, FORM_TYPE_DATA } from './constants';
import { getContextLists, getDataTypes } from '@/services/ant-design-pro/config';
import { getPDFMappings, getPDFMappingsContext } from '@/services/ant-design-pro/utils';

export type FormValueType = {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
} & Partial<API.ConfigAgreementItem>;

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: Partial<API.ConfigAgreementItem>;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const intl = useIntl();
  return (
    <StepsForm
      stepsProps={{
        size: 'small',
      }}
      stepsFormRender={(dom, submitter) => {
        return (
          <Modal
            width={900}
            bodyStyle={{ padding: '32px 40px 48px' }}
            destroyOnClose
            title={intl.formatMessage({
              id: 'pages.searchTable.updateForm.ruleConfig',
              defaultMessage: '规则配置',
            })}
            open={props.updateModalOpen}
            footer={submitter}
            onCancel={() => {
              props.onCancel();
            }}
          >
            {dom}
          </Modal>
        );
      }}
      onFinish={props.onSubmit}
    >
      <StepsForm.StepForm
        initialValues={{
          name: props.values.display_id,
          desc: props.values.agreement_type,
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.basicConfig',
          defaultMessage: '基本信息',
        })}
      >
        <ProFormText
          name="name"
          label={'Name'}
          width="md"
          rules={[
            { required: true, message: 'Please input your name' },
            { pattern: ALPHANUMERIC_REGEX, message: 'Name Only Contains Alphanumeric' },
          ]}
        />
        <ProFormText name="sap_technical_name" label={'SAP Technical Name'} width="md" />
        <ProFormSelect
          name="config_id"
          label={'Context'}
          width="md"
          request={async () => {
            let res = await getContextLists();
            return res.map((item: any) => ({ label: item.context, value: item.id }));
          }}
        />
        <ProFormText name="technical_name" label="Technical Name" width="md" />
        <ProFormSwitch name="is_visible" label="Visible" />
        <ProFormSwitch name="is_required" label="Required" />
        <ProFormSwitch name="is_live" label="Live" />
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          target: '0',
          template: '0',
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.ruleProps.title',
          defaultMessage: '配置规则属性',
        })}
      >
        <ProFormSelect name="mapped_to" width="md" label="Field Type" options={FORM_TYPE_DATA} />
        <ProFormSelect
          name="type"
          label={'Data Type'}
          width="md"
          request={async () => {
            const res = await getDataTypes();
            return res.map((item: any) => ({ label: item, value: item }));
          }}
        />
        <ProForm.Item noStyle shouldUpdate>
          {(form) => {
            return form.getFieldValue('type') === 'Choice' ? (
              <ProFormText name="choices" label="Technical Name" width="md" />
            ) : null;
          }}
        </ProForm.Item>
      </StepsForm.StepForm>
      <StepsForm.StepForm
        initialValues={{
          type: '1',
          frequency: 'month',
        }}
        title={intl.formatMessage({
          id: 'pages.searchTable.updateForm.schedulingPeriod.title',
          defaultMessage: '设定调度周期',
        })}
      >
        <ProForm.Group>
          <ProFormSwitch name="is_master_data" label="Is Master Data?" />
          <ProFormText name="name" label="Label" width="md" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSwitch name="is_cascade" label="Is Cascade?" />
          <ProFormText name="cascade_name" label="Link" width="md" />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSwitch name="is_pdf_field" label="AI Extraction?" />

          <ProForm.Item noStyle shouldUpdate>
            {(form) => {
              return (
                <ProFormSelect
                  name="type"
                  label={'Data Type'}
                  width="md"
                  request={async () => {
                    let config_id = form.getFieldValue('config_id');
                    let mapped_to = form.getFieldValue('mapped_to');
                    let response;
                    if (config_id) {
                      response = await getPDFMappingsContext(mapped_to, config_id);
                    } else {
                      response = await getPDFMappings(mapped_to);
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
                  }}
                />
              );
            }}
          </ProForm.Item>
        </ProForm.Group>
        <ProForm.Group>
          <ProFormSwitch name="is_calculate" label="Is Calculated?" />
          <ProFormSelect name="is_calculate" width="xs" label="Field" options={FORM_TYPE_DATA} />
          <ProFormSelect name="is_calculate" width="xs" label="Operator" options={FORM_TYPE_DATA} />
          <ProFormSelect
            name="is_calculate"
            width="xs"
            label="Field Type"
            options={FORM_TYPE_DATA}
          />
        </ProForm.Group>
      </StepsForm.StepForm>
    </StepsForm>
  );
};

export default UpdateForm;

import { ProFormColumnsType, ProTableProps } from '@ant-design/pro-components';
import { ReactNode } from 'react';

export type TableFormActionsProps = 'view' | 'edit' | 'duplicate' | 'delete' | ReactNode;

export type TableFormBlockProps = ProTableProps<any, any, any> & {
  actions?:
    | {
        btnList?: TableFormActionsProps[];
        renderBefore?: (record: Record<string, any>) => TableFormActionsProps[];
        dom?: {
          viewDom?: ReactNode | JSX.Element;
          editDom?: ReactNode | JSX.Element;
          duplicateDom?: ReactNode | JSX.Element;
        };
        schema?: {
          createSchema?: ProFormColumnsType[];
          updateSchema?: ProFormColumnsType[];
          duplicateSchema?: ProFormColumnsType[];
        };
        request?: {
          createRequest?: (data: any, record?: any) => Promise<any>;
          updateRequest?: (data: any, record?: any) => Promise<any>;
          deleteRequest?: (data: any, record?: any) => Promise<any>;
          duplicateRequest?: (data: any, record?: any) => Promise<any>;
        };
      }
    | false;
};

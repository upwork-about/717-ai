import { ProFormColumnsType, ProTableProps } from '@ant-design/pro-components';

export type TableFormBlockProps = ProTableProps<any, any, any> & {
  actions?:
    | {
        btnList?: ('view' | 'edit' | 'duplicate' | 'delete')[];
        renderBefore?: (
          record: Record<string, any>,
        ) => ('view' | 'edit' | 'duplicate' | 'delete')[];
      }
    | false;
  operation?: {
    createSchema?: ProFormColumnsType[];
    updateSchema?: ProFormColumnsType[];
    duplicateSchema?: ProFormColumnsType[];
    createRequest?: (data: any, record?: any) => Promise<any>;
    updateRequest?: (data: any, record?: any) => Promise<any>;
    deleteRequest?: (data: any, record?: any) => Promise<any>;
    duplicateRequest?: (data: any, record?: any) => Promise<any>;
  };
};

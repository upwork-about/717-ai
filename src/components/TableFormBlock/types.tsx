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
    createRequest?: (data: any) => Promise<any>;
    updateRequest?: (data: any) => Promise<any>;
    deleteRequest?: (data: any) => Promise<any>;
    duplicateRequest?: (data: any) => Promise<any>;
  };
};

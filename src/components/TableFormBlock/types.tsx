import { ProTableProps } from '@ant-design/pro-components';

export type TableFormBlockProps = ProTableProps<any, any, any> & {
  actions?: ('view' | 'edit' | 'duplicate' | 'delete')[] | false;
};

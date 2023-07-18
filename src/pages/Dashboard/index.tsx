import React from 'react';
import { Button, Calendar, Input, Popover } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import BarChart from './item/BarChart';
import TableFormBlock from '@/components/TableFormBlock';
import { PlusOutlined } from '@ant-design/icons';
import { getAgreements } from '@/services/ant-design-pro/agreement';
import PieChart from './item/PieChart';
import TableAgreement from './item/TableAgreement';
const Dashboard: React.FC = () => {
  return (
    <ProCard colSpan={0} gutter={[20, 20]} ghost>
      <ProCard colSpan={12} gutter={[20, 20]} wrap ghost>
        <ProCard colSpan={12} bordered title="Agreements by Status">
          <BarChart />
        </ProCard>
        <ProCard style={{ height: '100%' }} colSpan={12} bordered title="Agreements by Type">
          <PieChart />
        </ProCard>
        <ProCard bordered title="Calendar">
          <Calendar />;
        </ProCard>
      </ProCard>
      <ProCard style={{ height: '100%' }} colSpan={12} bordered title="Recent Agreements">
        <TableAgreement />
      </ProCard>
    </ProCard>
  );
};
export default Dashboard;

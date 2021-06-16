import * as React from 'react';
import { FC } from 'react';
import DollarIcon from '@material-ui/icons/AttachMoney';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';

const MonthlyRevenue = ({ value }) => {
  const translate = useTranslate();
  return (
    <CardWithIcon
      to="/orders"
      icon={DollarIcon}
      title={translate('pos.dashboard.monthly_revenue')}
      subtitle={value}
    />
  );
};

export default MonthlyRevenue;

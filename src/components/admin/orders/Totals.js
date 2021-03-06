import * as React from 'react';
import { FC } from 'react';
import classnames from 'classnames';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FieldProps, useTranslate } from 'react-admin';

const useStyles = makeStyles({
  container: { minWidth: '35em' },
  rightAlignedCell: { textAlign: 'right' },
  boldCell: { fontWeight: 'bold' },
});

const Totals = ({ record }) => {
  const classes = useStyles();
  const translate = useTranslate();

  return (
    <Table className={classes.container}>
      <TableBody>
        <TableRow>
          <TableCell>
            {translate('resources.commands.fields.basket.sum')}
          </TableCell>
          <TableCell className={classes.rightAlignedCell}>
            {record?.payment?.amount.toLocaleString(undefined, {
              style: 'currency',
              currency: 'USD',
            })}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            {translate('resources.commands.fields.basket.delivery')}
          </TableCell>
          <TableCell className={classes.rightAlignedCell}>
            {record?.payment?.amount.toLocaleString(undefined, {
              style: 'currency',
              currency: 'USD',
            })}
          </TableCell>
        </TableRow>
        {/* <TableRow>
          <TableCell>
            {translate('resources.commands.fields.basket.taxes')} (
            {record?.tax_rate.toLocaleString(undefined, {
              style: 'percent',
            })}
            )
          </TableCell>
          <TableCell className={classes.rightAlignedCell}>
            {record?.taxes.toLocaleString(undefined, {
              style: 'currency',
              currency: 'USD',
            })}
          </TableCell>
        </TableRow> */}
        <TableRow>
          <TableCell className={classes.boldCell}>
            {translate('resources.commands.fields.basket.total')}
          </TableCell>
          <TableCell
            className={classnames(
              classes.boldCell,
              classes.rightAlignedCell
            )}
          >
            {record?.payment?.amount.toLocaleString(undefined, {
              style: 'currency',
              currency: 'USD',
            })}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default Totals;

import React from 'react';
import { Select } from 'antd';

import { Table, TableBody, TableCell } from '@material-ui/core';
import { TableHead, TableRow } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import { useTranslate, useQueryWithStore } from 'react-admin';

import { useSelector } from 'react-redux';
import SiteLink from '../layout/SiteLink';
import { useFetch } from '../../../function/useFetch';

const useStyles = makeStyles({
  rightAlignedCell: { textAlign: 'right' },
});

const Basket = ({ record }) => {
  const { setFetch } = useFetch();

  const classes = useStyles();
  const translate = useTranslate();

  const user = useSelector(({ auth }) => auth?.user);

  const { loaded, data: products } = useQueryWithStore(
    {
      type: 'getMany',
      resource: 'products',
      payload: {
        ids: record
          ? record.products.map((item) => item.productId)
          : [],
      },
    },
    {},
    (state) => {
      const productIds = record
        ? record.products.map((item) => item.productId)
        : [];

      return productIds
        .map(
          (productId) =>
            state.admin?.resources?.products?.data[productId]
        )
        .filter((r) => typeof r !== 'undefined')
        .reduce((prev, next) => {
          prev[next.id] = next;
          return prev;
        }, {});
    }
  );

  function handleRateChange(rate, productId) {
    const method = rate == '-' ? 'delete' : 'post';
    let url = `/api/products/${productId}/rate`;

    if (rate != '-') url += `/${rate}`;

    setFetch({ url, method });
  }

  const getProductRate = (productId) =>
    products[productId]?.orders?.find(
      (order) => order.buyerId == record.buyerId
    )?.rate ?? '-';

  if (!loaded || !record) return null;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            {translate('resources.commands.fields.basket.reference')}
          </TableCell>
          <TableCell className={classes.rightAlignedCell}>
            {translate('resources.commands.fields.basket.unit_price')}
          </TableCell>
          <TableCell className={classes.rightAlignedCell}>
            {translate('resources.commands.fields.basket.quantity')}
          </TableCell>
          <TableCell className={classes.rightAlignedCell}>
            {translate('resources.commands.fields.basket.total')}
          </TableCell>
          <TableCell className={classes.rightAlignedCell}>
            {translate('resources.commands.fields.basket.totalOffer')}
          </TableCell>
          <TableCell className={classes.rightAlignedCell}>
            {translate('resources.commands.fields.basket.rate')}
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {record.products.map((item) => {
          return (
            products[item.productId] && (
              <TableRow key={item.productId}>
                <TableCell>
                  {/* <Link to={`/product/${item.productId}`}> */}
                  <SiteLink to={`product/${item.productId}`}>
                    {products[item.productId].title}
                  </SiteLink>
                  {/* </Link> */}
                </TableCell>
                <TableCell className={classes.rightAlignedCell}>
                  {products[item.productId].price.toLocaleString(
                    undefined,
                    {
                      style: 'currency',
                      currency: 'USD',
                    }
                  )}
                </TableCell>
                <TableCell className={classes.rightAlignedCell}>
                  {item.quantity}
                </TableCell>
                <TableCell className={classes.rightAlignedCell}>
                  {(
                    products[item.productId].price * item.quantity
                  ).toLocaleString(undefined, {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </TableCell>
                <TableCell className={classes.rightAlignedCell}>
                  {products[item.productId].offer
                    ? (
                        products[item.productId].offer * item.quantity
                      ).toLocaleString(undefined, {
                        style: 'currency',
                        currency: 'USD',
                      })
                    : '-----'}
                </TableCell>
                <TableCell className={classes.rightAlignedCell}>
                  <Select
                    onChange={(rate) =>
                      handleRateChange(rate, item.productId)
                    }
                    defaultValue={getProductRate(item.productId)}
                    disabled={user._id != record.buyerId}
                    options={['-', 0, 1, 2, 3, 4, 5].map((a) => ({
                      value: a,
                    }))}
                  />
                </TableCell>
              </TableRow>
            )
          );
        })}
      </TableBody>
    </Table>
  );
};

export default Basket;

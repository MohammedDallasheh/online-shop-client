import * as React from 'react';
import { FC } from 'react';
import MuiGridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import {
  linkToRecord,
  NumberField,
  useListContext,
  DatagridProps,
  Identifier,
  useAuthProvider,
} from 'react-admin';
import { Link } from 'react-router-dom';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  gridList: {
    margin: 0,
  },
  tileBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.4) 70%,rgba(0,0,0,0) 100%)',
  },
  placeholder: {
    backgroundColor: theme.palette.grey[300],
    height: '100%',
  },
  price: {
    display: 'inline',
    fontSize: '1em',
  },
  link: {
    color: '#fff',
  },
}));

const getColsForWidth = (width) => {
  if (width === 'xs') return 2;
  if (width === 'sm') return 3;
  if (width === 'md') return 3;
  if (width === 'lg') return 5;
  return 6;
};

const times = (nbChildren, fn) =>
  Array.from({ length: nbChildren }, (_, key) => fn(key));

const LoadingGridList = ({ width, nbItems = 20 }) => {
  const classes = useStyles();
  return (
    <MuiGridList
      cellHeight={180}
      cols={getColsForWidth(width)}
      className={classes.gridList}
    >
      {' '}
      {times(nbItems, (key) => (
        <GridListTile key={key}>
          <div className={classes.placeholder} />
        </GridListTile>
      ))}
    </MuiGridList>
  );
};

const LoadedGridList = ({ width }) => {
  const { ids, data, basePath } = useListContext();
  const { getIdentity } = useAuthProvider();
  // const { _id: userId } = getIdentity();
  const { _id: userId } = useSelector(({ auth }) => auth?.user);

  const classes = useStyles();

  if (!ids || !data) return null;
  return (
    <MuiGridList
      cellHeight={180}
      cols={getColsForWidth(width)}
      className={classes.gridList}
    >
      {ids
        // .filter((id) => data[id].user != userId)
        .map((id) => (
          <GridListTile
            // @ts-ignore
            component={Link}
            key={id}
            to={linkToRecord(basePath, data[id].id)}
          >
            <img src={data[id]?.imgs[0]?.url} alt="" />
            <GridListTileBar
              className={classes.tileBar}
              title={data[id].reference}
              subtitle={
                <span>
                  <NumberField
                    className={classes.price}
                    source="price"
                    record={data[id]}
                    color="inherit"
                    options={{
                      style: 'currency',
                      currency: 'USD',
                    }}
                  />
                </span>
              }
            />
          </GridListTile>
        ))}
    </MuiGridList>
  );
};

const GridList = ({ width }) => {
  const { loaded } = useListContext();
  return loaded ? (
    <LoadedGridList width={width} />
  ) : (
    // <div>MHMHMHMH</div>
    <LoadingGridList width={width} />
    // <div>LALALA</div>
  );
};

export default withWidth()(GridList);

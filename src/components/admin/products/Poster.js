import * as React from 'react';
import { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { makeStyles } from '@material-ui/core/styles';
import {
  FieldProps,
  TextInput,
  ArrayInput,
  SimpleFormIterator,
} from 'react-admin';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'inline-block',
    marginTop: '1em',
    zIndex: 2,
    textAlign: 'center',
  },
  content: { padding: 0, '&:last-child': { padding: 0 } },
  img: {
    margin: '0 auto',
    width: '100%',
    minWidth: 'initial',
    // maxWidth: '42em',
    // maxHeight: '15em',
    height: '15em',
  },
});

const Poster = ({ record }) => {
  const [imgs, setImgs] = useState([]);
  const classes = useStyles();

  if (!record) return null;

  return (
    // <GridList cellHeight={550} spacing={64}>
    <ArrayInput source="imgs">
      {/* variant?: 'standard' | 'outlined' | 'filled'; */}
      <SimpleFormIterator variant="filled">
        {/* <Card className={classes.root}>
          <CardContent className={classes.content}> */}
        <TextInput
          label="Image"
          source="url"
          fullWidth
          multiline
          // validate={requiredValidate}
        />
        <TextInput
          label="Alt"
          source="alt"
          fullWidth
          multiline
          // validate={requiredValidate}
        />
        {/* </CardContent>
        </Card> */}
      </SimpleFormIterator>
    </ArrayInput>
    // </GridList>
  );
};

export default Poster;

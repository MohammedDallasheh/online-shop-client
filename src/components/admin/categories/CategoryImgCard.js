import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { TextInput } from 'react-admin';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'inline-block',
    marginTop: '1em',
    zIndex: 2,
    textAlign: 'center',
  },
  content: { padding: 0, '&:last-child': { padding: 0 } },
});

const CategoryImgCard = ({ record }) => {
  const classes = useStyles();

  if (!record) return null;

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <TextInput
          label="Image"
          source={`img.url`}
          fullWidth
          multiline
          // validate={requiredValidate}
        />
        <TextInput
          label="Alt"
          source={`img.alt`}
          fullWidth
          multiline
          // validate={requiredValidate}
        />
      </CardContent>
    </Card>
  );
};

export default CategoryImgCard;

// in src/comments.js
import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import {
  DateField,
  EditButton,
  useTranslate,
  EmailField,
  TextField,
  FunctionField,
  BooleanField,
} from "react-admin";

import AvatarField from "./AvatarField";
import FullNameField from "./FullNameField";

const useStyles = makeStyles((theme) => ({
  root: { margin: "1em" },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "0.5rem 0",
  },
  cardTitleContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardContent: {
    ...theme.typography.body1,
    display: "flex",
    flexDirection: "column",
  },
}));

const MobileGrid = ({ ids, data, basePath }) => {
  const translate = useTranslate();
  const classes = useStyles();

  if (!ids || !data) {
    return null;
  }
  return (
    <div className={classes.root}>
      {ids.map((id) => {
        const record = data[id];
        return (
          <Card key={id} className={classes.card}>
            <CardHeader
              title={
                <div className="d-flex justify-content-between">
                  <FullNameField record={record} />
                  <EditButton basePath="/customers" record={record} />
                </div>
              }
            />
            <CardContent className={classes.cardContent}>
              <div>
                Email: &nbsp;
                <EmailField source="email" record={record} />
              </div>
              <div>
                Role &nbsp;:&nbsp;
                <TextField source="role" record={record} />
              </div>
              <div className="d-flex">
                Is lock &nbsp;:&nbsp;
                {record.isLock ? (
                  <DateField record={record} source="isLock" />
                ) : (
                  <BooleanField record={record} source="isLock" />
                )}
              </div>
              <div className="d-flex">
                Is active &nbsp;:&nbsp;
                <BooleanField source="isActive" record={record} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

MobileGrid.defaultProps = {
  data: {},
  ids: [],
};

export default MobileGrid;

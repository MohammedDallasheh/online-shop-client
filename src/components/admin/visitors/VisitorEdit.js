import React from "react";
import {
  DateInput,
  Edit,
  BooleanInput,
  SelectInput,
  TextInput,
  PasswordInput,
  Toolbar,
  useTranslate,
  FormWithRedirect,
  required,
  email,
} from "react-admin";
import { Box, Card, CardContent, Typography } from "@material-ui/core";

import FullNameField from "./FullNameField";
import { validatePasswords } from "./VisitorCreate";

const VisitorEdit = (props) => {
  return (
    <Edit title={<VisitorTitle />} component="div" {...props}>
      <VisitorForm />
    </Edit>
  );
};

const VisitorTitle = ({ record }) =>
  record ? <FullNameField record={record} size="32" /> : null;

const VisitorForm = (props) => {
  const translate = useTranslate();
  return (
    <FormWithRedirect
      {...props}
      validate={validatePasswords}
      render={(formProps) => (
        <Card>
          <form>
            <CardContent>
              <Box display={{ md: "block", lg: "flex" }}>
                <Box flex={2} mr={{ md: 0, lg: "1em" }}>
                  <Typography variant="h6" gutterBottom>
                    {translate("resources.customers.fieldGroups.identity")}
                  </Typography>
                  <Box display={{ xs: "block", sm: "flex" }}>
                    <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                      <TextInput
                        source="name.first"
                        resource="customers"
                        validate={requiredValidate}
                        fullWidth
                      />
                    </Box>
                    <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
                      <TextInput
                        source="name.last"
                        resource="customers"
                        validate={requiredValidate}
                        fullWidth
                      />
                    </Box>
                  </Box>
                  <TextInput
                    type="email"
                    source="email"
                    resource="customers"
                    validate={[email(), required()]}
                    fullWidth
                  />

                  <Box mt="1em" />

                  <Typography variant="h6" gutterBottom>
                    {translate("resources.customers.fieldGroups.address")}
                  </Typography>
                  <TextInput
                    source="address"
                    resource="customers"
                    multiline
                    fullWidth
                    helperText={false}
                  />

                  <Box mt="1em" />

                  {/* <Typography variant="h6" gutterBottom>
                    {translate(
                      'resources.customers.fieldGroups.change_password'
                    )}
                  </Typography>
                  <Box display={{ xs: 'block', sm: 'flex' }}>
                    <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                      <PasswordInput
                        source="password"
                        resource="customers"
                        fullWidth
                      />
                    </Box>
                    <Box flex={1} ml={{ xs: 0, sm: '0.5em' }}>
                      <PasswordInput
                        source="confirm_password"
                        resource="customers"
                        fullWidth
                      />
                    </Box>
                  </Box> */}
                </Box>
                <Box
                  flex={1}
                  ml={{ xs: 0, lg: "1em" }}
                  mt={{ xs: "1em", lg: 0 }}
                >
                  <Typography variant="h6" gutterBottom>
                    {translate("resources.customers.fieldGroups.stats")}
                  </Typography>
                  <div>
                    <SelectInput
                      source="role"
                      resource="customers"
                      choices={[
                        { id: "admin", name: "admin" },
                        { id: "seller", name: "seller" },
                        { id: "subscriber", name: "subscriber" },
                      ]}
                    />
                  </div>
                  <div>
                    <BooleanInput label="active" source="isActive" />
                  </div>

                  <BooleanInput label="lock" source="isLock" />
                  <DateInput
                    source="isLock"
                    format={(isLock) => isLock || ""}
                  />
                </Box>
              </Box>
            </CardContent>
            <Toolbar
              record={formProps.record}
              basePath={formProps.basePath}
              undoable={true}
              invalid={formProps.invalid}
              handleSubmit={formProps.handleSubmit}
              saving={formProps.saving}
              resource="customers"
            />
          </form>
        </Card>
      )}
    />
  );
};

const requiredValidate = [required()];

export default VisitorEdit;

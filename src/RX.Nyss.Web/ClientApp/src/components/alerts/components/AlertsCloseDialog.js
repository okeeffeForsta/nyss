import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { strings, stringKeys } from "../../../strings";
import FormActions from "../../forms/formActions/FormActions";
import SubmitButton from "../../forms/submitButton/SubmitButton";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, Grid, FormControlLabel, Radio } from "@material-ui/core";
import { closeOptions } from '../logic/alertsConstants';
import { validators, createForm } from '../../../utils/forms';
import Form from '../../forms/form/Form';
import RadioGroupField from '../../forms/RadioGroupField';
import TextInputField from '../../forms/TextInputField';

export const AlertsCloseDialog = ({ isOpened, close, alertId, isClosing, closeAlert }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const [form] = useState(() => {
    const fields = {
      closeOption: closeOptions.dismissed, 
      comments: ""
    };

    const validation = {
      closeOption: [validators.required],
      comments: [validators.maxLength(500), validators.requiredWhen(x => x.closeOption === closeOptions.other)]
    };
    return createForm(fields, validation);
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.isValid()) {
      return;
    }
    console.log(form.fields.closeOption);
    closeAlert(alertId, form.fields.comments.value, form.fields.closeOption.value);
  }

  return (
    <Dialog onClose={close} open={isOpened} fullScreen={fullScreen}>
      <DialogTitle>{strings(stringKeys.alerts.assess.alert.closeConfirmation)}</DialogTitle>
      <DialogContent>

        <Form onSubmit={handleSubmit} fullWidth>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <RadioGroupField
                name="closeOption"
                field={form.fields.closeOption} >
                {Object.keys(closeOptions).map(option => (
                  <FormControlLabel key={option} control={<Radio />} label={strings(stringKeys.alerts.assess.closeOptions[closeOptions[option]])} value={closeOptions[option]} />
                ))}
              </RadioGroupField>
            </Grid>

            <Grid item xs={12}>
              <TextInputField
                label={strings(stringKeys.alerts.assess.comments)}
                name="comments"
                multiline
                field={form.fields.comments}
              />
            </Grid>
          </Grid>

          <FormActions>
            <Button onClick={close}>
              {strings(stringKeys.form.cancel)}
            </Button>
            <SubmitButton isFetching={isClosing}>
              {strings(stringKeys.alerts.assess.alert.close)}
            </SubmitButton>
          </FormActions>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

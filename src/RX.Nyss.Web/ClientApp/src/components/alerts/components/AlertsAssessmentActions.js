import styles from "./AlertsAssessmentActions.module.scss";

import React, { Fragment, useState } from 'react';
import { stringKeys, strings } from "../../../strings";
import SubmitButton from "../../forms/submitButton/SubmitButton";
import FormActions from "../../forms/formActions/FormActions";
import Button from "@material-ui/core/Button";
import { AlertsEscalationDialog } from './AlertsEscalationDialog';
import { assessmentStatus } from '../logic/alertsConstants';
import { createForm, validators } from '../../../utils/forms';
import Grid from '@material-ui/core/Grid';
import TextInputField from '../../forms/TextInputField';
import { AlertsEscalationWithoutNotificationDialog } from "./AlertsEscalationWithoutNotificationDialog";
import CheckboxField from "../../forms/CheckboxField";

export const AlertsAssessmentActions = ({ projectId, alertId, alertAssessmentStatus, ...props }) => {
  const [escalationDialogOpened, setEscalationDialogOpened] = useState(false);
  const [escalationWithoutNotificationDialogOpened, setEscalationWithoutNotificationDialogOpened] = useState(false);

  const [form] = useState(() => {
    const fields = { 
      comments: "",
      escalateWithoutNotification: false
    };
    const validation = { comments: [validators.maxLength(500)] };
    return createForm(fields, validation);
  })

  const handleCloseAlert = () => {
    props.closeAlert(alertId, form.fields.comments.value);
  }

  const handleEscalateAlert = () => {
    if (form.fields.escalateWithoutNotification.value) {
      setEscalationWithoutNotificationDialogOpened(true);
    } else {
      setEscalationDialogOpened(true);
    }
  }

  return (
    <Fragment>
      {alertAssessmentStatus === assessmentStatus.escalated && (
        <Grid container spacing={3} className={styles.fields}>
          <Grid item xs={12}>
            <TextInputField
              label={strings(stringKeys.alerts.assess.comments)}
              name="comments"
              multiline
              field={form.fields.comments}
            />
          </Grid>
        </Grid>
      )}

      <FormActions>
        <Button onClick={() => props.goToList(projectId)}>{strings(stringKeys.form.cancel)}</Button>

        {alertAssessmentStatus === assessmentStatus.toEscalate && (
          <Fragment>
            <AlertsEscalationDialog
              alertId={alertId}
              escalateAlert={props.escalateAlert}
              isEscalating={props.isEscalating}
              notificationEmails={props.notificationEmails}
              notificationPhoneNumbers={props.notificationPhoneNumbers}
              isOpened={escalationDialogOpened}
              close={() => setEscalationDialogOpened(false)}
            />

            <AlertsEscalationWithoutNotificationDialog
              alertId={alertId}
              escalateAlert={props.escalateAlert}
              isEscalating={props.isEscalating}
              isOpened={escalationWithoutNotificationDialogOpened}
              close={() => setEscalationWithoutNotificationDialogOpened(false)}
            />

            <div>
              <CheckboxField
                name="escalateWithoutNotification"
                label={strings(stringKeys.alerts.assess.alert.escalateWithoutNotification)}
                field={form.fields.escalateWithoutNotification}
              />
              
              <SubmitButton onClick={handleEscalateAlert}>
                {strings(stringKeys.alerts.assess.alert.escalate)}
              </SubmitButton>
            </div>
          </Fragment>
        )}

        {(alertAssessmentStatus === assessmentStatus.toDismiss || alertAssessmentStatus === assessmentStatus.rejected) && (
          <SubmitButton isFetching={props.isDismissing} onClick={() => props.dismissAlert(alertId)}>
            {strings(stringKeys.alerts.assess.alert.dismiss)}
          </SubmitButton>
        )}

        {alertAssessmentStatus === assessmentStatus.escalated && (
          <SubmitButton isFetching={props.isClosing} onClick={handleCloseAlert}>
            {strings(stringKeys.alerts.assess.alert.close)}
          </SubmitButton>
        )}
      </FormActions>
    </Fragment>
  );
}

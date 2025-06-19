import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMessageTemplate,
  selectSenderName,
  setActiveStepIdx,
  setMessageTemplate,
  setSenderName,
} from '../redux/formSlice';
import { contactsStepIdx } from './ContactsStep';

const formSchema = Yup.object().shape({
  senderName: Yup.string().trim().required('Required'),
  messageTemplate: Yup.string()
    .trim()
    .required('Required')
    .matches(
      /RECIPIENT_NAME/,
      'Template should contain RECIPIENT_NAME placeholder',
    ),
});

interface FormValues {
  senderName: string;
  messageTemplate: string;
}

export const setupStepIdx = 0;

export function SetupStep() {
  const d = useDispatch();

  const senderName = useSelector(selectSenderName);
  const messageTemplate = useSelector(selectMessageTemplate);

  //

  const form = useForm<FormValues>({
    defaultValues: {
      senderName,
      messageTemplate,
    },
    mode: 'onChange',
  });

  const onSubmit = (values: FormValues) => {
    d(setSenderName(values.senderName.trim()));
    d(setMessageTemplate(values.messageTemplate.trim()));
    d(setActiveStepIdx(contactsStepIdx));
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12 }}>
          <Field
            component={TextField}
            name="messageTemplate"
            label="Message Template"
            type="text"
            helperText="Use RECIPIENT_NAME placeholders"
            placeholder={templatePlaceholder}
            multiline
            minRows={3}
            fullWidth
          />
        </Grid>
        <Grid container size={{ xs: 12 }} justifyContent="flex-end">
          <Button variant="contained" type="submit">
            Next
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

const templatePlaceholder = `Hi RECIPIENT_NAME, this is John from the community center. Hope to see you at our next event!`;

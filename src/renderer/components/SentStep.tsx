import { Button, Grid, LinearProgress, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { isErrorExecResult } from '../../types';
import {
  clearExecResult,
  resetForm,
  selectExecResult,
  setActiveStepIdx,
} from '../redux/formSlice';
import { setupStepIdx } from './SetupStep';

export const SentStepIdx = 3;

export function SentStep() {
  const d = useDispatch();
  const execResult = useSelector(selectExecResult);

  const handleStartOver = () => {
    d(setActiveStepIdx(setupStepIdx));
    d(resetForm());
    d(clearExecResult());
  };

  if (!execResult) {
    return <LinearProgress />;
  }

  if (isErrorExecResult(execResult)) {
    return (
      <>
        <Typography variant="h5" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="subtitle1">
          Please copy the below text and email it to Gregory Chen
          (gregorychen3@gmail.com) so he can fix it.
        </Typography>
        <CodeBlock>{execResult.error}</CodeBlock>
      </>
    );
  }

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12 }}>
        <Typography variant="h5" gutterBottom>
          Texts Sent!
        </Typography>
        <Typography variant="subtitle1">
          Please follow up with text conversations in the Messages app.
        </Typography>
      </Grid>
      <Grid container size={{ xs: 12 }} justifyContent="flex-end">
        <Button variant="contained" onClick={handleStartOver}>
          Start Over
        </Button>
      </Grid>
    </Grid>
  );
}

const CodeBlock = styled('pre')`
  font-size: 10px;
`;

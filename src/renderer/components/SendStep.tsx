import { Box, Divider, LinearProgress, styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { selectExecResult } from "renderer/redux/formSlice";

export const SendStepIdx = 2;

export function SendStep() {
  const execResult = useSelector(selectExecResult);

  if (!execResult) {
    return <LinearProgress />;
  }

  if (execResult.error) {
    return (
      <>
        <Typography variant="h5" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="subtitle1">
          Please copy the below text and email it to Gregory Chen
          (gregorychen3@gmail.com) so he can fix it.
        </Typography>
        <CodeBlock>{JSON.stringify(execResult, null, 2)}</CodeBlock>
      </>
    );
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Texts Sent!
      </Typography>
      <Typography variant="subtitle1">
        Please follow up with text conversations in the Messages app.
      </Typography>
    </>
  );
}

const CodeBlock = styled("pre")`
  font-size: 10px;
`;

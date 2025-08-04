import { Button, Grid, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ExecResult } from "../../types";
import {
  selectContacts,
  selectMessageTemplate,
  setActiveStepIdx,
  setExecResult,
} from "../redux/formSlice";
import { contactsStepIdx } from "./ContactsStep";
import { SentStepIdx } from "./SentStep";
import { WaitStepIdx } from "./WaitStep";

const EmphasisTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.success.main,
}));

const EmphasisText = styled("div")(({ theme }) => ({
  color: theme.palette.success.main,
  whiteSpace: "pre-line",
}));

export const confirmStepIdx = 2;

export function ConfirmStep() {
  const d = useDispatch();

  const messageTemplate = useSelector(selectMessageTemplate);
  const contacts = useSelector(selectContacts);

  const handleBack = () => d(setActiveStepIdx(contactsStepIdx));

  // register response callback
  useEffect(() => {
    window.electron.ipcRenderer.once("send-texts", (res) => {
      d(setExecResult(res as ExecResult));
      d(setActiveStepIdx(SentStepIdx));
    });
  }, [d]);

  const handleConfirm = () => {
    window.electron.ipcRenderer.sendMessage("send-texts", [
      { messageTemplate, contacts },
    ]);
    d(setActiveStepIdx(WaitStepIdx));
  };

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12 }}>
        The text to be sent: <EmphasisText>{messageTemplate}</EmphasisText>
      </Grid>
      <Grid size={{ xs: 12 }}>
        Recipients:
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Number</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((c) => (
                <TableRow key={`${c.name}-${c.number}`}>
                  <EmphasisTableCell>{c.name}</EmphasisTableCell>
                  <EmphasisTableCell>{c.number}</EmphasisTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid container size={{ xs: 12 }} justifyContent="flex-end">
        <Button onClick={handleBack}>Back</Button>
        <Button variant="contained" onClick={handleConfirm}>
          Send Texts!
        </Button>
      </Grid>
    </Grid>
  );
}

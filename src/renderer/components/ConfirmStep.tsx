import { Button, Grid, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContacts,
  selectMessageTemplate,
  selectSenderName,
  setActiveStepIdx,
} from "renderer/redux/formSlice";
import { contactsStepIdx } from "./ContactsStep";

const EmphasisTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.success.main,
}));

const EmphasisText = styled("div")(({ theme }) => ({
  color: theme.palette.success.main,
}));

const EmphasisInlineText = styled("span")(({ theme }) => ({
  color: theme.palette.success.main,
}));

export const confirmStepIdx = 2;

export function ConfirmStep() {
  const d = useDispatch();

  const senderName = useSelector(selectSenderName);
  const messageTemplate = useSelector(selectMessageTemplate);
  const contacts = useSelector(selectContacts);

  const handleBack = () => d(setActiveStepIdx(contactsStepIdx));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        Your name is <EmphasisInlineText>{senderName}</EmphasisInlineText>.
      </Grid>
      <Grid item xs={12}>
        The text to be sent: <EmphasisText>{messageTemplate}</EmphasisText>
      </Grid>
      <Grid item xs={12}>
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
                <TableRow key={c.name}>
                  <EmphasisTableCell>{c.name}</EmphasisTableCell>
                  <EmphasisTableCell>{c.number}</EmphasisTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid container item xs={12} justifyContent="flex-end">
        <Button onClick={handleBack}>Back</Button>
        <Button variant="contained">Send Texts!</Button>
      </Grid>
    </Grid>
  );
}

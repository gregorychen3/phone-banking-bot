import { Grid, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useFormikContext } from "formik";
import { FormValues } from "./PhoneBankingForm";

const EmphasisTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.success.main,
}));

interface Contact {
  name: string;
  number: string;
}

const parseContacts = (raw: string) => {
  const ret: Contact[] = [];

  const rows = raw.split("\n");
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowSplit = row.split("\t");
    if (rowSplit.length !== 2) {
      throw new Error(`Malformed contact row: ${row}`);
    }

    const [name, number] = rowSplit;
    if (!name || !number) {
      throw new Error(`Malformed contact row: ${row}`);
    }

    ret.push({ name, number });
  }

  return ret;
};

const EmphasisText = styled("div")(({ theme }) => ({
  color: theme.palette.success.main,
}));

const EmphasisInlineText = styled("span")(({ theme }) => ({
  color: theme.palette.success.main,
}));

export function ConfirmStep() {
  const { values } = useFormikContext<FormValues>();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        Your name is{" "}
        <EmphasisInlineText>{values.senderName}</EmphasisInlineText>.
      </Grid>
      <Grid item xs={12}>
        The text to be sent:{" "}
        <EmphasisText>{values.messageTemplate}</EmphasisText>
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
              {parseContacts(values.contacts).map((contact) => (
                <TableRow key={contact.name}>
                  <EmphasisTableCell>{contact.name}</EmphasisTableCell>
                  <EmphasisTableCell>{contact.number}</EmphasisTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

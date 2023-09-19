import {
    Box,
    Card,
    styled,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from "@mui/material";
  import { H5, Small } from "components/Typography";
  import { FC, Key, ReactChild, ReactFragment, ReactPortal } from "react";
  import ScrollBar from "simplebar-react";
  
  interface AppointmentsProps {
    availabilityData:any;
  }

  const commonCSS = {
    minWidth: 120,
    "&:nth-of-type(2)": { minWidth: 170 },
    "&:nth-of-type(3)": { minWidth: 80 },
  };
  
  // Styled components
  const HeadTableCell = styled(TableCell)(() => ({
    fontSize: 12,
    fontWeight: 600,
    "&:first-of-type": { paddingLeft: 0 },
    "&:last-of-type": { paddingRight: 0 },
  }));
  
  const BodyTableCell = styled(TableCell)(({ theme }) => ({
    fontSize: 12,
    fontWeight: 500,
    padding: 0,
    paddingLeft: "1rem",
    paddingTop: "0.7rem",
    "&:first-of-type": { paddingLeft: 0 },
    "&:last-of-type": { paddingRight: 0 },
    [theme.breakpoints.down("sm")]: { ...commonCSS },
    [theme.breakpoints.between(960, 1270)]: { ...commonCSS },
  }));
  
  export default function AppointmentTable ({ availabilityData }: AppointmentsProps) {

    if (!availabilityData) {
        return null; 
      }
      const lundiMatinCreneaux = availabilityData.lundi.matin.creneaux;
      const lundiSoirCreneaux = availabilityData.lundi.soir.creneaux;


    console.log(lundiMatinCreneaux);
    
    return (
        <Card sx={{ padding: "2rem" }}>
          <ScrollBar>
            <Table>
              <H5>Lundi</H5>
              <TableHead sx={{ borderBottom: "1.5px solid", borderColor: "divider" }}>
                <TableRow>
                  <HeadTableCell>matin/soir</HeadTableCell>
                  <HeadTableCell>Heure debut</HeadTableCell>
                  <HeadTableCell>Heure de fin</HeadTableCell>
                  <HeadTableCell>reserver par</HeadTableCell>
                  <HeadTableCell>confirmation</HeadTableCell>
                </TableRow>
              </TableHead>
    
              <TableBody>
                {lundiMatinCreneaux.map((creneau: { start: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; end: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; reservedBy: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; confirmed: any; }, index: Key | null | undefined) => (
                  <TableRow key={index}>
                    <BodyTableCell>matin</BodyTableCell>
                    <BodyTableCell>{creneau.start}</BodyTableCell>
                    <BodyTableCell>{creneau.end}</BodyTableCell>
                    <BodyTableCell>{creneau.reservedBy}</BodyTableCell>
                    <BodyTableCell>{creneau.confirmed ? "Oui" : "Non"}</BodyTableCell>
                  </TableRow>
                ))}
    
                {lundiSoirCreneaux.map((creneau: { start: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; end: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; reservedBy: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; confirmed: any; }, index: Key | null | undefined) => (
                  <TableRow key={index}>
                    <BodyTableCell>soir</BodyTableCell>
                    <BodyTableCell>{creneau.start}</BodyTableCell>
                    <BodyTableCell>{creneau.end}</BodyTableCell>
                    <BodyTableCell>{creneau.reservedBy}</BodyTableCell>
                    <BodyTableCell>{creneau.confirmed ? "Oui" : "Non"}</BodyTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollBar>
        </Card>
      );
    };
  

  
  
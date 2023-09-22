import {
  Button,
  Card,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { H5 } from "components/Typography";
import ScrollBar from "simplebar-react";

interface Creneau {
  start: string;
  end: string;
  reservedBy: string;
  confirmed: boolean;
}

interface JourAvailability {
  matin: {
    creneaux: Creneau[];
  };
  soir: {
    creneaux: Creneau[];
  };
}

interface AppointmentsProps {
  availabilityData: Record<string, JourAvailability>;
}

const commonCSS = {
  minWidth: 120,
  "&:nth-of-type(2)": { minWidth: 170 },
  "&:nth-of-type(3)": { minWidth: 80 },
};

// Styled components
const HeadTableCell = styled(TableCell)(({ theme }) => ({
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

export default function AppointmentTable({
  availabilityData,
}: AppointmentsProps) {
  if (!availabilityData) {
    return null; 
  }

  const joursSemaine = [
    "lundi",
    "mardi",
    "mercredi",
    "jeudi",
    "vendredi",
    "samedi",
    "dimanche",
  ];

  const handleClick = (creneau:any) => {
    console.log(creneau.confirmed ? 'Oui' : 'Non');
    
  }

  return (
    <Card sx={{ padding: "2rem" }}>
      <ScrollBar>
        {joursSemaine.map((jour) => (
          <div key={jour}>
            <H5>{jour.charAt(0).toUpperCase() + jour.slice(1)}</H5>
            <Table sx={{ marginBottom: "2rem" }}>
              <TableHead
                sx={{ borderBottom: "1.5px solid", borderColor: "divider" }}
              >
                <TableRow>
                  <HeadTableCell>matin/soir</HeadTableCell>
                  <HeadTableCell>Heure debut</HeadTableCell>
                  <HeadTableCell>Heure de fin</HeadTableCell>
                  <HeadTableCell>reserver par</HeadTableCell>
                  {/* <HeadTableCell>confirmation</HeadTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {(availabilityData[jour]?.matin.creneaux || []).map(
                  (creneau: Creneau, index) => (
                    <TableRow key={index}>
                      <BodyTableCell>matin</BodyTableCell>
                      <BodyTableCell>{creneau.start}</BodyTableCell>
                      <BodyTableCell>{creneau.end}</BodyTableCell>
                      <BodyTableCell>{creneau.reservedBy}</BodyTableCell>
                      {/* <BodyTableCell>
                       <Button variant="contained" onClick={() => handleClick(creneau)} >
                      {creneau.confirmed ? "Oui" : "Non"}
                      </Button> 
                      </BodyTableCell> */}
                    </TableRow>
                  )
                )}
                {(availabilityData[jour]?.soir.creneaux || []).map(
                  (creneau: Creneau, index) => {
                    
                    return (
                      <TableRow key={index}>
                        <BodyTableCell>soir</BodyTableCell>
                        <BodyTableCell>{creneau.start}</BodyTableCell>
                        <BodyTableCell>{creneau.end}</BodyTableCell>
                        <BodyTableCell>{creneau.reservedBy}</BodyTableCell>
                        {/* <BodyTableCell>
                          <Button variant="contained" onClick={() => handleClick(creneau)}>
                            {creneau.confirmed ? "Oui" : "Non"}
                          </Button>
                        </BodyTableCell> */}
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </div>
        ))}
      </ScrollBar>
    </Card>
  );
}

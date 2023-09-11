import React, { useState, useEffect } from "react";
import { Button, Container, Grid, TextField } from "@mui/material";
import { get, getDatabase, ref, set } from "firebase/database";
import firebase from "services/firebase";
import { H5 } from "components/Typography";
import LightTextField from "components/LightTextField";
import moment from "moment";

interface UpdateAvailabilityFormProps {
  userUid: string;
  day: string;
}
const now = moment();


const UpdateAvailabilityForm: React.FC<UpdateAvailabilityFormProps> = ({
  userUid,
  day,
}) => {
  const [morningStartTime, setMorningStartTime] = useState<string>("");
  const [morningEndTime, setMorningEndTime] = useState<string>("");
  const [eveningStartTime, setEveningStartTime] = useState<string>("");
  const [eveningEndTime, setEveningEndTime] = useState<string>("");

  useEffect(() => {
    const db = getDatabase(firebase);
    const availabilityRef = ref(
      db,
      `disponibilites_professionnels/${userUid}/${day}`
    );

    get(availabilityRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setMorningStartTime(data.matin[0]);
          setMorningEndTime(data.matin[1]);
          setEveningStartTime(data.soir[0]);
          setEveningEndTime(data.soir[1]);
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération de la disponibilité",
          error
        );
      });
  }, [userUid, day]);



  const handleUpdateAvailability = () => {
    const db = getDatabase(firebase);
    const availabilityRef = ref(
      db,
      `disponibilites_professionnels/${userUid}/${day}`
    );
  
    const newAvailability = {
      matin: [morningStartTime, morningEndTime],
      soir: [eveningStartTime, eveningEndTime],
      matin_creneaux: generateAppointments(morningStartTime, morningEndTime),
      soir_creneaux: generateAppointments(eveningStartTime, eveningEndTime),
    };
  
    set(availabilityRef, newAvailability)
      .then(() => {
        console.log(`Disponibilité pour ${day} mise à jour avec succès`);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la mise à jour de la disponibilité",
          error
        );
      });
  };
  
  const generateAppointments = (startTime: moment.MomentInput, endTime: moment.MomentInput) => {
    const appointments = [];
    const duration = moment.duration(30, 'minutes');
    let currentTime = moment(startTime, 'HH:mm');
  
    while (currentTime.isBefore(moment(endTime, 'HH:mm'))) {
      const appointmentStart = currentTime.format('HH:mm');
      currentTime.add(duration);
      const appointmentEnd = currentTime.format('HH:mm');
      appointments.push({ start: appointmentStart, end: appointmentEnd, reserved: false });
    }
  
    return appointments;
  };
  
  

  

  return (
    <Container>
      <H5 mt={3}>Mettre à jour la disponibilité pour {day}</H5>
      <Grid container spacing={4} mt={2}>
        <Grid item xs={6}>
          <LightTextField
            label="Matin - Heure de début"
            type="text"
            fullWidth
            value={morningStartTime}
            onChange={(e) => setMorningStartTime(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <LightTextField
            label="Matin - Heure de fin"
            type="text"
            fullWidth
            value={morningEndTime}
            onChange={(e) => setMorningEndTime(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Soir - Heure de début"
            type="text"
            fullWidth
            value={eveningStartTime}
            onChange={(e) => setEveningStartTime(e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Soir - Heure de fin"
            type="text"
            fullWidth
            value={eveningEndTime}
            onChange={(e) => setEveningEndTime(e.target.value)}
          />
        </Grid>
      </Grid>
      <Button
        style={{ marginTop: "10px" }}
        variant="contained"
        color="primary"
        onClick={handleUpdateAvailability}
      >
        Mettre à jour
      </Button>
    </Container>
  );
};

export default UpdateAvailabilityForm;

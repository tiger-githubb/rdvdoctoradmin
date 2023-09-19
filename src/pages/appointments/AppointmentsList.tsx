import { Box, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import useTitle from "hooks/useTitle";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import AppointmentTable from "components/AppointmentManagement/AppointmentTable";
const StyledFlexBox = styled(FlexBox)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: 20,
  [theme.breakpoints.down(500)]: {
    width: "100%",
    "& .MuiInputBase-root": { maxWidth: "100%" },
    "& .MuiButton-root": {
      width: "100%",
      marginTop: 15,
    },
  },
}));

interface AppointmentsProps {
  data:any;
}

const AppointmentsList: FC = () => {
  useTitle("Liste de mes rendez-vous");
  const auth = getAuth();
  const user = auth.currentUser;
  const { uid } = useParams<{ uid: string }>();
  const [availabilityData, setAvailabilityData] = useState<any | null>(null);

  useEffect(() => {
    const currentUserUid = user ? user.uid : null;

    const db = getDatabase();
    const databaseRef = ref(
      db,
      `professionnels/${currentUserUid}/disponibilites`
    );
    onValue(databaseRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setAvailabilityData(data);
        console.log(data);
      } else {
        console.log("Aucune donnée de disponibilité trouvée.");
      }
    });
  }, [uid]);

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Rechercher un rendez-vous ... " />
      </StyledFlexBox>
      <AppointmentTable availabilityData={availabilityData}/>
    </Box>
  );
};

export default AppointmentsList;

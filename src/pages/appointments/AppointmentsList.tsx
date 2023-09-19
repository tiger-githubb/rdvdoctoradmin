import { Box, Button, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import CustomTable from "components/AppointmentManagement/CustomTable";
import UserListColumnShape from "components/AppointmentManagement/columnShape";
import { collection, getDocs } from "firebase/firestore";
import useTitle from "hooks/useTitle";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "services/firebase";
// styled component
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

interface UserData {
  role: number;
  phone_number: string;
  address: string;
  email: string;
  date_of_birth: string;
  description?: string;
  displayName: string;
  profile_image: string;
  speciality?: string;
  uid: string;
}


const AppointmentsList: FC = () => {
  useTitle("User List");

  const [usersData, setUsersData] = useState<UserData[]>([]);


  const fetchUsersData = async () => {
    try {
      const usersCollectionRef = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollectionRef);

      const userDataArray: UserData[] = [];
      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        console.log(userData);
        userDataArray.push(userData as UserData);
      });

      setUsersData(userDataArray);
    } catch (error) {
      console.error("Erreur lors de la récupération des données des utilisateurs :", error);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const navigate = useNavigate();

  return (
    <Box pt={2} pb={4}>
      <StyledFlexBox>
        <SearchInput placeholder="Rechercher un rendez-vous ... " />
      </StyledFlexBox>

      <CustomTable columnShape={UserListColumnShape} data={usersData} />
    </Box>
  );
};

export default AppointmentsList;

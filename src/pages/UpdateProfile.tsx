import { FC, useState, useEffect } from "react";
import { PhotoCamera } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  styled,
  Switch,
} from "@mui/material";
import LightTextField from "components/LightTextField";
import { H3, Small, Tiny } from "components/Typography";
import { useFormik } from "formik";
import useTitle from "hooks/useTitle";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { db, auth } from "services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";

// styled components
const ButtonWrapper = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[200]
      : alpha(theme.palette.primary[100], 0.1),
}));

const UploadButton = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  border: "2px solid",
  alignItems: "center",
  justifyContent: "center",
  borderColor: theme.palette.background.paper,
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.secondary[400]
      : alpha(theme.palette.background.paper, 0.9),
}));

const SwitchWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginTop: 10,
}));

const UpdateUserProfile: FC = () => {

  const [userData, setUserData] = useState<any | null>(null);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const q = query(collection(db, "users"), where("uid", "==", user.uid));
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            const userDataFromDoc = doc.data();
            setUserData(userDataFromDoc);
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);


  const initialValues = {
    phone_number: userData?.phone_number || '',
    description: userData?.description || '',
    speciality: userData?.speciality || '',
    address: userData?.address || '',
    date_of_birth: userData?.date_of_birth || '',
    profile_image: userData?.profile_image || '',
    displayName: userData?.displayName || '',
  };
  useEffect(() => {
    if (userData) {
      setFormValues({
        phone_number: userData.phone_number || '',
        description: userData.description || '',
        speciality: userData.speciality || '',
        address: userData.address || '',
        date_of_birth: userData.date_of_birth || '',
        profile_image: userData.profile_image || '',
        displayName: userData.displayName || '',
      });
    }
  }, [userData]);
  const [formValues, setFormValues] = useState(initialValues);

  // change navbar title
  useTitle("Mise a jour des informations");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
  
        // Mettre à jour les informations dans la base de données
        await updateDoc(userDocRef, {
          phone_number: formValues.phone_number,
          displayName: formValues.displayName,
          description: formValues.description,
          speciality: formValues.speciality,
          address: formValues.address,
          date_of_birth: formValues.date_of_birth,
          profile_image: formValues.profile_image,
        });
  
        // Mettre à jour l'état userData pour refléter les nouvelles données
        setUserData({
          ...userData,
          phone_number: formValues.phone_number,
          displayName: formValues.displayName,
          description: formValues.description,
          speciality: formValues.speciality,
          address: formValues.address,
          date_of_birth: formValues.date_of_birth,
          profile_image: formValues.profile_image,
        });

        toast.success("Informations mises à jour avec succès !");
         
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des informations :", error);
    }
  };

  const validationSchema = Yup.object().shape({
    displayName: Yup.string().required('Le nom est requis'),
    phone_number: Yup.string().required('Le numéro de téléphone est requis'),
    description: Yup.string().required('La description est requise'),
    speciality: Yup.string().required('La spécialité est requise'),
    address: Yup.string().required('L\'adresse est requise'),
    date_of_birth: Yup.date().required('La date de naissance est requise'),
    profile_image: Yup.string().url('L\'URL de l\'image de profil n\'est pas valide'),
  });

  const { values, errors, touched } = useFormik({
    initialValues,
    onSubmit: () => {},
    validationSchema, // Pass the validation schema here
  });
  
  

  return (
    <Box pt={2} pb={4}>
      <Card sx={{ padding: 4 }}>
        <Grid container spacing={3}>
          <Grid item md={4} xs={12}>
            <Card
              sx={{
                padding: 3,
                boxShadow: 2,
                minHeight: 400,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ButtonWrapper>
                <UploadButton>
                  <label htmlFor="upload-btn">
                    <input
                      accept="image/*"
                      id="upload-btn"
                      type="file"
                      style={{ display: "none" }}
                    />
                    <IconButton component="span">
                      <PhotoCamera sx={{ fontSize: 26, color: "white" }} />
                    </IconButton>
                  </label>
                </UploadButton>
              </ButtonWrapper>

              <Small
                marginTop={2}
                maxWidth={200}
                lineHeight={1.9}
                display="block"
                textAlign="center"
                color="text.disabled"
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB
              </Small>
              {userData ? (
                <Box marginLeft={3} marginTop={3}>
                  <H3 lineHeight={1.2}>{userData.displayName || 'Utilisateur'} </H3>
                  <Small color="text.disabled">{userData.speciality || 'specialité'}</Small>
                </Box>
              ) : (
                <p>Chargement</p>
              )}

            </Card>
          </Grid>
          <Grid item md={8} xs={12}>
            <Card sx={{ padding: 3, boxShadow: 2 }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>

                <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="displayName"
                      placeholder="Votre nom"
                      value={formValues.displayName}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="phone_number"
                      placeholder="Phone Number"
                      value={formValues.phone_number}
                      onChange={handleChange}
                    />
                  </Grid>

                  

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="speciality"
                      placeholder="Speciality"
                      value={formValues.speciality}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="address"
                      placeholder="Address"
                      value={formValues.address}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="date_of_birth"
                      placeholder="Date of Birth"
                      value={formValues.date_of_birth}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item sm={6} xs={12}>
                    <LightTextField
                      fullWidth
                      name="profile_image"
                      placeholder="Profile Image URL"
                      value={formValues.profile_image}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <LightTextField
                      multiline
                      fullWidth
                      rows={10}
                      name="description"
                      placeholder="votre description"
                      value={formValues.description}
                      onChange={handleChange}
                     
                      sx={{
                        "& .MuiOutlinedInput-root textarea": { padding: 0 },
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" variant="contained">
                      Mettre à jour le profile
                    </Button>
                  </Grid>
                </Grid>
              </form>

            </Card>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default UpdateUserProfile;


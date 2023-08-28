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
import { Small, Tiny } from "components/Typography";
import { useFormik } from "formik";
import useTitle from "hooks/useTitle";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { db, auth } from "services/firebase";
import { collection, addDoc ,getDocs, query, where } from "firebase/firestore";
import { FormikValues } from "formik";

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

const AddNewHospital: FC = () => {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // change navbar title
  useTitle("Ajouter un Hopital");

  const initialValues = {
    name: "",
    address: "",
    phone_number: "",
    hospital_image: "",
    created_at: new Date(),
    createdByUserId: user ? user.uid : "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Le nom de l'hôpital est requis"),
    address: Yup.string().required("L'adresse de l'hôpital est requise"),
    phone_number: Yup.string().required("Le numéro de téléphone est requis"),
    hospital_image: Yup.string().required("L'URL de l'image n'est pas valide")
  });

  const handleSubmit = async (values: any) => {
    try {
      const newHospitalRef = await addDoc(collection(db, "hospitals"), values);
      console.log("Hôpital créé avec succès !", newHospitalRef.id);
      toast.success("Hôpital créé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création de l'hôpital :", error);
      toast.error("Erreur lors de la création de l'hôpital");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
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

              <Box maxWidth={250} marginTop={5} marginBottom={1}>
                <SwitchWrapper>
                  <Small display="block" fontWeight={600}>
                    Public Profile
                  </Small>
                  <Switch defaultChecked />
                </SwitchWrapper>

                <SwitchWrapper>
                  <Small display="block" fontWeight={600}>
                    Banned
                  </Small>
                  <Switch defaultChecked />
                </SwitchWrapper>
                <Tiny display="block" color="text.disabled" fontWeight={500}>
                  Apply disable account
                </Tiny>

                <SwitchWrapper>
                  <Small display="block" fontWeight={600}>
                    Email Verified
                  </Small>
                  <Switch defaultChecked />
                </SwitchWrapper>
                <Tiny display="block" color="text.disabled" fontWeight={500}>
                  Disabling this will automatically send the user a verification
                  email
                </Tiny>
              </Box>
            </Card>
          </Grid>
          <Grid item md={8} xs={12}>
            <Card sx={{ padding: 3, boxShadow: 2 }}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <LightTextField
                      fullWidth
                      name="name"
                      label="Nom de l'hôpital"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <LightTextField
                      fullWidth
                      name="address"
                      label="Adresse de l'hôpital"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      error={formik.touched.address && Boolean(formik.errors.address)}
                      helperText={formik.touched.address && formik.errors.address}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LightTextField
                      fullWidth
                      name="phone_number"
                      label="Numéro de téléphone de l'hôpital"
                      value={formik.values.phone_number}
                      onChange={formik.handleChange}
                      error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                      helperText={formik.touched.phone_number && formik.errors.phone_number}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LightTextField
                      fullWidth
                      name="hospital_image"
                      label="URL de l'image de l'hôpital"
                      value={formik.values.hospital_image}
                      onChange={formik.handleChange}
                      error={formik.touched.hospital_image && Boolean(formik.errors.hospital_image)}
                      helperText={formik.touched.hospital_image && formik.errors.hospital_image}
                    />
                  </Grid>


                  <Grid item xs={12}>
                    <Button type="submit" variant="contained">
                      Créer l'hôpital
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

export default AddNewHospital;

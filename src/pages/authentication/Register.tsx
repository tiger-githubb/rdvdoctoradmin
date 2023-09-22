import React, { FC, useState } from 'react';
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import {
  SocialIconButton,
  TextFieldWrapper,
} from "components/authentication/StyledComponents";
import FacebookIcon from "icons/FacebookIcon";
import GoogleIcon from "icons/GoogleIcon";
import FlexBox from "components/FlexBox";
import LightTextField from "components/LightTextField";
import { H1, H3, Small } from "components/Typography";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../services/firebase';
import { doc, setDoc } from "firebase/firestore";


const Register: FC = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    terms: true,
    submit: null,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Le nom est requis"),
    email: Yup.string()
      .email("Doit être un e-mail valide")
      .max(255)
      .required("Un e-mail est requis"),
    password: Yup.string()
      .min(6, "Le mot de passe doit être de la longueur minimale de 6 caractères")
      .required("Mot de passe requis"),
  });

  
  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        setLoading(true);
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
          const user = userCredential.user;

          const defaultUserData = {
            displayName: values.name,
            email: user.email,
            uid: user.uid,
            role: 1, 
            phone_number: '',
            description:'',
            speciality: '',
            address: '',
            date_of_birth: '',
            profile_image: '',
          };
          
          await setDoc(doc(db, "users", user.uid), defaultUserData);

          const token = await user.getIdToken();
          localStorage.setItem('token', token);
          
          const userData = {
            ...defaultUserData,
          };
          localStorage.setItem('user', JSON.stringify(userData));
      
          setLoading(false);
          toast.success("Vous vous êtes inscrit avec succès");
          navigate("/dashboard"); 
        } catch (error) {
          // setError(error.message);
          setLoading(false);
        }
      },      
    });

  return (
    <FlexBox
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: { sm: "100%" },
      }}
    >
      <Card sx={{ padding: 4, maxWidth: 600, boxShadow: 1 }}>
        <FlexBox
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          mb={5}
        >
          <Box width={38} mb={1}>
            <img src="/static/logo/logo.svg" width="100%" alt="Uko Logo" />
          </Box>
          <H1 fontSize={24} fontWeight={700}>
            S'inscrire sur RDV Doctor
          </H1>
        </FlexBox>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my="1rem">
         <SocialIconButton
            startIcon={<GoogleIcon sx={{ mr: "0.5rem" }} />}
          >
            Google
          </SocialIconButton> 
          <SocialIconButton
            startIcon={<FacebookIcon sx={{ mr: "0.5rem" }} />}
          >
            Facebook
          </SocialIconButton>

          <Divider sx={{ my: 3, width: "100%", alignItems: "flex-start" }}>
            <H3 color="text.disabled" px={1}>
              Or
            </H3>
          </Divider>

          <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FlexBox justifyContent="space-between" flexWrap="wrap">
              <TextFieldWrapper>
                <LightTextField
                  fullWidth
                  name="name"
                  type="text"
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name || ""}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              </TextFieldWrapper>

              <TextFieldWrapper>
                <LightTextField
                  fullWidth
                  name="email"
                  type="email"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email || ""}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </TextFieldWrapper>
            </FlexBox>

            <TextFieldWrapper sx={{ mt: 2, width: "100%" }}>
              <LightTextField
                fullWidth
                name="password"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password || ""}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </TextFieldWrapper>

            <FormControlLabel
              control={
                <Checkbox
                  disableRipple
                  checked={values.terms}
                  onChange={handleChange}
                  name="terms"
                />
              }
              label="J'accepte les conditions générales"
              sx={{
                marginTop: "0.5rem",
                "& .MuiTypography-root": { fontWeight: 600 },
              }}
            />

            {error && (
              <FormHelperText
                error
                sx={{
                  mt: 2,
                  fontSize: 13,
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {error}
              </FormHelperText>
            )}

            <Box sx={{ mt: 4 }}>
              {loading ? (
                <LoadingButton loading fullWidth variant="contained">
                 S'inscrire
                </LoadingButton>
              ) : (
                <Button fullWidth type="submit" variant="contained">
                  S'inscrire
                </Button>
              )}
            </Box>
          </form>

          <Small margin="auto" mt={3} color="text.disabled">
           Avez-vous déjà un compte?{" "}
            <Link to="/login">
              <Small color="primary.main">Se connecter</Small>
            </Link>
          </Small>
        </FlexBox>
      </Card>
    </FlexBox>
  );
};

export default Register;

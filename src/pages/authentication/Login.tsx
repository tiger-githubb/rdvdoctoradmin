import React, { FC, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Divider,
  FormControlLabel,
  FormHelperText,
  Switch,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  SocialIconButton,
  TextFieldWrapper,
} from "components/authentication/StyledComponents";
import FlexBox from "components/FlexBox";
import LightTextField from "components/LightTextField";
import { H1, H3, Paragraph, Small } from "components/Typography";
import { useFormik } from "formik";
import FacebookIcon from "icons/FacebookIcon";
import GoogleIcon from "icons/GoogleIcon";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';

const Login: FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    submit: null,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Doit être un e-mail valide")
      .max(255)
      .required("Un e-mail est requis"),
    password: Yup.string()
      .required("Mot de passe requis"),
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: async (values) => {
        setLoading(true);
        try {
          const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
          const user = userCredential.user;
      
          const token = await user.getIdToken();
          localStorage.setItem('token', token);
      
          setLoading(false);
          toast.success("Connecté avec succès");
          navigate("/dashboard"); 
        } catch (error) {
          setError("email ou mot de passe invalide"); 
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
      <Card sx={{ padding: 4, maxWidth: 600, boxShadow: 20 }}>
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
            Connectez-vous à Rdv Doctor
          </H1>
        </FlexBox>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my="1rem">
          <SocialIconButton
            // onClick={loginWithGoogle}
            startIcon={<GoogleIcon sx={{ mr: 1 }} />}
          >
            Google
          </SocialIconButton>
          <SocialIconButton
            // onClick={loginWithFacebook}
            startIcon={<FacebookIcon sx={{ mr: 1 }} />}
          >
            Facebook
          </SocialIconButton>

          <Divider sx={{ my: 3, width: "100%", alignItems: "flex-start" }}>
            <H3 color="text.disabled" px={1}>
              Ou
            </H3>
          </Divider>

          <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FlexBox justifyContent="space-between" flexWrap="wrap">
              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Email
                </Paragraph>
                <LightTextField
                  fullWidth
                  name="email"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email || ""}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </TextFieldWrapper>

              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Mot de passe
                </Paragraph>
                <LightTextField
                  fullWidth
                  name="password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password || ""}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </TextFieldWrapper>
            </FlexBox>

            <FlexBox mt={2} alignItems="center" justifyContent="space-between">
              <FormControlLabel
                control={
                  <Switch
                    name="remember"
                    onChange={handleChange}
                  />
                }
                label="Se souvenir de moi"
                sx={{ "& .MuiTypography-root": { fontWeight: 600 } }}
              />
              <Link to="/forget-password">
                <Small color="secondary.red">Mot de passe oublié?</Small>
              </Link>
            </FlexBox>

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
                  Se connecter
                </LoadingButton>
              ) : (
                <Button fullWidth type="submit" variant="contained">
                  Se connecter
                </Button>
              )}
            </Box>
          </form>

          <Small margin="auto" mt={3} color="text.disabled">
            Vous n'avez pas de compte?{" "}
            <Link to="/register">
              <Small color="primary.main">Créer un compte</Small>
            </Link>
          </Small>
        </FlexBox>
      </Card>
    </FlexBox>
  );
};

export default Login;

import Login from "pages/authentication/Login";
import { Fragment, ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

// component props interface
interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const token = localStorage.getItem("token");

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  useEffect(() => {
    // Vérifier la validité du token JWT ici
    
    if (token) {
      // Effectuer une vérification côté serveur du token (par exemple, via une API)
      // Si le token est invalide, déconnectez l'utilisateur et redirigez-le vers le login
      // Sinon, l'utilisateur reste connecté
      // Assurez-vous de gérer les erreurs de manière appropriée
      console.log("conecter");
      
      navigate("/dashboard"); 
      
    }
    // eslint-disable-next-line 
  }, []);

  if (!token) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }

    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }
  return <Fragment>{children}</Fragment>;
};

export default AuthGuard;

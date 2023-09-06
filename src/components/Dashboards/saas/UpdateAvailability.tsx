import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from 'services/firebase';
import UpdateAvailabilityForm from './UpdateAvailabilityForm';

interface UpdateAvailabilityProps {
  professionalId: string;
}

const UpdateAvailability: React.FC<UpdateAvailabilityProps> = ({ professionalId }) => {
  const [userUid, setUserUid] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid(null);
      }
    });
  }, []);

  const daysOfWeek = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi']; 

  return (
    <div>
      {daysOfWeek.map((day) => (
        userUid !== null ? (
          <UpdateAvailabilityForm key={day} userUid={userUid} day={day} />
        ) : (
          <div key={day}>Erreur : Utilisateur non connecté</div>
        )
      ))}
    </div>
  );
};
export default UpdateAvailability;

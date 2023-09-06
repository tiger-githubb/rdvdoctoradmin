import React, { FC, useState , useEffect } from 'react';

import {  getDatabase, ref, set } from 'firebase/database';
import { getAuth , onAuthStateChanged } from 'firebase/auth';
import firebase from 'services/firebase';

interface UpdateAvailabilityProps {
  professionalId: string;
}

const UpdateAvailability: React.FC<UpdateAvailabilityProps> = ({ professionalId }) => {
  const [day, setDay] = useState<string>('lundi');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const [userUid, setUserUid] = useState<string | null>(null); // Stockez l'UID de l'utilisateur

  useEffect(() => {
    // Utilisez la fonction onAuthStateChanged pour surveiller les changements d'état d'authentification
    
    const auth = getAuth(firebase);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // L'utilisateur est connecté, récupérez son UID
        setUserUid(user.uid);
      } else {
        // L'utilisateur n'est pas connecté
        setUserUid(null);
      }
    });
  }, []);

  const handleUpdateAvailability = () => {
    if (!userUid) {
      // L'utilisateur n'est pas connecté, gérez cette situation (par exemple, affichez un message d'erreur)
      console.error('L\'utilisateur n\'est pas connecté');
      return;
    }

    const db = getDatabase(firebase);

    const availabilityRef = ref(db, `disponibilites_professionnels/${userUid}/${day}`);
    const newAvailability: string[] = [startTime, endTime];

    set(availabilityRef, newAvailability)
      .then(() => {
        console.log('Disponibilité mise à jour avec succès');
        // Réinitialisez les valeurs des champs du formulaire
        setStartTime('');
        setEndTime('');
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la disponibilité', error);
      });
  };

  return (
    <div>
      <h2>Mettre à jour la disponibilité</h2>
      <label>
        Jour de la semaine:
        <select value={day} onChange={(e) => setDay(e.target.value)}>
          <option value="lundi">Lundi</option>
          <option value="mardi">Mardi</option>
          {/* Ajoutez les autres jours de la semaine */}
        </select>
      </label>
      <label>
        Heure de début:
        <input
          type="text"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </label>
      <label>
        Heure de fin:
        <input
          type="text"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </label>
      <button onClick={handleUpdateAvailability}>Mettre à jour</button>
    </div>
  );
};

export default UpdateAvailability;

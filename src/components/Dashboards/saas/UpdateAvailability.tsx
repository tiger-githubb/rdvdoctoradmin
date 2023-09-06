import React, { useState , useEffect } from 'react';

import {  getDatabase, ref, set } from 'firebase/database';
import { getAuth , onAuthStateChanged } from 'firebase/auth';
import firebase from 'services/firebase';

interface UpdateAvailabilityProps {
  professionalId: string;
}

const UpdateAvailability: React.FC<UpdateAvailabilityProps> = ({ professionalId }) => {
  const [day, setDay] = useState<string>('lundi');
  const [morningStartTime, setMorningStartTime] = useState<string>('');
  const [morningEndTime, setMorningEndTime] = useState<string>('');
  const [eveningStartTime, setEveningStartTime] = useState<string>('');
  const [eveningEndTime, setEveningEndTime] = useState<string>('');
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

  const handleUpdateAvailability = () => {
    if (!userUid) {
      console.error('L\'utilisateur n\'est pas connecté');
      return;
    }

    const db = getDatabase(firebase);

    const availabilityRef = ref(db, `disponibilites_professionnels/${userUid}/${day}`);
    const newAvailability = {
      matin: [morningStartTime, morningEndTime],
      soir: [eveningStartTime, eveningEndTime],
    };
    set(availabilityRef, newAvailability)
      .then(() => {
        console.log('Disponibilité mise à jour avec succès');
        // Réinitialisez les valeurs des champs du formulaire
        setMorningStartTime('');
        setMorningEndTime('');
        setEveningStartTime('');
        setEveningEndTime('');
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
        Matin - Heure de début:
        <input
          type="text"
          value={morningStartTime}
          onChange={(e) => setMorningStartTime(e.target.value)}
        />
      </label>
      <label>
        Matin - Heure de fin:
        <input
          type="text"
          value={morningEndTime}
          onChange={(e) => setMorningEndTime(e.target.value)}
        />
      </label>
      <label>
        Soir - Heure de début:
        <input
          type="text"
          value={eveningStartTime}
          onChange={(e) => setEveningStartTime(e.target.value)}
        />
      </label>
      <label>
        Soir - Heure de fin:
        <input
          type="text"
          value={eveningEndTime}
          onChange={(e) => setEveningEndTime(e.target.value)}
        />
      </label>
      <button onClick={handleUpdateAvailability}>Mettre à jour</button>
    </div>
  );
};


export default UpdateAvailability;

import React, { useState,useEffect } from 'react';
import { get, getDatabase, ref, set } from 'firebase/database';
import firebase from 'services/firebase';

interface UpdateAvailabilityFormProps {
  userUid: string;
  day: string;
}

const UpdateAvailabilityForm: React.FC<UpdateAvailabilityFormProps> = ({ userUid, day }) => {
  const [morningStartTime, setMorningStartTime] = useState<string>('');
  const [morningEndTime, setMorningEndTime] = useState<string>('');
  const [eveningStartTime, setEveningStartTime] = useState<string>('');
  const [eveningEndTime, setEveningEndTime] = useState<string>('');

  useEffect(() => {
    const db = getDatabase(firebase);
    const availabilityRef = ref(db, `disponibilites_professionnels/${userUid}/${day}`);

    get(availabilityRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setMorningStartTime(data.matin[0]);
          setMorningEndTime(data.matin[1]);
          setEveningStartTime(data.soir[0]);
          setEveningEndTime(data.soir[1]);
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération de la disponibilité', error);
      });
  }, [userUid, day]);

  const handleUpdateAvailability = () => {
    const db = getDatabase(firebase);
    const availabilityRef = ref(db, `disponibilites_professionnels/${userUid}/${day}`);
    
    const newAvailability = {
      matin: [morningStartTime, morningEndTime],
      soir: [eveningStartTime, eveningEndTime],
    };

    set(availabilityRef, newAvailability)
      .then(() => {
        console.log(`Disponibilité pour ${day} mise à jour avec succès`);
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la disponibilité', error);
      });
  };

  return (
    <div>
      <h2>Mettre à jour la disponibilité pour {day}</h2>
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

export default UpdateAvailabilityForm;

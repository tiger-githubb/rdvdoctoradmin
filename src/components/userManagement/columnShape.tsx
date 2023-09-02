import FlexBox from "components/FlexBox";
import { H6, Small, Tiny } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";

const UserListColumnShape = [
  {
    Header: "Nom",
    accessor: "displayName", 
    minWidth: 200,
    Cell: ({ row }: any) => {
      const { profile_image, displayName, address } = row.original;
      return (
        <FlexBox alignItems="center">
          <UkoAvatar src={profile_image} /> 
          <FlexBox flexDirection="column" ml={1}>
            <H6 color="text.primary">{displayName}</H6>
            <Tiny color="text.disabled">{address}</Tiny>
          </FlexBox>
        </FlexBox>
      );
    },
  },
  {
    Header: "Rôle",
    accessor: "role", // Utilisez le nom de la clé dans Firestore
    minWidth: 200,
    Cell: ({ value }: any) => (
      <Small
        sx={{
          borderRadius: 10,
          padding: ".2rem 1rem",
          color: "background.paper",
          backgroundColor: "#A798FF",
        }}
      >
        {value}
      </Small>
    ),
  },
  {
    Header: "Spécialité",
    accessor: "speciality", // Utilisez le nom de la clé dans Firestore
    minWidth: 150,
  },
  {
    Header: "Numero de télephone",
    accessor: "phone_number", // Utilisez le nom de la clé dans Firestore
    minWidth: 150,
  },
  {
    Header: "Adresse",
    accessor: "address", // Utilisez le nom de la clé dans Firestore
    minWidth: 100,
    maxWidth: 100,
  },
];

export default UserListColumnShape;

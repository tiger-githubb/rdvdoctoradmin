import { Mail, Place, ContactPhone, CalendarViewDay } from "@mui/icons-material";
import { Box, Card, Divider, Grid, styled } from "@mui/material";
import FlexBox from "components/FlexBox";
import MoreOptions from "components/MoreOptions";
import {  H4, H6, Small } from "components/Typography";
import { FC, MouseEvent, useState } from "react";
import PostCard from "./PostCard";

// styled components
// eslint-disable-next-line
const IconWrapper = styled(Box)<{ color?: string }>(({ theme, color }) => ({
  width: 40,
  height: 40,
  color: "white",
  display: "flex",
  borderRadius: "4px",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color ? color : theme.palette.primary.main,
}));

interface ProfileProps {
  userData: any | null; 
}
// eslint-disable-next-line
const FollowWrapper = styled(Box)(() => ({
  maxWidth: 300,
  margin: "auto",
  paddingTop: 32,
  paddingBottom: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Profile: FC<ProfileProps> = ({ userData }) =>  {
  const [moreEl, setMoreEl] = useState<null | HTMLElement>(null);
  const handleMoreOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMoreEl(event.currentTarget);
  };
  const handleMoreClose = () => setMoreEl(null);

  return (
    <Grid container spacing={3}>
      <Grid item md={5} xs={12}>
        <Card>
          <Divider />
          {userData ? (
          <Box padding={3}>
            <H4 fontWeight={600}>Descirption</H4>
            <Small mt={1} display="block" lineHeight={1.9}>
            {userData.description || "Non fourni"}
            </Small>

            <Box mt={3}>
                {details.map(({ Icon, smallText, boldText }, index) => (
                  <FlexBox alignItems="center" mt={1.5} key={index}>
                    <Icon />
                    <H6 marginLeft={1}>
                      <Small>{smallText}</Small> {userData[boldText.toLowerCase()] || 'Non fourni'}
                    </H6>
                  </FlexBox>
                ))}
              </Box>
            </Box>
          ) : (
            <p>Chargement...</p>
          )}
        </Card>
      </Grid>

      <Grid item md={7} xs={12}>
        {postList.map((post) => (
          <PostCard post={post} key={post.id} handleMore={handleMoreOpen} />
        ))}

        <MoreOptions anchorEl={moreEl} handleMoreClose={handleMoreClose} />
      </Grid>
    </Grid>
  );
};

const details = [
  {
    Icon: Place,
    boldText: "address",
    smallText: "vis à ",
  },
  {
    Icon: Mail,
    boldText: "email",
    smallText: "Mail sur ",
  },
  {
    Icon: ContactPhone,
    boldText: "phone_number",
    smallText: "disponible sur",
  },
  {
    Icon: CalendarViewDay,
    smallText: "née le ",
    boldText: "date_of_birth",
  },
];

const postList = [
  {
    id: 1,
    postTitle: "Calandrier",
    postImage: "/static/post-image/post-1.png",
  },
];

export default Profile;

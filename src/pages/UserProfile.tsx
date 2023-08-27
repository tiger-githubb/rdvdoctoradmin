import { FC, SyntheticEvent, useState, useEffect } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Card, Grid, styled, Tab } from "@mui/material";
import FlexBox from "components/FlexBox";
import SearchInput from "components/SearchInput";
import { H3, Small } from "components/Typography";
import UkoAvatar from "components/UkoAvatar";
import FollowerCard from "components/userProfile/FollowerCard";
import FriendCard from "components/userProfile/FriendCard";
import Gallery from "components/userProfile/Gallery";
import Profile from "components/userProfile/Profile";
import useTitle from "hooks/useTitle";
import { db, auth } from "services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// styled start
const StyledCard = styled(Card)(() => ({
  position: "relative",
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
}));

const ContentWrapper = styled(FlexBox)(() => ({
  top: -20,
  alignItems: "center",
  position: "relative",
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.primary,
}));

const StyledTabList = styled(TabList)(({ theme }) => ({
  [theme.breakpoints.down(780)]: {
    width: "100%",
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-between",
    },
    marginBottom: 20,
  },
  [theme.breakpoints.up("sm")]: {
    "& .MuiTabs-flexContainer": {
      minWidth: 400,
      justifyContent: "space-between",
    },
  },
}));

const StyledTabPanel = styled(TabPanel)(() => ({
  padding: 0,
}));

//  end style

function UserProfile() {

  const [userData, setUserData] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const q = query(collection(db, "users"), where("uid", "==", user.uid));
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            const userDataFromDoc = doc.data();
            setUserData(userDataFromDoc);
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    
    fetchUserData();
  }, []);


  useTitle("Mon profil");
  const [value, setValue] = useState("1");
  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box pt={2} pb={4}>
      <TabContext value={value}>
        <StyledCard>
          <Box sx={{ height: 200, width: "100%", overflow: "hidden" }}>
            <img
              src="/static/background/user-cover-pic.png"
              alt="User Cover"
              height="100%"
              width="100%"
              style={{ objectFit: "cover" }} />
          </Box>

          <FlexBox
            flexWrap="wrap"
            padding="0 2rem"
            alignItems="center"
            justifyContent="space-between"
          >
            <ContentWrapper>
              <UkoAvatar
                src={ "/static/avatar/001-man.svg"}
                sx={{
                  border: 4,
                  width: 100,
                  height: 100,
                  borderColor: "background.paper",
                }} />
              {userData ? (
              <Box marginLeft={3} marginTop={3}>
               <H3 lineHeight={1.2}>{userData.displayName || 'Utilisateur'} </H3> 
                <Small color="text.disabled">{userData.spéciality || 'specialité'}</Small>
              </Box>
               ) : (
                <p>Chargement</p>
              )}
                
             

            </ContentWrapper>


            <StyledTabList onChange={handleChange}>
              <StyledTab label="Profile" value="1" />
              <StyledTab label="Disponibilité" value="2" />
            </StyledTabList>
          </FlexBox>
        </StyledCard>

        <Box marginTop={3}>
          <StyledTabPanel value="1">
            <Profile />
          </StyledTabPanel>

          <StyledTabPanel value="2">
            <Grid container spacing={3}>
              {followers.map((item, index) => (
                <Grid item lg={4} sm={6} xs={12} key={index}>
                  <FollowerCard follower={item} />
                </Grid>
              ))}
            </Grid>
          </StyledTabPanel>

          <StyledTabPanel value="3">
            <H3>Friends</H3>
            <SearchInput placeholder="Search Friends..." sx={{ my: 2 }} />

            <Grid container spacing={3}>
              {friends.map((friend, index) => (
                <Grid item lg={4} sm={6} xs={12} key={index}>
                  <FriendCard friend={friend} />
                </Grid>
              ))}
            </Grid>
          </StyledTabPanel>

          <StyledTabPanel value="4">
            <Gallery />
          </StyledTabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}

const followers = [
  {
    image: "/static/avatar/040-man-11.svg",
    name: "Mr. Breast",
    profession: "Product Designer",
    following: true,
  },
];

const friends = [
  {
    name: "Selena Gomez",
    image: "/static/avatar/012-woman-2.svg",
    profession: "Marketing Manager",
    facebookUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    dribbleUrl: "",
  },
];

export default UserProfile;

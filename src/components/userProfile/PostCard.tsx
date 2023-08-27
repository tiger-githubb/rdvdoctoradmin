import { Favorite, MoreVert, Send } from "@mui/icons-material";
import {
  Avatar,
  Box,
  ButtonBase,
  Card,
  IconButton,
  InputBase,
  styled,
  useTheme,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import { H5, H6, Small, Tiny } from "components/Typography";
import CommentIcon from "icons/CommentIcon";
import ShareIcon from "icons/ShareIcon";
import UploadIcon from "icons/UploadIcon";
import React, { FC, MouseEvent } from "react";

// component props interface
interface PostCardProps {
  post: {
    postTitle: string;
    postImage: string;
  };
  handleMore: (event: MouseEvent<HTMLButtonElement>) => void;
}

// styled components
const ImageWrapper = styled(Box)(() => ({
  width: 48,
  height: 48,
  overflow: "hidden",
  borderRadius: "50%",
}));

const PostImageWrapper = styled(Box)(() => ({
  width: "100%",
  marginTop: 16,
  overflow: "hidden",
  borderRadius: "8px",
}));

const PostCard: FC<PostCardProps> = ({ post, handleMore }) => {
  const theme = useTheme();
  return (
    <Card sx={{ padding: 2, mb: 3 }}>
      <FlexBox justifyContent="space-between">
        <FlexBox alignItems="center">
          <ImageWrapper>
            {/* <img
              src="/static/user/user-10.png"
              alt="User"
              width="100%"
              height="100%"
            /> */}
          </ImageWrapper>

          <Box marginLeft={1}>
            <H5 lineHeight={1}>Calendrier</H5>
            <Tiny fontWeight={500} color="text.disabled">
              22 June 2020
            </Tiny>
          </Box>
        </FlexBox>

        <IconButton onClick={handleMore}>
          <MoreVert fontSize="small" color="disabled" />
        </IconButton>
      </FlexBox>

      <Box marginTop={3}>
        <Small fontWeight={600}>{post.postTitle}</Small>

        {post.postImage && (
          <PostImageWrapper>
            <img src={post.postImage} alt="Post One" width="100%" />
          </PostImageWrapper>
        )}

        {/* <FlexBox alignItems="center" justifyContent="space-between" my={2}>
          {postDetails.map(({ Icon, count }, index) => (
            <ButtonBase disableRipple key={index}>
              <FlexBox alignItems="center">
                <Icon fontSize="small" color="disabled" />
                <H6 color="text.disabled" ml={1}>
                  {count}
                </H6>
              </FlexBox>
            </ButtonBase>
          ))}
        </FlexBox> */}


      </Box>
    </Card>
  );
};

const postDetails = [
  {
    Icon: Favorite,
    count: 150,
  },
  {
    Icon: CommentIcon,
    count: 15,
  },
  {
    Icon: UploadIcon,
    count: 15,
  },
  {
    Icon: ShareIcon,
    count: 12,
  },
];

export default PostCard;

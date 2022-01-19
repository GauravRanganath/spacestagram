import * as React from "react";
import post from "./post.module.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Collapsible from "react-collapsible-paragraph";
import { useState } from "react";

const Post = ({ data }) => {
  const [liked, setLikeStatus] = useState(localStorage.getItem(data.date));

  const handleInitLike = () => {
    if (liked === null) {
      localStorage.setItem(data.date, "true");
      setLikeStatus(true);
    } else {
      setLikeStatus(!liked);
    }
  };

  const copy = () => {
    const el = document.createElement("input");
    el.value = window.location.href + "post/" + data.date;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("Link copied to clipboard!")
  };

  const renderLike = () => {
    if (localStorage.getItem(data.date) === "false") {
      localStorage.setItem(data.date, liked.toString());
      return <FavoriteIcon color="disabled" />;
    } else if (localStorage.getItem(data.date) === "true") {
      localStorage.setItem(data.date, liked.toString());
      return <FavoriteIcon color="error" />;
    } else {
      return <FavoriteIcon color="disabled" />;
    }
  };

  const renderContent = () => {
    if (data.media_type === "video") {
      return (
        <CardMedia
          component="iframe"
          image={data.url}
          alt={data.name}
        />
      );
    } else {
      return (
        <CardMedia
          component="img"
          height="500"
          image={data.url}
          alt={data.name}
        />
      );
    }
  };

  return (
    <Card className={post.post} sx={{ maxWidth: 500 }}>
      <CardHeader title={data.title} subheader={data.date} />
      {renderContent()}
      <CardContent>
        <Typography variant="body2" color="text.secondary" textAlign="justify">
          <Collapsible lines={2}>{data.explanation}</Collapsible>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => handleInitLike()}
        >
          {renderLike()}
        </IconButton>
        <IconButton aria-label="share" onClick={() => copy()}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;

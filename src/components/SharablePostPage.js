import Post from "./Post";
import { Container, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

export default function SharablePostPage() {
  const { postDate } = useParams();
  const [APOD, setAPOD] = useState([]);

  let apodCall =
    "https://api.nasa.gov/planetary/apod?api_key=ge9zXukzme64aq3NwaMD4fVSNsNfu1R7cvsWVFq7&date=" +
    postDate;

  useEffect(() => {
    Axios.get(apodCall).then((response) => {
      setAPOD(response.data);
    });
  }, [apodCall]);

  const renderPosts = () => {
    if (APOD.length !== 0) {
      console.log(APOD)
      return <Post data={APOD}></Post>;
    } else {
      return <CircularProgress />;
    }
  };

  return (
    <div>
      <Container maxWidth="sm">{renderPosts()}</Container>
    </div>
  );
}

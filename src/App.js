import { Container, CircularProgress, Grid } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Axios from "axios";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import SharablePostPage from "./components/SharablePostPage";
import "react-datepicker/dist/react-datepicker.css";

function App() {
  let defaultStartDate = new Date();
  let defaultEndDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() - 5);

  const [APOD, setAPOD] = useState([]);
  const [startDate, setAPODStartDate] = useState(defaultStartDate);
  const [endDate, setAPODEndDate] = useState(defaultEndDate);

  let apodCall =
    "https://api.nasa.gov/planetary/apod?api_key=ge9zXukzme64aq3NwaMD4fVSNsNfu1R7cvsWVFq7&start_date=" +
    startDate.getFullYear() +
    "-" +
    (startDate.getMonth() + 1) +
    "-" +
    startDate.getDate() +
    "&end_date=" +
    endDate.getFullYear() +
    "-" +
    (endDate.getMonth() + 1) +
    "-" +
    endDate.getDate();

  useEffect(() => {
    Axios.get(apodCall).then((response) => {
      setAPOD(response.data);
    });
  }, [apodCall]);

  const renderPosts = () => {
    if (APOD.length !== 0) {
      return APOD.reverse().map((data) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Post data={data}></Post>
        </div>
      ));
    } else {
      return (
        <CircularProgress
          style={{
            marginTop: "25px",
            marginBottom: "25px",
            marginLeft: "-6px",
          }}
          color="inherit"
        />
      );
    }
  };

  const Home = () => {
    return (
      <div className="App">
        <Navbar
          setAPODStartDate={setAPODStartDate}
          setAPODEndDate={setAPODEndDate}
          setAPOD={setAPOD}
          startDate={startDate}
          endDate={endDate}
        />

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ textAlign: "center", paddingBottom: "50px" }}
        >
          <Grid
            item
            xs={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <div>
              <p>
                Brought to you by NASA's Astronomy Photo of the Day (APOD) API
              </p>
              <RocketLaunchIcon />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <div>{renderPosts()}</div>
          </Grid>
        </Grid>
      </div>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="post/:postDate" element={<SharablePostPage />} />
    </Routes>
  );
}

export default App;

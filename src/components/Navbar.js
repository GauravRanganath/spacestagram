import * as React from "react";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import navbar from "./navbar.module.css";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useState } from "react";

export default function ButtonAppBar({
  setAPODStartDate,
  setAPODEndDate,
  setAPOD,
  startDate,
  endDate,
}) {
  const SelectDates = () => {
    const [newStartDate, setNewStartDate] = useState(startDate);
    const [newEndDate, setNewEndDate] = useState(endDate);

    const setNewDates = () => {
      if (newStartDate <= newEndDate) {
        let tempStartDate = new Date(newStartDate);
        let tempEndDate = new Date(newEndDate);

        tempStartDate.setDate(tempStartDate.getDate() + 1);
        tempEndDate.setDate(tempEndDate.getDate() + 1);

        setAPODStartDate(tempStartDate);
        setAPODEndDate(tempEndDate);
      } else {
        alert("Please select valid dates!");
      }
    };

    return (
      <div>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label="Start Date"
            size="small"
            type="date"
            variant="outlined"
            value={newStartDate}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setNewStartDate(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="End Date"
            size="small"
            type="date"
            variant="outlined"
            value={newEndDate}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setNewEndDate(e.target.value)}
          />
          <Button
            style={{
              backgroundColor: "#96bf48",
              width: "40px",
            }}
            variant="contained"
            onClick={() => setNewDates()}
          >
            Go!
          </Button>
        </Box>
      </div>
    );
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#FDFEFE" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box>
            <RocketLaunchIcon />
          </Box>
          <Typography
            variant="h6"
            className={navbar.logo}
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <p className={navbar.logo}>spacestagram</p>
          </Typography>

          <Box
            style={{ marginLeft: "auto" }}
            sx={{ justifyContent: "flex-end" }}
          >
            {SelectDates()}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

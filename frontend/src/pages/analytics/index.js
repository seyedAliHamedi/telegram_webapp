import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";

import MessagesAnalytics from "./Messages";
import UsersAnalytics from "./Users";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import "./../../../static/style/analytics.css";
function Analytics() {
  const [isMessagesPage, setIsMessagesPage] = useState(true);
  return (
    <div className="analytics">
      <div className="analytics__appbar">
        {/* <IconButton sx={{ color: "white" }}> */}
        {/* <ArrowBackIosIcon sx={{ fontSize: "28px" }} /> */}
        {/* </IconButton> */}
        <div className="analytics__appbar-title">
          <Typography variant="h1">Analytics</Typography>
          <Typography variant="h5">Observe your data better</Typography>
        </div>
      </div>
      <div className="analytics__tab">
        <div className="analytics__tab-buttons">
          <button
            onClick={() => setIsMessagesPage(true)}
            className={
              isMessagesPage ? "analytics__tab-buttons--active" : undefined
            }
          >
            Messages
          </button>
          <button
            onClick={() => setIsMessagesPage(false)}
            className={
              isMessagesPage ? undefined : "analytics__tab-buttons--active"
            }
          >
            Users
          </button>
        </div>
        <Box className="analytics__tab-container">
          {isMessagesPage ? <MessagesAnalytics /> : <UsersAnalytics />}
        </Box>
      </div>
    </div>
  );
}

export default Analytics;

import React from "react";
import { Box, Typography } from "@mui/material";
import MessagesChart from "../../components/MessagesChart";
import messagesData from "./../../data/mockdata";
import UsersChart from "../../components/UsersChart";
function MessagesAnalytics() {
  return (
    <Box className="messages">
      <Typography variant="h3" color="#000000" fontWeight="bold">
        Users
      </Typography>
      <Typography variant="h6" color="#666666" fontWeight="400">
        See the history of Users followed
      </Typography>
      <Box className="messages__chart" sx={{ width: "100%", height: "400px" }}>
        <UsersChart data={messagesData} />
      </Box>
    </Box>
  );
}
export default MessagesAnalytics;

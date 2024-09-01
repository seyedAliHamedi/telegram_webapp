import React from "react";
import { Box, Typography } from "@mui/material";
import MessagesChart from "../../components/MessagesChart";
import messagesData from "./../../data/mockdata";
function MessagesAnalytics() {
  return (
    <Box className="messages">
      <Typography variant="h3" color="#000000" fontWeight="bold">
        Messages
      </Typography>
      <Typography variant="h6" color="#666666" fontWeight="400">
        See the history of messages submitted
      </Typography>
      <Box className="messages__chart" sx={{ width: "100%", height: "400px" }}>
        <MessagesChart data={messagesData} />
      </Box>
    </Box>
  );
}
export default MessagesAnalytics;

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
} from "@mui/material";
import { fetchCareerHead, updateCareerHead } from "../../AdminServices";
import Notification from "../../../Notification/Notification";

function EditCarrerHead() {
  const [careerHead, setCareerHead] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    carrer_heading: "",
    carrer_content: "",
  });

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("error");
  const fetchData = async () => {
    try {
      const data = await fetchCareerHead();
      setCareerHead(data);
    } catch (error) {
      console.error("Error fetching career head data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleEditOpen = () => {
    setEditedData({
      carrer_heading: careerHead.carrer_heading,
      carrer_content: careerHead.carrer_content,
    });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (
      !editedData.carrer_heading.trim() ||
      !editedData.carrer_content.trim()
    ) {
      setNotificationMessage("All fields are required.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return;
    }

    try {
      const response = await updateCareerHead(editedData);
      setEditOpen(false);

      const updatedData = await fetchCareerHead();
      setCareerHead(updatedData);

      setNotificationMessage(response.message);
      setNotificationSeverity("success");
      setNotificationOpen(true);
    } catch (error) {
      console.error("Error updating career head data:", error);

      setNotificationMessage("Failed to update career head.");
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotificationOpen(false);
  };

  if (!careerHead) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Typography variant="h5" component="h5">
        Edit Carrer Head
      </Typography>
      <TableContainer component={Paper} style={{ marginTop: "10px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Heading</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>{careerHead.carrer_heading}</TableCell>
              <TableCell>{careerHead.carrer_content}</TableCell>
              <TableCell>
                <Button onClick={handleEditOpen}>Edit</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Career Head</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="carrer_heading"
            label="Career Heading"
            fullWidth
            value={editedData.carrer_heading}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="carrer_content"
            label="Career Content"
            fullWidth
            multiline
            rows={4}
            value={editedData.carrer_content}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Notification
        open={notificationOpen}
        handleClose={handleNotificationClose}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </div>
  );
}

export default EditCarrerHead;

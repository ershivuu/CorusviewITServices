import React, { useState, useEffect } from "react";
import {
  TextField,
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
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import {
  fetchAllSolutions,
  updateSolution,
  deleteSolution,
  addSolution,
  fetchOnlyOurServiceHead,
} from "../../AdminServices";
import Notification from "../../../Notification/Notification"; // Replace with actual path

function EditServiceSolution() {
  const [solutions, setSolutions] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [editedHeading, setEditedHeading] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newHeading, setNewHeading] = useState("");
  const [newContent, setNewContent] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [ourServicesHeadings, setOurServicesHeadings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Notification state
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("info");

  const fetchData = async () => {
    try {
      const solutionsData = await fetchAllSolutions();
      setSolutions(solutionsData.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching solutions:", error);
      setError(error);
      setLoading(false);
      showNotification(
        "Failed to fetch solutions. Please try again later.",
        "error"
      );
    }
  };

  const fetchOurServiceHeadings = async () => {
    try {
      const data = await fetchOnlyOurServiceHead();
      setOurServicesHeadings(data);
    } catch (error) {
      console.error("Error fetching our service headings:", error);
      showNotification(
        "Failed to fetch service headings. Please try again later.",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchData();
    fetchOurServiceHeadings();
  }, []);

  const handleEditClick = (solution) => {
    setSelectedSolution(solution);
    setEditedHeading(solution.solutions_inner_heading);
    setEditedContent(solution.solutions_inner_content);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedSolution(null);
    setEditedHeading("");
    setEditedContent("");
  };

  const handleSaveChanges = async () => {
    try {
      const updatedData = {
        service_id: selectedSolution.service_id,
        solutions_inner_heading: editedHeading,
        solutions_inner_content: editedContent,
      };
      const response = await updateSolution(
        selectedSolution.solutions_id,
        updatedData
      );
      await fetchData();
      handleCloseEditDialog();
      showNotification("Solution updated successfully.", "success");
    } catch (error) {
      console.error("Error updating solution:", error);
      showNotification(
        "Failed to update solution. Please try again later.",
        "error"
      );
    }
  };

  const handleDeleteClick = (solution) => {
    setSelectedSolution(solution);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteSolution(selectedSolution.solutions_id);
      await fetchData();
      handleCloseDeleteDialog();
      showNotification("Solution deleted successfully.", "success");
    } catch (error) {
      console.error("Error deleting solution:", error);
      showNotification(
        "Failed to delete solution. Please try again later.",
        "error"
      );
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedSolution(null);
  };

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleSaveNewSolution = async () => {
    try {
      if (!selectedService) {
        showNotification("Please select a service heading.", "error");
        return;
      }
      if (!newHeading.trim() || !newContent.trim()) {
        showNotification("Please fill in all fields.", "error");
        return;
      }

      const newSolution = {
        solutions_inner_heading: newHeading,
        solutions_inner_content: newContent,
        our_services_heading: selectedService.heading,
        service_id: selectedService.id,
      };
      const response = await addSolution(newSolution);
      await fetchData();
      handleCloseAddDialog();
      showNotification("New solution added successfully.", "success");
    } catch (error) {
      console.error("Error adding solution:", error);
      showNotification(
        "Failed to add new solution. Please try again later.",
        "error"
      );
    }
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewHeading("");
    setNewContent("");
    setSelectedService("");
  };

  const showNotification = (message, severity) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setOpenNotification(true);
  };

  const handleCloseNotification = () => {
    setOpenNotification(false);
  };

  // Render loading indicator while fetching data
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Render error message if data fetch fails
  if (error) {
    return (
      <Typography variant="body1" style={{ padding: "20px" }}>
        Error fetching solutions. Please try again later.
      </Typography>
    );
  }

  // Render solutions table if solutions array is defined and not empty
  return (
    <Box>
      <Typography variant="h5" component="h5">
        Edit Service Solution
      </Typography>
      <Button
        onClick={handleAddClick}
        variant="contained"
        color="primary"
        style={{ marginTop: "10px" }}
      >
        Add New Solution
      </Button>
      <TableContainer
        component={Paper}
        style={{ marginTop: "10px", maxHeight: "500px", overflow: "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Our Services Heading</TableCell>
              <TableCell>Inner Heading</TableCell>
              <TableCell>Inner Content</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {solutions.map((solution) => (
              <TableRow key={solution.solutions_id}>
                <TableCell>{solution.solutions_id}</TableCell>
                <TableCell>{solution.our_services_heading}</TableCell>
                <TableCell>{solution.solutions_inner_heading}</TableCell>
                <TableCell>{solution.solutions_inner_content}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(solution)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => handleDeleteClick(solution)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Solution</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Inner Heading"
            fullWidth
            value={editedHeading}
            onChange={(e) => setEditedHeading(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Inner Content"
            fullWidth
            multiline
            rows={4}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button onClick={handleSaveChanges} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Solution</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this solution?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Solution</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Select Our Service Heading</InputLabel>
            <Select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              fullWidth
              name="selectedOurService"
            >
              {ourServicesHeadings.map((service) => (
                <MenuItem key={service.id} value={service}>
                  {service.heading}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            label="Inner Heading"
            fullWidth
            value={newHeading}
            onChange={(e) => setNewHeading(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Inner Content"
            fullWidth
            multiline
            rows={4}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button onClick={handleSaveNewSolution} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Notification
        open={openNotification}
        handleClose={handleCloseNotification}
        alertMessage={notificationMessage}
        alertSeverity={notificationSeverity}
      />
    </Box>
  );
}

export default EditServiceSolution;

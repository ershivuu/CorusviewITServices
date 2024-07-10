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
  CircularProgress, // Added CircularProgress for loading indicator
} from "@mui/material";
import {
  fetchAllSolutions,
  updateSolution,
  deleteSolution,
  addSolution,
  fetchOnlyOurServiceHead,
} from "../../AdminServices";
import Notification from "../../../Notification/Notification";

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

  // Notification state
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const fetchData = async () => {
    try {
      const solutionsData = await fetchAllSolutions();
      console.log("Fetched solutions:", solutionsData.data); // Log fetched data
      setSolutions(solutionsData.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching solutions:", error);
      setError(error); // Set error state
      setLoading(false); // Set loading to false on error
    }
  };

  const fetchOurServiceHeadings = async () => {
    try {
      const data = await fetchOnlyOurServiceHead();
      setOurServicesHeadings(data);
    } catch (error) {}
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
        service_id: selectedSolution.service_id, // Add service_id to the updated data
        solutions_inner_heading: editedHeading,
        solutions_inner_content: editedContent,
      };
      const response = await updateSolution(
        selectedSolution.solutions_id,
        updatedData
      );
      await fetchData(); // Refresh the solutions list after successful update
      handleCloseEditDialog();
      // Show success notification
      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error updating solution:", error);
      // Handle error as needed
      handleNotification("Error updating solution", "error");
    }
  };

  const handleDeleteClick = (solution) => {
    setSelectedSolution(solution);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteSolution(selectedSolution.solutions_id);
      await fetchData(); // Refresh the solutions list after successful deletion
      handleCloseDeleteDialog();
      // Show success notification
      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error deleting solution:", error);
      // Handle error as needed
      handleNotification(error.message, "error");
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
      const newSolution = {
        solutions_inner_heading: newHeading,
        solutions_inner_content: newContent,
        our_services_heading: selectedService.heading, // Assuming selectedService contains the correct heading
        service_id: selectedService.id, // Add service_id to the new solution data
      };
      const response = await addSolution(newSolution);
      await fetchData(); // Refresh the solutions list after successful addition
      handleCloseAddDialog();
      // Show success notification
      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error adding solution:", error);
      // Handle error as needed
      handleNotification(error.message, "error");
    }
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewHeading("");
    setNewContent("");
  };

  const handleNotification = (message, severity) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setOpenNotification(true);
  };

  const handleCloseNotification = () => {
    setOpenNotification(false);
  };

  // Show loading indicator if data is still loading
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

  // Show error message if there was an error fetching data
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
      {/* Table of Solutions */}
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
            {solutions &&
              solutions.map((solution) => (
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

      {/* Edit Dialog */}
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

      {/* Delete Confirmation Dialog */}
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

      {/* Add Dialog */}
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

      {/* Notification */}
      <Notification
        open={openNotification}
        onClose={handleCloseNotification}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </Box>
  );
}

export default EditServiceSolution;

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
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  fetchWhatYouGetServices,
  updateWhatYouGetService,
  deleteWhatYouGetService,
  addWhatYouGetService,

  fetchOnlyOurServiceHead,
} from "../../AdminServices"; 
import Notification from "../../../Notification/Notification";

function EditWhatYouGet() {
  const [services, setServices] = useState([]);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [editedHeading, setEditedHeading] = useState("");
  const [newHeading, setNewHeading] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State for delete confirmation dialog
  const [deleteServiceId, setDeleteServiceId] = useState(null); // State to hold the service ID to delete
  const [ourServicesHeadings, setOurServicesHeadings] = useState([]);

  // Notification state
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState("success");

  const getServices = async () => {
    try {
      const data = await fetchWhatYouGetServices();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchOurServiceHeadings = async () => {
    try {
      const data = await fetchOnlyOurServiceHead();
      setOurServicesHeadings(data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchOurServiceHeadings();
    getServices();
  }, []);

  const handleEditClick = (service) => {
    setSelectedService(service);
    setEditedHeading(service.heading);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedService(null);
    setEditedHeading("");
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        service_id: selectedService.service_id,
        heading: editedHeading,
      };
      const response = await updateWhatYouGetService(
        selectedService.wyg_id,
        updatedData
      );
      getServices();
      handleCloseEditDialog();
      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error updating service:", error);
      // Handle error as needed
      handleNotification("Error updating service", "error");
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteServiceId(id); // Set the service ID to delete
    setOpenDeleteDialog(true); // Open the delete confirmation dialog
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await deleteWhatYouGetService(deleteServiceId);
      // Refresh the services list after successful deletion

      getServices();
      handleCloseDeleteDialog(); // Close the delete confirmation dialog
      // Show success notification
      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error deleting service:", error);
      // Handle error as needed
      handleNotification("Error deleting service", "error");
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false); // Close the delete confirmation dialog
    setDeleteServiceId(null); // Clear the delete service ID
  };

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewHeading("");
  };

  const handleAddService = async () => {
    try {
      // Ensure selectedService is not null before proceeding
      if (!selectedService) {
        handleNotification("Please select a service", "error");
        return;
      }

      const newService = {
        service_id: selectedService.id, // Assuming 'id' is the correct property of selectedService
        heading: newHeading,
      };
      const response = await addWhatYouGetService(newService);
      await getServices(); // Refresh the services list after adding a new service
      handleCloseAddDialog();

      handleNotification(response.message, "success");
    } catch (error) {
      console.error("Error adding service:", error);
      handleNotification("Error adding service", "error");
    }
  };

  const handleNotification = (message, severity) => {
    setNotificationMessage(message);
    setNotificationSeverity(severity);
    setOpenNotification(true);
  };

  const handleCloseNotification = () => {
    setOpenNotification(false);
  };

  const handleEditedHeadingChange = (e) => {
    if (e.target.value.length >= 50) {
      handleNotification("Cannot update with more than 50 characters", "error");
    } else {
      setEditedHeading(e.target.value);
    }
  };

  const handleNewHeadingChange = (e) => {
    if (e.target.value.length >= 50) {
      handleNotification("Cannot insert more than 50 characters", "error");
    } else {
      setNewHeading(e.target.value);
    }
  };

  return (
    <div>
      <Typography variant="h5" component="h5">
        Edit What You Will Get
      </Typography>
      <Button
        onClick={handleAddClick}
        variant="contained"
        color="primary"
        style={{  marginTop: "10px" }}
      >
        Add Service
      </Button>
      <TableContainer
        component={Paper}
        style={{ marginTop: "10px", maxHeight: "500px", overflow: "auto" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>S no.</TableCell>
              <TableCell>Our Services Heading</TableCell>
              <TableCell>Service Heading</TableCell>

              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service, index) => (
              <TableRow key={service.wyg_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{service.our_services_heading}</TableCell>
                <TableCell>{service.heading}</TableCell>

                <TableCell>
                  <Button onClick={() => handleEditClick(service)}>Edit</Button>
                </TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => handleDeleteClick(service.wyg_id)}
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
        <DialogTitle>Edit Service</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Heading"
            fullWidth
            value={editedHeading}
            onChange={handleEditedHeadingChange}
            inputProps={{ maxLength: 50 }}
            error={editedHeading.length > 50}
            helperText={
              editedHeading.length > 50 ? "Cannot exceed 50 characters" : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
          <Button
            onClick={handleUpdate}
            color="primary"
            disabled={editedHeading.length > 50}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
        <DialogTitle>Add New Service</DialogTitle>
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
            label="Heading"
            fullWidth
            value={newHeading}
            onChange={(e) => setNewHeading(e.target.value)}
            inputProps={{ maxLength: 50 }}
            error={newHeading.length > 50}
            helperText={
              newHeading.length > 50 ? "Cannot exceed 50 characters" : ""
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog}>Cancel</Button>
          <Button
            onClick={handleAddService}
            color="primary"
            disabled={newHeading.length > 50 || !selectedService}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContent>
            Are you sure you want to delete this service?
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Notification
          open={openNotification}
          handleClose={handleCloseNotification}
          alertMessage={notificationMessage}
          alertSeverity={notificationSeverity}
        />
    </div>
  );
}

export default EditWhatYouGet;

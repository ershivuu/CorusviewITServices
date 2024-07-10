import React, { useEffect, useState } from "react";
import {
  fetchServicesHead,
  updateServicesHead,
  addServicesHead,
  fetchOnlyOurServiceHead
} from "../../AdminServices";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Notification from "../../../Notification/Notification"; // Adjust the path as per your project structure
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

function EditServicesHead() {
  const [servicesHead, setServicesHead] = useState([]);
  const [ourServicesHeadings, setOurServicesHeadings] = useState([]);
  const [error, setError] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    details_id: null,
    services_heading: "",
    services_content: ""
  });
  const [addData, setAddData] = useState({
    service_id: 0, // Initialize with appropriate default value or set according to your application logic
    services_heading: "",
    services_content: ""
  });
  
  const [selectedOurService, setSelectedOurService] = useState(null);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  useEffect(() => {
    fetchData();
    fetchOurServiceHeadings();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchServicesHead();
      setServicesHead(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchOurServiceHeadings = async () => {
    try {
      const data = await fetchOnlyOurServiceHead();
      setOurServicesHeadings(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEditOpen = (data) => {
    setEditedData(data);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
    setAddData({
      service_id: null,
      services_heading: "",
      services_content: ""
    });
    setSelectedOurService(null);
  };

  const handleEditChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddChange = (e) => {
    if (e.target.name === "selectedOurService") {
      setSelectedOurService(e.target.value);
      // Update service_id based on selected service
      
      setAddData({
        ...addData,
        service_id: e.target.value.id // Adjust according to how service_id is determined
      });
    } else {
      setAddData({
        ...addData,
        [e.target.name]: e.target.value,
      });
    }
  };
  

  const handleEdit = async () => {
    try {
      const response = await updateServicesHead(editedData.details_id, editedData);
      setEditOpen(false);
      if (response && response.message) {
        setAlertMessage(response.message);
        setAlertSeverity("success");
        setNotificationOpen(true);
      } else {
        setAlertMessage(response.error);
        setAlertSeverity("error");
        setNotificationOpen(true);
      }
      fetchData();
    } catch (error) {
      setAlertMessage("failed to Updated data");
      setAlertSeverity("error");
      setNotificationOpen(true);
    }
  };

const handleAdd = async () => {
  try {
    const dataToAdd = {
      ...addData,
      our_services_heading: selectedOurService.heading,
      service_id: addData.service_id
    };
    const response = await addServicesHead(dataToAdd);

    if (response.message) {
      setAlertMessage(response.message);
      setAlertSeverity("success");
    } else {
      setAlertMessage("Unknown response from server");
      setAlertSeverity("error");
    }
    setNotificationOpen(true);
    
    setAddOpen(false);
    setAddData({
      service_id: null,
      services_heading: "",
      services_content: ""
    });

    fetchData();
  } catch (error) {
    // Check if error.response exists to handle API response errors
    if (error.response && error.response.data && error.response.data.error) {
      setAlertMessage(error.response.data.error);
    } else {
      setAlertMessage("Failed to add data");
    }
    setAlertSeverity("error");
    setNotificationOpen(true);
  }
};

  
  

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error: {error}
      </Typography>
    );
  }

  if (!servicesHead.length) {
    return (
      <Typography variant="h6" color="textSecondary">
        Loading...
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h5" component="h5">
        Edit Service Head
      </Typography>

      <Button    variant="contained"
          color="primary" onClick={handleAddOpen} style={{ marginBottom: '10px' }}>
        Add Service
      </Button>

      <TableContainer component={Paper} style={{ marginTop: "10px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S No.</TableCell>
              <TableCell>Our Services Heading</TableCell>
              <TableCell>Services Heading</TableCell>
              <TableCell>Services Content</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {servicesHead.map((service, index) => (
              <TableRow key={service.details_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{service.our_services_heading}</TableCell>
                <TableCell>{service.services_heading}</TableCell>
                <TableCell>{service.services_content}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditOpen(service)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Services</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="services_heading"
            name="services_heading"
            label="Services Heading"
            fullWidth
            value={editedData.services_heading}
            onChange={handleEditChange}
          />
          <TextField
            margin="dense"
            id="services_content"
            name="services_content"
            label="Services Content"
            fullWidth
            multiline
            rows={4}
            value={editedData.services_content}
            onChange={handleEditChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addOpen} onClose={handleAddClose}>
        <DialogTitle>Add New Service</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Select Our Service Heading</InputLabel>
            <Select
              value={selectedOurService}
              onChange={(e) => handleAddChange(e)}
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
            margin="dense"
            id="services_heading"
            name="services_heading"
            label="Services Heading"
            fullWidth
            value={addData.services_heading}
            onChange={handleAddChange}
          />
          <TextField
            margin="dense"
            id="services_content"
            name="services_content"
            label="Services Content"
            fullWidth
            multiline
            rows={4}
            value={addData.services_content}
            onChange={handleAddChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Notification
        open={notificationOpen}
        handleClose={handleNotificationClose}
        alertMessage={alertMessage}
        alertSeverity={alertSeverity}
      />
    </>
  );
}

export default EditServicesHead;

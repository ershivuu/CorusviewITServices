import React, { useEffect, useState } from "react";
import {
  fetchOurServicesData,
  updateServiceData,
  addServiceData,
  deleteServiceData,
} from "../../AdminServices";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Notification from "../../../Notification/Notification"; 

const MAX_HEADING_LENGTH = 25;
const MAX_CONTENT_LENGTH = 5000;

function EditServices() {
  const [servicesData, setServicesData] = useState([]);
  const [error, setError] = useState(null);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newService, setNewService] = useState({
    icon_img: null,
    heading: "",
    content: "",
  });
  const [addFileError, setAddFileError] = useState(null);
  const [addButtonDisabled, setAddButtonDisabled] = useState(false); 
  const [headingError, setHeadingError] = useState(null);
  const [contentError, setContentError] = useState(null);
  const [headingErrorNotification, setHeadingErrorNotification] =
    useState(null);
  const [contentErrorNotification, setContentErrorNotification] =
    useState(null);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editedService, setEditedService] = useState({
    id: null,
    icon_img: null,
    heading: "",
    content: "",
  });
  const [editFileError, setEditFileError] = useState(null);
  const [editButtonDisabled, setEditButtonDisabled] = useState(false); 
  const [editHeadingError, setEditHeadingError] = useState(null);
  const [editContentError, setEditContentError] = useState(null);
  const [editHeadingErrorNotification, setEditHeadingErrorNotification] =
    useState(null);
  const [editContentErrorNotification, setEditContentErrorNotification] =
    useState(null);


  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchData = async () => {
    try {
      const data = await fetchOurServicesData();
      setServicesData(data);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenEditDialog = (service) => {
    setEditedService({ ...service, icon_img: null }); 
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditHeadingError(null); 
    setEditContentError(null); 
    setEditHeadingErrorNotification(null); 
    setEditContentErrorNotification(null); 
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setNewService({ icon_img: null, heading: "", content: "" }); 
    setAddFileError(null); 
    setAddButtonDisabled(false); 
    setHeadingError(null); 
    setContentError(null); 
    setHeadingErrorNotification(null); 
    setContentErrorNotification(null); 
  };

  const handleAddChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "icon_img") {
      const file = files[0]; 
      if (file) {
        const fileSize = file.size / 1024 / 1024; 
        const fileType = file.type.split("/")[1]; 

        if (!["png", "jpg", "jpeg"].includes(fileType)) {
          setAddFileError(
            "Unsupported file type. Please upload PNG, JPG, or JPEG files."
          );
          setAddButtonDisabled(true); 
        } else if (fileSize > 20) {
          setAddFileError(
            "File size exceeds 20 MB. Please upload a smaller file."
          );
          setAddButtonDisabled(true); 
        } else {
          setNewService({ ...newService, icon_img: file });
          setAddFileError(null); 
          setAddButtonDisabled(false); 
        }
      }
    } else if (name === "heading") {
      if (value.length >= MAX_HEADING_LENGTH) {
        setHeadingError(
          `Heading cannot exceed ${MAX_HEADING_LENGTH} characters.`
        );
        setHeadingErrorNotification(
          `Heading cannot exceed ${MAX_HEADING_LENGTH} characters.`
        );
      } else {
        setNewService({ ...newService, heading: value });
        setHeadingError(null); 
        setHeadingErrorNotification(null); 
      }
    } else if (name === "content") {
      if (value.length >= MAX_CONTENT_LENGTH) {
        setContentError(
          `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`
        );
        setContentErrorNotification(
          `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`
        );
      } else {
        setNewService({ ...newService, content: value });
        setContentError(null); 
        setContentErrorNotification(null); 
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "icon_img") {
      const file = files[0]; 
      if (file) {
        const fileSize = file.size / 1024 / 1024; 
        const fileType = file.type.split("/")[1]; 

        if (!["png", "jpg", "jpeg"].includes(fileType)) {
          setEditFileError(
            "Unsupported file type. Please upload PNG, JPG, or JPEG files."
          );
          setEditButtonDisabled(true); 
        } else if (fileSize > 20) {
          setEditFileError(
            "File size exceeds 20 MB. Please upload a smaller file."
          );
          setEditButtonDisabled(true); 
        } else {
          setEditedService({ ...editedService, icon_img: file });
          setEditFileError(null); 
          setEditButtonDisabled(false); 
        }
      }
    } else if (name === "heading") {
      if (value.length >= MAX_HEADING_LENGTH) {
        setEditHeadingError(
          `Heading cannot exceed ${MAX_HEADING_LENGTH} characters.`
        );
      } else {
        setEditedService({ ...editedService, heading: value });
        setEditHeadingError(null);
      }
    } else if (name === "content") {
      if (value.length >= MAX_CONTENT_LENGTH) {
        setEditContentError(
          `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`
        );
      } else {
        setEditedService({ ...editedService, content: value });
        setEditContentError(null);
      }
    }
  };
  const handleSubmitAdd = async () => {
    try {
      
      if (!newService.icon_img) {
        setAddFileError("Icon image is required.");
        return; 
      } else {
        setAddFileError(null);
      }

      if (!newService.heading) {
        setHeadingError("Heading is required.");
        return; 
      } else if (newService.heading.length >= MAX_HEADING_LENGTH) {
        setHeadingError(
          `Heading cannot exceed ${MAX_HEADING_LENGTH} characters.`
        );
        return; 
      } else {
        setHeadingError(null);
      }

      if (!newService.content) {
        setContentError("Content is required.");
        return; 
      } else if (newService.content.length > MAX_CONTENT_LENGTH) {
        setContentError(
          `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`
        );
        return; 
      } else {
        setContentError(null);
      }

      
      const formData = new FormData();
      formData.append("icon_img", newService.icon_img);
      formData.append("heading", newService.heading);
      formData.append("content", newService.content);

      const response = await addServiceData(formData);
      fetchData();
      handleCloseAddDialog();
      setSuccessMessage(response.message); 
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      
      if (!editedService.heading) {
        setEditHeadingError("Heading is required.");
        return;
      } else if (editedService.heading.length >= MAX_HEADING_LENGTH) {
        setEditHeadingError(
          `Heading cannot exceed ${MAX_HEADING_LENGTH} characters.`
        );
        return;
      }

      if (!editedService.content) {
        setEditContentError("Content is required.");
        return;
      } else if (editedService.content.length > MAX_CONTENT_LENGTH) {
        setEditContentError(
          `Content cannot exceed ${MAX_CONTENT_LENGTH} characters.`
        );
        return;
      }


      const formData = new FormData();
      formData.append("id", editedService.id);
      formData.append("heading", editedService.heading);
      formData.append("content", editedService.content);

      
      if (editedService.icon_img) {
        formData.append("icon_img", editedService.icon_img);
      }

    
      const response = await updateServiceData(editedService.id, formData);
      setSuccessMessage(response.message); 
      fetchData(); 
      handleCloseEditDialog();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      if (serviceToDelete) {
        const response = await deleteServiceData(serviceToDelete.id);
        fetchData(); 
        setOpenDeleteDialog(false);
        setSuccessMessage(response.message); 
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteDialogOpen = (service) => {
    setServiceToDelete(service);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleSuccessNotificationClose = () => {
    setSuccessMessage(null); 
  };

  return (
    <>
      <Typography variant="h5" component="h5">
        Edit Sevices
      </Typography>
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddDialog}
          style={{ marginBottom: "1rem", marginTop: "10px" }}
        >
          Add Service
        </Button>

        {successMessage && (
          <Notification
            open={true}
            handleClose={handleSuccessNotificationClose}
            alertMessage={successMessage}
            alertSeverity="success"
          />
        )}

        <TableContainer
          component={Paper}
          style={{ marginTop: "10px", maxHeight: "500px", overflow: "auto" }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Icon</TableCell>
                <TableCell>Heading</TableCell>
                <TableCell>Content</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {servicesData.map((service, index) => (
                <TableRow key={service.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={service.icon_img}
                      alt={service.icon_img_originalname}
                      style={{ width: 50 }}
                    />
                  </TableCell>
                  <TableCell>{service.heading}</TableCell>
                  <TableCell>{service.content}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpenEditDialog(service)}>
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      color="error"
                      onClick={() => handleDeleteDialogOpen(service)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialog for Adding */}
        <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
          <DialogTitle>Add New Service</DialogTitle>
          <DialogContent>
           
            {addFileError && (
              <Notification
                open={true}
                handleClose={() => setAddFileError(null)}
                alertMessage={addFileError}
                alertSeverity="error"
              />
            )}
            {headingError && (
              <Notification
                open={true}
                handleClose={() => setHeadingError(null)}
                alertMessage={headingError}
                alertSeverity="error"
              />
            )}
            {contentError && (
              <Notification
                open={true}
                handleClose={() => setContentError(null)}
                alertMessage={contentError}
                alertSeverity="error"
              />
            )}

            {/* Input Fields */}
            <TextField
              autoFocus
              margin="dense"
              type="file"
              fullWidth
              name="icon_img"
              onChange={handleAddChange}
              error={!!addFileError}
              helperText={addFileError}
              inputProps={{
                accept: "image/png, image/jpeg, image/jpg",
              }}
            />
            <TextField
              margin="dense"
              label="Heading"
              type="text"
              fullWidth
              name="heading"
              value={newService.heading}
              onChange={handleAddChange}
              // error={!!headingError}
              // helperText={headingError}
            />
            <TextField
              margin="dense"
              label="Content"
              type="text"
              fullWidth
              name="content"
              value={newService.content}
              onChange={handleAddChange}
              multiline
              rows={4}
              
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAddDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleSubmitAdd}
              color="primary"
              disabled={addButtonDisabled}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for Editing */}
        <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
          <DialogTitle>Edit Service</DialogTitle>
          <DialogContent>
            {editFileError && (
              <Notification
                open={true}
                handleClose={() => setEditFileError(null)}
                alertMessage={editFileError}
                alertSeverity="error"
              />
            )}
            {editHeadingErrorNotification && (
              <Notification
                open={true}
                handleClose={() => setEditHeadingErrorNotification(null)}
                alertMessage={editHeadingErrorNotification}
                alertSeverity="error"
              />
            )}
            {editContentErrorNotification && (
              <Notification
                open={true}
                handleClose={() => setEditContentErrorNotification(null)}
                alertMessage={editContentErrorNotification}
                alertSeverity="error"
              />
            )}
            <TextField
              margin="dense"
              type="file"
              fullWidth
              name="icon_img"
              onChange={handleEditChange}
              error={!!editFileError}
              helperText={editFileError}
              inputProps={{
                accept: "image/png, image/jpeg, image/jpg",
              }}
            />
            <TextField
              margin="dense"
              label="Heading"
              type="text"
              fullWidth
              name="heading"
              value={editedService.heading}
              onChange={handleEditChange}
        
            />
            <TextField
              margin="dense"
              label="Content"
              type="text"
              fullWidth
              name="content"
              value={editedService.content}
              onChange={handleEditChange}
              multiline
              rows={4}
          
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleSubmitEdit}
              color="primary"
              disabled={editButtonDisabled}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for Delete Confirmation */}
        <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete this service?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default EditServices;

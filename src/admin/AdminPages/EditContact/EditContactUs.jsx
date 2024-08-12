import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography
} from '@mui/material';
import { fetchContactUsInfo, updateContactUsInfo } from '../../AdminServices';
import Notification from '../../../Notification/Notification'; 

function EditContactUs() {
  const [contactInfo, setContactInfo] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedData, setEditedData] = useState({
    id: '',
    heading: '',
    email: '',
    phone: '',
    address: '',
  });


  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState('error'); // Default severity is error



  const fetchData = async () => {
    try {
      const data = await fetchContactUsInfo();
      setContactInfo(data);
    } catch (error) {
      console.error('Error fetching contact us info:', error);
 
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleEditClick = (row) => {
    setEditedData({ ...row }); 
    setEditDialogOpen(true);
  };

  const handleDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

const handleUpdate = async () => {
  try {
   
    if (!editedData.heading || !editedData.email || !editedData.phone || !editedData.address) {
      setNotificationMessage('All fields are required.');
      setNotificationSeverity('error');
      setNotificationOpen(true);
      return;
    }

    
    const response = await updateContactUsInfo(editedData); 
    setEditDialogOpen(false);
    fetchData(); 

  
    setNotificationMessage(response.message); 
    setNotificationSeverity('success');
    setNotificationOpen(true);
  } catch (error) {
    console.error('Error updating contact us info:', error);
  
    setNotificationMessage('Failed to update contact information.');
    setNotificationSeverity('error');
    setNotificationOpen(true);
  }
};


  const handleNotificationClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setNotificationOpen(false);
  };

  return (
    <div>
  <Typography variant="h5" component="h5">
      Edit Contact Us
    </Typography>
      {contactInfo && (
        <>
          <TableContainer component={Paper} style={{marginTop:"10px"}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Heading</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Edit</TableCell> 
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={contactInfo.id}>
                  <TableCell>{contactInfo.id}</TableCell>
                  <TableCell>{contactInfo.heading}</TableCell>
                  <TableCell>{contactInfo.email}</TableCell>
                  <TableCell>{contactInfo.phone}</TableCell>
                  <TableCell>{contactInfo.address}</TableCell>
                  <TableCell>
                    <Button  onClick={() => handleEditClick(contactInfo)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Edit Dialog */}
          <Dialog open={editDialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Edit Contact Information</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="heading"
                label="Heading"
                type="text"
                fullWidth
                value={editedData.heading}
                onChange={handleFieldChange}
              />
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                value={editedData.email}
                onChange={handleFieldChange}
              />
              <TextField
                margin="dense"
                name="phone"
                label="Phone"
                type="text"
                fullWidth
                value={editedData.phone}
                onChange={handleFieldChange}
              />
              <TextField
                margin="dense"
                name="address"
                label="Address"
                type="text"
                fullWidth
                value={editedData.address}
                onChange={handleFieldChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button onClick={handleUpdate}>Update</Button>
            </DialogActions>
          </Dialog>

        
          <Notification
            open={notificationOpen}
            handleClose={handleNotificationClose}
            alertMessage={notificationMessage}
            alertSeverity={notificationSeverity}
          />
        </>
      )}
    </div>
  );
}

export default EditContactUs;

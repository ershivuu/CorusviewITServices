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
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  fetchCareerWYS,
  updateCareerWYS,
  deleteCareerWYS,
  createCareerWYS,
} from "../../AdminServices";

function EditCarrerWYS() {
  const [careerData, setCareerData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [updatedHeading, setUpdatedHeading] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [newHeading, setNewHeading] = useState("");
  const [newContent, setNewContent] = useState("");

  const fetchData = async () => {
    try {
      const data = await fetchCareerWYS();
      setCareerData(data);
    } catch (error) {
      console.error("Error fetching career data:", error);
      // Handle errors as needed
    }
  };

  const handleEditClick = (career) => {
    setSelectedCareer(career);
    setUpdatedHeading(career.heading);
    setUpdatedContent(career.content);
    setOpenEdit(true);
  };

  const handleDeleteClick = (career) => {
    setSelectedCareer(career);
    setOpenDelete(true);
  };

  const handleAddClick = () => {
    setOpenAdd(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setNewHeading("");
    setNewContent("");
  };

  const handleUpdate = async () => {
    try {
      await updateCareerWYS(selectedCareer.id, {
        heading: updatedHeading,
        content: updatedContent,
      });
      fetchData(); // Refresh data after update
      handleCloseEdit();
    } catch (error) {
      console.error("Error updating career data:", error);
      // Handle errors as needed
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCareerWYS(selectedCareer.id);
      fetchData(); // Refresh data after delete
      handleCloseDelete();
    } catch (error) {
      console.error("Error deleting career data:", error);
      // Handle errors as needed
    }
  };

  const handleAdd = async () => {
    try {
      const newCareerData = {
        heading: newHeading,
        content: newContent,
      };
      await createCareerWYS(newCareerData);
      fetchData(); // Refresh data after add
      handleCloseAdd();
    } catch (error) {
      console.error("Error adding career data:", error);
      // Handle errors as needed
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Career Information</h2>
      <Button variant="contained" color="primary" onClick={handleAddClick}>
        Add Career
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Heading</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {careerData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.heading}</TableCell>
                <TableCell>{item.content}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleEditClick(item)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button color="error" onClick={() => handleDeleteClick(item)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Career Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Heading"
            type="text"
            fullWidth
            value={updatedHeading}
            onChange={(e) => setUpdatedHeading(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add Career Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Heading"
            type="text"
            fullWidth
            value={newHeading}
            onChange={(e) => setNewHeading(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Career Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this career information?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditCarrerWYS;
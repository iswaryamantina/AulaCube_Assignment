import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import DoneIcon from '@mui/icons-material/Done';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Tasks = ({ element, tasks, setTasks }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  const editHandler = (id) => {
    const taskToEdit = tasks.find((res) => res.id === id);
    if (taskToEdit) {
      setEditedTitle(taskToEdit.title);
      setEditedDescription(taskToEdit.description);
      handleOpen();
    }
  };

  const removeHandler = (id) => {
    const newTasks = tasks.filter((res) => res.id !== id);
    setTasks(newTasks);
  };

  const doneHandler = (id) => {
    const doneTasks = tasks.map((res) => {
      if (res.id === id) {
        return {
          ...res,
          done: true,
        };
      }
      return res;
    });

    setTasks(doneTasks);
  };

  const handleUpdate = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          title: editedTitle,
          description: editedDescription,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    handleClose();
  };

  return (
    <div className="w-auto items-center justify-center">
      <div>
        <Card className="flex justify-between" sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              style={{
                textDecoration: element.done ? 'line-through' : 'none',
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                hyphens: 'auto',
                transition: 'text-decoration 10s linear'
              }}
            >
              {element.title}
            </Typography>
            <Typography variant="body2"
              style={{
                textDecoration: element.done ? 'line-through' : 'none',
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                hyphens: 'auto',
                transition: 'text-decoration 10s linear'
              }}>
              {element.description}
            </Typography>
            <Typography
              variant="p"
              component="div"
              style={{
                fontWeight: 'bold',
                fontSize: '10px',
                marginTop: '10px',
                display: element.done ? 'none' : 'block',
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                hyphens: 'auto',
                transition: 'text-decoration 10s linear'
              }}
            >
             Priority: {element.priority}
            </Typography>
          </CardContent>
          <div>
            <IconButton
              aria-label="done"
              color="success"
              onClick={() => doneHandler(element.id)}
            >
              <DoneIcon />
            </IconButton>
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() => {
                editHandler(element.id);
                handleOpen();
              }}
            >
              <ModeEditOutlineIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => removeHandler(element.id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </Card>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
        >
          <Fade in={open}>
            <Box sx={style}>
              <form className="mb-5">
                <label className="flex flex-col items-center">
                  <span className="block text-xl font-medium text-slate-700">
                    Edit Task
                  </span>
                  <input
                    placeholder="Title"
                    id="title"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="w-full py-2 px-6 border-2 border-black rounded-xl placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 mt-2"
                  />
                </label>
                <label className="flex flex-col">
                  <textarea
                    placeholder="Description"
                    id="description"
                    name="description"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    className="border-black py-2 px-6 border-2 rounded-xl placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 mt-2 mb-5"
                    rows="4"
                    cols="50"
                  ></textarea>
                </label>
                <Button
                  variant="outlined"
                  startIcon={<ModeEditOutlineIcon />}
                  onClick={() => handleUpdate(element.id)}
                >
                  Edit Task
                </Button>
              </form>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default Tasks;

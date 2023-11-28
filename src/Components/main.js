import React from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import AlertTitle from "@mui/material/AlertTitle";
import Form from 'react-bootstrap/Form';

const Main = ({
  title,
  setTitle,
  description,
  setDescription,
  setTasks,
  priority,
  setPriority,
}) => {

  const handleChange = (e) => {
    if (e.target.id === "title") {
      setTitle(e.target.value);
    } else if (e.target.id === "description") {
      setDescription(e.target.value);
    } else if (e.target.id === "priority") {
      setPriority(e.target.value);
    }
  };

  const addTaskHandler = (e) => {
    e.preventDefault();
    if (!title || !description || !priority) {
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Please fill in all the fields before<strong>adding a task!!</strong>
        </Alert>
      );
    }
    setTasks((task) => [
      ...task,
      { title, description, priority, id: new Date().getTime() },
    ]);
    setTitle("");
    setDescription("");
    setPriority("Select Priority");
    return (
      <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
        Task is added successfully!
      </Alert>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <header className="w-full border-b-2">
        <nav className="bg-sky-600 p-4">
          <h1 className="text-center text-2xl text-white">
            Task Management Application
          </h1>
        </nav>
      </header>
      <div className="mt-8 w-full">
        <form>
          <label className="flex flex-col items-center">
            <span className="block text-xl font-medium text-slate-700">
              Add a task...
            </span>
            <input
              placeholder="Title"
              id="title"
              value={title}
              onChange={handleChange}
              className="lg:w-1/4 md:w-1/4 w-1/2 py-2 px-6 border-2 border-black rounded-xl placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 mt-2"
            />
          </label>
          <label className="flex flex-col items-center">
            <textarea
              id="description"
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleChange}
              className="lg:w-1/4 md:w-1/4 w-1/2 border-black py-2 px-6 border-2 rounded-xl placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-500 mt-2"
              rows="4"
              cols="50"
            ></textarea>
          </label>
          <div className="lg:w-1/4 md:w-1/4 w-1/2 border-2 border-black rounded-lg m-auto mt-2">
            <Form.Select
              id="priority"
              aria-label="Default select example"
              value={priority}
              onChange={handleChange}
            >
              <option>Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Select>
          </div>
        </form>
        <div className="flex flex-col items-center">
          <button
            onClick={addTaskHandler}
            className="flex justify-center gap-2 animate-bounce border-2 border-black lg:w-1/4 md:w-1/4 w-1/2 mt-5 py-2 rounded-xl bg-sky-600 text-white"
          >
            Add a Task <BsArrowDownCircle className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;

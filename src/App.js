import React, { useState } from "react";
import Main from "./Components/main";
import Tasks from "./Components/tasks";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState(getTasks);
  const [edit, setEdit] = useState("");
  const [priority, setPriority] = useState("Select Priority");
  localStorage.setItem("tasks", JSON.stringify(tasks));

  const tasksPerPage = 4;

  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;

  const tasksToShow = tasks.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Main
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          tasks={tasks}
          setTasks={setTasks}
          priority={priority}
          setPriority={setPriority}
        />
        {tasks.length === 0 ? (
          <h1 className="text-center text-2xl mt-8 text-slate-700">
            No tasks to display
          </h1>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 mt-6 mx-8">
            {tasksToShow.map((element) => (
              <Tasks
                element={element}
                key={element.id}
                tasks={tasks}
                setTasks={setTasks}
                setEdit={setEdit}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex m-auto mb-4 pt-4">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            color="primary"
            page={currentPage}
            onChange={(event, page) => setCurrentPage(page)}
          />
        </Stack>
      </div>
    </div>
  );
  function getTasks() {
    const task = localStorage.getItem("tasks");
    if (task) {
      return JSON.parse(task);
    } else {
      return [];
    }
  }
}

export default App;

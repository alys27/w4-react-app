import { createContext, useContext, useReducer, useEffect } from "react";

const TaskContext = createContext(null);
const API_URL = "http://localhost:3001/tasks";

const initialState = {
  tasks: [],
  loading: false,
};

function taskReducer(state, action) {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload };

    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };

    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "SET_TASKS", payload: data }))
      .catch((err) => console.error("Failed to fetch tasks:", err));
  }, []);

  const addTask = async (title) => {
    const tempId = "temp-" + Date.now();
    const optimisticTask = { id: tempId, title, completed: false };

    dispatch({ type: "ADD_TASK", payload: optimisticTask });

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, completed: false }),
      });
      const savedTask = await res.json();

      dispatch({ type: "DELETE_TASK", payload: tempId });
      dispatch({ type: "ADD_TASK", payload: savedTask });
    } catch (err) {
      dispatch({ type: "DELETE_TASK", payload: tempId });
      console.error("Failed to add task:", err);
    }
  };

  const deleteTask = async (id) => {
    const taskToDelete = state.tasks.find((t) => t.id === id);
    dispatch({ type: "DELETE_TASK", payload: id });

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    } catch (err) {
      dispatch({ type: "ADD_TASK", payload: taskToDelete });
      console.error("Failed to delete task:", err);
    }
  };

  const toggleTask = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    dispatch({ type: "UPDATE_TASK", payload: updatedTask });

    try {
      await fetch(`${API_URL}/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
    } catch (err) {
      dispatch({ type: "UPDATE_TASK", payload: task });
      console.error("Failed to update task:", err);
    }
  };

  return (
    <TaskContext.Provider value={{ state, addTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
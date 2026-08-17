import { useForm } from "react-hook-form";
import { useTasks } from "./TaskContext";

function TaskForm() {
  const { addTask } = useTasks();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    addTask(data.title.trim());
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="task-form">
      <input
        type="text"
        placeholder="Enter task title"
        {...register("title", {
          required: "Task title cannot be empty",
          minLength: {
            value: 3,
            message: "Task title must be at least 3 characters",
          },
          validate: (value) =>
            value.trim().length > 0 || "Task title cannot be empty",
        })}
      />
      <button type="submit" className="btn-primary" style={{ width: "auto" }}>
        Add
      </button>
      {errors.title && <p className="error-text">{errors.title.message}</p>}
    </form>
  );
}

export default TaskForm;
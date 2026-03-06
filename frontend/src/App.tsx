import "./App.css";
import TaskFilter from "./components/TaskFilter";
import TasksList from "./components/TasksList";

function App() {
  return (
    <div className="main">
      <div className="container">
        <div className="container__header">
          <h1>Task Manager App</h1>
          <TaskFilter />
        </div>

        <TasksList />
      </div>
    </div>
  );
}

export default App;

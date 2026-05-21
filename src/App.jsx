import Router from "./Router";
import TasksPages from "./pages/TasksPages";
import TaskPages from "./pages/TaskPages";

const App = () => {
  const routes = {
    "/": TasksPages,
    "/task/:id": TaskPages,
    "*": () => <div>Page not found</div>,
  };

  return <Router routes={routes} />;
};

export default App;

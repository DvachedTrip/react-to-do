import Router from "./routing/Router";
import TasksPage from "../pages/TasksPage";
import TaskPage from "../pages/TaskPage";
import './styles'

const App = () => {
  const routes = {
    "/": TasksPage,
    "/task/:id": TaskPage,
    "*": () => <div>Page not found</div>,
  };

  return <Router routes={routes} />;
};

export default App;

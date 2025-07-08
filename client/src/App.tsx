import { Route, Switch } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AllProjects from "@/pages/AllProjects";
import ProjectRunner from "@/pages/ProjectRunner";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/all-projects" component={AllProjects} />
      <Route path="/project/:projectId" component={ProjectRunner} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;

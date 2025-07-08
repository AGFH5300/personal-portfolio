import { Route, Switch } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AllProjects from "@/pages/AllProjects";

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/all" component={AllProjects} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;

import { Route, Switch } from "wouter";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AllProjects from "@/pages/AllProjects";

function App() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        window.dispatchEvent(new CustomEvent("closeModal"));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/all" component={AllProjects} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default App;

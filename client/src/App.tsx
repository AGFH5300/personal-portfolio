import { Route, Switch } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AllProjects from "@/pages/AllProjects";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Disable right-click site-wide
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // Handle ESC key to close modals
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Dispatch a custom event that modal components can listen to
        window.dispatchEvent(new CustomEvent('closeModal'));
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
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

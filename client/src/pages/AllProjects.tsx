import { motion } from "framer-motion";
import { personalData } from "@/data/personalData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Code2, Play, Square, Terminal, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";

interface TerminalOutput {
  type: 'output' | 'error' | 'input' | 'complete';
  content: string;
}

interface ProjectState {
  isRunning: boolean;
  output: TerminalOutput[];
  waitingForInput: boolean;
  currentInput: string;
  showTerminal: boolean;
}

export default function AllProjects() {
  const [location, setLocation] = useLocation();
  const [projectStates, setProjectStates] = useState<Record<string, ProjectState>>({});
  const terminalRefs = useRef<Record<string, HTMLDivElement>>({});
  
  // Get active project from URL hash
  const activeProject = location.includes('#') ? location.split('#')[1] : null;

  useEffect(() => {
    // Auto-scroll terminals when output changes
    Object.keys(projectStates).forEach(projectId => {
      const terminalRef = terminalRefs.current[projectId];
      if (terminalRef) {
        terminalRef.scrollTop = terminalRef.scrollHeight;
      }
    });
  }, [projectStates]);

  const getProjectState = (projectId: string): ProjectState => {
    return projectStates[projectId] || {
      isRunning: false,
      output: [],
      waitingForInput: false,
      currentInput: "",
      showTerminal: false
    };
  };

  const updateProjectState = (projectId: string, updates: Partial<ProjectState>) => {
    setProjectStates(prev => ({
      ...prev,
      [projectId]: { ...getProjectState(projectId), ...updates }
    }));
  };

  const runProject = async (projectId: string) => {
    console.log(`🌐 [DEBUG] Starting project: ${projectId}`);
    
    // Show terminal and update URL
    setLocation(`/all#${projectId}`);
    
    updateProjectState(projectId, {
      isRunning: true,
      output: [{ type: 'output', content: `Starting ${projectId}...\n---\n` }],
      waitingForInput: false,
      showTerminal: true
    });

    try {
      console.log(`🌐 [DEBUG] Making fetch request to /api/run-code/${projectId}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await fetch(`/api/run-code/${projectId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      console.log(`🌐 [DEBUG] Response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.log(`🌐 [ERROR] Response not OK: ${response.status} - ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      if (!response.body) {
        console.log(`🌐 [ERROR] No response body available`);
        throw new Error('No response body');
      }

      console.log(`🌐 [DEBUG] Starting to read streaming response...`);
      
      // Use a different approach for reading the stream
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          console.log(`🌐 [DEBUG] Stream complete`);
          break;
        }

        buffer += value;
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep the last incomplete line in buffer

        for (const line of lines) {
          if (line.trim()) {
            console.log(`🌐 [DEBUG] Processing line: "${line}"`);
            try {
              const data = JSON.parse(line);
              console.log(`🌐 [DEBUG] Parsed JSON:`, data);
              
              updateProjectState(projectId, {
                output: [...getProjectState(projectId).output, data]
              });
              
              if (data.type === 'complete') {
                console.log(`🌐 [DEBUG] Process complete for ${projectId}`);
                updateProjectState(projectId, { isRunning: false });
              } else if (data.type === 'output' && (data.content.includes('Enter') || data.content.includes(':'))) {
                console.log(`🌐 [DEBUG] Waiting for input detected for ${projectId}`);
                updateProjectState(projectId, { waitingForInput: true });
              }
            } catch (e) {
              console.log(`🌐 [ERROR] Failed to parse JSON line: "${line}"`, e);
            }
          }
        }
      }
    } catch (error) {
      console.log(`🌐 [ERROR] Project execution failed for ${projectId}:`, error);
      updateProjectState(projectId, {
        output: [...getProjectState(projectId).output, { 
          type: 'error', 
          content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}\n` 
        }],
        isRunning: false
      });
    }
  };

  const sendInput = async (projectId: string) => {
    const state = getProjectState(projectId);
    console.log(`🌐 [INPUT] Sending input for ${projectId}: "${state.currentInput}"`);
    
    if (!state.currentInput.trim()) {
      console.log(`🌐 [INPUT] No input provided for ${projectId}`);
      return;
    }

    const inputValue = state.currentInput;
    updateProjectState(projectId, {
      output: [...state.output, { type: 'input', content: `> ${inputValue}\n` }],
      waitingForInput: false,
      currentInput: ""
    });

    try {
      console.log(`🌐 [INPUT] Making fetch request to /api/code-input/${projectId}`);
      
      const response = await fetch(`/api/code-input/${projectId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: inputValue })
      });

      console.log(`🌐 [INPUT] Input response status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log(`🌐 [INPUT] Input response error: ${errorText}`);
        throw new Error(`Input failed: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      console.log(`🌐 [INPUT] Input response result:`, result);
      
    } catch (error) {
      console.log(`🌐 [INPUT] Input error for ${projectId}:`, error);
      updateProjectState(projectId, {
        output: [...getProjectState(projectId).output, { 
          type: 'error', 
          content: `Input error: ${error instanceof Error ? error.message : 'Unknown error'}\n` 
        }]
      });
    }
  };

  const closeTerminal = (projectId: string) => {
    updateProjectState(projectId, {
      isRunning: false,
      output: [],
      waitingForInput: false,
      currentInput: "",
      showTerminal: false
    });
    setLocation('/all');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Games': 'bg-purple-100 text-purple-800',
      'Health & Fitness': 'bg-blue-100 text-blue-800',
      'Logic & Math': 'bg-orange-100 text-orange-800',
      'Security & Tools': 'bg-red-100 text-red-800',
      'Life & Planning': 'bg-green-100 text-green-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-accent hover:text-accent/80">
              <ArrowLeft className="h-5 w-5" />
              Back to Portfolio
            </Link>
            <div className="w-px h-6 bg-gray-300"></div>
            <h1 className="text-2xl font-bold text-dark">All Projects</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-dark mb-4">Interactive Coding Projects</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Run and interact with my coding projects directly in your browser. Click any project to execute it.
          </p>
        </motion.div>

        {/* Terminal Overlay */}
        {activeProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
              <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-mono">
                    {personalData.codingProjects.find(p => p.id === activeProject)?.name || activeProject}
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => closeTerminal(activeProject)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="bg-gray-900 p-4 h-96 overflow-y-auto font-mono text-sm text-green-400">
                {getProjectState(activeProject).output.map((output, idx) => (
                  <div key={idx} className={`whitespace-pre-wrap ${
                    output.type === 'error' ? 'text-red-400' : 
                    output.type === 'input' ? 'text-blue-400' :
                    'text-green-400'
                  }`}>
                    {output.content}
                  </div>
                ))}
              </div>
              
              {getProjectState(activeProject).waitingForInput && (
                <div className="border-t border-gray-700 p-3 bg-gray-800 flex gap-2">
                  <Input
                    value={getProjectState(activeProject).currentInput}
                    onChange={(e) => updateProjectState(activeProject, { currentInput: e.target.value })}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        sendInput(activeProject);
                      }
                    }}
                    placeholder="Enter input..."
                    className="bg-gray-700 border-gray-600 text-green-400 font-mono"
                    autoFocus
                  />
                  <Button onClick={() => sendInput(activeProject)}>
                    Send
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Projects Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {personalData.codingProjects.map((project, index) => {
            const state = getProjectState(project.id);
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Code2 className="h-5 w-5 text-accent" />
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                    </div>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline" className="text-xs">{project.language}</Badge>
                      <Badge className={`text-xs ${getDifficultyColor(project.difficulty)}`}>
                        {project.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="mb-6">
                      <Badge variant="secondary" className={`text-xs ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </Badge>
                    </div>

                    <div className="mt-auto">
                      <Button 
                        className="w-full"
                        onClick={() => runProject(project.id)}
                        disabled={state.isRunning}
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {state.isRunning ? 'Running...' : 'Run Project'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
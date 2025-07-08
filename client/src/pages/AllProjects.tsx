import { motion } from "framer-motion";
import { personalData } from "@/data/personalData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Code2, Play, Square, Terminal } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";

interface TerminalOutput {
  type: 'output' | 'error' | 'input' | 'complete';
  content: string;
}

interface ProjectState {
  isRunning: boolean;
  output: TerminalOutput[];
  waitingForInput: boolean;
  currentInput: string;
}

export default function AllProjects() {
  const [projectStates, setProjectStates] = useState<Record<string, ProjectState>>({});
  const terminalRefs = useRef<Record<string, HTMLDivElement>>({});

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
      currentInput: ""
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
    
    updateProjectState(projectId, {
      isRunning: true,
      output: [{ type: 'output', content: `Starting ${projectId}...\n---\n` }],
      waitingForInput: false
    });

    try {
      console.log(`🌐 [DEBUG] Making fetch request to /api/run-code/${projectId}`);
      
      const response = await fetch(`/api/run-code/${projectId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      console.log(`🌐 [DEBUG] Response status: ${response.status}`);
      console.log(`🌐 [DEBUG] Response headers:`, Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.log(`🌐 [ERROR] Response not OK: ${response.status} - ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        console.log(`🌐 [ERROR] No response body reader available`);
        throw new Error('No response body');
      }

      console.log(`🌐 [DEBUG] Starting to read streaming response...`);
      let chunkCount = 0;

      while (true) {
        const { done, value } = await reader.read();
        chunkCount++;
        console.log(`🌐 [DEBUG] Chunk ${chunkCount}: done=${done}, value length=${value?.length || 0}`);
        
        if (done) {
          console.log(`🌐 [DEBUG] Stream complete after ${chunkCount} chunks`);
          break;
        }

        const chunk = new TextDecoder().decode(value);
        console.log(`🌐 [DEBUG] Chunk content: "${chunk}"`);
        
        const lines = chunk.split('\n').filter(line => line.trim());
        console.log(`🌐 [DEBUG] Lines extracted: ${lines.length}`);

        for (const line of lines) {
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

    updateProjectState(projectId, {
      output: [...state.output, { type: 'input', content: `> ${state.currentInput}\n` }],
      waitingForInput: false,
      currentInput: ""
    });

    try {
      console.log(`🌐 [INPUT] Making fetch request to /api/code-input/${projectId}`);
      
      const response = await fetch(`/api/code-input/${projectId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: state.currentInput })
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

  const stopProject = (projectId: string) => {
    updateProjectState(projectId, {
      isRunning: false,
      output: [],
      waitingForInput: false,
      currentInput: ""
    });
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
            Run and interact with my coding projects directly in your browser. Each project has its own terminal for real-time execution.
          </p>
        </motion.div>

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
                className="flex flex-col"
              >
                <Card className="flex-1 flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Code2 className="h-5 w-5 text-accent" />
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline" className="text-xs">{project.language}</Badge>
                      <Badge className={`text-xs ${getDifficultyColor(project.difficulty)}`}>
                        {project.difficulty}
                      </Badge>
                    </div>
                    
                    <div className="mb-4">
                      <Badge variant="secondary" className={`text-xs ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </Badge>
                    </div>

                    <div className="flex gap-2 mb-4">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => runProject(project.id)}
                        disabled={state.isRunning}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Run
                      </Button>
                      {state.isRunning && (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => stopProject(project.id)}
                        >
                          <Square className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    {/* Individual Terminal */}
                    <div className="bg-gray-900 rounded-lg overflow-hidden flex-1 flex flex-col min-h-[300px]">
                      <div className="bg-gray-800 px-3 py-2 flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-green-400" />
                        <span className="text-green-400 text-xs font-mono">
                          {state.isRunning ? `Running ${project.id}...` : `Terminal - ${project.id}`}
                        </span>
                      </div>
                      
                      <div 
                        ref={(el) => {
                          if (el) terminalRefs.current[project.id] = el;
                        }}
                        className="p-3 flex-1 overflow-y-auto font-mono text-xs text-green-400 bg-gray-900"
                      >
                        {state.output.length === 0 ? (
                          <div className="text-gray-500">Click "Run" to execute this project...</div>
                        ) : (
                          state.output.map((output, idx) => (
                            <div key={idx} className={`whitespace-pre-wrap ${
                              output.type === 'error' ? 'text-red-400' : 
                              output.type === 'input' ? 'text-blue-400' :
                              'text-green-400'
                            }`}>
                              {output.content}
                            </div>
                          ))
                        )}
                      </div>
                      
                      {state.waitingForInput && (
                        <div className="border-t border-gray-700 p-2 flex gap-2">
                          <Input
                            value={state.currentInput}
                            onChange={(e) => updateProjectState(project.id, { currentInput: e.target.value })}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                sendInput(project.id);
                              }
                            }}
                            placeholder="Enter input..."
                            className="bg-gray-800 border-gray-600 text-green-400 font-mono text-xs"
                          />
                          <Button 
                            size="sm" 
                            onClick={() => sendInput(project.id)}
                            className="text-xs"
                          >
                            Send
                          </Button>
                        </div>
                      )}
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
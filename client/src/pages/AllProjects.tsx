import { motion } from "framer-motion";
import { personalData } from "@/data/personalData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Code2, Play, Square, Terminal, X, Search, ArrowUp } from "lucide-react";
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
  const [activeTerminal, setActiveTerminal] = useState<string | null>(null);
  const terminalRefs = useRef<Record<string, HTMLDivElement>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const scrollPositionRef = useRef<number>(0); // Ref to store scroll position

  console.log(`🌐 [DEBUG] Current location: ${location}`);
  console.log(`🌐 [DEBUG] Active terminal: ${activeTerminal}`);

  useEffect(() => {
    // Auto-scroll terminals when output changes
    Object.keys(projectStates).forEach(projectId => {
      const terminalRef = terminalRefs.current[projectId];
      if (terminalRef) {
        terminalRef.scrollTop = terminalRef.scrollHeight;
      }
    });
  }, [projectStates]);

  useEffect(() => {
    // Restore scroll position on component mount
    window.scrollTo(0, scrollPositionRef.current);

    // Handle scroll for back-to-top button
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      scrollPositionRef.current = window.scrollY; // Update the scroll position
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter projects based on search term and selected filters
  const filteredProjects = personalData.codingProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.language.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.difficulty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDifficulty = !selectedDifficulty || project.difficulty === selectedDifficulty;
    const matchesCategory = !selectedCategory || project.category === selectedCategory;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getProjectState = (projectId: string): ProjectState => {
    return projectStates[projectId] || {
      isRunning: false,
      output: [],
      waitingForInput: false,
      currentInput: "",
      showTerminal: false
    }
  };

  const isWaitingForInput = (content: string): boolean => {
    const inputIndicators = [
      'Enter',
      'Type',
      'Input',
      'enter',
      'type',
      'input',
      ':',
      '?',
      'choose',
      'Choose',
      'select',
      'Select',
      'What',
      'what',
      'Which',
      'which',
      'How',
      'how',
      'Do you',
      'do you',
      'Would you',
      'would you',
      'want to',
      'size pizza',
      'pepperoni',
      'cheese',
      'continue',
      'yes or no',
      'y or n',
      'Y or N'
    ];

    // Check if the content ends with common input prompts
    const trimmed = content.trim();
    const endsWithPrompt = trimmed.endsWith(':') || 
                          trimmed.endsWith('?') || 
                          trimmed.endsWith(': ') ||
                          trimmed.endsWith('? ') ||
                          trimmed.includes('\n') === false; // Single line output often indicates input needed

    // Check for specific input indicators
    const hasInputIndicator = inputIndicators.some(indicator => 
      content.toLowerCase().includes(indicator.toLowerCase())
    );

    return endsWithPrompt || hasInputIndicator;
  };

  const updateProjectState = (projectId: string, updates: Partial<ProjectState> | ((prev: ProjectState) => ProjectState)) => {
    setProjectStates(prev => {
      const currentState = prev[projectId] || {
        isRunning: false,
        output: [],
        waitingForInput: false,
        currentInput: "",
        showTerminal: false
      };

      const newState = typeof updates === 'function' 
        ? updates(currentState)
        : { ...currentState, ...updates };

      console.log(`🌐 [STATE] Updating ${projectId}:`, newState);

      return {
        ...prev,
        [projectId]: newState
      };
    });
  };

  const loadSessionHistory = async (projectId: string) => {
    try {
      console.log(`🌐 [SESSION] Loading history for ${projectId}`);
      const response = await fetch(`/api/session/${projectId}`);
      if (response.ok) {
        const sessionData = await response.json();
        console.log(`🌐 [SESSION] Loaded ${sessionData.output.length} items for ${projectId}`);

        // Convert session data to our format
        const output = sessionData.output.map((item: any) => ({
          type: item.type,
          content: item.content
        }));

        updateProjectState(projectId, {
          output: output.length > 0 ? output : [{ type: 'output', content: `Session restored for ${projectId}\n---\n` }],
          isRunning: sessionData.isRunning,
          showTerminal: true
        });

        return sessionData.output.length > 0;
      }
    } catch (error) {
      console.log(`🌐 [SESSION] Error loading history for ${projectId}:`, error);
    }
    return false;
  };

  const runProject = async (projectId: string) => {
    console.log(`🌐 [DEBUG] Starting project: ${projectId}`);

    // Show terminal immediately
    setActiveTerminal(projectId);
    setLocation(`/all#${projectId}`);

    // Load existing session history first
    const hasHistory = await loadSessionHistory(projectId);

    if (!hasHistory) {
      updateProjectState(projectId, {
        isRunning: true,
        output: [{ type: 'output', content: `Starting ${projectId}...\n---\n` }],
        waitingForInput: false,
        showTerminal: true
      });
    } else {
      // If we have history, just mark as running if we're about to start a new process
      updateProjectState(projectId, {
        isRunning: true,
        waitingForInput: false,
        showTerminal: true
      });
    }

    console.log(`🌐 [DEBUG] Terminal activated for: ${projectId}`);

    try {
      console.log(`🌐 [DEBUG] Making fetch request to /api/run-code/${projectId}`);

      const response = await fetch(`/api/run-code/${projectId}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Connection': 'keep-alive'
        }
      });
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

      // Read the response as text chunks with proper connection handling
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No reader available');
      }

      const decoder = new TextDecoder();
      let buffer = '';
      let isReading = true;

      const readStream = async () => {
        try {
          while (isReading) {
            const { done, value } = await reader.read();

            if (done) {
              console.log(`🌐 [DEBUG] Stream complete`);
              break;
            }

            // Decode the chunk and add to buffer
            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;
            console.log(`🌐 [DEBUG] Received chunk: "${chunk}"`);

            // Process complete lines
            const lines = buffer.split('\n');
            buffer = lines.pop() || ''; // Keep the last incomplete line in buffer

            for (const line of lines) {
              if (line.trim()) {
                console.log(`🌐 [DEBUG] Processing line: "${line}"`);
                try {
                  const data = JSON.parse(line);
                  console.log(`🌐 [DEBUG] Parsed JSON:`, data);

                  // Use callback to ensure state is properly updated
                  updateProjectState(projectId, (prevState) => ({
                    ...prevState,
                    output: [...prevState.output, data]
                  }));

                  if (data.type === 'complete') {
                    console.log(`🌐 [DEBUG] Process complete for ${projectId}`);
                    // Keep terminal open and mark as not running so user can restart if needed
                    updateProjectState(projectId, { isRunning: false });
                    isReading = false;
                  } else if (data.type === 'output' && isWaitingForInput(data.content)) {
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
          console.log(`🌐 [ERROR] Error reading stream:`, error);
          isReading = false;
        } finally {
          try {
            reader.releaseLock();
          } catch (e) {
            console.log(`🌐 [DEBUG] Reader already released`);
          }
        }
      };

      // Start reading the stream
      readStream();
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

  const clearSessionHistory = async (projectId: string) => {
    try {
      const response = await fetch(`/api/session/${projectId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        console.log(`🌐 [SESSION] Cleared history for ${projectId}`);
        updateProjectState(projectId, {
          output: [{ type: 'output', content: `Session history cleared for ${projectId}\n---\n` }]
        });
      }
    } catch (error) {
      console.log(`🌐 [SESSION] Error clearing history for ${projectId}:`, error);
    }
  };

  const openTerminalWithHistory = async (projectId: string) => {
    console.log(`🌐 [DEBUG] Opening terminal with history for: ${projectId}`);
    setActiveTerminal(projectId);
    setLocation(`/all#${projectId}`);

    // Load existing session history
    const hasHistory = await loadSessionHistory(projectId);

    if (!hasHistory) {
      updateProjectState(projectId, {
        output: [{ type: 'output', content: `Terminal opened for ${projectId}\n---\n` }],
        isRunning: false,
        waitingForInput: false,
        showTerminal: true
      });
    }
  };

  const closeTerminal = async (projectId: string) => {
    console.log(`🌐 [DEBUG] Closing terminal for: ${projectId}`);

    // Stop the running process
    try {
      const response = await fetch(`/api/stop-code/${projectId}`, {
        method: 'POST'
      });

      if (response.ok) {
        console.log(`🌐 [DEBUG] Process stopped successfully for ${projectId}`);
      } else {
        console.log(`🌐 [DEBUG] Process may have already stopped for ${projectId}`);
      }
    } catch (error) {
      console.log(`🌐 [DEBUG] Error stopping process for ${projectId}:`, error);
    }

    // Clear session history
    await clearSessionHistory(projectId);

    setActiveTerminal(null);
    // Clear the output state as well
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
    const isSelected = selectedDifficulty === difficulty;
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return isSelected 
          ? 'bg-green-200 text-green-900 border-green-300 ring-2 ring-green-400' 
          : 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:border-green-300';
      case 'intermediate':
        return isSelected 
          ? 'bg-yellow-200 text-yellow-900 border-yellow-300 ring-2 ring-yellow-400' 
          : 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200 hover:border-yellow-300';
      case 'advanced':
        return isSelected 
          ? 'bg-red-200 text-red-900 border-red-300 ring-2 ring-red-400' 
          : 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200 hover:border-red-300';
      default:
        return isSelected 
          ? 'bg-gray-200 text-gray-900 border-gray-300 ring-2 ring-gray-400' 
          : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 hover:border-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    const isSelected = selectedCategory === category;
    const colors = {
      'Games': {
        normal: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200 hover:border-purple-300',
        selected: 'bg-purple-200 text-purple-900 border-purple-300 ring-2 ring-purple-400'
      },
      'Health & Fitness': {
        normal: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 hover:border-blue-300',
        selected: 'bg-blue-200 text-blue-900 border-blue-300 ring-2 ring-blue-400'
      },
      'Logic & Math': {
        normal: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200 hover:border-orange-300',
        selected: 'bg-orange-200 text-orange-900 border-orange-300 ring-2 ring-orange-400'
      },
      'Security & Tools': {
        normal: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200 hover:border-red-300',
        selected: 'bg-red-200 text-red-900 border-red-300 ring-2 ring-red-400'
      },
      'Life & Planning': {
        normal: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200 hover:border-green-300',
        selected: 'bg-green-200 text-green-900 border-green-300 ring-2 ring-green-400'
      }
    };
    
    const categoryColors = colors[category as keyof typeof colors];
    if (!categoryColors) {
      return isSelected 
        ? 'bg-gray-200 text-gray-900 border-gray-300 ring-2 ring-gray-400' 
        : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200 hover:border-gray-300';
    }
    
    return isSelected ? categoryColors.selected : categoryColors.normal;
  };

  // Function to handle navigation and preserve scroll position
  const navigateWithScroll = (path: string) => {
    scrollPositionRef.current = window.scrollY; // Save current scroll position
    setLocation(path);
  };

  // Filter handlers
  const handleDifficultyFilter = (difficulty: string) => {
    setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty);
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const clearFilters = () => {
    setSelectedDifficulty(null);
    setSelectedCategory(null);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 hover:text-primary cursor-click" onClick={() => navigateWithScroll("/")}>
                <ArrowLeft className="h-5 w-5" />
                Back to Portfolio
              </Link>
              <div className="w-px h-6 bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-dark">All Projects</h1>
            </div>

            {/* Search Bar and Filters */}
            <div className="flex items-center gap-4">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
              {(selectedDifficulty || selectedCategory || searchTerm) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="whitespace-nowrap"
                >
                  Clear Filters
                </Button>
              )}
            </div>
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
            Run and interact with my coding projects directly in your browser. Click on difficulty or category badges to filter projects.
          </p>
          
          {/* Active Filters */}
          {(selectedDifficulty || selectedCategory) && (
            <div className="flex justify-center gap-2 mt-4">
              <span className="text-sm text-gray-500">Active filters:</span>
              {selectedDifficulty && (
                <Badge className={`text-xs cursor-pointer ${getDifficultyColor(selectedDifficulty)}`} variant="outline">
                  {selectedDifficulty}
                </Badge>
              )}
              {selectedCategory && (
                <Badge className={`text-xs cursor-pointer ${getCategoryColor(selectedCategory)}`} variant="outline">
                  {selectedCategory}
                </Badge>
              )}
            </div>
          )}
        </motion.div>

        {/* Terminal Overlay */}
        {activeTerminal && (
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
                    {personalData.codingProjects.find(p => p.id === activeTerminal)?.name || activeTerminal}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {/* <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => clearSessionHistory(activeTerminal)}
                    className="text-gray-400 hover:text-black"
                    title="Clear History"
                  >
                    Clear
                  </Button> */}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => closeTerminal(activeTerminal)}
                    className="text-gray-400 hover:text-black"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div 
                ref={(el) => {
                  if (el && activeTerminal) terminalRefs.current[activeTerminal] = el;
                }}
                className="bg-gray-900 p-4 h-96 overflow-y-auto font-mono text-sm text-green-400"
              >
                {getProjectState(activeTerminal).output.map((output, idx) => (
                  <div key={idx} className={`whitespace-pre-wrap ${
                    output.type === 'error' ? 'text-red-400' : 
                    output.type === 'input' ? 'text-blue-400' :
                    'text-green-400'
                  }`}>
                    {output.content}
                  </div>
                ))}
              </div>

              {getProjectState(activeTerminal).waitingForInput && (
                <div className="border-t border-gray-700 p-3 bg-gray-800 flex gap-2">
                  <Input
                    value={getProjectState(activeTerminal).currentInput}
                    onChange={(e) => updateProjectState(activeTerminal, { currentInput: e.target.value })}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        sendInput(activeTerminal);
                      }
                    }}
                    placeholder="Enter input..."
                    className="bg-gray-700 border-gray-600 text-green-400 font-mono"
                    autoFocus
                  />
                  <Button onClick={() => sendInput(activeTerminal)}>
                    Send
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Projects Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-4" />
                <p className="text-lg">No projects found matching "{searchTerm}"</p>
                <p className="text-sm mt-2">Try adjusting your search terms</p>
              </div>
            </div>
          ) : (
            filteredProjects.map((project, index) => {
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
                      <Code2 className="h-5 w-5" />
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                    </div>
                    <p className="text-sm text-gray-600">{project.description}</p>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline" className="text-xs">{project.language}</Badge>
                      <Badge 
                        className={`text-xs cursor-pointer transition-all duration-200 hover:scale-105 ${getDifficultyColor(project.difficulty)}`}
                        onClick={() => handleDifficultyFilter(project.difficulty)}
                        variant="outline"
                      >
                        {project.difficulty}
                      </Badge>
                      <Badge 
                        className={`text-xs cursor-pointer transition-all duration-200 hover:scale-105 ${getCategoryColor(project.category)}`}
                        onClick={() => handleCategoryFilter(project.category)}
                        variant="outline"
                      >
                        {project.category}
                      </Badge>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <Button
                        onClick={() => runProject(project.id)}
                        disabled={state.isRunning}
                        className="flex-1"
                        variant="default"
                      >
                        {state.isRunning ? (
                          <>
                            <Square className="animate-pulse mr-2 h-4 w-4" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="mr-2 h-4 w-4" />
                            Run Project
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          }))}
        </div>

        {/* More Projects Section */}
        <motion.div
          className="mt-20 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-8 mx-4">
            <div className="text-center max-w-4xl mx-auto">

              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Project Collection Growing
              </h3>

              <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
                This collection represents my journey through various programming concepts and challenges. 
                As I continue learning and building, new projects will be added to show the different 
                skills and technologies I explore.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-white p-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-110"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
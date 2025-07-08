import { motion } from "framer-motion";
import { personalData } from "@/data/personalData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code2, Play, Square, Terminal } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

interface TerminalOutput {
  type: 'output' | 'error' | 'input' | 'complete';
  content: string;
}

export default function AllProjects() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<TerminalOutput[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [waitingForInput, setWaitingForInput] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const runProject = async (projectId: string) => {
    setSelectedProject(projectId);
    setIsRunning(true);
    setTerminalOutput([{ type: 'output', content: `Starting ${projectId}...\n---\n` }]);
    setWaitingForInput(false);

    try {
      const response = await fetch(`/api/run-code/${projectId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());

        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            setTerminalOutput(prev => [...prev, data]);
            
            if (data.type === 'complete') {
              setIsRunning(false);
            } else if (data.type === 'output' && data.content.includes('Enter')) {
              setWaitingForInput(true);
            }
          } catch (e) {
            // Skip malformed JSON lines
          }
        }
      }
    } catch (error) {
      setTerminalOutput(prev => [...prev, { 
        type: 'error', 
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}\n` 
      }]);
      setIsRunning(false);
    }
  };

  const sendInput = async () => {
    if (!selectedProject || !currentInput.trim()) return;

    setTerminalOutput(prev => [...prev, { type: 'input', content: `> ${currentInput}\n` }]);
    setWaitingForInput(false);

    try {
      await fetch(`/api/code-input/${selectedProject}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: currentInput })
      });
      setCurrentInput("");
    } catch (error) {
      setTerminalOutput(prev => [...prev, { 
        type: 'error', 
        content: `Input error: ${error instanceof Error ? error.message : 'Unknown error'}\n` 
      }]);
    }
  };

  const stopProject = () => {
    setIsRunning(false);
    setSelectedProject(null);
    setTerminalOutput([]);
    setWaitingForInput(false);
    setCurrentInput("");
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
            Explore my coding projects and run them directly in your browser. Click any project to see the code in action.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Projects Grid */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-dark">Available Projects</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {personalData.codingProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className={`h-full cursor-pointer transition-all hover:shadow-lg hover:scale-105 ${
                    selectedProject === project.id ? 'ring-2 ring-accent' : ''
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Code2 className="h-4 w-4 text-accent" />
                        <h4 className="font-semibold text-sm">{project.name}</h4>
                      </div>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-3">{project.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs">{project.language}</Badge>
                        <Badge variant="secondary" className="text-xs">{project.difficulty}</Badge>
                      </div>
                      <div className="text-xs text-gray-500 mb-3">{project.category}</div>
                      <Button 
                        size="sm" 
                        className="w-full text-xs"
                        onClick={() => runProject(project.id)}
                        disabled={isRunning}
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Run Project
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Terminal */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-dark">Code Terminal</h3>
            <div className="bg-gray-900 rounded-lg overflow-hidden h-[600px] flex flex-col">
              <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm font-mono">
                    {selectedProject ? `Terminal - ${selectedProject}` : 'Terminal - Select a project to run'}
                  </span>
                </div>
                {isRunning && (
                  <Button size="sm" variant="destructive" onClick={stopProject}>
                    <Square className="h-3 w-3 mr-1" />
                    Stop
                  </Button>
                )}
              </div>
              <div 
                ref={terminalRef}
                className="p-4 flex-1 overflow-y-auto font-mono text-sm text-green-400 bg-gray-900"
              >
                {terminalOutput.length === 0 ? (
                  <div className="text-gray-500">Click "Run Project" on any coding project to see the output here...</div>
                ) : (
                  terminalOutput.map((output, index) => (
                    <div key={index} className={`whitespace-pre-wrap ${
                      output.type === 'error' ? 'text-red-400' : 
                      output.type === 'input' ? 'text-blue-400' :
                      'text-green-400'
                    }`}>
                      {output.content}
                    </div>
                  ))
                )}
              </div>
              {waitingForInput && (
                <div className="border-t border-gray-700 p-2 flex gap-2">
                  <Input
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendInput()}
                    placeholder="Enter your input..."
                    className="bg-gray-800 border-gray-600 text-green-400 font-mono"
                  />
                  <Button size="sm" onClick={sendInput}>Send</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
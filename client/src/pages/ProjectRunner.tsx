import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { personalData } from "@/data/personalData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Play, RotateCcw, Terminal } from "lucide-react";
import { Link, useParams } from "wouter";

export default function ProjectRunner() {
  const { projectId } = useParams();
  const [output, setOutput] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const project = personalData.pythonProjects.find(p => p.id === projectId);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const runProject = async () => {
    if (!project) return;
    
    setIsRunning(true);
    setOutput([`Starting ${project.name}...`, "---"]);
    
    try {
      const response = await fetch(`/api/run-python/${project.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to run project');
      }
      
      const reader = response.body?.getReader();
      if (!reader) return;
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split('\n').filter(line => line.trim());
        
        for (const line of lines) {
          try {
            const data = JSON.parse(line);
            if (data.type === 'output') {
              setOutput(prev => [...prev, data.content]);
            } else if (data.type === 'input_request') {
              setWaitingForInput(true);
              setOutput(prev => [...prev, data.prompt]);
            } else if (data.type === 'complete') {
              setIsRunning(false);
              setOutput(prev => [...prev, "---", "Program completed."]);
            }
          } catch (e) {
            // Handle non-JSON lines as regular output
            setOutput(prev => [...prev, chunk]);
          }
        }
      }
    } catch (error) {
      setOutput(prev => [...prev, `Error: ${error.message}`]);
      setIsRunning(false);
    }
  };

  const sendInput = async () => {
    if (!input.trim() || !waitingForInput) return;
    
    setOutput(prev => [...prev, `> ${input}`]);
    
    try {
      await fetch(`/api/python-input/${project?.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: input.trim() }),
      });
      
      setInput("");
      setWaitingForInput(false);
    } catch (error) {
      setOutput(prev => [...prev, `Input error: ${error.message}`]);
    }
  };

  const resetProject = () => {
    setOutput([]);
    setInput("");
    setIsRunning(false);
    setWaitingForInput(false);
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-dark mb-4">Project Not Found</h2>
            <p className="text-gray-600 mb-6">The requested project could not be found.</p>
            <Link href="/all-projects">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/all-projects" className="inline-flex items-center text-primary hover:text-dark transition-colors mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Projects
            </Link>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-dark mb-2">{project.name}</h1>
                <p className="text-gray-600">{project.description}</p>
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={resetProject} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
                <Button onClick={runProject} disabled={isRunning}>
                  <Play className="w-4 h-4 mr-2" />
                  {isRunning ? 'Running...' : 'Run Project'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Terminal Interface */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gray-900 text-green-400 font-mono">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-green-400">
                  <Terminal className="w-5 h-5 mr-2" />
                  Python Console
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                {/* Output Area */}
                <div 
                  ref={outputRef}
                  className="bg-black p-4 rounded min-h-[400px] max-h-[500px] overflow-y-auto mb-4 border border-gray-700"
                >
                  {output.length === 0 ? (
                    <div className="text-gray-500">
                      Click "Run Project" to start the {project.name} program.
                    </div>
                  ) : (
                    output.map((line, index) => (
                      <div key={index} className="whitespace-pre-wrap">
                        {line}
                      </div>
                    ))
                  )}
                  {isRunning && (
                    <div className="flex items-center mt-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                      <span className="text-green-400">Running...</span>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                {waitingForInput && (
                  <div className="flex space-x-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendInput()}
                      placeholder="Enter your input..."
                      className="bg-gray-800 border-gray-600 text-green-400 placeholder-gray-500"
                    />
                    <Button onClick={sendInput} size="sm">
                      Send
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
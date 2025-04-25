"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Github, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cyrillicToLatin, latinToCyrillic } from 'kaalin'

export default function TextProcessor() {
  const [inputText, setInputText] = useState("")
  const [processedText, setProcessedText] = useState("")
  const [selectedOption, setSelectedOption] = useState("latin")
  const { toast } = useToast()

  useEffect(() => {
    if (inputText) {
      try {
        let result = inputText
        if (selectedOption === "latin") {
          result = cyrillicToLatin(inputText)
        } else if (selectedOption === "cyrillic") {
          result = latinToCyrillic(inputText)
        }
        setProcessedText(result)
      } catch (error) {
        console.error("Error processing text:", error)
        setProcessedText("Error processing text")
      }
    } else {
      setProcessedText("")
    }
  }, [inputText])

  const copyToClipboard = async () => {
    if (processedText) {
      try {
        await navigator.clipboard.writeText(processedText)
        toast({
          title: "Copied!",
          description: "Text copied to clipboard",
          duration: 2000,
        })
      } catch (err) {
        toast({
          title: "Failed to copy",
          description: "Could not copy text to clipboard",
          variant: "destructive",
          duration: 2000,
        })
      }
    }
  }

  const handleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-2">Kaalin Text Processor</h1>
          <p className="text-muted-foreground">Transform your text using the Kaalin library</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg border-t-4 border-t-blue-500">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <div>
                  <CardTitle>Input</CardTitle>
                  <CardDescription>Enter your text to be processed</CardDescription>
                </div>
                <select
                  className="p-2 border rounded-md"
                  value={selectedOption}
                  onChange={handleChangeOption}
                >
                  <option value="latin">To Latin</option>
                  <option value="cyrillic">To Cyrillic</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter your text here..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[200px] resize-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </CardContent>
          </Card>

          <Card className="shadow-lg border-t-4 border-t-green-500">
            <CardHeader>
              <CardTitle>Output</CardTitle>
              <CardDescription>Processed text will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="min-h-[200px] p-4 bg-gray-50 dark:bg-gray-800 rounded-md border overflow-auto">
                  {processedText || "Processed text will appear here"}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 bg-white dark:bg-gray-700 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={copyToClipboard}
                  disabled={!processedText}
                >
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy to clipboard</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-10 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5" />
              About dontbeidle
            </CardTitle>
            <CardDescription>A community that makes open source projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium mb-2">Organization Info</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Location:</span> Uzbekistan
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Website:</span>
                    <a
                      href="https://idle.uz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline flex items-center"
                    >
                      idle.uz <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Followers:</span> 4
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Repositories:</span> 6
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="font-medium">Members:</span> 3
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Popular Projects</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://github.com/dontbeidle/kaalin-python"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline flex items-center"
                    >
                      kaalin-python <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                    <p className="text-muted-foreground">Library for Python</p>
                  </li>
                  <li>
                    <a
                      href="https://github.com/dontbeidle/kaalin-js"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline flex items-center"
                    >
                      kaalin-js <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                    <p className="text-muted-foreground">Library for JavaScript</p>
                  </li>
                  <li>
                    <a
                      href="https://github.com/dontbeidle/jaziw"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline flex items-center"
                    >
                      jaziw <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                    <p className="text-muted-foreground">Text processing tool</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-md border text-center">
              <p className="text-lg font-bold mb-2">"Don't be idle, contribute!"</p>
              <p className="text-muted-foreground">Join the community and contribute to open source projects</p>
              <div className="mt-4 flex justify-center gap-4">
                <Button asChild variant="outline">
                  <a href="https://github.com/dontbeidle" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Visit on GitHub
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

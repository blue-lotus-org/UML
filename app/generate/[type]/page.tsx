"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { MermaidViewer } from "@/components/mermaid-viewer"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

type UmlType = {
  id: string
  title: string
  description: string
  prompt: string
}

const umlTypes: Record<string, UmlType> = {
  "use-case": {
    id: "use-case",
    title: "Use Case Diagram",
    description: "Captures functional requirements by illustrating interactions between users and the system.",
    prompt: "Create a UML Use Case diagram for the following system description:",
  },
  class: {
    id: "class",
    title: "Class Diagram",
    description:
      "Shows the static structure of a system by displaying classes, attributes, methods, and relationships.",
    prompt: "Create a UML Class diagram for the following system description:",
  },
  sequence: {
    id: "sequence",
    title: "Sequence Diagram",
    description:
      "Illustrates how objects interact in a scenario, focusing on the sequence of messages exchanged over time.",
    prompt: "Create a UML Sequence diagram for the following scenario:",
  },
  activity: {
    id: "activity",
    title: "Activity Diagram",
    description: "Models the workflow of stepwise activities and actions within a system, similar to a flowchart.",
    prompt: "Create a UML Activity diagram for the following process:",
  },
  "state-machine": {
    id: "state-machine",
    title: "State Machine Diagram",
    description: "Describes the states of an object and the transitions between states due to events.",
    prompt: "Create a UML State Machine diagram for the following object behavior:",
  },
  component: {
    id: "component",
    title: "Component Diagram",
    description: "Represents the organization and dependencies among components in a system.",
    prompt: "Create a UML Component diagram for the following system architecture:",
  },
  deployment: {
    id: "deployment",
    title: "Deployment Diagram",
    description: "Illustrates the physical deployment of artifacts on hardware devices.",
    prompt: "Create a UML Deployment diagram for the following system deployment:",
  },
  package: {
    id: "package",
    title: "Package Diagram",
    description: "Organizes elements of a model into groups or packages, showing dependencies between packages.",
    prompt: "Create a UML Package diagram for the following system organization:",
  },
}

type AISettings = {
  provider: string
  apiKey: string
  model: string
  temperature: number
  customEndpoint?: string
}

export default function GeneratePage() {
  const params = useParams()
  const typeId = params.type as string
  const umlType = umlTypes[typeId]

  const [description, setDescription] = useState("")
  const [result, setResult] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [settings, setSettings] = useState<AISettings | null>(null)
  const [activeTab, setActiveTab] = useState("input")
  const { toast } = useToast()

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("aiSettings")
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (e) {
        console.error("Failed to parse saved settings", e)
      }
    }
  }, [])

  const generateDiagram = async () => {
    if (!settings?.apiKey) {
      toast({
        title: "API Key Missing",
        description: "Please configure your AI provider settings first.",
        variant: "destructive",
      })
      return
    }

    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please enter a system description to generate the UML diagram.",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setActiveTab("result")

    try {
      // In a real app, this would call your backend API to generate the diagram
      // For this demo, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate a simple Mermaid diagram as a placeholder
      // In a real app, this would come from the AI service
      const mermaidCode = generateMermaidDiagram(typeId, description)
      setResult(mermaidCode)
    } catch (error) {
      console.error("Error generating diagram:", error)
      toast({
        title: "Generation Failed",
        description: "Failed to generate the UML diagram. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // This is a placeholder function to generate simple Mermaid diagrams
  // In a real app, this would be replaced with actual AI-generated content
  const generateMermaidDiagram = (type: string, description: string) => {
    switch (type) {
      case "use-case":
        return `\`\`\`mermaid
classDiagram
    class User {
    }
    class System {
        +login()
        +logout()
        +viewProfile()
    }
    User --> System : uses
\`\`\``
      case "class":
        return `\`\`\`mermaid
classDiagram
    class Customer {
        +String name
        +String email
        +placeOrder()
    }
    class Order {
        +int orderId
        +Date orderDate
        +float total
        +processPayment()
    }
    class Product {
        +int productId
        +String name
        +float price
        +checkAvailability()
    }
    Customer "1" --> "many" Order : places
    Order "1" --> "many" Product : contains
\`\`\``
      case "sequence":
        return `\`\`\`mermaid
sequenceDiagram
    participant User
    participant System
    participant Database
    
    User->>System: Login Request
    System->>Database: Validate Credentials
    Database-->>System: Authentication Result
    System-->>User: Login Response
\`\`\``
      case "activity":
        return `\`\`\`mermaid
graph TD
    A[Start] --> B{User Authenticated?}
    B -->|Yes| C[Show Dashboard]
    B -->|No| D[Show Login Form]
    D --> E[User Enters Credentials]
    E --> B
    C --> F[User Selects Action]
    F --> G[Process Action]
    G --> H[End]
\`\`\``
      case "state-machine":
        return `\`\`\`mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Processing: Submit
    Processing --> Success: Valid
    Processing --> Error: Invalid
    Success --> Idle: Reset
    Error --> Idle: Reset
    Idle --> [*]: Exit
\`\`\``
      case "component":
        return `\`\`\`mermaid
graph TD
    A[Frontend] --> B[API Gateway]
    B --> C[Authentication Service]
    B --> D[User Service]
    B --> E[Order Service]
    D --> F[(User Database)]
    E --> G[(Order Database)]
\`\`\``
      case "deployment":
        return `\`\`\`mermaid
graph TD
    A[Client Browser] --> B[Load Balancer]
    B --> C[Web Server 1]
    B --> D[Web Server 2]
    C --> E[Application Server]
    D --> E
    E --> F[(Database Server)]
\`\`\``
      case "package":
        return `\`\`\`mermaid
graph TD
    A[UI Package] --> B[Service Package]
    B --> C[Repository Package]
    C --> D[Model Package]
    B --> D
\`\`\``
      default:
        return `\`\`\`mermaid
graph TD
    A[Start] --> B[End]
\`\`\``
    }
  }

  if (!umlType) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertTitle>Invalid UML Type</AlertTitle>
          <AlertDescription>The requested UML diagram type does not exist.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-2">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">{umlType.title}</h1>
        </div>
        <p className="text-muted-foreground mb-6">{umlType.description}</p>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="input">Input</TabsTrigger>
            <TabsTrigger value="result">Result</TabsTrigger>
          </TabsList>

          <TabsContent value="input">
            <Card>
              <CardHeader>
                <CardTitle>System Description</CardTitle>
                <CardDescription>
                  {umlType.prompt} Provide as much detail as possible for better results.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe your system, process, or scenario here..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[200px]"
                />
              </CardContent>
              <CardFooter>
                <Button onClick={generateDiagram} disabled={isGenerating || !description.trim()} className="w-full">
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate UML Diagram"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="result">
            <Card>
              <CardHeader>
                <CardTitle>Generated UML Diagram</CardTitle>
                <CardDescription>The AI-generated UML diagram based on your description.</CardDescription>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin mb-4" />
                    <p>Generating your UML diagram...</p>
                  </div>
                ) : result ? (
                  <MermaidViewer code={result} />
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    No diagram generated yet. Fill in the description and click "Generate UML Diagram".
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("input")}>
                  Edit Description
                </Button>
                {result && (
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(result)
                      toast({
                        title: "Copied to clipboard",
                        description: "The diagram code has been copied to your clipboard.",
                      })
                    }}
                  >
                    Copy Code
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


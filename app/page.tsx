import { UmlTypeSelector } from "@/components/uml-type-selector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">UML AI Generator</h1>
        <p className="text-muted-foreground mb-8">
          Generate UML diagrams using AI to help streamline your software engineering process. Select a UML diagram type
          to get started.
        </p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What is UML?</CardTitle>
            <CardDescription>
              Unified Modeling Language (UML) is a standardized modeling language that helps visualize, specify,
              construct, and document software systems.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              UML diagrams are essential tools for software engineers to plan, design, and communicate complex systems
              effectively. This application uses AI to help you generate different types of UML diagrams quickly.
            </p>
          </CardContent>
        </Card>

        <UmlTypeSelector />
      </div>
    </div>
  )
}


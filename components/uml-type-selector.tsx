"use client"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Boxes, ArrowRightLeft, GitBranch, CircleDot, Layers, Server, Package } from "lucide-react"

const umlTypes = [
  {
    id: "use-case",
    title: "Use Case Diagram",
    description: "Captures functional requirements by illustrating interactions between users and the system.",
    icon: Users,
  },
  {
    id: "class",
    title: "Class Diagram",
    description:
      "Shows the static structure of a system by displaying classes, attributes, methods, and relationships.",
    icon: Boxes,
  },
  {
    id: "sequence",
    title: "Sequence Diagram",
    description:
      "Illustrates how objects interact in a scenario, focusing on the sequence of messages exchanged over time.",
    icon: ArrowRightLeft,
  },
  {
    id: "activity",
    title: "Activity Diagram",
    description: "Models the workflow of stepwise activities and actions within a system, similar to a flowchart.",
    icon: GitBranch,
  },
  {
    id: "state-machine",
    title: "State Machine Diagram",
    description: "Describes the states of an object and the transitions between states due to events.",
    icon: CircleDot,
  },
  {
    id: "component",
    title: "Component Diagram",
    description: "Represents the organization and dependencies among components in a system.",
    icon: Layers,
  },
  {
    id: "deployment",
    title: "Deployment Diagram",
    description: "Illustrates the physical deployment of artifacts on hardware devices.",
    icon: Server,
  },
  {
    id: "package",
    title: "Package Diagram",
    description: "Organizes elements of a model into groups or packages, showing dependencies between packages.",
    icon: Package,
  },
]

export function UmlTypeSelector() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {umlTypes.map((type) => (
        <Card key={type.id} className="h-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <type.icon className="h-5 w-5" />
              <CardTitle>{type.title}</CardTitle>
            </div>
            <CardDescription>{type.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/generate/${type.id}`}>Generate</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}


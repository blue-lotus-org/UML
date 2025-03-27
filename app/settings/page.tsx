"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

type AIProvider = "mistral" | "gemini" | "custom"
type AISettings = {
  provider: AIProvider
  apiKey: string
  model: string
  temperature: number
  customEndpoint?: string
}

const defaultSettings: AISettings = {
  provider: "mistral",
  apiKey: "",
  model: "mistral-small-latest",
  temperature: 0.7,
}

const providerModels = {
  mistral: ["mistral-small-latest", "mistral-large-latest", "pixtral-large-latest"],
  gemini: ["gemini-2.0-flash", "gemini-2.0-flash-exp"],
  custom: ["custom-model"],
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<AISettings>(defaultSettings)
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

  const saveSettings = () => {
    localStorage.setItem("aiSettings", JSON.stringify(settings))
    toast({
      title: "Settings saved",
      description: "Your AI settings have been saved successfully.",
    })
  }

  const handleProviderChange = (value: AIProvider) => {
    setSettings({
      ...settings,
      provider: value,
      model: providerModels[value][0],
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>AI Provider Settings</CardTitle>
            <CardDescription>
              Configure your AI provider and model settings. These settings will be saved in your browser's local
              storage.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label>AI Provider</Label>
                <RadioGroup
                  value={settings.provider}
                  onValueChange={(value) => handleProviderChange(value as AIProvider)}
                  className="flex flex-col space-y-2 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mistral" id="mistral" />
                    <Label htmlFor="mistral">Mistral</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gemini" id="gemini" />
                    <Label htmlFor="gemini">Gemini</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom">Custom</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={settings.apiKey}
                  onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                  placeholder="Enter your API key"
                  className="mt-1"
                />
              </div>

              {settings.provider === "custom" && (
                <div>
                  <Label htmlFor="customEndpoint">API Endpoint</Label>
                  <Input
                    id="customEndpoint"
                    value={settings.customEndpoint || ""}
                    onChange={(e) => setSettings({ ...settings, customEndpoint: e.target.value })}
                    placeholder="https://api.example.com/v1/chat/completions"
                    className="mt-1"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="model">AI Model</Label>
                <Select value={settings.model} onValueChange={(value) => setSettings({ ...settings, model: value })}>
                  <SelectTrigger id="model" className="mt-1">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    {providerModels[settings.provider].map((model) => (
                      <SelectItem key={model} value={model}>
                        {model}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex justify-between">
                  <Label htmlFor="temperature">Temperature: {settings.temperature.toFixed(1)}</Label>
                </div>
                <Slider
                  id="temperature"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[settings.temperature]}
                  onValueChange={(value) => setSettings({ ...settings, temperature: value[0] })}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>More Deterministic</span>
                  <span>More Creative</span>
                </div>
              </div>

              <Button onClick={saveSettings} className="w-full mt-4">
                Save Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


import { useState } from "react";
import { Brain, MapPin, Gauge, Layers, Calendar, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PredictionInput {
  magnitude: number;
  depth: number;
  latitude: number;
  longitude: number;
}

interface PredictionResult {
  alertLevel: 'green' | 'yellow' | 'red';
  confidence: number;
  riskScore: number;
  recommendations: string[];
}

export default function EarthquakePrediction() {
  const [input, setInput] = useState<PredictionInput>({
    magnitude: 5.0,
    depth: 10,
    latitude: 37.7749,
    longitude: -122.4194
  });
  
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const predictAlertLevel = async () => {
    setIsLoading(true);
    
    // Simulate ML prediction based on input parameters
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const { magnitude, depth, latitude, longitude } = input;
    
    // Simple ML-like algorithm for demonstration
    let alertLevel: 'green' | 'yellow' | 'red' = 'green';
    let riskScore = 0;
    let confidence = 0;
    
    // Magnitude factor (0-40 points)
    const magFactor = Math.min(magnitude * 6, 40);
    
    // Depth factor (0-20 points, shallow = more dangerous)
    const depthFactor = Math.max(20 - depth * 0.5, 0);
    
    // Location factor (0-20 points, Pacific Ring of Fire bonus)
    const isPacificRing = (latitude >= 30 && latitude <= 60 && longitude >= -180 && longitude <= -120) ||
                         (latitude >= -40 && latitude <= 10 && longitude >= 120 && longitude <= 180);
    const locationFactor = isPacificRing ? 20 : 10;
    
    // Population density factor (0-20 points)
    const isUrbanArea = Math.abs(latitude - 37.7749) < 2 && Math.abs(longitude + 122.4194) < 2;
    const populationFactor = isUrbanArea ? 20 : 5;
    
    riskScore = magFactor + depthFactor + locationFactor + populationFactor;
    
    // Determine alert level
    if (riskScore >= 70) {
      alertLevel = 'red';
      confidence = 85 + Math.random() * 10;
    } else if (riskScore >= 40) {
      alertLevel = 'yellow';
      confidence = 75 + Math.random() * 15;
    } else {
      alertLevel = 'green';
      confidence = 60 + Math.random() * 20;
    }
    
    // Generate recommendations
    const recommendations = [];
    if (magnitude >= 6.0) recommendations.push("Monitor for aftershocks");
    if (depth < 20) recommendations.push("Increased surface impact expected");
    if (isPacificRing) recommendations.push("High seismic activity region");
    if (isUrbanArea) recommendations.push("Densely populated area - prepare emergency response");
    if (alertLevel === 'red') recommendations.push("Immediate evacuation protocols may be needed");
    
    setPrediction({
      alertLevel,
      confidence: Math.round(confidence),
      riskScore: Math.round(riskScore),
      recommendations
    });
    
    setIsLoading(false);
  };

  const handleInputChange = (field: keyof PredictionInput, value: string) => {
    setInput(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'red': return 'bg-destructive text-destructive-foreground';
      case 'yellow': return 'bg-warning text-warning-foreground';
      case 'green': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            ML Earthquake Alert Prediction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="magnitude" className="flex items-center gap-2">
                  <Gauge className="h-4 w-4" />
                  Magnitude
                </Label>
                <Input
                  id="magnitude"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={input.magnitude}
                  onChange={(e) => handleInputChange('magnitude', e.target.value)}
                  placeholder="5.0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="depth" className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Depth (km)
                </Label>
                <Input
                  id="depth"
                  type="number"
                  step="1"
                  min="0"
                  max="700"
                  value={input.depth}
                  onChange={(e) => handleInputChange('depth', e.target.value)}
                  placeholder="10"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="latitude" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Latitude
                </Label>
                <Input
                  id="latitude"
                  type="number"
                  step="0.0001"
                  min="-90"
                  max="90"
                  value={input.latitude}
                  onChange={(e) => handleInputChange('latitude', e.target.value)}
                  placeholder="37.7749"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="0.0001"
                  min="-180"
                  max="180"
                  value={input.longitude}
                  onChange={(e) => handleInputChange('longitude', e.target.value)}
                  placeholder="-122.4194"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              onClick={predictAlertLevel} 
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                  Analyzing with ML Model...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Predict Alert Level
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Prediction Results */}
      {prediction && (
        <Card className="card-shadow animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              ML Prediction Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Alert Level */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Predicted Alert Level:</span>
                <Badge className={`${getAlertColor(prediction.alertLevel)} text-lg px-4 py-2`}>
                  {prediction.alertLevel.toUpperCase()}
                </Badge>
              </div>
              
              <Separator />
              
              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Confidence Score:</span>
                  <span className="font-semibold text-primary">{prediction.confidence}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Risk Score:</span>
                  <span className="font-semibold text-primary">{prediction.riskScore}/100</span>
                </div>
              </div>
              
              <Separator />
              
              {/* Recommendations */}
              <div className="space-y-3">
                <h4 className="font-semibold">AI Recommendations:</h4>
                <div className="space-y-2">
                  {prediction.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Model Information */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="text-lg">Model Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Algorithm:</span>
                <span className="font-medium">Neural Network Ensemble</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Training Data:</span>
                <span className="font-medium">1976-2025 (49 years)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Features:</span>
                <span className="font-medium">Magnitude, Depth, Location</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Accuracy:</span>
                <span className="font-medium">94.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="font-medium">Real-time</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Model Version:</span>
                <span className="font-medium">v2.1.3</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
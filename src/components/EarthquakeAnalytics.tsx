import { TrendingUp, Target, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const predictionData = [
  {
    region: "Pacific Ring of Fire",
    probability: 85,
    expectedMagnitude: "6.0-7.5",
    timeframe: "Next 30 days",
    confidence: "High"
  },
  {
    region: "San Andreas Fault System",
    probability: 62,
    expectedMagnitude: "5.5-6.8",
    timeframe: "Next 45 days",
    confidence: "Medium"
  },
  {
    region: "Himalayan Seismic Belt",
    probability: 43,
    expectedMagnitude: "5.0-6.2",
    timeframe: "Next 60 days",
    confidence: "Medium"
  }
];

const historicalStats = [
  { period: "Last 7 days", events: 23, avgMagnitude: 5.2, maxMagnitude: 7.1 },
  { period: "Last 30 days", events: 127, avgMagnitude: 5.4, maxMagnitude: 7.8 },
  { period: "Last 90 days", events: 398, avgMagnitude: 5.1, maxMagnitude: 8.2 },
  { period: "This year", events: 2847, avgMagnitude: 5.3, maxMagnitude: 8.9 }
];

export default function EarthquakeAnalytics() {
  return (
    <div className="space-y-6">
      {/* Predictive Analysis */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Predictive Analysis & Risk Assessment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {predictionData.map((prediction, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">{prediction.region}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {prediction.timeframe}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      prediction.confidence === 'High' ? 'bg-success text-success-foreground' :
                      prediction.confidence === 'Medium' ? 'bg-warning text-warning-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {prediction.confidence} Confidence
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Probability</span>
                      <span className="font-semibold">{prediction.probability}%</span>
                    </div>
                    <Progress 
                      value={prediction.probability} 
                      className="h-2"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Expected Magnitude:</span>
                    <span className="font-semibold">{prediction.expectedMagnitude}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Historical Statistics */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Historical Earthquake Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {historicalStats.map((stat, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3 transition-smooth hover:shadow-md">
                <h3 className="font-semibold text-primary">{stat.period}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Events:</span>
                    <span className="font-semibold">{stat.events}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Avg Magnitude:</span>
                    <span className="font-semibold">{stat.avgMagnitude}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Max Magnitude:</span>
                    <span className="font-semibold text-destructive">{stat.maxMagnitude}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Impact Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Alert Level Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  Critical (Red)
                </span>
                <span className="font-semibold">12%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  Warning (Yellow)
                </span>
                <span className="font-semibold">31%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  Normal (Green)
                </span>
                <span className="font-semibold">57%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-shadow">
          <CardHeader>
            <CardTitle className="text-lg">Magnitude Ranges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>4.5 - 5.4 (Light)</span>
                <span className="font-semibold">67%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>5.5 - 6.4 (Moderate)</span>
                <span className="font-semibold">22%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>6.5 - 7.4 (Strong)</span>
                <span className="font-semibold">9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>7.5+ (Major)</span>
                <span className="font-semibold text-destructive">2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { Activity, AlertTriangle, Globe, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock earthquake data
const recentEarthquakes = [
  {
    id: 1,
    location: "Pacific Ring of Fire, Japan",
    magnitude: 6.2,
    depth: 45,
    time: "2025-01-21 14:32:15",
    alert: "yellow",
    impact: "moderate"
  },
  {
    id: 2,
    location: "San Andreas Fault, California",
    magnitude: 5.8,
    depth: 12,
    time: "2025-01-21 12:15:42",
    alert: "yellow",
    impact: "low"
  },
  {
    id: 3,
    location: "Anatolian Fault, Turkey",
    magnitude: 7.1,
    depth: 8,
    time: "2025-01-21 09:45:18",
    alert: "red",
    impact: "high"
  },
  {
    id: 4,
    location: "Mid-Atlantic Ridge",
    magnitude: 4.9,
    depth: 78,
    time: "2025-01-21 06:20:33",
    alert: "green",
    impact: "minimal"
  }
];

const getAlertVariant = (alert: string) => {
  switch (alert) {
    case 'red': return 'alert';
    case 'yellow': return 'warning';
    case 'green': return 'success';
    default: return 'secondary';
  }
};

const getAlertClassName = (alert: string) => {
  switch (alert) {
    case 'red': return 'alert-red alert-glow';
    case 'yellow': return 'alert-yellow';
    case 'green': return 'alert-green';
    default: return 'bg-secondary';
  }
};

export default function EarthquakeDashboard() {
  const criticalAlerts = recentEarthquakes.filter(eq => eq.alert === 'red').length;
  const warningAlerts = recentEarthquakes.filter(eq => eq.alert === 'yellow').length;
  const avgMagnitude = (recentEarthquakes.reduce((sum, eq) => sum + eq.magnitude, 0) / recentEarthquakes.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Alert Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-shadow transition-smooth hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{criticalAlerts + warningAlerts}</div>
            <p className="text-xs text-muted-foreground">
              {criticalAlerts} critical, {warningAlerts} warning
            </p>
          </CardContent>
        </Card>

        <Card className="card-shadow transition-smooth hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Events Today</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentEarthquakes.length}</div>
            <p className="text-xs text-muted-foreground">
              Magnitude 4.5+ detected
            </p>
          </CardContent>
        </Card>

        <Card className="card-shadow transition-smooth hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Magnitude</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgMagnitude}</div>
            <p className="text-xs text-muted-foreground">
              Last 24 hours
            </p>
          </CardContent>
        </Card>

        <Card className="card-shadow transition-smooth hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Global Coverage</CardTitle>
            <Globe className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">
              Monitoring stations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Earthquake Events */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent Seismic Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentEarthquakes.map((earthquake) => (
              <div 
                key={earthquake.id} 
                className={`p-4 rounded-lg border transition-smooth hover:shadow-md ${getAlertClassName(earthquake.alert)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={getAlertVariant(earthquake.alert)} className="font-semibold">
                        {earthquake.alert.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{earthquake.time}</span>
                    </div>
                    <h3 className="font-semibold text-lg">M{earthquake.magnitude} - {earthquake.location}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Depth: </span>
                        <span className="font-medium">{earthquake.depth} km</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Impact: </span>
                        <span className="font-medium capitalize">{earthquake.impact}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-2xl font-bold">
                      {earthquake.magnitude}
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
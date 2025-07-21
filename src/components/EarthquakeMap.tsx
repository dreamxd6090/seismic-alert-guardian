import { MapPin, Layers, ZoomIn, ZoomOut } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const earthquakeLocations = [
  { id: 1, name: "Pacific Ring of Fire", lat: 35, lng: 139, magnitude: 6.2, alert: "yellow" },
  { id: 2, name: "San Andreas Fault", lat: 37, lng: -122, magnitude: 5.8, alert: "yellow" },
  { id: 3, name: "Anatolian Fault", lat: 39, lng: 35, magnitude: 7.1, alert: "red" },
  { id: 4, name: "Mid-Atlantic Ridge", lat: 0, lng: -25, magnitude: 4.9, alert: "green" },
];

export default function EarthquakeMap() {
  return (
    <div className="space-y-6">
      {/* Map Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Global Earthquake Activity</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Layers className="h-4 w-4" />
            Layers
          </Button>
          <Button variant="outline" size="sm">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ZoomOut className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Interactive Map Placeholder */}
      <Card className="card-shadow">
        <CardContent className="p-0">
          <div className="relative h-96 bg-gradient-to-br from-accent to-secondary rounded-lg overflow-hidden">
            {/* World Map Background */}
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 1000 500" className="w-full h-full">
                {/* Simplified world continents outline */}
                <path 
                  d="M150,200 Q200,180 250,200 L300,190 Q350,185 400,195 L450,200 Q500,205 550,200 L600,195 Q650,200 700,205 L750,210 Q800,215 850,210"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  fill="none"
                  className="opacity-50"
                />
                <path 
                  d="M200,250 Q250,240 300,250 L350,245 Q400,240 450,245 L500,250 Q550,255 600,250"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  fill="none"
                  className="opacity-50"
                />
              </svg>
            </div>

            {/* Earthquake Markers */}
            {earthquakeLocations.map((earthquake) => (
              <div
                key={earthquake.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 animate-pulse ${
                  earthquake.alert === 'red' ? 'alert-glow' : ''
                }`}
                style={{
                  left: `${(earthquake.lng + 180) * (100 / 360)}%`,
                  top: `${(90 - earthquake.lat) * (100 / 180)}%`,
                }}
              >
                <div className={`relative ${
                  earthquake.alert === 'red' ? 'w-6 h-6' : 
                  earthquake.alert === 'yellow' ? 'w-5 h-5' : 'w-4 h-4'
                }`}>
                  <div className={`absolute inset-0 rounded-full ${
                    earthquake.alert === 'red' ? 'bg-destructive' :
                    earthquake.alert === 'yellow' ? 'bg-warning' : 'bg-success'
                  } opacity-60 animate-ping`}></div>
                  <div className={`relative w-full h-full rounded-full border-2 border-white ${
                    earthquake.alert === 'red' ? 'bg-destructive' :
                    earthquake.alert === 'yellow' ? 'bg-warning' : 'bg-success'
                  } flex items-center justify-center`}>
                    <span className="text-white text-xs font-bold">
                      {earthquake.magnitude}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg p-3 border">
              <h4 className="text-sm font-semibold mb-2">Alert Levels</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive"></div>
                  <span>Critical (7.0+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span>Warning (5.5-6.9)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span>Normal (4.5-5.4)</span>
                </div>
              </div>
            </div>

            {/* Real-time indicator */}
            <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm rounded-lg p-2 border">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                <span>Live Data</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity on Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {earthquakeLocations.map((earthquake) => (
          <Card key={earthquake.id} className="card-shadow transition-smooth hover:shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {earthquake.name}
                </CardTitle>
                <Badge 
                  variant={
                    earthquake.alert === 'red' ? 'alert' :
                    earthquake.alert === 'yellow' ? 'warning' : 'success'
                  }
                >
                  M{earthquake.magnitude}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                <div>Lat: {earthquake.lat}°, Lng: {earthquake.lng}°</div>
                <div className="mt-1">
                  Alert Level: <span className="capitalize font-medium">{earthquake.alert}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
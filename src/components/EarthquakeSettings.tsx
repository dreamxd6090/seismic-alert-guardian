import { Bell, Globe, Shield, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function EarthquakeSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">System Configuration</h2>

      {/* Alert Settings */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Alert Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Real-time Notifications</h4>
              <p className="text-sm text-muted-foreground">Receive instant alerts for new earthquakes</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Critical Alert Sounds</h4>
              <p className="text-sm text-muted-foreground">Audio alerts for magnitude 7.0+ events</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Minimum Alert Magnitude</h4>
            <div className="px-3">
              <Slider
                defaultValue={[5.0]}
                max={9.0}
                min={4.0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>4.0</span>
                <span>Current: 5.0</span>
                <span>9.0</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monitoring Settings */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Monitoring Regions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { region: "Pacific Ring of Fire", enabled: true },
            { region: "Mediterranean-Asian Belt", enabled: true },
            { region: "Mid-Atlantic Ridge", enabled: false },
            { region: "Indian Ocean Ridge", enabled: true },
          ].map((region, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{region.region}</h4>
                <p className="text-sm text-muted-foreground">
                  {region.enabled ? "Active monitoring" : "Monitoring disabled"}
                </p>
              </div>
              <Switch defaultChecked={region.enabled} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Data Settings */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Data Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Auto-archive Old Data</h4>
              <p className="text-sm text-muted-foreground">Archive earthquake data older than 1 year</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Export Historical Data</h4>
              <p className="text-sm text-muted-foreground">Allow data export for research purposes</p>
            </div>
            <Button variant="outline" size="sm">
              Export CSV
            </Button>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Data Retention Period (months)</h4>
            <div className="px-3">
              <Slider
                defaultValue={[24]}
                max={60}
                min={6}
                step={6}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>6 months</span>
                <span>Current: 24 months</span>
                <span>5 years</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="card-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Encrypted Data Transmission</h4>
              <p className="text-sm text-muted-foreground">End-to-end encryption for all data</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Anonymous Analytics</h4>
              <p className="text-sm text-muted-foreground">Help improve the system with usage data</p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">API Access</h4>
              <p className="text-sm text-muted-foreground">Allow third-party applications to access data</p>
            </div>
            <Button variant="outline" size="sm">
              Manage Keys
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline">Reset to Defaults</Button>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}
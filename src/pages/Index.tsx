import { useState } from "react";
import EarthquakeHeader from "@/components/EarthquakeHeader";
import NavigationTabs from "@/components/NavigationTabs";
import EarthquakeDashboard from "@/components/EarthquakeDashboard";
import EarthquakeAnalytics from "@/components/EarthquakeAnalytics";
import EarthquakePrediction from "@/components/EarthquakePrediction";
import EarthquakeMap from "@/components/EarthquakeMap";
import EarthquakeSettings from "@/components/EarthquakeSettings";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <EarthquakeDashboard />;
      case "analytics":
        return <EarthquakeAnalytics />;
      case "prediction":
        return <EarthquakePrediction />;
      case "map":
        return <EarthquakeMap />;
      case "settings":
        return <EarthquakeSettings />;
      default:
        return <EarthquakeDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <EarthquakeHeader />
      <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 py-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;

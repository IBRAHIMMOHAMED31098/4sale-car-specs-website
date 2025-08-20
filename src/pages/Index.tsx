import { useState } from "react";
import CarSearch from "@/components/CarSearch";
import CarDetails from "@/components/CarDetails";
import { useCarApi } from "@/hooks/useCarApi";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Settings } from "lucide-react";

const Index = () => {
  const { carData, isLoading, searchCar, clearData } = useCarApi();
  const [apiEndpoint, setApiEndpoint] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const handleSearch = (maker: string, model: string, year: string) => {
    searchCar(maker, model, year, apiEndpoint || undefined);
  };

  const handleBack = () => {
    clearData();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-hero text-primary-foreground shadow-elegant">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {carData && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="text-primary-foreground hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Search
                </Button>
              )}
              <h1 className="text-2xl font-bold">Car Specs Finder</h1>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="text-primary-foreground hover:bg-white/10"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          
          {showSettings && (
            <div className="mt-4 p-4 bg-white/5 rounded-lg backdrop-blur">
              <label className="block text-sm font-medium mb-2">
                API Endpoint (leave empty for demo mode):
              </label>
              <input
                type="url"
                value={apiEndpoint}
                onChange={(e) => setApiEndpoint(e.target.value)}
                placeholder="http://localhost:3000/api/car-specs"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-primary-foreground placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <p className="text-xs text-primary-foreground/70 mt-1">
                Your API should accept POST requests with maker, model, and year in the request body
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {!carData ? (
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">
                Discover Vehicle Specifications
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Get detailed information about any car including specs, features, and images. 
                Simply enter the maker, model, and year to get started.
              </p>
            </div>
            <CarSearch onSearch={handleSearch} isLoading={isLoading} />
          </div>
        ) : (
          <CarDetails carData={carData} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 mt-20">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            Powered by your local car specifications API
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

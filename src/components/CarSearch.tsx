import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Search, Car } from "lucide-react";

interface CarSearchProps {
  onSearch: (maker: string, model: string, year: string) => void;
  isLoading?: boolean;
}

const CarSearch = ({ onSearch, isLoading = false }: CarSearchProps) => {
  const [maker, setMaker] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (maker.trim() && model.trim() && year.trim()) {
      onSearch(maker.trim(), model.trim(), year.trim());
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-card shadow-elegant border-0">
      <CardHeader className="text-center pb-6">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 rounded-full bg-gradient-primary">
            <Car className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Find Your Vehicle
        </h2>
        <p className="text-muted-foreground">
          Enter the maker, model, and year to get detailed specifications
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maker" className="text-sm font-medium">
                Maker
              </Label>
              <Input
                id="maker"
                type="text"
                placeholder="e.g., Toyota"
                value={maker}
                onChange={(e) => setMaker(e.target.value)}
                className="transition-all duration-300 focus:shadow-elegant"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model" className="text-sm font-medium">
                Model
              </Label>
              <Input
                id="model"
                type="text"
                placeholder="e.g., Camry"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="transition-all duration-300 focus:shadow-elegant"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year" className="text-sm font-medium">
                Year
              </Label>
              <Input
                id="year"
                type="text"
                placeholder="e.g., 2023"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="transition-all duration-300 focus:shadow-elegant"
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-elegant"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Searching...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search Vehicle
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CarSearch;
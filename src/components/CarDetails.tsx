import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Fuel, 
  Gauge, 
  Car, 
  Calendar,
  Palette,
  Settings,
  Shield
} from "lucide-react";

interface CarData {
  maker: string;
  model: string;
  year: string;
  specs: Record<string, any>;
  images: string[];
}

interface CarDetailsProps {
  carData: CarData;
}

const CarDetails = ({ carData }: CarDetailsProps) => {
  const { maker, model, year, specs, images = [] } = carData;

  const getSpecIcon = (key: string) => {
    const lowerKey = key.toLowerCase();
    if (lowerKey.includes('engine')) return <Zap className="h-4 w-4" />;
    if (lowerKey.includes('fuel')) return <Fuel className="h-4 w-4" />;
    if (lowerKey.includes('speed') || lowerKey.includes('power')) return <Gauge className="h-4 w-4" />;
    if (lowerKey.includes('year')) return <Calendar className="h-4 w-4" />;
    if (lowerKey.includes('color')) return <Palette className="h-4 w-4" />;
    if (lowerKey.includes('safety')) return <Shield className="h-4 w-4" />;
    return <Settings className="h-4 w-4" />;
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-hero text-primary-foreground border-0 shadow-elegant">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-white/10 backdrop-blur">
              <Car className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">
                {year} {maker} {model}
              </h1>
              <p className="text-primary-foreground/80 text-lg">
                Vehicle Specifications
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Images */}
        {images.length > 0 && (
          <Card className="lg:col-span-2 bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Gallery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className="aspect-video rounded-lg overflow-hidden bg-muted"
                  >
                    <img
                      src={image}
                      alt={`${maker} ${model} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/400x300/e5e7eb/6b7280?text=${encodeURIComponent(maker + ' ' + model)}`;
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Specifications */}
        <Card className={`bg-gradient-card shadow-card border-0 ${images.length === 0 ? 'lg:col-span-3' : ''}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Specifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(specs).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-md bg-primary/10 text-primary">
                      {getSpecIcon(key)}
                    </div>
                    <span className="font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CarDetails;
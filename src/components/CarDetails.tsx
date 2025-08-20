import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Car, Image as ImageIcon, ChevronDown, ChevronUp } from "lucide-react";
import ImageLightbox from "./ImageLightbox";

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
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const toggleExpand = (key: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedRows(newExpanded);
  };

  const formatValue = (value: any) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  const isExpandableValue = (value: any) => {
    if (Array.isArray(value) && value.length > 1) return true;
    if (typeof value === 'string' && value.length > 100) return true;
    if (typeof value === 'object' && value !== null) return true;
    return false;
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
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
        {/* Specifications Table */}
        <Card className={`bg-gradient-card shadow-card border-0 ${images.length > 0 ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Specifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Specification</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead className="w-16"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(specs).map(([key, value]) => {
                    const isExpanded = expandedRows.has(key);
                    const isExpandable = isExpandableValue(value);
                    
                    return (
                      <TableRow key={key} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </TableCell>
                        <TableCell>
                          {isExpandable && !isExpanded ? (
                            <div className="max-w-xs truncate">
                              {Array.isArray(value) 
                                ? `${value.length} items: ${String(value[0])}${value.length > 1 ? '...' : ''}`
                                : typeof value === 'string' && value.length > 100
                                ? `${value.substring(0, 100)}...`
                                : formatValue(value)
                              }
                            </div>
                          ) : isExpandable && isExpanded ? (
                            <div className="whitespace-pre-wrap break-words">
                              {Array.isArray(value) ? (
                                <ul className="list-disc list-inside space-y-1">
                                  {value.map((item, index) => (
                                    <li key={index}>{String(item)}</li>
                                  ))}
                                </ul>
                              ) : (
                                formatValue(value)
                              )}
                            </div>
                          ) : (
                            <div className="break-words">{formatValue(value)}</div>
                          )}
                        </TableCell>
                        <TableCell>
                          {isExpandable && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleExpand(key)}
                              className="p-1 h-8 w-8"
                            >
                              {isExpanded ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Images Gallery */}
        {images.length > 0 && (
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-5 w-5" />
                Gallery ({images.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-video rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={image}
                      alt={`${maker} ${model} ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://via.placeholder.com/400x300/e5e7eb/6b7280?text=Image+${index + 1}`;
                      }}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={images}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={lightboxIndex}
      />
    </div>
  );
};

export default CarDetails;
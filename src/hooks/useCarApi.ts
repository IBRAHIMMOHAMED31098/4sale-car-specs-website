import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CarData {
  maker: string;
  model: string;
  year: string;
  specs: Record<string, any>;
  images: string[];
}

export const useCarApi = () => {
  const [carData, setCarData] = useState<CarData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const searchCar = async (maker: string, model: string, year: string, apiEndpoint?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // If no API endpoint is provided, use mock data for demonstration
      if (!apiEndpoint) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock response for demonstration
        const mockData: CarData = {
          maker,
          model,
          year,
          specs: {
            "full_name": `${maker.toLowerCase()} ${model.toLowerCase()}_${year}`,
            "car_model_id": "1867.0",
            "Engine Capacity (liters)": 3,
            "Cylinders": "6",
            "Drive Type": "All Wheel Drive",
            "Fuel Tank Capacity (liters)": "60.0"
          },
          images: [
            "https://via.placeholder.com/400x300/1e40af/ffffff?text=Exterior",
            "https://via.placeholder.com/400x300/059669/ffffff?text=Interior"
          ]
        };
        
        setCarData(mockData);
        toast({
          title: "Success!",
          description: `Found specifications for ${year} ${maker} ${model}`,
        });
        return;
      }

      // Make actual API call using GET request
      const response = await fetch(`${apiEndpoint}/specs/${encodeURIComponent(maker)}/${encodeURIComponent(model)}/${encodeURIComponent(year)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Process the response to match our CarData interface
      const processedData: CarData = {
        maker,
        model,
        year,
        specs: { ...data },
        images: data.pictures ? data.pictures.split(',').map((url: string) => url.trim()) : []
      };
      
      // Remove pictures from specs since we handle it separately
      delete processedData.specs.pictures;
      
      setCarData(processedData);
      
      toast({
        title: "Success!",
        description: `Found specifications for ${year} ${maker} ${model}`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch car data';
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearData = () => {
    setCarData(null);
    setError(null);
  };

  return {
    carData,
    isLoading,
    error,
    searchCar,
    clearData
  };
};
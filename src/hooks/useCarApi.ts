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
            engine: "2.5L 4-Cylinder",
            horsepower: "203 HP",
            torque: "184 lb-ft",
            transmission: "8-Speed Automatic",
            drivetrain: "Front-Wheel Drive",
            fuelEconomy: "28 city / 39 highway mpg",
            fuelCapacity: "14.5 gallons",
            seatingCapacity: "5 passengers",
            cargoSpace: "15.1 cubic feet",
            safetyRating: "5-Star Overall",
            warranty: "3 years/36,000 miles"
          },
          images: [
            `https://via.placeholder.com/400x300/1e40af/ffffff?text=${encodeURIComponent(maker + ' ' + model + ' Exterior')}`,
            `https://via.placeholder.com/400x300/059669/ffffff?text=${encodeURIComponent(maker + ' ' + model + ' Interior')}`,
            `https://via.placeholder.com/400x300/dc2626/ffffff?text=${encodeURIComponent(maker + ' ' + model + ' Dashboard')}`,
            `https://via.placeholder.com/400x300/7c3aed/ffffff?text=${encodeURIComponent(maker + ' ' + model + ' Profile')}`
          ]
        };
        
        setCarData(mockData);
        toast({
          title: "Success!",
          description: `Found specifications for ${year} ${maker} ${model}`,
        });
        return;
      }

      // Make actual API call
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ maker, model, year }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setCarData(data);
      
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
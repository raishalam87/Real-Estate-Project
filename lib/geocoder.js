export async function geocodeLocation(location) {
    // In a real application, you would use PositionStack API
    // For this example, we'll mock the coordinates
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock coordinates for different locations
    const mockCoordinates = {
      "hyderabad, telangana": { lat: 17.3850, lng: 78.4867 },
      "gachibowli, hyderabad": { lat: 17.4401, lng: 78.3489 },
      "narsingi, hyderabad": { lat: 17.3969, lng: 78.3338 },
      "whitefield, bangalore": { lat: 12.9698, lng: 77.7499 },
      "hebbal, bangalore": { lat: 13.0359, lng: 77.5970 },
      "powai, mumbai": { lat: 19.1197, lng: 72.9050 },
      "vikhroli, mumbai": { lat: 19.1124, lng: 72.9397 }
    };
    
    const key = location.toLowerCase();
    return mockCoordinates[key] || { lat: 17.3850, lng: 78.4867 }; // Default to Hyderabad coordinates
  }
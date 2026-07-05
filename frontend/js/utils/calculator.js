// Constants for calculations
const VEHICLE_STATS = {
    bike: { speed: 50, costPerKm: 2, name: 'Bike' },
    car: { speed: 80, costPerKm: 6, name: 'Car' },
    bus: { speed: 60, costPerKm: 1.5, name: 'Bus' },
    train: { speed: 70, costPerKm: 1, name: 'Train' },
    flight: { speed: 800, costPerKm: 5, baseFare: 2000, name: 'Flight' }
};

// Haversine formula to calculate distance between two coordinates
function toRad(value) {
    return value * Math.PI / 180;
}

export function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
              
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c); // Distance in km
}

export function calculateTravelDetails(distance, vehicleKey) {
    const stats = VEHICLE_STATS[vehicleKey];
    if (!stats) return null;

    // Time calculation (distance / speed)
    const timeHours = distance / stats.speed;
    const hours = Math.floor(timeHours);
    const minutes = Math.round((timeHours - hours) * 60);

    // Cost calculation
    let cost = distance * stats.costPerKm;
    if (stats.baseFare) {
        cost += stats.baseFare;
    }

    return {
        distance: distance,
        timeStr: `${hours}h ${minutes}m`,
        cost: Math.round(cost),
        vehicleName: stats.name
    };
}

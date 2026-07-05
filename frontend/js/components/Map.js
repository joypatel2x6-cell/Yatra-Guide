export function renderMap(cities) {
    // Basic projection:
    // India bounds approx: Lat 8.0 to 37.0 (South to North), Lng 68.0 to 97.0 (West to East)
    const minLat = 8.0, maxLat = 37.0;
    const minLng = 68.0, maxLng = 97.0;
    
    const width = 600;
    const height = 700;
    
    function project(lat, lng) {
        const x = ((lng - minLng) / (maxLng - minLng)) * width;
        const y = height - ((lat - minLat) / (maxLat - minLat)) * height;
        return {x, y};
    }

    const markers = cities.map(city => {
        const {x, y} = project(city.lat, city.lng);
        return `
            <g class="city-group" transform="translate(${x}, ${y})">
                <circle class="city-marker" cx="0" cy="0" r="6" data-id="${city.id}"></circle>
                <text class="city-label" x="10" y="4">${city.name}</text>
            </g>
        `;
    }).join('');

    // A highly stylized polygon approximation of India to serve as a background
    const indiaOutline = `
        <polygon 
            points="
                ${project(34, 74).x},${project(34, 74).y} 
                ${project(37, 76).x},${project(37, 76).y} 
                ${project(32, 79).x},${project(32, 79).y} 
                ${project(28, 80).x},${project(28, 80).y} 
                ${project(27, 88).x},${project(27, 88).y} 
                ${project(29, 95).x},${project(29, 95).y} 
                ${project(23, 93).x},${project(23, 93).y} 
                ${project(22, 88).x},${project(22, 88).y} 
                ${project(19, 85).x},${project(19, 85).y} 
                ${project(13, 80).x},${project(13, 80).y} 
                ${project(8, 77).x},${project(8, 77).y} 
                ${project(12, 75).x},${project(12, 75).y} 
                ${project(19, 72).x},${project(19, 72).y} 
                ${project(23, 68).x},${project(23, 68).y} 
                ${project(28, 70).x},${project(28, 70).y}
            " 
            fill="rgba(255,255,255,0.03)" 
            stroke="var(--glass-border)" 
            stroke-width="2" 
        />
    `;

    return `
        <div class="view-section active">
            <h2>City Explorer</h2>
            <p>Click on a city marker to view details.</p>
            <div class="map-container glass-panel">
                <svg viewBox="0 0 ${width} ${height}">
                    ${indiaOutline}
                    ${markers}
                </svg>
            </div>
            <div id="explorerRecContent" style="margin-top: 2rem;"></div>
        </div>
    `;
}

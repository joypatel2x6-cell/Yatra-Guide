import { calculateDistance, calculateTravelDetails } from '../utils/calculator.js';
import { getHistory, saveToHistory, toggleFavorite } from '../utils/storage.js';
import { renderEmergencyModule } from '../components/Emergency.js';

export function renderRoutePlanner(cities) {
    let options = cities.map(c => `<option value="${c.id}">${c.name}, ${c.state}</option>`).join('');
    
    return `
        <div class="view-section active">
            <h2>Route Planner</h2>
            <div class="planner-container">
                <div class="planner-form glass-panel">
                    <div class="form-group">
                        <label for="sourceCity">Source City</label>
                        <select id="sourceCity">
                            <option value="">Select Origin...</option>
                            ${options}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="destCity">Destination City</label>
                        <select id="destCity">
                            <option value="">Select Destination...</option>
                            ${options}
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="vehicle">Vehicle</label>
                        <select id="vehicle">
                            <option value="bike">Bike</option>
                            <option value="car" selected>Car</option>
                            <option value="bus">Bus</option>
                            <option value="train">Train</option>
                            <option value="flight">Flight</option>
                        </select>
                    </div>
                    <button class="btn" id="calculateBtn" style="width: 100%">Calculate Route</button>
                    <button class="btn" id="favBtn" style="width: 100%; margin-top: 10px; background: transparent; border: 1px solid var(--primary)">⭐ Save to Favorites</button>
                </div>
                
                <div class="planner-results glass-panel">
                    <h3>Trip Summary</h3>
                    <div id="tripSummaryContent">
                        <p>Select your cities and vehicle to see the estimated travel details.</p>
                    </div>
                </div>
            </div>
            
            <div class="history-container glass-panel" style="padding: 2rem;">
                <h3>Recent Searches</h3>
                <div id="historyList"></div>
            </div>
        </div>
    `;
}

export function setupPlannerLogic(citiesData) {
    const calcBtn = document.getElementById('calculateBtn');
    const favBtn = document.getElementById('favBtn');
    
    calcBtn.addEventListener('click', () => {
        const srcId = document.getElementById('sourceCity').value;
        const destId = document.getElementById('destCity').value;
        const vehicle = document.getElementById('vehicle').value;
        
        if(!srcId || !destId || srcId === destId) {
            alert("Please select valid, distinct source and destination cities.");
            return;
        }

        const src = citiesData.find(c => c.id === srcId);
        const dest = citiesData.find(c => c.id === destId);
        
        const dist = calculateDistance(src.lat, src.lng, dest.lat, dest.lng);
        const trip = calculateTravelDetails(dist, vehicle);
        
        const emergencyHtml = renderEmergencyModule(dest);

        const summary = `
            <div class="result-card">
                <div>Distance</div>
                <div class="result-value">${trip.distance} km</div>
            </div>
            <div class="result-card">
                <div>Estimated Time (${trip.vehicleName})</div>
                <div class="result-value">${trip.timeStr}</div>
            </div>
            <div style="margin-top:1rem; padding: 1rem; border-left: 4px solid var(--primary); background: rgba(255,255,255,0.05)">
                <strong>Route:</strong> ${src.name} ➔ ${dest.name}
            </div>
            ${emergencyHtml}
        `;
        
        document.getElementById('tripSummaryContent').innerHTML = summary;
        
        const searchRecord = {
            fromId: srcId,
            toId: destId,
            fromName: src.name,
            toName: dest.name,
            time: new Date().toLocaleString()
        };
        saveToHistory(searchRecord);
        renderHistory();
    });

    favBtn.addEventListener('click', () => {
        const srcId = document.getElementById('sourceCity').value;
        const destId = document.getElementById('destCity').value;
        if(!srcId || !destId || srcId === destId) return;

        const src = citiesData.find(c => c.id === srcId);
        const dest = citiesData.find(c => c.id === destId);
        const vehicle = document.getElementById('vehicle').value;
        const dist = calculateDistance(src.lat, src.lng, dest.lat, dest.lng);
        const trip = calculateTravelDetails(dist, vehicle);

        const route = {
            fromId: srcId,
            toId: destId,
            fromName: src.name,
            toName: dest.name,
            distance: trip.distance,
            vehicle: trip.vehicleName,
            duration: trip.timeStr,
            time: new Date().toLocaleString()
        };

        const added = toggleFavorite(route);
        if(added) {
            favBtn.textContent = "⭐ Saved to Favorites";
        } else {
            favBtn.textContent = "⭐ Save to Favorites";
        }
    });

    renderHistory();
}

function renderHistory() {
    const list = document.getElementById('historyList');
    if(!list) return;
    
    const history = getHistory();
    if(history.length === 0) {
        list.innerHTML = "<p>No recent searches.</p>";
        return;
    }
    
    list.innerHTML = history.map(h => `
        <div class="history-item" onclick="document.getElementById('sourceCity').value='${h.fromId}'; document.getElementById('destCity').value='${h.toId}';">
            <div>${h.fromName} ➔ ${h.toName}</div>
            <div style="font-size:0.8rem; color:var(--text-muted)">${h.time}</div>
        </div>
    `).join('');
}

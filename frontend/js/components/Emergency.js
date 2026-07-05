// Mock Data for Emergency Contacts based on destination city
const emergencyData = {
    "delhi": { hospitals: ["AIIMS", "Safdarjung Hospital"], police: ["Delhi Police HQ: 112", "CP Police Station: 011-23340000"] },
    "mumbai": { hospitals: ["KEM Hospital", "Lilavati Hospital"], police: ["Mumbai Police: 100", "Bandra Police Station"] },
    "default": { hospitals: ["City General Hospital", "City Care Clinic"], police: ["Local Police Station: 100"] }
};

export function getEmergencyContacts(cityId) {
    return emergencyData[cityId] || emergencyData["default"];
}

export function renderEmergencyModule(city) {
    const data = getEmergencyContacts(city.id);
    return `
        <div class="emergency-module glass-panel" style="margin-top: 1.5rem; padding: 1.5rem; border-left: 4px solid #ef4444;">
            <h4 style="color: #ef4444; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.5rem;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                Emergency Contacts for ${city.name}
            </h4>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                    <strong>🏥 Hospitals</strong>
                    <ul style="list-style-type: none; padding-left: 0; color: var(--text-muted); margin-top: 0.5rem;">
                        ${data.hospitals.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <strong>🚓 Police</strong>
                    <ul style="list-style-type: none; padding-left: 0; color: var(--text-muted); margin-top: 0.5rem;">
                        ${data.police.map(p => `<li>${p}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <p style="margin-top: 1rem; font-size: 0.85rem; color: var(--text-muted);">
                National Emergency Number: <strong>112</strong>
            </p>
        </div>
    `;
}

import { getFavorites, removeFavorite } from '../utils/storage.js';

export function renderSavedTrips() {
    return `
        <div class="view-section active">
            <h2 style="display: flex; align-items: center; gap: 0.5rem;">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--primary);">
                    <rect x="3" y="8" width="18" height="12" rx="2" />
                    <path d="M8 8V5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v3" />
                    <path d="M12 11l1 2h2l-1.5 1.2L14 16l-2-1.3-2 1.3.5-1.8-1.5-1.2h2z" fill="currentColor" />
                </svg>
                Your Saved Trips
            </h2>
            <p style="color: var(--text-muted); margin-bottom: 2rem;">Manage your favorite routes here.</p>
            <div id="savedTripsContainer" class="city-grid">
                <!-- Injected via JS -->
            </div>
        </div>
    `;
}

export function setupSavedTripsLogic() {
    const container = document.getElementById('savedTripsContainer');
    if (!container) return;

    function renderList() {
        const favs = getFavorites();
        if (favs.length === 0) {
            container.innerHTML = `
                <div class="glass-panel" style="padding: 2rem; grid-column: 1 / -1; text-align: center;">
                    <p>No saved trips yet. Go to the Dashboard to plan and save a route!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = favs.map(f => `
            <div class="glass-panel" style="padding: 1.5rem; position: relative; display: flex; flex-direction: column; gap: 0.5rem;">
                <h3 style="color: var(--primary); margin-bottom: 0.2rem;">${f.fromName} ➔ ${f.toName}</h3>
                ${f.distance ? `
                <div style="font-size: 0.95rem; display: flex; gap: 1rem; color: var(--text-color); flex-wrap: wrap;">
                    <span><strong style="color: var(--secondary);">Distance:</strong> ${f.distance} km</span>
                    <span><strong style="color: var(--secondary);">Mode:</strong> ${f.vehicle}</span>
                    <span><strong style="color: var(--secondary);">Time:</strong> ${f.duration}</span>
                </div>` : ''}
                <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.5rem;">Saved on: ${f.time || 'Unknown'}</p>
                <button class="btn btn-outline btn-remove-fav" data-id="${f.fromId}-${f.toId}" style="width: 100%; margin-top: auto;">Remove</button>
            </div>
        `).join('');

        document.querySelectorAll('.btn-remove-fav').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const [fromId, toId] = id.split('-');
                removeFavorite(fromId, toId);
                renderList();
            });
        });
    }

    renderList();
}

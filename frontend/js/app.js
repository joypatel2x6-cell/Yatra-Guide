import { fetchCities, getCityById } from './api.js';

import { renderHome } from './views/Home.js';
import { renderRoutePlanner, setupPlannerLogic } from './views/RoutePlanner.js';
import { renderMap } from './components/Map.js';
import { renderAbout } from './views/About.js';
import { renderContact } from './views/Contact.js';
import { renderFeedback, setupFeedbackLogic } from './views/Feedback.js';
import { renderSavedTrips, setupSavedTripsLogic } from './views/SavedTrips.js';
import { renderAIHub, setupAIHubLogic } from './views/AIHub.js';

let citiesData = [];
const appContainer = document.getElementById('app-container');

async function init() {
    citiesData = await fetchCities();
    setupNavigation();
    navigate('home');
}

function setupNavigation() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Handle clicking inner spans or svgs
            const currentLink = e.target.closest('a');
            if(!currentLink) return;

            document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
            currentLink.classList.add('active');
            
            const route = currentLink.getAttribute('data-route');
            navigate(route);
            
            const navLinks = document.querySelector('.nav-links');
            if(navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('active');
        });
    }
}

function navigate(route) {
    appContainer.innerHTML = '';
    
    switch(route) {
        case 'home':
            appContainer.innerHTML = renderHome();
            break;
        case 'planner':
            appContainer.innerHTML = renderRoutePlanner(citiesData);
            setupPlannerLogic(citiesData);
            break;
        case 'explorer':
            appContainer.innerHTML = renderMap(citiesData);
            setupExplorerLogic();
            break;
        case 'saved':
            appContainer.innerHTML = renderSavedTrips();
            setupSavedTripsLogic();
            break;
        case 'aihub':
            appContainer.innerHTML = renderAIHub(citiesData);
            setupAIHubLogic(citiesData);
            break;
        case 'about':
            appContainer.innerHTML = renderAbout();
            break;
        case 'feedback':
            appContainer.innerHTML = renderFeedback();
            setupFeedbackLogic();
            break;
        case 'contact':
            appContainer.innerHTML = renderContact();
            break;
        default:
            appContainer.innerHTML = renderHome();
    }
}

function generateCityRecHTML(city) {
    if (!city) return '';
    return `
        <div class="glass-panel" style="padding: 2rem;">
            <h3 style="color: var(--primary); font-size: 2rem;">${city.name}, ${city.state}</h3>
            <p><strong>Best Time to Visit:</strong> ${city.bestSeason}</p>
            
            <div class="recommendation-list" style="margin-top: 1.5rem;">
                <div class="rec-item glass-panel">
                    <h4>🏰 Top Attractions</h4>
                    <ul>
                        ${city.attractions.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                </div>
                <div class="rec-item glass-panel">
                    <h4>🍛 Famous Foods</h4>
                    <ul>
                        ${city.foods.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

function setupExplorerLogic() {
    const markers = document.querySelectorAll('.city-marker');
    markers.forEach(m => {
        m.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const city = citiesData.find(c => c.id === id);
            document.getElementById('explorerRecContent').innerHTML = generateCityRecHTML(city);
            
            // Highlight marker
            markers.forEach(mrk => mrk.style.fill = 'var(--primary)');
            e.target.style.fill = 'var(--secondary)';
            
            // Scroll to details
            document.getElementById('explorerRecContent').scrollIntoView({behavior: 'smooth'});
        });
    });
}

// Start app
init();

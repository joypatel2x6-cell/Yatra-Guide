import { calculateDistance, calculateTravelDetails } from '../utils/calculator.js';

// ─── Simulated ML Data ──────────────────────────────────────
const weatherPatterns = {
    delhi: { monsoon: [6, 7, 8, 9], winter: [11, 12, 1, 2], extremeHeat: [4, 5, 6], avgTemp: { winter: 14, summer: 42, monsoon: 34 } },
    mumbai: { monsoon: [6, 7, 8, 9], winter: [11, 12, 1, 2], extremeHeat: [3, 4, 5], avgTemp: { winter: 25, summer: 35, monsoon: 29 } },
    bengaluru: { monsoon: [6, 7, 8, 9, 10], winter: [11, 12, 1], extremeHeat: [3, 4, 5], avgTemp: { winter: 20, summer: 34, monsoon: 24 } },
    chennai: { monsoon: [10, 11, 12], winter: [12, 1, 2], extremeHeat: [4, 5, 6], avgTemp: { winter: 24, summer: 40, monsoon: 28 } },
    kolkata: { monsoon: [6, 7, 8, 9], winter: [11, 12, 1, 2], extremeHeat: [4, 5, 6], avgTemp: { winter: 16, summer: 38, monsoon: 31 } },
    jaipur: { monsoon: [7, 8, 9], winter: [11, 12, 1, 2], extremeHeat: [4, 5, 6], avgTemp: { winter: 12, summer: 44, monsoon: 32 } },
    hyderabad: { monsoon: [6, 7, 8, 9], winter: [11, 12, 1, 2], extremeHeat: [3, 4, 5], avgTemp: { winter: 18, summer: 40, monsoon: 28 } },
    goa: { monsoon: [6, 7, 8, 9], winter: [11, 12, 1, 2], extremeHeat: [4, 5], avgTemp: { winter: 24, summer: 34, monsoon: 27 } },
    shimla: { monsoon: [7, 8, 9], winter: [11, 12, 1, 2, 3], extremeHeat: [], avgTemp: { winter: 2, summer: 25, monsoon: 18 } },
    srinagar: { monsoon: [7, 8], winter: [11, 12, 1, 2, 3], extremeHeat: [], avgTemp: { winter: -2, summer: 30, monsoon: 22 } },
    varanasi: { monsoon: [7, 8, 9], winter: [11, 12, 1, 2], extremeHeat: [4, 5, 6], avgTemp: { winter: 12, summer: 44, monsoon: 32 } },
    kochi: { monsoon: [6, 7, 8, 9], winter: [12, 1, 2], extremeHeat: [3, 4, 5], avgTemp: { winter: 26, summer: 33, monsoon: 26 } },
    pune: { monsoon: [6, 7, 8, 9], winter: [11, 12, 1, 2], extremeHeat: [3, 4, 5], avgTemp: { winter: 18, summer: 38, monsoon: 26 } },
    ahmedabad: { monsoon: [7, 8, 9], winter: [11, 12, 1, 2], extremeHeat: [4, 5, 6], avgTemp: { winter: 16, summer: 44, monsoon: 30 } },
    guwahati: { monsoon: [6, 7, 8, 9], winter: [11, 12, 1, 2], extremeHeat: [4, 5], avgTemp: { winter: 14, summer: 34, monsoon: 28 } },
};

const itineraryTemplates = {
    cultural: [
        { time: '8:00 AM', activity: 'Visit the main historical monument', icon: '🏛️' },
        { time: '10:30 AM', activity: 'Explore the local museum or gallery', icon: '🖼️' },
        { time: '1:00 PM', activity: 'Traditional lunch at a local dhaba', icon: '🍛' },
        { time: '3:00 PM', activity: 'Walking tour of the old city quarter', icon: '🚶' },
        { time: '5:00 PM', activity: 'Visit a local temple or religious site', icon: '🛕' },
        { time: '7:30 PM', activity: 'Evening Aarti or cultural show', icon: '🪔' },
        { time: '9:00 PM', activity: 'Dinner featuring regional cuisine', icon: '🍽️' },
    ],
    adventure: [
        { time: '6:00 AM', activity: 'Sunrise trek or nature walk', icon: '🌅' },
        { time: '9:00 AM', activity: 'Breakfast at a hilltop cafe', icon: '☕' },
        { time: '11:00 AM', activity: 'Adventure sport or kayaking', icon: '🛶' },
        { time: '1:30 PM', activity: 'Picnic lunch at a scenic viewpoint', icon: '🧺' },
        { time: '3:30 PM', activity: 'Visit a waterfall or natural reserve', icon: '🌊' },
        { time: '6:00 PM', activity: 'Sunset photography session', icon: '📸' },
        { time: '8:00 PM', activity: 'Bonfire dinner under the stars', icon: '🔥' },
    ],
    relaxation: [
        { time: '9:00 AM', activity: 'Late breakfast at your hotel', icon: '🥐' },
        { time: '11:00 AM', activity: 'Spa or Ayurvedic massage session', icon: '💆' },
        { time: '1:00 PM', activity: 'Lunch at a waterfront restaurant', icon: '🍜' },
        { time: '3:00 PM', activity: 'Leisurely boat ride or beach walk', icon: '🚤' },
        { time: '5:00 PM', activity: 'Shopping for local handicrafts', icon: '🛍️' },
        { time: '7:00 PM', activity: 'Yoga or meditation session', icon: '🧘' },
        { time: '8:30 PM', activity: 'Fine dining with local flavours', icon: '🥘' },
    ],
};

// ─── ML-like Helper Functions ───────────────────────────────
function predictWeatherRisk(cityId, month) {
    const pattern = weatherPatterns[cityId] || weatherPatterns['delhi'];
    const m = month + 1; // JS months are 0-indexed
    const isMonsoon = pattern.monsoon.includes(m);
    const isExtremeHeat = pattern.extremeHeat.includes(m);
    const isWinter = pattern.winter.includes(m);

    let rainProb = isMonsoon ? 60 + Math.floor(Math.random() * 30) : 5 + Math.floor(Math.random() * 20);
    let heatRisk = isExtremeHeat ? 70 + Math.floor(Math.random() * 25) : isWinter ? 0 : 20 + Math.floor(Math.random() * 20);
    let travelScore = 100;
    if (isMonsoon) travelScore -= 35;
    if (isExtremeHeat) travelScore -= 30;
    if (isWinter && !isExtremeHeat) travelScore += 10;
    travelScore = Math.max(20, Math.min(100, travelScore + Math.floor(Math.random() * 10) - 5));

    let season = isWinter ? 'winter' : isMonsoon ? 'monsoon' : 'summer';
    let temp = pattern.avgTemp[season] || 28;

    return { rainProb, heatRisk, travelScore, temp, isMonsoon, isExtremeHeat, isWinter };
}

function generateItinerary(city, style, days) {
    const template = itineraryTemplates[style] || itineraryTemplates.cultural;
    const result = [];
    for (let d = 1; d <= days; d++) {
        const dayActivities = template.map(item => {
            let activity = item.activity;
            // Personalize with city data
            if (d === 1 && city.attractions.length > 0) {
                activity = activity.replace('main historical monument', city.attractions[0]);
            }
            if (activity.includes('regional cuisine') && city.foods.length > 0) {
                activity = activity.replace('regional cuisine', city.foods.slice(0, 2).join(' & '));
            }
            return { ...item, activity };
        });
        result.push({ day: d, activities: dayActivities });
    }
    return result;
}

function predictPricing(city, month) {
    // Simulate seasonal price fluctuations
    const pattern = weatherPatterns[city.id] || weatherPatterns['delhi'];
    const m = month + 1;
    const isPeak = pattern.winter.includes(m);
    const isOff = pattern.monsoon.includes(m);

    const baseHotel = 3000 + Math.floor(Math.random() * 2000);
    const baseFlight = 4000 + Math.floor(Math.random() * 3000);

    let hotelMultiplier = isPeak ? 1.6 : isOff ? 0.7 : 1.0;
    let flightMultiplier = isPeak ? 1.8 : isOff ? 0.6 : 1.0;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const forecast = [];
    for (let i = 0; i < 6; i++) {
        const futureMonth = (month + i) % 12;
        const fm = futureMonth + 1;
        const fPeak = pattern.winter.includes(fm);
        const fOff = pattern.monsoon.includes(fm);
        const hMul = fPeak ? 1.5 + Math.random() * 0.3 : fOff ? 0.6 + Math.random() * 0.2 : 0.9 + Math.random() * 0.3;
        const fMul = fPeak ? 1.6 + Math.random() * 0.4 : fOff ? 0.5 + Math.random() * 0.2 : 0.8 + Math.random() * 0.3;
        forecast.push({
            month: months[futureMonth],
            hotel: Math.round(baseHotel * hMul),
            flight: Math.round(baseFlight * fMul),
        });
    }

    const cheapestMonth = forecast.reduce((prev, curr) => (prev.hotel + prev.flight) < (curr.hotel + curr.flight) ? prev : curr);

    return {
        currentHotel: Math.round(baseHotel * hotelMultiplier),
        currentFlight: Math.round(baseFlight * flightMultiplier),
        forecast,
        cheapestMonth,
        isPeak, isOff
    };
}

// ─── Render ─────────────────────────────────────────────────
export function renderAIHub(cities) {
    const cityOptions = cities.map(c => `<option value="${c.id}">${c.name}, ${c.state}</option>`).join('');

    return `
        <div class="view-section active" style="padding-bottom: 6rem;">
            <div style="text-align: center; margin-bottom: 3rem;">
                <div class="section-label" style="background: linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.15)); color: #a855f7;">AI-Powered</div>
                <h2 style="margin-top: 0.75rem;">
                    <span style="background: linear-gradient(135deg, #a855f7, #ec4899); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">Intelligent Travel Assistant</span>
                </h2>
                <p style="color: var(--text-muted); max-width: 600px; margin: 0.75rem auto 0;">
                    Real-time weather prediction, smart itinerary generation, and dynamic pricing — all computed locally using ML algorithms.
                </p>
            </div>

            <!-- ──────── Module 1: Weather & Travel Score ──────── -->
            <div class="glass-panel" style="padding: 2rem; margin-bottom: 2rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
                    <div style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #6366f1, #a855f7); display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">🌦️</div>
                    <div>
                        <h3 style="margin: 0; font-size: 1.2rem;">AI Weather & Travel Score Predictor</h3>
                        <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">Predicts monsoon risk, heat index, and optimal travel windows using seasonal pattern analysis.</p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 1rem; align-items: end;">
                    <div class="form-group" style="margin-bottom: 0;">
                        <label for="aiWeatherCity">Destination</label>
                        <select id="aiWeatherCity"><option value="">Choose city…</option>${cityOptions}</select>
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label for="aiWeatherMonth">Travel Month</label>
                        <select id="aiWeatherMonth">
                            <option value="0">January</option><option value="1">February</option><option value="2">March</option>
                            <option value="3">April</option><option value="4">May</option><option value="5" selected>June</option>
                            <option value="6">July</option><option value="7">August</option><option value="8">September</option>
                            <option value="9">October</option><option value="10">November</option><option value="11">December</option>
                        </select>
                    </div>
                    <button class="btn" id="btnRunWeather" style="height: 48px;">Predict</button>
                </div>
                <div id="weatherResult" style="margin-top: 1.5rem;"></div>
            </div>

            <!-- ──────── Module 2: Smart Itinerary ──────── -->
            <div class="glass-panel" style="padding: 2rem; margin-bottom: 2rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
                    <div style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #ec4899, #f43f5e); display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">🤖</div>
                    <div>
                        <h3 style="margin: 0; font-size: 1.2rem;">Smart Itinerary Generator</h3>
                        <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">Generates a day-by-day travel plan personalized to your city and travel style using AI templates.</p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr 80px auto; gap: 1rem; align-items: end;">
                    <div class="form-group" style="margin-bottom: 0;">
                        <label for="aiItinCity">City</label>
                        <select id="aiItinCity"><option value="">Choose city…</option>${cityOptions}</select>
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label for="aiItinStyle">Travel Style</label>
                        <select id="aiItinStyle">
                            <option value="cultural">🏛️ Cultural</option>
                            <option value="adventure">⛰️ Adventure</option>
                            <option value="relaxation">🧘 Relaxation</option>
                        </select>
                    </div>
                    <div class="form-group" style="margin-bottom: 0;">
                        <label for="aiItinDays">Days</label>
                        <select id="aiItinDays">
                            <option value="1">1</option><option value="2">2</option><option value="3" selected>3</option><option value="5">5</option><option value="7">7</option>
                        </select>
                    </div>
                    <button class="btn" id="btnGenItinerary" style="height: 48px;">Generate</button>
                </div>
                <div id="itineraryResult" style="margin-top: 1.5rem;"></div>
            </div>

            <!-- ──────── Module 3: Pricing Predictor ──────── -->
            <div class="glass-panel" style="padding: 2rem; margin-bottom: 2rem;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem;">
                    <div style="width: 44px; height: 44px; border-radius: 12px; background: linear-gradient(135deg, #22c55e, #14b8a6); display: flex; align-items: center; justify-content: center; font-size: 1.4rem;">📊</div>
                    <div>
                        <h3 style="margin: 0; font-size: 1.2rem;">Dynamic Pricing Predictor</h3>
                        <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">Forecasts hotel & flight prices for the next 6 months using seasonal regression analysis.</p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr auto; gap: 1rem; align-items: end;">
                    <div class="form-group" style="margin-bottom: 0;">
                        <label for="aiPriceCity">Destination</label>
                        <select id="aiPriceCity"><option value="">Choose city…</option>${cityOptions}</select>
                    </div>
                    <button class="btn" id="btnRunPricing" style="height: 48px;">Forecast</button>
                </div>
                <div id="pricingResult" style="margin-top: 1.5rem;"></div>
            </div>
        </div>
    `;
}

export function setupAIHubLogic(cities) {
    // ─── Weather Predictor ──────────────────────────────────
    const btnWeather = document.getElementById('btnRunWeather');
    if (btnWeather) {
        btnWeather.addEventListener('click', () => {
            const cityId = document.getElementById('aiWeatherCity').value;
            const month = parseInt(document.getElementById('aiWeatherMonth').value);
            if (!cityId) { alert('Please select a city.'); return; }

            const city = cities.find(c => c.id === cityId);
            btnWeather.textContent = 'Analyzing…';
            btnWeather.disabled = true;

            setTimeout(() => {
                const pred = predictWeatherRisk(cityId, month);
                const scoreColor = pred.travelScore >= 70 ? '#22c55e' : pred.travelScore >= 45 ? '#f59e0b' : '#ef4444';
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

                document.getElementById('weatherResult').innerHTML = `
                    <div style="animation: fadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);">
                        
                        <div style="display: flex; flex-direction: column; gap: 1.5rem; margin-bottom: 1.5rem;">
                            
                            <!-- Main Score Card -->
                            <div class="glass-panel" style="padding: 2.5rem 2rem; text-align: center; border: 1px solid ${scoreColor}55; background: linear-gradient(145deg, ${scoreColor}15, rgba(0,0,0,0)); box-shadow: 0 10px 40px ${scoreColor}22; position: relative; overflow: hidden; border-radius: 20px;">
                                <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, ${scoreColor}25 0%, transparent 60%); opacity: 0.6; z-index: 0; pointer-events: none;"></div>
                                <div style="position: relative; z-index: 1;">
                                    <div style="font-size: 1rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 3px; margin-bottom: 0.8rem; font-family: 'Outfit', sans-serif; font-weight: 600;">Overall AI Travel Score</div>
                                    <div style="font-size: 5rem; font-weight: 900; font-family: 'Outfit', sans-serif; color: ${scoreColor}; line-height: 1; text-shadow: 0 0 30px ${scoreColor}55;">
                                        ${pred.travelScore}<span style="font-size: 2.2rem; color: var(--text-muted); opacity: 0.4;">/100</span>
                                    </div>
                                    <div style="margin-top: 1.5rem; font-size: 1.2rem; color: var(--text-main); font-weight: 500; background: ${scoreColor}15; display: inline-block; padding: 0.5rem 1.5rem; border-radius: 30px; border: 1px solid ${scoreColor}33;">
                                        ${pred.travelScore >= 70 ? '🎯 Excellent Conditions' : pred.travelScore >= 45 ? '⚖️ Moderate Conditions' : '⚠️ Poor Conditions'}
                                    </div>
                                </div>
                            </div>

                            <!-- Sub Metrics Grid -->
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;">
                                <div class="glass-panel" style="padding: 1.5rem; text-align: center; transition: transform 0.2s;">
                                    <div style="font-size: 1.8rem; margin-bottom: 0.5rem; filter: drop-shadow(0 2px 4px rgba(59,130,246,0.3));">🌧️</div>
                                    <div style="font-size: 2rem; font-weight: 800; font-family: 'Outfit', sans-serif; color: #3b82f6;">${pred.rainProb}%</div>
                                    <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-top: 0.25rem;">Rain Chance</div>
                                </div>
                                <div class="glass-panel" style="padding: 1.5rem; text-align: center; transition: transform 0.2s;">
                                    <div style="font-size: 1.8rem; margin-bottom: 0.5rem; filter: drop-shadow(0 2px 4px rgba(245,158,11,0.3));">🌡️</div>
                                    <div style="font-size: 2rem; font-weight: 800; font-family: 'Outfit', sans-serif; color: #f59e0b;">${pred.temp}°C</div>
                                    <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-top: 0.25rem;">Avg Temp</div>
                                </div>
                                <div class="glass-panel" style="padding: 1.5rem; text-align: center; transition: transform 0.2s;">
                                    <div style="font-size: 1.8rem; margin-bottom: 0.5rem; filter: drop-shadow(0 2px 4px rgba(239,68,68,0.3));">☀️</div>
                                    <div style="font-size: 2rem; font-weight: 800; font-family: 'Outfit', sans-serif; color: #ef4444;">${pred.heatRisk}%</div>
                                    <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-top: 0.25rem;">Heat Risk</div>
                                </div>
                            </div>
                        </div>

                        <div style="padding: 1.5rem; border-left: 4px solid ${scoreColor}; background: ${scoreColor}11; border-radius: 12px; font-size: 1.05rem; line-height: 1.6; position: relative; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                            <div style="position: absolute; top: 0; right: 0; opacity: 0.05; font-size: 8rem; line-height: 1; transform: translate(15%, -15%); pointer-events: none;">🤖</div>
                            <strong style="color: ${scoreColor}; display: block; margin-bottom: 0.5rem; font-family: 'Outfit', sans-serif; font-size: 1.15rem;">AI Recommendation for ${city.name} in ${months[month]}:</strong>
                            ${pred.travelScore >= 70
                        ? `<span style="color: var(--text-main);">This is an <strong>excellent</strong> time to visit! Pack light clothes, keep your camera ready, and enjoy the ideal weather.</span>`
                        : pred.travelScore >= 45
                            ? `<span style="color: var(--text-main);">Conditions are <strong>average</strong>. ${pred.isMonsoon ? 'Carry rain gear and waterproof bags just in case.' : 'Stay hydrated and avoid the midday sun if possible.'}</span>`
                            : `<span style="color: var(--text-main);">Conditions are <strong>not ideal</strong>. ${pred.isMonsoon ? 'Heavy monsoon is expected — roads may flood and outdoor activities might be ruined.' : 'Extreme heat advisory in effect.'} Consider visiting during ${city.bestSeason} instead.</span>`
                    }
                        </div>
                    </div>
                `;
                btnWeather.textContent = 'Predict';
                btnWeather.disabled = false;
            }, 700);
        });
    }

    // ─── Itinerary Generator ────────────────────────────────
    const btnItin = document.getElementById('btnGenItinerary');
    if (btnItin) {
        btnItin.addEventListener('click', () => {
            const cityId = document.getElementById('aiItinCity').value;
            const style = document.getElementById('aiItinStyle').value;
            const days = parseInt(document.getElementById('aiItinDays').value);
            if (!cityId) { alert('Please select a city.'); return; }

            const city = cities.find(c => c.id === cityId);
            btnItin.textContent = 'Generating…';
            btnItin.disabled = true;

            setTimeout(() => {
                const itinerary = generateItinerary(city, style, days);
                const styleLabel = style === 'cultural' ? '🏛️ Cultural' : style === 'adventure' ? '⛰️ Adventure' : '🧘 Relaxation';

                let html = `<div style="animation: fadeIn 0.4s ease-out;">`;
                html += `<div style="margin-bottom: 1rem; padding: 1rem; background: rgba(236,72,153,0.08); border-radius: 8px; border-left: 4px solid #ec4899;">
                    <strong style="color: #ec4899;">${styleLabel} Itinerary for ${city.name}</strong>
                    <span style="color: var(--text-muted); font-size: 0.85rem;"> — ${days} day${days > 1 ? 's' : ''}</span>
                </div>`;

                itinerary.forEach(day => {
                    html += `<div style="margin-bottom: 1.5rem;">
                        <h4 style="color: var(--primary); margin-bottom: 0.75rem;">Day ${day.day}</h4>
                        <div style="display: flex; flex-direction: column; gap: 0.5rem; border-left: 2px solid var(--glass-border); padding-left: 1rem; margin-left: 0.5rem;">`;

                    day.activities.forEach(act => {
                        html += `<div style="display: flex; gap: 0.75rem; align-items: center; padding: 0.5rem 0;">
                            <span style="font-size: 1.3rem;">${act.icon}</span>
                            <div>
                                <strong style="font-size: 0.85rem; color: var(--primary);">${act.time}</strong>
                                <span style="color: var(--text-muted); font-size: 0.9rem;"> — ${act.activity}</span>
                            </div>
                        </div>`;
                    });

                    html += `</div></div>`;
                });
                html += `</div>`;

                document.getElementById('itineraryResult').innerHTML = html;
                btnItin.textContent = 'Generate';
                btnItin.disabled = false;
            }, 1000);
        });
    }

    // ─── Pricing Predictor ──────────────────────────────────
    const btnPrice = document.getElementById('btnRunPricing');
    if (btnPrice) {
        btnPrice.addEventListener('click', () => {
            const cityId = document.getElementById('aiPriceCity').value;
            if (!cityId) { alert('Please select a city.'); return; }

            const city = cities.find(c => c.id === cityId);
            btnPrice.textContent = 'Computing…';
            btnPrice.disabled = true;

            setTimeout(() => {
                const now = new Date();
                const pricing = predictPricing(city, now.getMonth());

                // Build a simple bar chart
                const maxPrice = Math.max(...pricing.forecast.map(f => f.hotel + f.flight));
                const bars = pricing.forecast.map(f => {
                    const total = f.hotel + f.flight;
                    const pct = Math.round((total / maxPrice) * 100);
                    const isCheapest = f.month === pricing.cheapestMonth.month;
                    const barColor = isCheapest ? '#22c55e' : 'var(--primary)';
                    return `
                        <div style="display: flex; flex-direction: column; align-items: center; gap: 0.25rem; flex: 1;">
                            <div style="font-size: 0.7rem; color: var(--text-muted); font-weight: 600;">₹${(total / 1000).toFixed(1)}k</div>
                            <div style="width: 100%; max-width: 50px; height: ${pct}px; background: ${barColor}; border-radius: 6px 6px 0 0; transition: height 0.5s ease; position: relative;">
                                ${isCheapest ? '<div style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 0.9rem;">💰</div>' : ''}
                            </div>
                            <div style="font-size: 0.75rem; font-weight: 600; color: ${isCheapest ? '#22c55e' : 'var(--text-muted)'};">${f.month}</div>
                        </div>
                    `;
                }).join('');

                document.getElementById('pricingResult').innerHTML = `
                    <div style="animation: fadeIn 0.4s ease-out;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                            <div class="glass-panel" style="padding: 1.2rem; text-align: center;">
                                <div style="font-size: 1.6rem; font-weight: 800; font-family: 'Poppins'; color: var(--primary);">₹${pricing.currentHotel.toLocaleString()}</div>
                                <div style="font-size: 0.8rem; color: var(--text-muted);">Hotel / Night (Now)</div>
                            </div>
                            <div class="glass-panel" style="padding: 1.2rem; text-align: center;">
                                <div style="font-size: 1.6rem; font-weight: 800; font-family: 'Poppins'; color: var(--secondary);">₹${pricing.currentFlight.toLocaleString()}</div>
                                <div style="font-size: 0.8rem; color: var(--text-muted);">Flight (Now)</div>
                            </div>
                            <div class="glass-panel" style="padding: 1.2rem; text-align: center;">
                                <div style="font-size: 1.6rem; font-weight: 800; font-family: 'Poppins'; color: #22c55e;">₹${(pricing.cheapestMonth.hotel + pricing.cheapestMonth.flight).toLocaleString()}</div>
                                <div style="font-size: 0.8rem; color: var(--text-muted);">Best in ${pricing.cheapestMonth.month}</div>
                            </div>
                        </div>

                        <div style="padding: 1.5rem; background: var(--bg-2); border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
                            <h4 style="margin-bottom: 1rem; font-size: 0.95rem; color: var(--text-muted);">6-Month Price Forecast (Hotel + Flight)</h4>
                            <div style="display: flex; align-items: flex-end; gap: 0.75rem; height: 120px; padding-top: 1rem;">
                                ${bars}
                            </div>
                        </div>

                        <div style="padding: 1rem; border-left: 4px solid #22c55e; background: rgba(34,197,94,0.08); border-radius: 8px;">
                            <strong style="color: #22c55e;">💡 AI Insight:</strong>
                            <span style="color: var(--text-muted);">
                                ${pricing.isPeak
                        ? `It's currently <strong>peak season</strong> for ${city.name}. Prices are elevated. Best to book in <strong>${pricing.cheapestMonth.month}</strong> to save up to ₹${((pricing.currentHotel + pricing.currentFlight) - (pricing.cheapestMonth.hotel + pricing.cheapestMonth.flight)).toLocaleString()}.`
                        : pricing.isOff
                            ? `It's currently <strong>off-season</strong> for ${city.name} — great deals available! Book now for maximum savings.`
                            : `Prices for ${city.name} are moderate right now. The cheapest window is <strong>${pricing.cheapestMonth.month}</strong>.`
                    }
                            </span>
                        </div>
                    </div>
                `;
                btnPrice.textContent = 'Forecast';
                btnPrice.disabled = false;
            }, 900);
        });
    }
}

export function renderHome() {
    const topCities = [
        { id: "delhi", name: "New Delhi", state: "Delhi", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=400&auto=format&fit=crop" },
        { id: "agra", name: "Agra", state: "Uttar Pradesh", img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=400&auto=format&fit=crop" },
        { id: "jaipur", name: "Jaipur", state: "Rajasthan", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=400&auto=format&fit=crop" }
    ];

    const popularDestinations = [
        { id: "goa", name: "Goa", state: "Goa", season: "Nov - Feb", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop" },
        { id: "srinagar", name: "Srinagar", state: "Jammu & Kashmir", season: "Apr - Oct", img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=600&auto=format&fit=crop" },
        { id: "jaipur", name: "Jaipur", state: "Rajasthan", season: "Oct - Mar", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=600&auto=format&fit=crop" },
        { id: "kochi", name: "Kochi", state: "Kerala", season: "Sep - Mar", img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=600&auto=format&fit=crop" },
        { id: "manali", name: "Manali", state: "Himachal Pradesh", season: "Oct - Jun", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600&auto=format&fit=crop" },
        { id: "agra", name: "Agra", state: "Uttar Pradesh", season: "Nov - Feb", img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600&auto=format&fit=crop" }
    ];

    const cardsHTML = topCities.map(c => `
        <div class="custom-home-card" onclick="document.querySelector('[data-route=planner]').click()">
            <img class="custom-home-card-img" src="${c.img}" alt="${c.name}">
            <div class="custom-home-card-info">
                <h5>${c.name}</h5>
                <p>${c.state}</p>
            </div>
        </div>
    `).join('');

    const destGridHTML = popularDestinations.map(d => `
        <div class="custom-dest-card" onclick="navigate('explorer', { city: '${d.id}' })">
            <img class="custom-dest-img" src="${d.img}" alt="${d.name}">
            <div class="custom-dest-info">
                <h4>${d.name}</h4>
                <p>${d.state} • Best: ${d.season}</p>
            </div>
        </div>
    `).join('');

    return `
        <div class="custom-home-container view-section active">
            <!-- Animated Header Logo and Name -->
            <div class="custom-brand-logo">
                <div class="custom-brand-logo-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="#fff" stroke-width="2" stroke-dasharray="4 2"/>
                        <path d="M12 4 L14.5 10.5 L21 12 L14.5 13.5 L12 20 L9.5 13.5 L3 12 L9.5 10.5 Z" fill="#fff"/>
                        <circle cx="12" cy="12" r="2.5" fill="#fff" opacity="0.9"/>
                    </svg>
                </div>
                <div class="custom-brand-logo-words">
                    <div class="custom-brand-logo-text">Yatra <span>Guide</span></div>
                    <div class="custom-brand-logo-tagline">Your India Travel Companion</div>
                </div>
            </div>

            <!-- Hero Section -->
            <div class="custom-home-hero">
                <div class="custom-home-left">
                    <h1 class="custom-home-title">Explore India<br>Outside The Book</h1>
                    <p class="custom-home-desc">To get the best of your adventure in India, you just need to leave and come where you explore diversity. We are waiting for you.</p>
                    <button class="custom-home-btn" onclick="document.querySelector('[data-route=planner]').click()">Explore</button>
                    
                    <div class="custom-home-cards-section">
                        <div class="custom-home-cards">
                            ${cardsHTML}
                        </div>
                    </div>
                </div>
                <div class="custom-home-right">
                    <img class="custom-home-illustration" src="assets/india_travel_hero.png" alt="Explore India">
                </div>
            </div>

            <!-- Popular Destinations Section (Scroll-Reveal) -->
            <section class="custom-home-section scroll-reveal">
                <h2 class="custom-section-title">Popular Destinations</h2>
                <p class="custom-section-subtitle">Handpicked locations with outstanding culture, sights, and local delicacies.</p>
                <div class="custom-dest-grid">
                    ${destGridHTML}
                </div>
            </section>

            <!-- Why Choose Yatra Guide Section (Scroll-Reveal) -->
            <section class="custom-home-section scroll-reveal">
                <h2 class="custom-section-title">Why Choose Yatra Guide</h2>
                <p class="custom-section-subtitle">Built with reliable local algorithms to solve real travel planning needs offline.</p>
                <div class="custom-features-grid">
                    <div class="custom-feature-card">
                        <div class="custom-feature-icon">🗺️</div>
                        <div class="custom-feature-info">
                            <h4>Offline Route Planner</h4>
                            <p>Calculate accurate paths and coordinates between 15+ major cities using local Haversine equations without any internet connection.</p>
                        </div>
                    </div>
                    <div class="custom-feature-card">
                        <div class="custom-feature-icon">💰</div>
                        <div class="custom-feature-info">
                            <h4>Transit Cost Estimator</h4>
                            <p>Compare travel costs and times across 5 transit modes (Bike, Car, Bus, Train, Flight) simultaneously in real-time.</p>
                        </div>
                    </div>
                    <div class="custom-feature-card">
                        <div class="custom-feature-icon">🔒</div>
                        <div class="custom-feature-info">
                            <h4>Local Privacy First</h4>
                            <p>All your searched routes, history, and favorite itineraries are saved strictly in your browser. No remote tracking, ever.</p>
                        </div>
                    </div>
                    <div class="custom-feature-card">
                        <div class="custom-feature-icon">🚑</div>
                        <div class="custom-feature-info">
                            <h4>Emergency Directory</h4>
                            <p>Quick access to hospital, police station, and support helplines for every city, helping you stay prepared on your journeys.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Traveller Reviews Section (Scroll-Reveal) -->
            <section class="custom-home-section scroll-reveal">
                <h2 class="custom-section-title">Traveller Reviews</h2>
                <p class="custom-section-subtitle">Read what other adventurers say about their offline journeys with us.</p>
                <div class="custom-reviews-grid">
                    <div class="custom-review-card">
                        <div>
                            <div class="custom-review-stars">★★★★★</div>
                            <p class="custom-review-text">"Yatra Guide was a lifesaver when my network died in Kashmir! The offline route estimator got us exactly where we needed to go."</p>
                        </div>
                        <div class="custom-review-author">— Amit S.</div>
                    </div>
                    <div class="custom-review-card">
                        <div>
                            <div class="custom-review-stars">★★★★★</div>
                            <p class="custom-review-text">"Being able to compare bus, train, and flight fares simultaneously saved us hours of planning and a lot of money."</p>
                        </div>
                        <div class="custom-review-author">— Priya K.</div>
                    </div>
                    <div class="custom-review-card">
                        <div>
                            <div class="custom-review-stars">★★★★½</div>
                            <p class="custom-review-text">"Highly recommend the offline itinerary generator. The emergency directory is a great peace-of-mind feature."</p>
                        </div>
                        <div class="custom-review-author">— Rahul M.</div>
                    </div>
                </div>
            </section>
        </div>
    `;
}

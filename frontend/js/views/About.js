export function renderAbout() {
    return `
        <div class="ab-page">

            <!-- ── Hero Banner ── -->
            <div class="ab-hero">
                <div class="ab-hero-bg-orbs">
                    <div class="ab-orb ab-orb-1"></div>
                    <div class="ab-orb ab-orb-2"></div>
                    <div class="ab-orb ab-orb-3"></div>
                </div>
                <div class="ab-hero-content scroll-reveal">
                    <span class="ab-badge">✦ About Yatra Guide</span>
                    <h1 class="ab-hero-title">Built for <span class="ab-gradient-text">Every</span><br>Indian Traveller</h1>
                    <p class="ab-hero-sub">An offline-first travel companion that works even without the internet — giving every traveller in India the tools they deserve.</p>
                    <div class="ab-hero-stats">
                        <div class="ab-stat-pill"><strong>15+</strong> Cities</div>
                        <div class="ab-stat-pill"><strong>5</strong> Transport Modes</div>
                        <div class="ab-stat-pill"><strong>100%</strong> Offline</div>
                        <div class="ab-stat-pill"><strong>Zero</strong> Tracking</div>
                    </div>
                </div>
            </div>

            <!-- ── Mission ── -->
            <section class="ab-section scroll-reveal">
                <div class="ab-section-inner ab-mission">
                    <div class="ab-mission-text">
                        <span class="ab-section-tag">🎯 Our Mission</span>
                        <h2>Travel without boundaries,<br><em>plan without limits</em></h2>
                        <p>Yatra Guide was born from a simple belief — powerful travel planning should never depend on a Wi-Fi signal. Using the <strong>Haversine formula</strong> and calibrated local cost models, we compute exact distances and multi-modal transport costs right inside your browser. No servers. No data leaks. Just you and the road ahead.</p>
                        <p>From the snow-capped peaks of Manali to the sun-drenched shores of Goa, we want every journey to start with confidence.</p>
                    </div>
                    <div class="ab-mission-visual">
                        <div class="ab-map-globe">
                            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="ab-globe-svg">
                                <circle cx="100" cy="100" r="90" stroke="url(#g1)" stroke-width="2" stroke-dasharray="6 4" opacity="0.6"/>
                                <circle cx="100" cy="100" r="70" stroke="url(#g1)" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.4"/>
                                <circle cx="100" cy="100" r="50" fill="url(#g2)" opacity="0.15"/>
                                <path d="M100 20 L111 55 L148 55 L118 76 L129 111 L100 90 L71 111 L82 76 L52 55 L89 55 Z" fill="url(#g1)" opacity="0.9"/>
                                <circle cx="100" cy="100" r="8" fill="#fff" opacity="0.9"/>
                                <defs>
                                    <linearGradient id="g1" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#8B2613"/>
                                        <stop offset="0.5" stop-color="#F97316"/>
                                        <stop offset="1" stop-color="#F59E0B"/>
                                    </linearGradient>
                                    <radialGradient id="g2" cx="50%" cy="50%" r="50%">
                                        <stop stop-color="#F97316"/>
                                        <stop offset="1" stop-color="#8B2613" stop-opacity="0"/>
                                    </radialGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ── Feature Cards ── -->
            <section class="ab-section scroll-reveal">
                <div class="ab-section-header">
                    <span class="ab-section-tag">✨ What We Offer</span>
                    <h2>Everything you need,<br>nothing you don't</h2>
                </div>
                <div class="ab-features">
                    <div class="ab-feat-card ab-feat-1">
                        <div class="ab-feat-icon">🗺️</div>
                        <h3>Offline Route Planner</h3>
                        <p>Accurate Haversine-based distances between 15+ major cities — no internet needed, ever.</p>
                        <div class="ab-feat-bar"></div>
                    </div>
                    <div class="ab-feat-card ab-feat-2">
                        <div class="ab-feat-icon">💰</div>
                        <h3>Cost Estimator</h3>
                        <p>Compare Bike, Car, Bus, Train & Flight costs simultaneously with calibrated Indian averages.</p>
                        <div class="ab-feat-bar"></div>
                    </div>
                    <div class="ab-feat-card ab-feat-3">
                        <div class="ab-feat-icon">🧠</div>
                        <h3>AI Travel Assistant</h3>
                        <p>Ask anything about India travel — our Gemini-powered AI gives instant expert answers.</p>
                        <div class="ab-feat-bar"></div>
                    </div>
                    <div class="ab-feat-card ab-feat-4">
                        <div class="ab-feat-icon">🚨</div>
                        <h3>Emergency Directory</h3>
                        <p>Instant access to hospitals, police stations & helplines for every city — always ready.</p>
                        <div class="ab-feat-bar"></div>
                    </div>
                    <div class="ab-feat-card ab-feat-5">
                        <div class="ab-feat-icon">🌦️</div>
                        <h3>Weather Intelligence</h3>
                        <p>Seasonal travel scores and monsoon/winter predictions computed locally in your browser.</p>
                        <div class="ab-feat-bar"></div>
                    </div>
                    <div class="ab-feat-card ab-feat-6">
                        <div class="ab-feat-icon">🔒</div>
                        <h3>Privacy First</h3>
                        <p>All your routes, history and saved trips stay in your browser. Zero telemetry, zero ads.</p>
                        <div class="ab-feat-bar"></div>
                    </div>
                </div>
            </section>

            <!-- ── How It Works Timeline ── -->
            <section class="ab-section scroll-reveal">
                <div class="ab-section-header">
                    <span class="ab-section-tag">⚙️ How It Works</span>
                    <h2>Smart tech, simple experience</h2>
                </div>
                <div class="ab-timeline">
                    <div class="ab-tl-item">
                        <div class="ab-tl-dot">1</div>
                        <div class="ab-tl-content">
                            <h4>Pick Your Cities</h4>
                            <p>Select any two of 15+ Indian cities from our route planner dashboard.</p>
                        </div>
                    </div>
                    <div class="ab-tl-item">
                        <div class="ab-tl-dot">2</div>
                        <div class="ab-tl-content">
                            <h4>Haversine Calculation</h4>
                            <p>We compute the great-circle distance using the Haversine formula — accurate to within 1%.</p>
                        </div>
                    </div>
                    <div class="ab-tl-item">
                        <div class="ab-tl-dot">3</div>
                        <div class="ab-tl-content">
                            <h4>Multi-Mode Cost Breakdown</h4>
                            <p>Each transport mode (Bike/Car/Bus/Train/Flight) applies its own cost-per-km and speed factor.</p>
                        </div>
                    </div>
                    <div class="ab-tl-item">
                        <div class="ab-tl-dot">4</div>
                        <div class="ab-tl-content">
                            <h4>AI Score & Recommendation</h4>
                            <p>A composite travel score factors in weather, price trends, and travel time — all offline.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ── Footer CTA ── -->
            <section class="ab-footer-cta scroll-reveal">
                <div class="ab-cta-inner">
                    <div class="ab-cta-orb"></div>
                    <span class="ab-section-tag">🇮🇳 Made for India</span>
                    <h2>Built with <span class="ab-heart">❤️</span> for every traveller</h2>
                    <p>No external APIs. No tracking. Everything runs in your browser.<br>Open source, forever free.</p>
                    <div class="ab-cta-btns">
                        <button class="ab-cta-btn-primary" onclick="navigate('explorer')">Explore Cities</button>
                        <button class="ab-cta-btn-ghost" onclick="navigate('planner')">Plan a Trip</button>
                    </div>
                    <p class="ab-copy">© 2026 Yatra Guide</p>
                </div>
            </section>

        </div>
    `;
}

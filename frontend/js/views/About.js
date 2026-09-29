export function renderAbout() {
    return `
        <div class="view-section active">
        <div class="ab-page">

        <!-- Hero Banner -->
        <div class="ab-hero">
            <div class="ab-hero-bg-orbs">
                <div class="ab-orb ab-orb-1"></div>
                <div class="ab-orb ab-orb-2"></div>
                <div class="ab-orb ab-orb-3"></div>
            </div>
            <div class="ab-hero-content">
                <span class="ab-badge">✦ The Yatra Guide Story</span>
                <h1 class="ab-hero-title">Engineering Seamless Journeys Across <span class="ab-gradient-text">India</span></h1>
                <p class="ab-hero-sub">An offline-first, privacy-focused travel intelligence platform calibrated specifically for Indian highways, railways, and flight corridors. Zero tracking, zero external map dependencies, 100% precision.</p>
                <div class="ab-hero-stats">
                    <div class="ab-stat-card">
                        <span class="ab-stat-icon">🏛️</span>
                        <div class="ab-stat-num">15+</div>
                        <div class="ab-stat-lbl">Major City Hubs</div>
                    </div>
                    <div class="ab-stat-card">
                        <span class="ab-stat-icon">🚆</span>
                        <div class="ab-stat-num">5</div>
                        <div class="ab-stat-lbl">Transport Modes</div>
                    </div>
                    <div class="ab-stat-card">
                        <span class="ab-stat-icon">⚡</span>
                        <div class="ab-stat-num">100%</div>
                        <div class="ab-stat-lbl">Client-Side Offline</div>
                    </div>
                    <div class="ab-stat-card">
                        <span class="ab-stat-icon">🛡️</span>
                        <div class="ab-stat-num">0 KB</div>
                        <div class="ab-stat-lbl">Telemetry or Ads</div>
                    </div>
                </div>
                <div class="ab-hero-btns">
                    <button class="ab-btn-primary" onclick="navigate('explorer')">🗺️ Explore City Hubs</button>
                    <button class="ab-btn-ghost" onclick="navigate('planner')">⚡ Plan Route Now</button>
                </div>
            </div>
        </div>

        <!-- 2-Column Philosophy & Math Engine -->
        <section class="ab-section">
            <div class="ab-story-grid">
                <div class="ab-story-text">
                    <span class="ab-section-tag">🎯 Philosophy & Origins</span>
                    <h2>Travel without boundaries,<br><em>plan without internet.</em></h2>
                    <p>Yatra Guide was engineered to solve a fundamental Indian travel reality: network dead zones on expressways, ghats, and high-altitude passes. Most mapping solutions fail the second mobile signal drops.</p>
                    <p>We brought spatial geometry directly to the browser. By embedding geodesy equations and calibrated transport models into lightweight JavaScript, Yatra Guide estimates distances, travel hours, and fuel costs instantly without sending a single byte to external servers.</p>
                    <div class="ab-story-quote">"True travel confidence begins when your route, emergency contacts, and budget don't depend on 4G reception."</div>
                    <div class="ab-story-tenets">
                        <div class="ab-tenet-item"><span class="ab-tenet-icon">✓</span> 100% browser-computed Great-Circle arc distance</div>
                        <div class="ab-tenet-item"><span class="ab-tenet-icon">✓</span> Calibrated Indian road curvature & mountain speed indices</div>
                        <div class="ab-tenet-item"><span class="ab-tenet-icon">✓</span> Pre-cached offline emergency services for every city</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Architectural Bento Grid -->
        <section class="ab-section">
            <div class="ab-section-header">
                <span class="ab-section-tag">✨ Core Architecture</span>
                <h2>Engineered for Reliability</h2>
                <p>Every component in Yatra Guide is designed to operate friction-free without depending on third-party commercial APIs.</p>
            </div>
            <div class="ab-bento-grid">
                <div class="ab-bento-card">
                    <div class="ab-bento-icon">🗺️</div>
                    <span class="ab-bento-pill">GEODESY ENGINE</span>
                    <h3>Haversine Route Mathematics</h3>
                    <p>Sub-millisecond spherical distance calculations between Indian coordinates. Uses customized detour factors that account for national highways and mountain topography.</p>
                </div>
                <div class="ab-bento-card">
                    <div class="ab-bento-icon">💰</div>
                    <span class="ab-bento-pill">CALIBRATED LOGISTICS</span>
                    <h3>Multi-Modal Cost Forecaster</h3>
                    <p>Simultaneous pricing models for Bike, Car, Bus, Train, and Flight. Calibrated with real-world Indian toll, fuel, and sleeper-class tariff indices.</p>
                </div>
                <div class="ab-bento-card">
                    <div class="ab-bento-icon">🚨</div>
                    <span class="ab-bento-pill">SAFETY FIRST</span>
                    <h3>Offline Emergency Lifeline</h3>
                    <p>Instant, zero-latency access to verified emergency room phone numbers, police stations, and women helplines across all covered states and union territories.</p>
                </div>
                <div class="ab-bento-card">
                    <div class="ab-bento-icon">🧠</div>
                    <span class="ab-bento-pill">HYBRID INTELLIGENCE</span>
                    <h3>Smart Travel Hub</h3>
                    <p>Combines rule-based packing calculators and seasonal weather curves with an optional Gemini-powered travel advisor for personalized recommendations.</p>
                </div>
            </div>
        </section>

        <!-- How It Works Timeline -->
        <section class="ab-section">
            <div class="ab-section-header">
                <span class="ab-section-tag">⚙️ Execution Workflow</span>
                <h2>How Yatra Guide Calculates Your Journey</h2>
            </div>
            <div class="ab-timeline">
                <div class="ab-tl-item">
                    <div class="ab-tl-dot">1</div>
                    <div class="ab-tl-content">
                        <h4>Select Departure & Destination Hubs</h4>
                        <p>Choose from our verified database of Indian cities or click directly on any destination marker across the interactive Explorer map.</p>
                    </div>
                </div>
                <div class="ab-tl-item">
                    <div class="ab-tl-dot">2</div>
                    <div class="ab-tl-content">
                        <h4>Spherical Arc & Terrain Compensation</h4>
                        <p>The geodesy engine computes Great-Circle distance and applies real-world highway transit curvature factors for accurate road mileage.</p>
                    </div>
                </div>
                <div class="ab-tl-item">
                    <div class="ab-tl-dot">3</div>
                    <div class="ab-tl-content">
                        <h4>Parallel 5-Mode Pricing Synthesis</h4>
                        <p>Algorithms evaluate speed caps, average fuel efficiency, typical toll expenditure, and train booking classes to provide realistic budget envelopes.</p>
                    </div>
                </div>
                <div class="ab-tl-item">
                    <div class="ab-tl-dot">4</div>
                    <div class="ab-tl-content">
                        <h4>Save, Export & Journey Freely</h4>
                        <p>Bookmark routes to your personal local profile or export them for offline review. Everything stays securely on your device.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Cultural Diversity Across India -->
        <section class="ab-section">
            <div class="ab-section-header">
                <span class="ab-section-tag">🇮🇳 Incredible India</span>
                <h2>Curated Across Four Distinct Belts</h2>
                <p>From snowbound alpine passes to tropical backwaters, our database captures the cultural uniqueness of each region.</p>
            </div>
            <div class="ab-culture-grid">
                <div class="ab-culture-card">
                    <div class="ab-culture-icon">🏔️</div>
                    <h4>Northern Himalayas</h4>
                    <p>Manali, Shimla, Srinagar & Amritsar. Majestic peaks, high-altitude passes, and ancient shrines.</p>
                </div>
                <div class="ab-culture-card">
                    <div class="ab-culture-icon">🕌</div>
                    <h4>Golden West</h4>
                    <p>Jaipur, Udaipur, Ahmedabad & Mumbai. Grand forts, royal heritage, textile havens, and desert nights.</p>
                </div>
                <div class="ab-culture-card">
                    <div class="ab-culture-icon">🌴</div>
                    <h4>Coastal South</h4>
                    <p>Kochi, Goa, Bengaluru & Chennai. Serene backwaters, colonial cathedrals, spice hills, and tech corridors.</p>
                </div>
                <div class="ab-culture-card">
                    <div class="ab-culture-icon">🏮</div>
                    <h4>Eastern Heritage</h4>
                    <p>Varanasi, Kolkata, Darjeeling & Puri. Sacred ghats, classical architecture, and misty tea plantations.</p>
                </div>
            </div>
        </section>

        <!-- FAQs Accordion -->
        <section class="ab-section">
            <div class="ab-section-header">
                <span class="ab-section-tag">💡 Clarifications</span>
                <h2>Frequently Asked Questions</h2>
            </div>
            <div class="ab-faqs-grid">
                <div class="ab-faq-item">
                    <div class="ab-faq-q"><span>Does Yatra Guide work without an internet connection?</span><span class="ab-faq-toggle">+</span></div>
                    <div class="ab-faq-a">Yes! All city coordinates, distance computations, multi-modal cost models, and emergency helpline directories are bundled directly into the web application. Once loaded in your browser cache, the entire core system operates 100% offline.</div>
                </div>
                <div class="ab-faq-item">
                    <div class="ab-faq-q"><span>How accurate are the travel cost estimates?</span><span class="ab-faq-toggle">+</span></div>
                    <div class="ab-faq-a">Our rates are calibrated against current Indian transport benchmarks: ₹2.5/km for two-wheelers, ₹6/km for standard hatchbacks/sedans (accounting for mileage and highway tolls), ₹1.8/km for AC express buses, and standard Indian Railways sleeper/3AC tariffs.</div>
                </div>
                <div class="ab-faq-item">
                    <div class="ab-faq-q"><span>Is my personal data or search history tracked?</span><span class="ab-faq-toggle">+</span></div>
                    <div class="ab-faq-a">Never. We do not use third-party analytics trackers, tracking cookies, or commercial user profiling. Your saved trips and route history are stored strictly in your browser's private localStorage.</div>
                </div>
                <div class="ab-faq-item">
                    <div class="ab-faq-q"><span>What algorithm powers the route distance calculations?</span><span class="ab-faq-toggle">+</span></div>
                    <div class="ab-faq-a">We implement the Haversine trigonometric formula based on Earth's mean radius (6,371 km), adjusted with calibrated Indian road curvature coefficients (averaging 1.18x - 1.25x for actual highway driving distances).</div>
                </div>
            </div>
        </section>

        <!-- Grand Footer CTA -->
        <section class="ab-footer-cta">
            <div class="ab-cta-inner">
                <div class="ab-cta-orb"></div>
                <span class="ab-section-tag">🇮🇳 Proudly Open & Free</span>
                <h2>Built with <span class="ab-heart">❤️</span> for Indian Travellers</h2>
                <p>No hidden paywalls. No external tracking. Everything executes locally in your browser for unbeatable speed and resilience.</p>
                <div class="ab-cta-btns">
                    <button class="ab-cta-btn-primary" onclick="navigate('planner')">⚡ Plan Your Next Journey</button>
                    <button class="ab-cta-btn-ghost" onclick="navigate('explorer')">🗺️ Interactive Explorer</button>
                </div>
                <p class="ab-copy">© 2026 Yatra Guide &bull; Made with pride for Bharat</p>
            </div>
        </section>

        </div>
        </div>
    `;
}

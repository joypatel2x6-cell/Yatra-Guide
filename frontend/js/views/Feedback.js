const FB_KEY = 'yatra_guide_feedback';

function getFeedbackList() {
    const data = localStorage.getItem(FB_KEY);
    return data ? JSON.parse(data) : [];
}

function saveFeedback(entry) {
    const list = getFeedbackList();
    list.unshift(entry);
    localStorage.setItem(FB_KEY, JSON.stringify(list));
}

function starsHTML(count, interactive = false) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (interactive) {
            html += `<span class="fb-star" data-value="${i}" style="cursor:pointer; font-size:2rem; transition: transform 0.2s ease; display:inline-block;">${i <= count ? '★' : '☆'}</span>`;
        } else {
            html += `<span style="color: #f59e0b;">${i <= count ? '★' : '☆'}</span>`;
        }
    }
    return html;
}

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
}

const AVATAR_COLORS = [
    'linear-gradient(135deg, #6366f1, #8b5cf6)',
    'linear-gradient(135deg, #ec4899, #f43f5e)',
    'linear-gradient(135deg, #14b8a6, #06b6d4)',
    'linear-gradient(135deg, #f59e0b, #ef4444)',
    'linear-gradient(135deg, #22c55e, #10b981)',
    'linear-gradient(135deg, #3b82f6, #6366f1)',
];

export function renderFeedback() {
    const feedbacks = getFeedbackList();
    const avgRating = feedbacks.length > 0
        ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1)
        : '—';
    const totalCount = feedbacks.length;

    const feedbackCards = feedbacks.map((f, i) => {
        const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
        return `
            <div class="glass-panel fb-card" style="padding: 1.5rem; display: flex; gap: 1rem; align-items: flex-start;">
                <div class="fb-avatar" style="
                    width: 48px; height: 48px; min-width: 48px; border-radius: 50%;
                    background: ${color};
                    display: flex; align-items: center; justify-content: center;
                    color: #fff; font-weight: 700; font-size: 1rem;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                ">${getInitials(f.name)}</div>
                <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                        <strong style="font-size: 1.05rem;">${f.name}</strong>
                        <span style="font-size: 0.8rem; color: var(--text-muted);">${timeAgo(f.date)}</span>
                    </div>
                    <div style="margin: 0.3rem 0; font-size: 1.1rem;">${starsHTML(f.rating)}</div>
                    <p style="color: var(--text-muted); font-size: 0.95rem; margin: 0; word-break: break-word;">${f.comment}</p>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="view-section active" style="padding-bottom: 6rem;">
            <h2 style="text-align: center; margin-bottom: 0.5rem;">Community Feedback</h2>
            <p style="text-align: center; color: var(--text-muted); margin-bottom: 2.5rem;">Share your Yatra experience and help other travellers.</p>

            <!-- Stats Bar -->
            <div style="display: flex; justify-content: center; gap: 3rem; margin-bottom: 3rem; flex-wrap: wrap;">
                <div class="glass-panel" style="padding: 1.5rem 2.5rem; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 800; font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, #f59e0b, #ef4444); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">
                        ${avgRating}
                    </div>
                    <div style="color: var(--text-muted); font-size: 0.85rem; font-weight: 500;">Average Rating</div>
                </div>
                <div class="glass-panel" style="padding: 1.5rem 2.5rem; text-align: center;">
                    <div style="font-size: 2.5rem; font-weight: 800; font-family: 'Poppins', sans-serif; background: linear-gradient(135deg, var(--primary), var(--secondary)); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">
                        ${totalCount}
                    </div>
                    <div style="color: var(--text-muted); font-size: 0.85rem; font-weight: 500;">Total Reviews</div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem; align-items: start; max-width: 1100px; margin: 0 auto;">

                <!-- Left: Submit Form -->
                <div class="glass-panel" style="padding: 2rem; position: sticky; top: 2rem;">
                    <h3 style="margin-bottom: 1.5rem; font-size: 1.3rem;">
                        <span style="margin-right: 0.5rem;">✍️</span>Leave a Review
                    </h3>
                    <form id="feedbackForm">
                        <div class="form-group">
                            <label for="fbName">Your Name</label>
                            <input type="text" id="fbName" placeholder="e.g., Aarav Patel" required>
                        </div>
                        <div class="form-group">
                            <label>Your Rating</label>
                            <input type="hidden" id="fbRating" value="5">
                            <div id="starPicker" style="font-size: 2rem; display: flex; gap: 0.25rem;">
                                ${starsHTML(5, true)}
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="fbComments">Your Experience</label>
                            <textarea id="fbComments" rows="4" placeholder="What did you love about your trip? Any tips for others?" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-lg" style="width: 100%;">
                            Submit Review
                        </button>
                    </form>
                    <div id="fbSuccess" style="display: none; margin-top: 1.5rem; padding: 1.5rem; background: rgba(34, 197, 94, 0.1); border-left: 4px solid var(--success); border-radius: 8px; text-align: center;">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎉</div>
                        <strong style="color: var(--success);">Thank you!</strong>
                        <p style="color: var(--text-muted); margin-top: 0.25rem; font-size: 0.9rem;">Your review has been posted below.</p>
                    </div>
                </div>

                <!-- Right: All Reviews -->
                <div>
                    <h3 style="margin-bottom: 1.5rem; font-size: 1.3rem;">
                        <span style="margin-right: 0.5rem;">💬</span>All Reviews
                    </h3>
                    <div id="feedbackListContainer" style="display: flex; flex-direction: column; gap: 1rem;">
                        ${feedbackCards || '<p style="color: var(--text-muted);">No reviews yet. Be the first!</p>'}
                    </div>
                </div>

            </div>
        </div>
    `;
}

export function setupFeedbackLogic() {
    // Interactive star picker
    const starPicker = document.getElementById('starPicker');
    const ratingInput = document.getElementById('fbRating');
    let currentRating = 5;

    if (starPicker) {
        const stars = starPicker.querySelectorAll('.fb-star');
        stars.forEach(star => {
            star.addEventListener('mouseenter', () => {
                const val = parseInt(star.dataset.value);
                stars.forEach(s => {
                    const sv = parseInt(s.dataset.value);
                    s.textContent = sv <= val ? '★' : '☆';
                    s.style.transform = sv <= val ? 'scale(1.2)' : 'scale(1)';
                    s.style.color = sv <= val ? '#f59e0b' : 'var(--text-muted)';
                });
            });
            star.addEventListener('click', () => {
                currentRating = parseInt(star.dataset.value);
                ratingInput.value = currentRating;
                stars.forEach(s => {
                    const sv = parseInt(s.dataset.value);
                    s.textContent = sv <= currentRating ? '★' : '☆';
                    s.style.color = sv <= currentRating ? '#f59e0b' : 'var(--text-muted)';
                });
            });
        });
        starPicker.addEventListener('mouseleave', () => {
            stars.forEach(s => {
                const sv = parseInt(s.dataset.value);
                s.textContent = sv <= currentRating ? '★' : '☆';
                s.style.transform = 'scale(1)';
                s.style.color = sv <= currentRating ? '#f59e0b' : 'var(--text-muted)';
            });
        });
    }

    // Form submit
    const form = document.getElementById('feedbackForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('fbName').value.trim();
            const comment = document.getElementById('fbComments').value.trim();
            const rating = parseInt(ratingInput.value);

            if (!name || !comment) return;

            const entry = { name, comment, rating, date: new Date().toISOString() };
            saveFeedback(entry);

            // Show success, hide form
            form.style.display = 'none';
            document.getElementById('fbSuccess').style.display = 'block';

            // Add card to list live
            const container = document.getElementById('feedbackListContainer');
            const color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
            const newCard = document.createElement('div');
            newCard.className = 'glass-panel fb-card';
            newCard.style.cssText = 'padding: 1.5rem; display: flex; gap: 1rem; align-items: flex-start; animation: fadeIn 0.4s ease-out forwards;';
            newCard.innerHTML = `
                <div style="
                    width: 48px; height: 48px; min-width: 48px; border-radius: 50%;
                    background: ${color};
                    display: flex; align-items: center; justify-content: center;
                    color: #fff; font-weight: 700; font-size: 1rem;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                ">${getInitials(name)}</div>
                <div style="flex: 1; min-width: 0;">
                    <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
                        <strong style="font-size: 1.05rem;">${name}</strong>
                        <span style="font-size: 0.8rem; color: var(--text-muted);">Just now</span>
                    </div>
                    <div style="margin: 0.3rem 0; font-size: 1.1rem;">${starsHTML(rating)}</div>
                    <p style="color: var(--text-muted); font-size: 0.95rem; margin: 0; word-break: break-word;">${comment}</p>
                </div>
            `;
            container.insertBefore(newCard, container.firstChild);
        });
    }
}

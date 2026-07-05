export function renderContact() {
    return `
        <div class="view-section active">
            <h2>Contact Us</h2>
            <div class="glass-panel" style="padding: 2rem; max-width: 600px; margin: 0 auto;">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Your Name">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="Your Email">
                </div>
                <div class="form-group">
                    <label>Message</label>
                    <textarea rows="5" placeholder="How can we help you?"></textarea>
                </div>
                <button class="btn" style="width: 100%" onclick="alert('Message sent successfully!')">Send Message</button>
            </div>
        </div>
    `;
}

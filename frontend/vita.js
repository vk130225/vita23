const VITA = {
    // UPDATED FOR YOUR RENDER DEPLOYMENT
    API: "https://vita23-backend.onrender.com",
    
    init: async function(config) {
        console.log("VITA System Initializing for: " + config.page);
        this.renderSidebar();
        this.renderTopbar();
        return true;
    },

    renderSidebar: function() {
        const sidebarEl = document.getElementById('sidebar');
        if (!sidebarEl) return;

        sidebarEl.innerHTML = `
            <div style="width: 260px; height: 100vh; background: #0f172a; color: white; position: fixed; left: 0; top: 0; border-right: 1px solid #1e293b; display:flex; flex-direction:column; z-index: 1000;">
                <div style="padding: 2.5rem 2rem; display: flex; align-items: center; gap: 12px;">
                    <div style="background:#e65a28; padding:8px; border-radius:10px;">
                        <i class="fa-solid fa-shield-heart text-white text-xl"></i>
                    </div>
                    <span style="font-size: 1.25rem; font-weight: 900; letter-spacing: -0.02em; color: white;">VITA</span>
                </div>
                
                <nav style="display: flex; flex-direction: column; padding: 0 1rem; gap: 8px; flex-grow:1;">
                    <a href="workers_dashboard.html" class="nav-link"><i class="fa-solid fa-grid-2 mr-3"></i> Dashboard</a>
                    <a href="workers_pipeline.html" class="nav-link"><i class="fa-solid fa-microchip mr-3"></i> Live Pipeline</a>
                    <a href="workers_zone.html" class="nav-link"><i class="fa-solid fa-map-location-dot mr-3"></i> Zone Status</a>
                    <a href="workers_payouts.html" class="nav-link"><i class="fa-solid fa-receipt mr-3"></i> Payout History</a>
                    <a href="workers_sensors.html" class="nav-link"><i class="fa-solid fa-rss mr-3"></i> Live Sensors</a>
                    <a href="workers_trust.html" class="nav-link"><i class="fa-solid fa-brain mr-3"></i> Trust Score</a>
                    <a href="workers_profile.html" class="nav-link"><i class="fa-solid fa-user-gear mr-3"></i> Profile & KYC</a>
                </nav>

                <div style="padding: 2rem 1rem; border-top: 1px solid #1e293b;">
                    <a href="index.html" class="nav-link" style="color: #ef4444;"><i class="fa-solid fa-right-from-bracket mr-3"></i> Logout</a>
                </div>
            </div>
        `;

        // Inject Internal CSS for Sidebar
        const style = document.createElement('style');
        style.innerHTML = `
            .nav-link {
                display: flex; align-items: center; padding: 14px 18px; 
                color: #94a3b8; text-decoration: none; font-size: 0.85rem; 
                font-weight: 700; border-radius: 14px; transition: all 0.2s;
                text-transform: uppercase; letter-spacing: 0.05em;
            }
            .nav-link:hover { background: #1e293b; color: white; }
            .nav-link i { width: 20px; font-size: 1.1rem; }
        `;
        document.head.appendChild(style);
    },

    renderTopbar: function() {
        const topbarEl = document.getElementById('topbar');
        if (!topbarEl) return;
        topbarEl.innerHTML = `
            <div style="height: 80px; background: white; border-bottom: 1px solid #f1f5f9; padding: 0 2rem; display: flex; align-items: center; justify-content: space-between;">
                <div style="font-size: 0.7rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em;">
                    Network Status: <span style="color: #22c55e;">● SECURE</span>
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="text-align: right;">
                        <div style="font-size: 0.85rem; font-weight: 900; color: #0f172a;">AK001</div>
                        <div style="font-size: 0.65rem; font-weight: 700; color: #e65a28;">PARTNER</div>
                    </div>
                    <div style="width: 40px; height: 40px; border-radius: 12px; background: #0f172a; color: white; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 0.8rem;">AK</div>
                </div>
            </div>
        `;
        // Push main content to the right
        document.getElementById('main').style.marginLeft = "260px";
    },

    updateScoreRing: function(id, textId, score, maxDash) {
        const ring = document.getElementById(id);
        const text = document.getElementById(textId);
        if (ring) {
            const offset = maxDash - (maxDash * score);
            ring.style.strokeDashoffset = offset;
        }
        if (text) text.textContent = score.toFixed(2);
    },

    api: async function(endpoint, method = 'GET', body = null) {
        try {
            const options = { method, headers: { 'Content-Type': 'application/json' } };
            if (body) options.body = JSON.stringify(body);
            const res = await fetch(this.API + endpoint, options);
            return res.ok ? await res.json() : null;
        } catch (e) {
            console.error("VITA API Connection Error", e);
            return null;
        }
    }
};

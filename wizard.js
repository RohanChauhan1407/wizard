/**
 * Consequence Onboarding Wizard
 * Instant-Load Header Background Fix
 */
(function () {
    class ApiConfig {
        constructor() {
            this.initializeConfig();
        }

        initializeConfig() {
            const hostname = window.location.hostname;

            if (hostname.includes(".test")) {
                this.prefAuth = "dev";
                this.wpUrl = "https://cos.test/";
            } else if (
                !hostname ||
                hostname === "localhost" ||
                hostname === "127.0.0.1"
            ) {
                this.prefAuth = "dev";
                this.wpUrl = "https://consequence.net/";
            } else if (
                hostname.includes("staging") ||
                hostname.includes("beta") ||
                hostname.includes("concerts-dev")
            ) {
                this.prefAuth = "dev";
                this.wpUrl = "https://consequence.net/";
            } else {
                this.prefAuth = "prod";
                this.wpUrl = "https://consequence.net/";
            }

            this.dataApiUrl = "https://concerts.consequence.net/";
            this.proxyApiUrl = `https://wlg0zddx63.execute-api.us-east-2.amazonaws.com/${this.prefAuth}`;
        }

        getWpUrl() {
            return this.wpUrl;
        }

        getDataApiUrl() {
            return this.dataApiUrl;
        }

        getProxyApiUrl() {
            return this.proxyApiUrl;
        }
    }

    const apiConfig = new ApiConfig();
    const ONBOARDING_CATEGORIES = [
        { id: "654142004", name: "Music", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>` },
        { id: "494012083", name: "Reviews", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><path d="M9 9h6"></path><path d="M9 13h6"></path></svg>` },
        { id: "524", name: "Film", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>` },
        { id: "494011850", name: "TV", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"></rect><polyline points="17 2 12 7 7 2"></polyline></svg>` },
        { id: "97314022", name: "Featured", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>` }
    ];

    const TRENDING_TAGS = [
        { id: "494013402", name: "Album Announcement" },
        { id: "13282992", name: "Indie Rock" },
        { id: "720", name: "Alternative Rock" },
        { id: "494013813", name: "Pop" },
        { id: "494014214", name: "Hip-Hop" },
        { id: "22885", name: "Trailer" },
        { id: "42459", name: "Classic Rock" },
        { id: "494014223", name: "Country" },
        { id: "494014017", name: "Heavy Metal" },
        { id: "654309958", name: "2026 Tour Dates" },
        { id: "527090", name: "Standup Comedy" },
        { id: "90980", name: "Hard Rock" }
    ];

    const ONBOARDING_ARTIST_FALLBACK_IMAGE = "https://d2dyr1mvpoqi3o.cloudfront.net/preference-assets/images/artist-fallback-image.webp";
    const HEADER_BKG_URL = "https://cos-cdn-new.s3.us-east-1.amazonaws.com/preference-assets/images/header-gradient-bkg.jpg";

    function deleteNewUserCookie() {
        let domainString = "";

        // If we are on any consequence.net subdomain, explicitly target the root domain
        if (window.location.hostname.includes("consequence.net")) {
            domainString = "domain=.consequence.net;";
        }

        document.cookie = "is_new_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; " + domainString;
    }

    function injectCSS() {
        if (document.getElementById('consequence-wizard-styles')) return;

        // 1. PRELOAD HEADER IMAGE: Forces browser to download it immediately
        const preload = document.createElement('link');
        preload.rel = 'preload';
        preload.as = 'image';
        preload.href = HEADER_BKG_URL;
        document.head.appendChild(preload);

        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);

        const style = document.createElement('style');
        style.id = 'consequence-wizard-styles';
        style.innerHTML = `
            :root {
                --brand-primary: #8a3ab9; /* Adjusted fallback color to match gradient */
                --brand-hover: #f26622; --modal-bg: #f2f2f2;
                --tag-bg: #ebebeb; --text-main: #1e293b; --text-muted: #64748b; --border: #e2e8f0;
            }
            .wizard-overlay {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; height: 100dvh;
                background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); 
                display: flex; justify-content: center; align-items: center; z-index: 999999; padding: 20px; box-sizing: border-box;
                font-family: 'Montserrat', sans-serif; overflow-y: auto;
                -ms-overflow-style: none; scrollbar-width: none;
            }
            .wizard-overlay::-webkit-scrollbar { display: none; }
            
            .wizard-modal {
                width: 100%; max-width: 920px; background: var(--modal-bg); border-radius: 20px;
                box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); display: flex; flex-direction: column; overflow: hidden;
                transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1); animation: wizFadeIn 0.4s ease-out forwards;
                height: auto; max-height: calc(100vh - 40px); max-height: calc(100dvh - 40px);
            }
            @keyframes wizFadeIn { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
            
            /* 2. INSTANT FALLBACK: Added var(--brand-primary) so it never looks broken */
            .wizard-header {
                background: url('${HEADER_BKG_URL}') center/cover no-repeat, linear-gradient(167deg, rgba(239, 96, 94, 1) 0%, rgba(236, 76, 104, 1) 16%, rgba(237, 82, 101, 1) 22%, rgba(129, 79, 187, 1) 49%, rgba(69, 31, 192, 1) 73%, rgba(74, 82, 218, 1) 100%);
                padding: 24px 30px; display: flex; align-items: center; justify-content: center; color: white; flex-shrink: 0; position: relative;
            }
            .progress-container { position: absolute; bottom: 0; left: 0; width: 100%; height: 6px; background: rgba(0,0,0,0.15); }
            .progress-bar { height: 100%; background: var(--brand-hover); width: 33.33%; transition: width 0.5s ease; border-top-right-radius: 3px; border-bottom-right-radius: 3px; }
            
            .header-title { text-align: center; font-weight: 800; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px; }
            .wizard-close { cursor: pointer; background: none; border: none; color: white; font-size: 1.2rem; padding: 5px; opacity: 0.8; transition: 0.2s; position: absolute; right: 20px; top: 50%; transform: translateY(-50%); width: max-content; }

            .wizard-content { padding: 30px; display: none; flex-direction: column; opacity: 0; flex: 1; min-height: 0; overflow: hidden; }
            .wizard-content.active { display: flex; animation: wizContentFade 0.4s ease forwards; }
            @keyframes wizContentFade { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

            .step-header { text-align: center; margin-bottom: 25px; flex-shrink: 0; }
            .step-header h2 { margin: 0; font-size: 1.8rem; font-weight: 800; color: var(--text-main); text-transform: uppercase; line-height: 1.1; }
            .step-header p { color: var(--text-muted); margin: 8px 0 0; font-size: 1.05rem; font-weight: 500; }
            .microcopy { display: block; font-size: 0.75rem; color: #94a3b8; margin-top: 8px; font-weight: 500; }

            .scrollable-area { 
                max-height: 400px; overflow-y: auto; padding-right: 5px; padding-bottom: 10px; flex: 1; min-height: 0; 
                -ms-overflow-style: none; scrollbar-width: none;
            }
            .scrollable-area::-webkit-scrollbar { display: none; }
            
            .category-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 15px; }
            .cat-chip { 
                display: flex; flex-direction: column; align-items: center; justify-content: center; 
                padding: 20px 10px; background: white; border: 2px solid transparent; border-radius: 16px; 
                cursor: pointer; transition: 0.2s; gap: 10px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); box-sizing: border-box;
            }
            .cat-chip.selected { border-color: var(--brand-hover); background: #fff7f3; }
            .cat-chip svg { width: 32px; height: 32px; color: #2a206a; }
            .cat-chip.selected svg { color: var(--brand-hover); }

            .chip-group { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
            .chip { padding: 10px 18px; background: white; border: 1.5px solid #e2e8f0; border-radius: 30px; cursor: pointer; font-family: inherit; font-weight: 600; font-size: 0.9rem; width: max-content; color: black; }
            .chip.selected { background: var(--brand-hover); border-color: var(--brand-hover); color: white; }

            .artist-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; width: 100%; }
            .artist-card { display: flex; align-items: center; padding: 12px; background: white; border: 2px solid transparent; border-radius: 12px; cursor: pointer; transition: 0.2s; box-sizing: border-box; }
            .artist-card.selected { border-color: var(--brand-hover); background: #fff7f3; }
            .artist-card .avatar { width: 40px; height: 40px; border-radius: 50%; margin-right: 12px; background-size: cover; background-position: center; flex-shrink: 0; background-color: #f1f5f9; }
            .artist-name { font-size: 0.9rem; font-weight: 700; color: var(--text-main); }

            .wizard-footer { 
                padding: 20px 30px; border-top: 1px solid var(--border); 
                display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; flex-shrink: 0; 
            }
            .footer-indicator { font-size: 0.75rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; text-align: center; }
            .btn-next { justify-self: end; background: #2a206a; color: white; border: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px; min-width: 120px; width: max-content; }
            .btn-back { justify-self: start; background: none; border: none; color: var(--text-muted); font-weight: 700; cursor: pointer; text-transform: uppercase; font-size: 0.85rem; min-width: 120px; width: max-content; }
            .btn-next:hover, .btn-back:hover { border: none; }

            /* Mobile Overrides */
            @media (max-width: 600px) {
                .wizard-overlay { padding: 15px; }
                .wizard-modal { border-radius: 16px; max-height: calc(100vh - 30px); max-height: calc(100dvh - 30px); }
                .wizard-header { padding: 20px 15px; }
                .step-header h2 { font-size: 1.4rem; }
                
                .category-grid, .artist-grid { 
                    display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; 
                }
                .cat-chip, .artist-card { width: calc(50% - 6px); flex: 0 0 auto; }

                .artist-card { padding: 10px; }
                .artist-card .avatar { width: 32px; height: 32px; margin-right: 10px; }
                .artist-name { font-size: 0.75rem; line-height: 1.2; word-break: break-word; }

                .wizard-footer { grid-template-columns: 1fr 1fr; gap: 15px; padding: 15px 20px; }
                .footer-indicator { grid-column: 1 / span 2; order: -1; margin-bottom: 5px; }
                .btn-back, .btn-next { min-width: 0; width: 100%; text-align: center; }
            }
        `;
        document.head.appendChild(style);
    }

    window.openOnboardingWizard = async function ({ userEmail }) {
        if (document.querySelector("#wizard-container")) return;
        injectCSS();
        const wizard = document.createElement("div");
        wizard.id = "wizard-container";
        wizard.className = "wizard-overlay";
        wizard.innerHTML = `
            <div class="wizard-modal" id="wizard-modal">
                <div class="wizard-header">
                    <div class="header-title">Personalize Your Experience</div>
                    <button type="button" class="wizard-close" id="wizard-close-btn">&#x2715;</button>
                    <div class="progress-container"><div class="progress-bar" id="wiz-progress"></div></div>
                </div>
                
                <div class="wizard-content active" id="step-1">
                    <div class="step-header">
                        <h2>What Are You Into?</h2>
                        <p>Pick a few to build your feed.</p>
                        <small class="microcopy">You can change this anytime.</small>
                    </div>
                    <div class="scrollable-area"><div class="category-grid" id="wizard-categories"></div></div>
                </div>

                <div class="wizard-content" id="step-2">
                    <div class="step-header">
                        <h2>Trending Now</h2>
                        <p>Pick tags you want to follow.</p>
                        <small class="microcopy">You can change this anytime.</small>
                    </div>
                    <div class="scrollable-area"><div class="chip-group" id="wizard-tags"></div></div>
                </div>

                <div class="wizard-content" id="step-3">
                    <div class="step-header">
                        <h2>Who Do You Want More Of?</h2>
                        <p>Follow at least 5 to personalize your feed.</p>
                        <small class="microcopy">You can change this anytime.</small>
                    </div>
                    <div class="scrollable-area"><div class="artist-grid" id="wizard-artists"></div></div>
                </div>

                <div class="wizard-footer">
                    <button type="button" class="btn-back" id="wizard-back-btn" style="visibility:hidden">Back</button>
                    <div class="footer-indicator" id="wiz-step-text">STEP 1 OF 3</div>
                    <button type="button" class="btn-next" id="wizard-main-btn">Next Step</button>
                </div>
            </div>
        `;

        document.body.appendChild(wizard);
        const state = { step: 1, categories: [], tags: [], artists: [] };
        const modal = wizard.querySelector("#wizard-modal");

        // Render data
        const catContainer = wizard.querySelector("#wizard-categories");
        ONBOARDING_CATEGORIES.forEach(cat => {
            const el = document.createElement("div");
            el.className = "cat-chip";
            el.innerHTML = `${cat.icon}<span>${cat.name}</span>`;
            el.onclick = () => {
                el.classList.toggle("selected");
                const exists = state.categories.find(c => c.id === cat.id);
                state.categories = exists ? state.categories.filter(c => c.id !== cat.id) : [...state.categories, cat];
            };
            catContainer.appendChild(el);
        });

        const tagBox = wizard.querySelector("#wizard-tags");
        TRENDING_TAGS.forEach(t => {
            const btn = document.createElement("button");
            btn.className = "chip";
            btn.textContent = t.name;
            btn.onclick = () => {
                btn.classList.toggle("selected");
                const exists = state.tags.find(tag => tag.id === t.id);
                state.tags = exists ? state.tags.filter(tag => tag.id !== t.id) : [...state.tags, { id: t.id, name: t.name }];
            };
            tagBox.appendChild(btn);
        });

        fetch(`${apiConfig.getDataApiUrl()}api/popular-artists`).then(r => r.json()).then(data => {
            const artists = Array.isArray(data) ? data : (data?.artists || []);
            const artGrid = wizard.querySelector("#wizard-artists");
            artists.slice(0, 20).forEach(a => {
                const card = document.createElement("div");
                card.className = "artist-card";

                // Swap _source suffix for the smaller pre-sized CDN variant
                const rawImage = a.image
                    ? a.image.replace(/_source(\.[^.]+)?$/i, '_EVENT_DETAIL_PAGE_16_9.jpg')
                    : ONBOARDING_ARTIST_FALLBACK_IMAGE;

                card.innerHTML = `<div class="avatar" style="background-image:url('${rawImage}')"></div><div class="artist-name">${a.name}</div>`;

                card.onclick = () => {
                    card.classList.toggle("selected");
                    const exists = state.artists.find(art => art.id === a.id);
                    state.artists = exists ? state.artists.filter(art => art.id !== a.id) : [...state.artists, a];
                };
                artGrid.appendChild(card);
            });
        });

        const updateUI = () => {
            const startHeight = modal.offsetHeight;
            wizard.querySelectorAll(".wizard-content").forEach((c, i) => c.classList.toggle("active", i + 1 === state.step));

            wizard.querySelector("#wiz-progress").style.width = `${(state.step / 3) * 100}%`;
            wizard.querySelector("#wiz-step-text").textContent = `STEP ${state.step} OF 3`;
            wizard.querySelector("#wizard-back-btn").style.visibility = state.step === 1 ? "hidden" : "visible";
            wizard.querySelector("#wizard-main-btn").textContent = state.step === 3 ? "Finish Setup" : "Next Step";

            modal.style.height = "auto";
            const targetHeight = modal.offsetHeight;
            modal.style.height = `${startHeight}px`;
            modal.offsetHeight;
            modal.style.height = `${targetHeight}px`;
            setTimeout(() => { if (modal) modal.style.height = "auto"; }, 400);
        };

        wizard.querySelector("#wizard-back-btn").onclick = () => { if (state.step > 1) { state.step--; updateUI(); } };
        wizard.querySelector("#wizard-close-btn").onclick = () => { deleteNewUserCookie(); wizard.remove(); };

        wizard.querySelector("#wizard-main-btn").onclick = async () => {
            if (state.step < 3) { state.step++; updateUI(); return; }
            const btn = wizard.querySelector("#wizard-main-btn");
            btn.textContent = "Saving..."; btn.disabled = true;
            try {
                const tokenRes = await fetch(`${apiConfig.getProxyApiUrl()}/generate-token`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: userEmail })
                });
                const tokenData = await tokenRes.json();
                const token = tokenData.token || tokenData;

                await fetch(`${apiConfig.getProxyApiUrl()}/update-prefs`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ email: userEmail, artist: state.artists, tags: state.tags, categories: state.categories })
                });

                // Redirect to the preferences page after successful save
                window.location.href = window.location.origin + "/preferences#artist";

            } finally {
                deleteNewUserCookie();
                // We keep wizard.remove() here just in case the redirect takes a moment
                wizard.remove();
            }
        };
    };

    const initWizard = () => {
        const s =
            document.getElementById("onboardingWizardScript") ||
            document.currentScript ||
            document.querySelector('script[src*="wizard.js"]');

        if (s) {
            window.openOnboardingWizard({ userEmail: s.dataset.email });
        }
    };

    // Check if the DOM is already fully loaded
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initWizard);
    } else {
        // DOM is already ready, execute immediately
        initWizard();
    }
})();

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

    const TRENDING_TAGS = [
        { id: "494014223", name: "Country" },
        { id: "494013813", name: "Pop" },
        { id: "494014214", name: "Hip-Hop" },
        { id: "13282992", name: "Indie Rock" },
        { id: "494014017", name: "Heavy Metal" },
        { id: "654309958", name: "2026 Tour Dates" },
        { id: "720", name: "Alternative Rock" },
        { id: "494014050", name: "Comedy" },
        { id: "8215", name: "Festivals" },
        { id: "494014138", name: "Movies" },
        { id: "24323", name: "Rap" },
        { id: "494014100", name: "Rock" },
        { id: "494014139", name: "Electronic" },
        { id: "2853", name: "Giveaway" },
        { id: "494014125", name: "TV" },
        { id: "42459", name: "Classic Rock" }
    ];

    const ONBOARDING_ARTIST_FALLBACK_IMAGE = "https://d2dyr1mvpoqi3o.cloudfront.net/preference-assets/images/artist-fallback-image.webp";
    const HEADER_BKG_URL = "https://cos-cdn-new.s3.us-east-1.amazonaws.com/preference-assets/images/header-gradient-bkg.jpg";

    const POPULAR_ARTISTS = [
        { id: "44182", name: "Radiohead", image: "https://consequence.net/wp-content/uploads/2016/03/radiohead.jpg?quality=80" },
        { id: "26880", name: "Foo Fighters", image: "https://consequence.net/wp-content/uploads/2020/12/Foo-Fighters-photo-by-Danny-Clinch.jpeg?quality=80" },
        { id: "972681", name: "Taylor Swift", image: "https://consequence.net/wp-content/uploads/2024/12/taylor-swift-eras-tour-ticket-sales.jpg?quality=80" },
        { id: "714470", name: "Drake", image: "https://consequence.net/wp-content/uploads/2015/10/drake-davidbrendanhall-11.jpg?quality=80" },
        { id: "77629", name: "Metallica", image: "https://consequence.net/wp-content/uploads/2023/01/Metallica.jpg?quality=80" },
        { id: "18249", name: "Pearl Jam", image: "https://consequence.net/wp-content/uploads/2022/03/Pearl-Jam.jpg?quality=80" },
        { id: "300777", name: "Jack White", image: "https://consequence.net/wp-content/uploads/2019/06/the-raconteurs-bored-razed-new-song-release-music-stream.png" },
        { id: "654304518", name: "Olivia Rodrigo", image: "https://consequence.net/wp-content/uploads/2026/06/Olivia-Rodrigo.jpeg?quality=80" },
        { id: "116660", name: "Deftones", image: "https://consequence.net/wp-content/uploads/2011/01/deftones.jpg?quality=80" },
        { id: "50773954", name: "The Weeknd", source: "wordpress", image: "https://consequence.net/wp-content/uploads/2022/01/the-weeknd.jpg?quality=80" },
        { id: "494011468", name: "Turnstile", image: "https://consequence.net/wp-content/uploads/2021/08/Turnstile-1.jpg?quality=80" },
        { id: "3090314", name: "SZA", image: "https://consequence.net/wp-content/uploads/2022/12/SZA.jpeg?quality=80" },
        { id: "27950", name: "Beyoncé", image: "https://consequence.net/wp-content/uploads/2026/04/6-Beyonce.jpg?quality=80" },
        { id: "574880386", name: "Bad Bunny", source: "wordpress", image: "https://consequence.net/wp-content/uploads/2022/02/Bad-Bunny-Chris-Cornejo.jpg?quality=80" },
        { id: "26378491", name: "Kendrick Lamar", image: "https://consequence.net/wp-content/uploads/2015/03/screen-shot-2015-03-16-at-6-22-14-pm.png" },
        { id: "36275202", name: "Lana Del Rey", image: "https://consequence.net/wp-content/uploads/2019/10/lana-del-rey.png" },
        { id: "574878574", name: "Phoebe Bridgers", image: "https://consequence.net/wp-content/uploads/2020/10/Phoebe-Bridgers.jpeg?quality=80" },
        { id: "2887", name: "Oasis", image: "https://consequence.net/wp-content/uploads/2024/09/Oasis-New-Wembley-Shows.jpg?quality=80" }
    ];

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

            /* Post-Finish Popup */
            .wiz-popup-overlay {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; height: 100dvh;
                background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                display: flex; justify-content: center; align-items: center; z-index: 1000000; padding: 20px; box-sizing: border-box;
                font-family: 'Montserrat', sans-serif;
                animation: wizFadeIn 0.3s ease-out forwards;
            }
            .wiz-popup-card {
                background: var(--modal-bg); border-radius: 20px; overflow: hidden;
                box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5);
                max-width: 420px; width: 100%; text-align: center;
                animation: wizFadeIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
            .wiz-popup-header {
                background: url('${HEADER_BKG_URL}') center/cover no-repeat, linear-gradient(167deg, rgba(239,96,94,1) 0%, rgba(236,76,104,1) 16%, rgba(237,82,101,1) 22%, rgba(129,79,187,1) 49%, rgba(69,31,192,1) 73%, rgba(74,82,218,1) 100%);
                padding: 22px 30px; color: white;
            }
            .wiz-popup-header h3 {
                margin: 0; font-size: 1.3rem; font-weight: 800;
                text-transform: uppercase; letter-spacing: 1px;
            }
            .wiz-popup-header p { display: none; }
            .wiz-popup-body { padding: 20px 28px 28px; }
            .wiz-popup-subtitle {
                margin: 0 0 20px; color: var(--text-muted); font-size: 0.9rem; font-weight: 500; line-height: 1.5;
            }
            .wiz-popup-actions { display: flex; flex-direction: column; gap: 12px; }
            .wiz-popup-btn-primary {
                background: #2a206a;
                color: white; border: none; padding: 14px 24px; border-radius: 10px;
                font-family: inherit; font-weight: 700; font-size: 0.9rem;
                cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px;
                display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;
                transition: background 0.2s ease, transform 0.15s ease;
            }
            .wiz-popup-btn-primary svg { width: 16px; height: 16px; flex-shrink: 0; }
            .wiz-popup-btn-primary:hover { background: #1a1444; transform: translateY(-1px); }
            .wiz-popup-btn-secondary {
                background: transparent; color: #2a206a; border: 2px solid #2a206a;
                padding: 12px 24px; border-radius: 10px;
                font-family: inherit; font-weight: 700; font-size: 0.9rem;
                cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px;
                display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%;
                transition: background 0.2s ease, transform 0.15s ease;
            }
            .wiz-popup-btn-secondary svg { width: 16px; height: 16px; flex-shrink: 0; }
            .wiz-popup-btn-secondary:hover { background: rgba(42,32,106,0.06); transform: translateY(-1px); }

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

                .wiz-popup-card { border-radius: 16px; }
                .wiz-popup-header { padding: 18px 20px; }
                .wiz-popup-header h3 { font-size: 1.1rem; }
                .wiz-popup-body { padding: 20px 16px 24px; }
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
                        <h2>Who Do You Want More Of?</h2>
                        <p>Follow at least 5 to personalize your feed.</p>
                        <small class="microcopy">You can change this anytime.</small>
                    </div>
                    <div class="scrollable-area"><div class="artist-grid" id="wizard-artists"></div></div>
                </div>

                <div class="wizard-content" id="step-2">
                    <div class="step-header">
                        <h2>Tags &amp; Categories</h2>
                        <p>Tailor Your Feed.</p>
                        <small class="microcopy">You can change this anytime.</small>
                    </div>
                    <div class="scrollable-area"><div class="chip-group" id="wizard-tags"></div></div>
                </div>



                <div class="wizard-footer">
                    <button type="button" class="btn-back" id="wizard-back-btn" style="visibility:hidden">Back</button>
                    <div class="footer-indicator" id="wiz-step-text">STEP 1 OF 2</div>
                    <button type="button" class="btn-next" id="wizard-main-btn">Next Step</button>
                </div>
            </div>
        `;

        document.body.appendChild(wizard);
        const state = { step: 1, tags: [], artists: [] };
        const modal = wizard.querySelector("#wizard-modal");

        function trackWizardEvent(eventAction, eventLabel = 'wizard_modal_step', eventName = 'wizard_view', eventCategory = 'onboarding') {
            try {
                if (typeof pushPrefEvent === 'function') {
                    pushPrefEvent(eventAction, eventLabel, eventName, eventCategory);
                }
            } catch (err) {
                console.error('[Wizard Analytics Error]', err);
            }
        }

        // Track initial wizard opening and step 1 view
        trackWizardEvent('wizard_modal_view', 'wizard_modal', 'wizard_view', 'onboarding');
        trackWizardEvent('wizard_modal_step1', 'wizard_modal_step', 'wizard_view', 'onboarding');

        const tagBox = wizard.querySelector("#wizard-tags");
        TRENDING_TAGS.forEach(t => {
            const btn = document.createElement("button");
            btn.className = "chip";
            btn.textContent = t.name;
            btn.onclick = () => {
                btn.classList.toggle("selected");
                const exists = state.tags.find(tag => tag.id === t.id);
                state.tags = exists
                    ? state.tags.filter(tag => tag.id !== t.id)
                    : [...state.tags, { id: t.id, name: t.name }];
            };
            tagBox.appendChild(btn);
        });

        const artGrid = wizard.querySelector("#wizard-artists");
        POPULAR_ARTISTS.forEach(a => {
            const card = document.createElement("div");
            card.className = "artist-card";

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

        const updateUI = () => {
            const startHeight = modal.offsetHeight;
            wizard.querySelectorAll(".wizard-content").forEach((c, i) => c.classList.toggle("active", i + 1 === state.step));

            wizard.querySelector("#wiz-progress").style.width = `${(state.step / 2) * 100}%`;
            wizard.querySelector("#wiz-step-text").textContent = `STEP ${state.step} OF 2`;
            wizard.querySelector("#wizard-back-btn").style.visibility = state.step === 1 ? "hidden" : "visible";
            wizard.querySelector("#wizard-main-btn").textContent = state.step === 2 ? "Finish Setup" : "Next Step";

            modal.style.height = "auto";
            const targetHeight = modal.offsetHeight;
            modal.style.height = `${startHeight}px`;
            modal.offsetHeight;
            modal.style.height = `${targetHeight}px`;
            setTimeout(() => { if (modal) modal.style.height = "auto"; }, 400);
        };

        function getSelectMoreArtistsUrl() {
            const hostname = window.location.hostname;
            if (hostname.includes("staging")) {
                return "https://staging.consequence.net/preferences/#artist#add";
            } else if (hostname.includes("concerts-dev")) {
                return "https://concerts-dev.consequence.net/preferences#artist#add";
            } else if (hostname.includes("concerts")) {
                return "https://concerts.consequence.net/preferences#artist#add";
            } else {
                return "https://consequence.net/preferences/#artist#add";
            }
        }

        function getPersonalizedFeedUrl() {
            const hostname = window.location.hostname;

            if (hostname === "concerts.consequence.net") {
                return "https://consequence.net/my-content";
            }

            if (hostname.includes("staging") || hostname.includes("concerts-dev")) {
                return "https://staging.consequence.net/my-content";
            }

            return window.location.origin + "/my-content";
        }

        function showPostFinishPopup() {
            if (document.querySelector("#wiz-post-finish-popup")) return;
            const popup = document.createElement("div");
            popup.className = "wiz-popup-overlay";
            popup.id = "wiz-post-finish-popup";
            popup.innerHTML = `
                <div class="wiz-popup-card">
                    <div class="wiz-popup-header">
                        <h3>You're All Set!</h3>
                    </div>
                    <div class="wiz-popup-body">
                        <p class="wiz-popup-subtitle">Your preferences have been saved. What would you like to do next?</p>
                        <div class="wiz-popup-actions">
                            <button type="button" class="wiz-popup-btn-primary" id="wiz-go-feed-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                Go to Personalized Feed
                            </button>
                            <button type="button" class="wiz-popup-btn-secondary" id="wiz-more-artists-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><line x1="19" y1="8" x2="19" y2="14"></line><line x1="22" y1="11" x2="16" y2="11"></line></svg>
                                Select More Artists
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(popup);

            popup.querySelector("#wiz-go-feed-btn").onclick = () => {
                trackWizardEvent('wizard_modal_myfeed', 'wizard_modal_step', 'wizard_complete', 'onboarding');
                window.location.href = getPersonalizedFeedUrl();
            };

            popup.querySelector("#wiz-more-artists-btn").onclick = () => {
                trackWizardEvent('wizard_modal_myartists', 'wizard_modal_step', 'wizard_complete', 'onboarding');
                window.location.href = getSelectMoreArtistsUrl();
            };
        }

        wizard.querySelector("#wizard-back-btn").onclick = () => { if (state.step > 1) { state.step--; updateUI(); } };
        wizard.querySelector("#wizard-close-btn").onclick = () => {
            trackWizardEvent(`wizard_abandon_step${state.step}`, 'wizard_modal_close', 'wizard_abandon', 'onboarding');
            deleteNewUserCookie();
            wizard.remove();
        };

        wizard.querySelector("#wizard-main-btn").onclick = async () => {
            if (state.step < 2) {
                trackWizardEvent('wizard_modal_step1_next', 'wizard_modal_button_click', 'wizard_complete', 'onboarding');
                state.step++;
                trackWizardEvent('wizard_modal_step2', 'wizard_modal_step', 'wizard_view', 'onboarding');
                updateUI();
                return;
            }
            trackWizardEvent('wizard_modal_step2_finish', 'wizard_modal_button_click', 'wizard_complete', 'onboarding');
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
                    body: JSON.stringify({ email: userEmail, artist: state.artists, tags: state.tags })
                });
            } catch (err) {
                trackWizardEvent('wizard_modal_step2_failed', 'wizard_modal_save_failed', 'wizard_save_failed', 'onboarding');
                console.error("Failed to save preferences:", err);
            } finally {
                deleteNewUserCookie();
                wizard.remove();
                showPostFinishPopup();
            }
        };

        window.testWizardPopup = () => {
            if (document.querySelector("#wizard-container")) document.querySelector("#wizard-container").remove();
            showPostFinishPopup();
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

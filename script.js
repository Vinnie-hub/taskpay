(function () {
        "use strict";
        const REG = "https://Starhela.com/register.php?ref=MillionaireMax";
        const $ = (id) => document.getElementById(id);
        const rand = (a) => a[Math.floor(Math.random() * a.length)];
        const fmt = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        function shuffle(arr) {
          const a = [...arr];
          for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
          }
          return a;
        }

        // Page Loader
        window.addEventListener("load", () => {
          setTimeout(() => {
            const l = $("pageLoader");
            if (l) l.classList.add("done");
          }, 800);
        });

        // Live Activity Bar
        const LAB_EVENTS = [
          "15,000+ Verified Earners",
          "$890K+ Paid Out",
          "One-Time Fee Only",
          "5 Ways to Earn",
          "$2–$8 Per Hour",
          "UK · USA · Canada · Qatar",
          "Daily Payouts",
          "4.6★ Rating",
          "Funza wazungu kiswahili",
          "24/7 Real Support",
          "No Monthly Subscriptions",
          "Piga Gumzo kwa Kiswahili",
          "Tafsiri Otomatiki kwa Wateja",
        ];
        const labFeed = $("labFeed");
        if (labFeed) {
          [...LAB_EVENTS, ...LAB_EVENTS].forEach((event) => {
            const span = document.createElement("span");
            span.className = "lab-item";
            span.innerHTML = `<i class="fas fa-check-circle"></i>${event}`;
            labFeed.appendChild(span);
          });
        }
        let labOnline = 3847;
        function updateLabCounter() {
          if (document.hidden) return;
          labOnline = Math.max(
            800,
            labOnline + Math.floor(Math.random() * 12) - 5,
          );
          const el = $("labCount");
          if (el) el.textContent = fmt(labOnline) + " online";
        }
        setInterval(updateLabCounter, 2000);

        // Live Toast Notifications
        class LiveNotifications {
          constructor() {
            this.container = null;
            this.queue = [];
            this.isShowing = false;
            this.lastUser = null;
            this.init();
          }
          init() {
            this.container = document.createElement("div");
            this.container.className = "live-toast-container";
            document.body.appendChild(this.container);
          }
          getRandomUser() {
            const users = [
              { name: "Lacostta", country: null, avatar: "L" },
              { name: "Jiesca", country: null, avatar: "J" },
              { name: "Kevin", country: "United Kingdom", flag: "🇬🇧" },
              { name: "Maria", country: "Spain", flag: "🇪🇸" },
              { name: "Ahmed", country: "Qatar", flag: "🇶🇦" },
              { name: "Sarah", country: "Canada", flag: "🇨🇦" },
              { name: "David", country: "United States", flag: "🇺🇸" },
              { name: "Priya", country: null, avatar: "P" },
              { name: "James", country: "United Kingdom", flag: "🇬🇧" },
              { name: "Amara", country: null, avatar: "A" },
              { name: "Sophia", country: "Italy", flag: "🇮🇹" },
              { name: "Brian", country: "Kenya", flag: "🇰🇪" },
              { name: "Fatima", country: "UAE", flag: "🇦🇪" },
              { name: "Carlos", country: "Brazil", flag: "🇧🇷" },
              { name: "Amina", country: "Tanzania", flag: "🇹🇿" },
              { name: "Liam", country: "Ireland", flag: "🇮🇪" },
              { name: "Noah", country: "Australia", flag: "🇦🇺" },
              { name: "Musa", country: "Nigeria", flag: "🇳🇬" },
              { name: "Grace", country: "Uganda", flag: "🇺🇬" },
              { name: "Elena", country: "Russia", flag: "🇷🇺" },
              { name: "Joy", country: null, avatar: "J" },
              { name: "Victor", country: "France", flag: "🇫🇷" },
              { name: "Linda", country: "Germany", flag: "🇩🇪" },
              { name: "Diana", country: null, avatar: "D" },
            ];
            let u;
            do {
              u = users[Math.floor(Math.random() * users.length)];
            } while (this.lastUser && u.name === this.lastUser.name);
            this.lastUser = u;
            return u;
          }
          getRandomOnlineMessage() {
            const m = [
              "is online now",
              "just connected",
              "started chatting",
              "is active now",
              "came online",
              "is waiting online",
              "is available for chat",
              "joined a conversation",
              "has sent a request",
              "just signed in",
              "is currently active",
              "joined moments ago",
            ];
            return m[Math.floor(Math.random() * m.length)];
          }
          showToast(user) {
            const toast = document.createElement("div");
            toast.className = "live-toast";
            const avatar = user.avatar || user.name.charAt(0);
            const flagHtml = user.flag
              ? `<span class="live-toast-flag">${user.flag}</span>`
              : "";
            const locationText = user.country ? `from ${user.country}` : "";
            const message = this.getRandomOnlineMessage();
            toast.innerHTML = `<div class="live-toast-avatar">${avatar}</div><div class="live-toast-content"><div class="live-toast-top">${flagHtml}<span class="live-toast-name">${user.name}</span></div><div class="live-toast-message">${message} ${locationText}<span class="live-toast-status"></span></div></div>`;
            this.container.appendChild(toast);
            requestAnimationFrame(() => toast.classList.add("show"));
            setTimeout(() => {
              toast.classList.remove("show");
              toast.classList.add("toast-hide");
              setTimeout(() => toast.remove(), 400);
            }, 4000);
          }
          addToQueue(user) {
            this.queue.push(user);
            if (!this.isShowing) this.processQueue();
          }
          processQueue() {
            if (this.queue.length === 0) {
              this.isShowing = false;
              return;
            }
            this.isShowing = true;
            const user = this.queue.shift();
            this.showToast(user);
            setTimeout(() => this.processQueue(), 4500);
          }
          startSimulation(min = 8000, max = 15000) {
            const simulate = () => {
              this.addToQueue(this.getRandomUser());
              setTimeout(
                simulate,
                Math.floor(Math.random() * (max - min + 1)) + min,
              );
            };
            simulate();
          }
        }
        const liveNotifications = new LiveNotifications();
        liveNotifications.startSimulation();

        // i18n
        const TRANSLATIONS = {
          en: {
            live_label: "Earning right now —",
            active_chatters: "active chatters",
            hero_sub: "Turn Conversations Into",
            hero_main: "Real Cash",
            rate_label: "per hour · 5 ways to earn",
            m1: "Per Hour",
            m2: "Per Message",
            m3: "Per Session",
            m4: "Daily Rewards",
            hero_desc: `Chat with people from <strong style="color:var(--text-0)">UK, USA, Canada, Qatar &amp; 100+ countries</strong> — from your phone, on your schedule. Results vary based on activity.`,
            paid_today: "Paid today",
            active_earners: "Active earners",
            total_paid: "Total paid out",
            rating: "Rating",
            meet_btn: "Meet People Ready to Chat",
            create_account: "Create Account",
            proof1: "Secure &amp; Trusted",
            proof2: "Daily Withdrawals",
            proof3: "5 Ways to Earn",
            proof4: "100+ Countries",
            start_accepting: "Start Accepting Requests",
            estimate: "Estimate your earnings",
            chats_day: "Chats / day",
            rate_hr: "Rate / hr",
            monthly_est: "Monthly estimate (30 days)",
            try_demo: "Try a Live Chat Demo",
            live_requests: "Live Requests",
            real_people: "Real people,",
            ready_to_chat: "ready to chat",
            req_sub: `New requests arrive regularly. Every completed conversation adds to your balance. <strong>Chat in Kiswahili</strong> — clients automatically receive translated messages on their side.`,
            requests_live: "requests live",
            view_all_profiles: "View All Profiles &amp; Start Chatting",
            view_all_sub:
              "Register free to access 5,000+ verified clients from 100+ countries",
            simple_process: "Simple Process",
            start_earning: "Start earning in",
            three_steps: "3 easy steps",
            steps_sub: "From zero to your first conversation in under an hour.",
            step1_title: "Register Your Account",
            step1_desc:
              "Create your profile with a one-time activation fee. Instantly unlocks access to clients worldwide.",
            step1_tag: "One-time only — no recurring fees",
            view_steps: "View Registration Steps",
            step2_title: "Accept Chat Requests",
            step2_desc:
              "Clients from UK, USA, Canada &amp; more send requests. Accept, have a real conversation, and earn per hour, message, or session. Chat in Kiswahili — messages auto-translate for clients.",
            step2_tag: "5 ways to earn per chat",
            step3_title: "Earn &amp; Withdraw Daily",
            step3_desc:
              "Withdraw daily to M-Pesa, PayPal, MTN Money, or Airtel Money — zero fees.",
            step3_tag: "Zero withdrawal fees",
            maximize: "Maximize Your Income",
            five_ways: "Five ways to",
            earn_word: "earn",
            five_sub:
              "Most platforms pay one way. TaskPay pays five. Combine methods to maximize every conversation.",
            em1_title: "Earn Per Hour",
            em1_desc:
              "Auto-tracked earnings for every hour of conversation. The more you chat, the more you earn.",
            auto_tracked: "Auto-tracked",
            em2_title: "Earn Per Message",
            em2_earn: "Every reply pays",
            em2_desc:
              "Get paid for each message sent. Balance updates instantly with every reply.",
            instant_update: "Instant update",
            em3_title: "Earn Per Session",
            em3_desc:
              "Complete full chat sessions (20–60 min) and receive a flat payment on completion.",
            paid_completion: "Paid on completion",
            em4_title: "Tips &amp; Bonuses",
            em4_earn: "Extra on top",
            em4_desc:
              "Satisfied clients leave voluntary tips — added on top of your base earnings.",
            on_top: "On top of base pay",
            em5_title: "Daily Rewards",
            em5_earn: "Consistency pays extra",
            em5_desc:
              "Stay active and earn daily streak bonuses. The longer your streak, the higher the reward.",
            streak: "Streak bonuses",
            chat_topics: "Chat Topics",
            what_chat: "What do you",
            chat_about: "chat about?",
            topics_sub:
              "Many users join to build international friendships, learn about different cultures, share life experiences, and sometimes create meaningful long-term relationships.",
            swahili_title: "🇰🇪🇹🇿 Unaweza Kuzungumza Kiswahili!",
            swahili_desc: `You can chat entirely in <strong>Kiswahili</strong> — clients from UK, USA, Canada and other countries automatically receive your messages translated into their language. No need to worry about language barriers. Just chat naturally in your mother tongue and earn!`,
            most_popular: "Most Popular",
            t1_title: "Culture &amp; Daily Life",
            t1_desc:
              "Share your local traditions, food, and festivals. Clients love authentic stories.",
            highest_demand: "Highest Demand",
            t2_title: "Friendly Companionship",
            t2_desc:
              "Many clients simply want a genuine conversation. Listen, be kind, share a laugh.",
            t3_title: "Teach foreigners Swahili",
            t3_desc:
              "Teach Kiswahili and other African languages with global learners eager to learn and connect with Africans",
            advice_opinions: "Advice &amp; Opinions",
            t4_title: "Life Advice &amp; Stories",
            t4_desc:
              "People want your perspective on relationships, work, and life decisions.",
            accept_btn: "Accept Request",
            view_btn: "View Profile",
          },
          sw: {
            live_label: "Wanaopata pesa sasa hivi —",
            active_chatters: "wapiga gumzo wanaofanya kazi",
            hero_sub: "Geuza Mazungumzo Kuwa",
            hero_main: "Pesa Halisi",
            rate_label: "kwa saa · njia 5 za kupata pesa",
            m1: "Kwa Saa",
            m2: "Kwa Ujumbe",
            m3: "Kwa Kikao",
            m4: "Zawadi za Kila Siku",
            hero_desc: `Piga gumzo na watu kutoka <strong style="color:var(--text-0)">UK, USA, Canada, Qatar &amp; nchi 100+</strong> — kutoka kwenye simu yako, kwa ratiba yako.`,
            paid_today: "Imelipwa leo",
            active_earners: "Wapata pesa wanaofanya kazi",
            total_paid: "Jumla iliyolipwa",
            rating: "Ukadiriaji",
            meet_btn: "Kutana na Watu Tayari Kupiga Gumzo",
            create_account: "Fungua Akaunti",
            proof1: "Salama &amp; Aminifu",
            proof2: "Uondoaji wa Kila Siku",
            proof3: "Njia 5 za Kupata Pesa",
            proof4: "Nchi 100+",
            start_accepting: "Anza Kukubali Maombi",
            estimate: "Kadiri mapato yako",
            chats_day: "Mazungumzo / siku",
            rate_hr: "Kiwango / saa",
            monthly_est: "Makadirio ya mwezi (siku 30)",
            try_demo: "Jaribu Onyesho la Gumzo",
            live_requests: "Maombi ya Moja kwa Moja",
            real_people: "Watu halisi,",
            ready_to_chat: "tayari kupiga gumzo",
            req_sub: `Maombi mapya yanafika mara kwa mara. <strong>Piga gumzo kwa Kiswahili</strong> — wateja hupokea ujumbe uliotafsiriwa kwa upande wao.`,
            requests_live: "maombi ya moja kwa moja",
            view_all_profiles: "Angalia Maelezo Yote &amp; Anza Kupiga Gumzo",
            view_all_sub:
              "Jisajili bila malipo kupata wateja 5,000+ kutoka nchi 100+",
            simple_process: "Mchakato Rahisi",
            start_earning: "Anza kupata pesa kwa",
            three_steps: "hatua 3 rahisi",
            steps_sub:
              "Kutoka sifuri hadi mazungumzo yako ya kwanza chini ya saa moja.",
            step1_title: "Sajili Akaunti Yako",
            step1_desc: "Unda wasifu wako kwa ada ya uanzishaji ya mara moja.",
            step1_tag: "Mara moja tu — hakuna ada za mara kwa mara",
            view_steps: "Angalia Hatua za Usajili",
            step2_title: "Kubali Maombi ya Gumzo",
            step2_desc:
              "Wateja kutoka UK, USA, Canada &amp; zaidi wanatuma maombi. Piga gumzo kwa Kiswahili — ujumbe unatafsirika kwa wateja.",
            step2_tag: "Njia 5 za kupata pesa kwa mazungumzo",
            step3_title: "Pata Pesa &amp; Toa Kila Siku",
            step3_desc:
              "Toa pesa kila siku kwenda M-Pesa, PayPal, MTN Money, au Airtel Money — bila ada.",
            step3_tag: "Hakuna ada za uondoaji",
            maximize: "Ongeza Mapato Yako",
            five_ways: "Njia tano za",
            earn_word: "kupata pesa",
            five_sub:
              "Majukwaa mengi yanalipa kwa njia moja. TaskPay inalipa kwa njia tano.",
            em1_title: "Pata Pesa kwa Saa",
            em1_desc:
              "Mapato yanafuatiliwa otomatiki kwa kila saa ya mazungumzo.",
            auto_tracked: "Inafuatiliwa otomatiki",
            em2_title: "Pata Pesa kwa Ujumbe",
            em2_earn: "Kila jibu linalipa",
            em2_desc: "Pata malipo kwa kila ujumbe uliotumwa.",
            instant_update: "Sasisha mara moja",
            em3_title: "Pata Pesa kwa Kikao",
            em3_desc: "Kamilisha vikao kamili vya gumzo na upokee malipo.",
            paid_completion: "Inalipwa ukikamilisha",
            em4_title: "Vidokezo &amp; Bonasi",
            em4_earn: "Ziada juu ya msingi",
            em4_desc: "Wateja waridhifu wanawacha vidokezo vya hiari.",
            on_top: "Juu ya mshahara wa msingi",
            em5_title: "Zawadi za Kila Siku",
            em5_earn: "Uthabiti unalipa zaidi",
            em5_desc:
              "Kuwa mkamilifu na upate bonasi za mfululizo wa kila siku.",
            streak: "Bonasi za mfululizo",
            chat_topics: "Mada za Gumzo",
            what_chat: "Unazungumza",
            chat_about: "kuhusu nini?",
            topics_sub:
              "Watumiaji wengi wanajiunga kujenga urafiki wa kimataifa na kujifunza kuhusu tamaduni tofauti.",
            swahili_title: "🇰🇪 Unaweza Kuzungumza Kiswahili!",
            swahili_desc: `Unaweza kupiga gumzo kabisa kwa <strong>Kiswahili</strong> — wateja hupokea ujumbe wako uliotafsiriwa otomatiki.`,
            most_popular: "Inayopendwa Zaidi",
            t1_title: "Utamaduni &amp; Maisha ya Kila Siku",
            t1_desc: "Shiriki mila yako ya ndani, chakula, na sherehe.",
            highest_demand: "Mahitaji ya Juu",
            t2_title: "Urafiki wa Kirafiki",
            t2_desc: "Wateja wengi wanataka mazungumzo ya kweli tu.",
            t3_title: "Funza Wageni Kiswahili",
            t3_desc:
              "Funza Kiswahili na lugha nyingine za Kiafrika kwa wanafunzi wa kimataifa.",
            advice_opinions: "Ushauri &amp; Maoni",
            t4_title: "Ushauri wa Maisha &amp; Hadithi",
            t4_desc:
              "Watu wanataka mtazamo wako kuhusu mahusiano, kazi, na maamuzi ya maisha.",
            accept_btn: "Kubali Ombi",
            view_btn: "Angalia Maelezo",
          },
        };
        let currentLang = "en";
        window.setLang = function (lang) {
          currentLang = lang;
          document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.dataset.i18n;
            if (TRANSLATIONS[lang][key] !== undefined)
              el.innerHTML = TRANSLATIONS[lang][key];
          });
          document
            .querySelectorAll(".lang-btn")
            .forEach((b) =>
              b.classList.toggle("active", b.dataset.lang === lang),
            );
          const grid = $("profileGrid");
          if (grid) {
            grid.querySelectorAll(".prf-btn-accept").forEach((b) => {
              if (!b.disabled)
                b.innerHTML = `<i class="fas fa-check"></i> ${TRANSLATIONS[lang].accept_btn || "Accept Request"}`;
            });
            grid.querySelectorAll(".prf-btn-view").forEach((b) => {
              b.innerHTML = `<i class="fas fa-user"></i> ${TRANSLATIONS[lang].view_btn || "View Profile"}`;
            });
          }
        };
        window.scrollToReq = function () {
          const el = $("req-sec");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        };

        // Countries
        const COUNTRIES = [
          {
            name: "Kenya",
            flag: "🇰🇪",
            old: "KES 650",
            fee: "KES 550",
            save: "KES 100",
            disc: "15%",
            pay: "M-Pesa",
            urg: "⏳ Offer expires soon!",
            img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
          },
          {
            name: "Uganda",
            flag: "🇺🇬",
            old: "UGX 24,500",
            fee: "UGX 19,500",
            save: "UGX 5,000",
            disc: "20%",
            pay: "MTN Money / Airtel Money",
            urg: "⏳ Limited spots!",
            img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=800&q=80",
          },
          {
            name: "Nigeria",
            flag: "🇳🇬",
            old: "₦11,000",
            fee: "₦9,000",
            save: "₦2,000",
            disc: "18%",
            pay: "Bank Transfer",
            urg: "⏳ Offer ends soon!",
            img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
          },
          {
            name: "Tanzania",
            flag: "🇹🇿",
            old: "TZS 14,000",
            fee: "TZS 11,000",
            save: "TZS 3,000",
            disc: "21%",
            pay: "M-Pesa Tanzania",
            urg: "⏳ Grab it before it's gone!",
            img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
          },
          {
            name: "South Africa",
            flag: "🇿🇦",
            old: "ZAR 100",
            fee: "ZAR 70",
            save: "ZAR 30",
            disc: "30%",
            pay: "Bank Transfer / PayPal",
            urg: "⏳ Offer expires soon!",
            img: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?auto=format&fit=crop&w=800&q=80",
          },
          {
            name: "Ghana",
            flag: "🇬🇭",
            old: "GH₵ 120",
            fee: "GH₵ 95",
            save: "GH₵ 25",
            disc: "20%",
            pay: "MTN MoMo",
            urg: "⏳ Limited time!",
            img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=800&q=80",
          },
          {
            name: "International",
            flag: "🌍",
            old: "$12.00",
            fee: "$10.00",
            save: "$2.00",
            disc: "17%",
            pay: "PayPal / Bank Transfer",
            urg: "⏳ Limited offer!",
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
          },
        ];
        let selC = COUNTRIES[0];
        fetch("https://ipapi.co/json/")
          .then((r) => r.json())
          .then((d) => {
            const m = COUNTRIES.find((c) => c.name === d.country_name);
            if (m) selC = m;
          })
          .catch(() => {});

        // All 27 profiles
        const ALL_PROFILES = [
          {
            id: 1,
            name: "Emily",
            age: 65,
            loc: "London, UK",
            flag: "🇬🇧",
            desc: "Wants to chat with you",
            full: "Hi! I'm Emily, a retired literature teacher from London. I'd love to chat with you about books, travel, and what life is like where you are!",
            price: 4,
            tags: ["Friendly", "Patient", "Well-read", "Travel"],
            langs: ["English", "French"],
            img: "https://plus.unsplash.com/premium_photo-1679439492693-05a8e642381d?w=500&auto=format&fit=crop&q=60",
            badge: "Popular",
            badgeClass: "",
          },
          {
            id: 2,
            name: "Robert",
            age: 58,
            loc: "New York, USA",
            flag: "🇺🇸",
            desc: "Wants to chat with you",
            full: "Hi! I'm Robert from New York. After 30+ years in international business, I'd love to chat with you about culture, world affairs, and new perspectives.",
            price: 6,
            tags: ["Business", "Mentor", "Cultural", "Professional"],
            langs: ["English", "Spanish"],
            img: "https://plus.unsplash.com/premium_photo-1672297543351-17987c5c9361?q=80&w=385&auto=format&fit=crop",
            badge: "Premium",
            badgeClass: "premium",
          },
          {
            id: 3,
            name: "Linda",
            age: 68,
            loc: "Toronto, Canada",
            flag: "🇨🇦",
            desc: "Wants to chat with you",
            full: "Hi! I'm Linda from Toronto. I'd love to chat with you about family, daily life, and hear about your experiences — genuine conversation is all I'm after.",
            price: 8,
            tags: ["Companionship", "Patient", "Empathetic", "Family"],
            langs: ["English"],
            img: "https://images.unsplash.com/photo-1615538786254-ad8b50de17dc?q=80&w=387&auto=format&fit=crop",
            badge: "Top Earner",
            badgeClass: "top",
          },
          {
            id: 4,
            name: "Michael",
            age: 54,
            loc: "Manchester, UK",
            flag: "🇬🇧",
            desc: "Wants to chat with you",
            full: "Hey! I'm Michael from Manchester. I'd love to chat with you about technology, science, and the big ideas shaping our world.",
            price: 3,
            tags: ["Tech", "Curious", "Open-minded", "Thoughtful"],
            langs: ["English"],
            img: "https://i.pravatar.cc/400?img=68",
            badge: "New",
            badgeClass: "",
          },
          {
            id: 5,
            name: "Susan",
            age: 61,
            loc: "Melbourne, Australia",
            flag: "🇦🇺",
            desc: "Wants to chat with you",
            full: "Hello! I'm Susan, a recently retired doctor from Melbourne. I'd love to chat with you about health, wellness, and what everyday life looks like for you.",
            price: 5,
            tags: ["Warm", "Listener", "Wellness", "Storyteller"],
            langs: ["English"],
            img: "https://i.pravatar.cc/400?img=49",
            badge: "Verified",
            badgeClass: "",
          },
          {
            id: 6,
            name: "Ahmed",
            age: 47,
            loc: "Doha, Qatar",
            flag: "🇶🇦",
            desc: "Wants to chat with you",
            full: "Hi! I'm Ahmed from Doha. I've visited 40+ countries and I'd love to chat with you about food, travel, and what makes your culture unique.",
            price: 7,
            tags: ["Adventurous", "Foodie", "Cultural", "Business"],
            langs: ["English", "Arabic"],
            img: "https://i.pravatar.cc/400?img=60",
            badge: "Premium",
            badgeClass: "premium",
          },
          {
            id: 7,
            name: "Helena",
            age: 52,
            loc: "Amsterdam, Netherlands",
            flag: "🇳🇱",
            desc: "Wants to chat with you",
            full: "Hi! I'm Helena from Amsterdam. I work in contemporary art and I'd love to chat with you about African art, fashion, and creative traditions.",
            price: 5,
            tags: ["Art", "Fashion", "Stories", "Creative"],
            langs: ["English", "Dutch"],
            img: "https://i.pravatar.cc/400?img=47",
            badge: "Popular",
            badgeClass: "",
          },
          {
            id: 8,
            name: "Carlos",
            age: 44,
            loc: "Madrid, Spain",
            flag: "🇪🇸",
            desc: "Wants to chat with you",
            full: "Hola! I'm Carlos, a chef from Madrid. I'd love to chat with you about local food, cooking traditions, and the flavours of your region.",
            price: 4,
            tags: ["Food", "Culture", "Travel", "Friendly"],
            langs: ["English", "Spanish"],
            img: "https://i.pravatar.cc/400?img=64",
            badge: "New",
            badgeClass: "",
          },
          {
            id: 9,
            name: "Sophia",
            age: 39,
            loc: "Sydney, Australia",
            flag: "🇦🇺",
            desc: "Wants to chat with you",
            full: "Hi! I'm Sophia from Sydney. I'd love to chat with you about education, raising kids, and what daily life looks like in your part of the world.",
            price: 3,
            tags: ["Education", "Curious", "Friendly", "Kind"],
            langs: ["English"],
            img: "https://i.pravatar.cc/400?img=41",
            badge: "Verified",
            badgeClass: "",
          },
          {
            id: 10,
            name: "James",
            age: 53,
            loc: "London, UK",
            flag: "🇬🇧",
            desc: "Wants to chat with you",
            full: "Hello! I'm James from London, a retired banker. I'd love to chat with you about travel, culture, and stories from your everyday life.",
            price: 6,
            tags: ["Finance", "Culture", "Travel", "Mentor"],
            langs: ["English"],
            img: "https://i.pravatar.cc/400?img=12",
            badge: "Popular",
            badgeClass: "",
          },
          {
            id: 11,
            name: "Marie",
            age: 49,
            loc: "Paris, France",
            flag: "🇫🇷",
            desc: "Wants to chat with you",
            full: "Bonjour! I'm Marie from Paris. I work in fashion and I'd love to chat with you about African textiles, art, and creative culture.",
            price: 7,
            tags: ["Fashion", "Art", "Culture", "Creative"],
            langs: ["English", "French"],
            img: "https://i.pravatar.cc/400?img=45",
            badge: "Premium",
            badgeClass: "premium",
          },
          {
            id: 12,
            name: "George",
            age: 62,
            loc: "Toronto, Canada",
            flag: "🇨🇦",
            desc: "Wants to chat with you",
            full: "Hello. I'm George from Toronto. I'd love to chat with you about life stories, everyday moments, and the things that matter most to you.",
            price: 4,
            tags: ["Companionship", "Gentle", "Listener", "Loyal"],
            langs: ["English"],
            img: "https://i.pravatar.cc/400?img=70",
            badge: "Top Earner",
            badgeClass: "top",
          },
          {
            id: 13,
            name: "Nina",
            age: 36,
            loc: "Berlin, Germany",
            flag: "🇩🇪",
            desc: "Wants to chat with you",
            full: "Hi! I'm Nina, a journalist from Berlin. I'd love to chat with you about culture, society, and authentic stories from your life.",
            price: 5,
            tags: ["Media", "Stories", "Curious", "Insightful"],
            langs: ["English", "German"],
            img: "https://i.pravatar.cc/400?img=39",
            badge: "Verified",
            badgeClass: "",
          },
          {
            id: 14,
            name: "David",
            age: 55,
            loc: "Boston, USA",
            flag: "🇺🇸",
            desc: "Wants to chat with you",
            full: "Hello! I'm David, a history professor from Boston. I'd love to chat with you about African history, culture, and the ideas shaping today's world.",
            price: 8,
            tags: ["Academic", "History", "Culture", "Thoughtful"],
            langs: ["English"],
            img: "https://i.pravatar.cc/400?img=59",
            badge: "Premium",
            badgeClass: "premium",
          },
          {
            id: 15,
            name: "Amelia",
            age: 42,
            loc: "Edinburgh, UK",
            flag: "🇬🇧",
            desc: "Wants to chat with you",
            full: "Hi! I'm Amelia from Edinburgh. I'd love to chat with you about family, health, and the small moments that make up daily life.",
            price: 3,
            tags: ["Warm", "Friendly", "Family", "Health"],
            langs: ["English"],
            img: "https://i.pravatar.cc/400?img=43",
            badge: "New",
            badgeClass: "",
          },
          {
            id: 16,
            name: "Omar",
            age: 50,
            loc: "Dubai, UAE",
            flag: "🇦🇪",
            desc: "Wants to chat with you",
            full: "Salaam! I'm Omar from Dubai. I'd love to chat with you about business, travel, and pan-African culture and opportunity.",
            price: 7,
            tags: ["Business", "Entrepreneurship", "Travel", "Visionary"],
            langs: ["English", "Arabic"],
            img: "https://i.pravatar.cc/400?img=62",
            badge: "Popular",
            badgeClass: "",
          },
          {
            id: 17,
            name: "Grace",
            age: 67,
            loc: "Dublin, Ireland",
            flag: "🇮🇪",
            desc: "Wants to chat with you",
            full: "Hello! I'm Grace from Dublin, a former librarian. I'd love to chat with you about African literature, stories, and the power of a good book.",
            price: 4,
            tags: ["Books", "Stories", "Literature", "Gentle"],
            langs: ["English"],
            img: "https://i.pravatar.cc/400?img=50",
            badge: "Verified",
            badgeClass: "",
          },
          {
            id: 18,
            name: "Peter",
            age: 46,
            loc: "Zurich, Switzerland",
            flag: "🇨🇭",
            desc: "Wants to chat with you",
            full: "Hi! I'm Peter from Zurich. I've visited 12 African countries and I'd love to chat with you about travel, adventure, and local culture.",
            price: 6,
            tags: ["Travel", "Finance", "Culture", "Adventurous"],
            langs: ["English", "German"],
            img: "https://i.pravatar.cc/400?img=65",
            badge: "Premium",
            badgeClass: "premium",
          },
          {
            id: 19,
            name: "Anna",
            age: 38,
            loc: "Stockholm, Sweden",
            flag: "🇸🇪",
            desc: "Wants to chat with you",
            full: "Hello! I'm Anna from Stockholm. I'd love to chat with you about nature, wildlife, and how communities in your area connect with the environment.",
            price: 5,
            tags: ["Nature", "Science", "Conservation", "Curious"],
            langs: ["English", "Swedish"],
            img: "https://i.pravatar.cc/400?img=44",
            badge: "New",
            badgeClass: "",
          },
          {
            id: 20,
            name: "Marco",
            age: 59,
            loc: "Rome, Italy",
            flag: "🇮🇹",
            desc: "Wants to chat with you",
            full: "Ciao! I'm Marco from Rome. I'd love to chat with you about food, recipes, and the culinary traditions that make your culture special.",
            price: 4,
            tags: ["Food", "Culture", "Travel", "Warm"],
            langs: ["English", "Italian"],
            img: "https://i.pravatar.cc/400?img=67",
            badge: "Popular",
            badgeClass: "",
          },
          {
            id: 21,
            name: "Lisa",
            age: 45,
            loc: "Vancouver, Canada",
            flag: "🇨🇦",
            desc: "Wants to chat with you",
            full: "Hello! I'm Lisa from Vancouver. I'd love to chat with you about culture, everyday life, and the experiences that have shaped who you are.",
            price: 3,
            tags: ["Empathy", "Social", "Culture", "Listener"],
            langs: ["English", "French"],
            img: "https://i.pravatar.cc/400?img=40",
            badge: "Verified",
            badgeClass: "",
          },
          {
            id: 22,
            name: "Tom",
            age: 63,
            loc: "Chicago, USA",
            flag: "🇺🇸",
            desc: "Wants to chat with you",
            full: "Hey! I'm Tom, a retired firefighter from Chicago. I'd love to chat with you about sports, life stories, and what makes your community tick.",
            price: 5,
            tags: ["Friendly", "Stories", "Sports", "Loyal"],
            langs: ["English"],
            img: "https://i.pravatar.cc/400?img=69",
            badge: "Top Earner",
            badgeClass: "top",
          },
          {
            id: 23,
            name: "Julia",
            age: 41,
            loc: "Vienna, Austria",
            flag: "🇦🇹",
            desc: "Wants to chat with you",
            full: "Hello! I'm Julia from Vienna. I'd love to chat with you about music, art, and the rich cultural traditions in your part of the world.",
            price: 6,
            tags: ["Music", "Art", "Culture", "Creative"],
            langs: ["English", "German"],
            img: "https://i.pravatar.cc/400?img=42",
            badge: "Premium",
            badgeClass: "premium",
          },
          {
            id: 24,
            name: "Hassan",
            age: 53,
            loc: "Casablanca, Morocco",
            flag: "🇲🇦",
            desc: "Wants to chat with you",
            full: "Hello! I'm Hassan from Casablanca. I'd love to chat with you about architecture, design, and how cities and communities are evolving across Africa.",
            price: 7,
            tags: ["Architecture", "Culture", "Urban", "Creative"],
            langs: ["English", "Arabic"],
            img: "https://i.pravatar.cc/400?img=61",
            badge: "Verified",
            badgeClass: "",
          },
          {
            id: 25,
            name: "Claire",
            age: 57,
            loc: "Lyon, France",
            flag: "🇫🇷",
            desc: "Wants to chat with you",
            full: "Bonjour! I'm Claire from Lyon. I'd love to chat with you about family, everyday stories, and the little things that give life meaning.",
            price: 4,
            tags: ["Warm", "Family", "Gentle", "Stories"],
            langs: ["English", "French"],
            img: "https://i.pravatar.cc/400?img=48",
            badge: "Popular",
            badgeClass: "",
          },
          {
            id: 26,
            name: "Mark",
            age: 48,
            loc: "Dublin, Ireland",
            flag: "🇮🇪",
            desc: "Wants to chat with you",
            full: "Hi! I'm Mark from Dublin. I'd love to chat with you about tech, travel, and what authentic cultural life looks like where you are.",
            price: 5,
            tags: ["Tech", "Travel", "Culture", "Open-minded"],
            langs: ["English"],
            img: "https://i.pravatar.cc/400?img=66",
            badge: "New",
            badgeClass: "",
          },
          {
            id: 27,
            name: "Elena",
            age: 44,
            loc: "Lisbon, Portugal",
            flag: "🇵🇹",
            desc: "Wants to chat with you",
            full: "Olá! I'm Elena from Lisbon. I'd love to chat with you about wellness, culture, and the different ways people around the world approach life.",
            price: 6,
            tags: ["Wellness", "Empathy", "Culture", "Listener"],
            langs: ["English", "Portuguese"],
            img: "https://i.pravatar.cc/400?img=46",
            badge: "Verified",
            badgeClass: "",
          },
        ];

        // Profile Grid
        const GRID_SLOTS = 6,
          ROTATE_INTERVAL = 5000,
          STAGGER_MS = 170,
          FADE_OUT_MS = 260,
          FADE_IN_MS = 340;
        let slotProfiles = new Array(GRID_SLOTS).fill(null),
          profileQueue = [],
          queueCursor = 0,
          rotTimer = null,
          isRotating = false;
        const slotLastChanged = new Array(GRID_SLOTS).fill(0);
        function refillQueue() {
          profileQueue = [...profileQueue, ...shuffle(ALL_PROFILES)];
        }
        function nextProfile(excludeIds) {
          const limit = profileQueue.length + ALL_PROFILES.length;
          for (let t = 0; t < limit; t++) {
            if (queueCursor >= profileQueue.length) refillQueue();
            const p = profileQueue[queueCursor++];
            if (!excludeIds.has(p.id)) return p;
          }
          return (
            ALL_PROFILES.find((p) => !excludeIds.has(p.id)) || ALL_PROFILES[0]
          );
        }
        function pickSlots(count) {
          const now = Date.now();
          const scored = Array.from({ length: GRID_SLOTS }, (_, i) => ({
            idx: i,
            score: now - slotLastChanged[i] + Math.random() * 1500,
          }));
          scored.sort((a, b) => b.score - a.score);
          return scored.slice(0, count).map((s) => s.idx);
        }

        function buildCardInner(p) {
          const t = TRANSLATIONS[currentLang];
          const stars = "★★★★★";
          // FIXED: tags now actually render on cards
          const tagsHtml = p.tags
            .slice(0, 3)
            .map((tag) => `<span class="prf-tag">${tag}</span>`)
            .join("");
          return `<div class="prf-top"><img src="${p.img}" alt="${p.name}, ${p.age} from ${p.loc}" class="prf-img" loading="lazy" /><div class="prf-img-overlay"></div><div class="prf-badge${p.badgeClass ? " " + p.badgeClass : ""}">${p.badge}</div><div class="prf-online"><div class="prf-online-dot"></div></div><div class="prf-identity"><div class="prf-name">${p.name}, ${p.age}</div><div class="prf-location">${p.flag} ${p.loc}</div></div></div><div class="prf-body"><div class="prf-rate-row"><div class="prf-rate">$${p.price}<span>/hr</span></div><div class="prf-stars" aria-label="${stars.length} stars">${stars}</div></div><p class="prf-desc">${p.desc}</p><div class="prf-tags">${tagsHtml}</div><div class="prf-actions"><button class="prf-btn-accept" data-id="${p.id}" aria-label="Accept chat request from ${p.name}"><i class="fas fa-check"></i> ${t.accept_btn || "Accept Request"}</button><button class="prf-btn-view" data-id="${p.id}" aria-label="View ${p.name}'s profile"><i class="fas fa-user"></i> ${t.view_btn || "View Profile"}</button></div></div>`;
        }

        function setupGridDelegation(grid) {
          grid.addEventListener("click", function (e) {
            const acceptBtn = e.target.closest(".prf-btn-accept");
            const viewBtn = e.target.closest(".prf-btn-view");
            if (acceptBtn && !acceptBtn.disabled) {
              const id = parseInt(acceptBtn.dataset.id, 10);
              const p = ALL_PROFILES.find((x) => x.id === id);
              if (!p) return;
              acceptBtn.disabled = true;
              acceptBtn.innerHTML = `<span style="display:inline-flex;align-items:center;gap:.3rem"><span style="width:10px;height:10px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;display:inline-block;animation:spin .55s linear infinite"></span> Accepting…</span>`;
              setTimeout(() => {
                showNotif(`🚀 Register now to start chatting with ${p.name}!`);
                openOffer(selC);
              }, 800);
            }
            if (viewBtn) {
              const id = parseInt(viewBtn.dataset.id, 10);
              const p = ALL_PROFILES.find((x) => x.id === id);
              if (p) showPMod(p);
            }
          });
        }

        function initProfileGrid() {
          const grid = $("profileGrid");
          if (!grid) return;
          profileQueue = [
            ...shuffle(ALL_PROFILES),
            ...shuffle(ALL_PROFILES),
            ...shuffle(ALL_PROFILES),
          ];
          queueCursor = 0;
          const excludeIds = new Set();
          for (let i = 0; i < GRID_SLOTS; i++) {
            const p = nextProfile(excludeIds);
            slotProfiles[i] = p;
            excludeIds.add(p.id);
            slotLastChanged[i] = Date.now() - Math.random() * 30000;
          }
          grid.innerHTML = slotProfiles
            .map(
              (p, i) =>
                `<div class="prf-card" data-slot="${i}" role="listitem">${buildCardInner(p)}</div>`,
            )
            .join("");
          setupGridDelegation(grid);
          setTimeout(startRotation, 3500);
        }

        function rotateSomeCards() {
          if (isRotating || document.hidden) return;
          const grid = $("profileGrid");
          if (!grid) return;
          const cards = grid.querySelectorAll(".prf-card[data-slot]");
          if (cards.length < GRID_SLOTS) return;
          isRotating = true;
          const count = Math.random() < 0.4 ? 3 : 2;
          const slotIndices = pickSlots(count);
          const currentIds = new Set(
            slotProfiles.filter(Boolean).map((p) => p.id),
          );
          const replacements = slotIndices.map(() => {
            const p = nextProfile(currentIds);
            currentIds.add(p.id);
            return p;
          });
          let completedCount = 0;
          slotIndices.forEach((slotIdx, batchIdx) => {
            const card = grid.querySelector(
              `.prf-card[data-slot="${slotIdx}"]`,
            );
            const newProfile = replacements[batchIdx];
            if (!card || !newProfile) {
              completedCount++;
              return;
            }
            const delay = batchIdx * STAGGER_MS;
            setTimeout(() => {
              card.style.transition = `opacity ${FADE_OUT_MS}ms ease,transform ${FADE_OUT_MS}ms ease`;
              card.style.opacity = "0";
              card.style.transform = "translateY(-10px) scale(0.96)";
              setTimeout(() => {
                card.innerHTML = buildCardInner(newProfile);
                card.style.transition = "none";
                card.style.opacity = "0";
                card.style.transform = "translateY(12px) scale(0.97)";
                requestAnimationFrame(() =>
                  requestAnimationFrame(() => {
                    card.style.transition = `opacity ${FADE_IN_MS}ms ease,transform ${FADE_IN_MS}ms cubic-bezier(0.34,1.56,0.64,1)`;
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0) scale(1)";
                  }),
                );
                slotProfiles[slotIdx] = newProfile;
                slotLastChanged[slotIdx] = Date.now();
                completedCount++;
                if (completedCount === count)
                  setTimeout(() => {
                    isRotating = false;
                  }, FADE_IN_MS + 60);
              }, FADE_OUT_MS + 20);
            }, delay);
          });
        }

        function startRotation() {
          if (rotTimer) clearInterval(rotTimer);
          rotTimer = setInterval(rotateSomeCards, ROTATE_INTERVAL);
        }
        document.addEventListener("visibilitychange", () => {
          if (document.hidden) {
            clearInterval(rotTimer);
            rotTimer = null;
          } else if (!rotTimer) startRotation();
        });

        /* ── showPMod ────────────────────────────────────────────── */
        function showPMod(p) {
          const t = TRANSLATIONS[currentLang];
          document.querySelector(".pmod") &&
            document.querySelector(".pmod").remove();
          const ov = document.createElement("div");
          ov.className = "pmod";
          ov.setAttribute("role", "dialog");
          ov.setAttribute("aria-modal", "true");
          ov.setAttribute("aria-label", `${p.name}'s profile`);
          ov.style.cssText =
            "position:fixed;inset:0;background:rgba(30,16,48,0.8);backdrop-filter:blur(20px);z-index:10010;display:flex;align-items:center;justify-content:center;padding:1rem;animation:fadeUp .25s ease";
          ov.innerHTML = `<div style="background:var(--card-0);border:1px solid var(--border-2);border-radius:18px;width:100%;max-width:600px;max-height:88vh;overflow-y:auto;box-shadow:var(--shadow-lg);animation:pop .3s var(--spring);position:relative"><button onclick="this.closest('.pmod').remove();document.body.style.overflow=''" aria-label="Close profile" style="position:absolute;top:.875rem;right:.875rem;z-index:5;width:30px;height:30px;border-radius:50%;background:var(--bg-0);border:1px solid var(--border-0);cursor:pointer;display:grid;place-items:center;font-size:.73rem;color:var(--text-2)"><i class="fas fa-times"></i></button><div style="display:flex;align-items:center;gap:1.25rem;padding:1.5rem;background:var(--card-1);border-radius:18px 18px 0 0;border-bottom:1px solid var(--border-0)"><img src="${p.img}" style="width:68px;height:68px;border-radius:50%;object-fit:cover;border:3px solid var(--border-2);flex-shrink:0" loading="lazy" alt="${p.name}"><div><div style="font-size:1.35rem;font-weight:800;color:var(--text-0)">${p.name}, ${p.age}</div><div style="font-size:.82rem;color:var(--text-2);margin-top:.18rem">${p.flag} ${p.loc}</div><div style="font-size:1.15rem;font-weight:800;color:var(--violet-4);margin-top:.28rem">$${p.price}<span style="font-size:.75rem;font-weight:400;color:var(--text-3)">/hour</span></div></div></div><div style="padding:1.5rem;border-bottom:1px solid var(--border-0)"><p style="font-size:.875rem;color:var(--text-2);line-height:1.75">${p.full}</p><div style="display:flex;flex-wrap:wrap;gap:.35rem;margin-top:.875rem">${p.tags.map((tag) => `<span style="background:var(--violet-dim);color:var(--violet-4);padding:.22rem .65rem;border-radius:6px;font-size:.76rem;font-weight:700;border:1px solid var(--border-2)">${tag}</span>`).join("")}</div></div><div style="padding:1.25rem;border-bottom:1px solid var(--border-0)"><div style="font-size:.54rem;text-transform:uppercase;letter-spacing:.1em;color:var(--text-3);margin-bottom:.35rem">Languages</div>${p.langs.map((l) => `<span style="background:var(--violet-dim);color:var(--violet-4);padding:.2rem .58rem;border-radius:6px;font-size:.74rem;font-weight:700;border:1px solid var(--border-2);margin-right:.22rem">${l}</span>`).join("")}</div><div style="padding:1.25rem;background:var(--card-1);border-radius:0 0 18px 18px"><div style="display:flex;align-items:center;gap:.5rem;background:var(--bg-0);border:1px solid var(--border-0);border-radius:8px;padding:.75rem;font-size:.82rem;color:var(--text-2);margin-bottom:.875rem"><i class="fas fa-info-circle" style="color:var(--violet-4);flex-shrink:0"></i> To chat with ${p.name}, create your account first</div><div style="display:flex;gap:.75rem;flex-wrap:wrap"><a href="${REG}" target="_blank" rel="noopener" style="flex:1;min-width:135px;display:inline-flex;align-items:center;justify-content:center;gap:.45rem;padding:.875rem;border-radius:10px;background:var(--grad-brand);color:#fff;font-weight:800;font-size:.855rem"><i class="fas fa-user-plus"></i> Create Account</a><button class="prf-btn-accept" data-id="${p.id}" style="flex:1;min-width:135px;display:inline-flex;align-items:center;justify-content:center;gap:.45rem;padding:.875rem;border-radius:10px;background:#25d350;color:#fff;font-weight:800;font-size:.855rem;border:none;cursor:pointer"><i class="fas fa-check"></i> ${t.accept_btn || "Accept Request"}</button></div></div></div>`;
          ov.addEventListener("click", (e) => {
            if (e.target === ov) {
              ov.remove();
              checkBodyScroll();
            }
          });
          ov.querySelector(".prf-btn-accept").addEventListener(
            "click",
            function () {
              if (this.disabled) return;
              this.disabled = true;
              this.innerHTML = `<span style="display:inline-flex;align-items:center;gap:.3rem"><span style="width:10px;height:10px;border:2px solid rgba(255,255,255,.35);border-top-color:#fff;border-radius:50%;display:inline-block;animation:spin .55s linear infinite"></span> Accepting…</span>`;
              setTimeout(() => {
                showNotif(`🚀 Register now to start chatting with ${p.name}!`);
                ov.remove();
                checkBodyScroll();
                openOffer(selC);
              }, 800);
            },
          );
          document.body.appendChild(ov);
          document.body.style.overflow = "hidden";
        }

        /* ── CHAT MODAL ──────────────────────────────────────────── */
        const CHAT_PROFILES = [
          {
            name: "James, 52",
            country: "United Kingdom",
            flag: "🇬🇧",
            img: "https://i.pravatar.cc/88?img=12",
            first:
              "Hi 👋 I'm James from London — I'd love to learn about your culture and daily life!",
          },
          {
            name: "Emily, 48",
            country: "United States",
            flag: "🇺🇸",
            img: "https://i.pravatar.cc/88?img=5",
            first:
              "Hi 👋 I'm Emily from Chicago — really curious about African languages!",
          },
          {
            name: "Maria, 45",
            country: "Spain",
            flag: "🇪🇸",
            img: "https://i.pravatar.cc/88?img=47",
            first:
              "Hi 👋 I'm Maria from Barcelona — I'd love a cultural exchange chat!",
          },
        ];
        let chatProfileIdx = Math.floor(Math.random() * CHAT_PROFILES.length);
        const chatOv = $("chatOv"),
          cmMsgs = $("cmMsgs"),
          cmInp = $("cmInp");
        let chatReplied = false,
          chatTmr = null;

        function addCM(side, text) {
          const now = new Date(),
            tm =
              now.getHours() + ":" + String(now.getMinutes()).padStart(2, "0");
          const d = document.createElement("div");
          d.className = "cm-msg " + side;
          d.innerHTML = `<div class="cm-bub">${text}</div><div class="cm-t">${tm}</div>`;
          if (cmMsgs) {
            cmMsgs.appendChild(d);
            cmMsgs.scrollTop = cmMsgs.scrollHeight;
          }
          return d;
        }
        function addTyping() {
          const d = document.createElement("div");
          d.className = "cm-msg them";
          d.innerHTML =
            '<div class="typing"><span></span><span></span><span></span></div>';
          if (cmMsgs) {
            cmMsgs.appendChild(d);
            cmMsgs.scrollTop = cmMsgs.scrollHeight;
          }
          return d;
        }

        function openChat() {
          const p = CHAT_PROFILES[chatProfileIdx % CHAT_PROFILES.length];
          chatProfileIdx++;
          chatReplied = false;
          clearTimeout(chatTmr);
          if (cmInp) {
            cmInp.value = "";
            cmInp.disabled = false;
            cmInp.placeholder = "Type a friendly reply…";
          }
          const sendBtn = $("cmSend");
          if (sendBtn) sendBtn.disabled = false;
          if (cmMsgs) cmMsgs.innerHTML = "";
          const nameEl = $("cmName");
          if (nameEl)
            nameEl.textContent = p.name + " · " + p.country + " " + p.flag;
          const avEl = $("cmAv");
          if (avEl) avEl.src = p.img;
          chatOv && chatOv.classList.add("on");
          document.body.style.overflow = "hidden";
          const ty1 = addTyping();
          chatTmr = setTimeout(() => {
            ty1.remove();
            addCM("them", p.first);
            cmInp && cmInp.focus();
          }, 2200);
        }
        function closeChat() {
          chatOv && chatOv.classList.remove("on");
          clearTimeout(chatTmr);
          checkBodyScroll();
        }
        $("cmX") && $("cmX").addEventListener("click", closeChat);
        chatOv &&
          chatOv.addEventListener("click", (e) => {
            if (e.target === chatOv) closeChat();
          });

        function sendMsg() {
          if (chatReplied) return;
          const txt = ((cmInp && cmInp.value) || "").trim();
          if (!txt) return;
          if (cmInp) {
            cmInp.value = "";
            cmInp.disabled = true;
            cmInp.placeholder = "Please wait…";
          }
          const sendBtn = $("cmSend");
          if (sendBtn) sendBtn.disabled = true;
          clearTimeout(chatTmr);
          chatReplied = true;
          addCM("me", txt);
          const ty = addTyping();
          chatTmr = setTimeout(() => {
            ty.remove();
            closeChat();
            openOffer(selC);
          }, 3000);
        }
        $("cmSend") && $("cmSend").addEventListener("click", sendMsg);
        cmInp &&
          cmInp.addEventListener("keypress", (e) => {
            if (e.key === "Enter") sendMsg();
          });
        $("openDemo") && $("openDemo").addEventListener("click", openChat);

        /* ── OFFER MODAL ─────────────────────────────────────────── */
        const offerOv = $("offerOv");
        function openOffer(c) {
          c = c || COUNTRIES[0];
          $("omFlag").textContent = c.flag;
          $("omName").textContent = c.name;
          $("opOld").textContent = c.old;
          $("opNow").textContent = c.fee;
          $("omRibbon").textContent = c.disc + " OFF";
          $("omBadge").textContent = c.disc + " OFF — LIMITED TIME";
          $("opSave").textContent =
            "✅ You save " + c.save + " — limited time!";
          $("omUrgency").textContent = c.urg;
          $("offerCtaTxt").textContent = "Register Here";
          $("omBg").style.backgroundImage = "url('" + c.img + "')";
          offerOv.classList.add("on");
          document.body.style.overflow = "hidden";
        }
        function closeOffer() {
          offerOv && offerOv.classList.remove("on");
          checkBodyScroll();
        }
        $("offerClose") &&
          $("offerClose").addEventListener("click", closeOffer);
        offerOv &&
          offerOv.addEventListener("click", (e) => {
            if (e.target === offerOv) closeOffer();
          });
        $("offerCta") &&
          $("offerCta").addEventListener("click", () => {
            closeOffer();
            setTimeout(() => (window.location.href = REG), 300);
          });
        setTimeout(() => {
          if (offerOv && !offerOv.classList.contains("on")) openOffer(selC);
        }, 30000);

        /* ── ACCOUNT MODAL ───────────────────────────────────────── */
        window.openAcctModal = function () {
          $("acctOv").classList.add("on");
          document.body.style.overflow = "hidden";
        };
        $("acctClose") &&
          $("acctClose").addEventListener("click", () => {
            $("acctOv").classList.remove("on");
            checkBodyScroll();
          });
        $("acctOv") &&
          $("acctOv").addEventListener("click", (e) => {
            if (e.target === $("acctOv")) {
              $("acctOv").classList.remove("on");
              checkBodyScroll();
            }
          });

        /* ─── BODY-SCROLL GUARD ──────────────────────────────────────── */
        function checkBodyScroll() {
          const anyOpen = ["offerOv", "chatOv", "lmOv", "acctOv"].some((id) => {
            const el = $(id);
            return el && el.classList.contains("on");
          });
          if (!anyOpen && !document.querySelector(".pmod")) document.body.style.overflow = "";
        }

        /* ─── MOBILE NAV ─────────────────────────────────────────────── */
        const ham = $("ham"),
          mobNav = $("mobNav");

        function closeMob() {
          if (!ham || !mobNav) return;
          ham.classList.remove("x");
          mobNav.classList.remove("open");
          ham.setAttribute("aria-expanded", "false");
          checkBodyScroll();
        }
        function openMob() {
          if (!ham || !mobNav) return;
          ham.classList.add("x");
          mobNav.classList.add("open");
          ham.setAttribute("aria-expanded", "true");
          document.body.style.overflow = "hidden";
        }
        ham &&
          ham.addEventListener("click", (e) => {
            e.stopPropagation();
            mobNav.classList.contains("open") ? closeMob() : openMob();
          });
        mobNav &&
          mobNav
            .querySelectorAll("a")
            .forEach((a) => a.addEventListener("click", closeMob));
        document.addEventListener("click", (e) => {
          if (
            mobNav &&
            mobNav.classList.contains("open") &&
            !mobNav.contains(e.target) &&
            ham &&
            !ham.contains(e.target)
          )
            closeMob();
        });

        /* ─── ESC KEY ────────────────────────────────────────────────── */
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") {
            closeChat();
            closeOffer();
            closeLegal();
            $("acctOv") && $("acctOv").classList.remove("on");
            document.querySelector(".pmod") &&
              document.querySelector(".pmod").remove();
            checkBodyScroll();
          }
        });

        const closeBtn = document.getElementById("waCloseBtn");
        const messageBox = document.getElementById("waMessage");

        const isClosedThisSession = sessionStorage.getItem("waMessageClosed");

        if (isClosedThisSession === "true") {
          messageBox.classList.add("hidden");
        }

        closeBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          messageBox.classList.add("hidden");

          sessionStorage.setItem("waMessageClosed", "true");
        });

        /* ─── EARNINGS CALCULATOR ────────────────────────────────────── */
        const cChats = $("cChats"),
          cRate = $("cRate"),
          cRes = $("cResult");

        function upCalc() {
          if (!cChats || !cRate) return;
          const ch = parseInt(cChats.value),
            rt = parseInt(cRate.value);
          if (cRes) cRes.textContent = "$" + fmt(ch * rt * 30);
          const chV = $("cChatsV");
          if (chV) chV.textContent = ch;
          const rtV = $("cRateV");
          if (rtV) rtV.textContent = "$" + rt;
          cChats.style.setProperty(
            "--v",
            (((ch - 1) / 9) * 100).toFixed(1) + "%",
          );
          cRate.style.setProperty(
            "--v",
            (((rt - 2) / 6) * 100).toFixed(1) + "%",
          );
        }
        cChats && cChats.addEventListener("input", upCalc);
        cRate && cRate.addEventListener("input", upCalc);
        upCalc();

        /* ─── LIVE COUNTERS ──────────────────────────────────────────── */
        let todayBase = 3240;
        setInterval(() => {
          if (!document.hidden) {
            todayBase += Math.floor(Math.random() * 10) + 2;
            const e = $("todayEarned");
            if (e) e.textContent = "$" + fmt(todayBase);
          }
        }, 2000);

        let lc = 3847;
        setInterval(() => {
          if (!document.hidden) {
            lc = Math.max(600, lc + Math.floor(Math.random() * 8) - 3);
            const e = $("liveCount");
            if (e) e.textContent = fmt(lc);
          }
        }, 2000);

        let rc = 1312;
        setInterval(() => {
          if (!document.hidden) {
            rc = Math.max(
              200,
              rc + Math.floor(Math.random() * 7) - 3,
            );
            const e = $("activeReqCount");
            if (e) e.textContent = fmt(rc);
          }
        }, 2000);

        /* ─── SCROLL HANDLER ─────────────────────────────────────────── */
        let lastY = 0,
          sTick = false;

        function onScroll() {
          const sy = window.scrollY,
            dh = document.documentElement.scrollHeight - window.innerHeight;
          const navEl = $("nav");
          navEl && navEl.classList.toggle("solid", sy > 50);
          const np = $("nprog");
          if (np) np.style.width = (dh > 0 ? (sy / dh) * 100 : 0) + "%";
          const sb = $("stickyBar");
          if (sb)
            sy > 600 && sy < lastY
              ? sb.classList.add("show")
              : sb.classList.remove("show");
          lastY = sy;
          sTick = false;
        }
        window.addEventListener(
          "scroll",
          () => {
            if (!sTick) {
              requestAnimationFrame(onScroll);
              sTick = true;
            }
          },
          { passive: true },
        );

        /* ─── INTERSECTION OBSERVER (fade-up + count-up) ────────────── */
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (!e.isIntersecting) return;
              const el = e.target;
              if (el.classList.contains("fu")) el.classList.add("vis");
              if (el.dataset.count && !el.dataset.animated) {
                el.dataset.animated = "1";
                const target = parseInt(el.dataset.count),
                  dur = 2000,
                  s = performance.now();
                const run = (now) => {
                  const p = Math.min((now - s) / dur, 1),
                    v = Math.floor(target * (1 - Math.pow(1 - p, 3)));
                  el.textContent = fmt(v);
                  if (p < 1) requestAnimationFrame(run);
                  else el.textContent = fmt(target);
                };
                requestAnimationFrame(run);
              }
            });
          },
          { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
        );
        document
          .querySelectorAll(".fu,[data-count]")
          .forEach((el) => io.observe(el));

        /* ─── NOTIFICATIONS ──────────────────────────────────────────── */
        let nT = null;
        function showNotif(msg) {
          const n = $("notif"),
            t = $("notifTxt");
          if (!n || !t) return;
          t.textContent = msg;
          n.classList.add("show");
          clearTimeout(nT);
          nT = setTimeout(() => n.classList.remove("show"), 3500);
        }

        /* ─── FAQ ────────────────────────────────────────────────────── */
        const FAQS = [
          {
            q: "How do I get paid?",
            a: "Once your balance reaches the $5 minimum, withdraw via PayPal, bank transfer, M-Pesa, MTN Money, or Airtel Money. Payments process within 2 hours with zero withdrawal fees.",
          },
          {
            q: "What are the 5 ways to earn?",
            a: "Per hour (auto-tracked), per message (every reply), per completed session (flat fee), voluntary tips from clients, and daily rewards for consistent activity.",
          },
          {
            q: "How much can I realistically earn per month?",
            a: "Results vary by activity. Members doing 3–5 chats daily typically earn $50–$200/month. Highly active members can earn $200–$350/month. Base rate is $2–$8 per hour. Figures depend entirely on your effort.",
          },
          {
            q: "What kinds of chats will I have?",
            a: "Culture, travel, daily life, companionship, and advice — with clients from UK, USA, Canada, Qatar, Malaysia and more. All chats are friendly, text-only, and appropriate. No misleading content.",
          },
          {
            q: "How much time do I need to commit?",
            a: "There's no minimum. One 30-minute chat or several hours daily — you set your own schedule. Most clients are active evenings and weekends.",
          },
          {
            q: "Why is there a registration fee?",
            a: "The small one-time fee covers verification, platform setup, and access costs. Most active members recover it within their first week of chatting.",
          },
          {
            q: "Is this legitimate?",
            a: "Yes. TaskPay is registered in Kenya and operates across multiple African countries. We've paid out over $890K to verified earners and publish our earnings disclaimer openly.",
          },
        ];
        const fw = $("faqWrap");
        if (fw) {
          const fr = document.createDocumentFragment();
          FAQS.forEach((f) => {
            const d = document.createElement("div");
            d.className = "faq-item";
            d.innerHTML = `<div class="faq-q">${f.q} <i class="fas fa-chevron-down"></i></div><div class="faq-a">${f.a}</div>`;
            const qDiv = d.querySelector(".faq-q"),
              aDiv = d.querySelector(".faq-a");
            qDiv.addEventListener("click", () => {
              const wasOpen = aDiv.classList.contains("open");
              document
                .querySelectorAll(".faq-a")
                .forEach((x) => x.classList.remove("open"));
              document
                .querySelectorAll(".faq-q")
                .forEach((x) => x.classList.remove("open"));
              if (!wasOpen) {
                aDiv.classList.add("open");
                qDiv.classList.add("open");
              }
            });
            fr.appendChild(d);
          });
          fw.appendChild(fr);
        }

        /* ─── LEGAL MODAL ────────────────────────────────────────────── */
        const LEGAL = {
          terms: {
            icon: "📄",
            title: "Terms of Service",
            body: "<h3>1. Acceptance of Terms</h3><p>By registering with TaskPay, you join a growing platform designed to help users earn online through simple and flexible opportunities.</p><h3>2. Eligibility</h3><ul><li>You must be at least 18 years old</li><li>You must have a valid identity document</li><li>You agree to provide truthful information during registration</li></ul><h3>3. Registration Fee</h3><p>The one-time registration fee helps us verify accounts, maintain platform quality, and provide secure access to earning opportunities. Once your account is activated, you can access all available earning methods with no recurring monthly charges.</p><h3>4. Earner Conduct</h3><ul><li>All conversations must remain respectful and professional</li><li>All conversations should be handled within the app for your safety and account protection</li><li>You may not solicit personal information from clients</li><li>Harassment or inappropriate content will result in immediate account termination</li></ul><h3>5. Payments</h3><p>Earnings are paid once you reach the $5 minimum withdrawal threshold. Most payments are processed within 2 hours, and TaskPay does not charge withdrawal fees.</p>",
          },

          privacy: {
            icon: "🔐",
            title: "Privacy Policy",
            body: "<h3>1. Information We Collect</h3><ul><li>Name and contact information during registration</li><li>Payment information (processed securely and never stored directly on our servers)</li><li>Conversation activity data to improve platform quality and user experience</li></ul><h3>2. How We Use Your Information</h3><ul><li>To verify your identity and protect users from fraud</li><li>To process your earnings quickly and securely</li><li>To improve customer support and platform performance</li></ul><h3>3. Your Privacy Matters</h3><ul><li>We do not sell your personal information to third parties</li><li>Your information is protected and handled securely</li><li>We only use your data to support your experience on TaskPay</li></ul><h3>4. Your Rights</h3><ul><li>Right to access your personal data</li><li>Right to correct inaccurate information</li><li>Right to request account deletion at any time</li></ul>",
          },

          disclaimer: {
            icon: "⚠️",
            title: "Earnings Disclaimer",
            body: "<h3>Important Notice — Please Read</h3><p>TaskPay is committed to transparency and helping users understand realistic earning expectations.</p><h3>Realistic Expectations</h3><ul><li>Many new members begin earning within their first few days after activation</li><li>Members active for 3–5 hours daily commonly earn between $100–$300/month</li><li>Highly active and consistent members may earn $300–$850/month over time</li><li>Your results can grow significantly with consistency, effort, and quality engagement</li></ul><h3>Factors That Affect Earnings</h3><ul><li>Hours invested per day and days active per week</li><li>Which earning methods you activate</li><li>Conversation quality and client satisfaction</li></ul><h3>No Income Guarantee</h3><p>While many users earn successfully on TaskPay, earnings vary from person to person based on effort and activity level. The registration fee is non-refundable once account access has been granted.</p>",
          },
        };

        window.openLegal = function (type) {
          switchLegal(type);
          $("lmOv") && $("lmOv").classList.add("on");
          document.body.style.overflow = "hidden";
        };
        window.switchLegal = function (type) {
          document
            .querySelectorAll(".lm-tab")
            .forEach((t) => t.classList.toggle("on", t.dataset.doc === type));
          const c = LEGAL[type];
          if (!c) return;
          const lt = $("lmTitle"),
            li = $("lmIcon"),
            lb = $("lmBody");
          if (lt) lt.textContent = c.title;
          if (li) li.textContent = c.icon;
          if (lb) {
            lb.innerHTML = c.body;
            lb.scrollTop = 0;
          }
        };
        function closeLegal() {
          $("lmOv") && $("lmOv").classList.remove("on");
          checkBodyScroll();
        }
        $("lmX") && $("lmX").addEventListener("click", closeLegal);
        $("lmOv") &&
          $("lmOv").addEventListener("click", function (e) {
            if (e.target === this) closeLegal();
          });
        document.querySelectorAll(".legal-card").forEach((c) => {
          c.addEventListener("keypress", (e) => {
            if (e.key === "Enter" || e.key === " ") c.click();
          });
        });

        /* ─── SOCIAL PROOF POPUPS ────────────────────────────────────── */
        const names = [
          "Sarah",
          "John",
          "Maria",
          "David",
          "Linda",
          "Grace",
          "Amina",
          "Paul",
        ];
        const cities = [
          "Nairobi",
          "Lagos",
          "Dar es Salaam",
          "Accra",
          "Kampala",
          "Enugu",
          "Mombasa",
          "Johannesburg",
        ];

        const actions = [
          { i: "fa-user-plus", t: "just activated their account" },
          { i: "fa-comment", t: "started chatting with a client abroad" },
          { i: "fa-dollar-sign", t: "completed a chat and earned" },
          { i: "fa-fire", t: "unlocked a 7-day streak bonus" },
          { i: "fa-star", t: "received a 5-star rating" },
          { i: "fa-gift", t: "received a tip from a satisfied client" },
        ];

        const spW = $("spWrap");
        let spBusy = false;
        let lastMessage = "";

        // generate realistic name
        function getRandomName() {
          const name = names[Math.floor(Math.random() * names.length)];
          const city = cities[Math.floor(Math.random() * cities.length)];
          return `${name} from ${city}`;
        }

        // prevent repetition
        function generateUnique() {
          let msg;
          do {
            const n = getRandomName();
            const a = actions[Math.floor(Math.random() * actions.length)];
            msg = `<i class="fas ${a.i}"></i><span><strong>${n}</strong> ${a.t}</span>`;
          } while (msg === lastMessage);

          lastMessage = msg;
          return msg;
        }

        function showSP() {
          if (!spW || spBusy || document.hidden) return;

          spBusy = true;

          const el = document.createElement("div");
          el.className = "sp-item";

          el.innerHTML = generateUnique();

          spW.appendChild(el);

          // auto remove
          const lifetime = Math.floor(Math.random() * 3000) + 6000; // 6–9 sec

          setTimeout(() => {
            el.style.opacity = "0";
            el.style.transition = "opacity .4s ease";

            setTimeout(() => {
              el.remove();
              spBusy = false;
            }, 400);
          }, lifetime);
        }

        function loopSP() {
          showSP();

          const next = Math.floor(Math.random() * 6000) + 9000; // 9–15 sec

          setTimeout(loopSP, next);
        }

        // start
        setTimeout(loopSP, 8000);

        /* ─── COOKIE CONSENT ─────────────────────────────────────────── */
        const hasCk = () => {
          try {
            return !!localStorage.getItem("TaskPay_ck");
          } catch {
            return true;
          }
        };
        const setCk = (v) => {
          try {
            localStorage.setItem("TaskPay_ck", v);
          } catch {}
        };
        if (!hasCk())
          setTimeout(
            () => $("cookieBar") && $("cookieBar").classList.add("show"),
            3500,
          );
        $("cookieOk") &&
          $("cookieOk").addEventListener("click", () => {
            setCk("true");
            $("cookieBar") && $("cookieBar").classList.remove("show");
          });
        $("cookieNo") &&
          $("cookieNo").addEventListener("click", () => {
            setCk("false");
            $("cookieBar") && $("cookieBar").classList.remove("show");
          });

        /* ─── SMOOTH ANCHOR SCROLL ───────────────────────────────────── */
        document.querySelectorAll('a[href^="#"]').forEach((a) => {
          a.addEventListener("click", (e) => {
            const id = a.getAttribute("href").slice(1),
              el = document.getElementById(id);
            if (el) {
              e.preventDefault();
              closeMob();
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          });
        });

        /* ─── INIT LEGAL MODAL DEFAULT TAB ──────────────────────────── */
        window.switchLegal("terms");

        /* ─── INITIALISE PROFILE GRID (last, so helpers are available) ─ */
        initProfileGrid();
      })();
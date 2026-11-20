// 醜果翻身記 ── 平台主控系統

// 格外品市集資料庫 (初始資料)
let MARKET_PRODUCTS = [
    {
        id: "prod-1",
        name: "有機認證草莓 (外表微凹痕)",
        farmer: "大湖張小農",
        type: "草莓",
        grade: "A",
        weight: 85,
        price: 120,
        carbon: 2.1,
        location: "苗栗大湖",
        county: "苗栗",
        image: "assets/strawberry_ugly.png",
        desc: "底部有些微小風疤、形狀較長，但肉質緊實，甜度高達13度。適合作為烘焙派塔原料或手工果醬。"
    },
    {
        id: "prod-2",
        name: "金鑽鳳梨 (雙生畸形)",
        farmer: "關廟黃農友",
        type: "鳳梨",
        grade: "B",
        weight: 150,
        price: 40,
        carbon: 1.8,
        location: "台南關廟",
        county: "台南",
        image: "assets/pineapple_ugly.png",
        desc: "雙生連體果，外皮輕微曬斑，外觀不對稱，無法進入一般超市，但纖維細緻，甜度高，加工廠首選。"
    },
    {
        id: "prod-3",
        name: "高海拔無毒蘋果 (天然疤點)",
        farmer: "東勢林農夫",
        type: "蘋果",
        grade: "B",
        weight: 120,
        price: 60,
        carbon: 1.5,
        location: "台中東勢",
        county: "台中",
        image: "assets/apple_ugly.png",
        desc: "無農藥種植，表皮附有天然疤痕及黑星褐斑。外表不好看，但口感極佳脆甜，適合烘焙蘋果派或切片乾縮。"
    },
    {
        id: "prod-4",
        name: "香甜山蕉 (表面成熟黑斑)",
        farmer: "高雄陳農友",
        type: "香蕉",
        grade: "C",
        weight: 200,
        price: 10,
        carbon: 1.2,
        location: "高雄大樹",
        county: "高雄",
        image: "assets/banana_ugly.png",
        desc: "本季盛產，香蕉熟度高，表面大面積成熟黑芝麻斑點，果肉十分軟綿香濃。適合食品加工或做為生態肥料。"
    },
    {
        id: "prod-5",
        name: "分岔胡蘿蔔 (多腿奇特外觀)",
        farmer: "東勢林農夫",
        type: "胡蘿蔔",
        grade: "B",
        weight: 160,
        price: 25,
        carbon: 1.1,
        location: "台中東勢",
        county: "台中",
        image: "assets/carrot_ugly.png",
        desc: "因土壤多碎石阻擋主根分岔長出多條分肢，外表十分滑稽。胡蘿蔔素含量高、清甜多汁，適合榨汁或打泥、做咖哩與配料。"
    },
    {
        id: "prod-6",
        name: "有機高麗菜 (最外層蟲咬)",
        farmer: "大湖張小農",
        type: "高麗菜",
        grade: "A",
        weight: 90,
        price: 30,
        carbon: 0.9,
        location: "苗栗大湖",
        county: "苗栗",
        image: "assets/cabbage_ugly.png",
        desc: "友善栽培，最外圍葉子有輕微小蟲咬孔洞，且單顆重量偏輕。剝除外層菜葉後內部清脆甘甜，極適合小吃炒菜與包水餃。"
    },
    {
        id: "prod-7",
        name: "珍珠芭樂 (表面風疤磨損)",
        farmer: "燕巢陳農友",
        type: "芭樂",
        grade: "B",
        weight: 120,
        price: 35,
        carbon: 1.6,
        location: "高雄燕巢",
        county: "高雄",
        image: "assets/guava_ugly.png",
        desc: "珍珠芭樂外皮有輕微枝條摩擦產生的褐色風疤痕跡，果實形狀微歪斜。口感依然脆嫩多汁、維他命C極高，適合現切切片或打果汁。"
    },
    {
        id: "prod-8",
        name: "牛番茄 (蒂頭自然裂紋)",
        farmer: "美濃林小農",
        type: "番茄",
        grade: "B",
        weight: 80,
        price: 45,
        carbon: 1.4,
        location: "高雄美濃",
        county: "高雄",
        image: "assets/tomato_ugly.png",
        desc: "成熟期吸收水分過快導致蒂頭處有輕微乾縮裂口，外表部分呈綠黃色。酸甜適中，極適合熬煮番茄湯底或炒蛋。"
    }
];

// 當前結帳狀態變數
let activeCheckoutItem = null;
let selectedLogisticsFactor = 0.9; // 預設小農共配

// 店家即時採購公告清單 (Uber Eats 模式資料庫)
let BUYER_DEMAND_BULLETINS = [
    {
        id: "demand-1",
        shopName: "彰化員林 - 石蓮社福食堂",
        crop: "草莓",
        weight: 50,
        grade: "B 級以上",
        urgency: "緊急採購",
        reward: "NT$ 5,000",
        desc: "徵求 A 或 B 級格外草莓做成弱勢供餐水果盤與果醬原料，需在同縣市或鄰近配送。"
    },
    {
        id: "demand-2",
        shopName: "彰化員林 - 小陽光烘焙坊",
        crop: "香蕉",
        weight: 30,
        grade: "C 級 (做蛋糕)",
        urgency: "今日採購",
        reward: "NT$ 300",
        desc: "徵求熟成山蕉 C 級製作香蕉磅蛋糕，外觀黑斑不限，只要熟化果肉香甜即可。"
    },
    {
        id: "demand-3",
        shopName: "台南關廟 - 蜜糖果醬工廠",
        crop: "鳳梨",
        weight: 100,
        grade: "B 級加工",
        urgency: "一般需求",
        reward: "NT$ 3,500",
        desc: "尋求格外金鑽鳳梨 B 級加工果醬，歡迎整車對接，食物里程優先考量。"
    }
];

// 網頁載入完成後執行
document.addEventListener('DOMContentLoaded', () => {
    // 1. 初始化導覽列與分頁切換
    initNavigation();
    
    // 2. 初始化 AI 分級辨識
    initAIGrading();
    
    // 3. 渲染市集商品
    renderMarketplace();
    
    // 4. 監聽市集篩選
    initMarketFilters();
    
    // 5. 初始化 ESG 儀表板與地圖
    initDashboard();

    // 6. 渲染 Uber Eats 採購需求看板
    renderDemandBulletins();

    // 監聽雜項：點擊確認付款
    document.getElementById('btn-confirm-checkout').addEventListener('click', confirmCheckoutTransaction);

    // 7. 初始化商品上架表格與動態減碳排係數
    renderInventoryList();
    initManualUploadCarbonListener();

});

// 導覽分頁切換邏輯
function initNavigation() {
    const tabItems = document.querySelectorAll('.nav-tab-item');
    
    tabItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // 點擊 Logo 回到首頁
    const logo = document.getElementById('nav-logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            switchTab('tab-home');
        });
    }

    // 支援網頁錨點 (hash) 重新導向正確分頁
    const hash = window.location.hash;
    if (hash === '#ai-portal') switchTab('tab-ai');
    else if (hash === '#low-carbon-map') switchTab('tab-map');
    else if (hash === '#marketplace') switchTab('tab-market');
    else if (hash === '#upload') switchTab('tab-upload');
    else if (hash === '#circular') switchTab('tab-circular');
    else if (hash === '#dashboard') switchTab('tab-dashboard');
    else if (hash === '#member') switchTab('tab-member');
}

// 主分頁切換
function switchTab(tabId) {
    // 1. 更新導航選單中 Active 狀態
    const tabItems = document.querySelectorAll('.nav-tab-item');
    tabItems.forEach(item => {
        if (item.getAttribute('data-tab') === tabId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // 2. 顯示對應分頁，隱藏其他分頁
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        if (content.id === tabId) {
            content.style.display = 'block';
            content.classList.add('active');
        } else {
            content.style.display = 'none';
            content.classList.remove('active');
        }
    });

    // 3. 特殊初始化 (地圖必須在其 Container 顯示後才能正確繪製尺寸)
    if (tabId === 'tab-map') {
        setTimeout(() => {
            initMapModule();
            // 強制 Leaflet 重新整理尺寸以防破損
            if (map) map.invalidateSize();
        }, 100);
    }

    if (tabId === 'tab-upload') {
        renderInventoryList();
    }
    
    // 每次切換分頁滾動至最頂端
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 渲染市集產品
function renderMarketplace() {
    const grid = document.getElementById('market-products-grid');
    if (!grid) return;
    grid.innerHTML = "";

    const filterType = document.getElementById('filter-type').value;
    const filterGrade = document.getElementById('filter-grade').value;
    const filterLocation = document.getElementById('filter-location').value;

    MARKET_PRODUCTS.forEach(prod => {
        // 篩選過濾
        if (filterType !== 'all' && prod.type !== filterType) return;
        if (filterGrade !== 'all' && prod.grade !== filterGrade) return;
        if (filterLocation !== 'all' && !prod.county.includes(filterLocation)) return;

        const card = document.createElement('div');
        card.className = 'glass-card product-card';
        card.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${prod.image}" alt="${prod.name}">
                <span class="grade-badge ${prod.grade.toLowerCase()}">等級 ${prod.grade}</span>
                <span class="carbon-badge"><i class="fa-solid fa-leaf"></i> 減碳 -${prod.carbon}kg/kg</span>
            </div>
            <div class="product-info">
                <div class="product-title-row">
                    <h4>${prod.name}</h4>
                    <span class="product-price">NT$ ${prod.price}/kg</span>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.4; min-height: 40px;">${prod.desc}</p>
                <div class="product-meta-row">
                    <span><i class="fa-solid fa-farm"></i> 產地: ${prod.location}</span>
                    <span>庫存: <b>${prod.weight} kg</b></span>
                </div>
                <div class="product-action-row" style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem; border-top: 1px solid rgba(255,255,255,0.05); padding-top:1rem;">
                    <button class="btn btn-secondary" onclick="openFarmerChat('${prod.farmer}', '${prod.name}')" style="padding:0.5rem 0.75rem; font-size:0.85rem;">
                        <i class="fa-solid fa-comments"></i> 聯絡小農
                    </button>
                    <button class="btn btn-primary btn-buy" onclick="openCheckoutModal('${prod.id}')" style="padding:0.5rem 0.75rem; font-size:0.85rem;">
                        <i class="fa-solid fa-cart-shopping"></i> 購買格外品
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    if (grid.children.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-muted);">
                <i class="fa-solid fa-store-slash" style="font-size: 3rem; margin-bottom: 1rem; color: rgba(255,255,255,0.1);"></i>
                <p>找不到符合篩選條件的格外品，請嘗試其他篩選選項。</p>
            </div>
        `;
    }
}

// 監聽篩選欄位變動
function initMarketFilters() {
    document.getElementById('filter-type').addEventListener('change', renderMarketplace);
    document.getElementById('filter-grade').addEventListener('change', renderMarketplace);
    document.getElementById('filter-location').addEventListener('change', renderMarketplace);
}

// 渲染 Uber Eats 模式店家需求看板
function renderDemandBulletins() {
    const grid = document.getElementById('bulletin-board-grid');
    if (!grid) return;
    grid.innerHTML = "";

    BUYER_DEMAND_BULLETINS.forEach(item => {
        const card = document.createElement('div');
        card.className = "glass-card bulletin-card";
        card.innerHTML = `
            <div class="bulletin-tag-row">
                <span class="story-tag" style="background:rgba(249,115,22,0.1); border-color:rgba(249,115,22,0.2); color:var(--accent-light);"><i class="fa-solid fa-shop"></i> 店家採購需求</span>
                <span class="urgency-badge"><i class="fa-solid fa-bolt"></i> ${item.urgency}</span>
            </div>
            <div class="bulletin-body">
                <h4>${item.crop} 採購 ── ${item.weight} 公斤</h4>
                <p>${item.desc}</p>
            </div>
            <div class="bulletin-meta">
                <span>需求等級: <strong>${item.grade}</strong></span>
                <span>需求報酬: <strong style="color:var(--primary-light);">${item.reward}</strong></span>
            </div>
            <div style="border-top:1px solid rgba(255,255,255,0.05); padding-top:0.8rem; margin-top:0.25rem;">
                <button class="btn btn-accept-order" onclick="farmerAcceptDemandOrder('${item.id}')">
                    <i class="fa-solid fa-circle-check"></i> 立即搶單出貨
                </button>
            </div>
        `;
        grid.appendChild(card);
    });

    if (BUYER_DEMAND_BULLETINS.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
                <i class="fa-solid fa-circle-check" style="font-size: 2.5rem; margin-bottom: 0.8rem; color: var(--primary-light);"></i>
                <p>目前沒有即時採購公告，所有需求均已被小農接單處理完成！</p>
            </div>
        `;
    }
}

// 模擬小農接單 (Uber Eats 搶單模式)
function farmerAcceptDemandOrder(demandId) {
    const demand = BUYER_DEMAND_BULLETINS.find(d => d.id === demandId);
    if (!demand) return;

    // 播放滿足的競賽加分音效 (Web Audio Synthesizer)
    playAcceptChime();

    // 模擬接單計算減碳量 (以 120km 對接里程算)
    const carbonSaved = parseFloat((demand.weight * 1.5 * 0.9).toFixed(1)); // 模擬碳排放節省
    const totalEarnings = demand.weight * 80; // 模擬收益

    // 更新統計與動態牆
    updateGlobalESGCounters(demand.weight, carbonSaved, totalEarnings);
    addMatchmakingToFeed("小農一鍵接單", demand.shopName, demand.crop, carbonSaved);

    // 從需求庫中移除
    BUYER_DEMAND_BULLETINS = BUYER_DEMAND_BULLETINS.filter(d => d.id !== demandId);
    renderDemandBulletins();

    showToast(`⚡ 【接單成功】已為您通知綠色低碳物流司機！現正派車前往您果園載運【${demand.crop}格外品 ${demand.weight}kg】，本次接單預估可減碳 ${carbonSaved}kg CO2e！`);
}

// 線上合成接單 DING 音效，增加競賽現場展示的高級感
function playAcceptChime() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(783.99, audioCtx.currentTime + 0.12); // G5
        osc.frequency.exponentialRampToValueAtTime(1046.50, audioCtx.currentTime + 0.25); // C6
        
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.45);
    } catch(e) {
        console.log("Audio contexts not supported or blocked by user gesture");
    }
}
// 外部呼叫：農民一鍵上架，將新分析完的格外品新增至市集
function listUglyFruitToMarketplace(fruitData, weight, location) {
    const randomId = "prod-" + Date.now();
    const county = location.substring(0, 2); // 取前兩個字為縣市
    const expiry = document.getElementById('list-expiry').value || "5天";
    
    const newProduct = {
        id: randomId,
        name: `${fruitData.name} (產地直送格外品)`,
        farmer: fruitData.farmer || `${county}小農友`,
        type: fruitData.name.replace('自訂-', ''),
        grade: fruitData.grade,
        weight: weight,
        price: fruitData.price,
        carbon: fruitData.carbon,
        location: location,
        county: county,
        image: fruitData.image,
        desc: `${fruitData.desc} (保存期限：約 ${expiry})`
    };

    // 將新商品推入市集最前列
    MARKET_PRODUCTS.unshift(newProduct);
    
    // 重新繪製市集
    renderMarketplace();

    // 如果地圖已經載入，同時在地圖中臨時註冊一個新小農，增加真實對接體驗
    if (map) {
        let newCoords = [24.4245 + (Math.random() - 0.5) * 0.05, 120.8712 + (Math.random() - 0.5) * 0.05];
        if (location.includes("台南")) {
            newCoords = [22.9621 + (Math.random() - 0.5) * 0.05, 120.3278 + (Math.random() - 0.5) * 0.05];
        } else if (location.includes("高雄")) {
            newCoords = [22.7214 + (Math.random() - 0.5) * 0.05, 120.4056 + (Math.random() - 0.5) * 0.05];
        } else if (location.includes("台中")) {
            newCoords = [24.2584 + (Math.random() - 0.5) * 0.05, 120.8273 + (Math.random() - 0.5) * 0.05];
        }

        const farmObj = {
            id: `farm-dynamic-${Date.now()}`,
            name: `${county}自耕小農`,
            type: "farm",
            coords: newCoords,
            fruit: newProduct.type,
            stock: `${weight} kg (${newProduct.grade}級)`,
            suggestedPrice: newProduct.price,
            carbonFactor: newProduct.carbon,
            icon: "🌿",
            county: county,
            desc: `經由 AI 一鍵掃描分析並以 ${newProduct.grade} 級快速上架的最新蔬果產線。`
        };

        MAP_NODES.farms.push(farmObj);

        // 重新在地圖上渲染新標籤
        const customIcon = L.divIcon({
            className: 'custom-map-marker farm-marker',
            html: `<div style="background: var(--primary); width: 14px; height: 14px; border-radius: 50%; border: 2.5px solid #ffffff; box-shadow: 0 0 12px var(--primary-light); animation: bounce 2s infinite;"></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7]
        });

        const marker = L.marker(farmObj.coords, { icon: customIcon }).addTo(map);
        marker.bindPopup(`
            <div style="font-family: var(--font-body); padding: 5px;">
                <h4 style="color:var(--primary-light); margin-bottom:4px;">🌿 ${farmObj.name}</h4>
                <p style="font-size:0.8rem; margin-bottom:2px;"><b>主要格外品:</b> ${farmObj.fruit}</p>
                <p style="font-size:0.8rem; margin-bottom:6px;"><b>庫存量:</b> ${farmObj.stock}</p>
            </div>
        `);
        marker.on('click', () => { selectFarmNode(farmObj); });
        mapMarkers.push(marker);
    }
}

// 開啟結帳對話框
function openCheckoutModal(productId) {
    const prod = MARKET_PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    activeCheckoutItem = prod;
    selectedLogisticsFactor = 0.9; // 預設小農共配

    // 填寫 Modal 欄位
    document.getElementById('modal-title').innerText = `低碳對接交易結帳 (${prod.county}在地地圖媒合)`;
    document.getElementById('modal-item-name').innerText = prod.name;
    document.getElementById('modal-item-info').innerText = `${prod.farmer} - ${prod.grade}級格外品 | 產地: ${prod.location}`;
    
    // 計算總價與總重
    const totalPrice = prod.price * prod.weight;
    document.getElementById('modal-price-calc').innerText = `${prod.weight} kg / 共 NT$ ${totalPrice.toLocaleString()}`;
    
    // 設定食物里程數值展示
    const milesElements = document.querySelectorAll('.miles-val');
    const simulatedDist = parseFloat((3 + Math.random() * 8).toFixed(1)); // 在地媒合模擬公里數 3~11km
    milesElements.forEach(el => el.innerText = simulatedDist);

    // 重置物流選擇選項樣式
    const cards = document.querySelectorAll('.delivery-card');
    cards.forEach(c => c.classList.remove('active'));
    document.getElementById('log-coop').checked = true;
    document.querySelector('.delivery-card[data-logistics="local-coop"]').classList.add('active');

    // 計算預估減碳貢獻
    updateCheckoutCarbonText();

    // 顯示 Modal
    document.getElementById('checkout-modal').classList.add('active');
}

// 選擇物流方式
function selectLogistics(element, carbonFactor) {
    selectedLogisticsFactor = carbonFactor;

    // 更新 Card 選取狀態
    const cards = document.querySelectorAll('.delivery-card');
    cards.forEach(c => c.classList.remove('active'));
    element.classList.add('active');

    // 核取 Radio
    const radio = element.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;

    // 重新計算碳節省顯示
    updateCheckoutCarbonText();
}

// 計算與更新 Checkout 頁面的減碳數據
function updateCheckoutCarbonText() {
    if (!activeCheckoutItem) return;
    
    const baseSaved = activeCheckoutItem.carbon * activeCheckoutItem.weight;
    const finalSaved = parseFloat((baseSaved * selectedLogisticsFactor).toFixed(1));

    document.getElementById('modal-checkout-carbon').innerText = `-${finalSaved} kg CO2e`;
    
    const detailText = document.getElementById('modal-carbon-detail');
    if (selectedLogisticsFactor === 1.0) {
        detailText.innerHTML = `<b>零里程碳排！</b>由買家自行前往產地環保自取，完全免去貨物運輸排碳。`;
    } else if (selectedLogisticsFactor === 0.9) {
        detailText.innerHTML = `<b>在地低里程！</b>藉由同縣市小農智慧物流共同拼車配送，相比一般跨縣市標準貨運減少了 90% 的運輸碳排。`;
    } else {
        detailText.innerHTML = `<span style="color:var(--danger);"><b>注意！</b></span>您選擇了傳統長途跨縣市宅配物流，產生的二氧化碳排放較高，抵銷了格外品原有的減碳效益。`;
    }
}

// 關閉結帳對話框
function closeModal() {
    document.getElementById('checkout-modal').classList.remove('active');
    activeCheckoutItem = null;
}

// 確認交易，扣除庫存並更新 ESG 累加
function confirmCheckoutTransaction() {
    if (!activeCheckoutItem) return;

    const prod = activeCheckoutItem;
    const weight = prod.weight;
    
    const baseSaved = prod.carbon * weight;
    const finalSaved = parseFloat((baseSaved * selectedLogisticsFactor).toFixed(1));
    const totalPrice = prod.price * weight;

    // 1. 全域 ESG 計數器累計
    updateGlobalESGCounters(weight, finalSaved, totalPrice);

    // 2. 從市集中移除該商品 (模擬已售完)
    MARKET_PRODUCTS = MARKET_PRODUCTS.filter(p => p.id !== prod.id);
    renderMarketplace();

    // 3. 向地圖即時跑馬燈推送一條成交
    addMatchmakingToFeed("格外市集結帳", prod.farmer, prod.type, finalSaved);

    // 4. 關閉 Modal
    closeModal();

    // 5. 提示通知
    showToast(`🛒 結帳成功！感謝您認購 ${weight}kg ${prod.name}，本筆交易為地球減少了 ${finalSaved}kg CO2e 碳排放量！`);

}

// ==========================================================================
// Line-style 模擬聊天室邏輯
// ==========================================================================
function toggleChatWindow() {
    const box = document.getElementById('chat-window-box');
    box.classList.toggle('active');
    
    // 清除未讀通知記號
    document.getElementById('chat-unread-count').style.display = 'none';
}

function openFarmerChat(farmerName, productName) {
    const btn = document.getElementById('floating-chat-btn');
    const box = document.getElementById('chat-window-box');
    
    btn.classList.add('active');
    box.classList.add('active');
    
    document.getElementById('chat-farmer-name').innerText = farmerName;
    
    // 初始化聊天內容
    const list = document.getElementById('chat-message-list');
    list.innerHTML = `
        <div class="msg-bubble receiver">
            您好！我是【${farmerName}】。看到您對我們上架的【${productName}】有興趣！我們的農產皆是安全栽培，除了表皮微瑕或外形特別之外，保證美味不減，請問有什麼我可以協助的嗎？
            <span class="msg-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
        <div class="chat-typing-dots" id="chat-typing-loader">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    // 捲動到底部
    list.scrollTop = list.scrollHeight;
}

// 送出使用者自訂對話訊息
function sendUserChatMessage() {
    const input = document.getElementById('chat-input-field');
    const msgText = input.value.trim();
    if (!msgText) return;
    
    appendMessageBubble(msgText, 'sender');
    input.value = "";
    
    // 觸發小農模擬回覆
    triggerFarmerResponse(msgText);
}

// 點擊預設提問晶片
function sendQuickMessage(text) {
    appendMessageBubble(text, 'sender');
    triggerFarmerResponse(text);
}

// 附加訊息對話框到聊天室中
function appendMessageBubble(text, role) {
    const list = document.getElementById('chat-message-list');
    const loader = document.getElementById('chat-typing-loader');
    
    const bubble = document.createElement('div');
    bubble.className = `msg-bubble ${role}`;
    bubble.innerHTML = `
        ${text}
        <span class="msg-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
    `;
    
    list.insertBefore(bubble, loader);
    list.scrollTop = list.scrollHeight;
}

// 模擬小農打字回覆狀態機
function triggerFarmerResponse(userText) {
    const loader = document.getElementById('chat-typing-loader');
    loader.style.display = 'flex';
    
    const list = document.getElementById('chat-message-list');
    list.scrollTop = list.scrollHeight;

    // 回覆題庫
    let responseText = "收到您的訊息！這批格外品都是今天清晨剛採收的，非常新鮮。如果您直接在平台下單，我們會配合【低碳共乘配送】，今天下午就能幫您新鮮直送過去喔！";
    
    if (userText.includes("甜度")) {
        responseText = "我們的格外品雖然形狀不符合市場規格，但是熟度和日照時間完全充足！例如甜度都實測與A級品無異，非常適合製成點心、熟食或熬醬，保證口感完全一樣！";
    } else if (userText.includes("便宜")) {
        responseText = "我們在平台上的定價已經是原價的4至5折了，主要是希望減少食物浪費。不過，如果您是社福機構、弱勢食堂共餐，或者您一次採購 100 公斤以上，我很樂意為您提供無償轉贈，或額外給予優惠折扣，歡迎隨時告訴我！";
    } else if (userText.includes("配送") || userText.includes("取貨")) {
        responseText = "配送非常彈性！我們推薦使用平台上的【低碳共乘配送】，這樣能整合附近小農的車道分攤，省錢又環保。當然，如果您方便的話，也可以點選【商家自取】，來我果園喝茶裝箱！";
    }

    // 模擬 1.5 秒打字延遲，提升擬真度
    setTimeout(() => {
        loader.style.display = 'none';
        appendMessageBubble(responseText, 'receiver');
        
        // 播放小信號聲
        playAcceptChime();
    }, 1500);
}

// ==========================================================================
// 永續循環剩餘品導流邏輯
// ==========================================================================
function triggerSurplusLoop(channel, carbonFactor) {
    const redirectBtn = event.target;
    redirectBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> 載運流向中...`;
    redirectBtn.disabled = true;

    // 模擬過期整批導流 150kg
    const weight = 150;
    const carbonSaved = parseFloat((weight * carbonFactor).toFixed(1));
    const simulatedEarning = 0; // 循環回收無直接交易金

    setTimeout(() => {
        // 更新累計指標
        updateGlobalESGCounters(weight, carbonSaved, simulatedEarning);
        addMatchmakingToFeed("剩餘品回收", channel, "格外品導流", carbonSaved);

        // 重置按鈕
        redirectBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> 已成功循環導流`;
        
        // 顯示通知
        showToast(`♻️ 【循環成功】已將市集即將過期的 150kg 格外品，一鍵綠色導流至【${channel}】！防腐爛產碳，成功減少了 ${carbonSaved}kg CO2e 碳排！`);
        
        setTimeout(() => {
            redirectBtn.innerHTML = `<i class="fa-solid fa-rotate"></i> 一鍵綠色有機堆肥`;
            redirectBtn.disabled = false;
        }, 3000);
    }, 1200);
}

// 全域 Toast 系統通知顯示器
function showToast(message) {
    const area = document.getElementById('toast-area');
    if (!area) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fa-solid fa-leaf" style="color:var(--primary-light); font-size:1.2rem;"></i>
        <div style="font-size:0.85rem; line-height:1.4;">${message}</div>
    `;

    area.appendChild(toast);

    // 4.5秒後淡出移除
    setTimeout(() => {
        toast.style.animation = "fade-in 0.35s ease-in reverse forwards";
        setTimeout(() => {
            toast.remove();
        }, 350);
    }, 4500);
}



// ==========================================================================
// 商品上架與庫存管理邏輯
// ==========================================================================
function handleManualProductUpload() {
    const name = document.getElementById('manual-name').value.trim();
    const type = document.getElementById('manual-type').value;
    const grade = document.getElementById('manual-grade').value;
    const weight = parseFloat(document.getElementById('manual-weight').value) || 50;
    const price = parseFloat(document.getElementById('manual-price').value) || 80;
    const location = document.getElementById('manual-location').value;
    const expiry = document.getElementById('manual-expiry').value;
    const carbon = parseFloat(document.getElementById('manual-carbon').value) || 1.8;
    const desc = document.getElementById('manual-desc').value.trim() || `${type}格外品，營養風味依然完美。`;

    if (!name) {
        showToast("⚠️ 請填寫商品名稱！");
        return;
    }

    const fruitData = {
        name: name,
        grade: grade,
        price: price,
        carbon: carbon,
        image: `assets/${getFruitImageFilename(type)}`,
        desc: desc,
        farmer: document.getElementById('farmer-name').value || "大湖張小農"
    };

    // 上架至市集與地圖
    listUglyFruitToMarketplace(fruitData, weight, location);

    // 重新渲染庫存管理
    renderInventoryList();

    // 清空表單
    document.getElementById('farmer-upload-form').reset();
    document.getElementById('manual-carbon').value = "1.8";

    showToast(`🎉 自主上架成功！格外品【${name}】已同步發布至格外品市集與低碳地圖！`);
}

function getFruitImageFilename(type) {
    const map = {
        '草莓': 'strawberry_ugly.png',
        '鳳梨': 'pineapple_ugly.png',
        '香蕉': 'banana_ugly.png',
        '蘋果': 'apple_ugly.png',
        '胡蘿蔔': 'carrot_ugly.png',
        '高麗菜': 'cabbage_ugly.png',
        '芭樂': 'guava_ugly.png',
        '番茄': 'tomato_ugly.png'
    };
    return map[type] || 'strawberry_ugly.png';
}

const VEGETABLE_CARBON_FACTORS = {
    '草莓': 2.1,
    '鳳梨': 1.8,
    '蘋果': 1.5,
    '香蕉': 1.2,
    '胡蘿蔔': 1.1,
    '高麗菜': 0.9,
    '芭樂': 1.6,
    '番茄': 1.4
};

function initManualUploadCarbonListener() {
    const typeSelect = document.getElementById('manual-type');
    const carbonInput = document.getElementById('manual-carbon');
    if (typeSelect && carbonInput) {
        typeSelect.addEventListener('change', () => {
            const factor = VEGETABLE_CARBON_FACTORS[typeSelect.value] || 1.8;
            carbonInput.value = factor;
        });
        // 初始設定
        carbonInput.value = VEGETABLE_CARBON_FACTORS[typeSelect.value] || 1.8;
    }
}

// 渲染農民即時庫存列表
function renderInventoryList() {
    const tbody = document.getElementById('inventory-list-tbody');
    if (!tbody) return;
    tbody.innerHTML = "";

    // 篩選屬於我們的小農格外品 (僅顯示大湖張小農與苗栗小農友)
    const myProducts = MARKET_PRODUCTS.filter(p => p.farmer === "大湖張小農" || p.farmer.includes("大湖張小農") || p.farmer.includes("苗栗小農友"));

    myProducts.forEach(prod => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                    <img src="${prod.image}" style="width:30px; height:30px; border-radius:4px; object-fit:cover;">
                    <span style="font-weight:600;">${prod.name}</span>
                </div>
            </td>
            <td><span class="inventory-status-badge listed" style="background:rgba(255,255,255,0.05); color:white; border:none; padding: 0.15rem 0.4rem;">${prod.grade}級</span></td>
            <td><b>${prod.weight} kg</b></td>
            <td>NT$ ${prod.price}/kg</td>
            <td><span class="inventory-status-badge listed">銷售中</span></td>
            <td>
                <button class="btn btn-secondary" onclick="removeManualProduct('${prod.id}')" style="padding:0.25rem 0.6rem; font-size:0.75rem; background:rgba(239,68,68,0.15); color:#f87171; border:1px solid rgba(239,68,68,0.2); border-radius: 4px;">
                    <i class="fa-solid fa-trash-can"></i> 下架
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    if (myProducts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">
                    <i class="fa-solid fa-folder-open" style="font-size:2rem; margin-bottom:0.5rem; display:block; opacity:0.3;"></i>
                    暫無上架中的格外品。請填寫左側表單進行自主申報上架！
                </td>
            </tr>
        `;
    }
}

// 下架商品
function removeManualProduct(prodId) {
    MARKET_PRODUCTS = MARKET_PRODUCTS.filter(p => p.id !== prodId);
    renderMarketplace();
    renderInventoryList();
    showToast("🗑️ 商品已成功下架！已從交易市集中移除。");
}

// ==========================================================================
// 會員中心角色管理
// ==========================================================================
function switchMemberRole(role) {
    const panels = document.querySelectorAll('.member-form-panel');
    const tabs = document.querySelectorAll('.role-tab-btn');
    
    panels.forEach(p => p.classList.remove('active'));
    tabs.forEach(t => t.classList.remove('active'));

    if (role === 'farmer') {
        document.getElementById('member-form-farmer').classList.add('active');
        document.getElementById('btn-role-farmer').classList.add('active');
        updateMemberProfileUI('farmer');
    } else if (role === 'shop') {
        document.getElementById('member-form-shop').classList.add('active');
        document.getElementById('btn-role-shop').classList.add('active');
        updateMemberProfileUI('shop');
    } else if (role === 'charity') {
        document.getElementById('member-form-charity').classList.add('active');
        document.getElementById('btn-role-charity').classList.add('active');
        updateMemberProfileUI('charity');
    }
}

function updateMemberProfileUI(role) {
    const displayName = document.getElementById('display-profile-name');
    const displayRole = document.getElementById('display-profile-role');
    const avatar = document.querySelector('.member-profile-avatar');

    if (role === 'farmer') {
        const nameVal = document.getElementById('farmer-name').value || "大湖張小農";
        displayName.innerText = nameVal;
        displayRole.innerText = "在地農耕生產者";
        avatar.innerText = "🌾";
    } else if (role === 'shop') {
        const nameVal = document.getElementById('shop-name').value || "綠色商家買家";
        displayName.innerText = nameVal;
        displayRole.innerText = "綠色低碳餐飲夥伴";
        avatar.innerText = "🥐";
    } else if (role === 'charity') {
        const nameVal = document.getElementById('charity-name').value || "愛心社福機構";
        displayName.innerText = nameVal;
        displayRole.innerText = "社福剩食受惠單位";
        avatar.innerText = "❤️";
    }
}

function saveMemberProfile(role) {
    updateMemberProfileUI(role);
    showToast("💾 個人檔案與註冊資料更新成功！");
}


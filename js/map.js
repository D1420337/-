// 在地低碳智慧地圖模組
let map = null;
let mapMarkers = [];
let routingLine = null;
let activeSelectedFarm = null;

// 定義地圖節點資料 (小農與需求端)
const MAP_NODES = {
    farms: [
        {
            id: "farm-1",
            name: "大湖張小農",
            type: "farm",
            coords: [24.4245, 120.8712],
            fruit: "草莓",
            stock: "85 kg (A級)",
            suggestedPrice: 120,
            carbonFactor: 2.1,
            icon: "🍓",
            county: "苗栗",
            desc: "苗栗大湖有機認證草莓園，因梅雨季導致部分草莓表皮微陷、外觀歪斜，果香依舊甜美。"
        },
        {
            id: "farm-2",
            name: "關廟黃農友",
            type: "farm",
            coords: [22.9621, 120.3278],
            fruit: "鳳梨",
            stock: "150 kg (B級)",
            suggestedPrice: 40,
            carbonFactor: 1.8,
            icon: "🍍",
            county: "台南",
            desc: "台南關廟特產金鑽鳳梨，部分收成出現罕見「雙冠」畸形，果肉香甜多汁，但大盤商拒絕收購。"
        },
        {
            id: "farm-3",
            name: "高雄陳農友",
            type: "farm",
            coords: [22.7214, 120.4056],
            fruit: "香蕉",
            stock: "200 kg (C級)",
            suggestedPrice: 10,
            carbonFactor: 1.2,
            icon: "🍌",
            county: "高雄",
            desc: "高雄大樹香蕉園，本季盛產面臨滯銷，且香蕉成熟速度快，表面開始浮現黑斑，亟需消化。"
        },
        {
            id: "farm-4",
            name: "東勢林農夫",
            type: "farm",
            coords: [24.2584, 120.8273],
            fruit: "蘋果",
            stock: "120 kg (B級)",
            suggestedPrice: 60,
            carbonFactor: 1.5,
            icon: "🍎",
            county: "台中",
            desc: "台中東勢高海拔果園，無農藥殘留，表皮有天然風疤痕跡與小褐點，脆度及酸甜比一流。"
        },
        {
            id: "farm-5",
            name: "東勢黃農友",
            type: "farm",
            coords: [24.2712, 120.8415],
            fruit: "胡蘿蔔",
            stock: "160 kg (B級)",
            suggestedPrice: 25,
            carbonFactor: 1.1,
            icon: "🥕",
            county: "台中",
            desc: "台中東勢有機栽培，土壤多石導致胡蘿蔔生長分岔，口感依然清爽鮮甜。"
        },
        {
            id: "farm-6",
            name: "大湖陳農友",
            type: "farm",
            coords: [24.4085, 120.8812],
            fruit: "高麗菜",
            stock: "90 kg (A級)",
            suggestedPrice: 30,
            carbonFactor: 0.9,
            icon: "🥬",
            county: "苗栗",
            desc: "苗栗大湖友善小農，因自然熟成與有機種植，高麗菜外葉有些微蟲咬，內部清甜爽口。"
        }
    ],
    buyers: [
        // 烘焙坊 (橙色)
        { id: "buyer-1", name: "苗栗心田麵包坊", type: "bakery", coords: [24.4611, 120.8252], icon: "🥖", county: "苗栗" },
        { id: "buyer-2", name: "台南金冠烘焙屋", type: "bakery", coords: [23.0012, 120.2241], icon: "🍞", county: "台南" },
        { id: "buyer-3", name: "高雄陽光點心房", type: "bakery", coords: [22.6845, 120.4285], icon: "🧁", county: "高雄" },
        { id: "buyer-4", name: "台中大坑文創烘焙", type: "bakery", coords: [24.1542, 120.7312], icon: "🍪", county: "台中" },
        // 社福/弱勢食堂 (藍色)
        { id: "buyer-5", name: "苗栗石蓮社福食堂", type: "charity", coords: [24.5023, 120.7712], icon: "🍲", county: "苗栗" },
        { id: "buyer-6", name: "台南暖心愛心廚房", type: "charity", coords: [22.9878, 120.2012], icon: "🥗", county: "台南" },
        { id: "buyer-7", name: "高雄大樹社區關懷點", type: "charity", coords: [22.6912, 120.4101], icon: "🍜", county: "高雄" },
        { id: "buyer-8", name: "台中綠色共餐食堂", type: "charity", coords: [24.1311, 120.6512], icon: "🍱", county: "台中" }
    ]
};

// 初始化地圖
let currentGoogleTileLayer = null;
let isSatelliteMode = false;

function initMapModule() {
    const mapContainer = document.getElementById('leaflet-map');
    if (!mapContainer) return;
    if (map) return; // 避免重複初始化

    // 建立地圖，中心點設在台灣中部
    map = L.map('leaflet-map', {
        zoomControl: false
    }).setView([23.7, 120.75], 8);
    
    L.control.zoom({ position: 'topleft' }).addTo(map);

    // 套用真實 Google Maps 官方標準街道地圖圖資 (清晰淺色台灣道路與地名)
    currentGoogleTileLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        attribution: '&copy; Google Maps',
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        maxZoom: 20
    }).addTo(map);

    // 繪製地圖標記
    renderMapNodes();

    // 監聽智慧物流媒合按鈕
    const matchBtn = document.getElementById('btn-trigger-matchmaking');
    if (matchBtn) {
        matchBtn.addEventListener('click', triggerMatchmakingAlgorithm);
    }
}

// 切換 Google 地圖圖層 (一般街道 vs 衛星實景)
function toggleGoogleMapLayer() {
    if (!map) return;
    isSatelliteMode = !isSatelliteMode;
    if (currentGoogleTileLayer) {
        map.removeLayer(currentGoogleTileLayer);
    }
    if (isSatelliteMode) {
        // Google Maps 官方高解析度衛星混合圖資 (含道路標註)
        currentGoogleTileLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
            attribution: '&copy; Google Maps Satellite',
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            maxZoom: 20
        }).addTo(map);
        showToast('🗺️ 已切換為：Google Maps 官方高解析度衛星實景圖層');
    } else {
        // Google Maps 官方標準道路圖資
        currentGoogleTileLayer = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            attribution: '&copy; Google Maps',
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            maxZoom: 20
        }).addTo(map);
        showToast('🗺️ 已切換為：Google Maps 官方標準道路導航圖層');
    }
}

// 繪製地圖上的所有小農與買家節點
function renderMapNodes() {
    // 1. 繪製小農節點 (綠色圓形標記，帶有浮動發光感)
    MAP_NODES.farms.forEach(farm => {
        const customIcon = L.divIcon({
            className: 'custom-map-marker farm-marker',
            html: `<div style="background: var(--primary); width: 14px; height: 14px; border-radius: 50%; border: 2.5px solid #ffffff; box-shadow: 0 0 12px var(--primary-light); animation: bounce 2s infinite;"></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7]
        });

        const marker = L.marker(farm.coords, { icon: customIcon }).addTo(map);
        
        // 綁定 Popup
        marker.bindPopup(`
            <div style="font-family: var(--font-body); padding: 5px;">
                <h4 style="color:var(--primary-light); margin-bottom:4px;">${farm.icon} ${farm.name}</h4>
                <p style="font-size:0.8rem; margin-bottom:2px;"><b>主要格外品:</b> ${farm.fruit}</p>
                <p style="font-size:0.8rem; margin-bottom:6px;"><b>庫存量:</b> ${farm.stock}</p>
                <span style="font-size:0.75rem; color:var(--text-muted);">點擊右側欄位查看詳細資訊並進行媒合</span>
            </div>
        `);

        // 點擊事件更新側邊欄
        marker.on('click', () => {
            selectFarmNode(farm);
        });

        mapMarkers.push(marker);
    });

    // 2. 繪製烘焙坊與社福等買家節點 (橙色與藍色小三角/菱形)
    MAP_NODES.buyers.forEach(buyer => {
        const isCharity = buyer.type === 'charity';
        const color = isCharity ? '#3b82f6' : 'var(--accent)';
        const shadowColor = isCharity ? '#60a5fa' : 'var(--accent-light)';
        
        const customIcon = L.divIcon({
            className: `custom-map-marker buyer-marker-${buyer.type}`,
            html: `<div style="background: ${color}; width: 10px; height: 10px; border-radius: 2px; border: 1.5px solid #ffffff; box-shadow: 0 0 8px ${shadowColor};"></div>`,
            iconSize: [10, 10],
            iconAnchor: [5, 5]
        });

        const marker = L.marker(buyer.coords, { icon: customIcon }).addTo(map);
        marker.bindPopup(`
            <div style="font-family: var(--font-body); padding: 3px;">
                <h4 style="color:${shadowColor}; margin-bottom:2px;">${buyer.icon} ${buyer.name}</h4>
                <span style="font-size:0.75rem; color:var(--text-muted);">${buyer.type === 'charity' ? '在地社福機構 (弱勢供餐)' : '文創烘焙合作夥伴'}</span>
            </div>
        `);

        mapMarkers.push(marker);
    });
}

// 點選小農節點，更新側邊欄資訊
function selectFarmNode(farm) {
    activeSelectedFarm = farm;

    // 清除先前的路徑繪製
    if (routingLine) {
        map.removeLayer(routingLine);
        routingLine = null;
    }

    // 隱藏預設文字，顯示小農詳情
    document.getElementById('sidebar-placeholder-text').style.display = 'none';
    document.getElementById('sidebar-details-content').style.display = 'block';

    // 填寫小農詳情
    document.getElementById('sidebar-icon').innerText = farm.icon;
    document.getElementById('sidebar-node-title').innerText = farm.name;
    document.getElementById('sidebar-node-subtitle').innerText = `${farm.county}地區 | 永續友善耕作`;
    document.getElementById('sidebar-stock').innerText = `${farm.fruit} ── ${farm.stock}`;
    
    // 隱藏路徑計算器與重置按鈕
    document.getElementById('routing-calculator').style.display = 'none';
    const matchBtn = document.getElementById('btn-trigger-matchmaking');
    matchBtn.innerHTML = `<i class="fa-solid fa-route"></i> 智慧物流配對鄰近需求端`;
    matchBtn.disabled = false;
    
    // 平滑聚焦到該坐標
    map.flyTo(farm.coords, 12, {
        animate: true,
        duration: 1.2
    });
}

// 執行智慧物流低碳地圖媒合演算法
function triggerMatchmakingAlgorithm() {
    if (!activeSelectedFarm) return;

    const matchBtn = document.getElementById('btn-trigger-matchmaking');
    const routeMode = document.getElementById('map-route-mode').value;
    
    matchBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> 規劃最佳低碳路徑中...`;
    matchBtn.disabled = true;

    // 1. 尋找最近的第一個需求端 (Buyer A)
    let bestMatchA = null;
    let minDistanceA = Infinity;

    MAP_NODES.buyers.forEach(buyer => {
        if (buyer.county === activeSelectedFarm.county) {
            const dist = getCoordinatesDistance(activeSelectedFarm.coords, buyer.coords);
            if (dist < minDistanceA) {
                minDistanceA = dist;
                bestMatchA = buyer;
            }
        }
    });

    if (!bestMatchA) {
        MAP_NODES.buyers.forEach(buyer => {
            const dist = getCoordinatesDistance(activeSelectedFarm.coords, buyer.coords);
            if (dist < minDistanceA) {
                minDistanceA = dist;
                bestMatchA = buyer;
            }
        });
    }

    // 模擬計算延遲 1 秒
    setTimeout(() => {
        if (!bestMatchA) {
            matchBtn.innerText = "無法配對";
            return;
        }

        const distanceKmA = parseFloat((minDistanceA * 100).toFixed(1));
        let pathPoints = [activeSelectedFarm.coords, bestMatchA.coords];
        let totalDistance = distanceKmA;
        let finalDestinationText = `${bestMatchA.icon} ${bestMatchA.name}`;
        
        let carbonSavedVal = 0;
        let coRideExtraSaved = 0;

        const elCorideRow = document.getElementById('route-coride-row');
        
        if (routeMode === 'coride') {
            // 2. 共乘模式：尋找同縣市但不同類型的第二個需求端 (Buyer B) 以進行拼車
            let bestMatchB = null;
            let minDistanceB = Infinity;
            
            MAP_NODES.buyers.forEach(buyer => {
                // 不同於 A 且同縣市
                if (buyer.id !== bestMatchA.id && buyer.county === activeSelectedFarm.county && buyer.type !== bestMatchA.type) {
                    const dist = getCoordinatesDistance(bestMatchA.coords, buyer.coords);
                    if (dist < minDistanceB) {
                        minDistanceB = dist;
                        bestMatchB = buyer;
                    }
                }
            });
            
            if (bestMatchB) {
                const distanceKmB = parseFloat((minDistanceB * 100).toFixed(1));
                pathPoints.push(bestMatchB.coords);
                totalDistance = parseFloat((distanceKmA + distanceKmB).toFixed(1));
                finalDestinationText = `${bestMatchA.icon} ${bestMatchA.name} ➔ ${bestMatchB.icon} ${bestMatchB.name} (拼車共乘)`;
                
                // 碳節算：傳統需要兩台專車 (240km 基準)，共乘只需一趟拼車路線
                const standardEmissions = 240 * 0.15;
                const coRideEmissions = totalDistance * 0.12; // 共乘拼車載重優化，每公里碳排係數稍降
                carbonSavedVal = parseFloat((standardEmissions - coRideEmissions).toFixed(1));
                coRideExtraSaved = parseFloat((standardEmissions * 0.3).toFixed(1)); // 共乘額外省下30%
                
                if (elCorideRow) {
                    elCorideRow.style.display = 'flex';
                    document.getElementById('route-coride-saved').innerText = `-${coRideExtraSaved} kg CO2e`;
                }
            } else {
                // 找不到 B 則退回 direct 模式
                const standardEmissions = 120 * 0.15;
                const currentEmissions = totalDistance * 0.15;
                carbonSavedVal = parseFloat((standardEmissions - currentEmissions).toFixed(1));
                if (elCorideRow) elCorideRow.style.display = 'none';
            }
        } else {
            // 單獨專車模式
            const standardEmissions = 120 * 0.15;
            const currentEmissions = totalDistance * 0.15;
            carbonSavedVal = parseFloat((standardEmissions - currentEmissions).toFixed(1));
            if (elCorideRow) elCorideRow.style.display = 'none';
        }

        const finalCarbonSaved = carbonSavedVal > 0 ? carbonSavedVal : 1.2;

        // 3. 繪製低碳路線 (共乘模式為多點折線)
        if (routingLine) {
            map.removeLayer(routingLine);
        }

        routingLine = L.polyline(pathPoints, {
            color: routeMode === 'coride' ? '#a855f7' : 'var(--primary-light)', // 共乘為紫色，單獨為綠色
            weight: 4,
            dashArray: routeMode === 'coride' ? '12, 8' : '8, 8',
            opacity: 0.9
        }).addTo(map);

        // 讓地圖視野自動縮放以容納整條路線
        map.fitBounds(routingLine.getBounds(), {
            padding: [55, 55]
        });

        // 4. 顯示路線數據
        document.getElementById('routing-calculator').style.display = 'block';
        document.getElementById('route-dest').innerText = finalDestinationText;
        document.getElementById('route-distance').innerText = `${totalDistance} km (拼車減少空跑)`;
        document.getElementById('route-carbon-saved').innerText = `-${finalCarbonSaved} kg CO2e`;

        // 5. 更新按鈕狀態
        matchBtn.innerHTML = `<i class="fa-solid fa-circle-check"></i> 媒合連線成功`;
        
        // 6. 寫入即時動態牆
        addMatchmakingToFeed(activeSelectedFarm.name, routeMode === 'coride' ? "低碳共乘鏈" : bestMatchA.name, activeSelectedFarm.fruit, finalCarbonSaved);

        // 7. 更新全域統計
        const weightValue = parseFloat(activeSelectedFarm.stock) || 50;
        updateGlobalESGCounters(weightValue, finalCarbonSaved, activeSelectedFarm.suggestedPrice * weightValue);

        // 觸發通知
        if (routeMode === 'coride') {
            showToast(`🚚 [低碳共乘] 規劃成功！規劃連線路徑：【${activeSelectedFarm.name}】➔ 鄰近商家，拼單共乘額外省下 ${coRideExtraSaved}kg 碳排放！`);
        } else {
            showToast(`🚚 智慧物流成功！【${activeSelectedFarm.name}】已對接至【${bestMatchA.name}】，節省食物里程！`);
        }

    }, 1200);
}

// 切換地圖顯示模式 (互動地圖 vs 官方嵌入街景)
function switchMapDisplayMode(mode) {
    const leafletMap = document.getElementById('leaflet-map');
    const embedMap = document.getElementById('google-map-embed');
    const btnInteractive = document.getElementById('btn-map-interactive');
    const btnEmbed = document.getElementById('btn-map-embed');

    if (mode === 'interactive') {
        if (leafletMap) leafletMap.style.display = 'block';
        if (embedMap) embedMap.style.display = 'none';
        if (btnInteractive) {
            btnInteractive.classList.add('btn-primary');
            btnInteractive.classList.remove('btn-secondary');
        }
        if (btnEmbed) {
            btnEmbed.classList.add('btn-secondary');
            btnEmbed.classList.remove('btn-primary');
        }
        if (map) {
            setTimeout(() => {
                map.invalidateSize();
            }, 100);
        }
    } else {
        if (leafletMap) leafletMap.style.display = 'none';
        if (embedMap) embedMap.style.display = 'block';
        if (btnInteractive) {
            btnInteractive.classList.add('btn-secondary');
            btnInteractive.classList.remove('btn-primary');
        }
        if (btnEmbed) {
            btnEmbed.classList.add('btn-primary');
            btnEmbed.classList.remove('btn-secondary');
        }
    }
}

// 簡易經緯度距離計算
function getCoordinatesDistance(coords1, coords2) {
    const latDiff = coords1[0] - coords2[0];
    const lngDiff = coords1[1] - coords2[1];
    return Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
}

// 向即時動態牆新增一條媒合紀錄
function addMatchmakingToFeed(farmName, buyerName, fruitName, carbonSaved) {
    const feedBox = document.getElementById('match-feed-box');
    
    const feedItem = document.createElement('div');
    feedItem.className = 'feed-item';
    feedItem.innerHTML = `
        <div class="feed-time">剛剛</div>
        <div class="feed-body">
            <span><b>${farmName}</b> 的格外${fruitName}成功對接 <b>${buyerName}</b></span>
            <span class="save-tag">-${carbonSaved} kg CO2e</span>
        </div>
    `;
    
    // 插入到最前面
    feedBox.insertBefore(feedItem, feedBox.firstChild);
    
    // 如果項目過多，移除最後一個以維持效能
    if (feedBox.children.length > 8) {
        feedBox.removeChild(feedBox.lastChild);
    }
}

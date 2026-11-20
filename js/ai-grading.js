// AI格外品影像辨識模擬系統

// 水果規格配置庫
const FRUIT_PRESETS = {
    strawberry: {
        name: "草莓",
        grade: "A",
        gradeText: "A 級 (烘焙首選)",
        defect: "形狀畸型 (3.4%), 底部凹陷",
        price: 120, // NT$ per kg
        carbon: 2.1, // kg CO2e per kg
        desc: "果肉完整飽滿且甜度極高，唯形狀較不規則且底部有小凹痕。非常適合烘焙業者製成草莓塔、蛋糕切片，或製成果醬。",
        image: "assets/strawberry_ugly.png",
        boxes: [
            { x: 0.38, y: 0.62, w: 0.12, h: 0.10, label: "底部凹陷" },
            { x: 0.22, y: 0.28, w: 0.22, h: 0.24, label: "不規則歪斜" }
        ],
        defectScores: { shape: 85, size: 10, blemish: 30, color: 10 },
        recBuyers: "苗栗心田麵包坊、台中大坑文創烘焙、高雄陽光點心房"
    },
    pineapple: {
        name: "鳳梨",
        grade: "B",
        gradeText: "B 級 (食品加工)",
        defect: "外觀歪斜 (12%), 表皮壓傷",
        price: 40,
        carbon: 1.8,
        desc: "雙頭鳳梨或外觀不對稱。表皮部分有輕微碰撞痕跡，但果肉厚實甜度高。建議切丁冷凍、製成果乾、鳳梨酥內餡，或發酵為環保酵素。",
        image: "assets/pineapple_ugly.png",
        boxes: [
            { x: 0.45, y: 0.22, w: 0.18, h: 0.18, label: "雙冠畸形" },
            { x: 0.32, y: 0.58, w: 0.14, h: 0.12, label: "外皮壓損" }
        ],
        defectScores: { shape: 90, size: 15, blemish: 65, color: 20 },
        recBuyers: "台南暖心愛心廚房、台南金冠烘焙屋"
    },
    apple: {
        name: "蘋果",
        grade: "B",
        gradeText: "B 級 (食品加工)",
        defect: "天然風疤, 有機斑點 (8%)",
        price: 60,
        carbon: 1.5,
        desc: "因無農藥種植而留下自然斑點與疤痕，但內部無腐爛。果香濃郁、爽脆度高，是文創果乾、烘焙蘋果派、蘋果醋的最佳原料。",
        image: "assets/apple_ugly.png",
        boxes: [
            { x: 0.48, y: 0.38, w: 0.08, h: 0.08, label: "黑星病斑" },
            { x: 0.26, y: 0.48, w: 0.14, h: 0.10, label: "風疤磨損" },
            { x: 0.62, y: 0.52, w: 0.06, h: 0.06, label: "黑斑點" }
        ],
        defectScores: { shape: 15, size: 20, blemish: 85, color: 40 },
        recBuyers: "苗栗心田麵包坊、台中大坑文創烘焙"
    },
    banana: {
        name: "香蕉",
        grade: "C",
        gradeText: "C 級 (生態綠肥)",
        defect: "大面積黑斑 (35%), 熟軟化",
        price: 10,
        carbon: 1.2,
        desc: "大面積成熟黑斑，口感十分軟綿香甜。除適合製作香蕉蛋糕外，亦推薦作為農場堆肥、或作為豬隻飼料與昆蟲飼養，推動零廢棄循環。",
        image: "assets/banana_ugly.png",
        boxes: [
            { x: 0.32, y: 0.32, w: 0.18, h: 0.22, label: "熟成斑區" },
            { x: 0.52, y: 0.42, w: 0.22, h: 0.18, label: "碰撞變色" }
        ],
        defectScores: { shape: 10, size: 10, blemish: 95, color: 90 },
        recBuyers: "高雄大樹社區關懷點、田間生態堆肥場"
    },
    carrot: {
        name: "胡蘿蔔",
        grade: "B",
        gradeText: "B 級 (食品加工)",
        defect: "分岔畸形 (25%), 局部磨損",
        price: 25,
        carbon: 1.1,
        desc: "因土壤中碎石阻擋導致主根分叉長出多隻「腳」，形狀奇特。雖不合超市標準，但水分多、胡蘿蔔素高。適合切片脫水、打蔬果汁、做咖哩與配菜烘焙。",
        image: "assets/carrot_ugly.png",
        boxes: [
            { x: 0.28, y: 0.42, w: 0.18, h: 0.25, label: "分岔分肢" },
            { x: 0.52, y: 0.35, w: 0.12, h: 0.12, label: "表皮磨損" }
        ],
        defectScores: { shape: 98, size: 25, blemish: 45, color: 10 },
        recBuyers: "台中綠色共餐食堂、台南暖心愛心廚房"
    },
    cabbage: {
        name: "高麗菜",
        grade: "A",
        gradeText: "A 級 (烘焙首選)",
        defect: "外層蟲咬孔洞, 尺寸偏小",
        price: 30,
        carbon: 0.9,
        desc: "有機友善農法種植，最外層有小範圍被菜蟲啃咬孔洞。剝除外葉後內部極為爽脆多汁且完全無農藥殘留。非常適合一般餐飲小吃店炒菜、火鍋店及水餃餡料製作。",
        image: "assets/cabbage_ugly.png",
        boxes: [
            { x: 0.24, y: 0.38, w: 0.15, h: 0.14, label: "蟲咬痕跡" },
            { x: 0.58, y: 0.48, w: 0.12, h: 0.12, label: "蟲咬痕跡" }
        ],
        defectScores: { shape: 15, size: 65, blemish: 75, color: 10 },
        recBuyers: "苗栗石蓮社福食堂、台中綠色共餐食堂"
    },
    guava: {
        name: "芭樂",
        grade: "B",
        gradeText: "B 級 (食品加工)",
        defect: "外型不規則 (15%), 表皮疤痕",
        price: 35,
        carbon: 1.6,
        desc: "友善無毒栽種，果體表面有小範圍枝條摩擦的褐色風疤痕跡，且外觀呈不規則多邊形。但果肉厚實、清脆多汁、維他命C極高，適合打果汁或芭樂乾加工。",
        image: "assets/guava_ugly.png",
        boxes: [
            { x: 0.35, y: 0.38, w: 0.15, h: 0.15, label: "風疤痕跡" },
            { x: 0.52, y: 0.52, w: 0.12, h: 0.12, label: "歪斜畸形" }
        ],
        defectScores: { shape: 65, size: 20, blemish: 70, color: 15 },
        recBuyers: "台中綠色共餐食堂、高雄大樹社區關懷點"
    },
    tomato: {
        name: "番茄",
        grade: "B",
        gradeText: "B 級 (食品加工)",
        defect: "表皮裂口 (10%), 色澤不均",
        price: 45,
        carbon: 1.4,
        desc: "自然熟成，因採收前水分吸收過快導致蒂頭處有輕微裂果，且部分表皮呈黃綠色斑塊。風味濃郁、茄紅素足，非常適合熬煮義式番茄麵醬、烘焙配料或番茄湯底。",
        image: "assets/tomato_ugly.png",
        boxes: [
            { x: 0.42, y: 0.28, w: 0.15, h: 0.12, label: "蒂頭裂紋" },
            { x: 0.25, y: 0.45, w: 0.18, h: 0.15, label: "轉色不均" }
        ],
        defectScores: { shape: 10, size: 15, blemish: 80, color: 45 },
        recBuyers: "台南暖心愛心廚房、苗栗石蓮社福食堂"
    }
};

let currentAnalyzedData = null; // 當前辨識出的水果數據

// 初始化 AI 分級模組
function initAIGrading() {
    const sampleItems = document.querySelectorAll('.sample-item');
    const uploader = document.getElementById('file-uploader');
    const viewportBox = document.getElementById('viewport-box');
    const listBtn = document.getElementById('btn-list-to-market');
    
    // 監聽範例圖片點擊
    sampleItems.forEach(item => {
        item.addEventListener('click', function() {
            sampleItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const fruitType = this.getAttribute('data-fruit');
            if (FRUIT_PRESETS[fruitType]) {
                runAIScan(FRUIT_PRESETS[fruitType]);
            }
        });
    });

    // 監聽檔案上傳
    uploader.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // 模擬上傳的水果數據
                const randomFruits = ['strawberry', 'pineapple', 'apple', 'banana', 'carrot', 'cabbage'];
                const randomPreset = FRUIT_PRESETS[randomFruits[Math.floor(Math.random() * randomFruits.length)]];
                
                // 複製預設值並修改，模擬上傳分析
                const customData = {
                    ...randomPreset,
                    name: `自訂-${randomPreset.name}`,
                    image: e.target.result,
                    // 隨機微調價格與碳排放以展現真實性
                    price: Math.round(randomPreset.price * (0.9 + Math.random() * 0.2)),
                    carbon: parseFloat((randomPreset.carbon * (0.95 + Math.random() * 0.1)).toFixed(2))
                };
                
                // 清除範例選中狀態
                sampleItems.forEach(i => i.classList.remove('active'));
                
                runAIScan(customData);
            };
            
            reader.readAsDataURL(file);
        }
    });

    // 監聽上架按鈕點擊
    listBtn.addEventListener('click', function() {
        if (!currentAnalyzedData) return;
        
        const weight = parseFloat(document.getElementById('list-weight').value) || 50;
        const location = document.getElementById('list-location').value;
        
        // 觸發上架邏輯，將其加入市集與ESG累計
        listUglyFruitToMarketplace(currentAnalyzedData, weight, location);
        
        // 上架完成通知
        showToast(`🎉 上架成功！已將 ${weight}kg 的【${currentAnalyzedData.name}】上架至媒合平台，預估可降低 ${Math.round(currentAnalyzedData.carbon * weight)}kg 碳足跡！`);
        
        // 重置上架按鈕狀態
        listBtn.disabled = true;
        listBtn.innerHTML = `<i class="fa-solid fa-check"></i> 已成功上架`;
        

        
        setTimeout(() => {
            listBtn.innerHTML = `<i class="fa-solid fa-arrow-up-from-bracket"></i> 一鍵上架至低碳媒合市場`;
            listBtn.disabled = false;
        }, 3000);
    });

    // 預設載入草莓進行第一次掃描
    setTimeout(() => {
        runAIScan(FRUIT_PRESETS.strawberry);
    }, 500);
}

// 執行 AI 掃描動畫與數據載入
function runAIScan(fruitData) {
    const placeholder = document.getElementById('upload-placeholder');
    const container = document.getElementById('scanner-canvas-container');
    const previewImg = document.getElementById('preview-img');
    const canvas = document.getElementById('blemish-canvas');
    const viewport = document.getElementById('viewport-box');
    const laser = document.getElementById('scan-laser-line');
    const spinner = document.getElementById('ai-loading-spinner');
    
    const statusTitle = document.getElementById('analysis-title');
    const statusTimestamp = document.getElementById('analysis-timestamp');
    const listBtn = document.getElementById('btn-list-to-market');

    // 隱藏佔位符，顯示影像區
    placeholder.style.display = 'none';
    container.classList.add('active');
    previewImg.src = fruitData.image;
    
    // 清理舊畫布與按鈕狀態
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    viewport.classList.add('scanning');
    listBtn.disabled = true;
    
    // 狀態更新為掃描中
    statusTitle.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="color:var(--primary-light);"></i> 影像 AI 特徵辨識中...`;
    statusTimestamp.innerText = `開始掃描像素特徵點...`;
    
    // 重置大字型徽章
    const gradeBadge = document.getElementById('grade-badge-display');
    gradeBadge.innerText = "-";
    gradeBadge.className = "grade-badge-huge";

    // 隱藏報告書，重置百分比
    const reportCard = document.getElementById('ai-inspection-report');
    if (reportCard) {
        reportCard.style.display = 'none';
        document.getElementById('bar-shape').style.width = '0%';
        document.getElementById('bar-size').style.width = '0%';
        document.getElementById('bar-blemish').style.width = '0%';
        document.getElementById('bar-color').style.width = '0%';
    }

    // 模擬 AI 處理時間延遲 1.8 秒
    setTimeout(() => {
        viewport.classList.remove('scanning');
        
        // 渲染畫布瑕疵框
        drawBlemishBoxes(canvas, previewImg, fruitData.boxes);
        
        // 更新辨識結果文字
        statusTitle.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--primary-light);"></i> 辨識完成`;
        statusTimestamp.innerText = `分析時間：${new Date().toLocaleTimeString()} | 影像置信度 98.4%`;
        
        // 顯示等級徽章與顏色
        gradeBadge.innerText = fruitData.grade;
        gradeBadge.className = "grade-badge-huge"; // Reset class list
        gradeBadge.classList.add(`grade-${fruitData.grade.toLowerCase()}`);
        
        // 填入細節
        document.getElementById('res-fruit-type').innerText = fruitData.name;
        document.getElementById('res-defect-type').innerText = fruitData.defect;
        document.getElementById('res-suggested-price').innerText = `NT$ ${fruitData.price} / kg`;
        document.getElementById('res-carbon-savings').innerText = `-${fruitData.carbon} kg CO2e / kg`;
        
        document.getElementById('res-grade-title').innerText = fruitData.gradeText;
        document.getElementById('res-grade-description').innerText = fruitData.desc;
        
        // 顯示檢驗分析報告書，並動畫繪製進度條
        if (reportCard && fruitData.defectScores) {
            reportCard.style.display = 'block';
            
            document.getElementById('score-shape').innerText = `${fruitData.defectScores.shape}%`;
            document.getElementById('score-size').innerText = `${fruitData.defectScores.size}%`;
            document.getElementById('score-blemish').innerText = `${fruitData.defectScores.blemish}%`;
            document.getElementById('score-color').innerText = `${fruitData.defectScores.color}%`;
            
            setTimeout(() => {
                document.getElementById('bar-shape').style.width = `${fruitData.defectScores.shape}%`;
                document.getElementById('bar-size').style.width = `${fruitData.defectScores.size}%`;
                document.getElementById('bar-blemish').style.width = `${fruitData.defectScores.blemish}%`;
                document.getElementById('bar-color').style.width = `${fruitData.defectScores.color}%`;
            }, 100);
            
            document.getElementById('report-rec-buyers').innerText = fruitData.recBuyers || "在地商家與社福機構";
        }
        
        // 允許上架
        listBtn.disabled = false;
        currentAnalyzedData = fruitData;
        

        
    }, 1800);
}

// 在 Canvas 上繪製科技感十足的瑕疵標記框
function drawBlemishBoxes(canvas, imgElement, boxes) {
    const ctx = canvas.getContext('2d');
    
    // 設定畫布尺寸等於影像載入後的渲染尺寸
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const w = canvas.width;
    const h = canvas.height;
    
    ctx.clearRect(0, 0, w, h);
    
    boxes.forEach(box => {
        // 計算實際座標
        const bx = box.x * w;
        const by = box.y * h;
        const bw = box.w * w;
        const bh = box.h * h;
        
        // 1. 繪製半透明黃色底色
        ctx.fillStyle = 'rgba(245, 158, 11, 0.18)';
        ctx.fillRect(bx, by, bw, bh);
        
        // 2. 繪製科技感外框
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(bx, by, bw, bh);
        
        // 3. 繪製角落裝飾點線
        ctx.fillStyle = '#ffffff';
        const dotSize = 4;
        ctx.fillRect(bx - dotSize/2, by - dotSize/2, dotSize, dotSize);
        ctx.fillRect(bx + bw - dotSize/2, by - dotSize/2, dotSize, dotSize);
        ctx.fillRect(bx - dotSize/2, by + bh - dotSize/2, dotSize, dotSize);
        ctx.fillRect(bx + bw - dotSize/2, by + bh - dotSize/2, dotSize, dotSize);
        
        // 4. 繪製標籤背景
        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 11px Inter, system-ui';
        const labelText = box.label;
        const textWidth = ctx.measureText(labelText).width;
        
        // 標籤放置在框上方，如果太靠頂部則放置在框內部
        const labelY = by - 5 > 15 ? by - 5 : by + 15;
        ctx.fillRect(bx, labelY - 11, textWidth + 10, 15);
        
        // 5. 繪製標籤文字
        ctx.fillStyle = '#1f2937';
        ctx.fillText(labelText, bx + 5, labelY);
    });
}

// 視窗尺寸改變時重繪畫布
window.addEventListener('resize', () => {
    const canvas = document.getElementById('blemish-canvas');
    const previewImg = document.getElementById('preview-img');
    if (canvas && previewImg && currentAnalyzedData && canvas.style.display !== 'none') {
        drawBlemishBoxes(canvas, previewImg, currentAnalyzedData.boxes);
    }
});

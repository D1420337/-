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
            { x: 0.45, y: 0.60, w: 0.18, h: 0.12, label: "底部凹陷 [98.4%]" },
            { x: 0.28, y: 0.36, w: 0.20, h: 0.18, label: "不規則歪斜 [96.7%]" }
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
            { x: 0.38, y: 0.18, w: 0.28, h: 0.22, label: "雙冠畸形 [97.2%]" },
            { x: 0.35, y: 0.56, w: 0.24, h: 0.18, label: "外皮壓損 [95.1%]" }
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
            { x: 0.44, y: 0.38, w: 0.16, h: 0.14, label: "黑星病斑 [96.8%]" },
            { x: 0.28, y: 0.48, w: 0.22, h: 0.16, label: "風疤磨損 [94.5%]" }
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
            { x: 0.36, y: 0.38, w: 0.26, h: 0.22, label: "熟成斑區 [98.9%]" },
            { x: 0.52, y: 0.46, w: 0.24, h: 0.20, label: "碰撞變色 [96.2%]" }
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
            { x: 0.34, y: 0.44, w: 0.26, h: 0.24, label: "分岔分肢 [98.1%]" },
            { x: 0.46, y: 0.32, w: 0.20, h: 0.15, label: "表皮磨損 [93.6%]" }
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
            { x: 0.30, y: 0.36, w: 0.22, h: 0.18, label: "蟲咬痕跡 [97.5%]" },
            { x: 0.50, y: 0.44, w: 0.20, h: 0.16, label: "葉面穿孔 [95.8%]" }
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
            { x: 0.34, y: 0.36, w: 0.22, h: 0.18, label: "風疤痕跡 [96.3%]" },
            { x: 0.46, y: 0.50, w: 0.22, h: 0.16, label: "歪斜畸形 [94.1%]" }
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
            { x: 0.36, y: 0.26, w: 0.22, h: 0.18, label: "蒂頭裂紋 [98.5%]" },
            { x: 0.26, y: 0.44, w: 0.24, h: 0.20, label: "轉色不均 [95.4%]" }
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

// 在 Canvas 上繪製科技感十足的瑕疵標記框（支援 object-fit: contain/cover 精準對齊）
function drawBlemishBoxes(canvas, imgElement, boxes) {
    if (!canvas || !imgElement || !boxes) return;
    const ctx = canvas.getContext('2d');
    
    // 設定畫布尺寸等於影像容器渲染尺寸
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const cw = canvas.width;
    const ch = canvas.height;
    
    ctx.clearRect(0, 0, cw, ch);
    
    // 計算影像在 object-fit 下的真實繪製區域
    const nw = imgElement.naturalWidth || 1024;
    const nh = imgElement.naturalHeight || 1024;
    
    let renderW = cw;
    let renderH = ch;
    let offsetX = 0;
    let offsetY = 0;
    
    // 預設 object-fit: contain 計算（精確還原影像真實比例邊界）
    const imgRatio = nw / nh;
    const canvasRatio = cw / ch;
    
    if (canvasRatio > imgRatio) {
        // 畫布較寬，影像上下貼齊、左右留黑/居中
        renderH = ch;
        renderW = ch * imgRatio;
        offsetX = (cw - renderW) / 2;
        offsetY = 0;
    } else {
        // 畫布較高，影像左右貼齊、上下居中
        renderW = cw;
        renderH = cw / imgRatio;
        offsetX = 0;
        offsetY = (ch - renderH) / 2;
    }
    
    boxes.forEach(box => {
        // 基於真實影像渲染區域計算精準像素位置
        const bx = offsetX + box.x * renderW;
        const by = offsetY + box.y * renderH;
        const bw = box.w * renderW;
        const bh = box.h * renderH;
        
        // 1. 繪製半透明琥珀橘底色
        ctx.fillStyle = 'rgba(245, 158, 11, 0.16)';
        ctx.fillRect(bx, by, bw, bh);
        
        // 2. 繪製科技感主要外框
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 2;
        ctx.strokeRect(bx, by, bw, bh);
        
        // 3. 繪製四角科技感瞄準線角標（Corner Brackets）
        const cornerLen = Math.min(10, Math.min(bw, bh) / 3);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        
        // 左上
        ctx.beginPath();
        ctx.moveTo(bx, by + cornerLen);
        ctx.lineTo(bx, by);
        ctx.lineTo(bx + cornerLen, by);
        ctx.stroke();
        
        // 右上
        ctx.beginPath();
        ctx.moveTo(bx + bw - cornerLen, by);
        ctx.lineTo(bx + bw, by);
        ctx.lineTo(bx + bw, by + cornerLen);
        ctx.stroke();
        
        // 左下
        ctx.beginPath();
        ctx.moveTo(bx, by + bh - cornerLen);
        ctx.lineTo(bx, by + bh);
        ctx.lineTo(bx + cornerLen, by + bh);
        ctx.stroke();
        
        // 右下
        ctx.beginPath();
        ctx.moveTo(bx + bw - cornerLen, by + bh);
        ctx.lineTo(bx + bw, by + bh);
        ctx.lineTo(bx + bw, by + bh - cornerLen);
        ctx.stroke();
        
        // 4. 繪製標籤背景與精美文字
        ctx.font = '600 11.5px Inter, system-ui, sans-serif';
        const labelText = box.label;
        const textMetrics = ctx.measureText(labelText);
        const textWidth = textMetrics.width;
        const tagHeight = 18;
        const tagPadding = 8;
        
        // 標籤放置在框上方；若頂部超出畫布則改放於框內部上方
        let labelY = by - 5;
        let tagBoxY = labelY - tagHeight + 3;
        if (tagBoxY < 2) {
            tagBoxY = by + 3;
            labelY = tagBoxY + tagHeight - 4;
        }
        
        // 標籤背景 (深綠科技灰底帶圓角感)
        ctx.fillStyle = '#064e3b';
        ctx.fillRect(bx, tagBoxY, textWidth + tagPadding * 2, tagHeight);
        
        // 標籤邊框
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, tagBoxY, textWidth + tagPadding * 2, tagHeight);
        
        // 標籤文字 (鮮明翠白)
        ctx.fillStyle = '#f0fdf4';
        ctx.fillText(labelText, bx + tagPadding, labelY);
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

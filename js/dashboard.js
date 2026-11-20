// ESG & SDGs 減碳量化數據圖表模組

// 全域 ESG 統計變數
let ESG_STATS = {
    carbonSaved: 4385.4, // kg CO2e
    savedWeight: 2840,    // kg
    farmerIncome: 85200, // NTD
    welfareMeals: 1420,  // meals
    countyData: {
        "苗栗": 1650.2,
        "台南": 1220.5,
        "高雄": 950.1,
        "台中": 564.6
    },
    gradeDistribution: {
        A: 55, // 烘焙原料
        B: 30, // 加工/飼料
        C: 15  // 綠能/堆肥
    }
};

// 初始化儀表板
function initDashboard() {
    renderBarChart();
    renderDonutChart();
    updateDashboardUI(false); // 首次載入不播放快速動畫，避免重疊
}

// 動態更新全域 ESG 數值 (在小農上架、媒合或結帳時調用)
function updateGlobalESGCounters(addedWeight, addedCarbon, addedIncome) {
    ESG_STATS.savedWeight += Math.round(addedWeight);
    ESG_STATS.carbonSaved = parseFloat((ESG_STATS.carbonSaved + addedCarbon).toFixed(1));
    ESG_STATS.farmerIncome += Math.round(addedIncome);
    // 假設每拯救 2kg 格外品，在弱勢食堂就能做成 1 份低碳餐盒
    ESG_STATS.welfareMeals = Math.round(ESG_STATS.savedWeight / 2);

    // 隨機加減產地減碳分配，模擬各縣市累積
    const counties = ["苗栗", "台南", "高雄", "台中"];
    const randomCounty = counties[Math.floor(Math.random() * counties.length)];
    ESG_STATS.countyData[randomCounty] = parseFloat((ESG_STATS.countyData[randomCounty] + addedCarbon).toFixed(1));

    // 更新 UI 與圖表
    updateDashboardUI(true);
    renderBarChart();
}

// 更新數字顯示器 (包含滾動增加動畫效果)
function updateDashboardUI(animate = true) {
    const elQuickWeight = document.getElementById('quick-saved-weight');
    const elQuickCarbon = document.getElementById('quick-saved-carbon');
    
    const elDbCarbon = document.getElementById('db-carbon-saved');
    const elDbWeight = document.getElementById('db-saved-weight');
    const elDbIncome = document.getElementById('db-farmer-income');
    const elDbMeals = document.getElementById('db-welfare-meals');

    if (!elQuickWeight) return;

    if (animate) {
        animateNumberValue(elQuickWeight, parseInt(elQuickWeight.innerText.replace(/,/g, '')), ESG_STATS.savedWeight);
        animateNumberValue(elQuickCarbon, parseInt(elQuickCarbon.innerText.replace(/,/g, '')), Math.round(ESG_STATS.carbonSaved));
        animateNumberValue(elDbWeight, parseInt(elDbWeight.innerText.replace(/,/g, '')), ESG_STATS.savedWeight);
        animateNumberValue(elDbCarbon, parseInt(elDbCarbon.innerText.replace(/,/g, '')), Math.round(ESG_STATS.carbonSaved));
        animateNumberValue(elDbIncome, parseInt(elDbIncome.innerText.replace(/,/g, '').replace('NT$ ', '')), ESG_STATS.farmerIncome, "NT$ ");
        animateNumberValue(elDbMeals, parseInt(elDbMeals.innerText.replace(/,/g, '')), ESG_STATS.welfareMeals);
    } else {
        elQuickWeight.innerText = ESG_STATS.savedWeight.toLocaleString();
        elQuickCarbon.innerText = Math.round(ESG_STATS.carbonSaved).toLocaleString();
        elDbWeight.innerText = ESG_STATS.savedWeight.toLocaleString();
        elDbCarbon.innerText = Math.round(ESG_STATS.carbonSaved).toLocaleString();
        elDbIncome.innerText = ESG_STATS.farmerIncome.toLocaleString();
        elDbMeals.innerText = ESG_STATS.welfareMeals.toLocaleString();
    }
}

// 數字跳動增加動畫函數
function animateNumberValue(element, start, end, prefix = "", duration = 1000) {
    if (start === end) return;
    const range = end - start;
    let current = start;
    const increment = end > start ? Math.ceil(range / 20) : Math.floor(range / 20);
    const stepTime = Math.abs(Math.floor(duration / 20));
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.innerText = prefix + current.toLocaleString();
    }, stepTime);
}

// 動態繪製與更新 SVG 長條圖
function renderBarChart() {
    const svg = document.getElementById('svg-bar-chart');
    if (!svg) return;

    // 清理舊的動態條形
    const dynamicElements = svg.querySelectorAll('.dynamic-bar, .dynamic-bar-label');
    dynamicElements.forEach(el => el.remove());

    // 建立漸層色 (如果沒有定義)
    let defs = svg.querySelector('defs');
    if (!defs) {
        defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.innerHTML = `
            <linearGradient id="bar-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="var(--primary-light)" />
                <stop offset="100%" stop-color="var(--primary)" stop-opacity="0.3" />
            </linearGradient>
        `;
        svg.appendChild(defs);
    }

    const counties = Object.keys(ESG_STATS.countyData);
    const maxVal = Math.max(...Object.values(ESG_STATS.countyData)) * 1.15; // 取得最高刻度
    
    const chartHeight = 220; // Y 軸總長度
    const yAxisBase = 240;   // Y 基準線
    const barWidth = 40;     // 長條寬度
    const startX = 80;       // X 起點
    const spacingX = 95;     // 長條間距

    counties.forEach((county, idx) => {
        const val = ESG_STATS.countyData[county];
        const barHeight = (val / maxVal) * 180; // 映射數值到像素高度
        const xPos = startX + idx * spacingX;
        const yPos = yAxisBase - barHeight;

        // 1. 繪製圓角長條
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', xPos);
        rect.setAttribute('y', yAxisBase); // 從底部開始，為了跑動畫
        rect.setAttribute('width', barWidth);
        rect.setAttribute('height', 0);
        rect.setAttribute('rx', 6); // 圓角
        rect.setAttribute('fill', 'url(#bar-gradient)');
        rect.setAttribute('class', 'dynamic-bar');
        
        // CSS 動態高度動畫效果
        rect.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
        
        svg.appendChild(rect);

        // 延遲設定高度以觸發動畫
        setTimeout(() => {
            rect.setAttribute('y', yPos);
            rect.setAttribute('height', barHeight);
        }, 100);

        // 2. 繪製 X 軸地名文字
        const labelText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        labelText.setAttribute('x', xPos + barWidth / 2);
        labelText.setAttribute('y', yAxisBase + 18);
        labelText.setAttribute('text-anchor', 'middle');
        labelText.setAttribute('class', 'chart-text dynamic-bar-label');
        labelText.setAttribute('style', 'font-size:11px; fill:var(--text-main); font-weight:600;');
        labelText.textContent = county;
        svg.appendChild(labelText);

        // 3. 繪製長條頂端的減碳數字
        const valText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        valText.setAttribute('x', xPos + barWidth / 2);
        valText.setAttribute('y', yAxisBase - 5); // 初始在底部
        valText.setAttribute('text-anchor', 'middle');
        valText.setAttribute('class', 'chart-text dynamic-bar-label');
        valText.setAttribute('style', 'font-size:10px; fill:var(--primary-light); font-weight:700; opacity:0; transition:all 1s ease-out;');
        valText.textContent = `${Math.round(val)}`;
        svg.appendChild(valText);

        setTimeout(() => {
            valText.setAttribute('y', yPos - 8);
            valText.style.opacity = '1';
        }, 300);
    });
}

// 繪製與配置圓餅圓環圖 (Donut Chart)
function renderDonutChart() {
    const donutA = document.getElementById('donut-a');
    const donutB = document.getElementById('donut-b');
    const donutC = document.getElementById('donut-c');

    if (!donutA) return;

    const dist = ESG_STATS.gradeDistribution;
    
    // 設定文字百分比
    document.getElementById('leg-percent-a').innerText = `${dist.A}%`;
    document.getElementById('leg-percent-b').innerText = `${dist.B}%`;
    document.getElementById('leg-percent-c').innerText = `${dist.C}%`;

    // SVG 圓環的周長為 2 * PI * r = 2 * 3.14159 * 70 = 439.82
    const totalCircumference = 439.82;
    
    // 計算各段長度
    const lenA = (dist.A / 100) * totalCircumference;
    const lenB = (dist.B / 100) * totalCircumference;
    const lenC = (dist.C / 100) * totalCircumference;

    // 設定 stroke-dasharray (顯示長度 空白長度)
    // A 段
    donutA.setAttribute('stroke-dasharray', `${lenA} ${totalCircumference}`);
    
    // B 段 (需要 dashoffset 來偏移，使其接著 A 段)
    donutB.setAttribute('stroke-dasharray', `${lenB} ${totalCircumference}`);
    donutB.setAttribute('stroke-dashoffset', -lenA);
    
    // C 段 (偏移 A + B 的長度)
    donutC.setAttribute('stroke-dasharray', `${lenC} ${totalCircumference}`);
    donutC.setAttribute('stroke-dashoffset', -(lenA + lenB));
}

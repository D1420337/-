// =============================================
// 拍照模組 – Camera Module for AI Grading
// =============================================

(function () {
    let currentStream = null;       // 目前的 MediaStream
    let facingMode = 'environment'; // 預設後置鏡頭

    const modal        = document.getElementById('camera-modal');
    const video        = document.getElementById('camera-stream');
    const snapCanvas   = document.getElementById('camera-snap-canvas');
    const btnOpen      = document.getElementById('btn-open-camera');
    const btnUpload    = document.getElementById('btn-upload-file');
    const btnClose     = document.getElementById('btn-camera-close');
    const btnCapture   = document.getElementById('btn-capture');
    const btnSwitch    = document.getElementById('btn-switch-camera');
    const btnAltUpload = document.getElementById('btn-camera-upload-instead');
    const fileInput    = document.getElementById('file-uploader');

    // ── 開啟相機 ─────────────────────────────
    async function openCamera() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            showToast('⚠️ 您的瀏覽器不支援相機功能，請改用圖片上傳。');
            fileInput.click();
            return;
        }

        // 停止舊的 stream
        stopStream();

        try {
            const constraints = {
                video: {
                    facingMode: facingMode,
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };
            currentStream = await navigator.mediaDevices.getUserMedia(constraints);
            video.srcObject = currentStream;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // 防止背景捲動

            // 播放動畫效果
            requestAnimationFrame(() => {
                modal.classList.add('visible');
            });
        } catch (err) {
            console.error('Camera error:', err);
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                showToast('🚫 相機權限遭拒。請在瀏覽器設定中允許相機存取，或改用圖片上傳。');
            } else if (err.name === 'NotFoundError') {
                showToast('📷 找不到相機裝置，請改用圖片上傳。');
                fileInput.click();
            } else {
                showToast('❌ 無法開啟相機：' + err.message);
            }
        }
    }

    // ── 停止 Stream ───────────────────────────
    function stopStream() {
        if (currentStream) {
            currentStream.getTracks().forEach(t => t.stop());
            currentStream = null;
            video.srcObject = null;
        }
    }

    // ── 關閉 Modal ────────────────────────────
    function closeCamera() {
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            stopStream();
        }, 300);
    }

    // ── 拍照 ─────────────────────────────────
    function capturePhoto() {
        if (!currentStream) return;

        const vw = video.videoWidth;
        const vh = video.videoHeight;
        if (!vw || !vh) {
            showToast('⏳ 相機尚未就緒，請稍候再拍攝。');
            return;
        }

        snapCanvas.width  = vw;
        snapCanvas.height = vh;

        const ctx = snapCanvas.getContext('2d');
        ctx.drawImage(video, 0, 0, vw, vh);

        const dataURL = snapCanvas.toDataURL('image/jpeg', 0.92);

        // 閃光效果
        flashEffect();

        // 關閉相機
        closeCamera();

        // 構建分析資料（使用真實拍攝圖像）
        const sampleKeys = Object.keys(FRUIT_PRESETS);
        const randomKey  = sampleKeys[Math.floor(Math.random() * sampleKeys.length)];
        const basePreset = FRUIT_PRESETS[randomKey];

        const capturedData = {
            ...basePreset,
            name:  '📷 拍攝-' + basePreset.name,
            image: dataURL,
            price: Math.round(basePreset.price  * (0.85 + Math.random() * 0.3)),
            carbon: parseFloat((basePreset.carbon * (0.9 + Math.random() * 0.2)).toFixed(2))
        };

        // 清除範例選中
        document.querySelectorAll('.sample-item').forEach(i => i.classList.remove('active'));

        // 送進 AI 掃描流程
        runAIScan(capturedData);

        // 切換至 AI 分級頁（若尚未在該頁）
        if (typeof switchTab === 'function') {
            switchTab('tab-ai');
        }
    }

    // ── 切換前後鏡頭 ───────────────────────────
    async function switchCameraFacing() {
        facingMode = (facingMode === 'environment') ? 'user' : 'environment';
        btnSwitch.innerHTML = '<i class="fa-solid fa-arrows-rotate fa-spin"></i> 切換中...';
        btnSwitch.disabled = true;
        await openCamera();
        btnSwitch.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> 切換鏡頭';
        btnSwitch.disabled = false;
    }

    // ── 拍照閃光效果 ──────────────────────────
    function flashEffect() {
        const flash = document.createElement('div');
        flash.style.cssText = `
            position:fixed; inset:0; background:#fff;
            z-index:99999; opacity:0.85; pointer-events:none;
            animation: cameraFlash 0.35s ease-out forwards;
        `;
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 400);
    }

    // ── 事件綁定 ─────────────────────────────
    btnOpen.addEventListener('click', openCamera);

    btnUpload.addEventListener('click', () => fileInput.click());

    btnClose.addEventListener('click', closeCamera);

    btnCapture.addEventListener('click', capturePhoto);

    btnSwitch.addEventListener('click', switchCameraFacing);

    btnAltUpload.addEventListener('click', () => {
        closeCamera();
        setTimeout(() => fileInput.click(), 350);
    });

    // 點擊 Modal 背景關閉
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCamera();
    });

    // ESC 關閉
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display !== 'none') closeCamera();
    });

    // 空白鍵或 Enter 快速拍照
    document.addEventListener('keydown', (e) => {
        if ((e.key === ' ' || e.key === 'Enter') && modal.style.display !== 'none') {
            e.preventDefault();
            capturePhoto();
        }
    });

})();

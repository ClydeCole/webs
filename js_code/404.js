/**
 * 404 頁面跳轉
 *
 * 當使用者造訪不存在的頁面時（如 /#/1122），隨機導向至五種不同風格的 404 頁面之一。
 *
 * 風格列表：
 *   /#/404_pg/404   — 漸層大字 + 漂浮粒子（現代科技）
 *   /#/404_pg/404-2 — 復古終端機 + CRT 掃描線（駭客風）
 *   /#/404_pg/404-3 — 粗獷極簡 + 巨大無襯線字體（brutalist）
 *   /#/404_pg/404-4 — 8-bit 像素 + 紅白機遊戲風（懷舊遊戲）
 *   /#/404_pg/404-5 — 全屏背景圖 + 毛玻璃卡片（風景攝影）
 *
 * 分兩個階段：
 *   1. 初始載入 — 在 docsify 初始化「之前」用同步 XHR 檢查，搶先改 hash
 *   2. 後續導航 — 用 hashchange 事件監聽，非同步檢查
 */
(function() {
    var PAGES = ['404_pg/404-1', '404_pg/404-2', '404_pg/404-3', '404_pg/404-4', '404_pg/404-5', '404_pg/404-6', '404_pg/404-7', '404_pg/404-8'];

    function randomPage() {
        return '#/' + PAGES[Math.floor(Math.random() * PAGES.length)];
    }

    // ── 前置階段：修正無 hash 的 URL ──
    // 不管 hash 是什麼，只要 pathname 不是 /，就把 pathname 搬到 hash 後面。
    // 例：/l/ → /#/l/，/l/l → /#/l/l，/l#/ → /#/l
    if (location.pathname !== '/') {
        location.replace('/#' + location.pathname);
        return;
    }

    // ── 第一階段：初始載入 ──
    // 這一段會在 docsify 完全載入「之前」執行。
    // 因為是同步 XHR，會阻塞後續程式碼，確保 docsify 讀取 hash 時我們已經處理完畢。

    var hash = location.hash;

    // 排除首頁和任一 404 頁面本身
    var is404page = PAGES.some(function(p) { return hash === '#/' + p; });
    if (hash && hash !== '#/' && !is404page) {
        var path = hash.replace(/^#\//, '').replace(/\.md$/, '');

        try {
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', '/' + path + '.md', false);
            xhr.send();

            if (xhr.status === 404) {
                location.hash = randomPage();
            }
        } catch(e) {
            // 同步 XHR 在某些環境會被阻擋，忽略即可
        }
    }

    // ── 第二階段：後續導航 ──
    // 監聽 hash 變化，處理使用者在站內點擊連結或手動修改網址的情況

    window.addEventListener('hashchange', function() {
        var p = location.hash.replace(/^#\//, '').replace(/\.md$/, '') || '/';

        var on404 = PAGES.some(function(page) { return p === page; });
        if (on404 || p === '/') return;

        fetch('/' + p + '.md', { method: 'HEAD' }).then(function(r) {
            if (!r.ok) {
                location.hash = randomPage();
            }
        });
    });
})();

import { Home, Music, Play } from 'lucide-react';

export function getIssues(t) {
    return [
        {
            id: '01',
            icon: <Home className="w-5 h-5" />,
            title: t('Overloaded Home Screen', 'Home 頁資訊過載'),
            insight: t('4 of 5 users skip Home and go straight to Library', '4/5 使用者直接跳過 Home，前往 Library'),
            problem: t(
                '20+ sections load simultaneously with equal visual weight — no hierarchy, no signal. Most users bypass Home entirely; the scrolling cost outweighs any discovery value.',
                'Home 同時載入 20+ 個等權重的 section，沒有層次可循。多數使用者完全跳過 Home，滾動成本遠高於探索價值。'
            ),
            hmw: t(
                "How might we reduce Home's cognitive load without removing discovery?",
                '我們如何在不犧牲探索功能的前提下，降低 Home 頁的認知負擔？'
            ),
            badges: ["Hick's Law", 'Progressive Disclosure', 'User Control'],
            outcome: t(
                "Keep Speed Dial, Featured Playlists, New Releases, and Explore — four sections that cover every core usage pattern. Everything else collapses behind a 'Show More' CTA, preserving discovery without forcing it.",
                '保留 Speed Dial、Featured Playlists、New Releases、Explore 四個涵蓋核心使用情境的 section，其餘收進「Show More」，保留探索功能的同時降低預設負擔。'
            ),
            beforeImg: '/images/YouTubeMusic/home-before.png',
            afterImg: '/images/YouTubeMusic/After1.png',
            beforePoints: [
                t('20+ sections, no visual hierarchy', '20+ section，無視覺層次'),
                t('Extensive scrolling to reach any target', '需大量滾動才能找到目標'),
                t('4 of 5 users skip Home entirely', '4/5 使用者完全跳過 Home'),
            ],
            afterPoints: [
                t('4 core sections on load', '預設只顯示 4 個核心 section'),
                t("'Show More ↓' reveals the rest on demand", 'Show More ↓ 按需展開其餘內容'),
                t('User controls what they see', '使用者掌控自己看到的內容'),
            ],
        },
        {
            id: '02',
            icon: <Music className="w-5 h-5" />,
            title: t('Cluttered Action Bar', '播放頁 Action Bar 雜亂'),
            insight: t('3 of 5 users reported accidental taps due to inconsistent layout', '3/5 使用者因按鈕位置不固定而誤觸'),
            problem: t(
                'Buttons scroll horizontally and shift position by song type, preventing muscle memory. YouTube-legacy controls add visual noise. Every icon carries the same visual weight.',
                '按鈕橫向捲動且隨歌曲類型換位，使用者無法建立肌肉記憶。YouTube 遺留按鈕造成視覺噪音，所有圖示視覺權重完全相同。'
            ),
            hmw: t(
                'How might we make high-frequency actions always visible and visually distinct?',
                '我們如何讓高頻操作固定可見，並在視覺上清晰突出？'
            ),
            badges: ["Fitts's Law", "Jakob's Law", 'Visual Hierarchy'],
            competitive: [
                { app: 'YouTube Music', logic: t('Horizontal scroll', '橫向捲動'), eval: t('Feature-rich but fragmented', '功能豐富但零碎'), highlight: false },
                { app: 'Spotify',       logic: t('Static layout', '靜態配置'), eval: t('Like + Save always fixed — intuitive', 'Like + Save 固定可見，直覺'), highlight: true },
                { app: 'Apple Music',   logic: t('Three-dot menu', '三點選單'), eval: t('Clean but over-hides key actions', '乾淨但高頻操作隱藏過深'), highlight: false },
            ],
            competitiveSummary: t(
                "Spotify's static layout is the clearest benchmark — fixed positions build muscle memory and keep high-frequency actions accessible without scrolling.",
                'Spotify 的靜態版面是最清楚的參考基準——固定位置幫助建立肌肉記憶，高頻操作不需捲動即可取得。'
            ),
            outcome: t(
                "Fix Like, Dislike, Lyrics, Save, and Add to Playlist — removing all YouTube-legacy buttons. Like/Dislike receive stronger visual emphasis to distinguish primary actions from secondary ones.",
                '固定 Like、Dislike、Lyrics、Save、Add to Playlist，移除所有 YouTube 遺留按鈕。Like/Dislike 視覺加強，區分主要與次要操作。'
            ),
            beforeImg: '/images/YouTubeMusic/action-before.png',
            afterImg: '/images/YouTubeMusic/After2.png',
            beforePoints: [
                t('Horizontal scroll hides functions', '橫向捲動隱藏功能'),
                t('Button positions shift by song type', '按鈕位置隨歌曲類型變動'),
                t('All icons share identical visual weight', '所有按鈕視覺權重相同'),
            ],
            afterPoints: [
                t('5 core buttons always visible', '5 個核心按鈕固定可見'),
                t('Legacy controls removed', '遺留按鈕已移除'),
                t('Like / Dislike visually prioritised', 'Like / Dislike 視覺優先突出'),
            ],
        },
        {
            id: '03',
            icon: <Play className="w-5 h-5" />,
            title: t('Disruptive Samples Playback', 'Samples 無預警自動播放'),
            insight: t('5 of 5 users were startled by Samples; most stopped using the feature', '5/5 使用者曾被 Samples 嚇到，多數因此棄用'),
            problem: t(
                'Tapping Samples triggers immediate full-volume video playback with no warning or transition. Every interviewee reported being startled — most eventually abandoned the feature entirely.',
                '點擊 Samples 後系統立即以全音量播放影片，沒有任何過渡。每位受訪者都曾被嚇到，多數人因此完全放棄使用。'
            ),
            hmw: t(
                'How might we give users context and control before Samples starts playing?',
                '我們如何讓使用者在 Samples 開始播放前，擁有足夠的資訊與控制感？'
            ),
            badges: ["Nielsen's Heuristic #1", 'Visibility of System Status', 'User Control'],
            outcome: t(
                "A transition screen appears after tapping Samples — showing album art, song title, artist, and an explicit Play button. Users can browse before committing. This browse-before-play behaviour was completely absent in the original.",
                '點擊 Samples 後進入過渡頁，顯示專輯封面、歌名、藝人名與明確的 Play 按鈕。使用者可先瀏覽再決定播放——這個機制在原版中完全不存在。'
            ),
            beforeImg: '/images/YouTubeMusic/samples-before.png',
            afterImg: '/images/YouTubeMusic/After3-1.png',
            beforePoints: [
                t('Tap → immediate full-volume playback', '點擊 → 立即全音量播放'),
                t('No preview or transition', '無預覽，無過渡'),
                t('Cannot browse before committing', '無法在播放前瀏覽'),
            ],
            afterPoints: [
                t('Tap → transition screen with full context', '點擊 → 顯示完整資訊的過渡頁'),
                t("Explicit 'Play Sample' — user initiates", '明確的 Play Sample 按鈕，使用者主動決定'),
                t('Browse before play — new behaviour', '播放前先瀏覽——全新互動模式'),
            ],
        },
    ];
}

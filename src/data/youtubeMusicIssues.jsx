import { Home, Music, Play } from 'lucide-react';

export function getIssues(t) {
    return [
        {
            id: '01',
            icon: <Home className="w-5 h-5" />,
            title: t('Overloaded Home Screen', 'Home 頁資訊過載'),
            insight: t('4 of 5 users skip Home and go straight to Library', '4/5 使用者直接跳過 Home，前往 Library'),
            problem: t(
                '30+ sections load simultaneously with equal visual weight — no hierarchy, no signal. Most users bypass Home entirely; the scrolling cost outweighs any discovery value.',
                'Home 同時載入 30+ 個等權重的 section，沒有層次可循。多數使用者完全跳過 Home，滾動成本遠高於探索價值。'
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
            beforeImg: '/images/YouTubeMusic/HomeBefore.png',
            afterImg: '/images/YouTubeMusic/After1.png',
            beforePoints: [
                t('30+ sections, no visual hierarchy', '30+ section，無視覺層次'),
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
                "The playback page's Action Bar is small and requires horizontal scrolling. Music management and social interaction functions are mixed, making it hard to navigate.",
                '播放頁的操作列範圍小，需要水平滑動才能看到全部功能，音樂管理與社群互動混合，操作不直覺。'
            ),
            hmw: t(
                'How might we make high-frequency actions always visible and visually distinct?',
                '我們如何讓高頻操作固定可見，並在視覺上清晰突出？'
            ),
            badges: ["Fitts's Law", "Jakob's Law", 'Visual Hierarchy'],
competitive: [
  {
    app: 'YouTube Music',
    logic: t('Actions in a horizontal scroll bar', '操作集中在橫向滑動列'),
    eval: t('Requires swiping — easy to miss', '需滑動才能找到，容易被忽略'),
    highlight: false,
    hoverImg: '/images/YouTubeMusic/ytmsave.png',
  },
  {
    app: 'Spotify',
    logic: t('Core actions fixed on playback page', '核心操作固定在播放頁'),
    eval: t('Consistent position, but icon meaning unclear', '位置一致，但圖示語意不直覺'),
    highlight: true,
    hoverImg: '/images/YouTubeMusic/Spotify.png', 

  },
  {
    app: 'Apple Music',
    logic: t('Two paths: "Liked Songs" fixed on playback page; adding to custom playlist buried under "More"', '兩條路徑：Liked Songs 按鈕固定在播放頁；加入自訂歌單需進入 More，多一層級多一個動作'),
    eval: t('Liked always visible; custom playlist requires extra step', 'Liked 固定可見；加入自訂歌單需額外操作'),
    highlight: false,
    hoverImg: '/images/YouTubeMusic/applesave.png',
  },
],
competitiveSummary: t(
  'Apps with fixed action positions reduce the cognitive cost of locating controls. This supports designing a static 5-button action bar in the redesign.',
  '操作位置固定的 App 能降低尋找控制項的認知成本，支持本次重設計採用靜態 5 按鈕 Action Bar 的決策。'
),
            outcome: t(
                "Fix Like, Dislike, Share, Save, and Download within a single view, removing the need for horizontal scrolling. Lyrics were redesigned as a swipe-up interaction to align with user expectations.",
                '固定 Like、Dislike、Share、Save、Download，取消橫向滑動，讓所有操作維持在單一視野內。歌詞功能改為上滑顯示，建立更符合使用者直覺的互動方式。'
            ),
            beforeImg: '/images/YouTubeMusic/ActionBarBefore.png',
            afterImg: '/images/YouTubeMusic/After2.png',
            beforePoints: [
                t('Horizontal scroll hides functions', '橫向捲動隱藏部分功能'),
                t('Action bar contains too many horizontal buttons, mixing music management and social interaction logics, increasing cognitive load.', '播放頁操作列包含過多橫向按鈕，且混合音樂管理與社群互動兩種不同邏輯的功能，增加理解成本。'),
                t('Users found the action bar buttons too small, and some did not notice the bar at all.', '使用者覺得操作列按鈕過小，有些甚至完全沒有注意到這個操作列。'),
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
            beforeImg: '/images/YouTubeMusic/SamplesBefore.png',
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

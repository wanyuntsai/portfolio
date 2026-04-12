import { useState, useRef, useEffect } from 'react';

const TRACK_URL = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A1002060274&auto_play=false&buying=false&liking=false&download=false&sharing=false&show_artwork=false&show_comments=false&show_playcount=false&show_user=false';

const btnStyle = {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(145deg, #ccc8c0, #a8a49c)',
    border: 'none',
    boxShadow: '2px 2px 4px rgba(0,0,0,0.3), -1px -1px 3px rgba(255,255,255,0.6)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    color: '#333',
};

export default function Walkman() {
    const iframeRef = useRef(null);
    const widgetRef = useRef(null);
    const intervalRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songTitle, setSongTitle] = useState('Full Full Colour');
    const [artist, setArtist] = useState('B.F. Leftwich');
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [ready, setReady] = useState(false);

    const initWidget = () => {
        if (!window.SC || !iframeRef.current) return;
        const widget = window.SC.Widget(iframeRef.current);
        widgetRef.current = widget;

        widget.bind(window.SC.Widget.Events.READY, () => {
            setReady(true);
            widget.getCurrentSound(s => {
                if (s) {
                    setSongTitle(s.title || 'Full Full Colour');
                    setArtist(s.user?.username || 'B.F. Leftwich');
                }
            });
            widget.getDuration(d => setDuration(d));
        });

        widget.bind(window.SC.Widget.Events.PLAY, () => {
            setIsPlaying(true);
            intervalRef.current = setInterval(() => {
                widget.getPosition(p => setProgress(p));
            }, 500);
        });

        widget.bind(window.SC.Widget.Events.PAUSE, () => {
            setIsPlaying(false);
            clearInterval(intervalRef.current);
        });

        widget.bind(window.SC.Widget.Events.FINISH, () => {
            setIsPlaying(false);
            setProgress(0);
            clearInterval(intervalRef.current);
        });
    };

    useEffect(() => {
        if (window.SC) {
            initWidget();
        } else {
            const script = document.createElement('script');
            script.src = 'https://w.soundcloud.com/player/api.js';
            script.async = true;
            script.onload = initWidget;
            document.head.appendChild(script);
        }
        return () => clearInterval(intervalRef.current);
    }, []);

    const togglePlay = () => {
        if (!widgetRef.current || !ready) return;
        isPlaying ? widgetRef.current.pause() : widgetRef.current.play();
    };

    const restart = () => {
        if (!widgetRef.current || !ready) return;
        widgetRef.current.seekTo(0);
    };

    const pct = duration > 0 ? (progress / duration) * 100 : 0;

    return (
        <>
            <style>{`
                @keyframes lcdScroll {
                    0%   { transform: translateX(105%); }
                    100% { transform: translateX(-105%); }
                }
                @keyframes reelSpin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                .wm-btn:active {
                    box-shadow: inset 2px 2px 4px rgba(0,0,0,0.3), inset -1px -1px 2px rgba(255,255,255,0.3) !important;
                    transform: scale(0.96);
                }
            `}</style>

            {/* Hidden SoundCloud iframe */}
            <iframe
                ref={iframeRef}
                title="sc-player"
                src={TRACK_URL}
                allow="autoplay"
                style={{ position: 'absolute', width: 0, height: 0, border: 'none', opacity: 0, pointerEvents: 'none' }}
            />

            {/* Walkman body */}
            <div style={{
                width: '100%',
                background: 'linear-gradient(160deg, #DEDAD2 0%, #B8B4AC 55%, #C8C4BC 100%)',
                borderRadius: '12px 12px 16px 16px',
                padding: '14px 13px 15px',
                boxShadow: '5px 5px 12px rgba(0,0,0,0.32), -2px -2px 6px rgba(255,255,255,0.55), inset 0 1px 0 rgba(255,255,255,0.45)',
                userSelect: 'none',
            }}>
                {/* Top bar: brand + battery */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '7px', fontWeight: '900', letterSpacing: '3px', color: '#666', fontFamily: 'Arial, sans-serif' }}>
                        WALKMAN
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
                        {[1,2,3,4].map(i => (
                            <div key={i} style={{
                                width: '5px', height: '8px',
                                background: i <= 3 ? '#5a8a3a' : 'transparent',
                                border: '1px solid #555', borderRadius: '1px',
                            }} />
                        ))}
                        <div style={{ width: '2px', height: '5px', background: '#555', borderRadius: '0 1px 1px 0', marginLeft: '1px' }} />
                    </div>
                </div>

                {/* LCD screen */}
                <div style={{
                    background: '#1A2C1A',
                    border: '1.5px solid #444',
                    borderRadius: '4px',
                    padding: '8px 10px 9px',
                    marginBottom: '12px',
                    boxShadow: 'inset 2px 2px 6px rgba(0,0,0,0.65), inset -1px -1px 2px rgba(80,130,80,0.08)',
                    overflow: 'hidden',
                }}>
                    {/* Status line */}
                    <div style={{ fontSize: '7px', color: '#4a7a4a', letterSpacing: '1px', marginBottom: '5px', fontFamily: 'monospace' }}>
                        {ready ? "♪ Yun's streaming..." : '♪ loading...'}
                    </div>

                    {/* Scrolling title */}
                    <div style={{ overflow: 'hidden', height: '14px', position: 'relative' }}>
                        <span style={{
                            display: 'inline-block',
                            whiteSpace: 'nowrap',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            color: '#7DDB7D',
                            fontFamily: 'monospace',
                            animation: isPlaying ? 'lcdScroll 12s linear infinite' : 'none',
                        }}>
                            {songTitle}&nbsp;—&nbsp;{artist}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </span>
                    </div>

                    {/* Progress bar */}
                    <div style={{ marginTop: '7px', background: '#0C180C', height: '3px', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{
                            width: `${pct}%`,
                            height: '100%',
                            background: '#5aaa5a',
                            transition: 'width 0.5s linear',
                        }} />
                    </div>
                </div>

                {/* Control buttons */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <button className="wm-btn" onClick={restart} style={btnStyle} title="Restart">⏮</button>
                    <button className="wm-btn" onClick={togglePlay} style={{
                        ...btnStyle,
                        width: '44px', height: '44px', fontSize: '16px',
                        background: 'linear-gradient(145deg, #d4d0c8, #a8a49c)',
                        boxShadow: '3px 3px 7px rgba(0,0,0,0.35), -2px -2px 4px rgba(255,255,255,0.65)',
                    }} title={isPlaying ? 'Pause' : 'Play'}>
                        {isPlaying ? '⏸' : '▶'}
                    </button>
                    <button className="wm-btn" onClick={() => {}} style={{ ...btnStyle, opacity: 0.45, cursor: 'default' }} disabled>⏭</button>
                </div>

                {/* Tape window */}
                <div style={{
                    height: '22px',
                    background: '#1e1e1e',
                    borderRadius: '4px',
                    border: '1px solid #444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: '0 14px',
                }}>
                    {[2.8, 3.4].map((speed, i) => (
                        <div key={i} style={{
                            width: '14px', height: '14px',
                            borderRadius: '50%',
                            border: '2px solid #666',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            animation: isPlaying ? `reelSpin ${speed}s linear infinite` : 'none',
                        }}>
                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#777' }} />
                        </div>
                    ))}
                    {/* tape line between reels */}
                    <div style={{ position: 'absolute', width: '30px', height: '1px', background: '#555' }} />
                </div>
            </div>
        </>
    );
}

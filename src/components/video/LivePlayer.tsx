'use client';

import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Maximize, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { realLiveService } from '@/services/real/realLiveService';

interface LivePlayerProps {
  streamUrl: string;
  matchId: string;
  watchToken?: string;
  memberId?: string;
  className?: string;
}

export const LivePlayer: React.FC<LivePlayerProps> = ({
  streamUrl,
  matchId,
  watchToken,
  memberId,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorCount, setErrorCount] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const retryTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Parse legacy URL structure if needed (based on StreamVideoJS.vue logic)
  const getProcessedUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    
    // Legacy logic: basedomain + channel + stream + playlist.m3u8
    const baseDomain = 'https://stream-rtc-1.aws-live-streaming.com';
    const parts = url.split('/').filter(p => p);
    if (parts.length >= 2) {
      return `${baseDomain}/${parts[0]}/${parts[1]}/playlist.m3u8`;
    }
    return url;
  };

  const finalUrl = getProcessedUrl(streamUrl);

  const initPlayer = () => {
    if (!videoRef.current || !finalUrl) return;

    setIsLoading(true);
    
    // Clean up existing instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
    }

    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
      });

      hls.loadSource(finalUrl);
      hls.attachMedia(video);
      hlsRef.current = hls;

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        video.play().catch(() => {
          // Autoplay might be blocked, ensure it's muted or show play button
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.error('Fatal network error encountered, trying to recover...');
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.error('Fatal media error encountered, trying to recover...');
              hls.recoverMediaError();
              break;
            default:
              console.error('Fatal error, cannot recover');
              handleRetry();
              break;
          }
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = finalUrl;
      video.addEventListener('loadedmetadata', () => {
        setIsLoading(false);
        video.play().catch(() => {});
      });
      video.addEventListener('error', handleRetry);
    }
  };

  const handleRetry = () => {
    setErrorCount(prev => prev + 1);
    setIsLoading(true);
    if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    
    retryTimerRef.current = setTimeout(() => {
      initPlayer();
    }, 5000); // Retry every 5 seconds like legacy code
  };

  useEffect(() => {
    initPlayer();

    // Join Stream Tracking
    if (memberId && watchToken) {
      realLiveService.joinStream({ member_id: memberId, watch_token: watchToken })
        .catch(err => console.error('Join stream track failed:', err));
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }
      if (retryTimerRef.current) {
        clearTimeout(retryTimerRef.current);
      }
      
      // Leave Stream Tracking
      if (memberId && watchToken) {
        realLiveService.leaveStream({ member_id: memberId, watch_token: watchToken })
          .catch(err => console.error('Leave stream track failed:', err));
      }
    };
  }, [finalUrl, matchId]);

  const toggleMute = () => {
    if (videoRef.current) {
      const newMute = !videoRef.current.muted;
      videoRef.current.muted = newMute;
      setIsMuted(newMute);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className={cn(
      "relative w-full aspect-video bg-black rounded-xl overflow-hidden group shadow-2xl",
      isZoomed && "fixed inset-0 z-[100] aspect-none rounded-none",
      className
    )}>
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        playsInline
        autoPlay
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity">
          <RefreshCw className="w-10 h-10 text-[#C2A437] animate-spin mb-3" />
          <p className="text-white/80 text-sm font-medium">กำลังโหลดสตรีม...</p>
        </div>
      )}

      {/* Custom Controls Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleMute}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-white text-sm font-bold uppercase tracking-wider">LIVE</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsZoomed(!isZoomed)}
              className="px-3 py-1.5 hover:bg-white/10 rounded-lg transition-colors text-white text-[10px] font-bold uppercase tracking-tight border border-white/20"
            >
              {isZoomed ? 'ย่อหน้าจอ' : 'ขยายหน้าจอ'}
            </button>
            <button 
              onClick={toggleFullscreen}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Maximize className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Error Retry Indicator */}
      {errorCount > 0 && !isLoading && (
        <div className="absolute top-4 left-4 bg-red-600/80 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur-sm font-bold animate-bounce">
          กำลังพยายามเชื่อมต่อใหม่... ({errorCount})
        </div>
      )}
    </div>
  );
};

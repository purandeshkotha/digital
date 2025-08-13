import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  lessonId: number;
  category: string;
  onComplete?: () => void;
}

import { useProgress } from '../context/ProgressContext';

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, lessonId, category, onComplete }) => {
  const { updateWatchTime } = useProgress();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  // Fallback to English if current language video doesn't exist
  const getFallbackVideoUrl = (url: string) => {
    if (videoError && url.includes('/videos/')) {
      return url.replace(/\/videos\/[a-z]{2}\//, '/videos/en/');
    }
    return url;
  };
  
  const finalVideoUrl = getFallbackVideoUrl(videoUrl);
  
  const isYouTube = videoUrl.includes('youtube.com/embed') || videoUrl.includes('youtu.be');

  const handlePlayPause = () => {
    const video = document.getElementById('lesson-video') as HTMLVideoElement;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const video = document.getElementById('lesson-video') as HTMLVideoElement;
    if (!video || !video.duration) return;
    
    const progress = (video.currentTime / video.duration) * 100;
    setProgress(progress);
    
    updateWatchTime(lessonId, category, progress);
    
    if (progress >= 90 && onComplete) {
      onComplete();
    }
  };

  const handleMute = () => {
    const video = document.getElementById('lesson-video') as HTMLVideoElement;
    if (!video) return;
    
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleRestart = () => {
    const video = document.getElementById('lesson-video') as HTMLVideoElement;
    if (!video) return;
    
    video.currentTime = 0;
    setProgress(0);
  };

  const handleFullscreen = () => {
    const video = document.getElementById('lesson-video') as HTMLVideoElement;
    if (!video || !video.requestFullscreen) return;
    
    video.requestFullscreen();
  };

  return (
    <div className="bg-black rounded-lg overflow-hidden relative group">
      {isYouTube ? (
        <div className="relative">
          <iframe
            className="w-full h-64"
            src={videoUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          ></iframe>
          <button
            onClick={() => onComplete && onComplete()}
            className="absolute bottom-2 right-2 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
          >
            Mark Complete
          </button>
        </div>
      ) : (
        <video
          className="w-full h-64"
          controls
          preload="metadata"
          onEnded={() => onComplete && onComplete()}
          onError={(e) => {
            console.error('Video error:', e);
            console.error('Video URL:', finalVideoUrl);
          }}
          onLoadStart={() => console.log('Video loading started:', finalVideoUrl)}
        >
          <source src={finalVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Mark Complete Button for local videos */}
      {!isYouTube && (
        <button
          onClick={() => onComplete && onComplete()}
          className="absolute bottom-2 right-2 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
        >
          Mark Complete
        </button>
      )}
      
      {/* Error Message */}
      {videoError && (
        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="text-white text-center p-4">
            <p className="mb-2">Video loading failed</p>
            <button 
              onClick={() => {
                setVideoError(false);
                setRetryCount(0);
                const video = document.getElementById('lesson-video') as HTMLVideoElement;
                if (video) video.load();
              }}
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      {/* Title */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
        {title}
      </div>
    </div>
  );
};

export default VideoPlayer;
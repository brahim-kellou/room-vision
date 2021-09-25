import { useEffect, useState } from 'react';

interface videoOptions {
  width?: number,
  height?: number,
  videoRef?: any
}

function useLoadVideo({
  width,
  height,
  videoRef,
}: videoOptions) {

  const [video, setVideo] = useState();

  useEffect(() => {
    async function setupCamera(): Promise<any> {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
          'Browser API navigator.mediaDevices.getUserMedia not available');
      }
      const video = videoRef.current;
      const stream = await navigator.mediaDevices.getUserMedia({
        'audio': false,
        'video': {
          facingMode: 'user',
          width: width,
          height: height,
        },
      });
      videoRef.current.srcObject = stream;

      return new Promise((resolve) => {
        video.onloadedmetadata = () => {
          resolve(video);
        };
      });
    }

    setupCamera().then(video => {
      video.play();
      setVideo(videoRef.current);
    });

    return () => { }

  }, [width, height, videoRef])

  return video;
}

export default useLoadVideo;

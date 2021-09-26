import { Box } from '@mui/system';
import React, { useEffect, useRef } from 'react';
import useLoadModel from './useLoadModel';
import useLoadVideo from './useLoadVideo';

import { draw } from './utils';

interface ObjectDetectionOptions {
  width?: number,
  height?: number,
  onDetection: (objects: any[]) => void,
}

const ObjectDetection: React.FC<ObjectDetectionOptions> = ({
  width,
  height,
  onDetection
}: ObjectDetectionOptions) => {
  const canvasRef = useRef<any>();
  const videoRef = useRef<any>();

  const video = useLoadVideo({
    width,
    height,
    videoRef
  });
  const model = useLoadModel();

  useEffect(() => {
    return () => { }
  }, []);

  useEffect(() => {
    if (!model || !video) return () => { }

    let reqAnimation: any;
    const ctx = canvasRef.current.getContext("2d");

    const detect = async () => {
      const persons = (await model.detect(videoRef.current)).filter((obj: { class: string; }) => obj.class === 'person');

      onDetection(persons);

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.drawImage(video, 0, 0, width, height);
      ctx.restore();

      draw(persons, ctx);

      reqAnimation = requestAnimationFrame(detect);
    }
    detect()

    return () => {
      cancelAnimationFrame(reqAnimation);
    }
  }, [model, video, height, onDetection, width])

  return (
    <Box
      sx={{
        flexDirection: "column", justifyContent: "center", alignItems: "center"
      }}
    >
      <canvas
        width={width} height={height}
        ref={canvasRef}
        style={{ width: '100%' }}
      />
      <video
        width={width} height={height}
        ref={videoRef}
        style={{ display: 'none' }}
      />
    </Box>
  )
}

export default ObjectDetection;

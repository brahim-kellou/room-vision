import { useEffect, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';

function useLoadModel() {
  const [model, setModel] = useState<any>();

  useEffect(() => {
    async function loadModel() {
      return await cocoSsd.load();
    }
    loadModel().then(res => setModel(res))
  }, [])

  return model;
}

export default useLoadModel;

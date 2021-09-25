import { useEffect } from 'react';
import * as cvstfjs from '@microsoft/customvision-tfjs';

function useLoadMaskModel() {
  let model = new cvstfjs.ObjectDetectionModel();

  useEffect(() => {
    async function loadModel() {
      await model.loadModelAsync('model.json');
    }
    loadModel();
  }, [])

  return model;
}

export default useLoadMaskModel;
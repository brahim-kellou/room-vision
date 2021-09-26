import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import React from 'react';
import Metric from './Metric';
import h337 from "heatmap.js";
import { Line } from 'react-chartjs-2';
import { API_Get_Positions_Endpoint } from '../../config';

const width = 600;
const height = 400;

export default function Statistics() {
  const [isHeatMapLoaded, setIsHeatMapLoaded] = React.useState<boolean>(false);
  const [points, setPoints] = React.useState<any[]>([]);
  const heatmapInstanceRef = React.useRef<any>(null);

  React.useEffect(() => {
    heatmapInstanceRef.current = h337.create({ container: document.querySelector('.heatmap') });
    fetch(API_Get_Positions_Endpoint)
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          data[i]['value'] = 1;
        }
        setPoints(data);
        setIsHeatMapLoaded(true);
      });
  }, []);

  React.useEffect(() => {
    if (points.length) {
      initHeatMapData()
    }
  }, [points])

  const initHeatMapData = () => {
    heatmapInstanceRef.current.setData({
      max: 5,
      data: points
    });
    console.log(heatmapInstanceRef.current);
  }

  const data = {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65, 33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76, 33, 25, 35, 51, 54, 76, 33, 25, 35, 51, 54, 76, 33, 25, 35, 51, 54, 76, 33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774"
      }
    ]
  };

  return (
    <>
      <Box style={{ margin: '24px 0' }}>
        <Typography variant="h3" style={{ margin: '8px 0' }}>
          Overview
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Metric title="Average distance between" body="1.2 m" color="#df0a56" />
                </Grid>
                <Grid item xs={6}>
                  <Metric title="Average queeing time" body="10 min" color="#3bdaae" />
                </Grid>
                <Grid item xs={6}>
                  <Metric title="Average distance" body="40 m" color="#e16a1a" />
                </Grid>
                <Grid item xs={6}>
                  <Metric title="Average time spent" body="20 min" color="#6743e6" />
                </Grid>
                <Grid item xs={6}>
                  <Metric title="Social distancing violations" body="5 times" color="#62559d" />
                </Grid>
                <Grid item xs={6}>
                  <Metric title="Mask violations" body="4 times" color="#0096ca" />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Line data={data} />
          </Grid>
        </Grid>
      </Box>

      <Box style={{ margin: '24px 0' }}>
        <Typography variant="h3" style={{ margin: '8px 0' }}>
          Store heatmap
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <div className="heatmap" style={{ height: height, width: width, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {isHeatMapLoaded ? null : <CircularProgress />}
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
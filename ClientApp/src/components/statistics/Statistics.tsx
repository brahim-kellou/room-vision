import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import Metric from './Metric';
import h337 from "heatmap.js";
import { Line } from 'react-chartjs-2';

export default function Statistics() {

  var max = 0;
  var width = 600;
  var height = 400;
  var len = 200;

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

  React.useEffect(() => {
    var heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: document.querySelector('.heatmap')
    });

    var points = [];

    while (len--) {
      var val = Math.floor(Math.random() * 100);
      max = Math.max(max, val);
      var point = {
        x: Math.floor(Math.random() * width),
        y: Math.floor(Math.random() * height),
        value: val
      };
      points.push(point);
    }

    // heatmap data format
    var data = {
      max: max,
      data: points
    };
    // if you have a set of datapoints always use setData instead of addData
    // for data initialization
    heatmapInstance.setData(data);
  });
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
            <div className="heatmap" style={{ height: height, width: width }}></div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import { Box, CardContent, Typography } from '@mui/material';

interface MetricProps {
  title: string,
  body: string,
  color: string
}

const useStyles = makeStyles({
  box: {
    position: 'relative'
  },
  line: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 3,
  },
  card: {
    borderRadius: '0 20px 20px 0',
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
  }
});

function Metric({ title, body, color }: MetricProps) {
  const classes = useStyles();
  const opacity: string = '05';
  const cardBGColor: string = color + opacity;

  return (
    <Box component="div" className={classes.box}>
      <Box component="div" className={classes.line} style={{ backgroundColor: color }}></Box>
      <Card sx={{ maxWidth: 345 }} classes={{ root: classes.card }} style={{ backgroundColor: cardBGColor }}>
        <CardContent>
          <Typography variant="subtitle2">
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={600} style={{ color: color }}>
            {body}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Metric;
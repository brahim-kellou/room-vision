import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import { Box, CardContent, Typography } from '@mui/material';
import { Icon } from 'react-feather';

interface MetricProps {
  title: string,
  body: string,
  color: string,
  children?: React.ReactNode,
}

const useStyles = makeStyles({
  box: {
    position: 'relative',
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

function Metric({ title, body, color, children }: MetricProps) {
  const classes = useStyles();
  const opacity: string = '05';
  const cardBGColor: string = color + opacity;

  return (
    <Box component="div" className={classes.box}>
      <Box component="div" className={classes.line} style={{ backgroundColor: color }}></Box>
      <Card sx={{ maxWidth: 345 }} classes={{ root: classes.card }} style={{ backgroundColor: cardBGColor }}>
        <CardContent>
          <Box sx={{ display: 'flex' }}>
            {children ? <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
              {children}
            </Box> : null}
            <Box>
              <Typography variant="subtitle2">
                {title}
              </Typography>
              <Typography variant="h4" fontWeight={600} style={{ color: color }}>
                {body}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Metric;
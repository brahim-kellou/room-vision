import { Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ObjectDetection from '../object-detection/ObjectDetection';
import Metric from '../statistics/Metric';
import { Users, Percent } from 'react-feather';
import { API_Post_Positions_Endpoint } from '../../config';

const red = '#df0a56'
const green = '#3bdaae'
const orange = '#e16a1a'

export default function LiveAnalysis() {
  const [max, setMax] = React.useState<number>(10);
  const [percent, setPercent] = React.useState<number>(0);
  const [editable, setEditable] = React.useState(false);
  const [countPerson, setCountPerson] = React.useState<number>(0);
  const countPersonRef = React.useRef<number>(0);
  const [color, setColor] = React.useState('#3bdaae');
  const listPersonsPositionsRef = React.useRef<{ x: number, y: number }[]>([]);
  const actualPositionsRef = React.useRef<any[]>([]);

  React.useEffect(() => {
    setInterval(() => {
      addPosition();
    }, 1000);
    setInterval(() => {
      SavePositions();
    }, 10000);

  }, [])

  React.useEffect(() => {
    const newColor = countPerson < max * 0.8 ? green : (
      countPerson < max ? orange : red
    )
    setColor(newColor);
    setPercent(countPerson * 100 / max);
  }, [countPerson])

  const submit = (e: any) => {
    e.preventDefault();
    toggleEditable();

  }

  const toggleEditable = (e?: any): void => {
    if (e) {
      e.preventDefault();
    }
    setEditable(!editable);
  }

  const onDetection = (persons: any[]) => {
    const count = persons.length;
    actualPositionsRef.current = persons;

    if (count !== countPersonRef.current) {
      setCountPerson(() => countPersonRef.current = count);
    }
  }

  const addPosition = () => {
    actualPositionsRef.current.forEach(position => {
      let x = Math.floor((position.bbox[0] + position.bbox[2]) / 2);
      let y = Math.floor((position.bbox[1] + position.bbox[3]) / 2);
      listPersonsPositionsRef.current.push({ x, y });
    });
  }

  const SavePositions = async () => {
    if (listPersonsPositionsRef.current.length) {
      fetch(API_Post_Positions_Endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(listPersonsPositionsRef.current)
      }).then(_ => {
        listPersonsPositionsRef.current = []
      });
    }
  }

  return (
    <div>
      <Box sx={{ display: 'flex', marginBottom: 4 }}>
        <TextField
          disabled={!editable}
          id="max"
          label="Max of persons"
          defaultValue="10"
          value={max}
          onChange={e => setMax(parseInt(e.target.value))}
          style={{ marginRight: 12 }}
          size="small"
        />
        <Button variant="contained" size="small" onClick={submit}>
          {
            editable ? 'Save' : 'Edit'
          }
        </Button>
      </Box>
      <Box>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <ObjectDetection width={1280} height={720} onDetection={onDetection} />
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ marginBottom: 2 }}>
              <Metric title="Number of persons" body={countPerson.toString()} color={color}><Users color={color} /></Metric>
            </Box>
            <Box>
              <Metric title="Percentage of persons" body={percent.toFixed(2).toString()} color={color}><Percent color={color} /></Metric>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
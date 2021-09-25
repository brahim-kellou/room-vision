import { Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import ObjectDetection from '../object-detection/ObjectDetection';
import Metric from '../statistics/Metric';

const red = '#df0a56'
const green = '#3bdaae'
const orange = '#e16a1a'

export default function Live() {
  const [max, setMax] = React.useState<number>(10);
  const [editable, setEditable] = React.useState(false);
  const [countPerson, setCountPerson] = React.useState<number>(0);
  const countPersonRef = React.useRef<number>(0);
  const [color, setColor] = React.useState('#3bdaae');

  React.useEffect(() => {
    const newColor = countPerson < max * 0.8 ? green : (
      countPerson < max ? orange : red
    )
    setColor(newColor);
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

  const onDetection = (objects: any[]) => {
    const count = objects.filter(obj => obj.class === "person").length;

    if (count !== countPersonRef.current) {
      setCountPerson(() => countPersonRef.current = count);
    }
  }

  return (
    <div>
      <Box sx={{ display: 'flex', marginBottom: 4 }}>
        <TextField
          disabled={!editable}
          id="max"
          label="Max"
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
            <ObjectDetection width={600} height={400} onDetection={onDetection} />
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Metric title="Number of persons" body={countPerson.toString()} color={color} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
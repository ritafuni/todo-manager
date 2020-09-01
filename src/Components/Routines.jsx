import React from 'react';
import styled from 'styled-components';
import { drawerWidth } from './Sidebar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* drawer-open class */
  &.drawer-open {
    transform: translateX(${drawerWidth}px);
    transition: 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    width: calc(100% - ${drawerWidth}px);
  }
  /* drawer-close class */
  &.drawer-close {
    transform: translateX(0px);
    transition: 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    width: 100%;
  }
`;

const CustomFormControlLabel = styled(FormControlLabel)`
  margin-bottom: 0;
`;
const Title = styled.h4`
  padding: 8px;
`;

function Routines(props){
  const initRoutine = '';
  const [routine, setRoutine] = React.useState(initRoutine);

  function ChangeRoutine(event){
    setRoutine(event.target.value);
  }

  return (
    <Container
      drawerOpen={props.drawerOpen}
      className={props.drawerOpen ? 'drawer-open' : 'drawer-close'}
    >
      <Title>
        ルーチンタスク
      </Title>
      <FormControl component="fieldset">
        <Grid container spacing={0}>
          <Grid container item xs={4} spacing={0} alignContent="flex-start">
            <FormLabel component="legend">日</FormLabel>
            <RadioGroup aria-label="day" name="day" value={routine} onChange={ChangeRoutine}>
              <CustomFormControlLabel value="everyday" control={<Radio />} label="毎日" />
              <CustomFormControlLabel value="weekday" control={<Radio />} label="平日" />
            </RadioGroup>
          </Grid>
          <Grid container item xs={4} spacing={0} alignContent="flex-start">
            <FormLabel component="legend">週</FormLabel>
            <RadioGroup aria-label="week" name="week" value={routine} onChange={ChangeRoutine}>
              <CustomFormControlLabel value="monday" control={<Radio />} label="月" />
              <CustomFormControlLabel value="tuesday" control={<Radio />} label="火" />
              <CustomFormControlLabel value="wednesday" control={<Radio />} label="水" />
              <CustomFormControlLabel value="thursday" control={<Radio />} label="木" />
              <CustomFormControlLabel value="friday" control={<Radio />} label="金" />
              <CustomFormControlLabel value="saturday" control={<Radio />} label="土" />
              <CustomFormControlLabel value="sunday" control={<Radio />} label="日" />
            </RadioGroup>
          </Grid>
        </Grid>
      </FormControl>
    </Container>
  );
}

export default Routines;

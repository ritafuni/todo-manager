import React from 'react';
import styled from 'styled-components';
import { drawerWidth } from './Sidebar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

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

const ControlLabelDiv = styled.div`
  display: flex;
`;

const CustomFormControlLabel = styled(FormControlLabel)`
  margin-bottom: 0;
  > span {
    padding: 2px;
  }
`;

const RadioGrid = styled(Grid)`
  margin-left: 20px;
`;

const Title = styled.h4`
  padding: 8px;
`;

function Routines(props){
  const initRoutine = {
    type: '',
    weekDOW: '',
    monthDay: '',
    monthWeekNum: '',
    monthDOW: ''
  };
  const [routine, setRoutine] = React.useState(initRoutine);

  function ChangeRoutine(typeIn, weekDOWIn, monthDayIn, monthWeekNumIn, monthDOWIn){
    // setRoutine({event.target.value});
    //DOW...Day of Week
    setRoutine({
      type: typeIn,
      weekDOW: weekDOWIn,
      monthDay: monthDayIn,
      monthWeekNum: monthWeekNumIn,
      monthDOW: monthDOWIn
    });
    console.log(routine);
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
        <RadioGrid container spacing={0}>
          <Grid container item xs={2} spacing={0} alignContent="flex-start">
            <FormLabel component="legend">日</FormLabel>
            <RadioGroup aria-label="day" name="day" value={routine.type} onChange={(event) => ChangeRoutine(event.target.value, '', '', '', '')}>
              <CustomFormControlLabel value="everyday" control={<Radio />} label="毎日" />
              <CustomFormControlLabel value="weekday" control={<Radio />} label="平日" />
            </RadioGroup>
          </Grid>
          <Grid container item xs={2} spacing={0} alignContent="flex-start">
            <FormLabel component="legend">週</FormLabel>
            <RadioGroup aria-label="week" name="week" value={routine.type} onChange={(event) => ChangeRoutine(event.target.value, '', '', '', '')}>
            <CustomFormControlLabel value="every-day-of-week" control={<Radio />} label={
              <ControlLabelDiv>
                <Select
                  value={routine.weekDOW}
                  onChange={(event) => ChangeRoutine('every-day-of-week', event.target.value, '', '', '')}
                >
                  <MenuItem value='月'>月曜日</MenuItem>
                  <MenuItem value='火'>火曜日</MenuItem>
                  <MenuItem value='水'>水曜日</MenuItem>
                  <MenuItem value='木'>木曜日</MenuItem>
                  <MenuItem value='金'>金曜日</MenuItem>
                  <MenuItem value='土'>土曜日</MenuItem>
                  <MenuItem value='日'>日曜日</MenuItem>
                </Select>
                <FormHelperText>曜日</FormHelperText>
              </ControlLabelDiv>
            } />
            </RadioGroup>
          </Grid>
          <Grid container item xs={2} spacing={0} alignContent="flex-start">
            <FormLabel component="legend">月</FormLabel>
            <RadioGroup aria-label="month" name="month" value={routine.type} onChange={(event) => ChangeRoutine(event.target.value, '', '', '', '')}>
              <CustomFormControlLabel value="selected-day" control={<Radio />} label={
                <ControlLabelDiv>
                  <TextField id="outlined-basic" label="指定日" variant="outlined" value={routine.monthDay} onChange={(event) => ChangeRoutine('selected-day', '', event.target.value, '', '')} />
                  <div>日</div>
                </ControlLabelDiv>
              } />
              <CustomFormControlLabel value="selected-day-of-week" control={<Radio />} label={
                <ControlLabelDiv>
                  <Select
                    value={routine.monthWeekNum}
                    onChange={(event) => ChangeRoutine('selected-day-of-week', '', '', event.target.value, routine.monthDOW)}
                  >
                    <MenuItem value='第一'>第一</MenuItem>
                    <MenuItem value='第二'>第二</MenuItem>
                    <MenuItem value='第三'>第三</MenuItem>
                    <MenuItem value='第四'>第四</MenuItem>
                    <MenuItem value='最終'>最終</MenuItem>
                  </Select>
                  <FormHelperText>第何</FormHelperText>
                  <Select
                    value={routine.monthDOW}
                    onChange={(event) => ChangeRoutine('selected-day-of-week', '', '', routine.monthWeekNum, event.target.value)}
                  >
                    <MenuItem value='月'>月曜日</MenuItem>
                    <MenuItem value='火'>火曜日</MenuItem>
                    <MenuItem value='水'>水曜日</MenuItem>
                    <MenuItem value='木'>木曜日</MenuItem>
                    <MenuItem value='金'>金曜日</MenuItem>
                    <MenuItem value='土'>土曜日</MenuItem>
                    <MenuItem value='日'>日曜日</MenuItem>
                  </Select>
                  <FormHelperText>曜日</FormHelperText>
                </ControlLabelDiv>
              } />
              <CustomFormControlLabel value="last-weekday" control={<Radio />} label="最終平日" />
              <CustomFormControlLabel value="last-day" control={<Radio />} label="最終日" />
            </RadioGroup>
          </Grid>
        </RadioGrid>
      </FormControl>
    </Container>
  );
}

export default Routines;

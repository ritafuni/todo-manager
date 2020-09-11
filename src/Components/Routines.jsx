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
import Paper from '@material-ui/core/Paper';

const CalendarDayPaper = styled(Paper)`
  background-color: ${props => {
    let selected = false;
    props.selectedday.forEach(day => {
      if(day === props.daynum){
        selected = true;
      }
    });
    return selected ? "#ffb7d1" : "#ffffff";
  }};
  transition: 225ms;
  height: 60px;
  text-align: center;
  width: 100px;
`;

const CalendarGrid = styled(Grid)`
  /* flex-grow: 1; */
  margin: 10px;
`;

const CalendarHeadPaper = styled(Paper)`
  background-color: #444;
  color: #fff;
  height: 30px;
  text-align: center;
  width: 100px;
`;

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

  > p {
    padding-top: 4px;
  }
`;

const CustomFormControlLabel = styled(FormControlLabel)`
  > span {
    padding: 2px;
  }
`;

const CustomTextField = styled(TextField)`

  > div > input {
    padding: 7px;
    padding-bottom: 9px;
    width: 50px;
  }
  > div > fieldset > legend {
    height: 1px;
  }
`;

const HiddenFormLabel = styled(FormLabel)`
  visibility: hidden;
  margin-bottom: 12px;
`;

const MonthTextAdd = styled.div`
  padding-left: 5px;
  padding-top: 5px;
`;

const RadioGrid = styled(Grid)`
  margin-left: 20px;
`;

const RoutineNameField = styled(TextField)`
  margin: 0 0 15px 10px;
  width: 70%;
  > div > input {
    padding: 10px;
  }
`;

const Title = styled.h4`
  padding: 8px;
`;

function Routines(props){
  const initRoutine = {
    name: '',
    type: '',
    weekDOW: '',
    monthDay: '',
    monthWeekNum: '',
    monthDOW: '',
  };
  const [routine, setRoutine] = React.useState(initRoutine);

  const calendarHeadArray = ['日', '月', '火', '水', '木', '金', '土'];

  function ChangeRoutine(newRoutine){
    //DOW...Day of Week
    setRoutine(
      {
        ...initRoutine,
        ...newRoutine
      }
    );
    console.log(routine);
  }

  function GetSelectedDay(){
    //get selected day from routine
    const monthArray = [...Array(28)].map((ele, idx) => idx + 1);
    let patternArray;
    let lastWeekArray = [31, -1, -2, -3, -4, 29, 30];
    switch(routine.type){
      case 'everyday':
        return [...monthArray, -1, -2, -3, -4, 29, 30, 31];
      case 'weekday':
        patternArray = monthArray.filter(day =>
          (day % 7 !== 0) && (day % 7 !== 1)
        );
        return [...patternArray, -2, -3, -4, 29, 30]
      case 'every-day-of-week':
        patternArray = monthArray.filter(day =>
          day % 7 === routine.weekDOW
        );
        return [...patternArray, lastWeekArray[routine.weekDOW]];
      case 'selected-day':
        return monthArray.filter(day => day === Number(routine.monthDay));
      case 'selected-day-of-week':
        patternArray = monthArray.filter(day =>
          (Math.ceil(day / 7) === routine.monthWeekNum) && (day % 7 === routine.monthDOW)
        );
        let lastWeekSelected = (routine.monthWeekNum === 5) ? lastWeekArray[routine.monthDOW] : null;
        return [...patternArray, lastWeekSelected];
      case 'last-weekday':
        return [30];
      case 'last-day':
        return [31];
      default:
        return [];
    }
  }

  return (
    <Container
      drawerOpen={props.drawerOpen}
      className={props.drawerOpen ? 'drawer-open' : 'drawer-close'}
    >
      <Title>
        新規ルーチンタスク
      </Title>
      <RoutineNameField placeholder="タスク名" variant="outlined" value={routine.name}
        onChange={(event) => ChangeRoutine({
          ...routine,
          name: event.target.value
        })}
      />
      <FormControl component="fieldset">
        <RadioGrid container spacing={0}>
          <Grid container item xs={2} spacing={0} alignContent="flex-start">
            <FormLabel component="legend">日</FormLabel>
            <RadioGroup aria-label="day" name="day" value={routine.type}
              onChange={(event) => ChangeRoutine({
                name: routine.name,
                type: event.target.value
              })}
            >
              <CustomFormControlLabel value="everyday" control={<Radio />} label="毎日" />
              <CustomFormControlLabel value="weekday" control={<Radio />} label="平日" />
            </RadioGroup>
          </Grid>
          <Grid container item xs={2} spacing={0} alignContent="flex-start">
            <FormLabel component="legend">週</FormLabel>
            <RadioGroup aria-label="week" name="week" value={routine.type}
              onChange={(event) => ChangeRoutine({
                name: routine.name,
                type: event.target.value
              })}
            >
            <CustomFormControlLabel value="every-day-of-week" control={<Radio />} label={
              <ControlLabelDiv>
                <FormHelperText>曜日</FormHelperText>
                <Select
                  value={routine.weekDOW}
                  onChange={(event) => ChangeRoutine({
                    name: routine.name,
                    type: 'every-day-of-week',
                    weekDOW: event.target.value
                  })}
                >
                  <MenuItem value={1}>日曜日</MenuItem>
                  <MenuItem value={2}>月曜日</MenuItem>
                  <MenuItem value={3}>火曜日</MenuItem>
                  <MenuItem value={4}>水曜日</MenuItem>
                  <MenuItem value={5}>木曜日</MenuItem>
                  <MenuItem value={6}>金曜日</MenuItem>
                  <MenuItem value={0}>土曜日</MenuItem>
                </Select>
              </ControlLabelDiv>
            } />
            </RadioGroup>
          </Grid>
          <Grid container item xs={3} spacing={0} alignContent="flex-start">
            <FormLabel component="legend">月</FormLabel>
            <RadioGroup aria-label="month" name="month" value={routine.type}
              onChange={(event) => ChangeRoutine({
                name: routine.name,
                type: event.target.value
              })}
            >
              <CustomFormControlLabel value="selected-day" control={<Radio />} label={
                <ControlLabelDiv>
                  <CustomTextField placeholder="指定日" variant="outlined" value={routine.monthDay}
                    onChange={(event) => ChangeRoutine({
                      name: routine.name,
                      type: 'selected-day',
                      monthDay: event.target.value
                    })}
                  />
                  <MonthTextAdd>日</MonthTextAdd>
                </ControlLabelDiv>
              } />
              <CustomFormControlLabel value="selected-day-of-week" control={<Radio />} label={
                <ControlLabelDiv>
                <FormHelperText>第何</FormHelperText>
                  <Select
                    value={routine.monthWeekNum}
                    onChange={(event) => ChangeRoutine({
                      name: routine.name,
                      type: 'selected-day-of-week',
                      monthWeekNum: event.target.value,
                      monthDOW: routine.monthDOW
                    })}
                  >
                    <MenuItem value={1}>第一</MenuItem>
                    <MenuItem value={2}>第二</MenuItem>
                    <MenuItem value={3}>第三</MenuItem>
                    <MenuItem value={4}>第四</MenuItem>
                    <MenuItem value={5}>最終</MenuItem>
                  </Select>
                  <FormHelperText>曜日</FormHelperText>
                  <Select
                    value={routine.monthDOW}
                    onChange={(event) => ChangeRoutine({
                      name: routine.name,
                      type: 'selected-day-of-week',
                      monthWeekNum: routine.monthWeekNum,
                      monthDOW: event.target.value
                    })}
                  >
                    <MenuItem value={1}>日曜日</MenuItem>
                    <MenuItem value={2}>月曜日</MenuItem>
                    <MenuItem value={3}>火曜日</MenuItem>
                    <MenuItem value={4}>水曜日</MenuItem>
                    <MenuItem value={5}>木曜日</MenuItem>
                    <MenuItem value={6}>金曜日</MenuItem>
                    <MenuItem value={0}>土曜日</MenuItem>
                  </Select>
                </ControlLabelDiv>
              } />
            </RadioGroup>
          </Grid>
          <Grid container item xs={2} spacing={0} alignContent="flex-start">
            <HiddenFormLabel component="legend">月</HiddenFormLabel>
            <RadioGroup aria-label="month" name="month" value={routine.type}
              onChange={(event) => ChangeRoutine({
                name: routine.name,
                type: event.target.value
              })}
            >
              <CustomFormControlLabel value="last-weekday" control={<Radio />} label="最終平日" />
              <CustomFormControlLabel value="last-day" control={<Radio />} label="最終日" />
            </RadioGroup>
          </Grid>
        </RadioGrid>
        {/*Calendar*/}
        <CalendarGrid container spacing={0}>
          <Grid item xs={12}>
            <Grid container spacing={0}>
              {
                calendarHeadArray.map(day =>
                  <Grid key={day} item>
                    <CalendarHeadPaper>{day}</CalendarHeadPaper>
                  </Grid>
                )
              }
            </Grid>
          </Grid>
          <Grid item xs={12}>
              {/*using array.map instead of for loop*/}
              {[...Array(4)].map((ele1, idx1) => (
                <Grid container key={idx1} spacing={0}>
                  {[...Array(7)].map((ele2, idx2) => {
                    let keyNum = idx1 * 7 + idx2 + 1;
                    return (
                      <Grid key={keyNum} item>
                        <CalendarDayPaper daynum={keyNum} selectedday={GetSelectedDay()}>{keyNum}</CalendarDayPaper>
                      </Grid>
                    );
                  })}
                </Grid>
              ))}
              <Grid container key={4} spacing={0}>
                <Grid key='fill-1' item>
                  <CalendarDayPaper daynum={-1} selectedday={GetSelectedDay()}>...</CalendarDayPaper>
                </Grid>
                <Grid key='fill-2' item>
                  <CalendarDayPaper daynum={-2} selectedday={GetSelectedDay()}>...</CalendarDayPaper>
                </Grid>
                <Grid key='fill-3' item>
                  <CalendarDayPaper daynum={-3} selectedday={GetSelectedDay()}>...</CalendarDayPaper>
                </Grid>
                <Grid key='fill-4' item>
                  <CalendarDayPaper daynum={-4} selectedday={GetSelectedDay()}>...</CalendarDayPaper>
                </Grid>
                <Grid key={29} item>
                  <CalendarDayPaper daynum={29} selectedday={GetSelectedDay()}>29</CalendarDayPaper>
                </Grid>
                <Grid key={30} item>
                  <CalendarDayPaper daynum={30} selectedday={GetSelectedDay()}>30</CalendarDayPaper>
                </Grid>
                <Grid key={31} item>
                  <CalendarDayPaper daynum={31} selectedday={GetSelectedDay()}>31</CalendarDayPaper>
                </Grid>
              </Grid>
          </Grid>
        </CalendarGrid>
      </FormControl>
    </Container>
  );
}

export default Routines;

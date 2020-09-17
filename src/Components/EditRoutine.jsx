import React from 'react';
import styled from 'styled-components';
// import { drawerWidth } from './Sidebar';
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

const ButtonDiv = styled.div`
  margin: 8px;
`;

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

const CategoryDiv = styled.div`
  margin-left: 10px;
  margin-bottom: 15px;
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

const RoutinecontentDiv = styled.div`
  margin: 0 0 5px 10px;
  vertical-align: middle;
  width: 70%;
  > span {
    display: inline-block;
    margin-top: 5px;
  }
  > div {
    width: calc(100% - 80px);
  }
  > div > div > input {
    padding: 10px;
  }
`;

const Title = styled.h4`
  padding: 8px;
`;

function EditRoutine(props){
  const calendarHeadArray = ['日', '月', '火', '水', '木', '金', '土'];

  const initRoutine = {
    content: '',
    category: '',
    cycleType: '',
    weekDOW: '',
    monthDay: '',
    monthWeekNum: '',
    monthDOW: '',
  };
  const [routine, setRoutine] = React.useState(initRoutine);
  //state for set editing routine
  const [editingRoutineFlag, setEditingRoutineFlag] = React.useState(false);

  function ChangeRoutine(newRoutine){
    //DOW...Day of Week
    setRoutine(
      {
        ...initRoutine,
        ...newRoutine
      }
    );
    console.log(routine);
    return true;
  }

  function GetSelectedDay(){
    //get selected day from routine
    const monthArray = [...Array(28)].map((ele, idx) => idx + 1);
    let patternArray;
    let lastWeekArray = [31, -1, -2, -3, -4, 29, 30];
    switch(routine.cycleType){
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

  function SaveRoutine(){
    if(props.editingRoutineIdx !== -1){
      props.owFunc(props.editingRoutineIdx, routine);
    } else {
      props.addFunc(routine);
    }
    props.changePageFunc('RoutineList');
  }

  return (
    <div>
      {
        //set editing routine to routine
        //the functions will be executed from the left to right
        (props.editingRoutine !== null) && (editingRoutineFlag === false) && ChangeRoutine(props.editingRoutine) && (setEditingRoutineFlag(true))
      }
      <Title>
        新規ルーチンタスク
      </Title>
      <RoutinecontentDiv>
        <span>タスク名：</span>
        <TextField placeholder="タスク名" variant="outlined" value={routine.content}
          onChange={(event) => ChangeRoutine({
            ...routine,
            content: event.target.value
          })}
        />
      </RoutinecontentDiv>
      <CategoryDiv>
        カテゴリ：
        <Select
          value={routine.category}
          onChange={(event) => ChangeRoutine({
            ...routine,
            category: event.target.value
          })}
        >
          <MenuItem value='仕事'>仕事</MenuItem>
          <MenuItem value='家事'>家事</MenuItem>
          <MenuItem value='趣味'>趣味</MenuItem>
        </Select>
      </CategoryDiv>
      <FormControl component="fieldset">
        <RadioGrid container spacing={0}>
          <Grid container item xs={2} spacing={0} alignContent="flex-start">
            <FormLabel component="legend">日</FormLabel>
            <RadioGroup aria-label="day" content="day" value={routine.cycleType}
              onChange={(event) => ChangeRoutine({
                content: routine.content,
                cycleType: event.target.value
              })}
            >
              <CustomFormControlLabel value="everyday" control={<Radio />} label="毎日" />
              <CustomFormControlLabel value="weekday" control={<Radio />} label="平日" />
            </RadioGroup>
          </Grid>
          <Grid container item xs={2} spacing={0} alignContent="flex-start">
            <FormLabel component="legend">週</FormLabel>
            <RadioGroup aria-label="week" content="week" value={routine.cycleType}
              onChange={(event) => ChangeRoutine({
                content: routine.content,
                cycleType: event.target.value
              })}
            >
            <CustomFormControlLabel value="every-day-of-week" control={<Radio />} label={
              <ControlLabelDiv>
                <FormHelperText>曜日</FormHelperText>
                <Select
                  value={routine.weekDOW}
                  onChange={(event) => ChangeRoutine({
                    content: routine.content,
                    cycleType: 'every-day-of-week',
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
            <RadioGroup aria-label="month" content="month" value={routine.cycleType}
              onChange={(event) => ChangeRoutine({
                content: routine.content,
                cycleType: event.target.value
              })}
            >
              <CustomFormControlLabel value="selected-day" control={<Radio />} label={
                <ControlLabelDiv>
                  <CustomTextField placeholder="指定日" variant="outlined" value={routine.monthDay}
                    onChange={(event) => ChangeRoutine({
                      content: routine.content,
                      cycleType: 'selected-day',
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
                      content: routine.content,
                      cycleType: 'selected-day-of-week',
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
                      content: routine.content,
                      cycleType: 'selected-day-of-week',
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
            <RadioGroup aria-label="month" content="month" value={routine.cycleType}
              onChange={(event) => ChangeRoutine({
                content: routine.content,
                cycleType: event.target.value
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
      <ButtonDiv>
        <button className='btn btn-primary' onClick={() => SaveRoutine()}>ルーチンを保存</button>
        <button className='btn btn-primary' onClick={() => props.changePageFunc('RoutineList')}>キャンセル</button>
      </ButtonDiv>
    </div>
  );
}

export default EditRoutine;

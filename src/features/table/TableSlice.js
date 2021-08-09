import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const current = dayjs();
let firstOfMonth = dayjs(current).subtract(dayjs().format("D") - 1, "day");
let days = []
let currentMonth = dayjs(firstOfMonth);
let daysInCurrentMonth = dayjs(currentMonth).daysInMonth();
for (let i = 1; i <= daysInCurrentMonth; i++) {
  days.push(currentMonth)
  currentMonth = dayjs(currentMonth).add(1, "day");
}

const rowsPerTheme = 5;

const getRowsInfo = (rows) => {
  const rowsInfo = [];
  [...Array(rows)].map((index, row) => ( rowsInfo.push({title: row + "test"}) ))
  return rowsInfo
}

export const slice = createSlice({
  name: 'table',
  initialState: {
    rowCount: 10,
    currentDay: dayjs(current),
    rightMonth: dayjs(firstOfMonth),
    leftMonth: dayjs(firstOfMonth),
    firstOfMonth: dayjs(firstOfMonth),
    monthCount: 0,
    days: days,
    tasks: [],
    selectedTask: {selected: false, name: "", desc: "", index: dayjs(), theme: "Default Theme", startDate: dayjs(), endDate: dayjs(), row: ""},
    rowsPerTheme: 5,
    themes: [{title: "Default Theme", color: "#0E5A8A", rows: 5, rowsInfo: getRowsInfo(rowsPerTheme) }],
    themesArray: [],
  },
  reducers: {
    increment: state => {
      state.rowCount += 1;
    },
    decrement: state => {
      if (state.rowCount > 0) {
        state.rowCount -= 1;
      }
    },
    futureMonth: state => {
      state.monthCount += 1;
      state.leftMonth = state.leftMonth.add(1, "month");
      let futureMonth = state.leftMonth;
      console.log(state.leftMonth);
      let futureMonthDays = []
      let daysInFutureMonth = futureMonth.daysInMonth();
      for (let i = 1; i <= daysInFutureMonth; i++) {
        futureMonthDays.push(futureMonth)
        futureMonth = futureMonth.add(1, "day");
      }
      state.days = state.days.concat(futureMonthDays);
    },
    pastMonth: state => {
      state.monthCount += 1
      state.rightMonth = state.rightMonth.subtract(1, "month");
      let pastMonth = state.rightMonth;
      let pastMonthDays = []
      let daysInPastMonth = pastMonth.daysInMonth();
      for (let i = 1; i <= daysInPastMonth; i++) {
        pastMonthDays.push(pastMonth)
        pastMonth = pastMonth.add(1, "day");
      }
      state.days = pastMonthDays.concat(state.days);
    },
    createTask: (state, action) => {
      if (state.tasks.find(task => (task.index).isSame(action.payload.index, "day") && task.row == action.payload.row)) {
        console.log("Task already exists in this cell!");
      }
      else {
        console.log(action.payload);
        state.tasks.push(action.payload);
      }
    },
    dragTask: (state, action) => {
      const isTask = (task) =>  ((task.index).isSame(action.payload.index, "day") && task.row === action.payload.row && task.themeLocation === action.payload.themeLocation);
      const taskIndex = state.tasks.findIndex(isTask);
      let task = state.tasks[taskIndex];
      if (task == undefined) {
        console.log("Task not found!", taskIndex);
      }
      if (action.payload.x > 0) {
        state.tasks[taskIndex].index = dayjs(task.index).add(Math.abs(action.payload.x), "day");
      }
      else if (action.payload.x < 0) {
        state.tasks[taskIndex].index = dayjs(task.index).subtract(Math.abs(action.payload.x), "day");
      }
      if (action.payload.y > 0) { 
        task.row += action.payload.y;
        let themeIndex = state.themes.findIndex(theme => theme.title === task.themeLocation);
        if (task.row >= state.themes[themeIndex].rows) {
          do {
            task.row -= state.themes[themeIndex].rows;
            themeIndex += 1;
            if (!state.themes[themeIndex].rows) {
              break;
            }
          } while (task.row > state.themes[themeIndex].rows);
          task.themeLocation = state.themes[themeIndex].title;
        }
      }
      else if (action.payload.y < 0) {
        task.row += action.payload.y;
        let themeIndex = state.themes.findIndex(theme => theme.title === task.themeLocation);
        if (task.row < 0) {
          do {
            task.row += state.themes[themeIndex].rows;
            themeIndex -= 1;
            if (!state.themes[themeIndex].rows) {
              break;
            }
          } while (task.row < 0);
          task.themeLocation = state.themes[themeIndex].title;
        }
      }
      state.tasks[taskIndex].index = task.index;
      state.tasks[taskIndex].row = task.row;
      state.tasks[taskIndex].themeLocation = task.themeLocation;
      state.selectedTask.index = state.tasks[taskIndex].index;
      state.selectedTask.startDate = state.tasks[taskIndex].index;
      state.selectedTask.themeLocation = state.tasks[taskIndex].themeLocation;
      state.selectedTask.theme = state.tasks[taskIndex].theme;
      state.selectedTask.endDate = state.tasks[taskIndex].index.add(state.tasks[taskIndex].width / 53, "day")
    },
    resizeTask: (state, action) => {
      const isTask = (task) =>  ((task.index).isSame(action.payload.index, "day") && task.row == action.payload.row);
      const taskIndex = state.tasks.findIndex(isTask);
      let task = state.tasks[taskIndex];
      if (task == undefined) {
        console.log("Task not found!", taskIndex);
      }
      state.tasks[taskIndex].width = action.payload.width;
      console.log(action.payload.width)
      if (action.payload.direction == "left") {
        state.tasks[taskIndex].index = dayjs(task.index).subtract(action.payload.resizeChange, "day");
      }
      state.selectedTask.width = state.tasks[taskIndex].width;
      state.selectedTask.index = state.tasks[taskIndex].index;
      state.selectedTask.startDate = state.tasks[taskIndex].index;
      state.selectedTask.endDate = state.tasks[taskIndex].index.add(state.tasks[taskIndex].width / 53, "day")
      
    },
    selectTask: (state, action) => {
      if ((state.selectedTask.index).isSame(action.payload.index, "day") && state.selectedTask.row == action.payload.row) {
        state.selectedTask = {selected: false, name: "", desc: "", index: dayjs(), startDate: dayjs(), endDate: dayjs(), theme: "Default Theme", row: ""}

      }
      else {
        console.log(action.payload.width);
        state.selectedTask = {selected: true, name: action.payload.name, desc: action.payload.desc, index: action.payload.index, theme: action.payload.theme, startDate: dayjs(action.payload.index), endDate: dayjs(action.payload.index).add(action.payload.width/53, "day"), row: action.payload.row};
      }
    },
    renameTask: (state, action) => {
      state.selectedTask.name = action.payload.name;
      const isTask = (task) =>  ((task.index).isSame(state.selectedTask.index, "day") && task.row == state.selectedTask.row);
      const taskIndex = state.tasks.findIndex(isTask);
      state.tasks[taskIndex].name = action.payload.name;
    },
    descTask: (state, action) => {
      state.selectedTask.desc = action.payload.desc;
      const isTask = (task) =>  ((task.index).isSame(state.selectedTask.index, "day") && task.row == state.selectedTask.row);
      const taskIndex = state.tasks.findIndex(isTask);
      state.tasks[taskIndex].desc = action.payload.desc;
    },
    createTheme: (state, action) => {
      state.themes.push({title: action.payload.title, color: action.payload.color, rows: 5, rowsInfo: getRowsInfo(rowsPerTheme)})
    },
    themeTask: (state, action) => {
      state.selectedTask.theme = action.payload.theme;
      const isTask = (task) =>  ((task.index).isSame(state.selectedTask.index, "day") && task.row == state.selectedTask.row);
      const taskIndex = state.tasks.findIndex(isTask);
      state.tasks[taskIndex].theme = action.payload.theme;
    },
    startDateTask: (state, action) => {
      const isTask = (task) =>  ((task.index).isSame(state.selectedTask.index, "day") && task.row == state.selectedTask.row);
      const taskIndex = state.tasks.findIndex(isTask);
      state.selectedTask.index = action.payload.startDate;
      state.selectedTask.startDate = action.payload.startDate;
      state.tasks[taskIndex].index = action.payload.startDate;
      const duration = state.selectedTask.index.diff(state.selectedTask.endDate, "day");
      state.selectedTask.width = Math.abs((duration * 53) + 1);
      state.tasks[taskIndex].width = state.selectedTask.width;

    },
    endDateTask: (state, action) => {
      const isTask = (task) =>  ((task.index).isSame(state.selectedTask.index, "day") && task.row == state.selectedTask.row);
      const taskIndex = state.tasks.findIndex(isTask);
      const duration = state.selectedTask.index.diff(action.payload.endDate, "day");
      state.selectedTask.width = Math.abs((duration * 53) + 1);
      state.selectedTask.endDate = action.payload.endDate;
      state.tasks[taskIndex].width = state.selectedTask.width;
    },
    updateThemesArray: (state, action) => {
      const updateArray = [];
      state.themes.map((theme) => (
        theme.rowsInfo.map((index, row) => (
          updateArray.push({theme: theme, row: row, index: index})
        ))
      ))
      state.themesArray = updateArray;
    }
  },
});


export const { increment, decrement, futureMonth, pastMonth, createTask, dragTask, resizeTask, selectTask, renameTask, descTask, createTheme, themeTask, startDateTask, endDateTask, updateThemesArray } = slice.actions;

export const rowCountTable = state => state.table.rowCount;
export const currentDayTable = state => state.table.currentDay;
export const daysTable = state => state.table.days;
export const tasksTable = state => state.table.tasks;
export const selectedTaskTable = state => state.table.selectedTask;
export const themesTable = state => state.table.themes;
export const rowsPerThemeTable = state => state.table.rowsPerTheme;
export const themesArrayTable = state => state.table.themesArray;

export default slice.reducer;

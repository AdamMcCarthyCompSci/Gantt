import { createSlice } from '@reduxjs/toolkit';
import moment from "moment";

const current = moment();
let firstOfMonth = moment(current).subtract(moment().format("D") - 1, "days")
let days = []
let currentMonth = moment(firstOfMonth);
let daysInCurrentMonth = moment(currentMonth).daysInMonth();
for (let i = 1; i <= daysInCurrentMonth; i++) {
  days.push(currentMonth)
  currentMonth = moment(currentMonth).add(1, "days");
}

export const slice = createSlice({
  name: 'table',
  initialState: {
    rowCount: 10,
    currentDay: moment(current),
    rightMonth: moment(firstOfMonth),
    leftMonth: moment(firstOfMonth),
    firstOfMonth: moment(firstOfMonth),
    monthCount: 0,
    days: days,
    tasks: [],
    selectedTask: {selected: false, name: "", desc: "", index: moment(), theme: "No Theme Selected", row: ""},
    themes: [{title: "No Theme Selected", color: "#ffffff"}]
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
      state.leftMonth.add(1, "month");
      let futureMonthDays = []
      let futureMonth = moment(state.leftMonth);
      let daysInFutureMonth = moment(futureMonth).daysInMonth();
      for (let i = 1; i <= daysInFutureMonth; i++) {
        futureMonthDays.push(futureMonth)
        futureMonth = moment(futureMonth).add(1, "days");
      }
      state.days = state.days.concat(futureMonthDays);
    },
    pastMonth: state => {
      state.monthCount += 1
      state.rightMonth.subtract(1, "month");
      let pastMonthDays = []
      let pastMonth = moment(state.rightMonth)
      let daysInPastMonth = moment(pastMonth).daysInMonth();
      for (let i = 1; i <= daysInPastMonth; i++) {
        pastMonthDays.push(pastMonth)
        pastMonth = moment(pastMonth).add(1, "days");
      }
      state.days = pastMonthDays.concat(state.days);
    },
    createTask: (state, action) => {
      if (state.tasks.find(task => (task.index).isSame(action.payload.index, "day") && task.row == action.payload.row)) {
        console.log("Task already exists in this cell!");
      }
      else {
        state.tasks.push(action.payload)
      }
    },
    dragTask: (state, action) => {
      const isTask = (task) =>  ((task.index).isSame(action.payload.index, "day") && task.row == action.payload.row);
      const taskIndex = state.tasks.findIndex(isTask);
      let task = state.tasks[taskIndex];
      if (task == undefined) {
        console.log("Task not found!", taskIndex);
      }
      if (action.payload.x > 0) {
        state.tasks[taskIndex].index = moment(task.index).add(Math.abs(action.payload.x), "days");
      }
      else if (action.payload.x < 0) {
        state.tasks[taskIndex].index = moment(task.index).subtract(Math.abs(action.payload.x), "days");
      }
      if (action.payload.y > 0) {
        task.row += action.payload.y;
      }
      else if (action.payload.y < 0) {
        task.row += action.payload.y;
      }
      state.tasks[taskIndex].index = task.index;
      state.tasks[taskIndex].row = task.row;
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
        state.tasks[taskIndex].index = moment(task.index).subtract(Math.abs(action.payload.resizeChange), "days");
      }
    },
    selectTask: (state, action) => {
      if ((state.selectedTask.index).isSame(action.payload.index, "day") && state.selectedTask.row == action.payload.row) {
        state.selectedTask = {selected: false, name: "", desc: "", index: moment(), theme: "No Theme Selected", row: ""}

      }
      else {
        state.selectedTask = {selected: true, name: action.payload.name, desc: action.payload.desc, index: action.payload.index, theme: action.payload.theme, row: action.payload.row};
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
      state.themes.push({title: action.payload.title, color: action.payload.color})
    },
    themeTask: (state, action) => {
      state.selectedTask.theme = action.payload.theme;
      const isTask = (task) =>  ((task.index).isSame(state.selectedTask.index, "day") && task.row == state.selectedTask.row);
      const taskIndex = state.tasks.findIndex(isTask);
      state.tasks[taskIndex].theme = action.payload.theme;
    }
  },
});

export const { increment, decrement, futureMonth, pastMonth, createTask, dragTask, resizeTask, selectTask, renameTask, descTask, createTheme, themeTask } = slice.actions;

export const rowCountTable = state => state.table.rowCount;
export const currentDayTable = state => state.table.currentDay;
export const daysTable = state => state.table.days;
export const tasksTable = state => state.table.tasks;
export const selectedTaskTable = state => state.table.selectedTask;
export const themesTable = state => state.table.themes;

export default slice.reducer;

import { StoreProvider, action, createStore } from "easy-peasy";
import { getLSData, saveSessionData, getTimeData } from "./utils/glopFunction";
import {
  filterStatisticData,
  getStatisticForWeek,
} from "./utils/statisticData";
import { TimerPomodoro } from "./components/TimerPomodoro";
import { StatisticPomodoro } from "./components/StatisticPomodoro";
import { Header } from "./components/Header";
import { Container } from "./components/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { testStatisticData } from "./utils/test";
import "./main.global.css";

function App() {
  const KEY_LS_STATISTIC = "statisticPomodoroApplicationSkillbox";
  // тестовые данные для статистики
  // saveSessionData(KEY_LS_STATISTIC, testStatisticData);
  // тестовый данные для статистики
  const KEY_LS_TASKS = "tasksPomodoroApplicationSkillbox";
  const KEY_LS_DARK_MODE = "darkModePomodoroApplicationSkillbox";
  const KEY_LS_CHANGE_TIMER = "changeTimerPomodoroApplicationSkillbox";

  const dataStatistic = getLSData(KEY_LS_STATISTIC);
  const actualDataStatistic = filterStatisticData(dataStatistic);
  saveSessionData(KEY_LS_STATISTIC, actualDataStatistic);
  const statisticForWeek = getStatisticForWeek(actualDataStatistic);

  const defaultTasks = getLSData(KEY_LS_TASKS);

  const darkModeData = getLSData(KEY_LS_DARK_MODE);
  if (typeof window !== "undefined") {
    document.body.classList.toggle("dark-mode", darkModeData);
  }

  let defaultTimerTime = getLSData(KEY_LS_CHANGE_TIMER);
  if (!defaultTimerTime) {
    defaultTimerTime = {
      timeWork: 1,
      shortBreak: 2,
      bigBreak: 3,
    };
    saveSessionData(KEY_LS_CHANGE_TIMER, defaultTimerTime);
  }

  const todayNum = getTimeData().day;

  function setValueTasks(state, key, value) {
    let index = 0;
    let currentTask = {};

    if (state.tasks.length) {
      currentTask = state.tasks.find((task, i) => {
        const findEl = task.id === state.idTask;
        if (findEl) {
          index = i;
        }
        return findEl;
      });

      if (!currentTask) currentTask = state.tasks[0];
    }

    const startPart = state.tasks.slice(0, index);
    const endPart = state.tasks.slice(index + 1, state.tasks.length);

    state.tasks = [...startPart, { ...currentTask, [key]: value }, ...endPart];
    saveSessionData(state.keyLocalStorageTasks, state.tasks);
  }

  const taskId =
    defaultTasks !== null && defaultTasks.length
      ? String(defaultTasks[0].id)
      : "";

  const store = createStore({
    keyLocalStorageTasks: KEY_LS_TASKS,
    keyLocalStorageStatistic: KEY_LS_STATISTIC,
    keyLocalStorageDarkMode: KEY_LS_DARK_MODE,
    keyLocalStorageChangeTimer: KEY_LS_CHANGE_TIMER,

    numDay: todayNum,
    setNumDay: action((state, num) => {
      state.numDay = num;
    }),

    statisticWeekData: statisticForWeek,
    setDataForWeek: action((state, newData) => {
      state.statisticWeekData = newData;
    }),

    tasks: defaultTasks !== null ? defaultTasks : [],
    setTasks: action((state, newTasks) => {
      state.tasks = newTasks;
    }),
    addTask: action((state, task) => {
      state.tasks = [task, ...state.tasks];
    }),

    defaultSeconds: defaultTimerTime,
    setDefaultSeconds: action((state, dataTime) => {
      state.defaultSeconds = dataTime;
    }),

    setSeconds: action((state, sec) => {
      setValueTasks(state, "seconds", sec);
    }),

    setStatus: action((state, text) => {
      setValueTasks(state, "status", text);
      state.status = text;
    }),

    setTimerActive: action((state, timerState) => {
      setValueTasks(state, "timerActive", timerState);
    }),

    setNumber: action((state, num) => {
      setValueTasks(state, "number", num);
    }),

    setPomodoroCount: action((state, num) => {
      let number = 0;
      if (num <= 3) number = num;
      setValueTasks(state, "pomodoroCount", number);
    }),

    timeoutId: 0,
    setTimeoutId: action((state, idTimeout) => {
      state.timeoutId = idTimeout;
    }),

    isDeleteConfirm: false,
    setIsDeleteConfirm: action((state, booleanValue) => {
      state.isDeleteConfirm = booleanValue;
    }),

    idTask: taskId,
    setIdTask: action((state, idTask) => {
      state.idTask = idTask;
    }),
    refTask: null,
    setRefTask: action((state, ref) => {
      state.refTask = ref;
    }),
    isDarkMode: darkModeData === null ? false : darkModeData,
    setIsDarkMode: action((state, statusMode) => {
      state.isDarkMode = statusMode;
    }),
    isTomatoOff: false,
    setIsTomatoOff: action((state, statusTomato) => {
      state.isTomatoOff = statusTomato;
    }),
    isChangeTimer: false,
    setIsChangeTimer: action((state, seconds) => {
      state.isChangeTimer = seconds;
    }),
    isMuteAlert: false,
    setIsMuteAlert: action(state => {
      state.isMuteAlert = !state.isMuteAlert;
    }),
  });

  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Header />
        <Container localStyle={["flex"]}>
          <Routes>
            <Route path="/" element={<TimerPomodoro />} />
            <Route path="/timerPomodoro" element={<TimerPomodoro />} />
            <Route path="/statisticPomodoro" element={<StatisticPomodoro />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </StoreProvider>
  );
}

export default App;

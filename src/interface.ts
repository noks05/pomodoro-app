import { Action } from "easy-peasy";

export interface IStorePomodoroBox {
    tasks: string;
    statisticWeekData: IStatisticDayData[];
    setDataForWeek: any;
    status: string;
    numDay: number;
    setNumDay: any;
    keyLocalStorageTasks: string;
    keyLocalStorageStatistic: string;
    keyLocalStorageDarkMode: string;
    keyLocalStorageChangeTimer: string;
    defaultSeconds: { timeWork: number; shortBreak: number; bigBreak: number; };
    setDefaultSeconds: any;
    setTasks: any;
    addTask: any;
    setSeconds: any;
    setStatus: any;
    setTimerActive: any;
    setNumber: any;
    timeoutId: number;
    setTimeoutId: any;
    isDeleteConfirm: boolean;
    setIsDeleteConfirm: any;
    idTask: string;
    setIdTask: any;
    refTask: null,
    setRefTask: any;
    isDarkMode: boolean;
    setIsDarkMode: any;
    isTomatoOff: boolean;
    setIsTomatoOff: any;
    isChangeTimer: boolean;
    setIsChangeTimer: any;
    setPomodoroCount: Action<{}, number>;
    isMuteAlert: boolean;
    setIsMuteAlert: Action<{}>;
}

export interface ITaskData {
    name: string,
    number: number,
    id: string,
    seconds: number,
    status: string,
    timerActive: boolean,
    pomodoroCount: number;
}

export interface IControlsProps {
    coordinates?: { top: number, left: number };
    idTask: string;
    setTasks: (data: ITaskData[]) => void;
    tasks: ITaskData[];
    setIsDeleteConfirm: (data: boolean) => void;
    refTask: React.MutableRefObject<null | Element>;
}

export interface IDeleteConfirmProps {
    tasksData: ITaskData[];
    setTasks: (data: ITaskData[]) => void;
}

export interface ITaskProps {
    task: ITaskData;
    tasksData: ITaskData[];
    setTasks: (data: ITaskData[]) => void;
}

export interface IRightBodyProps {
    task: ITaskData;
    seconds: number;
    statusMute: boolean;
    status: string;
    dataBtns: {
        [key: string]: {
            btnOne: TDataBtn,
            btnTwo: TDataBtn,
        }
    }
}

export interface IStatisticPropsElements {
    dataForWeek: IStatisticDayData[];
    numDay: number;
}

export interface INumberDataProps {
    title: string;
    dataDay?: IStatisticDayData;
    stylesBox: string;
}

export interface IStatisticDayData {
    work: number;
    startPause: number;
    pause: number;
    stop: number;
    day: number;
    pomodoro: number;
}

export type TOnClose = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, ref: React.MutableRefObject<null>) => void;
export type TDataBtn = { text: string; onClick: () => void };

export interface IModalGenericProps {
    data: { title: string; btnTopText: string; btnBottomText: string; btnType?: string; btnForm?: string; };
    children?: React.ReactElement;
    classes?: {
        classBtnTop?: string;
        classBtnBottom?: string;
        classBtnClose?: string;
    };
    handleBtnAgree: (e: any) => void;
    onCloseModal: () => void;
}
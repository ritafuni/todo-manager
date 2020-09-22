export const initialTasks = {
  tasks: {
    "task-1": { id: "task-1", content: "ゴミ捨て", category: "家事", taskType: "毎週"},
    "task-2": { id: "task-2", content: "TVを見る", category: "趣味", taskType: "不定期"},
    "task-3": { id: "task-3", content: "スマホの充電", category: "家事", taskType: "毎日"},
    "task-4": { id: "task-4", content: "夕食調理", category: "家事", taskType: "毎日"}
  },
  taskCount: 4,
  columns: {
    "column-1": {
      id: "column-1",
      title: "2020/08/28 のタスク",
      taskIds: ["task-1", "task-2", "task-3", "task-4"]
    }
  }
};

export const initialRoutines = {
  routines: [
    { id: "routine-1", content: "打刻", category: "仕事", cycle: "平日", cycleType: "weekday" },
    { id: "routine-2", content: "わくわくマイレージ入力", category: "仕事", cycle: "平日", cycleType: "weekday" },
    { id: "routine-3", content: "勤務予定届", category: "仕事", cycle: "金曜日", cycleType: "every-day-of-week", weekDOW: 6 }
  ],
  routineCount: 3
};

export const initialDeadlines = {
  deadlines: [
    { id: "deadline-1", content: "面談", category: "仕事", deadline: "2020-10-10" },
    { id: "deadline-2", content: "勉強", category: "趣味", deadline: "2020-12-31" },
    { id: "deadline-3", content: "飲み会", category: "趣味", deadline: "2020-09-30" },
  ],
  deadlineCount: 3
}

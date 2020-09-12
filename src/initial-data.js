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
  routines: {
    "routine-1": { id: "routine-1", content: "打刻", category: "仕事", cycle: "平日" },
    "routine-2": { id: "routine-2", content: "打刻", category: "仕事", cycle: "平日" },
    "routine-3": { id: "routine-3", content: "勤務予定届", category: "仕事", cycle: "金曜日" }
  },
  routineCount: 3
};

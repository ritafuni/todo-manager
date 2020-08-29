const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "ゴミ捨て", category: "家事", taskType: "Weekly"},
    "task-2": { id: "task-2", content: "TVを見る", category: "趣味", taskType: ""},
    "task-3": { id: "task-3", content: "スマホの充電", category: "家事", taskType: "Daily"},
    "task-4": { id: "task-4", content: "夕食調理", category: "家事", taskType: "Daily"}
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "2020/08/28 のタスク",
      taskIds: ["task-1", "task-2", "task-3", "task-4"]
    }
  }
};

export default initialData;

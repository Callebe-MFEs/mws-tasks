export * from "./tasks-list";
export * from "./task-details";
export * from "./task-form";

export const routes = [
  { path: "/", component: "mws-tasks-list" },
  { path: "/edit/:taskId?", component: "mws-task-form" },
  { path: "/:taskId", component: "mws-task-details" },
];

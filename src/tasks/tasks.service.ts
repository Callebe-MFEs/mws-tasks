export type Task = {
  id: number;
  name: string;
  description: string;
};

let id = 0;

export class TasksServices {
  protected static $instance: TasksServices;

  static get instance(): TasksServices {
    if (!TasksServices.$instance) TasksServices.$instance = new TasksServices();
    return TasksServices.$instance;
  }

  protected constructor() {}

  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  getTask(id: number): Task {
    return this.tasks.find((task) => task.id === id);
  }

  saveTask(task: Task): void {
    task.id = task.id || ++id;
    this.removeTask(task.id);
    this.tasks.push(task);
  }

  removeTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}

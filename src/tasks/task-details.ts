import { LitElement, PropertyValueMap, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import style from "./app.style.scss";
import { Task, TasksServices } from "./tasks.service";

@customElement("mws-task-details")
export class MWSTaskDetailsComponent extends LitElement {
  // static styles = [style];

  @property({ type: Number })
  set taskId(id: number) {
    this.task = TasksServices.instance.getTask(id) || {
      id: 0,
      name: "",
      description: "",
    };
  }

  get taskId(): number {
    return this.task.id;
  }

  @state()
  private task: Task = { id: 0, name: "", description: "" };

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(_changedProperties);
    this.taskId = +((this as any).location?.params?.taskId || 0);
  }

  render() {
    return html`
      <div>
        <h2>Task - ${this.task.name}</h2>
        <div>
          <label>Name: ${this.task.name} </label>
        </div>
        <div>
          <label for="description"
            >Description: ${this.task?.description}
          </label>
        </div>

        <a href="../">Go back</a>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mws-task-details": MWSTaskDetailsComponent;
  }
}

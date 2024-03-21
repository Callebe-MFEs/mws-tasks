import { LitElement, PropertyValueMap, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import style from "./app.style.scss";
import { Task, TasksServices } from "./tasks.service";
import { stat } from "fs";
import { Router } from "@vaadin/router";

@customElement("mws-task-form")
export class MWSTaskFormComponent extends LitElement {
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

  submit(e: Event) {
    e.preventDefault();
    TasksServices.instance.saveTask(this.task);
    Router.go(`./${this.task.id}`);
  }

  render() {
    return html`
      <div>
        <h2>${this.task.id ? `Task - ${this.task.name}` : "New Task"}</h2>
        <form @submit=${this.submit}>
          <div>
            <label for="name">Name: 
              <input type="text" id="name" name="name" value="${
                this.task.name
              }" @change=${(e) => (this.task.name = e.target.value)} />
            </label>
          </div>
          <div>
            <label for="description">Description: 
            <textarea id="description" name="description" @change=${(e) =>
              (this.task.description = e.target.value.trim())}>${
      this.task?.description
    }
            </textarea>
            </label>
          </div>
          <div>
            <button type="submit">Save</button>
          </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mws-task-form": MWSTaskFormComponent;
  }
}

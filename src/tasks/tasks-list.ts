import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import style from "./app.style.scss";
import { TasksServices } from "./tasks.service";
import { getRouter } from "../router";

@customElement("mws-tasks-list")
export class MWSTasksListComponent extends LitElement {
  static styles = [
    css`
      table {
        width: 100%;
        border-collapse: collapse;
        border: 1px solid;
      }
    `,
  ];

  render() {
    const router = getRouter();
    return html`
      <div>
        <h2>Tasks List</h2>
        <div><a href=${router.urlForName("mws-task-form")}>New Task</a></div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${TasksServices.instance.getTasks().map(
              (task) => html`
                <tr>
                  <td>${task.id}</td>
                  <td>${task.name}</td>
                  <td>${task.description}</td>
                  <td>
                    <a
                      href=${router.urlForName("mws-task-form", {
                        taskId: `${task.id}`,
                      })}
                      >Edit</a
                    >
                    <a
                      href=${router.urlForName("mws-task-details", {
                        taskId: `${task.id}`,
                      })}
                      >View</a
                    >
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mws-tasks-list": MWSTasksListComponent;
  }
}

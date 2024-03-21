import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import style from "./app.style.scss";

@customElement("mws-tasks-list")
export class MWSTasksListComponent extends LitElement {
  // static styles = [style];

  render() {
    return html`
      <div>
        <p>Tasks List</p>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mws-tasks-list": MWSTasksListComponent;
  }
}

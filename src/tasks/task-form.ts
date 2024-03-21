import { LitElement, PropertyValueMap, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import style from "./app.style.scss";

@customElement("mws-task-form")
export class MWSTaskFormComponent extends LitElement {
  // static styles = [style];

  @property({ type: Number })
  taskId: number | undefined = undefined;

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(_changedProperties);
    this.taskId = (this as any).location?.params?.taskId;
  }

  render() {
    return html`
      <div>
        <p>Task Form ${this.taskId ? this.taskId : "New"}</p>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mws-task-form": MWSTaskFormComponent;
  }
}

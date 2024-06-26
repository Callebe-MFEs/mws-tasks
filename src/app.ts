import { LitElement, PropertyValueMap, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import style from "./app.style.scss";
import { getRouter, newRouter } from "./router";

@customElement("mws-tasks-app")
export class MWSTasksAppComponent extends LitElement {
  static styles = [style];

  @property({ type: String })
  basepath: string = "";

  protected firstUpdated(
    _changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
  ): void {
    super.firstUpdated(_changedProperties);
    const router = newRouter(this.shadowRoot.querySelector("#outlet"));

    router.setRoutes([
      {
        path: `${this.basepath || "/"}`,
        children: () => import("./tasks").then((module) => module.routes),
      },
      {
        path: "(.*)",
        component: "div",
      },
    ]);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    getRouter().unsubscribe();
  }

  render() {
    return html`
      <div class="mws-tasks-app">
        <div id="outlet"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mws-tasks-app": MWSTasksAppComponent;
  }
}

export * from "./app";

const template = (props) => {
  const myComponent = document.createElement("mws-tasks-app");
  myComponent.basepath = props.basepath;
  return myComponent;
};

const containerGetter = (props) => {
  const htmlId = `single-spa-application:${props.name}`;
  return document.getElementById(htmlId);
};

export const mount = async (props) => {
  const container = containerGetter(props);
  container.appendChild(template(props));
};

export const unmount = async (props) => {
  const container = containerGetter(props);
  container.innerHTML = "";
};

export const bootstrap = async (props) => {};

import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("Create");
  }

  async getHtml() {
    return `
      <h1>hello every one this is create page</h1>
    `;
  }
}

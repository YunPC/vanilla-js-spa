import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super();
    this.setTitle("신년 메시지 앱");
  }

  async getHtml() {
    return `
      <nav>
        <a href="/create" class="btn red" data-link>✏️ 새 글 작성하기</a>
      </nav>
    `;
  }
}

import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("신년 메시지 앱");
  }

  async fetchMessages() {
    const {
      data: {
        data: { posts },
      },
    } = await axios.get("api/posts", {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    return posts;
  }

  async getHtml() {
    const messages = await this.fetchMessages();
    const postListHtml = messages
      .map(
        (
          message
        ) => `<li class="list-item"><a href="/${message.postId}" class="list-item-link">
        <img src="${message.image}" alt="${message.title}의 첨부 이미지" class="card-image" />
        <div class="list-description">
          <span class="long-text">${message.title}</span>
          <span class="long-text">${message.content}</span>
        </div>
      </a></li>`
      )
      .join("");
    return `
      <nav>
        <a href="/create" class="btn red" data-link>✏️ 새 글 작성하기</a>
      </nav>
      <ul class="list-style">
        ${postListHtml}
      </ul>
    `;
  }
}

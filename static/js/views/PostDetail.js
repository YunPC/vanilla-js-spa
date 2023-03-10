import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("신년 메시지 상세 페이지");
    this.postData = null;
  }

  addBackButton() {
    const header = document.querySelector("header");
    header.innerHTML = `<a href="/">&#8249</a> HPNY 2023`;
  }

  async fetchMessage(id) {
    const {
      data: { data },
    } = await axios.get(`api/post/${id}`);
    this.postData = { ...data };
    return { ...data };
  }

  turnToEditMode() {
    const postCardDescriptionNode = document.querySelector(
      ".post-card-description"
    );
    postCardDescriptionNode.innerHTML = `<form action="#" data-confirm-post-modify>
      <input type="text" value="${this.postData.post.title}" />
      <textarea type="text">${this.postData.post.content}</textarea>
      <button type="submit" class="btn red">수정</button>
    </form>`;
  }

  async editMessage(data) {
    await axios.patch(`api/post/${this.params.id}`, {
      ...data,
    });
    return;
  }

  async deleteMessage() {
    await axios.delete(`api/post/${this.params.id}`);
    return;
  }

  async postComment(content) {
    await axios.post(`api/comment/${this.params.id}`, {
      content,
    });
    return;
  }

  async deleteComment(id) {
    await axios.delete(`api/comment/${id}`);
    return;
  }

  async getHtml() {
    this.addBackButton();
    const { post, comments } = await this.fetchMessage(this.params.id);
    const postCardHtml = `
      <div class="post-card">
        <img src="${post.image}" alt="${
      post.title
    }의 사진" class="post-card-image"/>
      <div class="post-card-description">
        <div>
          <h2>${post.title}</h2>
          <time>${post.createdAt.substring(0, 10).replaceAll("-", ". ")}</time>
          <p>${post.content}</p>
        </div>
        <ul class="post-card-button-list">
            <li><button class="btn red mini post-card-button-item" data-modify-message-button>✏️ 수정</button></li>
            <li><button class="btn red mini post-card-button-item" data-delete-message-button>😵 삭제</button></li>
        </ul>
      </div>
      </div>
    `;
    const commentsHtml = comments
      .map(
        (
          comment
        ) => `<li class="comment-list-item" id="comment-item-${comment.commentId}">
      ${comment.content}
      <button class="comment-delete-button" data-comment-item-delete-button>❌</button>
      </li>`
      )
      .join("");

    return `
      ${postCardHtml}
      <ul class="comment-list">
        <li class="comment-list-title">댓글</li>
        ${commentsHtml}
      </ul>
      <form action="#" class="reply-container" data-post-comment>
        <textarea placeholder="댓글을 입력해주세요"></textarea>
        <button type="submit" class="btn red mini reply-submit-button">댓글 작성</button>
      </form>
    `;
  }
}

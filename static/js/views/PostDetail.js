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
    } = await axios.get(`http://43.201.103.199/post/${id}`);
    this.postData = { ...data };
    return { ...data };
  }

  turnToEditMode() {
    const postCardDescriptionNode = document.querySelector(
      ".post-card-description"
    );
    postCardDescriptionNode.innerHTML = `<form action="#">
      <input type="text" value=${this.postData.post.title} />
      <textarea type="text">${this.postData.post.content}</textarea>
      <button type="submit" class="btn red">수정</button>
    </form>`;
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
            <li><button class="btn red mini post-card-button-item" data-modify-post-button>✏️ 수정</button></li>
            <li><button class="btn red mini post-card-button-item">😵 삭제</button></li>
        </ul>
      </div>
      </div>
    `;
    const commentsHtml = comments
      .map(
        (comment) => `<li class="comment-list-item">
      ${comment.content}
      <button class="comment-delete-button">❌</button>
      </li>`
      )
      .join("");

    return `
      ${postCardHtml}
      <ul class="comment-list">
        <li class="comment-list-title">댓글</li>
        ${commentsHtml}
      </ul>
      <form action="#" class="reply-container">
        <textarea placeholder="댓글을 입력해주세요"></textarea>
        <button type="submit" class="btn red mini reply-submit-button">댓글 작성</button>
      </form>
    `;
  }
}

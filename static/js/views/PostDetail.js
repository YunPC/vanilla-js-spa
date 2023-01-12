import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("신년 메시지 상세 페이지");
  }

  addBackButton() {
    const header = document.querySelector("header");
    header.innerHTML = `<a href="/">&#8249</a> HPNY 2023`;
  }

  async fetchMessage(id) {
    const {
      data: { data },
    } = await axios.get(`http://43.201.103.199/post/${id}`);
    return { ...data };
  }

  async getHtml() {
    this.addBackButton();
    const { post, comments } = await this.fetchMessage(this.params.id);
    const postCardHtml = `
      <div class="post-card">
        <img src="${post.image}" alt="${post.title}의 사진"/>
        <div>
          <h2>${post.title}</h2>
          <time>${post.createdAt.substring(0, 10)}</time>
        </div>
        <ul>
            <li><button>수정</button></li>
            <li><button>삭제</button></li>
          </ul>
      </div>
    `;
    const commentsHtml = comments
      .map((comment) => `<li>${comment.content}</li>`)
      .join("");

    return `
      ${postCardHtml}
      <ul>
        ${commentsHtml}
      </ul>
      <form action="#">
        <textarea placeholder="댓글을 입력해주세요"></textarea>
        <button type="submit">댓글 보내기</button>
      </form>
    `;
  }
}

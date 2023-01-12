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

  async getHtml() {
    this.addBackButton();

    return `
      <div class="post-card">
        <img src="" alt=""/>
        <div>
          <h2>신년 계획</h2>
          <time>2023. 01. 10</time>
          <ul>
            <li><button>수정</button></li>
            <li><button>삭제</button></li>
          </ul>
        </div>
      </div>
      <ul>
        <li>너무 슬퍼하지 마세요! 다들 비슷해요 ㅎㅎ</li>
      </ul>
      <form action="#">
        <textarea placeholder="댓글을 입력해주세요"/>
        <button type="submit">댓글 보내기</button>
      </form>
    `;
  }
}

import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("신년 메시지 앱 - 작성 페이지");
    this.imageUrl = "";
    this.title = "";
    this.content = "";
  }

  addBackButton() {
    const header = document.querySelector("header");
    header.innerHTML = `<a href="/">&#8249</a> HPNY 2023`;
  }

  async addRandomImage() {
    const accessKey = "UeQ6L9qTHM782PHDtD9kE0pf9epVGolNPsTToi-7qRo";
    const {
      data: { urls: raw },
    } = await axios.get(
      `https://api.unsplash.com/photos/random?client_id=${accessKey}`
    );
    this.imageUrl = raw.regular;

    document.querySelector("[data-random-image-button]").disabled = true;
  }

  checkIsReadyToSubmit() {
    const submitButton = document.querySelector("[data-post-submit-button]");
    if (!!(this.imageUrl && this.title && this.content)) {
      submitButton.disabled = false;
      return;
    }

    submitButton.disabled = true;
  }

  postMessage() {
    axios.post("http://43.201.103.199/post", {
      title: this.title,
      content: this.content,
      image: this.imageUrl,
    });
  }

  async getHtml() {
    this.addBackButton();
    return `
      <button class="btn red" data-random-image-button>랜덤 이미지 추가하기</button>
      <input type="text" aria-label="신년 메시지 제목" data-title-input/> 
      <textarea aria-label="신년 메시지 내용" data-description-input></textarea>
      <button class="btn red" disabled data-post-submit-button>글 작성하기</button>
    `;
  }
}

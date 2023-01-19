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

  async fetchRandomImage() {
    const accessKey = "UeQ6L9qTHM782PHDtD9kE0pf9epVGolNPsTToi-7qRo";
    const {
      data: { urls: raw },
    } = await axios.get(
      `https://api.unsplash.com/photos/random?client_id=${accessKey}`
    );
    this.imageUrl = raw.regular;

    const randomImageButton = document.querySelector(
      "[data-fetch-random-image-button]"
    );

    randomImageButton.disabled = true;
    randomImageButton.textContent = "랜덤 이미지 추가 완료";
  }

  checkIsReadyToSubmit() {
    const submitButton = document.querySelector("[data-post-message-button]");
    if (!!(this.imageUrl && this.title && this.content)) {
      submitButton.disabled = false;
      return;
    }

    submitButton.disabled = true;
  }

  postMessage() {
    axios.post("api/post", {
      title: this.title,
      content: this.content,
      image: this.imageUrl,
    });
  }

  async getHtml() {
    this.addBackButton();
    return `
      <button class="btn red" data-fetch-random-image-button>랜덤 이미지 추가하기</button>
      <input type="text" aria-label="신년 메시지 제목" data-message-title-input/> 
      <textarea aria-label="신년 메시지 내용" data-message-description-input></textarea>
      <button class="btn red" disabled data-post-message-button>글 작성하기</button>
    `;
  }
}

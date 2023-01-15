import Create from "./views/Create.js";
import Home from "./views/Home.js";
import PostDetail from "./views/PostDetail.js";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
  const values = match.result.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(
    (result) => result[1]
  );

  return Object.fromEntries(
    keys.map((key, i) => {
      return [key, values[i]];
    })
  );
};

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

let state = null;

const router = async () => {
  const routes = [
    { path: "/", view: Home },
    { path: "/create", view: Create },
    { path: "/:id", view: PostDetail },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route,
      result: location.pathname.match(pathToRegex(route.path)),
    };
  });

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result !== null
  );

  if (!match) {
    match = {
      route: routes[0],
      result: [location.pathname],
    };
  }

  const view = new match.route.view(getParams(match));

  state = view;

  document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  // event listener
  document.body.addEventListener("click", async (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
    if (e.target.matches("[data-fetch-random-image-button]")) {
      state.fetchRandomImage();
      state.checkIsReadyToSubmit();
    }
    if (e.target.matches("[data-post-message-button]")) {
      state.postMessage();
      navigateTo("/");
    }
    if (e.target.matches("[data-modify-message-button]")) {
      state.turnToEditMode();
    }
    if (e.target.matches("[data-delete-message-button]")) {
      await state.deleteMessage();
      navigateTo("/");
    }
    if (e.target.matches("[data-comment-item-delete-button]")) {
      const commentId = e.target.parentNode.id.split("-")[2];
      await state.deleteComment(commentId);
      document.querySelector("#app").innerHTML = await state.getHtml();
    }
  });
  document.body.addEventListener("input", (e) => {
    if (e.target.matches("[data-message-title-input]")) {
      state.title = e.target.value;
      state.checkIsReadyToSubmit();
    }
    if (e.target.matches("[data-message-description-input]")) {
      state.content = e.target.value;
      state.checkIsReadyToSubmit();
    }
  });
  document.body.addEventListener("submit", async (e) => {
    if (e.target.matches("[data-confirm-post-modify]")) {
      e.preventDefault();
      const postData = { title: e.target[0].value, content: e.target[1].value };
      await state.editMessage(postData);
      document.querySelector("#app").innerHTML = await state.getHtml();
    }
    if (e.target.matches("[data-post-comment]")) {
      e.preventDefault();
      await state.postComment(e.target[0].value);
      document.querySelector("#app").innerHTML = await state.getHtml();
    }
  });
  router();
});

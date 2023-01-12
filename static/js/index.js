import Create from "./views/Create.js";
import Home from "./views/Home.js";

const pathToRegex = (path) =>
  new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

let state = null;

const router = async () => {
  const routes = [
    { path: "/", view: Home },
    { path: "/create", view: Create },
    // { path: "/:id", view: Create },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }

  const view = new match.route.view();

  state = new match.route.view();

  document.querySelector("#app").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
  // event listener
  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
    if (e.target.matches("[data-random-image-button]")) {
      state.addRandomImage();
      state.checkIsReadyToSubmit();
    }
    if (e.target.matches("[data-post-submit-button]")) {
      state.postMessage();
      navigateTo("/");
    }
  });
  document.body.addEventListener("input", (e) => {
    if (e.target.matches("[data-title-input]")) {
      state.title = e.target.value;
      state.checkIsReadyToSubmit();
    }
    if (e.target.matches("[data-description-input]")) {
      state.content = e.target.value;
      state.checkIsReadyToSubmit();
    }
  });

  router();
});

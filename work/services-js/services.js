let posts = [];
let commentsList = [];
let postList = document.querySelector(".posts");

fetch("https://jsonplaceholder.typicode.com/posts")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    posts = data;
    renderPosts();
  })
  .catch(function (err) {
    console.log("error: " + err);
  });

let renderPosts = () => {
  for (let i = 0; i < posts.length; ++i) {
    let titleButton = document.createElement("button");
    titleButton.innerHTML = posts[i].title;
    titleButton.className = "accordion";
    postList.appendChild(titleButton);

    let postBody = document.createElement("div");
    postBody.innerHTML = posts[i].body;
    postList.appendChild(postBody);

    let commentsContainer = document.createElement("div");
    commentsContainer.className = "panel";
    let comment = document.createElement("p");
    commentsContainer.appendChild(comment);
    postList.appendChild(commentsContainer);

    commentsList.push(undefined);

    titleButton.addEventListener("click", async function () {
      this.classList.toggle("active");
      let panel = this.nextElementSibling.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        if (commentsList[i] === undefined) {
          let comments = await getPostComments(posts[i].id);
          commentsList[i] = comments;
        }

        panel.childNodes[0].innerHTML = JSON.stringify(commentsList[i]);
        panel.style.display = "block";
      }
    });
  }

  let getPostComments = async (postId) => {
    try {
      let response = await (
        await fetch(
          "https://jsonplaceholder.typicode.com/posts/" + postId + "/comments"
        )
      ).json();
      return response;
    } catch (err) {
      console.log(err);
    }
  };
};

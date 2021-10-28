let posts = [];
const commentsList = [];
const postList = document.querySelector(".posts");
let activePosts = [];

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

const renderPosts = () => {
  for (let i = 0; i < posts.length; ++i) {
    const postListItem = document.createElement("li");
    const postElement = document.createElement("div");
    postElement.className = "post-div";

    const postTitle = document.createElement("button");
    postTitle.innerHTML = posts[i].title;
    postTitle.className = "accordion";
    postElement.appendChild(postTitle);

    const postBody = document.createElement("div");
    postBody.className = "post-body-div";
    postBody.innerHTML = posts[i].body;
    postElement.appendChild(postBody);

    const commentsContainer = document.createElement("div");
    commentsContainer.className = "comments-container";

    const commentsListUl = document.createElement("ul");
    const commentsTitle = document.createElement("h5");
    commentsTitle.innerHTML = "Comments";
    commentsListUl.appendChild(commentsTitle);
    commentsContainer.appendChild(commentsListUl);
    postElement.appendChild(commentsContainer);

    commentsList.push(undefined);
    postTitle.addEventListener("click", async function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
        activePosts = [];
      } else {
        if (commentsList[i] === undefined) {
          const comments = await getPostComments(posts[i].id);
          commentsList[i] = comments;
          const commentsListUlElement = panel
            .getElementsByTagName("ul")
            .item(0);
          for (let j = 0; j < commentsList[i].length; ++j) {
            const commentsListLiElement = document.createElement("li");
            const commentsBlockDiv = document.createElement("div");
            commentsBlockDiv.className = "comments-block-div";
            const commentsBlockUserNameSpan = document.createElement("span");
            commentsBlockUserNameSpan.className = "name-span";
            commentsBlockUserNameSpan.innerHTML = commentsList[i][j].name;
            commentsBlockDiv.appendChild(commentsBlockUserNameSpan);

            const commentsBlockCommentBodyDiv = document.createElement("div");
            commentsBlockCommentBodyDiv.className =
              "comments-block-comment-body-div";
            commentsBlockCommentBodyDiv.innerHTML = commentsList[i][j].body;
            commentsBlockDiv.appendChild(commentsBlockCommentBodyDiv);

            commentsListLiElement.appendChild(commentsBlockDiv);
            commentsListUlElement.appendChild(commentsListLiElement);
          }
        }

        for (let a = 0; a < activePosts.length; ++a) {
          activePosts[a].click();
        }

        activePosts = [this];
        panel.style.display = "block";
      }
    });

    postListItem.appendChild(postElement);
    postList.appendChild(postListItem);
  }

  const getPostComments = async (postId) => {
    try {
      const response = await (
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

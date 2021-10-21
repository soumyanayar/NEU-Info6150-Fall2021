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
    let postListItem = document.createElement("li");
    let postElement = document.createElement("div");
    // postElement.className = "postDiv"

    let postTitle = document.createElement("button");
    postTitle.innerHTML = posts[i].title;
    postTitle.className = "accordion";
    postElement.appendChild(postTitle);

    let postBody = document.createElement("div");
    // postBody.className = "postBodyDiv";
    postBody.innerHTML = posts[i].body;
    postElement.appendChild(postBody);

    let commentsContainer = document.createElement("div");
    commentsContainer.className = "panel";

    let commentsListUl = document.createElement("ul");
    let commentsTitle = document.createElement("b");
    commentsTitle.innerHTML = "Comments";
    commentsListUl.appendChild(commentsTitle);
    commentsContainer.appendChild(commentsListUl);

    // let comment = document.createElement("p");
    // commentsContainer.appendChild(comment);

    postElement.appendChild(commentsContainer);

    commentsList.push(undefined);
    postTitle.addEventListener("click", async function () {
      this.classList.toggle("active");
      let panel = this.nextElementSibling.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        if (commentsList[i] === undefined) {
          let comments = await getPostComments(posts[i].id);
          commentsList[i] = comments;
          // panel.childNodes[0].innerHTML = JSON.stringify(commentsList[i]);
          let commentsListUlElement = panel.getElementsByTagName("ul").item(0);
          for (let j = 0; j < commentsList[i].length; ++j) {
            console.log(commentsList[i][j].name);
            console.log(commentsList[i][j].body);

            let commentsListLiElement = document.createElement("li");
            let commentsBlockDiv = document.createElement("div");
            // commentsBlockDiv.className("commentsBlockDiv");
            let commentsBlockUserNameSpan = document.createElement("span");
            commentsBlockUserNameSpan.innerHTML = commentsList[i][j].name;
            commentsBlockDiv.appendChild(commentsBlockUserNameSpan);

            let commentsBlockCommentBodyDiv = document.createElement("div");
            // commentsBlockCommentBodyDiv.className = "commentsBlockCommentBodyDiv";
            commentsBlockCommentBodyDiv.innerHTML = commentsList[i][j].body;
            commentsBlockDiv.appendChild(commentsBlockCommentBodyDiv);

            commentsListLiElement.appendChild(commentsBlockDiv);
            commentsListUlElement.appendChild(commentsListLiElement);
          }
        }

        panel.style.display = "block";
      }
    });

    postListItem.appendChild(postElement);
    postList.appendChild(postListItem);
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

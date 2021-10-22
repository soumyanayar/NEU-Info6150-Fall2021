let posts = [];
const list = document.querySelector(".posts");
// list.addEventListener('click' , onclick);
// function onclick(e) {
// const id = e.target.id;
// getpostcomments(id);

// }

fetch("https://jsonplaceholder.typicode.com/posts")
  .then((response) => response.json())
  .then((data) => {
    posts = data;
    render();
  });

function render() {
  list.innerHTML = posts
    .map(
      (post) =>
        `<li>
            <a href ="#" id="${post.id}" class = "post-btn" name= "post" onclick = "getpostcomments(${post.id}) ">${post.title}</a>
            <p>${post.id}</p>
            <p>${post.userid}</p>
            <p>${post.email}</p>
            <p>${post.body}</p>
        </li>`
    )
    .join("");
}

function getpostcomments(id) {
  fetchCommentById(id)
    .then((responseData) => {
      // updatestatus(""
      // console.log(comments)
      // rendercommentPage(id,post.name ,post.body));
      comments = responseData;
      renderComments(id);
    })
    .catch((err) => {
      // updatestatus(err.error)
    });
}

function fetchCommentById(id) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
    method: "GET",
  })
    .catch(() => {
      return promise.reject({
        code: "network-error",
      });
    })
    .then((response) => {
      if (response.ok) {
        // console.log(response.json());
        return response.json();
      }
      return response.json().then((err) => promise.reject(err));
    });
}

let comments = [];
function renderComments(id) {
  const post = document.getElementById(id).parentNode;
  const createElement = document.createElement("ul");
  createElement.innerHTML = comments
    .map(
      (comment) =>
        `<li>
       <p>${comment.body}</p>
   </li>`
    )
    .join(" ");
  post.appendChild(createElement);
}

// const id = document.getElementById(id);

// function showHideComments() {
// if(comments == 1) {
//     document.getElementById(id).style.display ="inline";
//     return comments=0;
// } else {
//     document.getElementById(id).style.display ="none";
//     return comments =1;
// }

const id = document.getElementById(id);
if (document.getElementById(id).onclick) {
  comments.style.display = "none";
  onClick.innerHTML = "Show comments";
} else {
  myComments.style.display = "block";
  // change onclick text
  onClick.innerHTML = "Hide comments";
}

// function showHideComments() {
//   const comments = document.getElementById("id");
//   if (comments.style.display === "none") {
//     comments.style.display = "block";
//   } else {
//     comments.style.display = "none";
//     onclick.innerHTML = "Hide comments";
//   }
// }

// function showHideComments() {
//   // get the comment
//   var myComments = document.getElementById("comments");

//   // get the current value of the comment's display property
//   var displaySetting = myComments.style.display;

//   // also get the onclick , so we can change what it says
//   var onClick = document.getElementById("onClick");

//   // now toggle the comment and the onclick text, depending on current state
//   if (displaySetting == "block") {
//     // comment is visible. hide it
//     myComments.style.display = "none";
//     // change onclick text
//     onClick.innerHTML = "Show comments";
//   } else {
//     // comment is hidden. show it
//     myComments.style.display = "block";
//     // change onclick text
//     onClick.innerHTML = "Hide comments";
//   }
// }

// let click = document.querySelector('onClick');
// let div = document.querySelector('div');
// btn.addEventListener('click' , () => {
//     if (div.style.display === 'none') {
//         div.style.display = block;
//     } else {
//         div.style.display ='none';
//     }
// })

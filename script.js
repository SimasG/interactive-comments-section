displayData();

const commentsContainers = document.getElementsByClassName("comment-container");
const userImgs = document.getElementsByClassName("img-user");
const userNames = document.getElementsByClassName("user-name");
const commentDates = document.getElementsByClassName("comment-date");
const comments = document.getElementsByClassName("comment");
const scores = document.getElementsByClassName("score");
const main = document.querySelector("main");

async function getData() {
  const response = await fetch("data.json");
  return await response.json();
}

async function displayData() {
  const data = await getData();

  function loadComments(comment) {
    const commentHtml = `<section class="container comment-container">
    <div class="comment-info">
      <img class="img-user" data-element="img" alt="" src=${comment.user.image.png} />
      <p class="user-name">${comment.user.username}</p>
      <p class="comment-date">${comment.createdAt}</p>
    </div>
    <div>
      <p class="comment">${comment.content}</p>
    </div>
    <div class="vote-reply-container">
      <div class="vote-btn-container">
        <svg
          class="icon-plus"
          width="11"
          height="11"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
            fill="#C5C6EF"
          />
        </svg>
        <p class="score">${comment.score}</p>
        <svg
          class="icon-minus"
          width="11"
          height="3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
            fill="#C5C6EF"
          />
        </svg>
      </div>
      <div class="btn-reply-container">
        <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
            fill="#5357B6"
          />
        </svg>
        <button class="btn-reply">Reply</button>
      </div>
    </div>
  </section>`;
    main.insertAdjacentHTML("beforeend", commentHtml);
  }

  //   populating the comments
  for (let comment of data.comments) {
    loadComments(comment);
  }

  //   populating the commment replies
  for (let i = 0; i < data.comments.length; i++) {
    if (data.comments[i].replies.length > 0) {
      commentReplies = data.comments[i].replies;
      commentReplies.forEach((commentReply) => {
        const replyHtml = `<section class="comment-reply-container">
              <div class="left-line"></div>
              <div class="container comment-reply-subcontainer">
                <div class="comment-info comment-info-reply">
                  <img
                    class="img-user img-user-reply"
                    data-element="img"
                    src=${commentReply.user.image.png}
                    alt=""
                  />
                  <p class="user-name user-name-reply">${commentReply.user.username}</p>
                  <p class="comment-date comment-date-reply">${commentReply.createdAt}</p>
                </div>
                <div>
                  <p class="comment comment-reply">${commentReply.content}</p>
                </div>
                <div class="vote-reply-container vote-reply-container-reply">
                  <div class="vote-btn-container vote-btn-container-reply">
                    <svg
                      class="icon-plus"
                      width="11"
                      height="11"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
                        fill="#C5C6EF"
                      />
                    </svg>
                    <p class="score score-reply">${commentReply.score}</p>
                    <svg
                      class="icon-minus"
                      width="11"
                      height="3"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
                        fill="#C5C6EF"
                      />
                    </svg>
                  </div>
                  <div class="btn-reply-container btn-reply-container-reply">
                    <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                        fill="#5357B6"
                      />
                    </svg>
                    <button class="btn-reply btn-reply-reply">Reply</button>
                  </div>
                </div>
              </div>
            </section>`;
        main.insertAdjacentHTML("beforeend", replyHtml);
      });
    }
  }

  //   populating the current user comment container
  document.querySelector(".img-current-user").src = data.currentUser.image.png;
}

const btnSubmit = document.querySelector(".btn-submit-comment");

btnSubmit.addEventListener("click", async function () {
  createComment();
});

function addComment(comment) {
  const commentHtml2 = `<section class="container comment-container">
    <div class="comment-info">
      <img class="img-user" data-element="img" alt="" src=${comment.user} />
      <p class="user-name">${comment.username}</p>
      <p class="comment-date">${comment.createdAt}</p>
    </div>
    <div>
      <p class="comment">${comment.content}</p>
    </div>
    <div class="vote-reply-container">
      <div class="vote-btn-container">
        <svg
          class="icon-plus"
          width="11"
          height="11"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
            fill="#C5C6EF"
          />
        </svg>
        <p class="score">0</p>
        <svg
          class="icon-minus"
          width="11"
          height="3"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
            fill="#C5C6EF"
          />
        </svg>
      </div>
      <div class="btn-reply-container">
        <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
            fill="#5357B6"
          />
        </svg>
        <button class="btn-reply">Reply</button>
      </div>
    </div>
  </section>`;
  main.insertAdjacentHTML("beforeend", commentHtml2);
}

async function createComment() {
  const data = await getData();
  //   const txt = document.querySelector(".current-user-comment");
  const txt = document.querySelector("textarea");

  let comment = {
    content: txt.value,
    createdAt: Date.now(),
    user: data.currentUser.image.png,
    replyingTo: "maxblagun",
    username: data.currentUser.username,
  };

  //   console.log(comment);
  addComment(comment);
  txt.value = "";
}

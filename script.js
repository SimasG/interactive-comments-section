displayData();

const commentsContainers = document.getElementsByClassName("comment-container");
const userImgs = document.getElementsByClassName("img-user");
const userNames = document.getElementsByClassName("user-name");
const commentDates = document.getElementsByClassName("comment-date");
const comments = document.getElementsByClassName("comment");
const scores = document.getElementsByClassName("score");
const main = document.querySelector("main");
const userReplies = document.querySelector(".user-replies");
const initialComments = document.querySelector(".comments");
const initialReplies = document.querySelector(".replies");
const deleteModal = document.querySelector(".modal-delete");
const modalBtnCancel = document.querySelector("modal-btn-cancel");
const modalBtnDelete = document.querySelector("modal-btn-delete");

async function getData() {
  const response = await fetch("data.json");
  return await response.json();
}

// const handleClick = () => {
//   console.log("blet");
// };

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
    initialComments.insertAdjacentHTML("beforeend", commentHtml);
    // console.log(commentHtml);
  }

  // TODO: Add only one event listener for each btn that can be fired many times (conditionally) -> 50% done
  // TODO Event handler -> adding one comment reply template literal under the comment

  //   populating the comments
  for (let comment of data.comments) {
    loadComments(comment);
  }

  //   adding reply functionality
  const btnReplyContainer = document.querySelectorAll(".btn-reply-container");
  btnReplyContainer.forEach((btn) => {
    btn.addEventListener(
      "click",
      () => {
        console.log("it worked");
        const commentReplySection = document.createElement("section");
        commentReplySection.classList.add("current-user-dynamic-reply-section");
        initialComments.appendChild(commentReplySection);
        // commentReplySection.classList.add("current-user-container");
        const commentReplySectionHtml = `<section class="user-comment-reply-container reply">
        <div class="left-line reply"></div>
        <div class="current-user-container reply">
          <textarea
            name=""
            id=""
            cols="36"
            rows="10"
            placeholder="Add a comment..."
          ></textarea>
          <div class="submit-comment-container">
            <img class="img-current-user" alt="" src=${data.currentUser.image.png} />
            <button class="btn btn-submit-comment">SEND</button>
          </div>
        </div>
      </section>`;
        commentReplySection.insertAdjacentHTML(
          "beforeend",
          commentReplySectionHtml
        );
      },
      { once: true }
    );
  });

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
        initialReplies.insertAdjacentHTML("beforeend", replyHtml);
      });
    }
  }

  //   populating the current user comment container
  document.querySelectorAll(".img-current-user").forEach((img) => {
    img.src = data.currentUser.image.png;
  });
  //   document.querySelector(".img-current-user").src =
  //     data.currentUser.image.png;
}

const btnSubmit = document.querySelector(".btn-submit-comment");

btnSubmit.addEventListener("click", async function () {
  createComment();
});

function formatDaysAgo(value, locale) {
  const date = new Date(value);
  let deltaDays = (date.getTime() - Date.now()) / (1000 * 3600 * 24);
  const deltaDaysPrecise = Math.round(deltaDays);
  if (deltaDaysPrecise > -7) {
    const formatter = new Intl.RelativeTimeFormat(locale);
    if (
      formatter.format(Math.round(deltaDays), "days") === "in 0 days" ||
      formatter.format(Math.round(deltaDays), "days") === "0 days ago"
    ) {
      let finalFormatter = formatter.format(Math.round(deltaDays), "days");
      finalFormatter = "seconds ago";
      return finalFormatter;
    }
    return formatter.format(Math.round(deltaDays), "days");
  } else if (deltaDaysPrecise < -7 && deltaDaysPrecise > -31) {
    deltaDays = (date.getTime() - Date.now()) / (1000 * 3600 * 24 * 7);
    const formatter = new Intl.RelativeTimeFormat(locale);
    return formatter.format(Math.round(deltaDays), "weeks");
  } else if (deltaDaysPrecise < -31 && deltaDaysPrecise > -365.25) {
    deltaDays = (date.getTime() - Date.now()) / (1000 * 3600 * 24 * 30.42);
    const formatter = new Intl.RelativeTimeFormat(locale);
    return formatter.format(Math.round(deltaDays), "months");
  } else if (deltaDaysPrecise < -365.25) {
    deltaDays = (date.getTime() - Date.now()) / (1000 * 3600 * 24 * 30.42 * 12);
    const formatter = new Intl.RelativeTimeFormat(locale);
    return formatter.format(Math.round(deltaDays), "years");
  }
}

// add general comment (not a specific reply)
function addComment(comment) {
  const currentUserCommentHtml = `<section class="container comment-container">
    <div class="comment-info">
      <img class="img-user" data-element="img" alt="" src=${comment.user} />
      <p class="user-name">${comment.username}</p>
      <p class="comment-date">${formatDaysAgo(
        new Date(comment.createdAt).toISOString()
      )}</p>
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
  main.insertAdjacentHTML("afterbegin", currentUserCommentHtml);

  //   const currentUserCommentHtml = `<section class="comment-reply-container">
  //     <div class="left-line"></div>
  //     <div class="container comment-reply-subcontainer">
  //       <div class="comment-info comment-info-reply">
  //         <img
  //           class="img-user img-user-reply"
  //           data-element="img"
  //           src=${comment.user}
  //           alt=""
  //         />
  //         <p class="user-name user-name-reply">${comment.username}</p>
  //         <p class="comment-date comment-date-reply">${formatDaysAgo(
  //           new Date(comment.createdAt).toISOString()
  //         )}</p>
  //       </div>
  //       <div>
  //         <p class="comment comment-reply">${comment.content}</p>
  //       </div>
  //       <div class="vote-reply-container vote-reply-container-reply">
  //         <div class="vote-btn-container vote-btn-container-reply">
  //           <svg
  //             class="icon-plus"
  //             width="11"
  //             height="11"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <path
  //               d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
  //               fill="#C5C6EF"
  //             />
  //           </svg>
  //           <p class="score score-reply">0</p>
  //           <svg
  //             class="icon-minus"
  //             width="11"
  //             height="3"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <path
  //               d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
  //               fill="#C5C6EF"
  //             />
  //           </svg>
  //         </div>
  //         <div class="btn-reply-container btn-reply-container-reply">
  //           <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
  //             <path
  //               d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
  //               fill="#5357B6"
  //             />
  //           </svg>
  //           <button class="btn-reply btn-reply-reply">Reply</button>
  //         </div>
  //       </div>
  //     </div>
  //   </section>`;
  //   userReplies.insertAdjacentHTML("beforeend", currentUserCommentHtml);
}

async function createComment() {
  const data = await getData();
  const txt = document.querySelector("textarea");

  let comment = {
    content: txt.value,
    createdAt: Date.now(),
    user: data.currentUser.image.png,
    replyingTo: "maxblagun",
    username: data.currentUser.username,
  };
  addComment(comment);
  txt.value = "";
}

// delete modal
// for some reason adding an event listener in js doesn't work
function removeModalVisibility() {
  deleteModal.classList.remove("show");
}

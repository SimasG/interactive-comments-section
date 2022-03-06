displayData();

const commentsContainers = document.getElementsByClassName("comment-container");
const userImgs = document.getElementsByClassName("img-user");
const userNames = document.getElementsByClassName("user-name");
const commentDates = document.getElementsByClassName("comment-date");
const comments = document.getElementsByClassName("comment");
const scores = document.getElementsByClassName("score");

async function getData() {
  const response = await fetch("data.json");
  return await response.json();
}

async function displayData() {
  const data = await getData();
  console.log(data.comments);

  for (let i = 0; i < data.comments.length; i++) {
    userImgs[i].src = data.comments[i].user.image.png;
  }
  for (let i = 0; i < data.comments.length; i++) {
    userNames[i].textContent = data.comments[i].user.username;
  }

  for (let i = 0; i < data.comments.length; i++) {
    commentDates[i].textContent = data.comments[i].createdAt;
  }

  for (let i = 0; i < data.comments.length; i++) {
    comments[i].textContent = data.comments[i].content;
  }

  for (let i = 0; i < data.comments.length; i++) {
    scores[i].textContent = data.comments[i].score;
  }
}

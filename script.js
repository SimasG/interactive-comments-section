displayData();

const commentsContainers = document.getElementsByClassName("comment-container");
const userImgs = document.getElementsByClassName("img-user");

async function getData() {
  const response = await fetch("data.json");
  return await response.json();
}

async function displayData() {
  const data = await getData();

  for (let i = 0; i < data.comments.length; i++) {
    userImgs[i].src = data.comments[i].user.image.png;
  }
}

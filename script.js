displayData();

const commentsContainers = document.querySelectorAll(".comment-container");

async function getData() {
  const response = await fetch("data.json");
  return await response.json();
}

async function displayData() {
  const data = await getData();
  console.log(data);

  commentsContainers.forEach((container) => {
    container.querySelector(".img-user").src = data["comments"]["user"];
    // container.querySelectorAll(".img-user").forEach((img) => {
    //   img.src = data.comments.user.image.png;
    // });
    // container.querySelector("[data-element='img']").src =
    //   data.currentUser.image.png;
  });
}

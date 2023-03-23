function renderOneToy(toy) {
  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>
  `
    // Add event listener to the "Like" button
    card.querySelector('.like-btn').addEventListener('click', () => {
      const toyId = toy.id;
      const toyLikes = toy.likes + 1;
      const patchData = { likes: toyLikes };
  
      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patchData)
      })
      .then(response => response.json())
      .then(updatedToy => {
        // Update the toy's likes in the DOM
        card.querySelector('p').textContent = `${updatedToy.likes} Likes`;
      })
      .catch(error => {
        console.error('Error updating toy likes', error);
      });
    });
  document.querySelector("#toy-collection").appendChild(card);
}

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//fetch request
function getToys() {
  return fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(toydata => toydata.forEach(toy => renderOneToy(toy)));
}

function initialise() {
  getToys();
}

initialise();

const data = {
  name: "Buzz Lightyear",
  image: "https://cdn.sanity.io/images/s0v5zj2g/production/24c71d49775303b2d96337f0239cbbf7d80f311c-800x800.jpg",
  likes: 0
};

fetch("http://localhost:3000/toys", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => {
    // Handle response
  })
  .catch(error => {
    // Handle error
  });
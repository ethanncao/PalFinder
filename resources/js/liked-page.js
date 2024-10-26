import {cart} from '../data/cart.js'


function displayLiked() {
  let displayHTML = '';

  cart.forEach((pet) => {
    displayHTML += `
    <div class="pet-container">
      <div class="text-box">

          <div class="name">
              ${pet.name}
          </div>

      </div>
      <div class="picture-box">

          <img class="pet-image" src="resources/images/pets/${pet.image}"> 
    
      </div>
    </div>
    `;
  })

  document.querySelector('.pets-container').innerHTML = displayHTML;
};

displayLiked();
import {pets, availablePets, saveAvailablePets} from '../data/pets.js'
import {cart, saveToStorage, addPet} from '../data/cart.js'

console.log(availablePets);
let filteredOut = structuredClone(availablePets);

// Get the first pet to be displayed
let currentPet = getRandomPet(filteredOut);

// Use the current pet to display a card of the animal
function displayPet() {
  let displayPetHTML = '';

  if (!currentPet) 
  {
    displayPetHTML = `
    <div class="no-pets-picture-box">

      <div class="no-pets-text">

      No Pets Available

      </div

    </div>
  `;
  }
  else
  {
    //change the html to display the pet and its imformation
    displayPetHTML = `
    <div class="header">

      <div class="display-pet-name">
        ${currentPet.chosenPet.name}
      </div>

      <div class="display-pet-age">
        ${currentPet.chosenPet.ageYrs} year(s)
      </div>

    </div>

    <div class="display-pet-gender-breed">
        ${(currentPet.chosenPet.gender).charAt(0).toUpperCase() + (currentPet.chosenPet.gender).slice(1)} ${currentPet.chosenPet.breed.charAt(0).toUpperCase() + (currentPet.chosenPet.breed).slice(1)}
    </div>

    <div class="picture-box">

      <img class="pet-image" src="resources/images/pets/${currentPet.chosenPet.image}"> 

    </div>

    <div class="text-box">

      <div class="description-header">
        Description
      </div>

      <div class="description-text">
        Meet ${currentPet.chosenPet.name} a sweet ${Math.round(Math.random() * 100)} lb. ${currentPet.chosenPet.ageYrs}-year-old ${currentPet.chosenPet.tags[0]}. I love people, cats, & dogs. 
      </div>

      <div class="description-header">
        Characteristics
      </div>

      <div class="description-text">
        Affectionate, Brave, Playful, Curious, Funny, Smart, Protective
      </div>

      <div class="description-header">
        Health
      </div>

      <div class="description-text">
        Vaccionations up to date, spayed, and neutered
      </div>

    </div>
    `;
  }
  
  document.querySelector('.js-adoption-box').innerHTML = displayPetHTML;
}

//Display the filter options 
function displayFilter() {
  let displayFilterHTML = '';

  displayFilterHTML = `
    <div class="filter-header">
      Filters
    </div>

    <div class="sort-text">
      Sort By:
    </div>

    <div class="radios">
      <label class="radio js-newly-added-filter">
        <input type="radio" class="new newlyAdded topRadioCSS" name="boom"/>
          Newly Added
      </label>
    </div>

    <div class="radios">
      <label class="radio js-newly-added-filter">
        <input type="radio" class="old oldest topRadioCSS" name="boom"/>
          Oldest
      </label>
    </div>

    <div class="radios">
      <label class="radio">
        <input type="radio" class="young youngest topRadioCSS" name="boom"/>
          Youngest
      </label>
    </div>

    <div class="radios">
      <label class="radio">
        <input type="radio" class="cat cats topRadioCSS" name="boom"/>
          Cats
      </label>
    </div>

    <div class="radios">
      <label class="radio">
        <input type="radio" class="dog dogs topRadioCSS" name="boom"/>
          Dogs
      </label>
    </div>

    <div class="price-range">
      Price Range
    </div>

    <div class="range-selector-container">
        <input class="slider" type="range" min="50" max="500" value="275">
        <div class="range-value">275</div>
    </div>

    <div class="price-range-numbers">
      <span class="price-range-individual-number">
        $50
      </span>

      <span class="price-range-individual-number">
        $275
      </span>

      <span>
        $500
      </span>


    </div>

    <div class="other-text">
      Other
    </div>

    <div class="more-filters">

      <span class="radios-second radio-second-one">
        <label class="radios-second-input-label">
          <input class="radios-second-input male" type="radio"/>
            Male
        </label>
      </span>

      <span class="radios-second radio-second-two">
        <label class="radios-second-input-label">
          <input class="radios-second-input female" type="radio"/>
            Female
        </label>
      </span>

      <span class="radios-second radio-second-three">
        <label class="radios-second-input-label">
          <input class="radios-second-input spayed" type="radio"/>
            Spayed
        </label>
      </span>

      <span class="radios-second radio-second-four">
        <label class="radios-second-input-label">
          <input class="radios-second-input vaxxed" type="radio"/>
            Vaxxed
        </label>
      </span>

      <span class="radios-second radio-second-five">
        <label class="radios-second-input-label">
          <input class="radios-second-input trained"  type="radio"/>
            Home-Trained
        </label>
      </span>

    </div>

    <div class="show-results">

      <button class="show-results-button">
        Show Results!
      </button>

    </div>
  `;

  document.querySelector('.js-filters-box').innerHTML = displayFilterHTML;

  //makes the radios unselectable 
  updateRadios();

  // updates slider
  updateSlider();

  //makes the radios unselectable
  updateOtherRadios()
}

// Display for the first time
displayPet();

// Display the filter options
displayFilter();

// Adopt button
const adoptButton = document.querySelector('.js-yes-button');
adoptButton.addEventListener('click', () =>
{
    //if a currentPet exists
    if(currentPet)
    {
      // Add pet to the local storage
      addPet(currentPet.chosenPet); 

      if (availablePets.length == filteredOut.length) {
        // Remove pet
        availablePets.splice(currentPet.index,1);
        saveAvailablePets();

        // Remove from filteredOut
        filteredOut.splice(currentPet.index,1);

        currentPet = getRandomPet(filteredOut);
        displayPet();

      } else {
          // Remove pet
        availablePets.forEach((pet, index) => {
          if (currentPet.chosenPet == pet) {
            console.log('DELETED' + index);
            availablePets.splice(index,1);
          }
        })
        // Remove pet
        //availablePets.splice(currentPet.index,1);

        // Remove from filteredOut
        filteredOut.splice(currentPet.index,1);

        // Change the current pet to a new one
        currentPet = getRandomPet(filteredOut);

        saveAvailablePets();

        // Display that new pet
        displayPet();
      };
    }
})

// Don't adopt button
const noAdoptButton = document.querySelector('.js-no-button');
noAdoptButton.addEventListener('click', () =>
{
  //if a currentPet exists
    if(currentPet)
    {
      if (availablePets.length == filteredOut.length) {
        // Remove pet
        availablePets.splice(currentPet.index,1);
        saveAvailablePets();

        // Remove from filteredOut
        filteredOut.splice(currentPet.index,1);

        currentPet = getRandomPet(filteredOut);
        displayPet();
        
      } else {
          // Remove pet
        availablePets.forEach((pet, index) => {
          if (currentPet.chosenPet == pet) {
            console.log('DELETED' + index);
            availablePets.splice(index,1);
          }
        })
        // Remove pet
        //availablePets.splice(currentPet.index,1);

        // Remove from filteredOut
        filteredOut.splice(currentPet.index,1);

        // Change the current pet to a new one
        currentPet = getRandomPet(filteredOut);

        saveAvailablePets();

        // Display that new pet
        displayPet();
      };
    }
})

// Reset button
const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', () => 
{
  // clear the storage
  localStorage.clear();
  // reload the page
  location.reload();
});

/* Pick Random Pet
         Do Math.Random which goes from 0 to 1
         Divide 1 by amount of elements so for example 5 elements we are picking out of
         Do 1 / (5) = we get .2 , so now we pick the elements based off the the number from 0 to 1  
         first element is 0 - .2        // we could do like if(number * 1 - number * 2)
         second element is .2 - .4      // we could do like if(number * 2 - number * 3)
         third element is .4 - .6       // we could do like if(number * 3 - number * 4)
         fourth element is .6 - .8      // we could do like if(number * 4 - number * 5)
         last element is .8 - 1         // we could do like if(number * 5 - number * 6) */
function getRandomPet(petArray)
{
    // Get amount of pets we are picking out of
    const amountOfPets = petArray.length;

    if(amountOfPets == 0)
    {
      return false;
    }

    // Get a random number
    const randomNumber = Math.random();

    // Get the condition number
    const conditionNumber = 1 / amountOfPets;

    // Variable for the quote that will be chosen
    let chosenPet = 0;

    for(let i = 0; i < amountOfPets; i++)
    {
        // If the random number is in between the condition numbers set chosen quote to i
        if((randomNumber >= conditionNumber * i) && (randomNumber < conditionNumber * (i+1)))
        {
        chosenPet = i;
        } 
    }

    // Create an object with the index of the pet in the array and the actual pet object
    let petInfo = {
      chosenPet: petArray[chosenPet],
      index: chosenPet
    }

    return petInfo;
}

function updateRadios() 
{
  // holds current truth value of each radio
  let allRadios = {
      newlyAdded: false,
      oldest: false,
      youngest: false,
      cats: false,
      dogs: false
    }

    //makes an array of the radios newlyAdded,oldest,youngest,cats,dogs
    let radios = document.querySelectorAll('.radio input[type="radio"]');

    //holds the array of the lastChecked radio
    let lastChecked;
  
    radios.forEach((radio, index) => {
      radio.addEventListener('click', () => {
        
        ///if the lastChecked is not equal to the current index then we set the last radio to false
        if(lastChecked >= 0 && lastChecked != index) 
        {
          radios[lastChecked].checked = false;
          allRadios[radios[lastChecked].className] = false;
        }
  
        //if allRadios at that radio is true, then we can set it back to false to uncheck the radio
        if (allRadios[radios[index].className]) 
          {
            radios[index].checked = false;
            allRadios[radios[index].className] = false;
          }
          //else it was previously false then we can check the radio
          else
          {
            radios[index].checked = true;
            allRadios[radios[index].className] = true;
          }
        //save the index of the last radio
        lastChecked = index; 
      })
    })
}

function updateSlider()
{
   // Change value of filter number
   let slider = document.querySelector('.slider')

  slider.addEventListener('input', ()=>
  {
    document.querySelector('.range-value').innerHTML = slider.value;

    return slider.value;
  })
}

function updateOtherRadios() 
{

    // holds current truth value of each radio
    let allRadios = {
      male: false,
      female: false,
      spayed: false,
      vaxxed: false,
      hometrained: false
    }

  //makes an array of the radios on the bottom
  let radios = document.querySelectorAll('.radios-second-input');


  radios.forEach((radio, index) => {
    radio.addEventListener('click', () => {
      
      //if allRadios at that radio is true, then we can set it back to false to uncheck the radio
      if (allRadios[radios[index].className]) 
        {
          radios[index].checked = false;
          allRadios[radios[index].className] = false;
        }
        //else it was previously false then we can check the radio
        else
        {
          radios[index].checked = true;
          allRadios[radios[index].className] = true;
        }
    })
  })
  
}

let showResultBtn = document.querySelector('.show-results-button');
showResultBtn.addEventListener('click', () =>
  {
    showResults()
  }
);

function showResults() 
{
  // CREATE FILTER
  let filters = [];
  
  // All radios!
  let radios = document.querySelectorAll('.radio input[type="radio"]');
  let radios2 = document.querySelectorAll('.radios-second-input');

  // CHECK EVERY FILTER
  radios.forEach((radio) => {
    if (radio.checked == true){
      filters.push(radio.classList[0]);
    }
  })

  radios2.forEach((radio) => {
    if (radio.checked == true){
      filters.push(radio.classList[1]);
    }
  })

  console.log(availablePets);

  if (filters.length > 0)
  { // we check every pet in availablePets to see if it follows our condition
    filteredOut = availablePets.filter((pet) => {
      // every checks for every tag inside our filters array
      return filters.every(tag => pet.tags.includes(tag)) // .includes checks if that tag is inside of the pet tags
    });
  
    console.log(filteredOut);
  } else 
  {
    // no filters mean just use the actual available pets...
    filteredOut = structuredClone(availablePets);
  }

  // Change the current pet to a new one
  currentPet = getRandomPet(filteredOut);

  displayPet();

/*


  // MOVE ALL AVAILABLE PETS INTO A FILTERED OUT ARRAY
  let filteredOut = structuredClone(availablePets);
  // structuredClone creates a copy of whatever inside

  // CLEAR AVAILABLE PETS
  availablePets.splice(0, availablePets.length);
  

  
  // All radios!
  let radios = document.querySelectorAll('.radio input[type="radio"]');
  let radios2 = document.querySelectorAll('.radios-second-input');

  //console.log("hello");
  //console.log((radios[4].classList[0]));
     
  // Change the current pet to a new one
  currentPet = getRandomPet(availablePets);
  
  // Display that new pet
  displayPet();


  // THEN GO THROUGH EACH PET IN THE FILTERED OUT ARRAY, AND ADD THEM BACK INTO AVAILABLE DEPENDING ON THE FILTER

  // If male and female in array DELETE
  
  filteredOut.forEach(pet, () => 
  {
    filters.forEach
  })
  */
};








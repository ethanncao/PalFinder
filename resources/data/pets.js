//array that simply holds the information of each pet
export const pets = [{
  name: 'Roxy',
  ageYrs: 8,
  breed: "husky",
  gender: "female",
  image: "roxy-dog.png",
  tags: ['female', 'dog', 'old', 'vaxxed', 'trained'],
  visible: true
},
{
  name: 'Lysa',
  ageYrs: 5,
  breed: "chihuahua",
  gender: "female",
  image: "lysa-dog.png",
  tags: ['female', 'dog', 'old', 'spayed', 'new']
},
{
  name: 'Popcorn',
  ageYrs: 7,
  breed: 'Australian Cattle',
  gender: 'male',
  image: "popcorn-dog.png",
  tags: ['male', 'dog', 'old', 'trained']
},
{
  name: 'Fefe',
  ageYrs: 3,
  breed: 'Pit Bull Terrier',
  gender: 'female',
  image: 'fefe-dog.png',
  tags: ['female', 'dog', 'young', 'trained', 'spayed', 'vaxxed']
},
{
  name: 'Rainy',
  ageYrs: 1,
  breed: 'Domestic Short Hair',
  gender: 'female',
  image: 'rainy-cat.png',
  tags: ['female', 'cat', 'young', 'new', 'vaxxed']
},
{
  name: 'Stormi',
  ageYrs: 2,
  breed: 'Domestic Short Hair',
  gender: 'female',
  image: 'stormi-cat.png',
  tags: ['female', 'cat', 'young', 'trained', 'new']
},
{
  name: 'Arville',
  ageYrs: 2,
  breed: 'Tabby',
  gender: 'male',
  image: 'arville-cat.png',
  tags: ['male', 'cat', 'young', 'vaxxed', 'spayed']
},
{
  name: 'Marco',
  ageYrs: 4,
  breed: 'Domestic Medium Hair',
  gender: 'male',
  image: 'marco-cat.png',
  tags: ['male', 'cat', 'young', 'vaxxed', 'trained', 'spayed', 'new']
}];


//we are going to create a copy of the pets array that has an array of the available pets that the user can be shown. We will be using this array to directly interact with.
export let availablePets = JSON.parse(localStorage.getItem('availablePets')) || pets.slice();

//whenever they press "yes" or "no" on a pet, it will be removed from the availablePets array and we need to save it. This is so that the user will not be shown the same pets over and over again.
export function saveAvailablePets() {
  localStorage.setItem('availablePets', JSON.stringify(availablePets));
}

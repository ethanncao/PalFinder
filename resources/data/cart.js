import {pets, availablePets} from './pets.js'
//stuff for when people want to adopt a pet that they find
export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addPet(petName) {
  cart.push(petName);
  saveToStorage();
}

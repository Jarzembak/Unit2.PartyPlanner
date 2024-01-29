const COHORT = "2311-FSA-ET-WEB-PT-SF"
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  events: [],
};

const eventList = document.querySelector('#events');
const addEventForm = document.querySelector('addEvent');

addEventForm.addEventListener('submit', addEvent);

async function render() {
  await getEvents();
  renderEvents();
}

render();

async function getEvents() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    state.events = data.data;
  } catch (error) {
    console.error(error);
  }
}

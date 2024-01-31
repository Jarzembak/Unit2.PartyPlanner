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

async function getEvents() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    state.events = data.data;
  } catch (error) {
    console.error(error);
  }
}

async function addEvent(event) {
  event.preventDefault();

  const name = { name: addEventForm.name.value };
  const description = { description: addEventForm.description.value };
  const date = { date: addEventForm.date.value };
  const location = { location: addEventForm.location.value };

  await createEvent(name, description, date, location);
}

async function createEvent(name, description, date, location) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, date, location }),
    })
    if (!response.ok) {
      throw new error("Create Event Failed!")
    }
    render();
    } catch (error) {
      console.error(error);
    }
  }

async function renderEvents() {
  if (!state.events.length) {
    eventList.innerHTML = '<li>No events found.</li>'
    return;
  }

  const eventCards = state.events.map((event) => {
    const eventCard = document.createElement('li');
    eventCard.classList.add('event');
    eventCard.innerHTML = `
    <h2>${event.name}</h2>
    <p>${event.description}</p>
    <p>${event.date}</p>
    <p>${event.location}</p>
    `
    return eventCard;}
    )
    eventList.replaceChildren(...eventCards);
  };
  render();



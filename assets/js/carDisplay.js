// Display car count
function total_available_cars(count) {
    const carCountElement = document.getElementById('car-count');
    carCountElement.textContent = count;
}

function getRentButton(car) {
    if (car.quantity === 0) {
        return `<button class="btn" onclick="showOutOfStockModal('${car.model}')">Rent now</button>`;
    } else {
        return `<button class="btn" onclick="location.href='/confirmation.html?car=${encodeURIComponent(car.model)}&price=${car.price}&description=${encodeURIComponent(car.description)}'">Rent now</button>`;
    }
}
function showOutOfStockModal(model) {
    alert(`The car model ${model} is out of stock.`);
}

// Display cars on the page
function display_all_cars(cars) {
    const carListContainer = document.getElementById('featured-car-list');
    carListContainer.innerHTML = ''; // Clear any existing content

    cars.forEach(car => {
        const carCard = `
            <li>
                <div class="featured-car-card">
                    <figure class="card-banner">
                        <img src="${car.image}" alt="${car.model}" loading="lazy" width="440" height="300" class="w-100">
                    </figure>
                    <div class="card-content">
                        <div class="card-title-wrapper">
                            <h3 class="h3 card-title"><a href="#">${car.model}</a></h3>
                            <p class="car-quantity">Available: ${car.quantity}</p>
                        </div>
                        <ul class="card-list">
                            <li class="card-list-item">${car.description}</li>
                        </ul>
                        <div class="card-price-wrapper">
                            <p class="card-price"><strong>$${car.price}</strong> / month</p>
                            ${getRentButton(car)}
                        </div>
                    </div>
                </div>
            </li>
        `;
        carListContainer.innerHTML += carCard;
    });
}

// Fetch and display the cars from the JSON file
let allCars = []; // To store all car data

fetch('/assets/data/cars.json')
  .then(response => response.json())
  .then(data => {
    allCars = data.cars;
    display_all_cars(allCars);
    total_available_cars(allCars.length);
  })
  .catch(error => console.error('Error fetching car data:', error));

// Search functionality
document.getElementById('carSearchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredCars = allCars.filter(car => car.model.toLowerCase().includes(searchTerm) || car.description.toLowerCase().includes(searchTerm));
    display_all_cars(filteredCars);
    total_available_cars(filteredCars.length);
});
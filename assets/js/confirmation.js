document.addEventListener('DOMContentLoaded', () => {
    const carModel = getUrlParameter('car');
    const startDate = getUrlParameter('startDate');
    const endDate = getUrlParameter('endDate');

    if (carModel) {
        fetch('/assets/data/cars.json')
            .then(response => response.json())
            .then(data => {
                const car = data.cars.find(c => c.model === carModel);
                if (car) {
                    document.getElementById('carModel').textContent = car.model;
                    document.getElementById('carDescription').textContent = car.description;
                    document.getElementById('carPrice').textContent = car.price;
                    document.getElementById('carImage').src = car.image;
                }
            })
            .catch(error => console.error('Error fetching car data:', error));
    }

    if (startDate) {
        document.getElementById('startDate').value = startDate;
    }
    if (endDate) {
        document.getElementById('endDate').value = endDate;
    }
});

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function calculateCost() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const carPrice = parseFloat(document.getElementById('carPrice').textContent);

    if (startDate && endDate && !isNaN(carPrice)) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = Math.abs(end - start);
        const totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        const totalCost = totalDays * carPrice;

        document.getElementById('totalDays').textContent = totalDays;
        document.getElementById('totalCost').textContent = totalCost.toFixed(2);
    } else {
        alert("Please ensure both dates are selected and the car price is available.");
    }
}

function confirmBooking() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const carModel = document.getElementById('carModel').textContent;
    const carDescription = document.getElementById('carDescription').textContent;
    const carPrice = document.getElementById('carPrice').textContent;
    const totalDays = document.getElementById('totalDays').textContent;
    const totalCost = document.getElementById('totalCost').textContent;

    const booking = {
        startDate,
        endDate,
        carModel,
        carDescription,
        carPrice,
        totalDays,
        totalCost,
        status: "pending"
    };

    fetch('/assets/data/bookings.json')
        .then(response => response.json())
        .then(data => {
            data.bookings.push(booking);
            return fetch('/assets/data/bookings.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        })
        .then(() => {
            const dialog = document.getElementById('confirmationDialog');
            dialog.showModal();
        })
        .catch(error => console.error('Error saving booking:', error));
}

function closeConfirmation() {
    const dialog = document.getElementById('confirmationDialog');
    dialog.close();
}

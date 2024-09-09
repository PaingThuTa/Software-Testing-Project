document.addEventListener('DOMContentLoaded', () => {
    fetch('/assets/data/bookings.json')
        .then(response => response.json())
        .then(data => {
            const bookingsTable = document.getElementById('bookingsTable').getElementsByTagName('tbody')[0];
            data.bookings.forEach((booking, index) => {
                const row = bookingsTable.insertRow();
                row.insertCell(0).textContent = booking.startDate;
                row.insertCell(1).textContent = booking.endDate;
                row.insertCell(2).textContent = booking.carModel;
                row.insertCell(3).textContent = booking.totalDays;
                row.insertCell(4).textContent = booking.totalCost;
                row.insertCell(5).textContent = booking.status;
                const actionsCell = row.insertCell(6);
                const acceptButton = document.createElement('button');
                acceptButton.textContent = 'Accept';
                acceptButton.onclick = () => updateBookingStatus(index, 'accepted');
                actionsCell.appendChild(acceptButton);
                const declineButton = document.createElement('button');
                declineButton.textContent = 'Decline';
                declineButton.onclick = () => updateBookingStatus(index, 'declined');
                actionsCell.appendChild(declineButton);
            });
        })
        .catch(error => console.error('Error fetching bookings:', error));
});

function updateBookingStatus(index, status) {
    fetch('/assets/data/bookings.json')
        .then(response => response.json())
        .then(data => {
            data.bookings[index].status = status;
            return fetch('/assets/data/bookings.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        })
        .then(() => location.reload())
        .catch(error => console.error('Error updating booking status:', error));
}
import json
from datetime import datetime

# Function to load cars from a JSON file
def load_cars(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
        return data['cars']

# Function to display all cars
def display_all_cars(cars):
    for car in cars:
        print(f"Model: {car['model']}")
        print(f"Description: {car['description']}")
        print(f"Price: ${car['price']}")
        print(f"Year: {car['year']}")
        print(f"Available quantity: {car['quantity']}")
        print("-" * 50)

# Function to show total available cars
def total_available_cars(cars):
    total_cars = sum(car['quantity'] for car in cars)
    print(f"Total available cars: {total_cars}")

# Function to search for a car by model
def search_car_by_model(cars, model_name):
    for car in cars:
        if model_name.lower() in car['model'].lower():
            print(f"Model: {car['model']}")
            print(f"Description: {car['description']}")
            print(f"Price: ${car['price']}")
            print(f"Year: {car['year']}")
            print(f"Available quantity: {car['quantity']}")
            return car
    print(f"No car found for model: {model_name}")
    return None

# Function to calculate the total cost based on start and end date
def calculate_cost(car, start_date, end_date):
    try:
        start_date = datetime.strptime(start_date, "%m/%d/%Y")
        end_date = datetime.strptime(end_date, "%m/%d/%Y")
        if start_date >= end_date:
            print("Error: End date must be after start date.")
            return

        days = (end_date - start_date).days
        total_cost = days * car['price']
        print(f"Total days: {days}")
        print(f"Total cost for {car['model']}: ${total_cost}")
    except ValueError:
        print("Error: Invalid date format. Use mm/dd/yyyy.")

# Main function to run the car rental system simulation
def main():
    cars = load_cars('cars.json')

    # Show all cars
    display_all_cars(cars)

    # Show total available cars
    total_available_cars(cars)

    # Ask user to search for a car model
    model_name = input("Enter the car model you want to rent: ")
    selected_car = search_car_by_model(cars, model_name)

    if selected_car:
        # Ask user for start and end dates
        start_date = input("Enter the start date (mm/dd/yyyy): ")
        end_date = input("Enter the end date (mm/dd/yyyy): ")

        # Calculate the total cost
        calculate_cost(selected_car, start_date, end_date)

if __name__ == "__main__":
    main()

import json
from datetime import datetime

# Load cars data from a JSON file
def load_cars(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            cars_data = json.load(f)
        return cars_data['cars']
    except FileNotFoundError:
        print("Error: File not found.")
        return None
    except json.JSONDecodeError:
        print("Error: JSON decoding failed.")
        return None

def getRentButton(car):
    if car['quantity']==0:
        print(f"The car model {car['model']}  is out of stock.")
    else:
        print(f"Rent {car['model']}")

# Display all cars available
def display_all_cars(cars):
    if not cars:
        print("No cars available.")
    
    for car in cars:
        print(f"Model: {car['model']}")
        print(f"Description: {car['description']}")
        print(f"Price per day: ${car['price']}")
        print(f"Year: {car['year']}")
        print(f"Available: {car['quantity']}")
        print(f"Image: {car['image']}\n")

# Calculate total available cars
def total_available_cars(cars):
    if not cars:
        return 0
    total = 0
    for car in cars:
        total += car['quantity']
    return total

# Search for a car by model name
def search_car_by_model(cars, model_name):
    for car in cars:
        if car['model'].lower() == model_name.lower():
            return car
    return None

# Calculate the number of days between two dates
def calculate_days(start_date, end_date):
    format_str = "%Y-%m-%d"  # Date format
    start = datetime.strptime(start_date, format_str)
    end = datetime.strptime(end_date, format_str)
    delta = end - start
    if delta.days <= 0:
        print("Error: Please enter the start date and end date properly.")
        return None
    return delta.days

# Calculate total cost based on the start and end date and car price
def calculate_cost(cars, model_name, start_date, end_date):
    days = calculate_days(start_date, end_date)
    if days is None:
        return 0

    car = search_car_by_model(cars, model_name)
    if car:
        cost = car['price'] * days
        print(f"Total cost for {model_name} from {start_date} to {end_date} ({days} days) is: ${cost}")
        return cost
    else:
        print("Car not available.")
        return 0

# Confirm booking by reducing the quantity of the booked car
def confirm_booking( model_name,start_date, end_date):
    days = calculate_days(start_date, end_date)

    if days is None:
        print("Choose start date and end date properly")

    else:
        print(f"Booking confirmed for {model_name} from {start_date} to {end_date} for {days} days.")

# Example usage:
file_path = 'C:\\software testing\\aftermid\\Software-Testing-Project\\Software-Testing-Project\\assets\\data\\cars.json'
cars = load_cars(file_path)

if cars:
    display_all_cars(cars)
    print(f"Total cars available: {total_available_cars(cars)}")
    
    car_model = input("Enter car model to rent: ")
    
    

    # Get user input for start and end dates
    start_date = input("Enter rental start date (YYYY-MM-DD): ")
    end_date = input("Enter rental end date (YYYY-MM-DD): ")

    # Search for a car, calculate the cost, and confirm the booking
    
    calculate_cost(cars, car_model, start_date, end_date)
    confirm_booking( car_model, start_date, end_date)

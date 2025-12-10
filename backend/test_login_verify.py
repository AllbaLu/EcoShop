import requests

url = "http://127.0.0.1:5000/api/login"
data = {
    "email": "admin@ecoshop.local",
    "password": "admin123"
}

try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")

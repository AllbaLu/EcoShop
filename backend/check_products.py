import requests
import json

try:
    response = requests.get("http://127.0.0.1:5000/api/products")
    print(f"Status: {response.status_code}")
    products = response.json()
    print(f"Count: {len(products)}")
    if len(products) > 0:
        print("First product sample:")
        print(json.dumps(products[0], indent=2))
except Exception as e:
    print(f"Error: {e}")

import json
import requests
import time


def sendData(url, data_path):
    try:
        with open(data_path, "r") as file:
            data = json.load(file)
        batch_size = 50
        for i in range(0, len(data), batch_size):
            batch = data[i:i + batch_size]
            response = requests.post(url, json=batch)
            time.sleep(0.2)
        print("Все пакеты успешно отправлены!")
    except FileNotFoundError:
        print(f"Error: File {data_path} not found.")
    except json.JSONDecodeError:
        print("Error: JSON parsing error.")
    except requests.exceptions.RequestException as e:
        print("HTTP request error:", e)


print("Sending users")
sendData("http://localhost:5000/api/auth/list", "./generated/users_result.json")
print("Sending projects")
sendData("http://localhost:5000/api/projects/list", "./generated/projects_result.json")
print("Sending teams")
sendData("http://localhost:5000/api/teams/list", "./generated/teams_result.json")
print("Sending tasks")
sendData("http://localhost:5000/api/tasks/list", "./generated/tasks_result.json")
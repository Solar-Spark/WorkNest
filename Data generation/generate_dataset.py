import random
import google.generativeai as genai
import json
import time


def sendWithRetry(session, prompt, retries=3, delay=5):
    for attempt in range(retries):
        try:
            time.sleep(delay)
            response = session.send_message(prompt)
            return response
        except Exception as e:
            print(f"Attempt {attempt + 1} stopped with error: {e}")
            if attempt < retries - 1:
                time.sleep(delay)
            else:
                raise e


def assignProjectManager():
    projects = json.load(open("projects_result.json", "r"))
    users = json.load(open("users_result.json", "r"))
    for project in projects:
        for user in users:
            if project["created_by"] == user["user_id"]:
                user["roles"].append({"name": "PROJECT_MANAGER", "project_id": project["project_id"]})
    with open("users_result.json", "w") as result_file:
        json.dump(users, result_file, indent=4)


def assignTeamMembers():
    assigned_users = []
    teams = json.load(open("teams_result.json", "r"))
    users = json.load(open("users_result.json", "r"))
    for team in teams:
        for user in users:
            for role in user["roles"]:
                if role["name"] == "TEAM_LEAD" and role["team_id"] == team["team_id"]:
                    team["members"].append(user["user_id"])
                    assigned_users.append(user["user_id"])
    while len(assigned_users) < 150:
        for team in teams:
            for i in range(1, 151):
                if i in assigned_users:
                    continue
                team["members"].append(i)
                assigned_users.append(i)
                break
    with open("teams_result.json", "w") as result_file:
        json.dump(teams, result_file, indent=4)


def assignTasks():
    tasks = json.load(open("tasks_result.json", "r"))
    teams = json.load(open("teams_result.json", "r"))
    for task in tasks:
        teams_list = []
        for team in teams:
            if task["project_id"] == team["project_id"]:
                teams_list.append(team)
        task_team = random.choice(teams_list)
        task["team_id"] = task_team["team_id"]
        user_id = random.choice(task_team["members"])
        task["assigned_to"] = user_id
    with open("tasks_result.json", "w") as result_file:
        json.dump(tasks, result_file, indent=4)


def generate_json_data(name, prompt, result_path, generations_number):
    with open(result_path, "w") as result_file:
        json.dump([], result_file, indent=4)
    for i in range(generations_number):
        print(name)
        response = sendWithRetry(chat_session, open(prompt, "r"))
        with open(result_path, "r") as data_file:
            data = json.load(data_file)
        response_text = str(response.text.replace("```", "").replace("json", ""))
        print(response_text)
        response_data = data + json.loads(response_text)
        with open(result_path, "w") as result_file:
            json.dump(response_data, result_file, indent=4)


genai.configure(api_key="<API KEY>")


generation_config = {
  "temperature": 0.2,
  "top_p": 1.0,
  "top_k": 0,
  "max_output_tokens": 100000,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-2.0-flash-exp",
  generation_config=generation_config,
)

chat_session = model.start_chat(
  history=[
  ]
)


# projects generation
generate_json_data("Projects generation", "projects_prompt.txt", "projects_result.json", 1)

# users generation
generate_json_data("Users generation", "users_prompt.txt", "users_result.json", 5)

# teams generation
generate_json_data("Teams generation", "teams_prompt.txt", "teams_result.json", 2)

# tasks generations
generate_json_data("Tasks generation", "tasks_prompt.txt", "tasks_result.json", 35)

assignProjectManager()
assignTeamMembers()
assignTasks()
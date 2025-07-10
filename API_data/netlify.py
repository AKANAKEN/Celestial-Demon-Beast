import requests
import json
import base64

# Ganti dengan informasi GitHub kamu
GITHUB_TOKEN = "your_github_token"
REPO_OWNER = "your_github_username"
REPO_NAME = "your_repository"
FILE_PATH = "data.json"  # Lokasi file JSON di repo

# URL API GitHub
url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/contents/{FILE_PATH}"
headers = {
    "Authorization": f"token {GITHUB_TOKEN}",
    "Accept": "application/vnd.github.v3+json"
}

# Mengambil isi file JSON dari GitHub
response = requests.get(url, headers=headers)
if response.status_code == 200:
    file_data = response.json()
    sha = file_data["sha"]  # Diperlukan untuk update
    content = base64.b64decode(file_data["content"]).decode("utf-8")
    json_data = json.loads(content)

    # **Update JSON di sini** (contoh: menambah timestamp)
    json_data["last_updated"] = "2025-02-07"
    json_data["status"] = "updated"

    # Encode ulang ke Base64
    updated_content = base64.b64encode(json.dumps(json_data, indent=4).encode("utf-8")).decode("utf-8")

    # Kirim update ke GitHub
    update_data = {
        "message": "Update JSON otomatis",
        "content": updated_content,
        "sha": sha
    }
    update_response = requests.put(url, headers=headers, json=update_data)

    if update_response.status_code == 200:
        print("Data JSON berhasil diperbarui di GitHub!")

        # **Memicu deploy otomatis di Netlify**
        NETLIFY_BUILD_HOOK = "https://api.netlify.com/build_hooks/YOUR_BUILD_HOOK_ID"
        netlify_response = requests.post(NETLIFY_BUILD_HOOK)

        if netlify_response.status_code == 200:
            print("Netlify berhasil di-trigger untuk deploy ulang!")
        else:
            print("Gagal trigger Netlify:", netlify_response.text)
    else:
        print("Gagal memperbarui JSON:", update_response.json())
else:
    print("Gagal mengambil file:", response.json())

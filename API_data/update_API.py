import requests
import os
import json

def download_api_data(api_url, output_file):
    try:
        # Permintaan data dari API
        response = requests.get(api_url)
        response.raise_for_status()  # Memeriksa jika ada error pada permintaan

        # Parse data dari respons JSON
        data = response.json()

        # Menyimpan data ke file
        with open(output_file, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=2, ensure_ascii=False)

        print(f"Data berhasil diunduh dan disimpan ke file: {output_file}")
    except requests.exceptions.RequestException as e:
        print(f"Gagal mengunduh data dari API: {e}")
    except Exception as e:
        print(f"Terjadi kesalahan: {e}")

if __name__ == "__main__":
    # Daftar API dan file output yang sesuai
    api_file_pairs = [
        {"api_url": "https://api.sheety.co/478cdb252cb27c7ea9a3a844a90a8ee3/serverFutakiEmpire(jawaban)/formResponses", "output_file": "Server_data.json"},
        {"api_url": "https://api.sheety.co/478cdb252cb27c7ea9a3a844a90a8ee3/introduction (jawaban)/staff", "output_file": "Staff_data.json"},
        {"api_url": "https://api.sheety.co/478cdb252cb27c7ea9a3a844a90a8ee3/introduction (jawaban)/member", "output_file": "Member_data.json"},
        # {"api_url": "https://official-joke-api.appspot.com/random_joke", "output_file": "Data2.txt"},
    ]

    # Jalankan pengunduhan untuk setiap pasangan API dan file output
    for pair in api_file_pairs:
        output_path = os.path.join(os.getcwd(), pair["output_file"])
        download_api_data(pair["api_url"], output_path)

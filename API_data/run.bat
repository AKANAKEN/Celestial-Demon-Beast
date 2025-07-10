@echo off
REM File batch untuk menjalankan program Python
REM Pastikan file program.py ada di lokasi yang sama

echo Menjalankan program Python untuk mengunduh data dari API...
python update_API.py

if %errorlevel%==0 (
    echo Program selesai dijalankan dengan sukses!
) else (
    echo Terjadi kesalahan saat menjalankan program.
)

pause

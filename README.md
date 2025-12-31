# Pastebin_test

🐍 Backend Setup

cd server
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver   # Runs backend on http://127.0.0.1:8000
http://127.0.0.1:8000/paste/active/   to run the backend

⚡ Frontend Setup

cd ../client/frontapp
npm install
echo "VITE_BACKEND_URL=http://127.0.0.1:8000" > .env
npm run dev                
 # Runs frontend on http://127.0.0.1:5173

 *make sure both Frontend and Backend server opens 
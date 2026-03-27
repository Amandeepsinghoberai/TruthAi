# Truth AI - Deepfake Detection Platform

<div align="center">
  <h3>AI-Powered Deepfake Detection for Images and Videos</h3>
  <p>A lie detector for videos and images</p>
</div>

## 🎯 About

Truth AI is a full-stack application that uses advanced AI (Vision Transformer) to detect deepfakes in images and videos. Built with React, FastAPI, Firebase, and HuggingFace Transformers.

## ✨ Features

- 🤖 **AI-Powered Detection** - 90%+ accuracy using ViT model
- 🖼️ **Image Analysis** - Instant deepfake detection for images
- 🎥 **Video Analysis** - Frame-by-frame analysis with ensemble methods
- 🔐 **Firebase Authentication** - Email/password + Google Sign-In
- 📊 **Dashboard** - Track your scan history and statistics
- 📱 **Responsive Design** - Works on desktop and mobile
- 🔒 **Secure** - Files analyzed privately and not stored

## 🛠️ Tech Stack

**Frontend:**
- React 19 with React Router v7
- Tailwind CSS + shadcn/ui components
- Firebase Web SDK
- Axios for API calls

**Backend:**
- FastAPI (Python 3.11)
- HuggingFace Transformers (ViT model)
- Firebase Admin SDK
- Firestore database
- OpenCV for video processing

**AI Model:**
- Vision Transformer (Wvolf/ViT_Deepfake_Detection)
- 343MB model size
- 90%+ detection accuracy

## 📦 Installation

### Prerequisites

- Node.js 16+
- Python 3.11+
- Firebase account
- Git

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd truthai
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Add Firebase credentials
cp config/serviceAccountKey.example.json config/serviceAccountKey.json
# Replace with your actual Firebase service account key

# Run the server
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

Backend will be available at: `http://localhost:8001`

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
yarn install

# Setup environment variables
cp .env.example .env
# Edit .env with your backend URL

# Start development server
yarn start
```

Frontend will be available at: `http://localhost:3000`

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password + Google)
3. Enable Firestore Database
4. Download service account key for backend
5. Get web app config for frontend

### Environment Variables

**Backend (.env):**
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=truthai_database
FIREBASE_CREDENTIALS_PATH=config/serviceAccountKey.json
```

**Frontend (.env):**
```env
REACT_APP_BACKEND_URL=http://localhost:8001
```

## 🚀 Usage

1. **Sign Up / Login** - Create an account or sign in with Google
2. **Upload File** - Drag and drop an image or video (max 100MB)
3. **Get Results** - View verdict (REAL/FAKE) with confidence score
4. **View History** - Check all your previous scans in the dashboard
5. **Share Feedback** - Help improve the platform via survey

## 📸 Screenshots

### Home Page
Professional landing page with features and stats

### Dashboard
Track your detection history and statistics

### Upload & Results
Drag-and-drop upload with instant AI analysis

## 🏗️ Project Structure

```
truthai/
├── backend/
│   ├── config/          # Firebase configuration
│   ├── middleware/      # Authentication middleware
│   ├── model/          # AI model (detector.py)
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   ├── server.py       # FastAPI app
│   └── requirements.txt
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/        # API calls
│       ├── components/ # React components
│       ├── config/     # Firebase config
│       ├── context/    # Auth context
│       ├── pages/      # All pages
│       └── App.js
└── README.md
```

## 🔒 Security

- Never commit `.env` files or `serviceAccountKey.json`
- Use environment variables for all secrets
- Firebase tokens are verified on every API call
- Files are not stored permanently on server

## 📝 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | No | API info |
| GET | `/health` | No | Health check |
| POST | `/api/detect` | Yes | Upload & analyze file |
| GET | `/api/history` | Yes | Get scan history |
| DELETE | `/api/history/{id}` | Yes | Delete scan |
| POST | `/api/survey` | Yes | Submit survey |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Amandeep Singh Oberai**

Created with ❤️ to fight misinformation

## 🙏 Acknowledgments

- HuggingFace for the ViT model
- Firebase for authentication and database
- OpenCV for video processing
- React and FastAPI communities

---

**Note:** This is an AI-powered tool and should be used as one indicator among many when verifying content authenticity.

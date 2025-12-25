# TypeTester - Typing Speed Test Application

A web-based typing speed test application built with Django that helps users improve their typing skills by measuring Words Per Minute (WPM), accuracy, and tracking errors in real-time.

## 🚀 Features

- **User Authentication**: Simple login and registration system with session-based authentication
- **Real-time Typing Test**: Practice typing with randomly selected quotes and sentences
- **Performance Metrics**: 
  - Words Per Minute (WPM) calculation
  - Accuracy percentage tracking
  - Error counting
  - Time tracking
- **Flexible Time Options**: Choose from 15s, 30s, 60s, or 120s test durations
- **Visual Feedback**: Virtual keyboard display and real-time statistics
- **Results Page**: Detailed breakdown of your typing performance after each test
- **Modern UI**: Clean and intuitive interface for an optimal typing experience

## 🛠️ Tech Stack

- **Backend**: Django 4.2.23
- **Database**: SQLite3
- **Frontend**: HTML, CSS, JavaScript
- **Authentication**: Session-based authentication

## 📋 Prerequisites

- Python 3.x
- pip (Python package manager)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vyu
   ```

2. **Navigate to the project directory**
   ```bash
   cd project
   ```

3. **Create a virtual environment (recommended)**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

4. **Install Django**
   ```bash
   pip install django
   ```

5. **Run migrations**
   ```bash
   python manage.py migrate
   ```

6. **Create a superuser (optional, for admin access)**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the development server**
   ```bash
   python manage.py runserver
   ```

8. **Access the application**
   - Open your browser and navigate to `http://127.0.0.1:8000/`
   - Register a new account or login with existing credentials

## 📁 Project Structure

```
vyu/
├── project/
│   ├── app/                    # Main typing test application
│   │   ├── static/
│   │   │   └── app/
│   │   │       ├── css/        # Stylesheets (typer.css, results.css, login_register.css)
│   │   │       └── js/          # JavaScript (typer.js)
│   │   ├── templates/
│   │   │   ├── typer.html      # Main typing test page
│   │   │   └── results.html    # Results display page
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── models.py
│   ├── base/                   # Authentication app
│   │   ├── templates/
│   │   │   ├── login.html      # Login page
│   │   │   └── register.html  # Registration page
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── models.py
│   ├── project/                # Django project settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   ├── manage.py
│   └── db.sqlite3             # SQLite database
└── README.md
```

## 🎮 Usage

1. **Register/Login**: Start by creating an account or logging in with your credentials
2. **Select Time Duration**: Choose your preferred test duration (15s, 30s, 60s, or 120s)
3. **Start Typing**: Click the "Start" button and begin typing the displayed quote
4. **View Real-time Stats**: Watch your WPM, accuracy, and time update in real-time
5. **Complete Test**: Finish typing the quote or wait for the timer to end
6. **Review Results**: View detailed results including WPM, time taken, accuracy, and errors
7. **Try Again**: Practice more to improve your typing speed!

## 📊 How It Works

- The application displays random quotes and sentences for typing practice
- As you type, the system tracks:
  - **WPM**: Calculated based on words typed per minute
  - **Accuracy**: Percentage of correct characters typed
  - **Errors**: Total number of incorrect keystrokes
  - **Time**: Elapsed time or countdown timer
- The test ends when you complete the quote or the selected time duration expires
- Results are displayed on a dedicated results page with all performance metrics

## 👨‍💻 Developers

- **saisreenivas**
- **sreekar**

> "Typing makes man typer..."

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📧 Contact

For questions or suggestions, please open an issue in the repository.

---

**Happy Typing!** 🎯

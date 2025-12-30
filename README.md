
# Movie Application

This is a full-stack Movie  application where users can browse movies
and admins can add, edit, and delete movies.

The application uses role-based authentication with JWT and cookies.
It is built using MERN stack and deployed on cloud platforms.
.

### 👤 Authentication & Authorization
- User Signup & Login
- JWT authentication 
- Role-based access:
  - **User** → View, search, sort movies
  - **Admin** → Add, edit, delete movies

### 🎥 Movie Management
- View all movies (pagination)
- Search movies by name
- Sort movies (rating, date, title)
- Admin dashboard for managing movies

### 🔐 Security
- Protected routes (frontend & backend)
- Secure cookies
- CORS configured for production


## Deployment

To deploy this project run

### Backend
```bash
cd Backend
npm install
npm run dev
```
### frontend
```bash
cd frontend
npm install
npm run dev
```

## 📘 API Documentation

### Authentication
- POST /auth/register – Register user
- POST /auth/login – Login user
- GET /auth/logout – Logout user

### Movies
- GET /movies – Get all movies (Auth required)
- GET /movies/search – Search movies
- GET /movies/sorted – Sort movies
- GET /movies/:id – Get movie by ID
- POST /movies – Add movie (Admin)
- PUT /movies/:id – Update movie (Admin)
- DELETE /movies/:id – Delete movie (Admin)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`## 🔐 Environment Variables

### Backend
- MONGO_URL
- JWT_SECRET
- PORT




## Live Application

"https://movieapp-9tql.onrender.com"


## 🧪 Test Credentials

Admin:
email: admin@test.com  
password: admin123

User:
email: user@test.com  
password: user123

## Screenshorts
<img width="1839" height="849" alt="image" src="https://github.com/user-attachments/assets/5cc61197-437a-4dc8-b184-720a7272dd6e" />
<img width="1905" height="849" alt="image" src="https://github.com/user-attachments/assets/e7fe57ed-d986-4045-8573-0f3ae9ec68b9" />
<img width="1780" height="902" alt="image" src="https://github.com/user-attachments/assets/ab823287-ccb5-4728-95bb-75868b83be8d" />




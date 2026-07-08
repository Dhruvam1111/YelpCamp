# 🏕️ YelpCamp

A full-stack web application for discovering and reviewing campgrounds — built as the capstone project of **Colt Steele's Web Developer Bootcamp**. Users can browse campgrounds on an interactive map, create listings with photos, and leave star-rated reviews.

**Live Demo:** [Deployed on Railway] *(update with your Railway URL)*

---

## 📸 Screenshots

> Add screenshots here after deployment

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [How Key Features Work](#how-key-features-work)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Security Measures](#security-measures)
- [Local Setup](#local-setup)
- [Environment Variables](#environment-variables)
- [Deployment on Railway](#deployment-on-railway)
- [Common Issues & Fixes](#common-issues--fixes)
- [What I Learned](#what-i-learned)

---

## ✨ Features

- 🗺️ **Interactive Cluster Map** — All campgrounds displayed on a MapTiler map with clustering. Click a cluster to zoom in; click a pin to see campground details.
- 📍 **Individual Campground Maps** — Each campground show page has its own map with a marker and popup.
- 🖼️ **Image Upload** — Users can upload multiple images per campground, stored on Cloudinary CDN.
- 🔐 **User Authentication** — Register, login, logout using Passport.js with username/password (Local Strategy).
- ✍️ **Authorization** — Only the campground/review author can edit or delete their own content.
- ⭐ **Star Ratings** — Animated star rating system for reviews.
- 🛡️ **Security** — Helmet.js (CSP headers), MongoDB injection sanitization, HTML input sanitization via Joi + sanitize-html.
- 📱 **Responsive Design** — Bootstrap 5 responsive layout.
- 🔔 **Flash Messages** — Success/error notifications on every action.

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime environment |
| **Express.js v5** | Web framework for routing and middleware |
| **MongoDB** | NoSQL database for storing campgrounds, users, reviews |
| **Mongoose** | MongoDB ODM (Object Document Mapper) — schema, validation, queries |
| **Passport.js** | Authentication middleware |
| **passport-local** | Username/password login strategy |
| **passport-local-mongoose** | Mongoose plugin that adds hashing, salting, and auth methods to User model |
| **express-session** | Session management |
| **connect-mongo** | Stores sessions in MongoDB (not in server memory) |
| **connect-flash** | Flash messages (success/error) between redirects |
| **Helmet.js** | Sets HTTP security headers (Content Security Policy etc.) |
| **Joi** | Server-side input validation |
| **sanitize-html** | Strips HTML tags from user input to prevent XSS |
| **express-mongo-sanitize** | Prevents MongoDB operator injection attacks |
| **method-override** | Enables PUT/DELETE in HTML forms (which only support GET/POST) |
| **multer** | Handles multipart/form-data (file uploads) |
| **multer-storage-cloudinary** | Cloudinary storage engine for multer |
| **dotenv** | Loads environment variables from `.env` file |

### Frontend
| Technology | Purpose |
|---|---|
| **EJS** | Server-side templating engine (HTML with JS embedded) |
| **ejs-mate** | EJS layout/partials support (`layout()`, `block()`) |
| **Bootstrap 5** | CSS framework for responsive UI |
| **MapTiler SDK** | Interactive maps (based on MapLibre GL JS) |
| **Starability.css** | Pure CSS animated star ratings |

### Cloud Services
| Service | Purpose |
|---|---|
| **MongoDB Atlas** | Cloud-hosted MongoDB database (free M0 tier) |
| **Cloudinary** | Cloud image storage and CDN |
| **MapTiler** | Map tiles and Geocoding API |
| **Railway** | Cloud deployment platform for Node.js apps |

---

## 🏛️ Architecture Overview

```
Browser (Client)
      │
      │  HTTP Request
      ▼
Express.js App (app.js)
      │
      ├── Middleware Pipeline
      │     ├── express.urlencoded()   → Parse form data
      │     ├── express-session        → Session management
      │     ├── connect-flash          → Flash messages
      │     ├── passport.initialize()  → Auth setup
      │     ├── helmet()               → Security headers
      │     └── mongoSanitize()        → Input sanitization
      │
      ├── Routes
      │     ├── /                      → Home page
      │     ├── /campgrounds           → Campground CRUD
      │     ├── /campgrounds/:id/reviews → Reviews CRUD
      │     ├── /register              → User registration
      │     ├── /login                 → User login
      │     └── /logout               → Logout
      │
      ├── Controllers (business logic)
      │     ├── campgrounds.js
      │     ├── reviews.js
      │     └── users.js
      │
      ├── Models (Mongoose Schemas)
      │     ├── Campground
      │     ├── Review
      │     └── User
      │
      └── External Services
            ├── MongoDB Atlas  ← Stores all data
            ├── Cloudinary     ← Stores images
            └── MapTiler       ← Geocoding + Map tiles
```

---

## 📁 Project Structure

```
YelpCamp/
│
├── app.js                    # Entry point — Express setup, middleware, routes
├── middleware.js             # Custom middleware (auth guards, validators)
├── schemas.js                # Joi validation schemas
├── package.json              # Dependencies and npm scripts
├── .env                      # Environment variables (NOT committed to git)
├── .gitignore                # Excludes node_modules, .env
│
├── models/                   # Mongoose data models
│   ├── campground.js         # Campground schema with virtual properties
│   ├── review.js             # Review schema
│   └── user.js               # User schema with passport-local-mongoose plugin
│
├── routes/                   # Express route definitions
│   ├── campgrounds.js        # /campgrounds routes
│   ├── reviews.js            # /campgrounds/:id/reviews routes
│   └── users.js              # /register, /login, /logout routes
│
├── controllers/              # Route handler logic (MVC pattern)
│   ├── campgrounds.js        # Campground CRUD + geocoding
│   ├── reviews.js            # Review create/delete
│   └── users.js              # Register/login/logout logic
│
├── utilities/                # Helper modules
│   ├── ExpressError.js       # Custom error class with statusCode
│   ├── catchAsync.js         # Wraps async route handlers to catch errors
│   └── mongoSanitizeV5.js    # Custom sanitize middleware (Express 5 compatible)
│
├── cloudinary/
│   └── index.js              # Cloudinary config + multer-storage-cloudinary setup
│
├── seeds/                    # Database seeding scripts
│
├── views/                    # EJS templates
│   ├── layouts/
│   │   └── boilerplate.ejs   # Base HTML layout (head, navbar, footer)
│   ├── partials/
│   │   ├── navbar.ejs        # Navigation bar
│   │   ├── flash.ejs         # Flash messages display
│   │   └── footer.ejs        # Footer
│   ├── campgrounds/
│   │   ├── index.ejs         # All campgrounds + cluster map
│   │   ├── show.ejs          # Single campground + map + reviews
│   │   ├── new.ejs           # Create campground form
│   │   └── edit.ejs          # Edit campground form
│   ├── users/
│   │   ├── register.ejs      # Registration form
│   │   └── login.ejs         # Login form
│   ├── home.ejs              # Landing page
│   └── error.ejs             # Error page
│
└── public/                   # Static assets served to browser
    ├── stylesheets/
    │   ├── app.css           # Map sizing styles
    │   ├── home.css          # Landing page styles
    │   └── stars.css         # Starability star rating CSS
    └── javascripts/
        ├── clusterMap.js     # Cluster map logic (index page)
        ├── showPageMap.js    # Single campground map logic
        └── validateForms.js  # Bootstrap client-side form validation
```

---

## ⚙️ How Key Features Work

### 1. User Authentication (Passport.js)

Passport.js uses a **Local Strategy** (username + password). The `passport-local-mongoose` plugin automatically adds:
- Password hashing with **pbkdf2** (salted)
- `.authenticate()`, `.serializeUser()`, `.deserializeUser()` methods to the User model

**Registration flow:**
```
POST /register
  → User model created with email + username
  → passport-local-mongoose hashes the password
  → User is auto-logged in via req.login()
  → Redirect to /campgrounds
```

**Login flow:**
```
POST /login
  → passport.authenticate('local') checks credentials
  → On success: session is created, user stored in session
  → On failure: flash error, redirect back to /login
```

**Session persistence:**
Sessions are stored in **MongoDB** (via `connect-mongo`), not in server memory. This means sessions survive server restarts and work across multiple server instances.

---

### 2. Campground Geocoding (MapTiler API)

When a user creates or edits a campground with a location string (e.g. *"Yellowstone, Wyoming"*), the app calls the **MapTiler Geocoding API** to convert it to GPS coordinates:

```javascript
const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
campground.geometry = geoData.features[0].geometry;
// geometry = { type: "Point", coordinates: [lng, lat] }
```

These coordinates are stored in MongoDB as **GeoJSON** and used by MapTiler SDK in the browser to place markers.

---

### 3. Image Upload (Multer + Cloudinary)

```
User selects image in form
  → Browser sends multipart/form-data to Express
  → multer intercepts the file(s)
  → multer-storage-cloudinary streams file directly to Cloudinary
  → Cloudinary returns { path: URL, filename: publicId }
  → URL and publicId stored in MongoDB with the campground
```

Images are stored on Cloudinary's CDN, not on the server. This means even if the server restarts or moves, images remain accessible.

**Image deletion** when editing a campground:
```javascript
await cloudinary.uploader.destroy(filename); // Remove from Cloudinary
await campground.updateOne({ $pull: { images: { filename: { $in: deleteImages } } } }); // Remove from DB
```

---

### 4. Interactive Maps (MapTiler SDK)

**Cluster Map** (`/campgrounds` index page):
- All campgrounds are passed to the browser as a **GeoJSON FeatureCollection**
- MapTiler SDK renders a map with clustered circles (number shows count)
- Clicking a cluster zooms in; clicking a single point shows a popup with link

**Show Map** (`/campgrounds/:id` page):
- The campground's stored `geometry.coordinates` are used to center the map
- A marker with a popup (title + location) is placed at those coordinates

---

### 5. Authorization (Ownership Checks)

The `isAuthor` middleware prevents users from editing/deleting campgrounds they don't own:

```javascript
module.exports.isAuthor = async (req, res, next) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission!');
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}
```

Edit/Delete buttons only appear in the UI if `currentUser._id === campground.author._id` (checked in EJS template), but the **server also validates** this — so even direct API calls are protected.

---

### 6. Error Handling

Two-layer error handling:

**`catchAsync` utility** — wraps async route handlers so errors are passed to Express error handler automatically:
```javascript
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}
```

**Global error handler** in `app.js`:
```javascript
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    res.status(statusCode).render('error', { err });
});
```

**`ExpressError` class** — custom error with statusCode:
```javascript
throw new ExpressError('Page Not Found', 404);
```

---

## 🛣️ API Routes

### Campgrounds
| Method | Route | Description | Auth Required |
|---|---|---|---|
| GET | `/campgrounds` | List all campgrounds + cluster map | No |
| GET | `/campgrounds/new` | Render new campground form | Yes |
| POST | `/campgrounds` | Create new campground | Yes |
| GET | `/campgrounds/:id` | Show single campground + map + reviews | No |
| GET | `/campgrounds/:id/edit` | Render edit form | Yes + Owner |
| PUT | `/campgrounds/:id` | Update campground | Yes + Owner |
| DELETE | `/campgrounds/:id` | Delete campground | Yes + Owner |

### Reviews
| Method | Route | Description | Auth Required |
|---|---|---|---|
| POST | `/campgrounds/:id/reviews` | Create review for campground | Yes |
| DELETE | `/campgrounds/:id/reviews/:reviewId` | Delete review | Yes + Author |

### Users
| Method | Route | Description |
|---|---|---|
| GET | `/register` | Render registration form |
| POST | `/register` | Create new user account |
| GET | `/login` | Render login form |
| POST | `/login` | Authenticate user |
| GET | `/logout` | Logout current user |

> **Note:** HTML forms only support GET and POST. The `method-override` package reads a `?_method=PUT` or `?_method=DELETE` query string and overrides the method, enabling RESTful routes from HTML forms.

---

## 🗄️ Database Schema

### Campground
```javascript
{
  title: String,
  images: [{ url: String, filename: String }],  // Cloudinary URLs
  geometry: {                                    // GeoJSON Point
    type: { type: String, enum: ['Point'] },
    coordinates: [Number]                        // [longitude, latitude]
  },
  price: Number,
  description: String,
  location: String,                              // Human-readable location
  author: ObjectId → User,                      // Reference to User
  reviews: [ObjectId → Review]                  // Array of Review references
}
```

**Virtual property** — `thumbnail`: Returns a resized (200px wide) Cloudinary URL without storing it in the DB:
```javascript
imageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200');
});
```

**Virtual property** — `properties.popUpMarkup`: Returns HTML for the map popup (used in GeoJSON features).

**Mongoose middleware** — Auto-deletes associated reviews when a campground is deleted:
```javascript
campgroundSchema.post('findOneAndDelete', async function(doc) {
    if (doc) await Review.deleteMany({ _id: { $in: doc.reviews } });
});
```

### Review
```javascript
{
  body: String,
  rating: Number,   // 1-5
  author: ObjectId → User
}
```

### User
```javascript
{
  email: String,
  // username, hash, salt added automatically by passport-local-mongoose
}
```

---

## 🔒 Security Measures

| Threat | Protection |
|---|---|
| **XSS (Cross-Site Scripting)** | `sanitize-html` strips HTML tags from all user input via Joi validators |
| **NoSQL Injection** | `express-mongo-sanitize` removes `$` and `.` from request body/params |
| **Clickjacking** | Helmet sets `X-Frame-Options` header |
| **MIME Sniffing** | Helmet sets `X-Content-Type-Options: nosniff` |
| **Content Security Policy** | Helmet CSP whitelists only trusted domains for scripts, styles, images, connections |
| **Session Hijacking** | `httpOnly: true` cookies (not accessible via JS), `secure: true` in production |
| **CSRF (partial)** | Authenticated routes require active session |
| **Plaintext Passwords** | passport-local-mongoose uses pbkdf2 hashing with salt |

---

## 🖥️ Local Setup

### Prerequisites
- [Node.js](https://nodejs.org) v18+ installed
- [MongoDB](https://www.mongodb.com/try/download/community) running locally, **OR** a MongoDB Atlas account
- A [Cloudinary](https://cloudinary.com) account (free)
- A [MapTiler](https://www.maptiler.com) account (free)

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/YelpCamp.git
cd YelpCamp
```

**2. Install dependencies**
```bash
npm install
```

**3. Create your `.env` file** in the project root:
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
MAPTILER_API_KEY=your_maptiler_key
DB_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
SECRET=any_long_random_string_for_session_encryption
```

**4. Start the server**
```bash
node app.js
```

**5. Open your browser**
```
http://localhost:3000
```

---

## 🔑 Environment Variables

| Variable | Where to Get It | Description |
|---|---|---|
| `CLOUDINARY_CLOUD_NAME` | [cloudinary.com](https://cloudinary.com) Dashboard | Your Cloudinary cloud name |
| `CLOUDINARY_KEY` | Cloudinary Dashboard → API Keys | Your Cloudinary API key |
| `CLOUDINARY_SECRET` | Cloudinary Dashboard → API Keys | Your Cloudinary API secret |
| `MAPTILER_API_KEY` | [maptiler.com](https://maptiler.com) → Account → Keys | MapTiler API key for maps + geocoding |
| `DB_URL` | MongoDB Atlas → Connect → Drivers | MongoDB connection string |
| `SECRET` | Make your own | Random string used to encrypt sessions |
| `NODE_ENV` | Set to `production` on deployment | Controls dotenv loading and cookie security |

> ⚠️ **Never commit your `.env` file to GitHub.** It's already added to `.gitignore`.

---

## 🚄 Deployment on Railway

### Step 1 — Push to GitHub
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2 — Create Railway Project
1. Go to [railway.app](https://railway.app) → Login with GitHub
2. Click **New Project** → **Deploy from GitHub Repo**
3. Select your YelpCamp repository
4. Railway auto-detects Node.js and runs `npm start`

### Step 3 — Add Environment Variables
In Railway Dashboard → your service → **Variables** tab:
```
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_KEY=...
CLOUDINARY_SECRET=...
MAPTILER_API_KEY=...
DB_URL=...
SECRET=...
NODE_ENV=production
```

### Step 4 — Get Your Public URL
**Settings → Networking → Generate Domain**

Your app is live! 🎉

---

## 🐛 Common Issues & Fixes

### "querySrv ENOTFOUND" on startup
**Cause:** MongoDB Atlas cluster is paused or deleted (free tier pauses after 60 days of inactivity).  
**Fix:** Log in to [cloud.mongodb.com](https://cloud.mongodb.com), resume or recreate your cluster, update `DB_URL` in `.env`.

### Map not showing — "maptilersdk is not defined"
**Cause:** The MapTiler SDK script failed to load due to CORS error from `crossorigin="anonymous"` attribute.  
**Fix:** Remove `crossorigin="anonymous"` from the MapTiler `<script>` and `<link>` tags in `boilerplate.ejs`.

### Map not showing — CSP blocking tiles
**Cause:** Helmet's Content Security Policy blocks requests to MapTiler tile servers.  
**Fix:** Add `https://tiles.maptiler.com/`, `https://cdn.maptiler.com/` to `connectSrcUrls` and `imgSrc` in `app.js`.

### Images not uploading
**Cause:** Cloudinary credentials are wrong or expired.  
**Fix:** Verify `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_KEY`, `CLOUDINARY_SECRET` in `.env`.

### Login not persisting between requests
**Cause:** Sessions stored in memory (lost on restart) or `SESSION_SECRET` not set.  
**Fix:** Ensure `connect-mongo` is configured with `DB_URL` and `SECRET` is set in `.env`.

---

## 📚 What I Learned

Building YelpCamp taught me:

- **MVC Architecture** — Separating Models, Views, and Controllers for clean, maintainable code
- **RESTful Routing** — Designing consistent, predictable URL patterns for CRUD operations
- **Authentication vs Authorization** — Verifying *who* a user is vs. *what* they're allowed to do
- **Async/Await & Error Handling** — Managing asynchronous database calls and propagating errors correctly
- **Security Best Practices** — Input validation, sanitization, CSP headers, secure cookies
- **Third-party APIs** — Integrating Cloudinary (image storage) and MapTiler (geocoding + maps)
- **Database Relationships** — MongoDB references (`ObjectId`) vs embedding, and Mongoose `populate()`
- **Session Management** — How stateless HTTP uses sessions/cookies to maintain logged-in state
- **Deployment** — Environment variables, production configurations, cloud hosting

---

## 👨‍💻 Author

**Dhruvam**  
Built as the capstone project of [The Web Developer Bootcamp](https://www.udemy.com/course/the-web-developer-bootcamp/) by Colt Steele.

---

## 📄 License

This project is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

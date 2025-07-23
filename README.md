# YelpCamp



YelpCamp is a full-stack web application where users can create, view, and review campgrounds. This project is built using Node.js, Express, and MongoDB, and it allows users to share their favorite camping spots with others. It features user authentication, authorization, CRUD functionality, interactive maps, and geocoding.

## Live Demo

A live version of the application can be found here: **[YelpCamp](https://yelpcamp-dp44.onrender.com/)**

***

## Features

* **User Authentication:**
    * Users can sign up, log in, and log out securely.
    * Passwords are not stored in the database; instead, their salted and hashed representations are, thanks to `passport-local-mongoose`.
* **Authorization:**
    * Only logged-in users can create new campgrounds and post comments.
    * Users can only edit or delete the campgrounds and comments they have created.
* **Campground Management (CRUD):**
    * **Create:** Add new campgrounds with a name, image URL, description, and location.
    * **Read:** View a list of all campgrounds and see detailed information on a dedicated show page for each one.
    * **Update:** Edit the details of an existing campground.
    * **Delete:** Remove a campground from the application.
* **Interactive Maps & Geocoding:**
    *  Automatically converts user-provided location names into geographic coordinates (latitude and longitude) using the **Mapbox Geocoding API**.
    * Displays campground locations on an interactive **Mapbox** map on both the main index page and individual campground pages.
* **Comments and Reviews:**
    * Users can leave comments on individual campground pages.
    * Users can delete their own comments.
* **Responsive Design:**
    * The user interface is built with Bootstrap for a seamless experience on both desktop and mobile devices.
* **Flash Messages:**
    * Provides user feedback for actions like logging in/out, creating a new post, or encountering an error.

***

## Technologies Used

This project was built with the following technologies:

### Backend
* **Node.js:** JavaScript runtime environment.
* **Express.js:** Web framework for Node.js.
* **MongoDB:** NoSQL database for storing data.
* **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.

### Frontend
* **HTML5 & CSS3**
* **EJS (Embedded JavaScript):** Templating engine to create dynamic HTML pages.
* **Bootstrap:** CSS framework for responsive design.

### Mapping & Geocoding
* **Maptiler:** For displaying interactive cluster maps.
* **Maptiler SDK for JavaScript:** To integrate mapping and geocoding services.

### Authentication & Authorization
* **Passport.js:** Authentication middleware for Node.js.
    * `passport-local`: Strategy for authenticating with a username and password.
    * `passport-local-mongoose`: Mongoose plugin that simplifies building username and password login.

***
## License

This project is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

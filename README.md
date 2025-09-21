# 💻 MININTER: Audience

MININTER: Audience is a React, TypeScript, and Vite application designed to manage audiences with the Minister of the Interior. This app allows validated users to log in and new users to sign up. The application is still a work in progress, with ongoing improvements to the source code, new features, and updates.

-----

## ✨ Features

The MININTER: Audience app has several key features, including:

  * Managing user accounts.
  * Managing user requests for an audience.
  * Managing audiences.
  * Managing the minister's availability.
  * Email reporting for every state.
  * Report generation.

The app also incorporates features for better performance and user experience, such as:

  * Form handling with validation.
  * Lazy loading.
  * Data caching.
  * Clean code structure.

-----

## 🚧 Status

The application is still in progress for a better source code, new features, and updates.

-----

## Getting Started

### Prerequisites

* Node.js
* npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository_url>
    cd <repository_name>
    ```
2.  Install the required modules. Be sure to execute the following command for modules installation:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn
    ```

### Running the App

Run the application with the following command:
```bash
npm run dev
```

-----

## 🔒 User Roles

The application has two types of logged-in accounts: the user and the admin.

### User Space

The user's space includes a welcome page with a greeting personalized with their name. There is also a page to manage requests and audiences and a profile page to view registered information and change passwords.

The user space provides a personalized experience for citizens.

* **Welcome Page**: A greeting with the user's name is displayed upon login.

\<p align="center"\>
\<img src="https://www.google.com/search?q=https://example.com/user-space-dashboard-and-profile.png" alt="Screenshots of the user's welcome page and profile page." width="800"/\>
\</p\>

* **Profile Page**: A dedicated page where users can view their registered information and change their password.

* **Request and Audience Management**: Users can manage their requests and audiences, though some operations are restricted to maintain data integrity.


### Admin's Space

The admin space is designed for managing the application's data and operations.

* **Dashboard**: The welcome page for admins, which summarizes key statistics and data within the application.

* **Audience Management**: The admin has access to pages for managing audiences, from user account validation to audience organization.

-----

## 📧 Email Notifications

A well-designed email notification system is implemented to provide real-time updates for every state change.

<p align="center">
<img src="https://www.google.com/search?q=https://example.com/email-notification.png" alt="An example of an email notification." width="800"/>
</p>
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
  <h1><a href="href="https://backbone-challenge.netlify.app/"">Backbone challenge</a></h1>
  <p>by Willy Vasquez</p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#how-started">How I take the challenge</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About the app

The Backbone challenge is a web app where an use can manage contacts. 
The actions that can be perform in the app are:

- View all contacts
- Filter by email (**at least 3 character needed**)
- Create a new contact
- Edit an existing contact
- Delete an existing contact

**Some flows in the app was tested with Jest and React-Testing-Library**

### How I take the challenge

To understand all the requirements I made a google document to write all the technical and the functional requirements. Once I got the basics of the project, I started to learn about the `api` that I had to use, some notes I taked from the documentation and made my document more robust.

Here is the [Google document](https://docs.google.com/document/d/1PNtYtnI8BN02sw4LnjxcSxrQwIBfGm3Z0yFcWgV0-i4/edit?usp=sharing) if you wanna check it out.

With this document I got the knowdledge about how to create the interface for the project, so I decided to make it simple, simple pages with `back` navigation button, alerts given by `snackbars` and simple components but with a good looking for the user.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With
[Backbone Challenge App](https://backbone-challenge.netlify.app/)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). 

Integrated with the component library [Material UI](https://mui.com).

Tested with [Jest](https://jestjs.io/) and [React-Testing-Library](https://testing-library.com/).

Form validation with [React-Hook-Form](https://react-hook-form.com/)

App published with [Netlify](https://app.netlify.com/) 

- ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
- ![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
- ![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
- ![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
- ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
- ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

_Here are some steps and instructions to setting up your project locally. To get a local copy up and running follow these simple steps.-_


### Installation

* **Clone the repo**
   ```sh
   git clone https://github.com/Willyjvp/backbone-challenge
   ```
* **Install NPM packages**
   ```sh
   npm install
   ```
* **Start the app**
   ```sh
   npm start dev
   ```
   The app will start in `0.0.0.0:3000, url: http://localhost:3000`

* **Test the app**
   ```sh
   npm test
   ```
   Launches the test runner in the interactive watch mode.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

### Contact List Page 
#### /contacts
  - This page show the list of contacts, the list is ordered in desc form by ***created by***. By default shows 10 contacts per page but can be changed to 5 or 25. 
  
  - Display the ***First Name, Last Name and Email*** of each contact.

  - The minimum characters to filter ***by email*** are **3**.
  * An Alert will display if something went wrong

### View contact
#### /contacts/[id]

- This page only shows the information of a single contact.
    - First Name
    - Last Name
    - Phone
    - Email
* An Alert will display if something went wrong

### Create contact
#### /contacts/create

- This page create a single contact.
    - **First Name**: *required*
    - **Last Name**: *required*
    - **Phone**: *required, only number, max length 10*
    - **Email**: *required, valid email*
    
    
* The endpoint check if the phone or email is alredy taked
* An Alert will display if something went wrong

### Edit contact
#### /contacts/[id]/edit

- This page update a single contact. 
    - **First Name**: *required*
    - **Last Name**: *required*
    - **Phone**: *required, only number, max length 10*
    - **Email**: *required, valid email*

- If nothing was changed, the contact will not be modified
* The endpoint check if the phone or email is alredy taked
* An Alert will display if something went wrong

### Delete contact
#### /contacts/[id]/delete

- This page shows the information of a single contact.
    - First Name
    - Last Name
    - Phone
    - Email
* Click on ***Delete*** button to delete a contact
* An Alert will display if something went wrong

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact
Willy Vasquez - willy.vas.p@gmail.com
    
<p align="right">(<a href="#readme-top">back to top</a>)</p>

# Adogtion

**Adogtion** is a web app for dog adoption from Austrian shelters and associations. This application will allow users to favourite dogs, adopt dogs, as well as the possibility of supporting them with donations for food, bedding, toys or for vet health checks.
Shelters can edit their information, complete adoptions and add new dogs to the platform.

**Desktop version** : this web app is optimised to be used in resolutions with a width bigger than 1680px.

Deployed version on Heroku: https://adogtion.herokuapp.com/

## Technologies used

**Client:** Next.js, React, TypeScript, Styled Components, Jest

**Server:** Node.js, PostgreSQL

## Screenshots

### Landing page

<img src="./public/siteimages/homePageScreenshot.png" width="70%">

### Dogs overview for a logged in user

<img src="./public/siteimages/dogsOverviewScreenshot.png" width="70%">

### Individual dog description

<img src="./public/siteimages/individualDogScreenshot.png" width="70%">

## Setup guide

To run this project locally, the following steps are needed:

1. Clone this repo on your local machine and connect to your GitHub account

2. Download and install PostgreSQL (if not installed yet).

- https://www.postgresql.org/download/

3. Create a User and a Database for the project.

4. Create a copy of the `.env.example` and name it `.env` on the root of the project and modify it with your PostgreSQL credentials. The file should include these four environment variables:

- PGHOST=localhost
- PGDATABASE=\<YOUR_POSTGRES_DATABASE>
- PGUSERNAME=\<YOUR_POSTGRES_USERNAME>
- PGPASSWORD=\<YOUR_POSTGRES_PASSWORD>

5. Create a Cloudinary account and use the credentials for Image Uploads.

6. Add the next environment variables to your .env file

- BASE_URL=\<YOUR_API_URL>
- CSRF_SECRET=\<CRSF_SALT_KEY>

7. Install the dependencies

```bash
$ yarn
```

8. Install dotenv-cli globally with:

```bash
$ yarn global add dotenv-cli
```

9. In a terminal window start PostgreSQL

```bash
$ postgres
```

10. Run the migrations for your local database with:

```bash
$ yarn migrate up
```

11. Start the application with:

```bash
$ yarn dev
```

## Deployment instructions

The following instructions can be used to deploy the application online using Heroku:

1. Create a repository with your version of the app.
2. Sign up on Heroku: https://signup.heroku.com/ and create an account
3. Create a new App with your preferred name
4. Choose a name and select your region
5. On "deploxment method", go to "Connect to GitHub" and select your repository
6. Click on the "Enable Automatic Deploys" button
7. Go back to the Overview tab and click on "Configure Add-On". Search for "Postgres" and select "Heroku Postgres" from the results
8. TODO: ENV variables
9. Trigger the deployment by pushing into your github repository

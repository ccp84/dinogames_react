# React App for Dinosaur Games Library

## Concept

The Dinosaur Games Library operates to provide social events where members can come along and play library games with other members. The online library portal provides staff the ability to maintain an up to date list of the games available to be played at social nights, and keep members informed of the latest news and events for the group. Members are able to view and search the library, and review the games they have played providing a resource for other members and site visitors to look up new games they might want to play. All members and site visitors can also see the latest admin announcements for social events and news items about the library. 

This app will provide a user interface for members to create an online account, view the available library games and view details of social events that they may wish to participate in. It will also give admin users the facility to maintain stock details, highlight group announcements and details of upcoming events. Any site visitors will be able to find out information about the group before registering for membership.

## Scope

* It will allow site visitors to view the game library to search for a game to play
* It will allow site visitors to create an annount and become a registered member
* It will allow registered members to edit their account details
* It should allow registered members to leave a review of games they have played for others to see
* It should allow registered members to edit the details of reviews they have written
* It could allow registered members to leave a thumbs up or thumbs down rating for games that they have played
* It will allow staff members to add new games to the library
* It will allow staff members to edit the library game details
* It should allow staff members to post news and events announcements
* It should allow site visitors to view news and events announcements that have been posted
* It could allow registered members to make requests for new games to be added to the library
* It could allow staff members to post detailed social event invitations
* It could allow registered members to list the games they would like to be available to play at social events

Using MoSCoW prioritisation these functions have been prioritised as 'must have', 'should have', 'could have' and have been turned into user stories to create the [project board](https://github.com/users/ccp84/projects/5/views/1?reload=true). Any remaining features outside of this project's timeframe will be moved to 'won't have', and in production would become part of the next release or future features.

## Initial Wireframes

| View |                |
| ---- | -------------- |
| Mobile - Homepage| ![mobilehome](/Documentation/Wireframes/wireframe_mobile_home.png) |
| Tablet - Homepage| ![tablethome](/Documentation/Wireframes/wireframe_tablet_home.png) |
| Desktop - Homepage| ![desktophome](/Documentation/Wireframes/wireframe_desktop_home.png) |
| Mobile - Profilepage| ![mobileprofile](/Documentation/Wireframes/wireframe_mobile_profile_view.png) |
| Tablet - Profilepage| ![tabletprofile](/Documentation/Wireframes/wireframe_tablet_profile_view.png) |
| Desktop - Profilepage| ![desktopprofile](/Documentation/Wireframes/wireframe_desktop_profile_view.png) |
| Mobile - Gamepage| ![mobilegames](/Documentation/Wireframes/wireframe_mobile_game_detail.png) |
| Tablet - Gamepage| ![tabletgames](/Documentation/Wireframes/wireframe_tablet_game_detail.png) |
| Desktop - Gamepage| ![desktopgames](/Documentation/Wireframes/wireframe_desktop_game_detail.png) |
| Mobile - News| ![mobilenews](/Documentation/Wireframes/wireframe_mobile_news_detail.png) |
| Tablet - News| ![tabletnews](/Documentation/Wireframes/wireframe_tablet_news_detail.png) |
| Desktop - News| ![desktopnews](/Documentation/Wireframes/wireframe_desktop_news_detail.png) |
| Mobile - Social| ![mobilesocial](/Documentation/Wireframes/wireframe_mobile_social_detail.png) |
| Tablet - Social| ![tabletsocial](/Documentation/Wireframes/wireframe_tablet_social_detail.png) |
| Desktop - Social| ![desktopsocial](/Documentation/Wireframes/wireframe_desktop_social_detail.png) |

### Design Considerations

| Colourscheme |        |
| ------------ | ------ |
| The logo for my local games group and inspiration for this project, Eight Sixes contains blue/orange/black so these are the main colours I will be using. | ![Eight Sixes Logo](/Documentation/eightsixes.png) |

## Project Development

## Milestone 1 - User Accounts

| Tasks this sprint | Overview |
| ------------------| -------- |
| * Create sign up form * Create sign in form that can retrieve access token and refresh token. * Front end logout button that clears stored credentials preventing further usage. * Store current user credentials. * Handle refreshing of tokens | ![sprint1](/Documentation/sprint1.png) |

| User Stories This Milestone | Frontend Acceptance Criteria |
| --------------------------- | ---------------------------- |
| As a visitor to the site I want to be able to create an account so that I can access the full membership features | Front end account creation form links to API endpoint and creates a user account |
| As a member I want to be able to log into my account so that I can access the full features of the library. | Front end login form can access login end point to retrieve access token and refresh token |
| As a member I want to be able to log out of my account to keep my data secure. | Front end form clears stored tokens preventing further usage |

### Connection to the API

API requests and reponses are handled by Axios. To avoid repetition, an [instance](https://axios-http.com/docs/instance) with the base configuration was created to be used in all API calls. When connection is made to the API, Axios attaches any relevant access or refresh tokens in its request header which the endpoint uses to evaluate if access can be granted.
The returned status code can be used to determine if the request was a success, or if an error occurred and either the data sent needs to be corrected or authentication credentials need to be supplied. 

### Account Registration



### Sign In



### Current User Context

The currently logged in user is held in `CurrentUserContext`. For this I have followed the instructions from the Code Institute Moments Walkthrough project as this is robust and works without error. 
Context is used in place of maintaining the Current User details in state in each different page and having to pass those details from one page to the next via props. These variables are exported and available to import from anywhere within the app. 

The current user context also handles refreshing authentication when the access token has expired, via the refresh token. A call is made to the user endpoint with the current token, if a 401 unauthorised error is returned then [Axios Interceptors](https://axios-http.com/docs/interceptors) are used to try and refresh the authentication between the app and API. On success, the access token is refreshed and authentication is maintained. The logged in member sees no degredation of service. On failure, both the access and refresh tokens are rejected and the user is redirected to sign in. 

### Logging Out

Logging out is a function that sits within the header component. It very simply sends an axios request to the logout endpoint. This clears both the access and refresh tokens. On success it then resets the current user context to null:

|                                                | Screenshot |
| ---------------------------------------------- | ---------- |
| Cookies appear in request headers before logout| ![logoutbefore](/Documentation/logout-before.png) |
| Logout request sets tokens to empty strings    | ![logoutduring](/Documentation/logout-setcookie.png) |
| After logout, refresh fails, tokens are not present in the request header | ![logoutafter](/Documentation/logout-after.png) |

### Profile Details

profile icons - https://fontawesome.com/docs/web/use-with/react/add-icons#add-icons-globally

## Milestone 2 - Games Library

| Tasks this sprint | Overview |
| ------------------| -------- |
| * Create admin only page . * Add game creation form. * Add edit game form. * Button to delete games. * Design  to display latest 5 games on the home page. | ![sprint2](/Documentation/sprint2.png) |

| User Stories This Milestone | Frontend Acceptance Criteria |
| --------------------------- | ---------------------------- |
| As a member of staff I want to be able to add games to the library so that site visitors can see what games are available to play | Front end form sends data to the create game endpoint successfully, Created games are listed in the games library |
| As a member of staff I want to be able to edit listed games so that the details are always accurate and up to date. | Edit form is available when logged in as a member of staff |
| As a member of staff I want to be able to delete a game from the library so that any old games no longer available are removed from the list | Delete button is available when logged in as an admin user, Game instance is successfully deleted from the library |
| As a member I want to be able to see all of the games available in the library so that I can read the reviews and look for games I might like | Front end library page displays all available games |
| As a member I want to be able to search the library by game feature so that I can pick out the games most suited to my interests | Front end library page has a keyword search feature, Front end library can be filtered |

### Viewing the games library

The full games library has 2 views which can be viewed by all visitors to the site. From the homepage, the latest 5 games are displayed in the center component and from the Library page the full list of games is displayed. 

The `GamesList` component handles returning data from the API, this is called using React Query accessing the `/games` endpoint. Wether the latest or full list is then displayed depends on the keyword passed in via props from the parent component, if `props.list === 'latest'` is truthy then the latest games list is displayed otherwise the full list will be shown. As seen below, the games data returned from the API is then passed to the relevant component for display. 


### Game details page



### Creating a game listing



### Editing games

Community members are able to help maintain the library by making edits to the game listings from the game details page. The details to be edited are passed via the [location object in React Router](https://reactrouter.com/en/main/hooks/use-location) 

These state variables pre populate the form available to edit the details of the game, and the updated values are then returned to the API along with authorisation headers via Axios, using the `axiosReq` instance to ensure a valid token is in place before data is sent. The game to be updated is matched by including the id from the location object, authorisation to edit this particular instance by the currently logged in user is handled by the authorisation token sent in the JWT header with the request.


### Deleting games as an administrator

Game owners are able to delete games from their list, this action is handled by the delete button's `onClick` attribute.
The axios instance uses the request interceptor to first ensure a valid access token. The game id is then used to identify which item in the Game table is being targeted. Authority to access the delete endpoint is handled by sending the JWT in the request header. 
On success, `refetch` is called which is part of the [useQuery](https://tanstack.com/query/latest/docs/react/reference/useQuery) hook, this handles refreshing the cached query data displayed in the games list and the deleted game is no longer displayed. 

### Filtering and searching the games library

https://tanstack.com/query/latest/docs/react/guides/query-keys

## Milestone 3 - Player Reviews

| Tasks this sprint | Overview |
| ------------------| -------- |
| * Library members can create reviews for games. * Review owners can edit and delete their reviews. * Members can see a list of reviews they have written. * All visitors can read reviews for any game in the library | ![sprint3](/Documentation/sprint3.png) |

| User Stories This Milestone | Frontend Acceptance Criteria |
| --------------------------- | ---------------------------- |
| As a library member I want to be able to review games that I have played so that other members can find out if they might want to play that game | Review form available when logged in as a member, Review is sent to the API and saved |
| As a library member I want to be able to edit the reviews I have left so that I can change any errors or update my opinion at a later date | Edit form is accessible only to logged in member, Data is successfully updated |
| As a library member I want to be able to delete reviews that I have made so that I can start again if there are too many edits to make or remove opinions I no longer hold. | Delete button accessible on front end from reviews written by member |
| As a member I want to be able to see a list of reviews that I have written so that I can remember what I have already reviewed and check they are still relevant | A list of reviews is returned only for the logged in user under the user profile page |
| As a site visitor I want to be able to read reviews of games by people that have already played them so that I can decide if I might want to play that game | Front end displays reviews filtered by game on the correct game listing |

### Viewing reviews for a game

### Creating a review as a member

### Viewing reviews for a member

### Editing and deleting reviews

## Milestone 4 - Admin Announcements

| Tasks this sprint | Overview |
| ------------------| -------- |
| *  | ![sprint4](/Documentation/sprint4.png) |

| User Stories This Milestone | Frontend Acceptance Criteria |
| --------------------------- | ---------------------------- |
| As an admin user I want to create announcements so that I can update site visitors about events happening in the library | Announcements section is available in the admin area of the front end, Create announcement form submits new items to the API |
| As an admin user I want to be able to edit existing announcements so that they will always be up to date if the details change | Front end edit form accessible from admin page of React site, Edits are successfully saved |
| As an admin user I want to be able to delete announcements so that events and updates that are no longer relevant can be removed | Delete button available in admin area of React site, Instances are removed from the database when delete sent from front end |
| As a visitor to the site I want to be able to read all of the latest announcements so that I can find out about events that are happening in the library | Announcements are listed in reverse chronological order, The 5 latest announcements are displayed on the landing page of the React site, All announcements are displayed with all details on the news stories page |


## Milestone 5 - Member Ratings

| Tasks this sprint | Overview |
| ------------------| -------- |
| * | ![sprint5](/Documentation/sprint5.png) |

| User Stories This Milestone | Frontend Acceptance Criteria |
| --------------------------- | ---------------------------- |
| As a member I want to be able to add a thumbs up or thumbs down rating so that other users can see if they might want to play the game. | Buttons available to all authenticated members to add thumbs up and thumbs down instances from React frontend |
| As a user I want to be able to edit the rating I have left so that I can update my opinion if I change my mind. | Buttons on the front end change the rating from thumbs up to thumbs down |
| As a member I want to see the games I have rated so that I can pick out games I have already played and enjoyed to play again. | A list of ratings made by the member is visible on the profile page |
| As a site visitor I want to be able to see ratings left by other people so that I know if I might want to play that game or not. | Numbers of thumbs up and thumbs down per game displayed in the games library frontend |

## Testing

Link to the [TESTING.md](TESTING.md) file.

## Deployment

The live deployed application can be found deployed on [Heroku](https://dinogames-react.herokuapp.com/).

### Heroku Deployment

This project uses [Heroku](https://www.heroku.com), a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.

Deployment steps are as follows, after account setup:

- Select **New** in the top-right corner of your Heroku Dashboard, and select **Create new app** from the dropdown menu.
- Your app name must be unique, and then choose a region closest to you (EU or USA), and finally, select **Create App**.

For Heroku deployment, follow these steps to connect your own GitHub repository to the newly created app:

Either:
- Select **Automatic Deployment** from the Heroku app.

Or:
- In the Terminal/CLI, connect to Heroku using this command: `heroku login -i`
- Set the remote for Heroku: `heroku git:remote -a app_name` (replace *app_name* with your app name)
- After performing the standard Git `add`, `commit`, and `push` to GitHub, you can now type:
	- `git push heroku main`

The project should now be connected and deployed to Heroku!

### Local Deployment

This project can be cloned or forked in order to make a local copy on your own system.

For either method, you can install this project's **dependencies** (where applicable) using:
- `npm install`

Once the project is cloned or forked, in order to run it locally, you'll need to follow these steps:
- Start the React app: `npm start`
- Stop the app once it's loaded: `CTRL+C` or `⌘+C` (Mac)

#### Cloning

You can clone the repository by following these steps:

1. Go to the [GitHub repository](https://github.com/ccp84/dinogames_react) 
2. Locate the Code button above the list of files and click it 
3. Select if you prefer to clone using HTTPS, SSH, or GitHub CLI and click the copy button to copy the URL to your clipboard
4. Open Git Bash or Terminal
5. Change the current working directory to the one where you want the cloned directory
6. In your IDE Terminal, type the following command to clone my repository:
	- `git clone https://github.com/ccp84/dinogames_react.git`
7. Press Enter to create your local clone.

Alternatively, if using Gitpod, you can click below to create your own workspace using this repository.

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/ccp84/dinogames_react)

Please note that in order to directly open the project in Gitpod, you need to have the browser extension installed.
A tutorial on how to do that can be found [here](https://www.gitpod.io/docs/configure/user-settings/browser-extension).

#### Forking

By forking the GitHub Repository, we make a copy of the original repository on our GitHub account to view and/or make changes without affecting the original owner's repository.
You can fork this repository by using the following steps:

1. Log in to GitHub and locate the [GitHub Repository](https://github.com/ccp84/dinogames_react)
2. At the top of the Repository (not top of page) just above the "Settings" Button on the menu, locate the "Fork" Button.
3. Once clicked, you should now have a copy of the original repository in your own GitHub account!

## Technologies Used

This project is built using the following languages and frameworks:
* HTML
* CSS
* JavaScript
* React

I have used tools to assist me as a developer:
* Git - Version control and project flow management
* [GitHub](https://github.com/) - Cloud hosting of project files
* [Heroku](https://www.heroku.com/home) - Cloud hosting of deployed project
* Balsamiq - Used to create wireframes
* paint.net - Used for image manipulation
* [Font Awesome](https://fontawesome.com/) - Icons used throughout the project

## Credits

## Tools Used
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
[React Bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction)
[React Router](https://reactrouter.com/en/main/start/tutorial)
[Axios](https://axios-http.com/docs/intro)
[reactQuery from Tanstack](https://tanstack.com/query/latest/docs/react/reference/useQuery)
Prettier: `npm install -D prettier`
eslint:
```
npm install -D eslint eslint-config-prettier
npm install -D eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
npm install -D eslint-plugin-react-hooks
```


## Credits

### Documentation and additional tutorials
* For setting up routing as I have used the latest version of React and React Router, I followed the tutorial available in the documentation [here](https://reactrouter.com/en/main/start/tutorial)

### Code from other sources

### Media and images

* Site logo and favicon from [istock photo](https://www.istockphoto.com/vector/house-dice-icon-flat-gm1483672185-510210038)

### Honourable mentions




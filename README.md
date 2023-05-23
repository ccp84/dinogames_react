# React App for Dinosaur Games Library

## Concept

As a boardgame enthusiast, it can be hard to decide which game to try next. The Dinosaur Games Library will be a resource for the tabletop games community to add games that they have played and enjoyed to share their views with other gamers. Registered members will be able to post new games that they have found with details and reviews, visitors to the site will be able to view the library to find recommendations for games that they might enjoy playing. Administrators of the site will be able to delete any games from the listings that become out of print or are found to be duplicates.
In addition to the games listings, announcements could also be made by the admin team detailing social events for gaming meet ups and news for the tabletop gaming community. 

## Scope

This app will provide a user interface for members to create an online account, manage their game list, view the wider group "social library" and view details of social events that they may wish to participate in. It will also give admin users the facility to highlight group announcements and details of upcoming events. Any site visitors will be able to find out information about the group before registering for membership.

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
| The logo for our games group Eight Sixes contains blue/orange/black so these are the main colours I will be using for the project | ![Eight Sixes Logo](/Documentation/eightsixes.png) |

## Project Development

## Milestone 1 - User Accounts

| Tasks this sprint | Overview |
| ------------------| -------- |
| * Front end account creation form links to API endpoint and creates a user account. * Front end login form can access login end point to retrieve access token and refresh token. * Front end form clears stored credentials preventing further usage. | ![sprint1](/Documentation/sprint1.png) |

### Account Registration

The form for creating a new account is accessible to all site visitors and requires no authentication. 
Required inputs are handled by state which is initially set to empty strings, these variables are linked to the relevant form fields `value` which is monitored and updated by the `onChange` attribute.
```javascript
value={username}
onChange={handleChange}
```
`handleChange` is a function that then takes in the event and updates the state based on the value linked to the event handler. 
```javascript
	const handleChange = (event) => {
		setSignupData({
			...signupData,
			[event.target.name]: event.target.value,
		});
	};
```
Once the site visitor has entered the details into the form, data processing is handled by the `onSubmit` attribute and passed to `handleSubmit`.
```javascript
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post("dj-rest-auth/registration/", signupData);
			console.log(response.data.user);
			navigate("/signin");
		} catch (err) {
			setErrors(err.response?.data);
			console.log(errors);
		}
	};
```
This function needs a connection to the registration API endpoint, and sends via POST the data held in state for processing. The response is either successful which triggers a `useNavigate` redirection to the Sign In page, or if errors are returned these are displayed to the visitor on the page by mapping over the returned error object. 
```javascript
{errors.email?.map((message, idx) => (
	<Alert variant="warning" key={idx}>
		{message}
	</Alert>
))}
``` 

### Connection to the API

API requests and reponses are handled by Axios. To avoid repetition, an [instance](https://axios-http.com/docs/instance) with the base configuration was created to be used in all API calls. When connection is made to the API, Axios attaches any relevant access or refresh tokens in its request header which the endpoint uses to evaluate if access can be granted.
The returned status code can be used to determine if the request was a success, or if an error occurred and either the data sent needs to be corrected or authentication credentials need to be supplied. 

### Sign In

The Sign In page is accesible to all site visitors as it is the authentication point to access further areas of the site. 
Sign in data is held by state variables initialised to empty strings and set to the `value` attribute of the relevant form field. Changes to these variables are handled by the `onChange` attribute of the field, the `handleChange` function takes in the event and assigns the value of the variable to the state variable of the same name. Spreading the existing state data into the function preserves any changes already made. 
```javascript
	const handleChange = (event) => {
		setSigninData({
			...signinData,
			[event.target.name]: event.target.value,
		});
	};
```
Once the log in button is pressed, the forms `onSubmit` attribute links to the `handleSubmit` function
```javascript
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const { data } = await axios.post("dj-rest-auth/login/", signinData);
			console.log(data.user);
			setCurrentUser(data.user);
			navigate("/profile");
		} catch (err) {
			setErrors(err.response?.data);
			console.log(errors.data);
		}
	};
```
This function sends the collected variables to the login endpoint. If verified, the following json object is returned
```
{
    "access": 
    "refresh": 
    "user": {
        "id": 
        "username":
        "email": 
        "firstname": 
        "lastname":
        "profilepic": 
		"is_staff":
    }
}
```
The tokens are stored as cookies and then used to maintain an authenticated state with the API for 24 hours or until the member logs out, whichever comes first. The user object is then set in in context as the `currentUser`. Context can be imported into any component that needs it, rather than passing these details across functions as props. 
Errors are handled as their own state, and reported back to the site visitor by mapping through the returned object and displaying the error message.
```javascript
{errors.username?.map((message, idx) => (
					<Alert key={idx} variant="warning">
						{message}
					</Alert>
				))}
```

### Current User Context

The currently logged in user is held in `CurrentUserContext`. For this I have followed the instructions from the Code Institute Moments Walkthrough project as this is robust and works without error. 
Context is used in place of maintaining the Current User details in state in each different page and having to pass those details from one page to the next via props. These variables are exported and available to import from anywhere within the app. 
```javascript
export const currentUserContext = createContext();
export const setCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(currentUserContext);
export const useSetCurrentUser = () => useContext(setCurrentUserContext);
```
The current user context also handles refreshing authentication when the access token has expired, via the refresh token. A call is made to the user endpoint with the current token, if a 401 unauthorised error is returned then [Axios Interceptors](https://axios-http.com/docs/interceptors) are used to try and refresh the authentication between the app and API. 
```javascript
if (err.response?.status === 401) {
					try {
						await axios.post("/dj-rest-auth/token/refresh/");
					} catch (err) {
						setCurrentUser((prevCurrentUser) => {
							if (prevCurrentUser) {
								console.log("redirecting");
								navigate("/signin");
```
On success, the access token is refreshed and authentication is maintained. The logged in member sees no degredation of service. On failure, both the access and refresh tokens are rejected and the user is redirected to sign in. 

### Logging Out

Logging out is a function that sits within the header component. It very simply sends an axios request to the logout endpoint. This clears both the access and refresh tokens. On success it then resets the current user context to null. I have used the latest install of dj-rest-auth in the DRF code which appears to log out bug free:

|                                                | Screenshot |
| ---------------------------------------------- | ---------- |
| Cookies appear in request headers before logout| ![logoutbefore](/Documentation/logout-before.png) |
| Logout request sets tokens to empty strings    | ![logoutduring](/Documentation/logout-setcookie.png) |
| After logout, refresh fails, tokens are not present in the request header | ![logoutafter](/Documentation/logout-after.png) |

### Profile Details

## Milestone 2 - Games Library

| Tasks this sprint | Overview |
| ------------------| -------- |
| * Game listing form creates a new game. * Members can make edits to the games library. * Admin users can delete games from the library. * Visitors can view the whole games library. * Visitors can search and filter the games library. | ![sprint2](/Documentation/sprint2.png) |

### Viewing the games library

The full games library has 2 views which can be viewed by all visitors to the site. From the homepage, the latest 5 games are displayed in the center component and from the Library page the full list of games is displayed. 

The `GamesList` component handles returning data from the API, this is called using React Query accessing the `/games` endpoint. Wether the latest or full list is then displayed depends on the keyword passed in via props from the parent component, if `props.list === 'latest'` is truthy then the latest games list is displayed otherwise the full list will be shown. As seen below, the games data returned from the API is then passed to the relevant component for display. 
```javascript
  return (
    <>{latest ? <LatestGames games={games} /> : <AllGames games={games} />}</>
  );
```

### Game details page



### Creating a game listing

To create a new game listing members must be logged in, this is handled by tokens in the authentication header. The axios POST for this component makes use of the `axiosReq` interceptor instance to ensure that a valid access token is available before the listing is sent. 
Required fields and data types in the html form provide validation before the submit button can be pressed, for example a letter can't be entered in the number field, and error handling is also included in the try catch block. 
On success, the member is redirected to the detailed page for that Game instance.

### Editing games

Community members are able to help maintain the library by making edits to the game listings from the game details page. The details to be edited are passed via the [location object in React Router](https://reactrouter.com/en/main/hooks/use-location) 
```javascript
const location = useLocation();

  const [gameData, setGameData] = useState({
    id: location.state.prop.id,
    title: location.state.prop.title,
    tags: location.state.prop.tags,
    minplayers: location.state.prop.minplayers,
    maxplayers: location.state.prop.maxplayers,
    playtime: location.state.prop.playtime,
  });
```
These state variables pre populate the form available to edit the details of the game, and the updated values are then returned to the API along with authorisation headers via Axios, using the `axiosReq` instance to ensure a valid token is in place before data is sent. The game to be updated is matched by including the id from the location object, authorisation to edit this particular instance by the currently logged in user is handled by the authorisation token sent in the JWT header with the request.
```javascript
const { data } = await axiosReq.put(
        `games/owner/${gameData.id}`,
        gameData
      );
```

### Deleting games as an administrator

Game owners are able to delete games from their list, this action is handled by the delete button's `onClick` attribute:
```javascript
<Button
    variant="info"
    onClick={async () => {
    	try {
        	await axiosReq.delete(`/games/owner/${game.id}`);
        	// useQuery refetch will refresh the list on success
        	refetch();
        } catch (err) {
        	console.log(err);
        }
        }}
    >
    Delete
</Button>
```
The axios instance uses the request interceptor to first ensure a valid access token. The game id is then used to identify which item in the Game table is being targeted. Authority to access the delete endpoint is handled by sending the JWT in the request header. 
On success, `refetch` is called which is part of the [useQuery](https://tanstack.com/query/latest/docs/react/reference/useQuery) hook, this handles refreshing the cached query data displayed in the games list and the deleted game is no longer displayed. 

### Filtering and searching the games library

## Tools Used
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
* Default profile picture from [istock photo](https://www.istockphoto.com/vector/d20-dice-role-playing-game-icon-gm1271436830-374022511)
* Site logo and favicon from [istock photo](https://www.istockphoto.com/vector/house-dice-icon-flat-gm1483672185-510210038)

### Honourable mentions




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

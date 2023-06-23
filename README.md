# React App for Dinosaur Games Library

![responsive](/Documentation/responsive.png)

## Concept

The Dinosaur Games Library operates to provide social events where members can come along and play library games with other members. The online library portal provides staff the ability to maintain an up to date list of the games available to be played at social nights, and keep members informed of the latest news and events for the group. Members are able to view and search the library, and review the games they have played providing a resource for other members and site visitors to look up new games they might want to play. All members and site visitors can also see the latest admin announcements for social events and news items about the library. 

This app will provide a user interface for members to create an online account, view the available library games and view details of social events that they may wish to participate in. It will also give admin users the facility to maintain stock details, highlight group announcements and details of upcoming events. Any site visitors will be able to find out information about the group before registering for membership. For the backend API repositiory please see [here](https://github.com/ccp84/dinogames_api).

The live deployed site can be viewed [here](https://dinogames-react.herokuapp.com/)

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

Using MoSCoW prioritisation these functions have been prioritised as 'must have', 'should have', 'could have' and have been turned into user stories to create the [project board](https://github.com/users/ccp84/projects/5/views/1). 

Estimated story points have been added to each User Story and Task as [Xsp] to aid time considerations in each sprint.

Any remaining features outside of this project's timeframe will be moved to 'won't have', and in production would become part of the next release or future features.

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

### Features developed this sprint

#### Connection to the API

Communication requests between the frontend React app and backend API are handled by Axios. This is a useful library as it can automatically handle form data to be sent to the API which will make up a number of the requests used within this project, as well as requests already in JSON format. Axios automatically handles the returned JSON data from the API so that it can then be read by the React front end application for display to the end user. To avoid repetition and having to add the full API call every time a request is made, an [instance](https://axios-http.com/docs/instance) with the base configuration was created to be used for each Axios request.
* After reading the Axios Instance documentation, my Axios defaults component was based on the example given in the CI Moments walkthrough.
 

#### Current User Context

The currently logged in user is held in `CurrentUserContext`. For this I have followed the instructions from the Code Institute Moments Walkthrough project as this is robust and works without error. 
Context is used to keep track of details that are relevant to the application universally rather than trying to pass these details from one component to the next via props, params or location variables. A custom hook is exported by the context and available to use anywhere within the application.

The current user context also handles refreshing authentication when the access token has expired, via the refresh token. A call is made to the user endpoint with the current token, if a 401 unauthorised error is returned then [Axios Interceptors](https://axios-http.com/docs/interceptors) are used to try and refresh the authentication between the app and API. On success, the access token is refreshed and authentication is maintained. The logged in member sees no degredation of service. On failure, both the access and refresh tokens are rejected and the user is redirected to sign in. 

#### Logging Out

Logging out is a function that sits within the header component. It very simply sends an axios request to the logout endpoint. This clears both the access and refresh tokens. On success it then resets the current user context to null:

|                                                | Screenshot |
| ---------------------------------------------- | ---------- |
| Cookies appear in request headers before logout| ![logoutbefore](/Documentation/logout-before.png) |
| Logout request sets tokens to empty strings    | ![logoutduring](/Documentation/logout-setcookie.png) |
| After logout, refresh fails, tokens are not present in the request header | ![logoutafter](/Documentation/logout-after.png) |

### Pages linked to this milestone

#### Sign up form

The sign up form allows visitors to create a new account. It sends the collected form data across to /dj-rest-auth/registration and if the request is successful redirects to sign in. Data validation is handled by using the correct field tyes, and adding a `required` lable to all fields that are mandatory for account creation. Any errors specific to the fields are displayed below the relevant text box or drop down.
![signup_form_validation](/Documentation/signup_form_validation.png)
If the account is successfully created, the user is notified by a success message on screen.
![signup_form_success](/Documentation/signup_form_success.png)

#### Sign in form

The sign in form has similar field validation to the sign up form although only requires a username and password to be input. It provides an authentication point into the library for any features that need extra credentials. It sends the username and password across to /dj-rest-auth/login and waits for a response containing the access and refresh tokens. This action also returns an object contaning the user details to update the current user context. 
![signin_form_returned](/Documentation/signin_form_returned.png)
The user is notified of a successful login by an onscreen message and redirected to their profile page.
![signin_form_success](/Documentation/signin_form_success.png)

#### Profile page

The profile page is the main container for details about the logged in member. Inside of this container pages for their account details, reviews they have left and games they have rated are returned. Each element is kept separate so that API calls are independent of one another, if one has an error then the remainder of the page will display correctly as long as the main API connection is still functioning. Data that is returned faster can also be displayed to the user as soon as it is returned rather than waiting for all of the requests to load before beginning to display the page. The user details, reviews and ratings pages can also function outside of the profile page as a page in their own right or be returned inside another container and reused to display this data elsewhere within the app instead of writing a separate file for this functionality. Similarly, should the API be updated or changed in the future, only one part of the front end need be rewritten. For example if the ratings were changed from thumbs up to a stars system it would not affect the rest of the profile page being returned and only a small amount of code needs to be updated. That panel could even be removed from the code temporarily while the update takes place and the rest of the app would continue to function as normal as if it were still there or never there in the first place.

#### User details

This page sits inside the profile page container. It displays the returned user object containing the current account information for the logged in member, also acts as container for the user edit form which has been separated into a self contained page for reusability. 
![user_details_object](/Documentation/user_details_object.png)

#### User edit

The user edit page sits inside the footer of the user details page and handles updating account details of the logged in user. It recieves the current values via props passed from user details which are stored in state and used to prepopulate the update form. Form validation is handled by field type and the required flag so that the form cannot be submitted with invalid types or blank data. Errors on the fields retured from the API are displayed beneath each form field in necessary. 
* I have used the TanStack Query library to handle updates sent to the API in the form of a [mutation](https://tanstack.com/query/v4/docs/react/guides/mutations). I have chosen to use Tanstack Query as it is a dedicated React tool for data fetching that handles loading and error states gracefully. I particuarly wanted to use the function for invalidating and refetching data on mutation which is done via the query key linked to each query you make. When data has been mutated, on success the query client can invalidate already fetched data that is linked with any key and refetch those queries. The `isLoading` and `isError` states of Tanstack Query have allowed me to write code in a more logcal way to customise the user experience for those events.

To make the page view cleaner the edit form is hidden by default and displayed at the click of a button, this is handled by a flag held in state. On success a message is sent to the screen, however in order to overcome an issue where the profile icon was not updated I have also included a window refresh which over writes the success message. This is something that I would have handled better if I had more time. 
![user_edit_form](/Documentation/user_edit_form.png)

### Components added this sprint

#### Icon Components

In order to neatly and consistently display profile icons, and any other icons in the project, I created icon container components that take in the last part of the Fontawesome icon name as well as the colour it should be and return the rest of the code to display any icon in the library. 

I followed the instructions from Fontawesome [here](https://fontawesome.com/docs/web/use-with/react/add-icons#add-icons-globally) for building a library at the top level of my application where I import all icons used in the project. I then created components for regular and solid icons to make reusing code more efficient throughout the application, all of the code to display an icon is written within the respective component and then when an icon is needed to be displayed, all thats needed is the component with a single word prop for the icon name and a prop for the colour rather than multiple lines of code each time. As I have used icons rather than profile pictures for a more "gamey" feel, this way of displaying them cleaned up a lot of lines of repetitive code. 

In terms of specifically displaying and updating profile icons, the use of these components means that the single variable needed to display each option for a profile icon can be easily stored in a database and when retrieved it is simply plugged in as a prop to the component to output the correct profile icon throughout the application. 
![profile_icon](/Documentation/profile_icon.png)

 #### Header Component

 The header component holds the navigation links and logged in status which remain consistent throughout all parts of the appliction. I added the logout button as described above to this component, as well as an element that checks the current user context and returns either their username and profile icon or if no user is logged in then an icon indicating that there is no current user. Rather than adding navigation to each page, this component is included at the top level of the application and sits above the main app container where all other pages will then be displayed. 
 ![user_display](/Documentation/user_display.png)
 ![loggedout](/Documentation/loggedout_display.png)

## Milestone 2 - Games Library

| Tasks this sprint | Overview |
| ------------------| -------- |
| * Create admin only page . * Add game creation form. * Add edit game form. * Button to delete games. * Design page to display latest 5 games on the home page. * Create a home page * Design full library display page. * Design page for returning individual game details. * Add search and sort to main library page | ![sprint2](/Documentation/sprint2.png) |

| User Stories This Milestone | Frontend Acceptance Criteria |
| --------------------------- | ---------------------------- |
| As a member of staff I want to be able to add games to the library so that site visitors can see what games are available to play | Front end form sends data to the create game endpoint successfully, Created games are listed in the games library |
| As a member of staff I want to be able to edit listed games so that the details are always accurate and up to date. | Edit form is available when logged in as a member of staff |
| As a member of staff I want to be able to delete a game from the library so that any old games no longer available are removed from the list | Delete button is available when logged in as an admin user, Game instance is successfully deleted from the library |
| As a member I want to be able to see all of the games available in the library so that I can read the reviews and look for games I might like | Front end library page displays all available games |
| As a member I want to be able to search the library by game feature so that I can pick out the games most suited to my interests | Front end library page has a keyword search feature, Front end library can be sorted |

### Features developed this sprint

#### Deleting games as an administrator

Staff members are able to delete games from the library from a delete button located either in the header of the game details page or from the games admin page .
The axios instance uses the request interceptor to first ensure a valid access token. The game id is then used to identify which item in the Game table is being targeted. Authority to access the delete endpoint is handled by sending the JWT in the request header. 
On success, `refetch` is called which is part of the [useQuery](https://tanstack.com/query/latest/docs/react/reference/useQuery) hook, this handles refreshing the cached query data displayed in the games list and the deleted game is no longer displayed.
![game_delete_refetch](/Documentation/game_delete_refetch.png)

#### Search bar

The search feature sits within the main Library page container. It uses state to monitor what a user has typed in to search for and updates the string passed to the request URL accordingly. 

#### Sort dropdown

Filtering the returned library of games is linked to a pre written drop down list which matches the available sort options in the API. When a user selects a dropdown option, the query URL is updated to match the sort string and the games are then displayed in the requested order. 

![library_search_sort](/Documentation/library_search_sort.png)

### Pages linked to this milestone

#### The library page

The library page is the main container for returning the full list of games. It has search and sort features at the top of the page and the page to return a full list from the API is displayed underneath. This modularity means that future improvements to searching and sorting can be made without major changes to the code returing the list of games. 

#### All games

All games handles displaying the full list of games and plugs into the main library page. As it has been designed to be self contained, it could be used as a stand alone page or included elsewhere within the application with ease to return the same set of results within a different area without having to duplicate the code. 
To separate fetching and displaying of data, the list of games is passed in via props from the GameList component which handles fetching games from the API. A check is made that this list is not empty in which case a message is displayed to the user that no games have been found,
![empty_list](/Documentation/games_empty_list.png)
otherwise the games are displayed using a layout container component to format the returned results and keep the page in style with the rest of the application - please see layout components at the end of this section.

#### Latest games

Like All Games Latest Games uses the API call made by the GameList component to get its data sorted by the newest first. After checking there are games retured in the list, it slices the first 5 items from the list before mapping through and displaying them. Display is also handled by the layout container components for an application wide uniform style.
![latest_games](/Documentation/latest_games.png)

#### Game detail

In order to view the full details of a game and later into the project add and read reviews a detailed game page has been included. This can be accessed by clicking on a game title in either of the lists of games available. This page handles fetching its own data based on the id of the game appended to the URL when navigating to the detail page and accessed via `useParams`. A check on the current user details is also made from this page for user type, as staff members are able to make edits from this page, or delete the game entirely. 

#### Landing Page

To display the latest games list and begin to tie the application together the landing page serves as the home route. Here there are 3 main areas to return the latest games page, a small about section and when added the latest announcements will be added as well. Again modularity of design allows this page to function with the missing data, or if one page's API fetch fails the the rest of the page can continue independently. 
![landing_page](/Documentation/landing_page.png)

#### Game admin

Calling on the Game List API component the Game admin page collects the list of games returned from its props. It uses the current user context to check that the logged in user is allowed to access this page, and displays a warning message if they don't have authorisation to access the page. 
![admin_access](/Documentation/admin_access.png)
Assuming authorisation is valid, and the games list is not empty then a list is diplayed with edit and delete options for staff members. This serves as a more direct route for games management than going via the library > game detail pages. Game deletion works as described above with an API call based on the game ID passed in from the game list. Once deletion is successful then invalidation takes place and the libraryData query key is refetched to update the list of games. Editing games is a separate page and the information to be edited is [passed as state](https://reactrouter.com/en/main/hooks/use-location) to the child component.

#### Create Game

Adding new games to the library can be done by staff users with admin access. This form is only accessible from the main games admin page, the button to add a new game uses a flag to toggle between showing or hiding the form. Another security check is included on the logged in user having the is_staff flag or else a warning is returned on screen so this page could be slotted in to any other part of the application and still have the same level of security checking. Variables to be returned to the API for creating a new game instance are held in state while the form is being populated until the submit button is pressed, field type and required flags on the mandatory fields are included in the form for data validation before the request is sent and any field specific errors are returned underneath the relevant text box or dropdown. On success a message is displayed on screen and the user is redirected to the game detail page to review the newly created game. From this page edit and delete options are readily available. 

#### Edit game

Details to be edited are passed to this page via props. These state variables pre populate the form available to edit the details of the game, the game to be updated is matched by its id which forms part of the Axios request. As editing games is an admin only function, authorisation to carry out the request is checked by the token sent over in the request header, although access to the edit page is also protected by the checks made on accessing the admin page as well. 

### Components added this sprint

#### Game List

To handle fetching data from the API this component gets any search or sort strings passed in via its props from the parent module. Its job is solely to retrieve the list of games and then based upon the list prop either display the `AllGames`, `GameAdmin` or the `LatestGames` page as necessary. It separates out data fetching and data display so that one can be modified without affecting the other. It also means that while there are 3 differing pages for displaying games the code for requesting the data from the API is only held in one place and has not had to be repeated. Any further need for fetching and displaying game data to the front end can be incorporated into this component so that only the display element needs to be written.

#### Layout Components

As I was repeating a lot of the display components while adding pages for this sprint, I have standardised the layout and display of the majority of the application into 3 reusable layout components. A component which includes a full header body and footer, one for just header and body and then one for just body. All that needs to be passed into these components is the content to be produced inside the relevant sections of the Bootstrap Card and the colour, layout and margins are are handled by these containers. For any styling changes to colour schemes or to add different elements into the main layout of the pages only the container components need to be changed and this will then update the majority of the application with a few minor adjustments left to make to pages where non standard layout is needed. Using these components makes it much quicker to add new pages and content to the project without having to remember colour schemes, margins that have been set on previous pages or which layout elements were used and the whole site then has a uniform style and feel throughout. 

![layout_containers](/Documentation/layout_containers.png)

## Milestone 3 - Player Reviews

| Tasks this sprint | Overview |
| ------------------| -------- |
| * Add review creation form for members * Add edit and delete buttons on reviews visible to review author * Display all reviews linked to a game on game detail pages. * Display member specific reviews in the profile page | ![sprint3](/Documentation/sprint3.png) |

| User Stories This Milestone | Frontend Acceptance Criteria |
| --------------------------- | ---------------------------- |
| As a library member I want to be able to review games that I have played so that other members can find out if they might want to play that game | Review form available when logged in as a member, Review is sent to the API and saved |
| As a library member I want to be able to edit the reviews I have left so that I can change any errors or update my opinion at a later date | Edit form is accessible only to logged in member, Data is successfully updated |
| As a library member I want to be able to delete reviews that I have made so that I can start again if there are too many edits to make or remove opinions I no longer hold. | Delete button accessible on front end from reviews written by member |
| As a member I want to be able to see a list of reviews that I have written so that I can remember what I have already reviewed and check they are still relevant | A list of reviews is returned only for the logged in user under the user profile page |
| As a site visitor I want to be able to read reviews of games by people that have already played them so that I can decide if I might want to play that game | Front end displays reviews filtered by game on the correct game listing |

### Pages linked to this milestone

#### Create review form

The page for creating a review uses a button with a toggle to show or hide the review editor so that it can be included inside another page as well as being used as a stand alone page, it just needs a game id to be passed in as a prop so that the mutation knows which game is being reviewed when creating a new review instance. The author id is taken from the currently logged in user sent in the access token. When a mutation successfully saves a new review or an error occurs on saving, the user is notified by an on screen message. After saving, the review list query key is invalidated and refreshed so that the new instance is included in the list of reviews displayed on the game page instantly.

#### Edit review form

Editing reviews uses a form that is prepoulated by passing in the review content to the form component as props, this content is held in state while the user is updating their content. Once the update is complete a mutation handles sending the update to the API feedback is given to the user on screen that their review update was sucessful or an error has occurred, query key invalidation handles updating the returned review list data. Also included in the edit form is the ability to delete a review instance, axios sends across the review id from the review object held in state and the author id in the access token so that the API can check the user has authorisation to delete the review instance. Feedback is again given to the user on screen and query key invalidation handles refreshing the review list data to remove the dislayed list of reviews instantly. 

As this page functions independently, the same edit form is included on both the game detail page list of reviews and the profile page list of reviews eliminating the need to duplicate any code.

![edit_reviews](/Documentation/edit_reviews.png)

#### Game reviews page

The game reviews page is a container to hold all of the elements of the review function together underneath the game detail page container. It handles fetching a filtered list of reviews where the game id is the current id of the game being displayed and then calls review list for all site visitors to see the relevant reviews that have been left for the game. A check is run to see if there is a currently logged in user, if so then the option to create a new review is shown by including the create review form. 
![game_reviews](/Documentation/game_reviews.png)

### Components added this sprint

#### Review list

Review list is a reusable display component that takes in a list of reviews from its parent and after checking the list is not empty, renders the reviews by mapping through the passed in list. For each review, checking if the logged in user is the author is handled by the API and a flag is returned true or false. For any reviews where the is_author flag is true additional edit and delete options are provided by adding the toggle button for the edit review form in while displaying that particular item in the list. 
![is_author](/Documentation/is_author.png)
As this component just focuses on display it is used for both displaying the list of game reviews as well as the list of reviews on the profile page, as long as it is passed in a list of reviews it doesn't bother itself with the fetching of that list data. With a few modifications this could have been an even more versatile list display component for all lists not just reviews now that I have a better understanding of the modularity of React architecture and I will certainly use this approach better in future. 

#### Loading container

Building upon the layout containers developed in the last sprint, I added a loading component this time so that rather than having to import and style spinners every time I wanted to use them I have a single container to add and the Bootstrap is all handlded within this container. 
![loading](/Documentation/loading.png)

#### Error container

Similarly to the loading container, I also added an error container that accepts error text as a prop and returns a styled error message to display to the user. 
![error_container](/Documentation/error_container.png)

## Milestone 4 - Admin Announcements

| Tasks this sprint | Overview |
| ------------------| -------- |
| * Add latest announcements to landing page. * Create a news page for all announcements. * Add news admin section to admin page. * Create new announcement and edit announcement forms. * Add delete button to admin list of announcements | ![sprint4](/Documentation/sprint4.png) |

| User Stories This Milestone | Frontend Acceptance Criteria |
| --------------------------- | ---------------------------- |
| As an admin user I want to create announcements so that I can update site visitors about events happening in the library | Announcements section is available in the admin area of the front end, Create announcement form submits new items to the API |
| As an admin user I want to be able to edit existing announcements so that they will always be up to date if the details change | Front end edit form accessible from admin page of React site, Edits are successfully saved |
| As an admin user I want to be able to delete announcements so that events and updates that are no longer relevant can be removed | Delete button available in admin area of React site, Instances are removed from the database when delete sent from front end |
| As a visitor to the site I want to be able to read all of the latest announcements so that I can find out about events that are happening in the library | Announcements are listed in reverse chronological order, The 5 latest announcements are displayed on the landing page of the React site, All announcements are displayed with all details on the news stories page |

## Features added this sprint

So that the news and game administration features are contained within one page. I have created a main admin page that news admin and game admin sits inside. The two functions are separate so that if one fails it does not affect the working of the other. This layout also makes updates easier as there are no dependencies of code between the different functional areas of the application and for any further features added then it is easy to add admin for those features by simply plugging them into the layout. 
![admin_area](/Documentation/admin_area.png)

### Pages linked to this milestone

#### Latest news

Latest news makes an API call and stores the returned list. Checking that the list is not empty first it then slices the first 5 elements from the list before mapping through them to display basic news information within the landing page of the application. 

#### All news

All news uses the returned list from the API and after checking that the returned list is not empty, displays the full details of each news announcement. Announcements are viewable by all site visitors and do not require login credentials. 

![news_announcement](/Documentation/news_announcement.png)

#### News admin

The admin page for announcements makes a request to an admin only API endpoint. Checking for authorisation to access the endpoint is done by verifying the user details in the access token sent over in the Axios request header. A toggle button hides or shows the page for creating a new announcement at the top with a list group mapping through all announcements displaying an edit component for each one. 

#### Create announcement

Creating new news announcements is accessible to admin users only through the admin page. This function sits at the top of the news admin section and is hidden by default. The show hide toggle is held in state and triggered by the edit buttons onClick attribute. A mutation adds the new announcement to the Announcement table and query invalidation then refetches the data for both news data and news admin query keys to instantly refresh both lists. 
![create_announcements](/Documentation/create_announcement.png)

### Components added this sprint

#### Edit announcement

The announcement editing component is displayed with each announcement in the returned list. It holds the details of the announcement in state to pre populate a form for the user to update any details that need to be changed and then a mutate function handles the PUT request to update the announcement at the API. Query invalidation ensures the relevant query keys are refreshed on success so that the details are updated instantly in any lists displayed and a success message is displayed to the user on screen. The delete button for each announcement is included inside the edit component but does not trigger the full edit form to be opened when selected. 
![edit_announcement](/Documentation/edit_announcement.png)

## Milestone 5 - Member Ratings

| Tasks this sprint | Overview |
| ------------------| -------- |
| * Add thumbs up and down buttons to each game in the game list. * Add numbers of positive and negative ratings next to each button. * Add create rating function. * Add edit function for existing ratings. * Create delete option for ratings. * Add list display of liked games in profile area. | ![sprint5](/Documentation/sprint5.png) |

| User Stories This Milestone | Frontend Acceptance Criteria |
| --------------------------- | ---------------------------- |
| As a member I want to be able to add a thumbs up or thumbs down rating so that other users can see if they might want to play the game. | Buttons available to all authenticated members to add thumbs up and thumbs down instances from React frontend |
| As a user I want to be able to edit the rating I have left so that I can update my opinion if I change my mind. | Buttons on the front end change the rating from thumbs up to thumbs down |
| As a member I want to see the games I have rated so that I can pick out games I have already played and enjoyed to play again. | A list of ratings made by the member is visible on the profile page |
| As a site visitor I want to be able to see ratings left by other people so that I know if I might want to play that game or not. | Numbers of thumbs up and thumbs down per game displayed in the games library frontend |

### Components added this sprint

#### Thumbs up and thumbs down buttons

The main function of the ratings feature are the thumbs up and thumbs down buttons added onto each game listing in the library. These are added when the games are being displayed and follow a series of checks to decide which version of the button to display dependent on firstly if there is a logged in user or not, then if the user has already given a rating for that game. If a rating is found for the game then the relevant coloured icon is shown with the onClick attribute being set to send a request to delete the instance if the same button is clicked again or to update the rating if the other button is clicked changing the value to the opposite and changing the coloured icon that is returned. Query key invalidation handles the refreshing of data each time a button is clicked so that the correct value is always shown on screen. 
* The code for this component is based on the likes component of the CI Moments walkthrough and adapted to handle true or false ratings rather than just present or not present. 
![ratings](/Documentation/ratings.png)

#### User ratings list

The Games I Like list in the user profile area is a filtered list giving the user quick access to the page for each game they have given a thumbs up rating to. The query makes a filtered request for ratings that match the current user id with a value of true for thumbs up. This component is entirely self contained with no dependencies for data to be passed in so it can easily be moved or reused anywhere else within the application to produce the same results. 

## Application notifications - Current Message Context

To display feedback to users throughout the application I added a Current Message Context that sits around the whole application. Any part of the application can use the `useCurrentMessage` or `useSetCurrentMessage` hooks to send feedback, usually success or failure, into the messaging system. To compliment this I added another layout component which produces a Bootstrap Toast element any time it sees the flag change for the Current Message Context, a timer auto clears the toast after 5 seconds and resets the context to await another message into the system. This container sits inside the header component so that messages are prominent on screen. 
![notification_system](/Documentation/notification_system.png)

## Future Features
* I started developing this project in Material UI but ran into issues each time I tried to deploy to Heroku. Having not previously had problems following examples using React Bootstrap I proceeded with Bootstrap instead. Ideally I would rebuild with MUI given more time to troubleshoot and look to deploy to somewhere like AWS Amplify instead. 
* Social events - I had intended to add an extra feature for social events in the library where members could vote for which games they would like to see available for social nights. This feature has been moved to won't have, in production it would be added to the next release. 
* Requests - I would have liked to add an area for game requests to be added to the library so that when a search is made and the game a member is looking for wasn't found there was an option to add it to the list of requests for new games. THe thumbs up component could have been reused for this so that other members could upvote the games they also wanted to see added making sure the most popular games were added first. 

## Testing

Link to the [TESTING.md](TESTING.md) file.

## Deployment

The live deployed application can be found deployed on [Heroku](https://dinogames-react.herokuapp.com/).

### Heroku Deployment

This project uses [Heroku](https://www.heroku.com), a platform as a service (PaaS) that enables developers to build, run, and operate applications entirely in the cloud.

Deployment steps are as follows, after account setup:

- Select **New** in the top-right corner of your Heroku Dashboard, and select **Create new app** from the dropdown menu.
- Your app name must be unique, and then choose a region closest to you (EU or USA), and finally, select **Create App**.

Heroku needs a Procfile to deploy a production build : 
 * In package.json add "heroku-prebuild": "npm install -g serve" to scripts
 * In the blank Procfile add "web: serve -s build"

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

### This project is built using the following languages and frameworks:
* JSX
* JavaScript
* React

### Tools to assist me as a developer:
* Git - Version control and project flow management
* [GitHub](https://github.com/) - Cloud hosting of project files
* [Heroku](https://www.heroku.com/home) - Cloud hosting of deployed project
* Balsamiq - Used to create wireframes
* paint.net - Used for image manipulation
* [Font Awesome](https://fontawesome.com/) - Icons used throughout the project
* Prettier - Used for code formatting and compliance
* Eslint - Used as an installed dev depencency to check for code compliance throughout development

## Libraries included in this project:
* [React Bootstrap](https://react-bootstrap.netlify.app/docs/getting-started/introduction) - Font end library that builds on Bootstrap, a well documented and widely used tool for developing responsive front end design that meets the mobile first development goal.
* [React Router](https://reactrouter.com/en/main/start/tutorial) - For handling client side routing in React applications, React Router allows movement between pages without needing a full window refresh which enhances the user experience while using the application.
* [Axios](https://axios-http.com/docs/intro) - Axios handles requests made between front and back end applications, in particular it includes the ability to intercept requests which this project has used for maintaining authentication with the API rather than having to provide login credentials on a more frequent basis which gives a much better user experience. Axios can also handle XSRF protection whereas the inbuilt Fetch does not. Although cross site is set to none, login and registration with dj-rest-auth at the API does include cross site variables which I have been unable to make changes to. 
* [reactQuery from Tanstack](https://tanstack.com/query/latest/docs/react/reference/useQuery) - Tanstack Query comes with a whole host of features, I have only realy scratched the surface of its capability in this project. I opted to use this instead of useEffect due to it being a dedicated query management tool with clear handling of loading and error states. Beyond the standard useQuery hook, I opted to use the useMutation hook for updating data as this includes the option for query invalidation following mutation. Query invalidation uses the query provider at app level and then 

## Credits

### Documentation and additional tutorials
* I completed Brian Holt's [Intro To React](https://frontendmasters.com/courses/complete-react-v8/) prior to starting this project which introduced me to React 18, ESLint, React Router, and React Query. 
* For setting up routing as I have used the latest version of React and React Router, I followed the tutorial available in the documentation [here](https://reactrouter.com/en/main/start/tutorial)
* I have used the [Tanstack documentation](https://tanstack.com/query/latest/docs/react/overview) extensively for gudiance on making effective queries in React
* I have used the [React bootstrap documentation](https://react-bootstrap.github.io/docs/getting-started/introduction/) extensively throughout the project
* [Bootstrap documentation](https://getbootstrap.com/docs/5.0/layout/utilities/#margin-and-padding) for classnames to set margins and padding on React Bootstrap components

### Code from other sources
* This project has been developed following on from the Code Institute Moments Walkthrough project. Most notably the Current user context component and handling token refreshing with Axios interceptors, and the Likes component on which I have built my Ratings component. 

### Media and images

* Site logo and favicon from [istock photo](https://www.istockphoto.com/vector/house-dice-icon-flat-gm1483672185-510210038)
* All icons are from [Font awesome](https://fontawesome.com/)

### Honourable mentions
* Support and guidance from my mentor Lauren Popich
* June '22 slack community for continued support and help with troubleshooting and user testing

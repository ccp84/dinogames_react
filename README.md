# React App for Dinosaur Games Library

## Concept

My local boardgames group meet each week with members bringing along their own games to share with the group. This can lead to sometimes a limited selection of games on offer, or not knowing which games other members have that the group would like to play. The Dinosaur Games Library app provides a solution to this by allowing members of the group to list the games that they own and are happy to share in an online library available for other members to view and search. Requests could then be made ahead of social events for particular games that the group would like to play to be brought along that week. Additional features of the app would allow admin users to advertise the group to visitors to the site and publicise social events to gain a wider membership, add important group updates to the front page as these can sometimes be missed in the Facebook group, and allow for an 'add to social' button for games to be automatically requested via the app at a particular social event.

## Scope

This app will provide a user interface for members to create an online account, manage their game list, view the wider group "social library" and view details of social events that they may wish to participate in. It will also give admin users the facility to highlight group announcements and details of upcoming events. Any site visitors will be able to find out information about the group before registering for membership.

## Initial Wireframes

| View                  |                                                                                 |
| --------------------- | ------------------------------------------------------------------------------- |
| Mobile - Homepage     | ![mobilehome](/Documentation/Wireframes/wireframe_mobile_home.png)              |
| Tablet - Homepage     | ![tablethome](/Documentation/Wireframes/wireframe_tablet_home.png)              |
| Desktop - Homepage    | ![desktophome](/Documentation/Wireframes/wireframe_desktop_home.png)            |
| Mobile - Profilepage  | ![mobileprofile](/Documentation/Wireframes/wireframe_mobile_profile_view.png)   |
| Tablet - Profilepage  | ![tabletprofile](/Documentation/Wireframes/wireframe_tablet_profile_view.png)   |
| Desktop - Profilepage | ![desktopprofile](/Documentation/Wireframes/wireframe_desktop_profile_view.png) |
| Mobile - Gamepage     | ![mobilegames](/Documentation/Wireframes/wireframe_mobile_game_detail.png)      |
| Tablet - Gamepage     | ![tabletgames](/Documentation/Wireframes/wireframe_tablet_game_detail.png)      |
| Desktop - Gamepage    | ![desktopgames](/Documentation/Wireframes/wireframe_desktop_game_detail.png)    |
| Mobile - News         | ![mobilenews](/Documentation/Wireframes/wireframe_mobile_news_detail.png)       |
| Tablet - News         | ![tabletnews](/Documentation/Wireframes/wireframe_tablet_news_detail.png)       |
| Desktop - News        | ![desktopnews](/Documentation/Wireframes/wireframe_desktop_news_detail.png)     |
| Mobile - Social       | ![mobilesocial](/Documentation/Wireframes/wireframe_mobile_social_detail.png)   |
| Tablet - Social       | ![tabletsocial](/Documentation/Wireframes/wireframe_tablet_social_detail.png)   |
| Desktop - Social      | ![desktopsocial](/Documentation/Wireframes/wireframe_desktop_social_detail.png) |

### Design Considerations

| Colourscheme |                                                    |
| ------------ | -------------------------------------------------- |
| The logo for Eight Sixes contains blue/orange/black so these are the main colours I will be using for the project | ![Eight Sixes Logo](/Documentation/eightsixes.png) |

## Project Development

## Milestone 1 - User Accounts

| Tasks this sprint | Overview |
| ------------------| -------- |
| * Front end account creation form links to API endpoint and creates a user account. * Front end login form can access login end point to retrieve access token and refresh token. * Front end form clears stored credentials preventing further usage. | ![sprint1](/Documentation/sprint1.png) |

npm install -D prettier
npm install -D eslint eslint-config-prettier
npm install -D eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
npm install -D eslint-plugin-react-hooks

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

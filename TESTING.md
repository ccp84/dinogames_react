# Testing

Return to the [README.md](README.md) file.

## Code Validation

For JavaScript and JSX code compliance I installed eslint as a dev dependency at the start of the project so that any warnings or errors were solved as each file was written. The configuration I used for eslint can be found in the eslintrc.json file for this project. I have also used prettier throughout to ensure formatting is compliant, the config file file for this is prettierrc. I have pushed both configuration files to GitHub for completeness, normally I would include these in gitignore. By running eslint at the end of the project, no errors or warnings remain
![eslint](/Documentation/Testing/eslint.png)

For this project all styling is handled by standard Bootstrap classes there is no additional CSS to validate.

## Defensive Programming

Defensive programming was manually tested with the below user acceptance testing:

| Page | User Action | Expected Result | Pass/Fail | Comments |
| --- | --- | --- | --- | --- |
| Home |  |  |  |  |
| 1 | User clicks home button | Redirection to home page | Pass |  |
| 2 | User clicks a link in latest games list | Game detail page for that game loads | Pass |  |
| Library |  |  |  |  |
| 3 | User clicks Library button | Redirection to library page, full game list loads | Pass |  |
| 4 | Key word typed in search bar | Filtered game list returned | Pass | ![defensive3](/Documentation/Testing/defensive_3.png) |
| 5 | Sort option selected | Sorted list returned | Pass | ![defensive4](/Documentation/Testing/defensive_4.png) |
| 5 | User clicks a game title link | Redirected to game detail page for that game | Pass |  |
| 7 | Logged in user selects rating - no rating yet | Rating created | Pass | ![defensive6](/Documentation/Testing/defensive_6.png) |
| 8 | Logged in user selects a different rating to the one already logged | Rating value changes | Pass | ![defensive7](/Documentation/Testing/defensive_7.png) | 
| 9 | Logged in user selects the same rating again | Rating is deleted | Pass | ![defensive8](/Documentation/Testing/defensive_8.png) |
| 10 | Logged out user clicks on ratings button | Redirect to login page | Pass | ![defensive9](/Documentation/Testing/defensive_9.png) |
| Game detail page |  |  |  |  |
| 11 | User follows a link to game detail page | Redirected to relevant game information | Pass | ![defensive13](/Documentation/Testing/defensive_13.png) |
| 12 | Logged in user clicks add review | Review editor is displayed | Pass | ![defensive14](/Documentation/Testing/defensive_14.png) | 
| 13 | Logged in user submits a review | Review is saved, editor is closed, review is displayed in the list | Pass | ![defensive15](/Documentation/Testing/defensive_15.png) |
| 14 | Logged in user clicks edit on a review written by them | Review editor is displayed | Pass | ![defensive16](/Documentation/Testing/defensive_16.png) | 
| 15 | Logged in user saves an edited review | Review is saved, editor is closed, review list is updated | Pass | ![defensive17](/Documentation/Testing/defensive_17.png) | 
| 16 | Logged in user selects delete on a review they own | Review is deleted, review list is updated | Pass | ![defensive18](/Documentation/Testing/defensive_18.png) |
| 17 | Logged out user clicks to add a review | Redirected to login | Pass | ![defensive19](/Documentation/Testing/defensive_19.png) |
| 18 | Any user changes the URL for a game page to a non existent game id | Error page displayed | Pass | ![defensive20](/Documentation/Testing/defensive_20.png) |
| Error page |  |  |  |  |
| 19 | User clicks back button | Redirected to last page they were on | Pass |  |
| News Page |  |  |  |  |
| 20 | User clicks News button | Redirected to news page, full news list loads | Pass |  |
| Signup |  |  |  |  |
| 21 | Logged out user clicks Sign up button | Sign up form is displayed | Pass |  |
| 22 | Logged out user enters incorrect sign up data | On screen feedback given | Pass | ![defensive25](/Documentation/Testing/defensive_25.png) |
| 23 | Logged out user enters valid sign up data | Account is created, redirect to sign in page | Pass | ![defensive26](/Documentation/Testing/defensive_26.png) |
| 24 | Logged out user clicks sign in link on form | Redirect to sign in page | Pass |  |
| 25 | Logged in user navigates to sign up form | Redirects to profile page | Pass |  |
| Login |  |  |  |  |
| 26 | Logged out user clicks Signin link | Login form is displayed | Pass |  |
| 27 | Logged out user enters invalid login data | On screen feedback given | Pass | ![defensive30](/Documentation/Testing/defensive_30.png) |
| 28 | Logged out user enters valid login data | User is logged in, redirect to profile page | Pass | ![defensive31](/Documentation/Testing/defensive_31.png) |
| 29 | Logged out user clicks sign up link on form | Redirects to sign up page | Pass |  |
| 30 | Logged in user navigates to sign in page | Regirects to profile page | Pass |  |
| Profile Page |  |  |  |  |
| 31 | Logged out user navigates to profile page | Error returned | Pass | ![defensive34](/Documentation/Testing/defensive_34.png) |
| 32 | Logged in user clicks on profile link | Profile details returned | Pass |  |
| 33 | Logged in user clicks edit details button | Profile edit form is displayed | Pass | ![defensive36](/Documentation/Testing/defensive_36.png) |
| 34 | Logged in user saves profile details | Editor closes, details are saved | Pass | ![defensive37](/Documentation/Testing/defensive_37.png) |
| 35 | Logged in user clicks a game link from their liked games list | Redirects to game details page | Pass |  |
| 36 | Logged in user clicks edit button in their reviews list | Review editor opens | Pass | ![defensive39](/Documentation/Testing/defensive_39.png) |
| 37 | Logged in user saved edited review | Editor closes, review is saved, review list is updated | Pass | ![defensive40](/Documentation/Testing/defensive_40.png) |
| 38 | Logged in user clicks delete review button | Review is deleted, review list is updated | Pass | ![defensive41](/Documentation/Testing/defensive_41.png) |
| Admin page |  |  |  |  |
| 39 | Logged out user navigates to admin page | Error returned | Pass | ![defensive42](/Documentation/Testing/defensive_42.png) |
| 40 | Logged in user navigates to admin page | Error returned | Pass | ![defensive43](/Documentation/Testing/defensive_43.png) |
| 41 | Admin user clicks on admin button | Redirect to admin page | Pass |  |
| 42 | Admin user clicks new announcement editor | Announcement editor opens | Pass | ![defensive45](/Documentation/Testing/defensive_45.png) |
| 43 | Admin user enters invalid announcement data | On screen feedback given | Pass | ![defensive46](/Documentation/Testing/defensive_46.png) |
| 44 | Admin user saves valid new announcement | Announcement saved, redirect to news page | Pass | ![defensive47](/Documentation/Testing/defensive_47.png) | 
| 45 | Admin user clicks edit announcement | Announcement editor opens | Pass | ![defensive48](/Documentation/Testing/defensive_48.png) |
| 46 | Admin user saves updated announcement | Editor closes, announcement details saved, announcements list refreshes | Pass | ![defensive49](/Documentation/Testing/defensive_49.png) |
| 47 | Admin user clicks delete announcement button | Announcement is deleted, announcement list refreshes | Pass | ![defensive50](/Documentation/Testing/defensive_50.png) |
| 48 | Admin user clicks add game button | Game editor opens | Pass | ![defensive51](/Documentation/Testing/defensive_51.png) |
| 49 | Admin user enters invalid game details | Feedback shown on screen | Pass | ![defensive52](/Documentation/Testing/defensive_52.png) |
| 50 | Admin user saves a new game | New game saved, redirected to game detail page | Pass | ![defensive53](/Documentation/Testing/defensive_53.png) |
| 51 | Admin user clicks on edit game button | Game editor is displayed | Pass | ![defensive54](/Documentation/Testing/defensive_54.png) |
| 52 | Admin user enters invalid details in game edit page | On screen message displayed | Pass | ![defensive55](/Documentation/Testing/defensive_55.png) |
| 53 | Admin user saves updated game details | Game details saved, redirect to game detail page | Pass |  |
| 54 | Admin user clicks delete game button | Game is deleted, game list refreshes | Pass | ![defensive56](/Documentation/Testing/defensive_56.png) |
| Navigation |  |  |  |  |
| 55 | Logged in user clicks on logout button | Current user is cleared, logged out icons shown, logged out status displayed | Pass | ![defensive57](/Documentation/Testing/defensive_57.png) |
| 56 | User is logged out | Correct set of buttons and icon are displayed | Pass | Note that when a user is logged out errors for token refreshing are logged to the console. These are inherent to the system and are to be expected rather than a coding error to be resolved. |
| 57 | User is logged in | Standard set of buttons, username and profile icon are displayed | Pass | ![defensive58](/Documentation/Testing/defensive_58.png) |
| 58 | Admin user is logged in | Admin button is accessible from nav bar | Pass | ![defensive59](/Documentation/Testing/defensive_59.png) |

## Browser Compatibilty

I've tested my deployed project on multiple browsers to check for compatibility issues.

| Browser | Screenshot | Notes |
| --- | --- | --- |
| Chrome | ![chrome](/Documentation/Testing/chrome.png) | Works as expected |
| Firefox Developer | ![firefox](/Documentation/Testing/firefox.png) | Works as expected |
| Edge | ![edge](/Documentation/Testing/edge.png) | Works as expected |
| Safari | ![safari](/Documentation/Testing/safari.jpg) | Works as expected |

## Responsiveness

I've tested my deployed project on multiple devices to check for responsiveness issues.

### Mobile (DevTools)

| View | Screenshot | Notes |
| --- | --- | --- |
| Home | ![home](/Documentation/Testing/responsive_mobile_home.png) | As expected |
| Library | ![library](/Documentation/Testing/responsive_mobile_library.png) | As expected |
| Game detail | ![gamedetail](/Documentation/Testing/responsive_mobile_gamedetail.png) | As expected | 
| News | ![news](/Documentation/Testing/responsive_mobile_news.png) | As expected |
| Admin | ![admin](/Documentation/Testing/responsive_mobile_admin.png) | Buttons out of alignment although they still work and display at lowest breakpoint 320px, this resolves at 370px which is fine for iPhone 6 and above | 
| Profile | ![profile](/Documentation/Testing/responsive_mobile_profile.png) | As expected |
| Sign in | ![signin](/Documentation/Testing/responsive_mobile_signin.png) | As expected |
| Sign up | ![signup](/Documentation/Testing/responsive_mobile_signup.png) | As expected |

### Tablet (DevTools)

| View | Screenshot | Notes |
| --- | --- | --- |
| Home | ![home](/Documentation/Testing/responsive_tablet_home.png) | As expected |
| Library | ![library](/Documentation/Testing/responsive_tablet_library.png) | As expected |
| Game detail | ![gamedetail](/Documentation/Testing/responsive_tablet_gamedetail.png) | As expected | 
| News | ![news](/Documentation/Testing/responsive_tablet_news.png) | As expected |
| Admin | ![admin](/Documentation/Testing/responsive_tablet_admin.png) | As expected | 
| Profile | ![profile](/Documentation/Testing/responsive_tablet_profile.png) | As expected |
| Sign in | ![signin](/Documentation/Testing/responsive_tablet_signin.png) | As expected |
| Sign up | ![signup](/Documentation/Testing/responsive_tablet_signup.png) | As expected |

### Desktop

| View | Screenshot | Notes |
| --- | --- | --- |
| Home | ![home](/Documentation/Testing/responsive_desktop_home.png) | As expected |
| Library | ![library](/Documentation/Testing/responsive_desktop_library.png) | As expected |
| Game detail | ![gamedetail](/Documentation/Testing/responsive_desktop_gamedetail.png) | As expected | 
| News | ![news](/Documentation/Testing/responsive_desktop_news.png) | As expected |
| Admin | ![admin](/Documentation/Testing/responsive_desktop_admin.png) | As expected | 
| Profile | ![profile](/Documentation/Testing/responsive_desktop_profile.png) | As expected |
| Sign in | ![signin](/Documentation/Testing/responsive_desktop_signin.png) | As expected |
| Sign up | ![signup](/Documentation/Testing/responsive_desktop_signup.png) | As expected |

### Other views tested

| View | Screenshot | Notes |
| --- | --- | --- |
| iPhone | ![iphone](/Documentation/Testing/safari.jpg) | As expected |
| 

## Lighthouse Audit

I've tested my deployed project using the Lighthouse Audit tool to check for any major issues.

| Page | Size | Screenshot | Notes |
| --- | --- | --- | --- |
| Home | Mobile | ![home](/Documentation/Testing/lighthouse_mobile_home.png) | Mobile pages have lower performance throughout, there are no warnings remaining that I can make adjustments to to imcrease performance in my own code |
| Home | Desktop | ![home](/Documentation/Testing/lighthouse_desktop_home.png) |  |
| Library | Mobile | ![library](/Documentation/Testing/lighthouse_mobile_library.png) |  |
| Library | Desktop | ![library](/Documentation/Testing/lighthouse_desktop_library.png) |  |
| Game detail | Mobile | ![gamedetail](/Documentation/Testing/lighthouse_mobile_gamedetail.png) |  |
| Game detail | Desktop | ![gamedetail](/Documentation/Testing/lighthouse_desktop_gamedetail.png) |  |
| News | Mobile | ![news](/Documentation/Testing/lighthouse_mobile_news.png) |  |
| News | Desktop | ![news](/Documentation/Testing/lighthouse_desktop_news.png) |  |
| Admin | Mobile | ![admin](/Documentation/Testing/lighthouse_mobile_admin.png) |  |
| Admin | Desktop | ![admin](/Documentation/Testing/lighthouse_desktop_admin.png) |  |
| Profile | Mobile | ![profile](/Documentation/Testing/lighthouse_mobile_profile.png) |  |
| Profile | Desktop | ![profile](/Documentation/Testing/lighthouse_desktop_profile.png) |  |
| Sign in | Mobile | ![signin](/Documentation/Testing/lighthouse_mobile_signin.png) | Warning for console log messages when there is no user logged in. This is to be expected and is a feature of the system that I cannot change |
| Sign in | Desktop | ![signin](/Documentation/Testing/lighthouse_desktop_signin.png) |  |
| Sign  up | Mobile | ![signup](/Documentation/Testing/lighthouse_mobile_signup.png) |  |
| Sign up | Desktop | ![signup](/Documentation/Testing/lighthouse_desktop_signup.png) |  |
## User Story Testing

| User story | Outcome |
| ---------- | ------- |
| As a visitor to the site I want to be able to create an account so that I can access the full membership features |  |
| As a member I want to be able to log into my account so that I can access the full features of the library. |  |
| As a member I want to be able to log out of my account to keep my data secure. |  |
| As a member of staff I want to be able to add games to the library so that site visitors can see what games are available to play |  |
| As a member of staff I want to be able to edit listed games so that the details are always accurate and up to date. |  |
| As a member of staff I want to be able to delete a game from the library so that any old games no longer available are removed from the list |  |
| As a member I want to be able to see all of the games available in the library so that I can read the reviews and look for games I might like |  |
| As a member I want to be able to search the library by game feature so that I can pick out the games most suited to my interests |  |
| As a library member I want to be able to review games that I have played so that other members can find out if they might want to play that game |  |
| As a library member I want to be able to edit the reviews I have left so that I can change any errors or update my opinion at a later date |  |
| As a library member I want to be able to delete reviews that I have made so that I can start again if there are too many edits to make or remove opinions I no longer hold. |  |
| As a member I want to be able to see a list of reviews that I have written so that I can remember what I have already reviewed and check they are still relevant |  |
| As a site visitor I want to be able to read reviews of games by people that have already played them so that I can decide if I might want to play that game |  |
| As an admin user I want to create announcements so that I can update site visitors about events happening in the library |  |
| As an admin user I want to be able to edit existing announcements so that they will always be up to date if the details change |  |
| As an admin user I want to be able to delete announcements so that events and updates that are no longer relevant can be removed |  |
| As a visitor to the site I want to be able to read all of the latest announcements so that I can find out about events that are happening in the library |  |
| As a member I want to be able to add a thumbs up or thumbs down rating so that other users can see if they might want to play the game. |  |
| As a user I want to be able to edit the rating I have left so that I can update my opinion if I change my mind. |  |
| As a member I want to see the games I have rated so that I can pick out games I have already played and enjoyed to play again. |  |
| As a site visitor I want to be able to see ratings left by other people so that I know if I might want to play that game or not. |  |

## Bugs

| Page | Issues Remaining | Considerations | Screenshots |
| --- | --- | --- | --- |

Fixes have been tracked as issues through the project board you can see a filtered view [here](https://github.com/users/ccp84/projects/5/views/1?filterQuery=bug)
![bugs](/Documentation/Testing/bugs.png)

Return to the [README.md](README.md) file.
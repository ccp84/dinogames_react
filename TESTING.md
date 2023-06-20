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
| 11 | Admin user clicks on page | Edit and delete buttons are available | Pass | ![defensive10](/Documentation/Testing/defensive_10.png) |
| 12 | Admin user clicks edit button | Redirected to edit page for the correct game | Pass |  |
| 13 | Admin user clicks delete button | Redirected to the library page | Pass |  |
| 14 | Logged in user clicks on page | No admin buttons are visible | Pass | ![defensive13](/Documentation/Testing/defensive_13.png) |
| 15 | Logged in user clicks add review | Review editor is displayed | Pass | ![defensive14](/Documentation/Testing/defensive_14.png) | 
| 16 | Logged in user submits a review | Review is saved, editor is closed, review is displayed in the list | Pass | ![defensive15](/Documentation/Testing/defensive_15.png) |
| 17 | Logged in user clicks edit on a review written by them | Review editor is displayed | Pass | ![defensive16](/Documentation/Testing/defensive_16.png) | 
| 18 | Logged in user saves an edited review | Review is saved, editor is closed, review list is updated | Pass | ![defensive17](/Documentation/Testing/defensive_17.png) | 
| 19 | Logged in user selects delete on a review they own | Review is deleted, review list is updated | Pass | ![defensive18](/Documentation/Testing/defensive_18.png) |
| 20 | Logged out user clicks to add a review | Redirected to login | Pass | ![defensive19](/Documentation/Testing/defensive_19.png) |
| 21 | Any user changes the URL for a game page to a non existent game id | Error page displayed | Pass | ![defensive20](/Documentation/Testing/defensive_20.png) |
| Error page |  |  |  |  |
| 22 | User clicks back button | Redirected to last page they were on | Pass |  |
| News Page |  |  |  |  |
| 23 | User clicks News button | Redirected to news page, full news list loads | Pass |  |
| Signup |  |  |  |  |
| 24 | Logged out user clicks Sign up button | Sign up form is displayed | Pass |  |
| 25 | Logged out user enters incorrect sign up data | On screen feedback given | Pass | ![defensive25](/Documentation/Testing/defensive_25.png) |
| 26 | Logged out user enters valid sign up data | Account is created, redirect to sign in page | Pass | ![defensive26](/Documentation/Testing/defensive_26.png) |
| 27 | Logged out user clicks sign in link on form | Redirect to sign in page | Pass |  |
| 



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

### Tablet (DevTools)

| View | Screenshot | Notes |
| --- | --- | --- |

### Desktop

| View | Screenshot | Notes |
| --- | --- | --- |

### Other views tested

| View | Screenshot | Notes |
| --- | --- | --- |

## Lighthouse Audit

I've tested my deployed project using the Lighthouse Audit tool to check for any major issues.

| Page | Size | Screenshot | Notes |
| --- | --- | --- | --- |

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
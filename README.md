# truitter-back

## API

- [x] POST `/users/signup` => Create user (Dto => email, password, firstName, lastName)
- [x] POST `/users/login` => Log user (Dto => email, password)
- [x] GET `/users/:id` => return all truittes of an user
- [x] GET `/quotes` => return all truittes of the people I follow
- [x] POST `/quotes` => create a truitte (Dto => text)
- [x] PUT `/quotes/:id` => edit a truitte (Dto => text)
- [x] DELETE `/quotes/:id` => delete a truitte
- [x] POST `/subscriptions/:id` => follow an account
- [x] DELETE `/subscriptions/:id` => unfollow an account

## TABLES

User => ID, firstName, lastName, darkMode

Quote => ID, text, #userID, createdDate, modifiedDate

Subscription => ID, #followerID, #followedID

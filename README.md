## Welcome

This is meant as a boilerplate for a simple coding task.

## How to run


terminal 1:
```
  cd server
  yarn run seeds # creates seeds
  yarn run start # runs dev server
```

terminal 2:
```
  cd client
  yarn run start
```

open in browser: http://localhost:3000

## Asks

* Build a simple filter form for the user list
  * Add a simple case-insensitive string search that filters results by name and bio
    * Eg if i'd search for "Pete" i would find "Peter Lastname" and "i was born in St Spetersburg"
  * Add a second search form that allows filtering for admins and non-admins
  * Feel free to not worry about scalability concerns

* Implement a simple infinite scrolling pagination for the results
  * Feel free to ignore scalability concerns

* General Qs:
  * How can we improve the setup of this app?
    * What changes would need to be done to allow simple integration tests in CI with this application?
      * eg via Cypress
  * How would you solve scalability for the full text search?
  * What kind of scalability issues could happen for the infinite scroll pagination?
## Welcome

This is meant as a simple coding task.
It covers the basics of our stack.

We tried to make it as a brief and simple as possible while still allowing us to filter early in the hiring funnel.

### FYI

You are one of the first to try out this coding challenge:
- If you run into any problems please reach out.
- If you need to change the scope of the coding challenge due to time or simply because we made a mistake please reach out.
- Please let us know how we could make this challenge better

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

1. **Add a migration to add an image url field**
  * Populate this with placeholder images from placeholder urls from http://avatars.adorable.io/ (or any other service you prefer)
  * Display the image in the results
  * Please optimize the layout a bit to look less horrible but don't worry it doesnt need to look perfect

1. **Update the seeds file to generate 100 records using faker**

1. **Implement a simple infinite scrolling pagination for the results**
  * Feel free to ignore scalability concerns

1. **Build a filter form for the user list**
  * Add a simple case-insensitive string search that filters results by name and shortBio
    * Eg if i'd search for "Pete" i would find "Peter Lastname" and "i was born in St Spetersburg"
  * In the same form add a second filter that allows filtering for verified users and non-verified
  * Feel free to not worry about scalability concerns

## Questions

Please send us 1-2 lines for each - feel free to keep it brief

* How can we improve the setup of this app?
  * Please name 3-5 ideas how to improve it. From tiny to big
* We want to prefer people who match their search-query by name over people who match with their shortBio
  * eg Paris should result "Paris Hilton" before someone saying "I was born in Paris"
  * How would you be able to do this?
  * How would you do this on a larger scale?
* Assuming we have a very very large amount of users in this table
  * What kind of scalability issues could happen for the infinite scroll pagination?



## Submission

- Send us me an email with
  - A link to a git repo with your changes
  - A short video showing the pagination and search filtering
  - The answers to the questions listened


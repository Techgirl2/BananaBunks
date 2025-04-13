# BananaBunks

npm run start 
to automatically run all the right commands

screens/
LoginScreen is the first screen to pop up and it handles user login 
SignUpScreen prompts the user to make an account by listing their full name, email, and password
LoginScreen routes to SignUpScreen and vice versa

MVP: 
- let a user make an account and login [DONE] 

- outline edit profile workflow on the frontend 
- store user data like living prefrerences, hobbies, etc. in JSON in firestore 

- implement UI from figma for edit profile pages, main profile page, swiping page, matched page 

- once you have a lot of user data created, implement simple swiping functionality where you're just listing all other users on the platform in arbitrary or sequential order 

- if a match is mutual, have the corresponding person's profile show up on the "matched" section of the app 

- once all this is done, see if you can implement some kind of matching algorithm 

- continue tweaking UI/UX 

- start making the presentation and get a demo workflow set up in parallel
    - project inspiration : has utility to both of our lives, angelina trying to fill single, I'm trying to 
    - include the struggles we ran into : expo compatibility, nativewind/babel stuff use screenshots if you have any 
    - this isn't supposed to handle every single aspect of shared living, we give some responsibility to the user to reach out to the people they've matched with using their email handles to discuss the more specific things 
    - this is also why we've provided the personal description field so users have the flexibility to truly show what they're prioritizing. 
    - there could still be more improvements like having different user roles for people wanting a place to live and people looking to fill spaces in their existing accomodation, as well as discussing location, but we wanted to focus more on personality compatibility since your housemates are people you will most likely see every day and it's important to make that home environment as welcoming and supportive as possible whilst trying to take away the stress and anxiety that comes with living with new people!  




What's beyond the scope of the MVP: 
- user can go back and update information (will require recalibrating all the matched algorithm stuff so for now we'll keep initial preferences fixed however, we will set up the workflow for it)

- add a "price range" field : maybe one line that contains two sliders? So people looking for a place can specify the monetary range they're looking for and people looking to fill their vacancies already have a definite idea for how much it will cost them, so they will put a more narrower interval down. We just need to check to see if their price interval falls inside the price range of someone looking for housing. (vacancy filler user's range is a subset of house searcher's price range)


https://icons.expo.fyi/Index/Entypo/circle-with-cross
https://icons.expo.fyi/Index/FontAwesome/check-circle
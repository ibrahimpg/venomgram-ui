# venomgram-ui
Reactive UI built with Vue (with Vue-Router and Vuex), transpiled with Babel, and bundled with Webpack. A painless process with Vue CLI 3. Serves as the front-end for [Venomgram](https://venomgram.netlify.com), an Instagram clone built with full-stack JavaScript. The server is a REST API built with Node/Express/MongoDB, check that out [here](https://github.com/ibrahimpg/venomgram-server).

# Layout

**Home icon** - your feed. Displays posts made by people you follow in reverse chronological order.

**Magnifying glass icon** - explore page. Displays all posts made by people you don't follow and don't have blocked.

**Camera icon** - upload page. Select an image, give it a caption, and hit 'Submit' to post it.

**User icon** - your profile page. Update your display picture and bio, handle your account settings, and view pictures you have posted.

# Instructions

In the command line:

`git clone https://github.com/ibrahimpg/venomgram-ui.git`

`cd venomgram-ui`

`npm install`

Now you want to inject your environmental variables (Heroku and Cloudinary URL's) with a .env file. After doing that:

`npm run build`

Grab the newly created 'dist' folder in your directory and throw it up on Netlify/cPanel/Github Pages or whatever else you use.

# To-do

* Show followers/following in profile.

* Show user profile upon clicking their name.
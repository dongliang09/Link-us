# During the time ...

## making change to model and migration
* delete the old migration version because I make lots of change on the user model.
* had a problem on the production site, because production site already the old version, and the new version doesn't continue on the old version.
* need to delete the database on production
* LESSON: even though made a small change on model, just build upon the old migration version.

## developing feature for post and comment

* I feel that everything is messy when I reused the component for different formTypes or different features.
* information is passed down through props, some arguments in the props are used, and some are not,
this senario make the situation even worse.
* LESSON: reuse the component when they have same feature, and same functionality
that way, everything seems more clear.

## developing feature for education and skill

* I like the filtering based on user_id to get related educaitons and skills
* for adding skill, adding suggestion would be cool.
* To implement that, have a general pools of skills,
  filter out the ones user didn't have. When they click on it, it autofills the input box.

## add image upload for post
* Instead of sending json with dispatch to the backend, we are sending post information along with post image(binary) with built-in JavaScript formData
* Also need to define AWS upload functions (mostly from offical docs) that will be used in the backend routes

## easter eggs!
* I think it would be fun to set up a easter egg hunt on the website

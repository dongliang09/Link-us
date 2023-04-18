from app.models import db, environment, SCHEMA, Post
from sqlalchemy.sql import text


def seed_posts():
  #first set
  hi = Post(content="Hello World", user_id=1)
  whatisup = Post(content="What's up", user_id=1)
  explore = Post(content="Everything is new to me.Let me explore this website a bit more", user_id=1)
  nice_weather = Post(content="Today is a nice weather.", user_id=1)

  first_post = [hi, whatisup, explore, nice_weather]

  #second set
  type_text = Post(content="What is this input box?", user_id = 1)
  press_button = Post(content="What will this button do? What happen if I press on it?", user_id = 1)

  testing = [type_text, press_button]

  #third set for user 2
  new_friend = Post(content="Let's make some new friends", user_id = 2)
  see_old_friend = Post(content="Let's make a reunion to meet some old friends", user_id = 2)

  second_user = [new_friend, see_old_friend]

  # add all data
  [db.session.add(post) for post in first_post]
  [db.session.add(post) for post in testing]
  [db.session.add(post) for post in second_user]
  db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()

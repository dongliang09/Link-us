from app.models import db, environment, SCHEMA, Post
from sqlalchemy.sql import text


def seed_posts():
  #first set
  hi = Post(content="Hello World", user_id=1)
  find_easter_egg = Post(user_id = 5, content="Are you looking for an Easter Egg?")
  get_advice = Post(content="Any advice for programming?", user_id=3)
  joke = Post(user_id=3, content="Post your programming joke here")

  first_post = [hi, find_easter_egg, get_advice, joke]

  # set for user 2
  good_sites = Post(user_id = 2,content="What are some good sites for learn new language")
  study_circle = Post(user_id = 2,content="Anyone wants to have a study circle?")

  second_user = [good_sites, study_circle]

  #wise words
  code_last = Post(user_id = 1, content="Typing codes should be the last thing you do")

  wise_words = [code_last]


  # add all data
  [db.session.add(post) for post in first_post]
  [db.session.add(post) for post in second_user]
  [db.session.add(post) for post in wise_words]
  db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()

from app.models import db, environment, SCHEMA, Comment
from sqlalchemy.sql import text

def seed_comments():
  # first set
  hi = Comment(content="Hello World x 2", post_id =1, user_id= 2)
  goodnight = Comment(content="Goodnight World.", post_id=1, user_id= 3)

  to_hello_world = [hi, goodnight]

  # second set
  place_suggestion = Comment(content="I heared kite island has a good view", post_id =8, user_id= 2)
  time_suggestion = Comment(content="How about Sunday afternoon?", post_id=8, user_id= 3)

  meetup = [place_suggestion, time_suggestion]

  # add all data
  [db.session.add(post) for post in to_hello_world]
  [db.session.add(post) for post in meetup]
  db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()

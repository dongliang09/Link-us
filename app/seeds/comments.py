from app.models import db, environment, SCHEMA, Comment
from sqlalchemy.sql import text

def seed_comments():
  # first set
  hi = Comment(content="Hello World x 2", post_id =1, user_id= 2)
  goodnight = Comment(content="Goodnight World.", post_id=1, user_id= 3)

  to_hello_world = [hi, goodnight]

  # second set
  work_flow = Comment(post_id =2, user_id= 2, content="Set up your model, then backend routes, then frontend")
  udemy = Comment(post_id=4, user_id= 3,content="Udemy")

  advice = [work_flow, udemy]

  set_up_discord = Comment(post_id =5, user_id= 2, content="I can set up a discord channel for meetings.")
  user3_join = Comment(post_id=5, user_id=3, content="I am in.")

  meeting_circle =[set_up_discord, user3_join]

  # add all data
  [db.session.add(comment) for comment in to_hello_world]
  [db.session.add(comment) for comment in advice]
  [db.session.add(comment) for comment in meeting_circle]
  db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()

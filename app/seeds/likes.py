from app.models import db, environment, SCHEMA, Like
from sqlalchemy.sql import text


def seed_likes():
  like1 = Like(post_id=2, user_id=1)
  like2 = Like(post_id=3, user_id=1)
  like3 = Like(post_id=7, user_id=1)

  like4 = Like(post_id=2, user_id=2)
  like5 = Like(post_id=4, user_id=2)
  like6 = Like(post_id=5, user_id=2)

  like7 = Like(post_id=1, user_id=5)
  like8 = Like(post_id=2, user_id=5)

  first_likes = [like1, like2, like3, like4, like5, like6, like7, like8]

  # add all data
  [db.session.add(like) for like in first_likes]
  db.session.commit()

def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))

    db.session.commit()

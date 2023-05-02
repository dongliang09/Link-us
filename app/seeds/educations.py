from app.models import db, environment, SCHEMA, Education
from sqlalchemy.sql import text

def seed_educations():
  #user1
  user1_high_school = Education(school="San Jose High School",  city="San Jose", user_id=1)
  user1_college = Education(major="Graphic Design", school="San Jose State University",  city="San Jose", user_id=1)

  user1_edu = [user1_high_school, user1_college]

  #user2
  user2_high_school = Education(school="Oakland Charter High School",  city="Oakland", user_id=2)
  user2_college = Education(major="Agriculture", school="University of California, Berkeley", city="Berkeley", user_id=2)
  user2_master = Education(major="Nutrition", school="Stanford University", city="Stanford", user_id=2)

  user2_edu = [user2_high_school, user2_college, user2_master]

  # add all data
  [db.session.add(edu) for edu in user1_edu]
  [db.session.add(edu) for edu in user2_edu]
  db.session.commit()

def undo_educations():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.educations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM educations"))

    db.session.commit()

from app.models import db, environment, SCHEMA, Skill
from sqlalchemy.sql import text

def seed_skills():
  #user1
  user1_trouble_shoot = Skill(skill="Troubleshoot", user_id=1)
  user1_microsoft_word = Skill(skill="Microsoft Word", user_id=1)

  user1_skills = [user1_trouble_shoot, user1_microsoft_word]

  #user3
  user3_public_speaking= Skill(skill="Public Speaking", user_id=3)

  user3_skills = [user3_public_speaking]

  # add all data
  [db.session.add(skill) for skill in user1_skills]
  [db.session.add(skill) for skill in user3_skills]
  db.session.commit()

def undo_skills():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.skills RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM skills"))

    db.session.commit()

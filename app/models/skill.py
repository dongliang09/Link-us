from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Skill(db.Model):
  __tablename__ = 'skills'

  if environment == "production":
      __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  skill = db.Column(db.String(75), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.now())

  user = db.relationship("User",back_populates="skills")

  def to_dict(self):
    return {
      'id': self.id,
      'skill': self.skill,
      'user_id': self.user_id,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }

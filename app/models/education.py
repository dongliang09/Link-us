from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Education(db.Model):
  __tablename__ = 'educations'

  if environment == "production":
      __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  major = db.Column(db.String(75))
  school = db.Column(db.String(75), nullable=False)
  city = db.Column(db.String(75), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.now())

  user = db.relationship("User",back_populates="educations")

  def to_dict(self):
    return {
      'id': self.id,
      'major': self.major,
      'school': self.school,
      'city': self.city,
      'user_id': self.user_id,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }

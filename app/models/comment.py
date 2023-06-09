from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
  __tablename__ = 'comments'

  if environment == "production":
      __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.String(255), nullable=False)
  image = db.Column(db.String(255))
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.now())

  user = db.relationship("User",back_populates="comments")

  post = db.relationship("Post",back_populates="comments")

  def to_dict(self):
    return {
      'id': self.id,
      'content': self.content,
      'image': self.image,
      'user_id': self.user_id,
      'post_id': self.post_id,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }

from flask import Blueprint, jsonify, request
from app.models import db, Comment
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms import CommentForm

comment_routes = Blueprint('comments', __name__)

#get all comments
@comment_routes.route('')
@login_required
def allComments():
  """
  Query all comments and return them in a list
  """
  comments = Comment.query.all()
  return {"comments": [comment.to_dict() for comment in comments]}

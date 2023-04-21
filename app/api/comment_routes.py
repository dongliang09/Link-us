from flask import Blueprint, jsonify, request
from app.models import db, Comment
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms import CommentForm
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

#================== get all comments ==================
@comment_routes.route('')
@login_required
def allComments():
  """
  Query all comments and return them as a list in dictionary value
  """
  comments = Comment.query.all()
  return {"comments": [comment.to_dict() for comment in comments]}


#================== create comment ==================
# it is on routes /api/posts/:postId/comments
# because it is resources related to selected post


#================== update comment ==================
@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def updateComment(id):
  """
  return edited comment if all properties pass validation of post
  """
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  foundComment = Comment.query.get(id)
  if foundComment:
    if form.validate_on_submit():
      foundComment.content = form.data['content']
      foundComment.updated_at = datetime.now()
      db.session.commit()
      return foundComment.to_dict()
    return {'error': validation_errors_to_error_messages(form.errors)},400
  else:
    return {'error':"comment not found"}, 404


#================== delete comment ==================
@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def removeComment(id):
  """
  Delete selected comment if found
  """
  foundComment = Comment.query.get(id)
  if foundComment:
    db.session.delete(foundComment)
    db.session.commit()
    return {"message":"comment deleted"}
  else:
    return {'error':"comment not found"}, 404

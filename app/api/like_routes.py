from flask import Blueprint, jsonify, request
from app.models import db, Like
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms import LikeForm
from datetime import datetime

like_routes = Blueprint('likes', __name__)


#================= get all likes ==================
@like_routes.route('')
@login_required
def allLikes():
  """
  Query all likes and return them as a list in dictionary value
  """
  likes = Like.query.all()
  return {"likes": [like.to_dict() for like in likes]}

#================== create new like ==================
# it is on routes /api/posts/:postId/likes
# because it is resources related to selected post

#================== update like ==================
## maybe needed if we want to change emoji?

#================== delete like ==================
@like_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def removeLike(id):
  """
  Delete selected like if found
  """
  foundLike = Like.query.get(id)
  if foundLike:
    db.session.delete(foundLike)
    db.session.commit()
    return {"message":"like deleted"}
  else:
    return {'error':"like not found"}, 404

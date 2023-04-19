from flask import Blueprint, jsonify, request
from app.models import db, User, Post
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms import PostForm

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def allPosts():
  """
  Query all posts and return them in a list
  """
  posts = Post.query.all()
  return [post.to_dict() for post in posts]

@post_routes.route('/', methods=['POST'])
def createPost():
  """
  return new post if all properties pass validation of post
  """
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_post = Post(
      content = form.data['content'],
      user_id = current_user.id
    )
    db.session.add(new_post)
    db.session.commit()
    return new_post.to_dict()
  return "Bad Data"

@post_routes.route('/<int:id>', methods=['PUT'])
def updatePost(id):
  """
  return edited post if all properties pass validation of post
  """
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    foundPost = Post.query.get(id)
    foundPost.content = form.data['content'],
    db.session.commit()
    return foundPost.to_dict()
  return "Bad Data"

@post_routes.route('/<int:id>')
def removePost(id):
  """
  Delete selected post if found
  """
  foundPost = Post.query.get(id)
  if foundPost:
    db.session.delete(foundPost)
    # return "post deleted"
    return foundPost.to_dict()
  else:
    return "not found"

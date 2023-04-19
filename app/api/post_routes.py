from flask import Blueprint, jsonify, request
from app.models import db, Post
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms import PostForm

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
@login_required
def allPosts():
  """
  Query all posts and return them in a list
  """
  posts = Post.query.all()
  return [post.to_dict() for post in posts]

@post_routes.route('/<int:id>')
@login_required
def onePost(id):
  """
  Query selected post and return it as dictionary
  """
  post = Post.query.get(id)
  return post.to_dict()

@post_routes.route('/', methods=['POST'])
@login_required
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
  return {'error':"Bad Data"}

@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def updatePost(id):
  """
  return edited post if all properties pass validation of post
  """
  form = PostForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  foundPost = Post.query.get(id)
  if foundPost:
    if form.validate_on_submit():
      foundPost.content = form.data['content']
      db.session.commit()
      return foundPost.to_dict()
    return {'error':"Bad Data"}
  else:
    return {'error':"post not found"}

@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def removePost(id):
  """
  Delete selected post if found
  """
  foundPost = Post.query.get(id)
  if foundPost:
    db.session.delete(foundPost)
    db.session.commit()
    return {"message":"post deleted"}
  else:
    return {'error':"post not found"}

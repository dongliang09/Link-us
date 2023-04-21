from flask import Blueprint, jsonify, request
from app.models import db, Post, Comment
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms import PostForm, CommentForm
from datetime import datetime

post_routes = Blueprint('posts', __name__)


#================= get all posts ==================
@post_routes.route('')
@login_required
def allPosts():
  """
  Query all posts and return them as a list in dictionary value
  """
  posts = Post.query.all()
  return {"posts": [post.to_dict() for post in posts]}


#================== get single post ================
@post_routes.route('/<int:id>')
@login_required
def onePost(id):
  """
  Query selected post and return it as dictionary
  """
  post = Post.query.get(id)
  return post.to_dict()


#================== create new post ==================
@post_routes.route('', methods=['POST'])
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
  return {'error': validation_errors_to_error_messages(form.errors)}, 400


#================== update post ==================
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
      foundPost.updated_at = datetime.now()
      db.session.commit()
      return foundPost.to_dict()
    return {'error': validation_errors_to_error_messages(form.errors)},400
  else:
    return {'error':"post not found"}, 404


#================== delete post ==================
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
    return {'error':"post not found"}, 404


#================== create comment ==================
@post_routes.route('/<int:id>/comments', methods=['POST'])
@login_required
def createNewComment(id):
  """
  return new comment if all properties pass validation of comment
  """
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  print(form.data, current_user.id)
  if form.validate_on_submit():
    new_comment = Comment(
      content = form.data['content'],
      user_id = current_user.id,
      post_id = id
    )
    db.session.add(new_comment)
    db.session.commit()
    return new_comment.to_dict()
  return {'error': validation_errors_to_error_messages(form.errors)}, 400

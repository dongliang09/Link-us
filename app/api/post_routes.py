from flask import Blueprint, jsonify, request
from app.models import db, Post, Comment, Like
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms import PostForm, CommentForm, LikeForm
from datetime import datetime
from .AWS_helpers import upload_file_to_s3, get_unique_filename, remove_file_from_s3

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
    #upload to aws
    image = form.data["image"]
    if (image):
      image.filename = get_unique_filename(image.filename)
      upload = upload_file_to_s3(image)

      if "url" not in upload:
          return {'errors':[upload]}, 400

      # store to database if we get url back
      new_post = Post(
        content = form.data['content'],
        image= upload["url"],
        user_id = current_user.id,
        created_at = datetime.now(),
        updated_at = datetime.now()
      )
    else:
      new_post = Post(
        content = form.data['content'],
        user_id = current_user.id,
        created_at = datetime.now(),
        updated_at = datetime.now()
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
  if foundPost.image:
    file_delete = remove_file_from_s3(foundPost.image)
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
      post_id = id,
      created_at = datetime.now(),
      updated_at = datetime.now()
    )
    db.session.add(new_comment)
    db.session.commit()
    return new_comment.to_dict()
  return {'error': validation_errors_to_error_messages(form.errors)}, 400

#================== create new like ==================
@post_routes.route('/<int:id>/likes', methods=['POST'])
@login_required
def createLike():
  """
  return new like if all properties pass validation of like
  """
  form = LikeForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_like = Like(
      post_id = id,
      user_id = current_user.id,
      created_at = datetime.now(),
      updated_at = datetime.now()
    )

    db.session.add(new_like)
    db.session.commit()
    return new_like.to_dict()
  return {'error': validation_errors_to_error_messages(form.errors)}, 400

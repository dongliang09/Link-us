from flask import Blueprint, jsonify, request
from app.models import db, User, Post
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms import PostForm

post_routes = Blueprint('posts', __name__)

@post_routes.route('/')
def allPosts():
  posts = Post.query.all()
  return [post.to_dict() for post in posts]

@post_routes.route('/', method=['POST'])
def createPost():
  posts = Post.query.all()

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

  if form.errors:
    return "Bad Data"

  return "create post default"

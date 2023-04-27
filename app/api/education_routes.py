from flask import Blueprint, jsonify, request
from app.models import db, Education
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms import CommentForm
from datetime import datetime

education_routes = Blueprint('education', __name__)

#================== get all comments ==================
@education_routes.route('')
@login_required
def allEducation():
  """
  Query all educations and return them as a list in dictionary value
  """
  educations = Education.query.all()
  return {"educations": [education.to_dict() for education in educations]}

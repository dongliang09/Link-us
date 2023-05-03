from flask import Blueprint, jsonify, request
from app.models import db, Education
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms import EducationForm
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

#================== create new education ==================
@education_routes.route('', methods=['POST'])
@login_required
def createEducation():
  """
  return new education if all properties pass validation of education
  """
  form = EducationForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_education = Education(
      major = form.data['major'],
      degree = form.data['degree'],
      school = form.data['school'],
      city = form.data['city'],
      user_id = current_user.id,
      created_at = datetime.now(),
      updated_at = datetime.now()
    )
    db.session.add(new_education)
    db.session.commit()
    return new_education.to_dict()
  return {'error': validation_errors_to_error_messages(form.errors)}, 400

#================== update post ==================
@education_routes.route('/<int:id>', methods=['PUT'])
@login_required
def updatePost(id):
  """
  return edited post if all properties pass validation of post
  """
  pass


#================== delete post ==================
@education_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def removeEducation(id):
  """
  Delete selected education if found
  """
  foundEducation = Education.query.get(id)
  if foundEducation:
    db.session.delete(foundEducation)
    db.session.commit()
    return {"message":"education deleted"}
  else:
    return {'error':"education not found"}, 404

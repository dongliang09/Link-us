from flask import Blueprint, jsonify, request
from app.models import db, Skill
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from ..forms import SkillForm
from datetime import datetime

skill_routes = Blueprint('skill', __name__)

#================== get all skills ==================
@skill_routes.route('')
@login_required
def allSkil():
  """
  Query all skills and return them as a list in dictionary value
  """
  skills = Skill.query.all()
  return {"skills": [skill.to_dict() for skill in skills]}

#================== create new skill ==================
@skill_routes.route('', methods=['POST'])
@login_required
def createSkill():
  """
  return new education if all properties pass validation of education
  """
  form = SkillForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    new_skill = Skill(
      skill = form.data['skill'],
      user_id = current_user.id,
      created_at = datetime.now(),
      updated_at = datetime.now()
    )
    db.session.add(new_skill)
    db.session.commit()
    return new_skill.to_dict()
  return {'error': validation_errors_to_error_messages(form.errors)}, 400

#================== update post ==================
@skill_routes.route('/<int:id>', methods=['PUT'])
@login_required
def updateSkill(id):
  """
  return edited education if all properties pass validation of education
  """
  form = SkillForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  foundSkill = Skill.query.get(id)
  if foundSkill:
    if form.validate_on_submit():
      foundSkill.skill = form.data['skill']
      foundSkill.updated_at = datetime.now()
      db.session.commit()
      return foundSkill.to_dict()
    return {'error': validation_errors_to_error_messages(form.errors)},400
  else:
    return {'error':"skill not found"}, 404


#================== delete post ==================
@skill_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def removeSkill(id):
  """
  Delete selected education if found
  """
  foundSkill = Skill.query.get(id)
  if foundSkill:
    db.session.delete(foundSkill)
    db.session.commit()
    return {"message":"skill deleted"}
  else:
    return {'error':"skill not found"}, 404

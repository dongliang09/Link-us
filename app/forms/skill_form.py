from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Skill

def data_info_length(form, field):
    # Checking the length of skill
    data_info = field.data
    if data_info and len(data_info) > 75:
        raise ValidationError('only accepts a maximum of 75 characters.')

class SkillForm(FlaskForm):
    skill = StringField('skill', validators=[DataRequired(), data_info_length])

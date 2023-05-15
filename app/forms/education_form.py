from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Education

def data_info_length(form, field):
    # Checking the length of educations
    data_info = field.data
    if data_info and len(data_info) > 75:
        raise ValidationError('only accepts a maximum of 75 characters.')

class EducationForm(FlaskForm):
    major = StringField('major', validators=[data_info_length])
    degree = StringField('degree', validators=[data_info_length])
    school = StringField('school', validators=[DataRequired(), data_info_length])
    city = StringField('city', validators=[DataRequired(), data_info_length])

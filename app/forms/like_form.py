from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Like

def data_range(form, field):
    # Checking the length of educations
    data_info = field.data
    if data_info < 1:
        raise ValidationError('like emoji at least start from 1.')

class LikeForm(FlaskForm):
    like_emoji = IntegerField('likeEmoji', validators=[data_range])

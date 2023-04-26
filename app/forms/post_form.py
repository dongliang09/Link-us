from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post

def post_length(form, field):
    # Checking the length of password
    post = field.data
    if len(post) > 255:
        raise ValidationError('Post only accepts a maximum of 255 characters.')

class PostForm(FlaskForm):
    content = StringField('content', validators=[DataRequired(), post_length])

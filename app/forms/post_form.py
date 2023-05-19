from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.models import Post

def post_length(form, field):
    # Checking the length of password
    post = field.data
    if len(post) > 255:
        raise ValidationError('Post only accepts a maximum of 255 characters.')

class PostForm(FlaskForm):
    content = StringField('content', validators=[DataRequired(), post_length])
    image = FileField('image', validators=[FileRequired(), FileAllowed(["png", "jpg", "jpeg", "gif"])])

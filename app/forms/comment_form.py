from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Comment

def comment_length(form, field):
    # Checking the length of password
    comment = field.data
    if len(comment) > 255:
        raise ValidationError('Comment only accepts a maximum of 255 characters.')

class CommentForm(FlaskForm):
    content = StringField('content', validators=[DataRequired(), comment_length])

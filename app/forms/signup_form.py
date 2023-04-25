from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def is_email(form, field):
    # Checking if email is valid
    email = field.data
    if "@" not in email or email.count("@") != 1 :
        raise ValidationError('Please enter a valid email. It must exactly one @ sign.')

def password_length(form, field):
    # Checking the length of password
    password = field.data
    if len(password) < 6:
        raise ValidationError('Please enter a password with 6 or more characters.')

class SignUpForm(FlaskForm):
    firstName = StringField('firstName', validators=[DataRequired()])
    lastName = StringField('lastName', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists, is_email])
    password = StringField('password', validators=[DataRequired(), password_length])

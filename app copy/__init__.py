from flask import Flask
import os


# Configuration settings
app = Flask(__name__)
app.config.from_object('config')

# import views
from app import views

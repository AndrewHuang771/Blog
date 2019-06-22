import os

class Config:
    SECRET_KEY = 'f53c29c05cf7c240d81618abec3c0b21'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///site.db'
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = 'ahuang773@gmail.com'
    MAIL_PASSWORD = 'HireMe4Job!'

# BlogBackend

How to push changes onto cloud:
1. Git push into this repo from local.
2. Git pull from remote.
3. sudo supervisorctl restart flaskblog

How to make db changes.
1. Make changes to models.py
2. Open python in terminal, make sure to use: alias python='winpty python.exe'
3. Run the following commands:
  >>> from app import db, create_app
  >>> db.drop_all(app=create_app())
  >>> db.create_all(app=create_app())

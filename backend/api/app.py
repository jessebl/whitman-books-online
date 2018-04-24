import os
from flask import Flask
from flask_restful import Api
from flask_jwt import JWT
from security import authenticate, identity
from resources.user import UserRegister
from resources.item import Item, ItemList

app = Flask(__name__)
if os.getenv('WBO_PRODUCTION_DB') == '1':
    # Relies on credentials in ~/.my.cnf to log into DB **OR**
    # Null password for backend user
    # 'backend' is MySQL user
    # 'localhost' is MySQL server
    # 'wbo' is the MySQL database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://backend:localhost/wbo'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False #turns off Flask-SQL Alchemy modification tracker, not underlying SQLAlchemy modification tracker
    pass
else:
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False #turns off Flask-SQL Alchemy modification tracker, not underlying SQLAlchemy modification tracker
app.secret_key = "Sean"
api = Api(app)

jwt = JWT(app, authenticate, identity) # calls authenticate and identity in security.py

api.add_resource(Item, "/item/<string:name>")
api.add_resource(ItemList, "/items")
api.add_resource(UserRegister, '/register')

if __name__ == '__main__': # prevents app from running when being imported from elsewhere
    from db import db # prevents circular import
    db.init_app(app)
    app.run(port=5000, debug=True)

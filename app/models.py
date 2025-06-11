from . import db, login_manager
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

class Region(db.Model):
    __tablename__ = 'regions'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)

class Route(db.Model):
    __tablename__ = 'routes'
    route_id = db.Column(db.String(64), primary_key=True)
    region_id = db.Column(db.Integer, db.ForeignKey('regions.id'))
    short_name = db.Column(db.String(50))
    long_name = db.Column(db.String(100))
    type = db.Column(db.String(20))

class Stop(db.Model):
    __tablename__ = 'stops'
    stop_id = db.Column(db.String(64), primary_key=True)
    region_id = db.Column(db.Integer, db.ForeignKey('regions.id'))
    name = db.Column(db.String(100))
    lat = db.Column(db.Float)
    lon = db.Column(db.Float)

class Trip(db.Model):
    __tablename__ = 'trips'
    trip_id = db.Column(db.String(64), primary_key=True)
    route_id = db.Column(db.String(64), db.ForeignKey('routes.route_id'))
    service_id = db.Column(db.String(64))
    headsign = db.Column(db.String(100))

class StopTime(db.Model):
    __tablename__ = 'stop_times'
    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.String(64), db.ForeignKey('trips.trip_id'))
    arrival_time = db.Column(db.String(8))
    departure_time = db.Column(db.String(8))
    stop_id = db.Column(db.String(64), db.ForeignKey('stops.stop_id'))
    sequence = db.Column(db.Integer)

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

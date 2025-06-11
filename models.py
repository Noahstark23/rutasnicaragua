from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class Region(db.Model):
    __tablename__ = 'regions'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)

    stops = db.relationship('Stop', backref='region', lazy=True)
    routes = db.relationship('Route', backref='region', lazy=True)


class Stop(db.Model):
    __tablename__ = 'stops'
    stop_id = db.Column(db.String, primary_key=True)
    region_id = db.Column(db.Integer, db.ForeignKey('regions.id'), nullable=False)
    name = db.Column(db.String, nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lon = db.Column(db.Float, nullable=False)

    stop_times = db.relationship('StopTime', backref='stop', lazy=True)


class Route(db.Model):
    __tablename__ = 'routes'
    route_id = db.Column(db.String, primary_key=True)
    region_id = db.Column(db.Integer, db.ForeignKey('regions.id'), nullable=False)
    short_name = db.Column(db.String)
    long_name = db.Column(db.String)
    type = db.Column(db.Integer)

    trips = db.relationship('Trip', backref='route', lazy=True)


class Trip(db.Model):
    __tablename__ = 'trips'
    trip_id = db.Column(db.String, primary_key=True)
    route_id = db.Column(db.String, db.ForeignKey('routes.route_id'), nullable=False)
    service_id = db.Column(db.String)
    headsign = db.Column(db.String)

    stop_times = db.relationship('StopTime', backref='trip', lazy=True)


class StopTime(db.Model):
    __tablename__ = 'stop_times'
    id = db.Column(db.Integer, primary_key=True)
    trip_id = db.Column(db.String, db.ForeignKey('trips.trip_id'), nullable=False)
    stop_id = db.Column(db.String, db.ForeignKey('stops.stop_id'), nullable=False)
    arrival_time = db.Column(db.String)
    departure_time = db.Column(db.String)
    stop_sequence = db.Column(db.Integer)

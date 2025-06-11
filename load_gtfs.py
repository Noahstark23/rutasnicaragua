import os
import pandas as pd
from flask import Flask
from models import db, Region, Stop, Route, Trip, StopTime
from config import DATABASE_URI

GTFS_DIR = os.path.join('data', 'gtfs')


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    return app


def load_data(app):
    with app.app_context():
        db.create_all()

        # assume a default region if not present
        region_name = os.getenv('DEFAULT_REGION', 'Managua')
        region = Region.query.filter_by(name=region_name).first()
        if not region:
            region = Region(name=region_name)
            db.session.add(region)
            db.session.commit()

        # stops
        stops_path = os.path.join(GTFS_DIR, 'stops.txt')
        if os.path.exists(stops_path):
            stops_df = pd.read_csv(stops_path)
            for _, row in stops_df.iterrows():
                stop = Stop(
                    stop_id=row['stop_id'],
                    region_id=region.id,
                    name=row['stop_name'],
                    lat=row['stop_lat'],
                    lon=row['stop_lon']
                )
                db.session.merge(stop)
            db.session.commit()

        # routes
        routes_path = os.path.join(GTFS_DIR, 'routes.txt')
        if os.path.exists(routes_path):
            routes_df = pd.read_csv(routes_path)
            for _, row in routes_df.iterrows():
                route = Route(
                    route_id=row['route_id'],
                    region_id=region.id,
                    short_name=row.get('route_short_name'),
                    long_name=row.get('route_long_name'),
                    type=row.get('route_type')
                )
                db.session.merge(route)
            db.session.commit()

        # trips
        trips_path = os.path.join(GTFS_DIR, 'trips.txt')
        if os.path.exists(trips_path):
            trips_df = pd.read_csv(trips_path)
            for _, row in trips_df.iterrows():
                trip = Trip(
                    trip_id=row['trip_id'],
                    route_id=row['route_id'],
                    service_id=row.get('service_id'),
                    headsign=row.get('trip_headsign')
                )
                db.session.merge(trip)
            db.session.commit()

        # stop_times
        stop_times_path = os.path.join(GTFS_DIR, 'stop_times.txt')
        if os.path.exists(stop_times_path):
            times_df = pd.read_csv(stop_times_path)
            for _, row in times_df.iterrows():
                st = StopTime(
                    trip_id=row['trip_id'],
                    stop_id=row['stop_id'],
                    arrival_time=row.get('arrival_time'),
                    departure_time=row.get('departure_time'),
                    stop_sequence=row.get('stop_sequence')
                )
                db.session.add(st)
            db.session.commit()


if __name__ == '__main__':
    app = create_app()
    load_data(app)

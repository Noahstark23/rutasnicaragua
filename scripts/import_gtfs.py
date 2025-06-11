import csv
import os
import pandas as pd
from app import create_app, db
from app.models import Region, Route, Stop, Trip, StopTime

app = create_app()

GTFS_FOLDER = 'data/gtfs'


def load_gtfs(region_name):
    region = Region.query.filter_by(name=region_name).first()
    if not region:
        region = Region(name=region_name)
        db.session.add(region)
        db.session.commit()

    files = {
        'routes': 'routes.txt',
        'stops': 'stops.txt',
        'trips': 'trips.txt',
        'stop_times': 'stop_times.txt'
    }
    for key, fname in files.items():
        path = os.path.join(GTFS_FOLDER, region_name, fname)
        if not os.path.exists(path):
            continue
        df = pd.read_csv(path)
        if key == 'routes':
            for _, row in df.iterrows():
                r = Route(route_id=row['route_id'], region_id=region.id,
                          short_name=row.get('route_short_name'),
                          long_name=row.get('route_long_name'),
                          type=row.get('route_type'))
                db.session.merge(r)
        elif key == 'stops':
            for _, row in df.iterrows():
                s = Stop(stop_id=row['stop_id'], region_id=region.id,
                         name=row.get('stop_name'),
                         lat=row.get('stop_lat'),
                         lon=row.get('stop_lon'))
                db.session.merge(s)
        elif key == 'trips':
            for _, row in df.iterrows():
                t = Trip(trip_id=row['trip_id'], route_id=row['route_id'],
                         service_id=row.get('service_id'),
                         headsign=row.get('trip_headsign'))
                db.session.merge(t)
        elif key == 'stop_times':
            for _, row in df.iterrows():
                st = StopTime(trip_id=row['trip_id'],
                              arrival_time=row.get('arrival_time'),
                              departure_time=row.get('departure_time'),
                              stop_id=row['stop_id'],
                              sequence=row.get('stop_sequence'))
                db.session.merge(st)
    db.session.commit()
    print(f"Imported GTFS for {region_name}")


if __name__ == '__main__':
    with app.app_context():
        region = os.environ.get('REGION', 'Managua')
        load_gtfs(region)

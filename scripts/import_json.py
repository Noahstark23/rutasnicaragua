import json
import sys
from app import create_app, db
from app.models import Region, Route, Stop

app = create_app()


def load_json(path, region_name):
    with open(path) as f:
        data = json.load(f)

    region = Region.query.filter_by(name=region_name).first()
    if not region:
        region = Region(name=region_name)
        db.session.add(region)
        db.session.commit()

    for route in data.get('routes', []):
        r = Route(route_id=route['id'], region_id=region.id,
                  short_name=route.get('short_name'),
                  long_name=route.get('long_name'),
                  type=route.get('type'))
        db.session.merge(r)
        for stop in route.get('stops', []):
            s = Stop(stop_id=stop['id'], region_id=region.id,
                     name=stop.get('name'),
                     lat=stop.get('lat'),
                     lon=stop.get('lon'))
            db.session.merge(s)
    db.session.commit()
    print(f"Imported JSON for {region_name}")


if __name__ == '__main__':
    with app.app_context():
        load_json(sys.argv[1], sys.argv[2])

from flask import Flask, jsonify, request
from models import db, Region, Route, Stop, Trip, StopTime
from config import DATABASE_URI


def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    @app.route('/api/regiones', methods=['GET'])
    def get_regiones():
        regiones = Region.query.all()
        return jsonify([{'id': r.id, 'name': r.name} for r in regiones])

    @app.route('/api/rutas', methods=['GET'])
    def get_rutas():
        region_name = request.args.get('region')
        query = Route.query
        if region_name:
            query = query.join(Region).filter(Region.name == region_name)
        rutas = query.all()
        return jsonify([
            {
                'route_id': r.route_id,
                'region': r.region.name,
                'short_name': r.short_name,
                'long_name': r.long_name,
                'type': r.type
            } for r in rutas
        ])

    @app.route('/api/paradas', methods=['GET'])
    def get_paradas():
        ruta_id = request.args.get('ruta')
        if not ruta_id:
            return jsonify({'error': 'ruta parameter required'}), 400
        stops = (
            Stop.query.join(StopTime).join(Trip)
            .filter(Trip.route_id == ruta_id)
            .distinct()
            .all()
        )
        return jsonify([
            {
                'stop_id': s.stop_id,
                'name': s.name,
                'lat': s.lat,
                'lon': s.lon,
                'region': s.region.name
            } for s in stops
        ])

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

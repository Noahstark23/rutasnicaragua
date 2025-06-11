from flask import Blueprint, jsonify, request
from .models import db, Region, Route, Stop

api_bp = Blueprint('api', __name__)

@api_bp.route('/regiones')
def regiones():
    regions = Region.query.all()
    return jsonify([{'id': r.id, 'name': r.name} for r in regions])

@api_bp.route('/rutas')
def rutas():
    region_name = request.args.get('region')
    query = Route.query
    if region_name:
        region = Region.query.filter_by(name=region_name).first()
        if region:
            query = query.filter_by(region_id=region.id)
        else:
            return jsonify([])
    routes = query.all()
    return jsonify([
        {
            'route_id': r.route_id,
            'short_name': r.short_name,
            'long_name': r.long_name,
            'type': r.type
        } for r in routes
    ])

@api_bp.route('/paradas')
def paradas():
    route_id = request.args.get('ruta')
    if not route_id:
        return jsonify([])
    stops = Stop.query.filter_by(region_id=Route.query.filter_by(route_id=route_id).first().region_id).all()
    return jsonify([
        {'stop_id': s.stop_id, 'name': s.name, 'lat': s.lat, 'lon': s.lon}
        for s in stops
    ])

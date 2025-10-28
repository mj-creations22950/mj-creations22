from datetime import datetime, timezone, date, time

def datetime_to_iso(dt) -> str:
    """Convert datetime object to ISO string for MongoDB storage"""
    if isinstance(dt, datetime):
        return dt.isoformat()
    elif isinstance(dt, date):
        return dt.isoformat()
    elif isinstance(dt, time):
        return dt.strftime('%H:%M:%S')
    return dt

def prepare_for_mongo(data: dict) -> dict:
    """Prepare data for MongoDB storage by converting datetime objects"""
    prepared = {}
    for key, value in data.items():
        if isinstance(value, (datetime, date, time)):
            prepared[key] = datetime_to_iso(value)
        elif isinstance(value, list):
            prepared[key] = [prepare_for_mongo(item) if isinstance(item, dict) else item for item in value]
        elif isinstance(value, dict):
            prepared[key] = prepare_for_mongo(value)
        else:
            prepared[key] = value
    return prepared

def parse_from_mongo(item: dict) -> dict:
    """Parse data from MongoDB by converting ISO strings back to datetime objects"""
    # For now, keep as strings - easier for JSON serialization
    return item

def get_current_timestamp() -> str:
    """Get current UTC timestamp as ISO string"""
    return datetime.now(timezone.utc).isoformat()

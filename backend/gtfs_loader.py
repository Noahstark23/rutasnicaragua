from pathlib import Path
import pandas as pd


def load_gtfs(gtfs_path: Path) -> dict:
    """Load GTFS files from a folder into pandas DataFrames."""
    data = {}
    for name in ["stops", "routes", "trips", "stop_times"]:
        file_path = gtfs_path / f"{name}.txt"
        if file_path.exists():
            data[name] = pd.read_csv(file_path)
    return data

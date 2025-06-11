import os
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv('DB_USER', 'user')
DB_PASSWORD = os.getenv('DB_PASSWORD', '')
DB_NAME = os.getenv('DB_NAME', 'database')
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = os.getenv('DB_PORT', '5432')
DB_DIALECT = os.getenv('DB_DIALECT', 'sqlite')

if DB_DIALECT == 'sqlite':
    DATABASE_URI = f'sqlite:///{DB_NAME}.sqlite3'
else:
    DATABASE_URI = (
        f"{DB_DIALECT}://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
    )

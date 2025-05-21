import pandas as pd
import random
import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
from dotenv import load_dotenv

try:
    print("Attempting to connect to MongoDB...")
    # Kết nối MongoDB
    load_dotenv()  
    mongo_url = os.getenv('MONGO_URL')
    print(f"Mongo URL: {mongo_url}")
    client = MongoClient(
        mongo_url,
        serverSelectionTimeoutMS=5000
    )
    db = client['bookstore']
    collection = db['books']

    # Kiểm tra kết nối
    client.admin.command('ping')
    print("Connected to MongoDB!")

    # Đọc file CSV
    print("Loading CSV file...")
    df = pd.read_csv('goodreads_bbe_dataset.csv')  # Cập nhật đường dẫn
    print(f"Loaded {len(df)} books from CSV")

    # Xử lý dữ liệu
    books = []
    for _, row in df.iterrows():
        genres = row['genres'] if pd.notna(row['genres']) else ""
        book = {
        'title':       row['title'] or 'Unknown',
        'authors':     [row['author']] if pd.notna(row['author']) else ['Unknown'],
        'publisher':   row['publisher'] if pd.notna(row['publisher']) else 'Unknown',
        'category':    [g.strip() for g in genres.split(',')] if genres else ['General'],
        'price':       random.randint(50000, 300000),
        'description': row['description'] if pd.notna(row['description']) else 'No description',
        'quantity':    random.randint(10, 1000),
        'coverImageUrl': row['coverImg'] if pd.notna(row['coverImg'])
                        else 'https://via.placeholder.com/150x200?text=No+Image'
        }
        books.append(book)

    # Nhập vào MongoDB
    if books:
        print("Inserting books into database...")
        collection.insert_many(books)
        print(f"Inserted {len(books)} books into bookstore.books")
    else:
        print("No books to insert")

except ConnectionFailure as e:
    print(f"Connection failure: {e}")
except ServerSelectionTimeoutError as e:
    print(f"Server selection timeout: {e}")
except FileNotFoundError:
    print("CSV file not found. Please check the file path.")
except Exception as e:
    print(f"An error occurred: {e}")
finally:
    print("Closing MongoDB connection...")
    client.close()
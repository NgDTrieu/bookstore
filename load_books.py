# load_books.py

import os
import csv
import random
import ast
from pymongo import MongoClient
from dotenv import load_dotenv


def load_books(csv_path):
    # 1. Load biến môi trường
    load_dotenv(override=True)
    mongo_url = os.getenv('MONGO_URL')
    if not mongo_url:
        raise RuntimeError("MONGO_URL chưa được thiết lập trong .env")

    # 2. Kết nối MongoDB
    client = MongoClient(mongo_url)
    db = client['bookstore']
    collection = db['books']

    # 3. Đọc CSV và build danh sách document
    docs = []
    with open(csv_path, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            # Xử lý lấy tác giả đầu tiên (cột 'author')
            raw_author = row.get('author', '')
            author = raw_author.split(',')[0].strip() if raw_author else ''
            authors = [author] if author else []

            # Xử lý danh mục (genres) từ cột 'genres'
            raw_genres = row.get('genres', '')
            try:
                categories = ast.literal_eval(raw_genres) if raw_genres else []
            except (ValueError, SyntaxError):
                # Fallback: nếu literal_eval thất bại, thử tách bằng dấu '|'
                categories = [g.strip() for g in raw_genres.split('|')] if raw_genres else []

            # Sinh ngẫu nhiên giá tiền từ 80,000 đến 400,000, chia hết cho 1,000
            price = random.randint(80, 400) * 1000

            # Sinh ngẫu nhiên quantity từ 10 đến 100
            quantity = random.randint(10, 100)

            # Tạo document
            doc = {
                'title': row.get('title', '').strip(),
                'authors': authors,
                'publisher': row.get('publisher', '').strip(),
                'category': categories,
                'price': price,
                'description': row.get('description', '').strip(),
                'quantity': quantity,
                'coverImageUrl': row.get('coverImg', '').strip(),
            }
            docs.append(doc)

    # 4. Insert vào collection
    if docs:
        result = collection.insert_many(docs)
        print(f"Inserted {len(result.inserted_ids)} documents into 'books' collection.")
    else:
        print("No documents to insert.")

    client.close()


if __name__ == '__main__':
    # Thay đường dẫn tới file CSV tương ứng
    csv_file = './goodreads_bbe_dataset.csv'
    load_books(csv_file)

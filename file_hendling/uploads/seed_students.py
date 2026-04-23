import mysql.connector
from faker import Faker
import random

# 1. Initialize Faker
fake = Faker()

# 2. Database Connection Configuration
db_config = {
    'host': 'localhost',
    'user': 'nilesh',         # Your MySQL username
    'password': 'root', # Your MySQL password
    'database': 'test'
}

def seed_data(num_records=10000):
    try:
        # 3. Connect to MySQL
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor()
        print(f"Connecting to database... Starting to insert {num_records} records.")

        # 4. Prepare the SQL query
        sql = """INSERT INTO students 
                 (first_name, last_name, email, contect_number, city, gender, dob) 
                 VALUES (%s, %s, %s, %s, %s, %s, %s)"""

        records = []
        for i in range(num_records):
            # Generate fake data
            gender = random.choice(['Male', 'Female', 'Other'])
            first_name = fake.first_name_male() if gender == 'Male' else fake.first_name_female()
            last_name = fake.last_name()
            
            # Assemble record
            data = (
                first_name,
                last_name,
                fake.unique.ascii_free_email(), # Unique email
                fake.phone_number()[:20],       # Limit to 20 chars
                fake.city(),
                gender,
                fake.date_of_birth(minimum_age=18, maximum_age=30)
            )
            records.append(data)

            # 5. Batch insert every 1000 records for performance
            if len(records) == 1000:
                cursor.executemany(sql, records)
                conn.commit()
                print(f"Inserted {i + 1} records...")
                records = []

        # Insert any remaining records
        if records:
            cursor.executemany(sql, records)
            conn.commit()

        print("Success! 10,000 records inserted.")

    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == "__main__":
    seed_data(10000)

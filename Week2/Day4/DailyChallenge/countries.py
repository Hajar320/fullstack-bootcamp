import psycopg2
import requests
import random
from conn import connect_db

def create_table():
    """Create the countries table if it doesn't exist"""
    print("Step 1: Creating table...")
    try:
        conn = connect_db()
        if conn is None:
            print("✗ Cannot connect to database")
            return False
            
        cur = conn.cursor()
        
        create_table_query = """
        CREATE TABLE IF NOT EXISTS countries (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            capital VARCHAR(100),
            flag VARCHAR(255),
            subregion VARCHAR(100),
            population INTEGER
        );
        """
        
        cur.execute(create_table_query)
        conn.commit()
        cur.close()
        conn.close()
        print("✓ Table created successfully!")
        return True
        
    except Exception as e:
        print(f"✗ Error creating table: {e}")
        return False

def fetch_random_countries():
    """Fetch 10 random countries from the REST Countries API"""
    print("Step 2: Fetching countries from API...")
    
    try:
        # Get ALL countries from the API
        response = requests.get('https://restcountries.com/v3.1/all?fields=name,capital,flags,subregion,population')
        
        # Check if request was successful
        if response.status_code != 200:
            print("✗ Failed to fetch data from API")
            return []
        
        # Convert JSON response to Python dictionary
        all_countries = response.json()
        print(f"✓ Found {len(all_countries)} countries total")
        
        # Pick 10 random countries
        random_countries = random.sample(all_countries, 10)
        print("✓ Selected 10 random countries")
        
        # Extract the data we need from each country
        countries_data = []
        for country in random_countries:
            country_info = {
                'name': country.get('name', {}).get('common', 'Unknown'),
                'capital': country.get('capital', ['Unknown'])[0] if country.get('capital') else 'Unknown',
                'flag': country.get('flags', {}).get('png', ''),
                'subregion': country.get('subregion', 'Unknown'),
                'population': country.get('population', 0)
            }
            countries_data.append(country_info)
            print(f"  - {country_info['name']}")
        
        return countries_data
        
    except Exception as e:
        print(f"✗ Error: {e}")
        return []

def insert_countries(countries_data):
    """Insert countries data into the database"""
    print("Step 3: Inserting countries into database...")
    
    try:
        # Connect to database
        conn = connect_db()
        if conn is None:
            print("✗ Cannot connect to database")
            return
            
        cur = conn.cursor()
        
        # SQL query to insert data
        insert_query = """
        INSERT INTO countries (name, capital, flag, subregion, population)
        VALUES (%s, %s, %s, %s, %s)
        """
        
        # Insert each country one by one
        for country in countries_data:
            cur.execute(insert_query, (
                country['name'],
                country['capital'],
                country['flag'],
                country['subregion'],
                country['population']
            ))
            print(f"  ✓ Inserted {country['name']}")
        
        # Save changes to database
        conn.commit()
        print("✓ All countries inserted successfully!")
        
    except Exception as e:
        print(f"✗ Error inserting data: {e}")
        if 'conn' in locals():
            conn.rollback()
    
    finally:
        # Always close connection
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()

def display_countries():
    """Display the countries from the database"""
    print("Step 4: Displaying countries from database...")
    
    try:
        # Connect to database
        conn = connect_db()
        if conn is None:
            print("✗ Cannot connect to database")
            return
            
        cur = conn.cursor()
        
        # SQL query to get the last 10 inserted countries
        cur.execute("""
            SELECT name, capital, subregion, population 
            FROM countries 
            ORDER BY id DESC 
            LIMIT 10
        """)
        
        # Fetch all results
        countries = cur.fetchall()
        
        print("\n" + "="*70)
        print("COUNTRIES IN DATABASE:")
        print("="*70)
        
        # Display each country
        for country in countries:
            name, capital, subregion, population = country
            print(f"📍 {name}")
            print(f"   Capital: {capital}")
            print(f"   Subregion: {subregion}")
            print(f"   Population: {population:,}")
            print("-" * 50)
        
        print(f"Total countries in database: {len(countries)}")
        
    except Exception as e:
        print(f"✗ Error reading data: {e}")
    
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()

def main():
    """Main function to run the entire process"""
    print("🚀 STARTING COUNTRY DATA IMPORT")
    print("=" * 50)
    
    # Step 1: Create table (optional - uncomment if needed)
    # create_table()
        
    # Step 2: Fetch random countries from API
    countries_data = fetch_random_countries()
    
    if not countries_data:
        print("✗ No data fetched. Exiting.")
        return
    
    # Step 3: Insert into database
    insert_countries(countries_data)
    
    # Step 4: Display results
    display_countries()
    
    print("✅ PROCESS COMPLETED SUCCESSFULLY!")

# This runs the main function when the script is executed
if __name__ == "__main__":
    main()
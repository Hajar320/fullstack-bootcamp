import psycopg2


def get_db_connection():
    return psycopg2.connect(
           database="Menu_items",
           user="postgres",
           password="123456789",
           host="localhost",
           port="5432" 
    
)

class MenuItem:
  def __init__(self,name,price):
      self.name=name
      self.price=price
    
  def save(self):
        """Save the current item to the database"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        try:
            # Correct SQL syntax - use the actual column names from your table
            query = "INSERT INTO menu_items (item_name, item_price) VALUES (%s, %s) RETURNING item_id"
            cursor.execute(query, (self.name, self.price))
            
            # Get the generated ID

            item_id = cursor.fetchone()[0]
            conn.commit()
            
            print(f"Item '{self.name}' saved successfully with ID: {item_id}")
            return item_id
            
        except psycopg2.Error as e:
            print(f"Error saving item: {e}")
            conn.rollback()
            return None
        finally:
            cursor.close()
            conn.close()
        

  def delete(self):
        conn = get_db_connection()
        cursor = conn.cursor()
        
        try:
            
             query = "DELETE FROM menu_items where item_name = %s "
             cursor.execute(query,(self.name,))
             conn.commit()
            
             print(f"Item '{self.name}' delleted successfully")
             return True 
            
        except psycopg2.Error as e:
            print(f"Error deleting item: {e}")
            conn.rollback()
            return False
        
        finally:
            cursor.close()
            conn.close()

  def update(self,new_name,new_price):
      conn =get_db_connection()
      cursor=conn.cursor()
      
      try :
          query ="update menu_items set item_name = %s, item_price = %s WHERE item_name = %s"
          cursor.execute(query,(new_name,new_price,self.name))
          conn.commit()
          self.name = new_name
          self.price = new_price
          print(f"Item '{self.name}' was successfully updated")
          return True 
            
      except psycopg2.Error as e:
            print(f"Error updating item: {e}")
            conn.rollback()
            return False
        
      finally:
            cursor.close()
            conn.close()









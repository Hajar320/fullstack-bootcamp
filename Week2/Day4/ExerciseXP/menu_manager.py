from menu_item import MenuItem
import psycopg2
from index import connect_db as get_db_connection

class MenuManager:
    
    @classmethod
    def get_by_name(cls,name):

        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            query ="select * from menu_items where item_name = %s"
            cursor.execute(query,(name,))
            result = cursor.fetchone()

            if result:
                 item_id, item_name, item_price = result
                 return MenuItem(item_name, item_price)
            return None


        except psycopg2.Error as e:
            print(f"Error fetching item: {e}")
            return None
        finally:
            cursor.close()
            conn.close()


    @classmethod
    def all_items(cls):
         
        conn = get_db_connection()
        cursor = conn.cursor()

        try:
            query ="select * from menu_items "
            cursor.execute(query)
            results = cursor.fetchall()

            items=[]
            for result in results :
                 item_id, item_name, item_price = result
                 items.append(MenuItem(item_name, item_price))
            return items

          

        except psycopg2.Error as e:
            print(f"Error fetching items: {e}")
            return []
        finally:
            cursor.close()
            conn.close()





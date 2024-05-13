import mysql.connector
import getpass
import os
from datetime import date
import json

#Handles operations relating to the MySQL database
class MySQLHandler:

    def __init__(self):

        self.db = mysql.connector.connect(
            host=os.environ.get("DB_HOST"),
            user=os.environ.get("DB_USER"),
            password=os.environ.get("DB_PASS"),
            database=os.environ.get("DB_NAME")
        )

        self.cursor = self.db.cursor()

        print(self.db)

    # def __del__(self):
    #     self.cursor.close()

    #Gets data from the columns and tables specified. Expecting a tuple of size 2 in format (table, columns). Where columns is a non key value iterable
    def get_data(self, *args):

        #create a dictionary containing the data for each column
        db_data = {}

        for entry in args:

            if not isinstance(entry, (tuple, list)) or len(entry) != 2:

                raise TypeError("Arguments must be in list or tuple for (table, [columns]) where table is a string and columns is a list or tuple of strings")

            table, columns = entry

            if not isinstance(columns, (tuple, list)):

                raise TypeError("Columns must be in list or tuple (column1, column2, column3,...) where each column name is a string")

            else:
                query_columns = ', '.join(columns)
                self.cursor.execute("SELECT {} FROM {}".format(query_columns, table))
                db_data[table] = self.cursor.fetchall()

            #Convert single element tuples to strings for ease of use
            for i in range(len(db_data[table])):

                if len(db_data[table][i]) == 1:

                    db_data[table][i] = db_data[table][i][0]

        return db_data
    
    #Add a new order to the database Orders table
    def insert_order(self, cart, customer_info):

        insert_query = f'''INSERT INTO Orders(customer_name, customer_email, customer_phone, date_ordered, date_fulfilled, time_fulfilled, order_contents) 
                    VALUES
                    ('{customer_info['name']}', 
                    '{customer_info['email']}', 
                    '{customer_info['phone']}', 
                    '{date.today().strftime("%Y-%m-%d")}',
                    '{customer_info['date']}',
                    '{customer_info['time']}:00',
                    '{json.dumps(cart)}')
                '''
        
        self.cursor.execute(insert_query)
        self.db.commit()

        order_num = self.get_data(('Orders', ['order_id']))['Orders'][-1]

        return order_num


if __name__ == "__main__":

    finish = False
    handler = MySQLHandler()

    while(not finish):

        result = handler.get_data(("MenuItems", ("item_name",)))
        print(result)
        finish = input()


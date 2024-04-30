import mysql.connector
import getpass

#Handles operations relating to the MySQL database
class MySQLHandler:

    def __init__(self):

        self.db = mysql.connector.connect(
            host="localhost",
            user=input("Database Username: "),
            password=getpass.getpass("Database Password: "),
            database=input("Database: ")
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

        return db_data

            




if __name__ == "__main__":

    finish = False
    handler = MySQLHandler()

    while(not finish):

        result = handler.get_data(("MenuItems", ("item_name",)))
        print(result)
        finish = input()


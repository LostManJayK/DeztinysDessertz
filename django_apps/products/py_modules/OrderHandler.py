import smtplib
import getpass




class OrderHandler:

    def __init__(self):
        self.order = []

        self.value_map = {
            'Name' : 'Name',
            'cake_type' : 'Cake Type',
            'cake_flavour' : 'Cake Flavour',
            'cake_filling' : 'Cake Filling',
            'cake_size' : 'Cake Size',
            'cake_shape' : 'Cake Shape',
            'num_tiers' : 'Tiers',
            'num_layers' : 'Layers per Tier',
            'cupcake_flavour' : 'Cupcake Flavour',
            'cupcake_filling' : 'Filling',
            'num_cupcakes' : 'Count',
            'snack_type': 'Type',
            'snack_coating' : 'Coating',
            'num_snacks' : 'Count',
            'snack_colour' : 'Colour',
            'strawberry' : 'Strawberry',
            'chocolate' : 'Chocolate',
            'boston_cream' : 'Boston Cream',
            'vanilla' : 'Vanilla',
            'velvet' : 'Red Velvet',
            'nobake_cc' : 'No-Bake Cheesecake',
            'bake_cc' : 'Baked Cheesecake',
            'angel' : 'Angel Food',
            'ganache' : 'Ganache',
            'marshmallow' : 'Marshmallow',
            'circle' : 'Circle',
            'square' : 'Square',
            'heart' : 'Heart',
            'tiered' : 'Tiered',
            'layered' : 'Layered',
            'sheet' : 'Sheet'
            
        }

    #Format the JSON string for the email
    def format_email(self):
        pass

    def replace_keyval(self, cart):

        new_cart = []

        for item in cart:

            new_item = {}
            print(f'Item: {item}')

            for detail in item:

                print(detail)

                if 'other' in detail:
                    continue

                new_key = self.value_map[detail]

                if item[detail].lower() == 'other':

                    new_item[new_key] = item[f'other_{detail}'].title()

                elif item[detail] in self.value_map:

                    new_item[new_key] = self.value_map[item[detail]]

                else:

                    new_item[new_key] = item[detail].title()

            new_cart.append(new_item)


        return new_cart


    
    #Send the email containing email details
    def send_order_confirmation(self):

        print("Setting up SMTP")
        
        smtp_object = smtplib.SMTP('smtp.gmail.com', 587) #465 alt

        print(smtp_object.ehlo())

        print(smtp_object.starttls())
        
        email = input('Email: ')
        password = getpass.getpass('Password: ')
        print(smtp_object.login(email, password))

        from_email = email
        to_email = email
        subject = "ORDER #TEST - Confirmation"
        message = "Order Contents"

        msg = f"Subject: {subject}\n{message}"

        smtp_object.sendmail(from_email, to_email, msg)




if __name__ == "__main__":

    o = OrderHandler()
    
    o.send_order_confirmation()
        
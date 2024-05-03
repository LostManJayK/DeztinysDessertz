import smtplib
import getpass
import os

#Handles operations relating to the cart and ordering
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
            'num_layers' : 'Layers',
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
            'sheet' : 'Sheet',
            'cake_notes' : 'Notes',
            'cupcake_notes' : 'Notes',
            'dipped_dessert_notes' : 'Notes',
            'other_dessert_notes' : 'Notes',
            'something_else_notes' : 'Notes',
            'request_name' : 'Request Name',
            'other_cake_flavour' : 'Cake Flavour',
            

        }

    #Format the JSON string for the email
    def format_email(self, cart, customer_info):

        cart_data = cart
        cart_data = self.replace_keyval(cart_data)
        
        base_dir = os.path.dirname(os.path.abspath(__file__))
        tmplt_path = os.path.join(base_dir, 'email_content', 'email.html')

        with open(tmplt_path) as email_template:
            html_str = email_template.read()
        email_template.close()
        

        items_html = ""
        
        print(cart_data)
        for item in cart_data:

            items_html += '<tr style="height:200px">'
            description = ""
            order_num = 123456

            items_html += '<td>'

            for detail in item:

                if detail == 'Name':
                    description += f'<div style="white-space:pre-line; text-align:left; font-weight:bold;">Type: {item[detail][:-1:1]}</div>'
                else:
                    description += f'<div style="white-space: pre-line; text-align: left">{detail}: {item[detail]}</div>'

            items_html += description
            items_html += "</td>"

            items_html += '<td style="text-align:left;">0.00</td>'
            items_html += '<td style="text-align:left;">0.00</td>'

            items_html += "</tr>"

        html_str = html_str.format(
            items_html=items_html, 
            order_num=order_num, 
            customer_name=customer_info['name'],
            customer_email=customer_info['email'],
            customer_phone=customer_info['phone'],
            order_date=customer_info['date'],
            order_time=customer_info['time'], 
            total="0.00"
        )

        


        return html_str

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
    def send_order_confirmation(self, html_str, customer_email):

        print("Setting up SMTP")
        
        smtp_object = smtplib.SMTP('smtp.gmail.com', 587) #465 alt

        print(smtp_object.ehlo())

        print(smtp_object.starttls())
        
        email = os.environ.get("DD_APP_EMAIL")
        password = os.environ.get("DD_APP_PASS")
        print(smtp_object.login(email, password))

        from_email = email
        to_email = customer_email
        subject = "ORDER #TEST - Confirmation"
        message = html_str

        msg = f"Subject: {subject}\n"
        msg += "Content-Type: text/html\n\n"  # Set content type to HTML
        msg += html_str

        smtp_object.sendmail(from_email, to_email, msg)
        smtp_object.sendmail(from_email, from_email, msg)

        smtp_object.quit()




if __name__ == "__main__":

    o = OrderHandler()
    
    o.send_order_confirmation()
        
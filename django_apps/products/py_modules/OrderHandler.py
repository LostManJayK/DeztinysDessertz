import smtplib
import getpass
import os

def get_html(tmplt_name):

    base_dir = os.path.dirname(os.path.abspath(__file__))
    tmplt_path = os.path.join(base_dir, 'email_content', f'{tmplt_name}_email.html')

    with open(tmplt_path) as email_template:
        html_str = email_template.read()
    email_template.close()

    return html_str

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
            'dipped_dessert_type' : 'Dessert Type',
            'dipped_dessert_coating' : 'Coating',
            'num_dipped_desserts' : 'Quantity',
            'other_dipped_dessert_type' : 'Dessert Type',
            'dipped_dessert_notes' : 'Notes',
            'other_dessert_notes' : 'Notes',
            'something_else_notes' : 'Notes',
            'request_name' : 'Request Name',
            'other_cake_flavour' : 'Cake Flavour',
            'other_dessert_type' : 'Dessert Type',
            'num_other_desserts' : 'Quantity',
            'other_dessert_notes' : 'Notes'
        }

    

    #Format the JSON string for the catering email
    def format_catering_email(self, catering):

        catering_data = catering

        html_str = get_html('catering')
        customer_info = catering['customer_info']
        catering_details = catering['catering_details'].replace('\n', '<br><br>')

        html_str = html_str.format(
            customer_first=customer_info['first_name'],
            customer_last=customer_info['last_name'],
            customer_email=customer_info['email'],
            customer_phone=customer_info['phone'],
            event_name=customer_info['event_title'],
            catering_date=customer_info['date'],
            catering_time=customer_info['time'],
            duration=customer_info['duration'],
            headcount=customer_info['count'],
            dress_code=customer_info['dress'],
            catering_details=catering_details
        )

        return html_str



       

    #Format the JSON string for the order email
    def format_order_email(self, cart, customer_info, order_num):

        cart_data = cart
        cart_data = self.replace_keyval(cart_data)

        html_str = get_html('order')

        items_html = ""

        for item in cart_data:

            items_html += '<tr style="height:200px">'
            description = ""
            order_num = order_num

            items_html += '<td>'

            for detail in item:

                if detail == 'Name':
                    description += f'<div style="white-space:pre-line; text-align:left; font-weight:bold;">Type: {item[detail][:-1:1]}</div>'
                else:
                    description += f'<div style="white-space: pre-line; text-align: left">{detail}: {item[detail]}</div>'

            items_html += description
            items_html += "</td>"

            items_html += "</tr>"

        html_str = html_str.format(
            items_html=items_html, 
            order_num=order_num, 
            customer_name=customer_info['name'],
            customer_email=customer_info['email'],
            customer_phone=customer_info['phone'],
            order_date=customer_info['date'],
            order_time=customer_info['time']
        )

        return html_str

    def replace_keyval(self, cart):

        new_cart = []

        for item in cart:

            new_item = {}


            for detail in item:
                if 'other' in detail and not 'other_dessert' in detail:
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
    def send_order_confirmation(self, html_str, customer_email, email_type, order_num=0, event_name=""):

        subjects = {
            'order' : f"ORDER #{order_num} - Confirmation",
            'catering' : f'Catering Request -  {event_name}'
        }

        print("Setting up SMTP")
        
        smtp_object = smtplib.SMTP('smtp.gmail.com', 587) #465 alt

        print(smtp_object.ehlo())

        print(smtp_object.starttls())
        
        email = os.environ.get("DD_APP_EMAIL")
        password = os.environ.get("DD_APP_PASS")
        print(smtp_object.login(email, password))

        from_email = email
        to_email = customer_email
        subject = subjects[email_type]
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
        

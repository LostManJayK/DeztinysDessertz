import smtplib
import getpass




class OrderHandler:

    def __init__(self, order):
        self.order = order

    #Format the JSON string for the email
    def format_json(self):
        pass
    
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
        
from django.shortcuts import render
from django.http import JsonResponse
from .py_modules.OrderHandler import OrderHandler
from .py_modules.SQLHandler import MySQLHandler
from urllib.parse import parse_qs
import json
import os


# Create your views here.

def index(request):
    return render(request, "index.html")

def menu(request):

    handler = MySQLHandler()
    menu_data = handler.get_data(
        ("MenuItems", ("item_name",)),
        ("CakeOptions", ("option_name", "option_id", "option_list")),
        ("CupcakeOptions", ("option_name", "option_id", "option_list")),
        ("DippedDessertOptions", ("option_name", "option_id", "option_list")),
        ("OtherDessertOptions", ("option_name", "option_id", "option_list")),
        ("RequestOptions", ("option_name", "option_id")),
        ("CakeTypes", ("type_name",)),
        ("CakeTiers", ("tier_vals",)),
        ("CakeLayers", ("layer_vals",)),
        ("CakeFlavours", ("flavour_name",)),
        ("CakeFillings", ("filling_name",)),
        ("CakeShapes", ("shape_name",)),
        ("CakeSizes", ("size",)),
        ("CupcakeQuantities", ("quantity",)),
        ("DippedDessertTypes", ("type_name",)),
        ("Coatings", ("coating_name",)),
        ("DippedDessertQuantities", ("quantity",)),
        ("OtherDessertTypes", ("type_name",)),
        ("OtherDessertQuantities", ("quantity",))
    )

    return render(request, "menu.html", {"menu_data" : menu_data})

def requests(request):
    return render(request, "requests.html")


def about(request):

    #Set the filepath to the images
    base_dir = os.path.dirname(os.path.abspath(__file__))
    base_dir = os.path.join(base_dir, '..')
    img_path = os.path.join(base_dir, 'static', 'images', 'gallery_images')

    #Retrive gallery image filenames
    img_filenames = [filename for filename in os.listdir(img_path) if filename != '.DS_Store']


    return render(request, "about.html", {"img_filenames" : img_filenames})


def catering(request):
    return render(request, "catering.html")


#Cart Functions
def cart(request):

    handler = OrderHandler()

    cart_data = request.session.get("cart", [])

    cart_data = handler.replace_keyval(cart_data)
 
    return render(request, "cart.html", {"cart_data" : cart_data})

#Confirmation page
def confirmation(request):

    return render(request, 'confirmation.html')


def add_to_cart(request):

    handler = OrderHandler()

    #Create the cart in session storage
    cart = request.session.get('cart', [])

    if request.method == 'POST':

        cart.append(json.loads(request.body.decode()))
        request.session['cart'] = cart
        #request.session.modified = True
        request.session.save()
        #request.session.modified = False

        # for item in request.session['cart']:
        #     print(f'\n{item}\n')

        return JsonResponse({'message': 'Item added to cart successfully'})

    else:

        return JsonResponse({'error': 'Invalid request method'}, status=400)


def remove_from_cart(request):

    cart = request.session.get('cart', [])
    item_index = int(json.loads(request.body.decode())['item_index']) - 1


    if request.method == 'POST':

        cart.pop(item_index)
        request.session['cart'] = cart
        request.session.modified = True
        request.session.save()
        request.session.modified = False
        return JsonResponse({'message': 'Item removed from cart successfully'})
    else:

        return JsonResponse({'error': 'Invalid request method'}, status=400)


def submit_order(request):

    order_handler = OrderHandler()

    print('DEBUG: Order Handler Created')

    sql_handler = MySQLHandler()

    print('DEBUG: SQL Handler Created')

    cart = request.session['cart']

    print(f'DEBUG:  Cart:\n{cart}')

    print(f'DEBUG: {request.method == "POST"}')

    if request.method == 'POST':

        print('DEBUG: POST ENTERED')

        customer_info = json.loads(request.body.decode())

        print(f'DEBUG: CustomerInfo:\n{customer_info}')

        order_num = sql_handler.insert_order(cart, customer_info)

        print(f'DEBUG: OrderNum: {order_num}')

        html_str = order_handler.format_order_email(cart, customer_info, order_num)

        order_handler.send_order_confirmation(html_str, customer_info['email'], 'order', order_num=order_num)

        del request.session['cart']

        return JsonResponse({'message': 'Order Submitted'})

    else:

        return JsonResponse({'error': 'Invalid request method'}, status=400)

def send_catering_request(request):

    handler = OrderHandler()

    if request.method == 'POST':

        catering_data = json.loads(request.body.decode())

        customer_info = catering_data['customer_info']

        html_str = handler.format_catering_email(catering_data)

        handler.send_order_confirmation(html_str, customer_info['email'], 'catering', event_name=customer_info['event_title'])

        return JsonResponse({'message': 'Catering Request Sent'})

    else:

        return JsonResponse({'error': 'Invalid request method'})

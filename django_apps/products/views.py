from django.shortcuts import render
from django.http import JsonResponse
from .py_modules.OrderHandler import OrderHandler
from urllib.parse import parse_qs
import json


# Create your views here.

def index(request):
    return render(request, "index.html")

def menu(request):
    return render(request, "menu.html")

def requests(request):
    return render(request, "requests.html")

def profile(request):
    return render(request, "profile.html")

def catering(request):
    return render(request, "catering.html")


#Cart Functions
def cart(request):

    handler = OrderHandler()

    cart_data = request.session.get("cart", [])
    cart_data = handler.replace_keyval(cart_data)
   
    return render(request, "cart.html", {"cart_data" : cart_data})


def add_to_cart(request):

    handler = OrderHandler()

    #Create the cart in session storage
    cart = request.session.get('cart', [])

    if request.method == 'POST':

        cart.append(json.loads(request.body.decode()))
        request.session['cart'] = cart
        request.session.save()

        for item in request.session['cart']:
            print(f'\n{item}\n')

        return JsonResponse({'message': 'Item added to cart successfully'})

    else:

        return JsonResponse({'error': 'Invalid request method'}, status=400)


def remove_from_cart(request):
    
    cart = request.session.get('cart', [])
    item_index = int(json.loads(request.body.decode())['item_index']) - 1

    print(item_index)

    if request.method == 'POST':

        cart.pop(item_index)
        request.session['cart'] = cart
        request.session.save()
        return JsonResponse({'message': 'Item removed from cart successfully'})

    else:

        return JsonResponse({'error': 'Invalid request method'}, status=400)


def submit_order(request):

    handler = OrderHandler()

    cart = request.session['cart']

    if request.method == 'POST':

        customer_info = json.loads(request.body.decode())

        html_str = handler.format_email(cart, customer_info)

        handler.send_order_confirmation(html_str, customer_info['email'])

        return JsonResponse({'message': 'Order Submitted'})

    else:

        return JsonResponse({'error': 'Invalid request method'}, status=400)


    

    

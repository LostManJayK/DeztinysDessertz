from django.shortcuts import render
from django.http import JsonResponse
from .py_modules.OrderHandler import OrderHandler
from urllib.parse import parse_qs


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

def cart(request):
    return render(request, "cart.html")

def add_to_cart(request):

    #Create the cart in session storage
    cart = request.session.get('cart', [])

    if request.method == 'POST':

        cart.append(request.body.decode())
        request.session['cart'] = cart
        request.session.save()

        for item in request.session['cart']:
            print(f'\n{item}\n')

        return JsonResponse({'message': 'Item added to cart successfully'})

    else:

        return JsonResponse({'error': 'Invalid request method'}, status=400)




    

    

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
    if 'cart' not in request.session:
        request.session['cart'] = []

    if request.method == 'POST':

        request.session['cart'].append(parse_qs(request.body.decode()))
        print(request.session['cart'])
        return JsonResponse({'message': 'Item added to cart successfully'})

    else:

        return JsonResponse({'error': 'Invalid request method'}, status=400)


    

    

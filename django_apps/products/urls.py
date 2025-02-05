from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('menu/', views.menu, name='menu'),
    path('about/', views.about, name='about'),
    path('requests/', views.requests, name='requests'),
    path('catering/', views.catering, name='catering'),
    path('cart/', views.cart, name='cart'),
    path('add_to_cart/', views.add_to_cart, name='add_to_cart'),
    path('remove_from_cart/', views.remove_from_cart, name='remove_from_cart'),
    path('submit_order/', views.submit_order, name='submit_order'),
    path('send_catering_request/', views.send_catering_request, name='send_catering_request'),
    path('confirmation/', views.confirmation, name='confirmation')
]
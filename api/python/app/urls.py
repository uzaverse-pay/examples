from django.urls import path, include
from .views import *


urlpatterns = [
  path('pay', MakePayment.as_view()),
  path('order', MakeOrder.as_view()),
]

from django.urls import path
from .views import *

urlpatterns=[
    path('',login,name='login'),
    path('register.html',register,name='register'),

]
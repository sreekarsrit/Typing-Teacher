from django.urls import path
from .views import *
urlpatterns = [
    path('app', typer,name='typer'),
]
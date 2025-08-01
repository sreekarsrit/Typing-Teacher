from django.urls import path
from .views import *

urlpatterns = [
    path('', typer, name='typer'),
    path('results/', results, name='results'),
    path('logout/', logout_view, name='logout'),
]
from django.shortcuts import render,HttpResponse,redirect
from django.contrib import messages
from django.contrib.auth import views as auth_views

def typer(request):
    return render(request,'typer.html')


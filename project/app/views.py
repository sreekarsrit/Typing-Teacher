from django.shortcuts import render, HttpResponse, redirect
from django.contrib import messages
from django.contrib.auth import views as auth_views

def typer(request):
    return render(request, 'typer.html')

def results(request):
    return render(request, 'results.html')

def logout_view(request):
    request.session.flush()
    messages.success(request, 'You have been logged out successfully.')
    return redirect('login')


from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib import messages

def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        # For demo purposes, accept any email/password combination
        if email and password:
            # Create a simple session-based authentication
            request.session['user_email'] = email
            request.session['is_authenticated'] = True
            messages.success(request, f'Welcome back, {email}!')
            return redirect('typer')
        else:
            messages.error(request, 'Please enter both email and password.')
    
    return render(request, 'login.html')

def register(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        if email and password:
            # For demo purposes, just redirect to login
            messages.success(request, 'Registration successful! Please login.')
            return redirect('login')
        else:
            messages.error(request, 'Please fill in all fields.')
    
    return render(request, 'register.html')

@login_required
def logout(request):
    request.session.flush()
    messages.success(request, 'You have been logged out successfully.')
    return redirect('login')


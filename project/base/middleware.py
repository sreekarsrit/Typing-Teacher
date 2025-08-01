from django.shortcuts import redirect
from django.urls import reverse

class SimpleAuthMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Check if user is authenticated for protected views
        if request.path.startswith('/app/') and request.path != '/app/logout/':
            if not request.session.get('is_authenticated'):
                return redirect('login')
        
        response = self.get_response(request)
        return response 
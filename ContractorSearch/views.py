from django.http import HttpResponse

def myView(request):
    return HttpResponse("All set!")
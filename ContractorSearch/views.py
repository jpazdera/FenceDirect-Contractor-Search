from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

def myView(request):
    return HttpResponse("All set!")

@csrf_exempt
def overwrite_data(request):
    data = ''
    if request.method == 'POST':
        data = request.POST.get('text', '')
    if data != '':
        file = open('static/contractor_info.js', 'w')
        file.write(data)
        file.close
    return HttpResponse('')

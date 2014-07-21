from django.http import HttpResponse

def myView(request):
    return HttpResponse("All set!")

def overwrite_data(request):
    data = ''
    if request.method == 'POST':
        data = request.POST.get('text', '')
    if data != '':
        file = open('../static/contractor_info2.js', 'w')
        file.write(d)
        file.close
    return render(request, 'index.html')
from django.conf.urls import patterns, include, url
from django.views.generic import TemplateView

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name="index.html")),
    url(r'^index$', TemplateView.as_view(template_name="index.html")),
    url(r'^ContractorSearch$', TemplateView.as_view(template_name="ContractorSearch.html")),
    url(r'^AddContractor$', TemplateView.as_view(template_name="AddContractor.html")),
    url(r'^EditContractors$', TemplateView.as_view(template_name="EditContractors.html")),
    url(r'^EditContractors2$', TemplateView.as_view(template_name="EditContractors2.html")),
    url(r'^RemoveContractors$', TemplateView.as_view(template_name="RemoveContractors.html")),
    url(r'^AutoClean$', TemplateView.as_view(template_name="AutoClean.html")),
    #url(r'^overwrite_data$', overwrite_data),

    url(r'^admin/', include(admin.site.urls)),
)

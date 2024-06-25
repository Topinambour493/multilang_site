from django.urls import path

from . import views

app_name = 'main'
urlpatterns = [
    path("", views.index, name="index"),
    path("<int:article_id>/", views.detail, name="detail"),
    path("get-response/", views.get_response, name="get_response"),
]
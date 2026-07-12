from django.contrib import admin
from django.urls import path
from accounts import views

urlpatterns = [
    path('admin/', admin.site.url),
    path('api/profile/', views.profile_detail, name='profile-detail'),
]
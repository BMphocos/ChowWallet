from django.urls import path

from . import views

urlpatterns = [
    path('api/profile/', views.profile_wallet, name='profile-detail'),
]
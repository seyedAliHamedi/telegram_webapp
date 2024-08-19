from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('register/', index),
    path('login/', index),
    path('logout/', index),
    path('<path:path>/', index),
]

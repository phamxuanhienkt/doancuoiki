"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
# from rest_framework.routers import DefaultRouter
# from api.views import ApiViewset
from api.views import RegisterView, LoginView
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes, authentication_classes
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )
# router = DefaultRouter()
# router.register("healthz", ApiViewset,basename='healthz')

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include('app.urls')),
    # path('register/', RegisterView.as_view(), name='register'),
    # path('login/', LoginView.as_view(), name='login'),
    path('register/', authentication_classes([])(permission_classes([AllowAny])(RegisterView)).as_view()),
     path('login/', authentication_classes([])(permission_classes([AllowAny])(LoginView)).as_view())
    # path('api/token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ButtonClickViewSet, SessionLogViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'button-clicks', ButtonClickViewSet)
router.register(r'session-logs', SessionLogViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

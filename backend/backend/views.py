from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from django.utils import timezone
from .models import User, ButtonClick, SessionLog
from .serializers import UserSerializer, ButtonClickSerializer, SessionLogSerializer
from rest_framework.permissions import IsAuthenticated


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def login(self, request):
        user = request.user
        session = SessionLog.objects.create(user=user, login_time=timezone.now())
        return Response({'message': 'Sesión iniciada', 'session_id': session.id})

    @action(detail=False, methods=['post'])
    def logout(self, request):
        user = request.user
        session = SessionLog.objects.filter(user=user, logout_time__isnull=True).last()
        if session:
            session.logout_time = timezone.now()
            session.save()
        return Response({'message': 'Sesión finalizada'})

class ButtonClickViewSet(viewsets.ModelViewSet):
    queryset = ButtonClick.objects.all()
    serializer_class = ButtonClickSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SessionLogViewSet(viewsets.ModelViewSet):
    queryset = SessionLog.objects.all()
    serializer_class = SessionLogSerializer
    permission_classes = [permissions.IsAuthenticated]


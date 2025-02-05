from rest_framework import serializers
from .models import User, ButtonClick, SessionLog

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'is_admin']

class ButtonClickSerializer(serializers.ModelSerializer):
    class Meta:
        model = ButtonClick
        fields = ['id', 'user', 'button_number', 'click_time']
        read_only_fields = ['user', 'click_time'] 

class SessionLogSerializer(serializers.ModelSerializer):
    session_duration = serializers.ReadOnlyField()

    class Meta:
        model = SessionLog
        fields = ['id', 'user', 'login_time', 'logout_time', 'session_duration']
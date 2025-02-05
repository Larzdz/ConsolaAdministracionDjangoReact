from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_admin = models.BooleanField(default=False)

class ButtonClick(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    button_number = models.IntegerField()
    click_time = models.DateTimeField(auto_now_add=True)

class SessionLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    login_time = models.DateTimeField(auto_now_add=True)
    logout_time = models.DateTimeField(null=True, blank=True)

    @property
    def session_duration(self):
        if self.logout_time:
            return (self.logout_time - self.login_time).total_seconds()
        return None

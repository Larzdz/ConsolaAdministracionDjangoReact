from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from backend.models import User

# Personalización de la vista de usuarios en el admin
class UserAdmin(BaseUserAdmin):
    list_display = ('username', 'is_admin', 'is_active')
    list_filter = ['is_admin']
    search_fields = ['username']
    ordering = ('username',)
    fieldsets = (
        (None, {'fields': ['username','password']}),
        ('Permisos', {'fields': ['is_admin']}),
    )

# Registro de modelos en el panel de administración
admin.site.register(User, UserAdmin)


from django.contrib import admin
from .models import Todo


class TodoAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "completed", "priority", "due_date")


admin.site.register(Todo, TodoAdmin)
# Register your models here.

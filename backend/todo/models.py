from datetime import datetime

from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from enum import Enum

# Create your models here.


class Priority(models.TextChoices):
    HIGH = "High", _("High")
    MEDIUM = "Med", _("Medium")
    LOW = "Low", _("Low")


class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    priority = models.TextField(choices=Priority.choices, default=Priority.LOW)
    due_date = models.DateTimeField(blank=True)

    def __str__(self):
        return self.title

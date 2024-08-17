from django.db import models
from django.contrib.auth.models import User


class Contact(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='contacts')
    name = models.CharField(max_length=100, null=False)
    telegram_id = models.CharField(max_length=100, null=False, unique=True)
    is_favorite = models.BooleanField()

    def __str__(self):
        return self.name

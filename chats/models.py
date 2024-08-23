from django.db import models
from django.contrib.auth.models import User
from contacts.models import Contact

class Chat(models.Model):
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name='contact_chats')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

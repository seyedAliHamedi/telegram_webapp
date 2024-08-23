from django.db import models
from django.contrib.auth.models import User
from contacts.models import Contact

class Chat(models.Model):
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name='contact_chats')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    
    admin_sender = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE)
    contact_sender = models.ForeignKey(Contact, null=True, blank=True, on_delete=models.CASCADE)
    
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not (self.admin_sender or self.contact_sender):
            raise ValueError("A message must have either an admin_sender or a contact_sender.")
        if self.admin_sender and self.contact_sender:
            raise ValueError("A message cannot have both an admin_sender and a contact_sender.")
        super().save(*args, **kwargs)
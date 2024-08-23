from django.db import models

class Contact(models.Model):
    telegram_id = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255)

    def has_chat(self):
        return self.contact_chats.exists()
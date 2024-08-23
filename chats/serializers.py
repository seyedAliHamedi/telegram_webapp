from rest_framework import serializers
from .models import Chat, Message
from contacts.models import Contact

class ChatSerializer(serializers.ModelSerializer):
    contact = serializers.PrimaryKeyRelatedField(queryset=Contact.objects.all())
    class Meta:
        model = Chat
        fields = ['id', 'contact', 'created_at', 'updated_at']


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

from rest_framework import serializers
from .models import Contact

class ContactSerializer(serializers.ModelSerializer):
    has_chat = serializers.SerializerMethodField()

    class Meta:
        model = Contact
        fields = ('id', 'telegram_id', 'name', 'has_chat')

    def get_has_chat(self, obj):
        return obj.has_active_chat()
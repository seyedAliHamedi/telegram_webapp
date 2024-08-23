from rest_framework import generics
from rest_framework.exceptions import PermissionDenied

from contacts.models import Contact
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer
from rest_framework.permissions import IsAuthenticated

class ChatListCreateView(generics.ListCreateAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Assuming only one contact for the single user context
        contact = Contact.objects.first()  # Adjust based on your contact selection logic
        return Chat.objects.filter(contact=contact)

    def perform_create(self, serializer):
        contact = Contact.objects.first()  # Adjust based on your contact selection logic
        serializer.save(contact=contact)

class ChatDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        contact = Contact.objects.first()  # Adjust based on your contact selection logic
        return Chat.objects.filter(contact=contact)

class MessageListCreateView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        contact = Contact.objects.first()  # Adjust based on your contact selection logic
        return Message.objects.filter(chat__contact=contact)

    def perform_create(self, serializer):
        contact = Contact.objects.first()  # Adjust based on your contact selection logic
        chat = serializer.validated_data['chat']
        if chat.contact != contact:
            raise PermissionDenied("You do not have permission to add messages to this chat.")
        serializer.save()

class MessageDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        contact = Contact.objects.first()  # Adjust based on your contact selection logic
        return Message.objects.filter(chat__contact=contact)

    def get_object(self):
        obj = super().get_object()
        contact = Contact.objects.first()  # Adjust based on your contact selection logic
        if obj.chat.contact != contact:
            raise PermissionDenied("You do not have permission to access this message.")
        return obj

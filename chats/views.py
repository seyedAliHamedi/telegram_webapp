from rest_framework import generics
from rest_framework.exceptions import PermissionDenied

from contacts.models import Contact
from .models import Chat, Message
from .serializers import ChatSerializer, MessageSerializer

class ChatListCreateView(generics.ListCreateAPIView):
    serializer_class = ChatSerializer

    def get_queryset(self):
        contact_id = self.request.query_params.get('contact')
        if contact_id:
            return Chat.objects.filter(contact_id=contact_id)
        return Chat.objects.none()  # Return no chats if no contact is specified

    def perform_create(self, serializer):
        contact_id = self.request.data.get('contact')
        if contact_id:
            try:
                contact = Contact.objects.get(id=contact_id)
                serializer.save(contact=contact)
            except Contact.DoesNotExist:
                raise PermissionDenied("The contact does not exist.")
        else:
            raise PermissionDenied("Contact ID is required to create a chat.")

class ChatDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ChatSerializer

    def get_queryset(self):
        contact_id = self.request.query_params.get('contact')
        if contact_id:
            return Chat.objects.filter(contact_id=contact_id)

class MessageListCreateView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        chat_id = self.kwargs.get('chat_id')
        if chat_id:
            return Message.objects.filter(chat_id=chat_id)

    def perform_create(self, serializer):
        chat_id = self.request.data.get('chat')
        try:
            chat = Chat.objects.get(id=chat_id)
        except Chat.DoesNotExist:
            raise PermissionDenied("The chat does not exist.")
        serializer.save(chat=chat)

class MessageDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        contact = Contact.objects.first()  # Adjust based on your contact selection logic
        return Message.objects.filter(chat__contact=contact)

    def get_object(self):
        obj = super().get_object()
        contact = Contact.objects.first()  # Adjust based on your contact selection logic
        if obj.chat.contact != contact:
            raise PermissionDenied("You do not have permission to access this message.")
        return obj

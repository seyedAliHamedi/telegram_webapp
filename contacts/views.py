from rest_framework import generics
from .models import Contact
from .serializers import ContactSerializer
from rest_framework.permissions import IsAuthenticated
from django.db.models import Count, Case, When, IntegerField


class ContactListCreateView(generics.ListCreateAPIView):
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Contact.objects.annotate(
            has_chat=Case(
                When(contact_chats__isnull=False, then=1),
                default=0,
                output_field=IntegerField(),
            )
        ).order_by('-has_chat')

class ContactDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [IsAuthenticated]

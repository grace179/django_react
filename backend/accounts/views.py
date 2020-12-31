from datetime import timedelta
from django.db.models import Q
from django.contrib.auth import get_user_model
from django.shortcuts import render
from django.utils import timezone
from rest_framework.permissions import AllowAny
from rest_framework.generics import CreateAPIView, ListAPIView
from .serializers import SignupSerializer, SuggestionUserSerializer

# Create your views here.
class SignUpView(CreateAPIView):
  model = get_user_model
  serializer_class = SignupSerializer
  permission_classes = [AllowAny]

  def get_queryset(self):
    timesince = timezone.now() - timedelta(days=3)
    qs = super().get_queryset()
    qs = qs.filter(
      Q(author = self.request.user) |
      Q(author__in = self.request.user.following_set.all())
    )
    qs = qs.filter(created_at__gte=timesince)
    return qs

class SuggestionListAPIView(ListAPIView):
  queryset = get_user_model().objects.all()
  serializer_class = SuggestionUserSerializer

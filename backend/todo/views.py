from django.shortcuts import render
from rest_framework import viewsets, generics, filters
from .serializers import TodoSerializer
from .models import Todo

# Create your views here


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    search_fields = ["title"]
    filter_backends = (filters.SearchFilter,)

from django.shortcuts import render
from rest_framework import viewsets, filters
from rest_framework.pagination import PageNumberPagination

from .serializers import TodoSerializer
from .models import Todo

# Create your views here


class Pagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = "page_size"
    max_page_size = 10


class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    search_fields = ["title"]
    ordering_fields = ["title", "priority", "due_date"]
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    pagination_class = Pagination

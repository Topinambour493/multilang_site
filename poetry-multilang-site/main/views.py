from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render

from .models import Article

def index(request):
    return HttpResponse("coucou index.")

def detail(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    return render(request, "main/detail.html", {"article": article})

from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render

from .models import Article

def index(request):
    articles = Article.objects.all()
    return render(request, "main/index.html", {"articles": articles})

def detail(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    # redirects to the detail page corresponding to the article template
    return render(request, "main/detail" + str(article.template_type) + ".html", {"article": article})

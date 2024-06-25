from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.http import JsonResponse

from .models import Article
from .replicate import run_inference, define_inputs

def index(request):
    articles = Article.objects.all()
    return render(request, "main/index.html", {"articles": articles})

def detail(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    # redirects to the detail page corresponding to the article template
    return render(request, "main/detail" + str(article.template_type) + ".html", {"article": article})

def get_response(request):
    question = request.GET['input-chat']
    inputs = define_inputs(question)
    return JsonResponse({'response': run_inference(inputs)})
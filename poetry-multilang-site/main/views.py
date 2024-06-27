from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.http import JsonResponse

from .models import Article
from .replicate import run_inference, define_inputs, processing_full_prompt
import json

def index(request):
    articles = Article.objects.all()
    return render(request, "main/index.html", {"articles": articles})

def detail(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    # redirects to the detail page corresponding to the article template
    return render(request, "main/detail" + str(article.template_type) + ".html", {"article": article})

def get_response(request):
    full_prompt = processing_full_prompt(json.loads(request.GET['full-prompt']))
    inputs = define_inputs(full_prompt)
    response = run_inference(inputs)
    return JsonResponse({'response': response})
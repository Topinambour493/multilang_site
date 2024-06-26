from django.http import HttpResponse
from django.shortcuts import get_object_or_404, render
from django.http import JsonResponse

from .models import Article
from .replicate import run_inference, define_inputs, conversation

def index(request):
    articles = Article.objects.all()
    return render(request, "main/index.html", {"articles": articles})

def detail(request, article_id):
    article = get_object_or_404(Article, pk=article_id)
    # redirects to the detail page corresponding to the article template
    return render(request, "main/detail" + str(article.template_type) + ".html", {"article": article})

def get_response(request):
    question = request.GET['input-chat']
    conversation.add_message("User", question)
    full_prompt = conversation.get_full_prompt()
    inputs = define_inputs(full_prompt)
    response = run_inference(inputs)
    conversation.add_message("Assistant", question)
    return JsonResponse({'response': response})
from django.test import TestCase
from django.urls import reverse
from django.utils import timezone


from django.utils.translation import activate

from .models import Article


class IndexViewTests(TestCase):
    def test_no_article(self):
        """
        If no article exist, articles is an empty array
        """
        activate("en")
        response = self.client.get(reverse('main:index'))
        self.assertQuerysetEqual(response.context['articles'], [])

    def test_past_article(self):
        """
        The articles index page may display one article.
        """
        article = Article.objects.create(title="test", content="it's test time", publication_date=timezone.now(), image="images_articles/test.jpg", template_type=1)
        response = self.client.get(reverse('main:index'))
        self.assertQuerysetEqual(response.context['articles'],[article])

    def test_two_past_ressources(self):
        """
        The articles index page may display multiple articles.
        """
        article1 = Article.objects.create(title="test1", content="it's test time", publication_date=timezone.now(), image="images_articles/test1.jpg", template_type=1)
        article2 = Article.objects.create(title="test2", content="it's test time", publication_date=timezone.now(), image="images_articles/test2.jpg", template_type=2)
        response = self.client.get(reverse('main:index'))
        self.assertQuerysetEqual(response.context['articles'], [article1, article2], ordered=False)


class DetailViewTest(TestCase):

    def test_article_exist(self):
        """
        The article detail page with non-existent item may display article
        """
        activate("en")
        article = Article.objects.create(title="test", content="it's test time", publication_date=timezone.now(), image="images_articles/test.jpg", template_type=1)
        response = self.client.get(reverse('main:detail', args=[1]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.context['article'], article)

    def test_article_not_exist(self):
        """
        The article detail page with non-existent item may display a 404 page
        """
        response = self.client.get(reverse('main:detail', args=[1]))
        self.assertEqual(response.status_code, 404)

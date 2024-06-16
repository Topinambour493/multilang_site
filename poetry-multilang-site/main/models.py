from django.db import models


class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    publication_date = models.DateTimeField("date published")
    image = models.ImageField(upload_to='images_articles')
    template_type = models.IntegerField()

    def __str__(self):
        return self.title
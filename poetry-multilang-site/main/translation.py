# -*- coding: utf-8 -*-
# Model Translation
from modeltranslation.translator import translator, TranslationOptions
from .models import Article


class MyModelTranslationOptions(TranslationOptions):
    fields = ('title', 'content')   # Select here the fields you want to translate
translator.register(Article, MyModelTranslationOptions)

# You can add as many models as you want to translate here
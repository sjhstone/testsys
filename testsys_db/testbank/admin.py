from django.contrib import admin

from .models import *

admin.site.register(
    [
        ProblemCategory,
        ProblemType,
        Problem,
        ProblemSource,
        Quiz,
        AnswerRecord
    ]
)

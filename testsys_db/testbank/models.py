from django.db import models
from random import shuffle

class ProblemCategory(models.Model):
    name = models.CharField(max_length=30)
    description = models.TextField()

    def __str__(self):
        return '{}'.format(self.name)

class ProblemType(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return '{}'.format(self.name)

class Problem(models.Model):
    p_category = models.ForeignKey(ProblemCategory)
    p_type = models.ForeignKey(ProblemType)
    content = models.TextField()
    choices = models.TextField()
    correct_answer = models.TextField()

    def __str__(self):
        return '{}/{} {}'.format(self.p_category.name, self.p_type.name, self.content)

class ProblemSource(models.Model):
    problem_category = models.ForeignKey(ProblemCategory)
    number = models.PositiveIntegerField()

    def __str__(self):
        return '{} ({})'.format(self.problem_category, self.number)

class Quiz(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    allowed_time = models.IntegerField()
    allowed_retake = models.IntegerField()
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    has_preround = models.BooleanField(default=False)
    preround_start_time = models.DateTimeField(blank=True,null=True)
    preround_end_time = models.DateTimeField(blank=True,null=True)
    max_no_beat_tolerance = models.IntegerField()
    points_per_problem = models.IntegerField()
    pass_threshold = models.IntegerField()
    problem_source = models.ManyToManyField(ProblemSource)

    def getProblemSet(self):
        problem_set = []
        for p_source in self.problem_source.all():
            qualified_problems = Problem.objects.filter(p_category=p_source.problem_category)\
                .all().order_by('?')[:p_source.number]
            problem_set.extend(qualified_problems)
        return problem_set

    def __str__(self):
        return '{}'.format(self.title)

class AnswerRecord(models.Model):
    # TODO user = 
    quiz = models.ForeignKey(Quiz)
    start_from = models.DateTimeField()
    end_at = models.DateTimeField()
    score = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return '{} Record'.format(self.quiz)

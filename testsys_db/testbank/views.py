from django.db import transaction, IntegrityError
from django.http import JsonResponse, Http404
from django.db.models import Q

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, generics

from .serializers import *
from .models import *

class QuizListViewForExaminee(viewsets.ReadOnlyModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializerForExaminee

def TakeQuizView(request, quiz_id):
    q = Quiz.objects.get(pk=quiz_id)
    ps = q.getProblemSet()
    ser = ProblemSerializerForExaminee(ps, many=True)
    return JsonResponse(ser.data, safe=False)

def QuizHandinView(request):
    import json
    json_dict = json.loads(request.POST['your_json_data'])
    print(json_dict)
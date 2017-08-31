'''
admin.py shell < {app_name}\playground.py
'''

from django.http import JsonResponse
from testbank.models import Quiz
from testbank.serializers import ProblemSerializerForExaminee

q = Quiz.objects.get(pk=1)
ps = q.getProblemSet()
ser = ProblemSerializerForExaminee(ps, many=True)
jr = JsonResponse(ser.data, safe=False)

print(jr.content)
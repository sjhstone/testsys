from rest_framework import serializers
from .models import *
from rest_framework import serializers
import testbank.models as TestbankModels



class QuizSerializerForStaff(serializers.ModelSerializer):
    class Meta:
        model = TestbankModels.Quiz
        fields = '__all__'


class QuizSerializerForExaminee(serializers.ModelSerializer):
    class Meta:
        model = TestbankModels.Quiz
        fields = ('id', 'title', 'description', 'allowed_time', 'allowed_retake',
            'start_time', 'end_time',
            'has_preround', 'preround_start_time', 'preround_end_time',
            'pass_threshold',)

class ProblemSerializerForStaff(serializers.ModelSerializer):
    class Meta:
        model = TestbankModels.Problem
        fields = '__all__'

class ProblemSerializerForExaminee(serializers.ModelSerializer):
    p_type = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )
    p_category = serializers.SlugRelatedField(
        read_only=True,
        slug_field='name'
    )
    class Meta:
        model = TestbankModels.Problem
        fields = ('id', 'p_category' , 'p_type' , 'content' , 'choices',)

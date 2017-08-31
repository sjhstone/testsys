# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-08-30 12:18
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AnswerRecord',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_from', models.DateTimeField()),
                ('end_at', models.DateTimeField()),
                ('score', models.PositiveIntegerField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Problem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('p_type', models.CharField(max_length=30)),
                ('content', models.TextField()),
                ('choices', models.TextField()),
                ('correct_answer', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ProblemCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ProblemSource',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.PositiveIntegerField()),
                ('problem_category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='testbank.ProblemCategory')),
            ],
        ),
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('allowed_time', models.IntegerField()),
                ('allowed_retake', models.IntegerField()),
                ('start_time', models.DateTimeField()),
                ('end_time', models.DateTimeField()),
                ('has_preround', models.BooleanField(default=False)),
                ('preround_start_time', models.DateTimeField()),
                ('preround_end_time', models.DateTimeField()),
                ('max_no_beat_tolerance', models.IntegerField()),
                ('points_per_problem', models.IntegerField()),
                ('pass_threshold', models.IntegerField()),
                ('problem_source', models.ManyToManyField(to='testbank.ProblemSource')),
            ],
        ),
        migrations.AddField(
            model_name='problem',
            name='p_category',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='testbank.ProblemCategory'),
        ),
        migrations.AddField(
            model_name='answerrecord',
            name='quiz',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='testbank.Quiz'),
        ),
    ]

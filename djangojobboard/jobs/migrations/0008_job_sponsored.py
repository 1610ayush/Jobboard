# Generated by Django 3.2.9 on 2022-06-16 17:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0007_sponsoredjobpost'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='sponsored',
            field=models.BooleanField(default=False),
        ),
    ]

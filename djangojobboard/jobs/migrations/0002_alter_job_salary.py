# Generated by Django 3.2.9 on 2022-05-20 19:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='salary',
            field=models.PositiveIntegerField(),
        ),
    ]

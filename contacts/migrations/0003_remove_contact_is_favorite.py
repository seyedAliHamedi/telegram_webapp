# Generated by Django 5.0.8 on 2024-08-23 22:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('contacts', '0002_remove_contact_user_alter_contact_is_favorite_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='contact',
            name='is_favorite',
        ),
    ]

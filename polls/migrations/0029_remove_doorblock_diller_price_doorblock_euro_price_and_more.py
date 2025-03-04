# Generated by Django 5.0.3 on 2024-07-01 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0028_table_is_set_price_type_alter_table_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='doorblock',
            name='diller_price',
        ),
        migrations.AddField(
            model_name='doorblock',
            name='euro_price',
            field=models.IntegerField(default=0, verbose_name='EURO'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='doorblock',
            name='price',
            field=models.IntegerField(verbose_name='USD'),
        ),
        migrations.AlterField(
            model_name='table',
            name='date',
            field=models.DateField(default='2024-07-01'),
        ),
        migrations.AlterField(
            model_name='table',
            name='price_type',
            field=models.TextField(default='USD'),
        ),
    ]

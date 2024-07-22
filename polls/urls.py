from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('order/<int:order_id>/', views.order, name='order'),
    path('new_order/', views.new_order, name ='new_order'),
    path('remove_order/<int:order_id>', views.remove_order, name ='remove_order'),
    path('get_filtered_data/', views.get_filtered_data, name='get_filtered_data'),
    path('set_table/<int:order_id>/', views.set_table, name='set_table'),
    path('get_door_info/', views.get_door_info, name='get_door_info'),
    path('get_dimensions_aperture/', views.get_dimensions_aperture, name='get_dimensions_aperture'),
    path('get_dimensions_frame/', views.get_dimensions_frame, name='get_dimensions_frame'),
    path('get_back_width/', views.get_back_width, name='get_back_width'),
    path('create_excel_specification/<int:order_id>/', views.create_excel_specification, name='create_excel_specification'),
    path('create_pdf_specification/<int:order_id>/', views.create_pdf_specification, name='create_pdf_specification'),
    path('set_price_type/<int:order_id>/', views.set_price_type, name='set_price_type')

]

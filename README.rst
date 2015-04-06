django-checkboxselectmultiple
-----------------------------

Django widget for using multiple checkboxes instead :code:`<select multiple>`.

The benefit of using this instead of Django's default is better integration with Django Admin.

Javascript is based on Stefano Contini's code
http://www.abidibo.net/blog/2013/04/10/convert-select-multiple-widget-checkboxes-django-admin-form/


Installation
============

You can install django-checkboxselectmultiple  with pip ::

    pip install https://github.com/MagicSolutions/django-checkboxselectmultiple/archive/master.zip


And put it :code:`INSTALLED_APPS` ::

    INSTALLED_APPS = (
        ...
        'checkboxselectmultiple',
        ...
    )


Usage
=====

You can set the widget to your form fields ::

    from django import forms
    from checkboxselectmultiple.widgets import CheckboxSelectMultiple

    class MyForm(forms.Form):

        choice_fields = forms.MultipleChoiceField(
            choices=MY_CHOICES, widget=CheckboxSelectMultiple)

        model_choice_fields = forms.ModelMultipleChoiceField(
            queryset=queryset, widget=CheckboxSelectMultiple)


    class MyModelForm(forms.ModelForm):

        class Meta:
            model = MyModel
            widgets = {
                'my_fields': CheckboxSelectMultiple,
            }


Integrating with django administration ::

    from checkboxselectmultiple.admin import CheckboxSelectMultipleAdmin

    class MyAdmin(CheckboxSelectMultipleAdmin):
        pass

    admin.site.regiter(MyModel, MyAdmin)

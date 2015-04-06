from django.contrib import admin

from .widgets import CheckboxSelectMultiple


class CheckboxSelectMultipleMixin(object):
    """
    A mixin for ModelAdmins that set CheckboxSelectMultiple to ManyToManyFields

    """
    def formfield_for_manytomany(self, db_field, *args, **kwargs):
        if db_field.name not in (list(self.filter_vertical) + list(self.filter_horizontal) + list(self.raw_id_fields)):
            kwargs.setdefault('widget', CheckboxSelectMultiple)
        return super(CheckboxSelectMultipleMixin, self).formfield_for_manytomany(db_field, *args, **kwargs)


class CheckboxSelectMultipleAdmin(CheckboxSelectMultipleMixin, admin.ModelAdmin):
    """
    Admin That you need to extend and all your ManyToManyFields will be with checkboxes by default

    """
    pass

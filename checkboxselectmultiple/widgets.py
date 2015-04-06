from django import forms


class CheckboxSelectMultiple(forms.SelectMultiple):
    """
    A SelectMultiple wich will use checkboxes to select individual items

    """
    class Media:
        css = {
            'all': ('checkboxselectmultiple/checkboxselectmultiple.css',)
        }
        js = (
            'checkboxselectmultiple/checkboxselectmultiple.js',
        )

    def render(self, name, value, attrs, choices=()):
        if attrs is None:
            attrs = {}
        attrs['data-checkboxselect'] = True
        return super(CheckboxSelectMultiple, self).render(name, value, attrs, choices)

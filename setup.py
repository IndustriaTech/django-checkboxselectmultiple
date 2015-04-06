# -*- coding: utf-8 -*-
import os
from setuptools import setup


def read(fname):
    with open(os.path.join(os.path.dirname(__file__), fname)) as f:
        return f.read()


setup(
    name="django-checkboxselectmultiple",
    version="0.0.1",
    url='http://github.com/MagicSolutions/django-checkboxselectmultiple',
    description="Form widget for using multiple checboxes instead of <select multiple>",
    long_description=read('README.rst'),
    author='Venelin Stoykov',
    author_email='venelin@magicsolutions.bg',
    packages=[
        'checkboxselectmultiple',
    ],
    package_data={
        'checkboxselectmultiple': [
            'static/checkboxselectmultiple/*.js',
            'static/checkboxselectmultiple/*.css',
        ],
    },
    classifiers=[
        'Development Status :: 4 - Beta',
        'Framework :: Django',
        'Intended Audience :: Developers',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Topic :: Internet :: WWW/HTTP',
    ],
    install_requires=[
        'django',
    ],
)

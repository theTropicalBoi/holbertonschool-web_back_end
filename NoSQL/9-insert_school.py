#!/usr/bin/env python3
"""
Function that inserts a new document in
a collection based in kwargs.
"""


def insert_school(mongo_collection, **kwargs):
    """Function that inserts a new document in a collection
    base in kwargs.

    Args:
        mongo_collection : Collection object
    """
    result = mongo_collection.insert_one(kwargs)
    return result.inserted_id
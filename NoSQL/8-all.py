#!/usr/bin/env python3
"""
Function that lists all documents in a collection
"""


def list_all(mongo_collection):
    """Function that lists all documents in a collection

    Args:
        mongo_collection (List): list of documents
    """
    return list(mongo_collection.find())

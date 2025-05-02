#!/usr/bin/env python3
"""
Function that changes all topics of a
school document based on the name.
"""


def update_topics(mongo_collection, name, topics):
    """function that changes all topics
    of a school document based on the name

    Args:
        mongo_collection : Object collection
        name (str): School name to update
        topics (lists of str): list of topics approached in the school
    """
    mongo_collection.update_many(
        { "name": name },
        {"$set": { "topics": topics} }
    )

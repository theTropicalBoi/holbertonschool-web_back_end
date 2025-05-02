#!/usr/bin/env python3
"""
function that returns the list of school having a specific topic
"""


def schools_by_topic(mongo_collection, topic):
    """function that returns the list of school having a specific topic

    Args:
        mongo_collection (_type_): _Object collection
        topic (str): topic searched
    """
    return list(mongo_collection.find({ "topics": topic }))

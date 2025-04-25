#!/usr/bin/env python3
"""This module defines a type-annotated function that returns
the sum of a list containing both integers and floating-point numbers."""


from typing import List, Union


def sum_mixed_list(mxd_lst: List[Union[int, float]]) -> float:
    """
    Compute the sum of a list containing integers and floats.

    Args:
        mxd_lst (List[Union[int, float]]): A list of numbers, which may include
        both integers and floating-point values.

    Returns:
        float: The sum of all numbers in the list as a float.
    """
    return sum(mxd_lst)

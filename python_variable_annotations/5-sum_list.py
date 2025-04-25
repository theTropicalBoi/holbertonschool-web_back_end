#!/usr/bin/env python3
"""This module defines a type-annotated function that returns
the sum of a list of floating-point numbers."""


from typing import List


def sum_list(input_list: List[float]) -> float:
    """
    Compute the sum of a list of floats.

    Args:
        input_list (List[float]): A list of floating-point numbers.

    Returns:
        float: The sum of all the floats in the input list.
    """
    return sum(input_list)

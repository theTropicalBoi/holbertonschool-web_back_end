#!/usr/bin/env python3
"""This module defines a function that returns a multiplier function
using closures and type annotations."""


from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """
    Create a multiplier function.

    Args:
        multiplier (float): The value to multiply other floats by.

    Returns:
        Callable[[float], float]: A function that takes a float and returns
        the product of that float and the given multiplier.
    """
    def multiplier_function(x: float) -> float:
        return x * multiplier
    return multiplier_function

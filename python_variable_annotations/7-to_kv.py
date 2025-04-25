#!/usr/bin/env python3
"""This module defines a type-annotated function that returns
a tuple containing a string and the square of a number as a float."""


from typing import Union, Tuple


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """
    Create a tuple with a string and the square of a number.

    Args:
        k (str): A string key.
        v (Union[int, float]): A value to be squared.

    Returns:
        Tuple[str, float]: A tuple where the first element is the string `k`,
        and the second is the square of `v` as a float.
    """
    return (k, float(v ** 2))

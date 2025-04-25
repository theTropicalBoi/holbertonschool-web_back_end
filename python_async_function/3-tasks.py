#!/usr/bin/env python3
"""Function task_wait_random that takes an integer max_delay
and returns a asyncio.Task."""
import asyncio
wait_random = __import__('0-basic_async_syntax').wait_random


def task_wait_random(max_delay: int) -> asyncio.Task:
    """Creates and returns asyncio.Task for wait_random.

    Args:
        max_delay (int): Max delay for wait_random
    Returns: An asyncio.Task object for wait_random
    """
    return asyncio.create_task(wait_random(max_delay))

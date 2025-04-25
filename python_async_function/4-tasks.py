#!/usr/bin/env python3
"""Take the code from wait_n and alter it into a new function task_wait_n. """
import asyncio
from typing import List
task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """Take the code from wait_n and alter it into a new function task_wait_n.

    Args:
        n (int): number of times to spawn task_wait_random
        max_delay (int): max delay for task_wait_random

    Returns: List of delays
    """
    tasks = [task_wait_random(max_delay) for _ in range(n)]
    delays = []

    for completed in asyncio.as_completed(tasks):
        delay = await completed
        delays.append(delay)
    return delays

#!/usr/bin/env python3
"""wait_random will sapwn n times with the specified max_delay"""
from typing import List
import asyncio
wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """wait_random will sapwn n times with the specified max_delay

    Args:
        n (int): times wait_random will spawn
        max_delay: max delay
    """
    async_tasks = [wait_random(max_delay) for _ in range(n)]
    delays = []
    for completed in asyncio.as_completed(async_tasks):
        delay = await completed
        delays.append(delay)
    return delays

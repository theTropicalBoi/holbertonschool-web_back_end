#!/usr/bin/env python3
"""
Coroutine that will execute async_comprehension four times
in parallel using asyncio.gather
"""
import asyncio
async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """
    Import async_comprehension from the previous file
    and write a measure_runtime coroutine.
    that will execute async_comprehension four times in parallel
    using asyncio.gather.
    measure_runtime should measure the total runtime and return it.
    Notice that the total runtime is roughly 10 seconds,
    """
    start_time = asyncio.get_event_loop().time()
    tasks = [async_comprehension() for _ in range(4)]
    await asyncio.gather(*tasks)
    end_time = asyncio.get_event_loop().time()
    return end_time - start_time

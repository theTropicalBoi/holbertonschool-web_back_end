#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""

import csv
import math
from typing import List, Dict


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """Retrieve data starting from a given index

        Args:
            index (int, optional): _description_. Defaults to None.
            page_size (int, optional): _description_. Defaults to 10.

        Returns:
            Dict: _description_
        """
        indexed_data = self.indexed_dataset()
        if index is None:
            index = 0

        assert isinstance(index, int) and index >= 0
        assert index < len(self.dataset())
        data = []
        current_index = index
        for _ in range(page_size):
            while current_index not in indexed_data and current_index < len(
                self.dataset()
            ):
                current_index += 1
            if current_index >= len(self.dataset()):
                break

            data.append(indexed_data[current_index])
            current_index += 1

        next_index = current_index

        return {
            "index": index,
            "next_index": next_index,
            "page_size": len(data),
            "data": data
        }

// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.8.19;

library BytesConcat {
    function concat(bytes memory a, bytes[] memory array) internal pure returns (bytes memory) {
        uint totalLength = a.length;

        for (uint i = 0; i < array.length; i++) {
            totalLength += array[i].length;
        }

        bytes memory result = new bytes(totalLength);
        uint k = 0;

        // Copy the first array
        for (uint i = 0; i < a.length; i++) {
            result[k++] = a[i];
        }

        // Copy each element of the array
        for (uint i = 0; i < array.length; i++) {
            bytes memory b = array[i];
            for (uint j = 0; j < b.length; j++) {
                result[k++] = b[j];
            }
        }

        return result;
    }
}
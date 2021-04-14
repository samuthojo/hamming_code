function calcNumParityBits(m) {
    p=1
    while(2**p < m+p+1) {
        p++
    }
    return p
}

// Function to calculate codeword
function calcCodeWord(bits, p_n)
{
    n = bits.length

	c_l = p_n + n;
	code = new Array(c_l)

	j = k = 0;

	// Traverse the msgBits
	for (i = 0; i < c_l; i++) {

		// Update the code
		if (i == ((2**k) - 1)) {
			code[i] = 0;
			k++;
		}

		// Update the code[i] to the
		// input character at index j
		else {
			code[i] = bits[j];
			j++;
		}
	}

	// Traverse and update the
	// hamming code
	for (d = 0; d < p_n; d++) {
		// Find current position
		position = (2**d);

		// Find value at current position
		value = ham_calc(position, code, c_l);

		// Update the code
		code[position - 1] = value;
	}
    return code
}

function ham_calc(position, code, c_l)
{
    count = 0;
	i = position - 1;

	// Traverse to store Hamming Code
	while (i < c_l) {

		for (j = i; j < i + position; j++) {

			// If current bit is 1
			if (code[j] == "1")
				count++;
		}

		// Update i
		i = i + 2 * position;
	}

	if (count % 2 == 0)
		return 0;
	else
		return 1;
}

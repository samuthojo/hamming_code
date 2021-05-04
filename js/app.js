function calcNumParityBits(m) {
    p=1
    while(2**p < m+p+1) {
        p++
    }
    return p
}

// Function to calculate codeword
function calcCodeword(bits, p_n)
{
    n = bits.length

	c_l = p_n + n;
	codewd = new Array(c_l)

	j = k = 0;

	// Traverse the msgBits
	for (i = 0; i < c_l; i++) {

		// Update the codewd
		if (i == ((2**k) - 1)) {
			codewd[i] = 0;
			k++;
		}

		// Update the codewd[i] to the
		// input character at index j
		else {
			codewd[i] = bits[j];
			j++;
		}
	}

	// Traverse and update the
	// hamming codewd
	for (d = 0; d < p_n; d++) {
		// Find current position
		position = (2**d);

		// Find value at current position
		value = ham_calc(position, codewd, c_l);

		// Update the codewd
		codewd[position - 1] = value;
	}
    return codewd
}

function ham_calc(position, codewd, c_l)
{
    count = 0;
	i = position - 1;

	// Traverse to store Hamming Code
	while (i < c_l) {

		for (j = i; j < i + position; j++) {

			// If current bit is 1
			if (codewd[j] == "1")
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

function locate_error_position(codewd, p_n)
{
	c_l = codewd.length
	
	error_position = 0

	for (d = 0; d < p_n; d++) {
		// Find current position
		position = (2**d);

		if (!is_parity_correct(position, codewd, c_l)) {
			error_position = error_position + position
		}
		
	}	

	return error_position
}

function is_parity_correct(position, codewd, c_l)
{
    count = 0;
	i = position - 1;

	// Traverse to check correctness
	while (i < c_l) {

		for (j = i; j < i + position; j++) {

			// If current bit is 1
			if (codewd[j] == "1")
				count++;
		}

		// Update i
		i = i + 2 * position;
	}

	if (count % 2 == 0)
		return true
	else
		return false
}

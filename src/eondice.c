#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <inttypes.h>
#include "random.h"
#include "getstr.h"

uint16_t sum;

static uint16_t roll(uint8_t sides)
{
	return (get_random() % sides) + 1;
}

static void roll_recursive(unsigned long int rolls)
{
	fputc('(', stdout);

	while (rolls > 0) {
		uint16_t cur_roll = roll(6);

		if (cur_roll == 6) {
			roll_recursive(2);
		} else {
			sum += cur_roll;
			fprintf(stdout, "%" PRIu16, cur_roll);
		}

		if (rolls > 1) {
			fputc(' ', stdout);
		}

		--rolls;
	}

	fputc(')', stdout);
}

void eondice()
{
	char *input;

	for (;;) {
		input = getstr();

		if (!input) {
			fputs("FEL: Kunde inte allokera minne.\n", stderr);
			return;
		}

		if (strcasecmp(input, "t") == 0) {
			fprintf(stdout, "%" PRIu16 "\n", roll(10));
		} else if (*input == '\0') {
			fputs("Skriv något!\n", stderr);
		} else {
			char *endptr;
			unsigned long int rolls;

			rolls = strtoul(input, &endptr, 0);

			if (*endptr) {
				fputs("Du angav varken ett antal eller T. "
				      "Försök igen.\n", stderr);
			} else {
				sum = 0;
				roll_recursive(rolls);
				fputc('\n', stdout);
				fprintf(stdout, "Summa: %" PRIu16 "\n", sum);
			}
		}

		free(input);
	}
}

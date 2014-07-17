#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include "rdrand.h"
#include "debug.h"

static uint8_t has_rdrand;

void init_random()
{
	has_rdrand = (cpuid_1_ecx() & (1 << 30)) ? 1 : 0;

	if (!has_rdrand) {
		srand(time(NULL));
	}

	if (debug_mode) {
		fprintf(stdout,
		        "Genererar slumptal med %s.\n\n",
		        has_rdrand ? "instruktionen rdrand"
		                   : "biblioteksfunktionen rand()");
	}
}

uint16_t get_random()
{
	if (has_rdrand) {
		return rdrand16();
	}

	return (uint16_t)(rand() & 0xFFFF);
}

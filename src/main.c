#include <stdio.h>
#include <string.h>
#include "random.h"
#include "eondice.h"

uint8_t debug_mode;

int main(int argc, char **argv)
{
	debug_mode = 0;

	while (argc > 1) {
		if (strcasecmp(argv[1], "-d") == 0) {
			debug_mode = 1;
		} else {
			fprintf(stderr,
			        "FEL: Ogiltigt argument \"%s\".\n",
			        argv[1]);
			return 1;
		}

		--argc;
		++argv;
	}

	init_random();
	fputs("Välkommen till EonDice!\n"
	      "Ange antal kast med T6 eller skriv T för att slå en T10:\n",
	       stdout);
	eondice();

	return 0;
}

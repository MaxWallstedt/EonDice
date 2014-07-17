#include <stdio.h>
#include <stdlib.h>


char *getstr()
{
	int c;
	char *str = NULL;
	size_t strlen;

	strlen = 0;

	while ((c = getchar()) != '\n'
	       && c != '\r' && c != '\0' && c != EOF) {
		if (str) {
			char *tmp;

			tmp = realloc(str, strlen + 2);

			if (!tmp) {
				free(str);
				return NULL;
			}

			str = tmp;
		} else {
			str = malloc(2);

			if (!str) {
				return NULL;
			}
		}

		str[strlen] = c;
		++strlen;
	}

	if (!str) {
		str = malloc(1);

		if (!str) {
			return NULL;
		}
	}

	str[strlen] = '\0';

	return str;
}

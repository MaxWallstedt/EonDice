[BITS 64]

global cpuid_1_ecx
global rdrand16

section .text
cpuid_1_ecx:
	mov	eax, 1
	cpuid
	mov	eax, ecx
	ret

rdrand16:
	rdrand	ax
	ret

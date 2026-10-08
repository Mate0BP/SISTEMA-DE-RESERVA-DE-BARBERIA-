export function formatCOP(amount: number): string {
  return `$${amount.toLocaleString('es-CO')} COP`;
}

export function formatCOPShort(amount: number): string {
  return `$${amount.toLocaleString('es-CO')}`;
}

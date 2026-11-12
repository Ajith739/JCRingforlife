export function allocate(amountMinor, rule) {
    if (!Number.isSafeInteger(amountMinor) || amountMinor < 0)
        throw new Error('Amount must be a non-negative integer in minor units.');
    if (!rule.shares.length || rule.shares.some(s => !s.beneficiaryId || !Number.isSafeInteger(s.value) || s.value < 0))
        throw new Error('Every allocation needs a beneficiary and a non-negative integer value.');
    if (new Set(rule.shares.map(s => s.beneficiaryId)).size !== rule.shares.length)
        throw new Error('Each beneficiary may appear only once.');
    const total = rule.shares.reduce((sum, s) => sum + s.value, 0);
    if (rule.mode === 'percentage' && total !== 10000)
        throw new Error('Percentage shares must total 100%.');
    if (rule.mode === 'fixed' && total !== amountMinor)
        throw new Error('Fixed shares must equal the distributable amount.');
    if (rule.mode === 'fixed')
        return rule.shares.map(s => ({ beneficiaryId: s.beneficiaryId, label: s.label, amountMinor: s.value }));
    const rows = rule.shares.map((s, i) => ({ ...s, i, floor: Math.floor(amountMinor * s.value / 10000), remainder: (amountMinor * s.value) % 10000 }));
    let remaining = amountMinor - rows.reduce((sum, row) => sum + row.floor, 0);
    for (const row of [...rows].sort((a, b) => b.remainder - a.remainder || a.i - b.i))
        if (remaining-- > 0)
            row.floor++;
    return rows.map(row => ({ beneficiaryId: row.beneficiaryId, label: row.label, amountMinor: row.floor }));
}
export function recover(original, refundedMinor, originalMinor) {
    if (!Number.isSafeInteger(refundedMinor) || refundedMinor < 0 || refundedMinor > originalMinor || originalMinor <= 0)
        throw new Error('Refund exceeds the original payment.');
    const shares = original.map(a => ({ beneficiaryId: a.beneficiaryId, label: a.label, value: a.amountMinor }));
    const result = shares.map(s => ({ beneficiaryId: s.beneficiaryId, label: s.label, amountMinor: Math.floor(refundedMinor * s.value / originalMinor), remainder: refundedMinor * s.value % originalMinor }));
    let remaining = refundedMinor - result.reduce((sum, a) => sum + a.amountMinor, 0);
    for (const row of [...result].sort((a, b) => b.remainder - a.remainder))
        if (remaining-- > 0)
            row.amountMinor++;
    return result.map(({ beneficiaryId, label, amountMinor }) => ({ beneficiaryId, label, amountMinor }));
}

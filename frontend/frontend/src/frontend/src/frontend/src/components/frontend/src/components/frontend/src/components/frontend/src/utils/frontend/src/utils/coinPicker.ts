export const pickDailyCoin = async () => {
  const res = await fetch(`${process.env.REACT_APP_PUMP_API}/tokens?sort=created_timestamp&order=desc&limit=500`);
  const tokens = await res.json();
  const now = Date.now() / 1000;
  const candidates = tokens.filter((t: any) => {
    const ageSec = now - t.created_timestamp;
    const mc = t.market_cap;
    const liq = t.usd_liquidity / t.price;
    return ageSec > 90 && ageSec < 240 && mc > 8000 && mc < 65000 && liq >= 0.8 && liq <= 3.5;
  });
  return candidates.sort((a: any, b: any) => b.volume_3m - a.volume_3m)[0];
};

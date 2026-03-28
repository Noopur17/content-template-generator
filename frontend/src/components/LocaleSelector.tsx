type LocaleSelectorProps = {
  market: string;
  language: string;
  onMarketChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
};

export default function LocaleSelector({
  market,
  language,
  onMarketChange,
  onLanguageChange,
}: LocaleSelectorProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
      <div>
        <label>Market</label>
        <select value={market} onChange={(e) => onMarketChange(e.target.value)}>
          <option value="US">US</option>
          <option value="UK">UK</option>
          <option value="IN">IN</option>
          <option value="FR">FR</option>
        </select>
      </div>

      <div>
        <label>Language</label>
        <select value={language} onChange={(e) => onLanguageChange(e.target.value)}>
          <option value="en-US">en-US</option>
          <option value="en-GB">en-GB</option>
          <option value="en-IN">en-IN</option>
          <option value="fr-FR">fr-FR</option>
        </select>
      </div>
    </div>
  );
}
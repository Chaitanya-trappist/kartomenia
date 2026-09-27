export default function PriceToggle({ value, onChange, label = 'Choose pricing days', controls }) {
  return (
    <div className="price-toggle" role="group" aria-label={label}>
      <button type="button" aria-pressed={value === 'weekday'} aria-controls={controls} onClick={() => onChange('weekday')}>Weekdays <span>Mon–Fri</span></button>
      <button type="button" aria-pressed={value === 'weekend'} aria-controls={controls} onClick={() => onChange('weekend')}>Weekends <span>& holidays</span></button>
      <span className="sr-only" role="status">Showing {value === 'weekday' ? 'weekday' : 'weekend and holiday'} prices.</span>
    </div>
  );
}

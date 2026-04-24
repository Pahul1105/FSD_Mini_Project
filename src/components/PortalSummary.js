function PortalSummary({ items }) {
  return (
    <div className="summary-grid">
      {items.map((item) => (
        <article className="summary-card" key={item.label}>
          <p className="summary-card__value">{item.value}</p>
          <p className="summary-card__label">{item.label}</p>
          <p className="summary-card__text">{item.text}</p>
        </article>
      ))}
    </div>
  );
}

export default PortalSummary;

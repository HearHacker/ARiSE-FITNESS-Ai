const XPBar = ({ xp }) => {
  const current = xp % 500;
  const width = (current / 500) * 100;

  return (
    <div className="xp-wrap">
      <div className="xp-label">XP: {xp} / Next Level 500</div>
      <div className="xp-track">
        <div className="xp-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
};

export default XPBar;

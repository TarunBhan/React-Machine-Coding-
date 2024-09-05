const Star = ({ marked, starId }) => {
  return (
    <span data-star-id={starId} style={{
      fontSize: '30px',
      cursor: 'pointer',
    }} role="button" >
      {marked ? "\u2605" : "\u2606"}
    </span >
  );
};

export default Star;

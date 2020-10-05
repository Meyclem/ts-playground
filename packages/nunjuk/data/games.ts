const games = Array(10)
  .fill(null)
  .map((_, i) => {
    return {
      id: i + 1,
      name: `Final Fantasy ${i + 1}`,
      price: 200 + i,
    };
  });

export default games;

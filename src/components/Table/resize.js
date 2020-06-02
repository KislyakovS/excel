import $ from "@core/dom";

export const onResize = ($root, e) => {
  const { resize } = e.target.dataset;

  const $resizer = $(e.target);
  const $parent = $resizer.closest('[data-type="resizabel"]');
  const { width, height } = $parent.getCords();

  const { index } = $parent.dataset;
  const $columnAll = $root.findAll(`[data-col="${index}"]`);

  $resizer.style("opacity", "1");

  const { right, bottom } = $resizer.getCords();

  document.onmousemove = (event) => {
    const { pageX, pageY } = event;
    if (resize === "col") {
      const delta = pageX - right;
      $resizer.style("right", `${-delta}px`);
    } else if (resize === "row") {
      const delta = pageY - bottom;
      $resizer.style("bottom", `${-delta}px`);
    }
  };

  document.onmouseup = (event) => {
    document.onmouseup = null;
    document.onmousemove = null;

    const { pageX, pageY } = event;

    $resizer.style("opacity", "0");

    if (resize === "col") {
      const value = getResizeSide(pageX, right, width);
      $columnAll.forEach((el) => (el.style.width = value));
      $parent.style("width", value);

      $resizer.style("right", "0");
    } else if (resize === "row") {
      const value = getResizeSide(pageY, bottom, height);
      $parent.style("height", value);

      $resizer.style("bottom", "0");
    }
  };
};

const getResizeSide = (cord, position, side) => {
  const delta = cord - position;
  const value = side + delta;

  return `${value}px`;
};

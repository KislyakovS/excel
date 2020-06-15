import $ from "@core/dom";

export const onResize = ($root, e) => new Promise((resolve => {
  const {resize} = e.target.dataset;

  const $resizer = $(e.target);
  const $parent = $resizer.closest('[data-type="resizabel"]');
  const {width, height} = $parent.getCords();

  const {index} = $parent.dataset;
  const $columnAll = $root.findAll(`[data-col="${index}"]`);


  let valueResize;

  $resizer.style("opacity", "1");

  const {right, bottom} = $resizer.getCords();

  document.onmousemove = (event) => {
    const {pageX, pageY} = event;
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

    const {pageX, pageY} = event;

    $resizer.style("opacity", "0");

    if (resize === "col") {
      valueResize = getResizeSide(pageX, right, width);
      $columnAll.forEach((el) => (el.style.width = valueResize));
      $parent.style("width", valueResize);

      $resizer.style("right", "0");
    } else if (resize === "row") {
      valueResize = getResizeSide(pageY, bottom, height);
      $parent.style("height", valueResize);

      $resizer.style("bottom", "0");
    }

    resolve({
      value: {[index]: valueResize},
      type: resize
    })
  };
}))

const getResizeSide = (cord, position, side) => {
  const delta = cord - position;
  const value = side + delta;

  return `${value}px`;
};

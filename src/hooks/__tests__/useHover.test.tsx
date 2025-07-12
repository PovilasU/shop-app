import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useHover } from "../useHover";

function TestComponent() {
  const { isHovered, onMouseEnter, onMouseLeave } = useHover();

  return (
    <div
      data-testid="hover-area"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isHovered ? "Hovered" : "Not hovered"}
    </div>
  );
}

describe("useHover hook", () => {
  it("should initialize with isHovered false", () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("hover-area").textContent).toBe("Not hovered");
  });

  it("should set isHovered to true on mouse enter", () => {
    const { getByTestId } = render(<TestComponent />);
    const hoverArea = getByTestId("hover-area");

    fireEvent.mouseEnter(hoverArea);
    expect(hoverArea.textContent).toBe("Hovered");
  });

  it("should set isHovered to false on mouse leave", () => {
    const { getByTestId } = render(<TestComponent />);
    const hoverArea = getByTestId("hover-area");

    fireEvent.mouseEnter(hoverArea);
    expect(hoverArea.textContent).toBe("Hovered");

    fireEvent.mouseLeave(hoverArea);
    expect(hoverArea.textContent).toBe("Not hovered");
  });
});

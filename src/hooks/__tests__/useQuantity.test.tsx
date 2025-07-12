import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useQuantity } from "../useQuantity";

function TestComponent({ initial, min, max }: { initial?: number; min?: number; max?: number }) {
  const { quantity, increment, decrement, setQuantity } = useQuantity(initial, min, max);

  return (
    <div>
      <div data-testid="quantity">{quantity}</div>
      <button onClick={increment} data-testid="increment">+</button>
      <button onClick={decrement} data-testid="decrement">-</button>
      <button onClick={() => setQuantity(5)} data-testid="set">Set to 5</button>
    </div>
  );
}

describe("useQuantity hook (via TestComponent)", () => {
  it("initializes with default quantity", () => {
    const { getByTestId } = render(<TestComponent />);
    expect(getByTestId("quantity").textContent).toBe("1");
  });

  it("initializes with custom initial quantity", () => {
    const { getByTestId } = render(<TestComponent initial={3} />);
    expect(getByTestId("quantity").textContent).toBe("3");
  });

  it("increments quantity up to max", () => {
    const { getByTestId } = render(<TestComponent initial={1} max={3} />);
    const incrementBtn = getByTestId("increment");
    const quantity = getByTestId("quantity");

    fireEvent.click(incrementBtn);
    expect(quantity.textContent).toBe("2");

    fireEvent.click(incrementBtn);
    expect(quantity.textContent).toBe("3");

    fireEvent.click(incrementBtn);
    expect(quantity.textContent).toBe("3"); // max reached
  });

  it("decrements quantity down to min", () => {
    const { getByTestId } = render(<TestComponent initial={3} min={1} />);
    const decrementBtn = getByTestId("decrement");
    const quantity = getByTestId("quantity");

    fireEvent.click(decrementBtn);
    expect(quantity.textContent).toBe("2");

    fireEvent.click(decrementBtn);
    expect(quantity.textContent).toBe("1");

    fireEvent.click(decrementBtn);
    expect(quantity.textContent).toBe("1"); // min reached
  });

  it("sets quantity directly", () => {
    const { getByTestId } = render(<TestComponent />);
    const setBtn = getByTestId("set");
    const quantity = getByTestId("quantity");

    fireEvent.click(setBtn);
    expect(quantity.textContent).toBe("5");
  });
});

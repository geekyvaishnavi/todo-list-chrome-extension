import { render, screen } from "@testing-library/react";
import Popup from "./Popup";

test("renders todo heading", () => {
  render(<Popup />);
  expect(screen.getByText(/todo/i)).toBeInTheDocument();
});
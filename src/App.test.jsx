import { render, screen } from "@testing-library/react";
import App from "./App";

it("should render the title", () => {
  render(<App />);

  const appTitle = screen.getByRole("heading");

  expect(appTitle).toBeInTheDocument();
  expect(appTitle).toHaveTextContent(/welcome to react/i);
});

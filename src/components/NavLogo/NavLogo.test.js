import renderer from "react-test-renderer";
import { screen, render, getByTestId } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import NavLogo from "./NavLogo";
import { ROUTE_ROOT } from "../../utils/routes";

const testElement = (
  <MemoryRouter>
    <NavLogo />
  </MemoryRouter>
);

describe("NavLogo", () => {
  it("рендерится без ошибок", () => {
    const tree = renderer.create(testElement).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("содержит ссылку на главную страницу", () => {
    const { container } = render(testElement);

    const navLink = getByTestId(container, "nav-link");
    expect(navLink.href).toMatch(ROUTE_ROOT);
  });

  it("переходит на главную страницу", async () => {
    const { container } = render(testElement);
    const user = userEvent.setup();

    const navLink = getByTestId(container, "nav-link");

    await user.click(navLink);
    expect(window.location.href).toMatch(ROUTE_ROOT);
  });
});

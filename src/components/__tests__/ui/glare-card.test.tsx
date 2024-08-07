import { render, screen, fireEvent } from "@testing-library/react";
import { GlareCard } from "../../ui/glare-card";

describe("GlareCard", () => {
  // Helper function to get computed CSS styles
  const getComputedStyle = (element: HTMLElement, property: string) =>
    window.getComputedStyle(element).getPropertyValue(property);

  it("renders children correctly", () => {
    render(
      <GlareCard>
        <div>Test Content</div>
      </GlareCard>
    );
    const childContent = screen.getByTestId("child-content");
    expect(childContent).toBeInTheDocument();
  });

  it("updates styles on pointer move", () => {
    render(
      <GlareCard>
        <div>Test Content</div>
      </GlareCard>
    );
    const glareCard = screen.getByTestId("glare-card");
    fireEvent.pointerMove(glareCard, { clientX: 100, clientY: 50 });

    // Check that some CSS properties have been modified
    expect(getComputedStyle(glareCard, "--m-x")).not.toBe("50%");
    expect(getComputedStyle(glareCard, "--m-y")).not.toBe("50%");
    expect(getComputedStyle(glareCard, "--r-x")).not.toBe("0deg");
    expect(getComputedStyle(glareCard, "--r-y")).not.toBe("0deg");
  });
});

import { render, screen } from "@testing-library/react";
import CustomAlert, { CustomAlertProps } from "./CustomAlert";

const alertPropsList: CustomAlertProps[] = [
  {
    title: "Custom Alert Title",
    description: "Custom Alert Description",
    variant: "destructive",
  },
  {
    title: "Another Title",
    description: "Another Alert Description",
    variant: "default",
  },
  {
    title: "Another Title",
    description: "Another Alert Description",
  },
];

describe("CustomAlert", () => {
  it("should render the correct props", () => {
    const { rerender } = render(null);

    alertPropsList.forEach((props) => {
      rerender(<CustomAlert {...props} />);

      const title = props.title ? screen.getByText(props?.title) : null;
      const description = props.description
        ? screen.getByText(props?.description)
        : null;

      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });

  it("should render with the correct variant", () => {
    const { rerender } = render(<CustomAlert {...alertPropsList[0]} />);

    const container = screen.getByTestId("custom-alert");
    expect(container.className).toMatch(/destructive/i);

    rerender(<CustomAlert {...alertPropsList[1]} />);
    expect(container.className).not.toMatch(/destructive/i);
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProjectSetup from "./ProjectSetup";
import { config } from "../config";
import RequestService from "../services/RequestService";
import userEvent from "@testing-library/user-event";

test("renders page", () => {
  render(<ProjectSetup />, { wrapper: MemoryRouter });
  const subHeader = screen.getByText(
    "This will help us suggest System Components and an initial control baseline."
  );
  expect(subHeader).toBeInTheDocument();
  const question1 = screen.getByText("What is the name of the FISMA system?");
  expect(question1).toBeInTheDocument();
  const question2 = screen.getByText(
    "Where is this system going to be located?"
  );
  expect(question2).toBeInTheDocument();
  const question3 = screen.getByText(
    "What is the FISMA impact level of this system?"
  );
  expect(question3).toBeInTheDocument();

  const nameLabel = screen.getByText("Full name");
  expect(nameLabel).toBeInTheDocument();
  const acronymLabel = screen.getByText("Acronym");
  expect(acronymLabel).toBeInTheDocument();
  const catalogLabel = screen.getByText("Control Catalog");
  expect(catalogLabel).toBeInTheDocument();
  const awsLabel = screen.getByText("AWS Commercial East-West");
  expect(awsLabel).toBeInTheDocument();
  const govcloudLabel = screen.getByText("AWS GovCloud");
  expect(govcloudLabel).toBeInTheDocument();
  const azureLabel = screen.getByText("Microsoft Azure");
  expect(azureLabel).toBeInTheDocument();
  const otherLabel = screen.getByText("Other");
  expect(otherLabel).toBeInTheDocument();
  const lowLabel = screen.getByText("Low");
  expect(lowLabel).toBeInTheDocument();
  const moderateLabel = screen.getByText("Moderate");
  expect(moderateLabel).toBeInTheDocument();
  const highLabel = screen.getByText("High");
  expect(highLabel).toBeInTheDocument();
});

describe("Form functionality", () => {
  test("Submitting form makes post call", async () => {
    RequestService.post = jest.fn();

    render(<ProjectSetup />, { wrapper: MemoryRouter });

    // fill out form and click button to submit
    fireEvent.change(screen.getByLabelText("Full name"), {
      target: { value: "Full Name" },
    });
    fireEvent.change(screen.getByLabelText("Acronym"), {
      target: { value: "Acronym" },
    });
    fireEvent.click(screen.getByLabelText("AWS Commercial East-West"));
    fireEvent.click(screen.getByText("Low"));
    fireEvent.click(screen.getByRole("button", { name: "Next" }));

    const expectedRequestUrl = `${config.backendUrl}/projects/`;
    const expectedRequestBody = `{"catalog_version":"NIST_SP80053r5","acronym":"Acronym","title":"Full Name","location":"aws","impact_level":"low"}`;

    expect(RequestService.post).toHaveBeenCalledWith(
      expectedRequestUrl,
      expectedRequestBody,
      expect.anything()
    );
  });
});

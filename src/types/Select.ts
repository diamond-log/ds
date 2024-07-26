import { FormSelectProps } from "react-bootstrap/esm/FormSelect";
import { IntlProps } from "./IntlProps";

export type DSSelectProps = {
} & FormSelectProps & Omit<IntlProps, "intltextposition" | "testText">;
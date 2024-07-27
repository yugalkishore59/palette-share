import { SegmentedControl } from "@mantine/core";
import classes from "./GradientSegmentedControl.module.css";

export function GradientSegmentedControl() {
  return (
    <SegmentedControl
      radius="xl"
      size="sm"
      data={["Posts", "Accounts", "#tags", "Licenses"]}
      classNames={classes}
    />
  );
}
